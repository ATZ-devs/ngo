import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { verifyRazorpayPaymentSignature } from "@/lib/payments/razorpay";

const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().trim().min(1),
  razorpay_payment_id: z.string().trim().min(1),
  razorpay_signature: z.string().trim().min(1),
});

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = verifyPaymentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const isValid = verifyRazorpayPaymentSignature({
    orderId: parsed.data.razorpay_order_id,
    paymentId: parsed.data.razorpay_payment_id,
    signature: parsed.data.razorpay_signature,
  });

  if (!isValid) {
    return NextResponse.json({ verified: false, error: "Invalid payment signature." }, { status: 400 });
  }

  // Webhook remains the source of truth for final donation state transitions.
  return NextResponse.json({ verified: true });
}
