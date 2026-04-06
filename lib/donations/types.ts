export type PaymentProvider = "razorpay" | "stripe";
export type DonationStatus = "pending" | "paid" | "failed";
export type JobStatus = "queued" | "processing" | "completed" | "failed";

export interface DonationRow {
  id: string;
  donor_name: string;
  donor_email: string;
  amount_minor: number;
  currency: string;
  country_code: string;
  provider: PaymentProvider | null;
  provider_order_id: string | null;
  provider_payment_id: string | null;
  status: DonationStatus;
  created_at: string;
  updated_at: string;
  paid_at: string | null;
}

export interface PaymentEventInput {
  provider: PaymentProvider;
  providerEventId: string;
  providerPaymentId: string;
  donationId: string;
  amountMinor: number;
  currency: string;
  paidAt: string;
  payload: Record<string, unknown>;
}
