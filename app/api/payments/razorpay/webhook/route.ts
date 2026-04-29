import { NextRequest, NextResponse } from "next/server";

import {
  getDonationById,
  processFailedWebhook,
  processPaidWebhook,
  saveEmailDelivery,
  saveReceipt,
} from "@/lib/donations/repository";
import { sendDonationEmail, type SendEmailResult } from "@/lib/email/send-donation-email";
import { shouldInclude80GCertificate } from "@/lib/security/pan-validation";
import { generateReceiptPdf } from "@/lib/pdf/generate-receipt-pdf";
import { parseRazorpayWebhook, verifyRazorpayWebhook } from "@/lib/payments/razorpay";
import { downloadStaticNgoDocument, uploadReceiptPdf } from "@/lib/storage/supabase-storage";

export const runtime = "nodejs";

function getReceiptNumber(donationId: string): string {
  const suffix = donationId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase();
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `RCP-${date}-${suffix}`;
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";

  console.log("[razorpay-webhook] Received webhook request");

  if (!verifyRazorpayWebhook(rawBody, signature)) {
    console.warn("[razorpay-webhook] Invalid webhook signature");
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  const parsed = parseRazorpayWebhook(rawBody);

  if (!parsed) {
    console.warn("[razorpay-webhook] Failed to parse webhook payload");
    return NextResponse.json({ ignored: true });
  }

  console.log(`[razorpay-webhook] Parsed event: type=${parsed.eventType}, paymentId=${parsed.providerPaymentId}, donationId=${parsed.donationId}`);

  try {
    const payload = {
      provider: "razorpay" as const,
      providerEventId: parsed.providerEventId,
      providerPaymentId: parsed.providerPaymentId,
      providerOrderId: parsed.providerOrderId,
      donationId: parsed.donationId,
      amountMinor: parsed.amountMinor,
      currency: parsed.currency,
      paidAt: parsed.paidAt,
      payload: parsed.payload,
    };

    // Process payment status change
    if (parsed.eventType === "payment.captured") {
      const result = await processPaidWebhook(payload);

      if (!result.processed) {
        console.log(`[razorpay-webhook] Payment already processed for donation ${parsed.donationId}`);
        return NextResponse.json({ ok: true, processed: false });
      }

      // Immediately send receipt email after payment verification
      console.log(`[razorpay-webhook] Payment verified, sending receipt email for donation ${parsed.donationId}`);
      
      try {
        const donation = await getDonationById(parsed.donationId);
        console.log(`[razorpay-webhook] Donation loaded: id=${donation.id}, email=${donation.donor_email}, status=${donation.status}, amount=${donation.amount_minor}${donation.currency}`);
        
        if (!donation.donor_email) {
          throw new Error("Donation has no email address");
        }

        const receiptNumber = getReceiptNumber(donation.id);
        console.log(`[razorpay-webhook] Receipt number: ${receiptNumber}`);
        
        console.log(`[razorpay-webhook] Generating receipt PDF...`);
        const receiptPdf = await generateReceiptPdf(donation, receiptNumber);
        console.log(`[razorpay-webhook] PDF generated: ${receiptPdf.length} bytes`);
        
        console.log(`[razorpay-webhook] Uploading receipt...`);
        const receiptStoragePath = await uploadReceiptPdf(donation.id, receiptPdf);
        console.log(`[razorpay-webhook] Receipt uploaded to: ${receiptStoragePath}`);
        
        // Check if donor provided valid PAN for 80G certificate
        const hasPan = shouldInclude80GCertificate(donation.pan_number);
        let ngoDocument: Buffer | undefined;
        
        if (hasPan) {
          console.log(`[razorpay-webhook] Donor has valid PAN, downloading 80G certificate...`);
          ngoDocument = await downloadStaticNgoDocument();
          console.log(`[razorpay-webhook] 80G certificate: ${ngoDocument.length} bytes`);
        } else {
          console.log(`[razorpay-webhook] No valid PAN provided, skipping 80G certificate`);
        }

        console.log(`[razorpay-webhook] Calling Resend API...`);
        const emailResult: SendEmailResult = await sendDonationEmail({
          donorName: donation.donor_name,
          donorEmail: donation.donor_email,
          amountMinor: donation.amount_minor,
          currency: donation.currency,
          transactionId: donation.provider_payment_id || donation.provider_order_id || donation.id,
          receiptPdf,
          ngoDocumentPdf: ngoDocument,
          includeTaxBenefit: hasPan,
        });
        console.log(`[razorpay-webhook] Email result: success=${emailResult.success}, error=${emailResult.error}, messageId=${emailResult.messageId}`);

        if (!emailResult.success) {
          const errorMsg = emailResult.error || "Email send failed for unknown reason";
          console.error(`[razorpay-webhook] Email failed: ${errorMsg}`);
          
          try {
            await saveEmailDelivery(donation.id, null, "failed", errorMsg);
          } catch (e) {
            console.error(`[razorpay-webhook] Failed to log email failure: ${e instanceof Error ? e.message : "unknown error"}`);
          }

          // Always return 200 to acknowledge webhook, even if email failed
          return NextResponse.json(
            { ok: true, processed: true, emailSent: false, error: errorMsg },
            { status: 200 }
          );
        }

        // Save receipt and email delivery records
        await saveReceipt(donation.id, receiptNumber, receiptStoragePath);
        await saveEmailDelivery(donation.id, emailResult.messageId, "sent");

        console.log(`[razorpay-webhook] Receipt email sent successfully for donation ${parsed.donationId}, messageId=${emailResult.messageId}`);
        return NextResponse.json({ ok: true, processed: true, emailSent: true });
      } catch (emailError) {
        const errorMsg = emailError instanceof Error ? emailError.message : "Failed to send receipt email";
        console.error(`[razorpay-webhook] Exception during email processing: ${errorMsg}`, emailError);

        try {
          await saveEmailDelivery(parsed.donationId, null, "failed", errorMsg);
        } catch (e) {
          console.error(`[razorpay-webhook] Failed to log email exception: ${e instanceof Error ? e.message : "unknown error"}`);
        }

        // Always return 200 to acknowledge webhook
        return NextResponse.json(
          { ok: true, processed: true, emailSent: false, error: errorMsg },
          { status: 200 }
        );
      }
    } else {
      // Handle payment.failed event
      const result = await processFailedWebhook(payload);
      console.log(`[razorpay-webhook] Payment failed processed: result.processed=${result.processed}`);
      return NextResponse.json({ ok: true, processed: result.processed });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[razorpay-webhook] Processing failed: ${message}`, error);

    if (error instanceof Error && error.message.includes("mismatch")) {
      return NextResponse.json({ error: "Payment verification mismatch" }, { status: 400 });
    }

    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
