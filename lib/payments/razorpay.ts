import "server-only";

import crypto from "crypto";
import Razorpay from "razorpay";

import { env } from "@/lib/config/env";

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

  const expected = crypto
    .createHmac("sha256", env.razorpayWebhookSecret)
    .update(rawBody)
    .digest("hex");

  return expected === signature;
}

export interface RazorpayWebhookParsed {
  providerEventId: string;
  providerPaymentId: string;
  donationId: string;
  amountMinor: number;
  currency: string;
  paidAt: string;
  payload: Record<string, unknown>;
}

export function parseRazorpayWebhook(rawBody: string): RazorpayWebhookParsed | null {
  const event = JSON.parse(rawBody) as {
    event?: string;
    created_at?: number;
    payload?: {
      payment?: {
        entity?: {
          id?: string;
          amount?: number;
          currency?: string;
          notes?: {
            donationId?: string;
          };
        };
      };
    };
  };

  if (event.event !== "payment.captured") {
    return null;
  }

  const payment = event.payload?.payment?.entity;
  const donationId = payment?.notes?.donationId;
  if (!payment?.id || !donationId || !payment.currency || !payment.amount) {
    return null;
  }

  return {
    providerEventId: `${event.event}-${payment.id}`,
    providerPaymentId: payment.id,
    donationId,
    amountMinor: payment.amount,
    currency: payment.currency,
    paidAt: new Date((event.created_at || Date.now() / 1000) * 1000).toISOString(),
    payload: event as unknown as Record<string, unknown>,
  };
}
