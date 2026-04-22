import { NextRequest, NextResponse } from "next/server";

import {
  getDonationById,
  markQueuedReceiptJobCompleted,
  processPaidWebhook,
  saveEmailDelivery,
  saveReceipt,
} from "@/lib/donations/repository";
import { parseRazorpayWebhook, verifyRazorpayWebhook } from "@/lib/payments/razorpay";
import { sendDonationEmail } from "@/lib/email/send-donation-email";
import { generateReceiptPdf } from "@/lib/receipts/generate-receipt-pdf";
import { downloadStaticNgoDocument, uploadReceiptPdf } from "@/lib/storage/supabase-storage";

function getReceiptNumber(donationId: string): string {
  const suffix = donationId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase();
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `RCP-${date}-${suffix}`;
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";

  if (!verifyRazorpayWebhook(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  const parsed = parseRazorpayWebhook(rawBody);

  if (!parsed) {
    return NextResponse.json({ ignored: true });
  }

  try {
    const result = await processPaidWebhook({
      provider: "razorpay",
      providerEventId: parsed.providerEventId,
      providerPaymentId: parsed.providerPaymentId,
      providerOrderId: parsed.providerOrderId,
      donationId: parsed.donationId,
      amountMinor: parsed.amountMinor,
      currency: parsed.currency,
      paidAt: parsed.paidAt,
      payload: parsed.payload,
    });

    if (!result.processed) {
      return NextResponse.json({ ignored: true });
    }

    try {
      const donation = await getDonationById(parsed.donationId);
      const receiptNumber = getReceiptNumber(donation.id);
      const receiptPdf = await generateReceiptPdf(donation, receiptNumber);
      const receiptStoragePath = await uploadReceiptPdf(donation.id, receiptPdf);
      const ngoDocument = await downloadStaticNgoDocument();

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
      await markQueuedReceiptJobCompleted(donation.id);
    } catch (emailError) {
      const message = emailError instanceof Error ? emailError.message : "Receipt email delivery failed";
      await saveEmailDelivery(parsed.donationId, null, "failed", message);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message.includes("mismatch")) {
      return NextResponse.json({ error: "Payment verification mismatch" }, { status: 400 });
    }

    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
