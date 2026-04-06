import { NextRequest, NextResponse } from "next/server";

import { processPaidWebhook } from "@/lib/donations/repository";
import { parseRazorpayWebhook, verifyRazorpayWebhook } from "@/lib/payments/razorpay";

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

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
