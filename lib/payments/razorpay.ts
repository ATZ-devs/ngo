import "server-only";

import crypto from "crypto";
import Razorpay from "razorpay";

import { env } from "@/lib/config/env";
import { timingSafeEqualStrings } from "@/lib/security/crypto";
import type { Json } from "@/lib/supabase/types";

let razorpayClient: Razorpay | null = null;

function getRazorpay() {
  if (!env.razorpayKeyId || !env.razorpayKeySecret) {
    throw new Error("Missing Razorpay environment variables.");
  }

  if (!razorpayClient) {
    razorpayClient = new Razorpay({
      key_id: env.razorpayKeyId,
      key_secret: env.razorpayKeySecret,
    });
  }

  return razorpayClient;
}

interface CreateRazorpayOrderInput {
  donationId: string;
  amountMinor: number;
  currency: string;
  donorName: string;
  donorEmail: string;
}

export async function createRazorpayOrder(input: CreateRazorpayOrderInput) {
  const razorpay = getRazorpay();
  const order = await razorpay.orders.create({
    amount: input.amountMinor,
    currency: input.currency,
    notes: {
      donationId: input.donationId,
      donorName: input.donorName,
      donorEmail: input.donorEmail,
    },
    receipt: input.donationId,
  });

  return order;
}

export function verifyRazorpayWebhook(rawBody: string, signature: string): boolean {
  if (!env.razorpayWebhookSecret) {
    throw new Error("Missing RAZORPAY_WEBHOOK_SECRET.");
  }

  if (!signature) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", env.razorpayWebhookSecret)
    .update(rawBody)
    .digest("hex");

  return timingSafeEqualStrings(expected, signature);
}

export interface RazorpayWebhookParsed {
  providerEventId: string;
  providerPaymentId: string;
  providerOrderId: string;
  donationId: string;
  amountMinor: number;
  currency: string;
  paidAt: string;
  payload: Json;
}

export function parseRazorpayWebhook(rawBody: string): RazorpayWebhookParsed | null {
  let event: {
    event?: string;
    created_at?: number;
    payload?: {
      payment?: {
        entity?: {
          id?: string;
          order_id?: string;
          amount?: number;
          currency?: string;
          notes?: {
            donationId?: string;
          };
        };
      };
    };
  };

  try {
    event = JSON.parse(rawBody) as {
      event?: string;
      created_at?: number;
      payload?: {
        payment?: {
          entity?: {
            id?: string;
            order_id?: string;
            amount?: number;
            currency?: string;
            notes?: {
              donationId?: string;
            };
          };
        };
      };
    };
  } catch {
    return null;
  }

  if (event.event !== "payment.captured") {
    return null;
  }

  const payment = event.payload?.payment?.entity;
  const donationId = payment?.notes?.donationId;
  if (!payment?.id || !payment.order_id || !donationId || !payment.currency || payment.amount == null) {
    return null;
  }

  return {
    providerEventId: `${event.event}-${payment.id}`,
    providerPaymentId: payment.id,
    providerOrderId: payment.order_id,
    donationId,
    amountMinor: payment.amount,
    currency: payment.currency,
    paidAt: new Date((event.created_at || Date.now() / 1000) * 1000).toISOString(),
    payload: event as unknown as Json,
  };
}
