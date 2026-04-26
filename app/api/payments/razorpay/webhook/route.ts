import { NextRequest, NextResponse } from "next/server";

import {
  processFailedWebhook,
  processPaidWebhook,
} from "@/lib/donations/repository";
import { parseRazorpayWebhook, verifyRazorpayWebhook } from "@/lib/payments/razorpay";

export const runtime = "nodejs";

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

    const result = parsed.eventType === "payment.captured"
      ? await processPaidWebhook(payload)
      : await processFailedWebhook(payload);

    // Keep webhook acknowledgements fast. Email/PDF work runs via queued jobs.
    return NextResponse.json({ ok: true, processed: result.processed });
  } catch (error) {
    if (error instanceof Error && error.message.includes("mismatch")) {
      return NextResponse.json({ error: "Payment verification mismatch" }, { status: 400 });
    }

    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
