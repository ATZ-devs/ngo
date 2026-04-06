import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { DonationRow, PaymentEventInput, PaymentProvider } from "@/lib/donations/types";

interface CreateDonationInput {
  donorName: string;
  donorEmail: string;
  amountMinor: number;
  currency: string;
  countryCode: string;
  provider: PaymentProvider;
}

export async function createPendingDonation(input: CreateDonationInput): Promise<DonationRow> {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("donations")
    .insert({
      donor_name: input.donorName,
      donor_email: input.donorEmail,
      amount_minor: input.amountMinor,
      currency: input.currency,
      country_code: input.countryCode,
      provider: input.provider,
      status: "pending",
    })
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(`Failed to create donation: ${error?.message || "Unknown error"}`);
  }

  return data as DonationRow;
}

export async function setProviderOrderId(donationId: string, providerOrderId: string): Promise<void> {
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin
    .from("donations")
    .update({ provider_order_id: providerOrderId })
    .eq("id", donationId)
    .eq("status", "pending");

  if (error) {
    throw new Error(`Failed to set provider order id: ${error.message}`);
  }
}

export async function processPaidWebhook(input: PaymentEventInput): Promise<{ processed: boolean }> {
  const supabaseAdmin = getSupabaseAdmin();
  const { error: eventError } = await supabaseAdmin.from("payment_events").upsert(
    {
      provider: input.provider,
      provider_event_id: input.providerEventId,
      provider_payment_id: input.providerPaymentId,
      donation_id: input.donationId,
      payload: input.payload,
      paid_at: input.paidAt,
    },
    { onConflict: "provider,provider_event_id", ignoreDuplicates: true }
  );

  if (eventError) {
    throw new Error(`Failed to persist webhook event: ${eventError.message}`);
  }

  const { data: donation, error: donationError } = await supabaseAdmin
    .from("donations")
    .select("id,status")
    .eq("id", input.donationId)
    .single();

  if (donationError || !donation) {
    throw new Error(`Donation not found for webhook: ${input.donationId}`);
  }

  if (donation.status === "paid") {
    return { processed: false };
  }

  const { error: updateError } = await supabaseAdmin
    .from("donations")
    .update({
      status: "paid",
      paid_at: input.paidAt,
      provider_payment_id: input.providerPaymentId,
      amount_minor: input.amountMinor,
      currency: input.currency,
    })
    .eq("id", input.donationId)
    .eq("status", "pending");

  if (updateError) {
    throw new Error(`Failed to mark donation as paid: ${updateError.message}`);
  }

  const { error: jobError } = await supabaseAdmin.from("processing_jobs").upsert(
    {
      donation_id: input.donationId,
      job_type: "receipt_email",
      status: "queued",
    },
    { onConflict: "donation_id,job_type", ignoreDuplicates: true }
  );

  if (jobError) {
    throw new Error(`Failed to enqueue receipt job: ${jobError.message}`);
  }

  return { processed: true };
}

export async function getQueuedJobs(limit = 10): Promise<Array<{ id: string; donation_id: string }>> {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("processing_jobs")
    .select("id,donation_id")
    .eq("job_type", "receipt_email")
    .eq("status", "queued")
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to load jobs: ${error.message}`);
  }

  return (data || []) as Array<{ id: string; donation_id: string }>;
}

export async function markJobStatus(jobId: string, status: "processing" | "completed" | "failed", errorMessage?: string): Promise<void> {
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin
    .from("processing_jobs")
    .update({ status, last_error: errorMessage || null })
    .eq("id", jobId);

  if (error) {
    throw new Error(`Failed to update job status: ${error.message}`);
  }
}

export async function getDonationById(donationId: string): Promise<DonationRow> {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("donations")
    .select("*")
    .eq("id", donationId)
    .single();

  if (error || !data) {
    throw new Error(`Donation not found: ${donationId}`);
  }

  return data as DonationRow;
}

export async function saveReceipt(donationId: string, receiptNumber: string, receiptPath: string): Promise<void> {
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.from("receipts").upsert(
    {
      donation_id: donationId,
      receipt_number: receiptNumber,
      storage_path: receiptPath,
    },
    { onConflict: "donation_id" }
  );

  if (error) {
    throw new Error(`Failed to save receipt: ${error.message}`);
  }
}

export async function saveEmailDelivery(donationId: string, providerMessageId: string | null, status: "sent" | "failed", lastError?: string): Promise<void> {
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.from("email_deliveries").insert({
    donation_id: donationId,
    provider: "resend",
    provider_message_id: providerMessageId,
    status,
    last_error: lastError || null,
  });

  if (error) {
    throw new Error(`Failed to save email delivery: ${error.message}`);
  }
}
