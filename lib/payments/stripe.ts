import "server-only";

import Stripe from "stripe";

import { env } from "@/lib/config/env";

let stripeClient: Stripe | null = null;

function getStripe() {
  if (!env.stripeSecretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY.");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(env.stripeSecretKey);
  }

  return stripeClient;
}

interface CreateStripeSessionInput {
  donationId: string;
  amountMinor: number;
  currency: string;
  donorName: string;
  donorEmail: string;
  successUrl: string;
  cancelUrl: string;
}

export async function createStripeCheckoutSession(input: CreateStripeSessionInput) {
  const stripe = getStripe();
  return stripe.checkout.sessions.create({
    mode: "payment",
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    customer_email: input.donorEmail,
    metadata: {
      donationId: input.donationId,
      donorName: input.donorName,
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: input.currency.toLowerCase(),
          product_data: {
            name: "NGO Donation",
          },
          unit_amount: input.amountMinor,
        },
      },
    ],
  });
}

export function verifyStripeWebhook(rawBody: string, signature: string): Stripe.Event {
  const stripe = getStripe();
  if (!env.stripeWebhookSecret) {
    throw new Error("Missing STRIPE_WEBHOOK_SECRET.");
  }
  return stripe.webhooks.constructEvent(rawBody, signature, env.stripeWebhookSecret);
}
