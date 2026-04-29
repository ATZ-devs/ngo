import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { env } from "@/lib/config/env";
import { createPendingDonation, setProviderOrderId } from "@/lib/donations/repository";
import { normalizePan } from "@/lib/security/pan-validation";
import { createRazorpayOrder } from "@/lib/payments/razorpay";
import { consumeRateLimit } from "@/lib/security/rate-limit";

const MAX_DONATION_AMOUNT = 500000;

const createPaymentSchema = z.object({
  donorName: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(/^[A-Za-z0-9 .,'-]+$/, "Name contains unsupported characters."),
  donorEmail: z.string().trim().email().max(254),
  amountMajor: z.coerce
    .number()
    .finite()
    .positive()
    .max(MAX_DONATION_AMOUNT)
    .refine((value) => Number.isInteger(value * 100), "Amount supports up to 2 decimal places."),
  panNumber: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(value.trim().toUpperCase()),
      "Invalid PAN format (expected: AAAPL5055K)"
    ),
});

function getRequestIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  try {
    const rateLimit = consumeRateLimit({
      key: `payments:create:${getRequestIp(req)}`,
      limit: 20,
      windowMs: 60_000,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
          },
        }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const input = createPaymentSchema.parse(body);

    const provider = "razorpay";
    const currency = "INR";
    const amountMinor = Math.round(input.amountMajor * 100);
    
    // Normalize PAN if provided
    const normalizedPan = input.panNumber ? normalizePan(input.panNumber) : null;

    const donation = await createPendingDonation({
      donorName: input.donorName,
      donorEmail: input.donorEmail,
      panNumber: normalizedPan,
      amountMinor,
      currency,
      countryCode: "IN",
      provider,
    });

    const order = await createRazorpayOrder({
      donationId: donation.id,
      amountMinor,
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
  } catch (error) {
    console.error("Payment creation error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }

    console.error("Payment creation failed.");
    const message = error instanceof Error ? error.message : "Unable to create payment";
    return NextResponse.json(
      {
        error: process.env.NODE_ENV === "development" ? message : "Unable to create payment",
      },
      { status: 500 }
    );
  }
}
