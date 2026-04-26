import { NextRequest, NextResponse } from "next/server";

import { env } from "@/lib/config/env";
import {
  getDonationById,
  getQueuedJobs,
  markJobStatus,
  saveEmailDelivery,
  saveReceipt,
} from "@/lib/donations/repository";
import { sendDonationEmail } from "@/lib/email/send-donation-email";
import { generateReceiptPdf } from "@/lib/pdf/generate-receipt-pdf";
import { timingSafeEqualStrings } from "@/lib/security/crypto";
import { downloadStaticNgoDocument, uploadReceiptPdf } from "@/lib/storage/supabase-storage";

export const runtime = "nodejs";

function getReceiptNumber(donationId: string): string {
  const suffix = donationId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase();
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `RCP-${date}-${suffix}`;
}

function parseBearerToken(authorization: string): string | null {
  if (!authorization.startsWith("Bearer ")) {
    return null;
  }

  const token = authorization.slice("Bearer ".length).trim();
  return token.length > 0 ? token : null;
}

function hasValidJobSecret(token: string): boolean {
  const validSecrets = [env.donationJobsSecret, env.cronSecret].filter(
    (value): value is string => Boolean(value)
  );

  if (validSecrets.length === 0) {
    return false;
  }

  return validSecrets.some((secret) => timingSafeEqualStrings(secret, token));
}

export async function POST(req: NextRequest) {
  const authorization = req.headers.get("authorization") || "";
  const token = parseBearerToken(authorization);

  if (!token || !hasValidJobSecret(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const jobs = await getQueuedJobs(10);
  const ngoDocument = await downloadStaticNgoDocument();

  let processed = 0;
  let failed = 0;

  for (const job of jobs) {
    try {
      await markJobStatus(job.id, "processing");

      const donation = await getDonationById(job.donation_id);
      const receiptNumber = getReceiptNumber(donation.id);
      const receiptPdf = await generateReceiptPdf(donation, receiptNumber);
      const receiptStoragePath = await uploadReceiptPdf(donation.id, receiptPdf);

      const emailMessageId = await sendDonationEmail({
        donorName: donation.donor_name,
        donorEmail: donation.donor_email,
        amountMinor: donation.amount_minor,
        currency: donation.currency,
        transactionId: donation.provider_payment_id || donation.provider_order_id || donation.id,
        receiptPdf,
        ngoDocumentPdf: ngoDocument,
      });

      await saveReceipt(donation.id, receiptNumber, receiptStoragePath);
      await saveEmailDelivery(donation.id, emailMessageId, "sent");
      await markJobStatus(job.id, "completed");
      processed += 1;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Job failed";
      await markJobStatus(job.id, "failed", message);

      try {
        await saveEmailDelivery(job.donation_id, null, "failed", message);
      } catch {
        // Ignore secondary email logging failure for this run.
      }

      failed += 1;
    }
  }

  return NextResponse.json({ queued: jobs.length, processed, failed });
}
