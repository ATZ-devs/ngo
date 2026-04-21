import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { env } from "@/lib/config/env";
import { createPendingDonation, setProviderOrderId } from "@/lib/donations/repository";
import { createRazorpayOrder } from "@/lib/payments/razorpay";
import { createStripeCheckoutSession } from "@/lib/payments/stripe";

const createPaymentSchema = z.object({
  donorName: z.string().min(2).max(120),
  donorEmail: z.string().email(),
  amountMajor: z.number().positive(),
  countryCode: z.string().length(2),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = createPaymentSchema.parse(body);

    const isIndia = input.countryCode.toUpperCase() === "IN";
    const provider = isIndia ? "razorpay" : "stripe";
    const currency = isIndia ? "INR" : "USD";
    const amountMinor = Math.round(input.amountMajor * 100);

    const donation = await createPendingDonation({
      donorName: input.donorName,
      donorEmail: input.donorEmail,
      amountMinor,
      currency,
      countryCode: input.countryCode.toUpperCase(),
      provider,
    });

    if (provider === "razorpay") {
      const order = await createRazorpayOrder({
        donationId: donation.id,
        amountMinor,
        currency,
        donorName: input.donorName,
        donorEmail: input.donorEmail,
      });

      await setProviderOrderId(donation.id, order.id);

      return NextResponse.json({
        provider: "razorpay",
        donationId: donation.id,
        amountMinor,
        keyId: env.razorpayKeyId,
        orderId: order.id,
        currency,
        donorName: input.donorName,
        donorEmail: input.donorEmail,
      });
    }

    const session = await createStripeCheckoutSession({
      donationId: donation.id,
      amountMinor,
      currency,
      donorName: input.donorName,
      donorEmail: input.donorEmail,
      successUrl: `${env.appBaseUrl}/donate?status=processing`,
      cancelUrl: `${env.appBaseUrl}/donate?status=cancelled`,
    });

    if (!session.id || !session.url) {
      throw new Error("Failed to create Stripe session");
    }

    await setProviderOrderId(donation.id, session.id);

    return NextResponse.json({
      provider: "stripe",
      donationId: donation.id,
      sessionId: session.id,
      checkoutUrl: session.url,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }

    const message = error instanceof Error ? error.message : "Unable to create payment";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
