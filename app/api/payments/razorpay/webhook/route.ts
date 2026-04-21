import { NextRequest, NextResponse } from "next/server";

import { processPaidWebhook, getDonationById } from "@/lib/donations/repository";
import { parseRazorpayWebhook, verifyRazorpayWebhook } from "@/lib/payments/razorpay";
import { sendDonationEmail } from "@/lib/email/send-donation-email";
import { generateReceiptPdf } from "@/lib/receipts/generate-receipt-pdf";
import { downloadStaticNgoDocument } from "@/lib/storage/supabase-storage";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";

  console.log("Webhook received:", {
    signature: signature ? "present" : "missing",
    bodyLength: rawBody.length,
  });

  if (!verifyRazorpayWebhook(rawBody, signature)) {
    console.error("Webhook signature verification failed");
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  const parsed = parseRazorpayWebhook(rawBody);
  console.log("Parsed webhook:", { donationId: parsed?.donationId, event: parsed?.providerEventId });

  if (!parsed) {
    console.log("Failed to parse webhook");
    return NextResponse.json({ ignored: true });
  }

  try {
    console.log("Processing webhook for donation:", parsed.donationId);

    // Process webhook and mark donation as paid
    await processPaidWebhook({
      provider: "razorpay",
      providerEventId: parsed.providerEventId,
      providerPaymentId: parsed.providerPaymentId,
      donationId: parsed.donationId,
      amountMinor: parsed.amountMinor,
      currency: parsed.currency,
      paidAt: parsed.paidAt,
      payload: parsed.payload,
    });

    console.log("Donation marked as paid");

    // Send email immediately (no queueing)
    try {
      console.log("Fetching donation details...");
      const donation = await getDonationById(parsed.donationId);
      
      console.log("Generating receipt PDF...");
      const receiptNumber = `RCP-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${donation.id.slice(0, 8).toUpperCase()}`;
      const receiptPdf = await generateReceiptPdf(donation, receiptNumber);
      
      console.log("Downloading NGO document...");
      const ngoDocument = await downloadStaticNgoDocument();

      console.log("Sending email to:", donation.donor_email);
      await sendDonationEmail({
        donorName: donation.donor_name,
        donorEmail: donation.donor_email,
        amountMinor: donation.amount_minor,
        currency: donation.currency,
        transactionId: donation.provider_payment_id || donation.provider_order_id || donation.id,
        receiptPdf,
        ngoDocumentPdf: ngoDocument,
      });

      console.log(`Email sent successfully for donation ${parsed.donationId}`);
    } catch (emailError) {
      // Log error but don't fail the webhook
      console.error(`Failed to send email for donation ${parsed.donationId}:`, emailError);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed";
    console.error("Webhook error:", message, error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
