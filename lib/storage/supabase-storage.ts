import "server-only";

import { env } from "@/lib/config/env";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function uploadReceiptPdf(donationId: string, receiptPdf: Buffer): Promise<string> {
  const supabaseAdmin = getSupabaseAdmin();
  const storagePath = `receipts/${donationId}.pdf`;
  const { error } = await supabaseAdmin.storage
    .from(env.receiptsBucket)
    .upload(storagePath, receiptPdf, { contentType: "application/pdf", upsert: true });

  if (error) {
    throw new Error(`Failed to upload receipt PDF: ${error.message}`);
  }

  return storagePath;
}

export async function downloadStaticNgoDocument(): Promise<Buffer> {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin.storage
    .from(env.documentsBucket)
    .download(env.staticNgoDocumentPath);

  if (error || !data) {
    throw new Error(`Failed to download NGO static document: ${error?.message || "Missing file"}`);
  }

  const arrayBuffer = await data.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
