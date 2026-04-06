import { NextRequest, NextResponse } from "next/server";

import { createStripeCheckoutSession } from "@/lib/payments/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await createStripeCheckoutSession(body);
    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create Stripe session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
