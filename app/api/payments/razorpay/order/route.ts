import { NextRequest, NextResponse } from "next/server";

import { createRazorpayOrder } from "@/lib/payments/razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const order = await createRazorpayOrder({
      donationId: body.donationId,
      amountMinor: body.amountMinor,
      currency: body.currency,
      donorName: body.donorName,
      donorEmail: body.donorEmail,
    });

    return NextResponse.json(order);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create Razorpay order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
