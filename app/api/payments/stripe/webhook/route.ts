import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { processPaidWebhook } from "@/lib/donations/repository";
import { verifyStripeWebhook } from "@/lib/payments/stripe";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;
  try {
    event = verifyStripeWebhook(rawBody, signature);
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ ignored: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const donationId = session.metadata?.donationId;
  const paymentIntent = typeof session.payment_intent === "string" ? session.payment_intent : null;

  if (!donationId || !paymentIntent || !session.currency || !session.amount_total) {
    return NextResponse.json({ error: "Malformed Stripe event payload" }, { status: 400 });
  }

  try {
    await processPaidWebhook({
      provider: "stripe",
      providerEventId: event.id,
      providerPaymentId: paymentIntent,
      donationId,
      amountMinor: session.amount_total,
      currency: session.currency.toUpperCase(),
      paidAt: new Date().toISOString(),
      payload: event as unknown as Record<string, unknown>,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
