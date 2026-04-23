import sharp from 'sharp';
import { readFileSync, renameSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, '../public/assets');
const files = ['Child Welfare.png', 'Disaster Relief.png'];

const FUZZ = 85;
const isW = (r, g, b) => r >= 255 - FUZZ && g >= 255 - FUZZ && b >= 255 - FUZZ;

async function process(filename) {
  const inp = join(assetsDir, filename);
  const tmp = inp + '.tmp.png';

  const { data, info } = await sharp(inp)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const C = 4;
  const totalPx = width * height;

  // --- BFS flood fill from all 4 edges ---
  const transparent = new Uint8Array(totalPx);
  const visited = new Uint8Array(totalPx);
  const queue = new Int32Array(totalPx);
  let qHead = 0, qTail = 0;

  const idx = (x, y) => y * width + x;

  const seed = (x, y) => {
    const i = idx(x, y);
    if (visited[i]) return;
    const o = i * C;
    if (isW(data[o], data[o + 1], data[o + 2])) {
      visited[i] = 1;
      transparent[i] = 1;
      queue[qTail++] = i;
    }
  };

  for (let x = 0; x < width; x++) { seed(x, 0); seed(x, height - 1); }
  for (let y = 0; y < height; y++) { seed(0, y); seed(width - 1, y); }

  while (qHead < qTail) {
    const i = queue[qHead++];
    const x = i % width;
    const y = (i / width) | 0;
    const neighbors = [
      y > 0 ? i - width : -1,
      y < height - 1 ? i + width : -1,
      x > 0 ? i - 1 : -1,
      x < width - 1 ? i + 1 : -1,
    ];
    for (const n of neighbors) {
      if (n < 0 || visited[n]) continue;
      const o = n * C;
      if (isW(data[o], data[o + 1], data[o + 2])) {
        visited[n] = 1;
        transparent[n] = 1;
        queue[qTail++] = n;
      }
    }
  }

  // --- Global pass: any very bright low-saturation pixel (enclosed whites) ---
  const STRICT = 238;
  const MAX_SAT = 12;
  for (let i = 0; i < totalPx; i++) {
    if (transparent[i]) continue;
    const o = i * C;
    const r = data[o], g = data[o + 1], b = data[o + 2];
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    if (r >= STRICT && g >= STRICT && b >= STRICT && sat <= MAX_SAT) {
      transparent[i] = 1;
    }
  }

  // --- Apply alpha to transparent pixels ---
  for (let i = 0; i < totalPx; i++) {
    if (transparent[i]) data[i * C + 3] = 0;
  }

  // --- Write to TEMP file first, then rename (avoids sharp self-overwrite bug) ---
  await sharp(Buffer.from(data.buffer), { raw: { width, height, channels: 4 } })
    .png()
    .toFile(tmp);

  renameSync(tmp, inp);

  const meta = await sharp(inp).metadata();
  let tCount = 0;
  const { data: d2 } = await sharp(inp).ensureAlpha().raw().toBuffer();
  for (let i = 3; i < d2.length; i += 4) if (d2[i] === 0) tCount++;

  console.log(`${filename} → hasAlpha: ${meta.hasAlpha}, channels: ${meta.channels}, transparent px: ${tCount}/${totalPx} (${(tCount / totalPx * 100).toFixed(1)}%)`);
}

for (const f of files) await process(f);
console.log('All done. Cache must be cleared.');
