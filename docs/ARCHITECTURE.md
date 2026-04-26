# Donation Platform Architecture (Razorpay-Only)

## Core Principles

- Razorpay is the only payment provider.
- All donations are processed in INR.
- Webhooks are the source of truth for payment state.
- Receipt/email generation runs asynchronously via a queued job.

## API Surface

- POST `/api/razorpay-order`
  - Creates donation row in `pending` state.
  - Creates Razorpay order in INR.
  - Returns order details for checkout.

- POST `/api/razorpay-verify`
  - Verifies checkout response signature (`order_id|payment_id`) using `RAZORPAY_KEY_SECRET`.
  - Acknowledgement endpoint only; final state is still decided by webhook.

- POST `/api/razorpay-webhook`
  - Accepts raw request body.
  - Verifies `x-razorpay-signature` using `RAZORPAY_WEBHOOK_SECRET`.
  - Handles `payment.captured` and `payment.failed`.
  - Uses idempotent event persistence (`provider, provider_event_id`).
  - Returns quickly to avoid provider retries.

- POST `/api/jobs/receipt-email`
  - Protected by `Authorization: Bearer <DONATION_JOBS_SECRET|CRON_SECRET>`.
  - Processes queued receipt jobs.

## Data Model Notes

- `donations`
  - `provider`: constrained to `razorpay`.
  - `currency`: persisted as `INR`.
  - `status`: `pending | paid | failed`.

- `payment_events`
  - Idempotency key: unique `(provider, provider_event_id)`.
  - Stores webhook payload for auditability.

- `processing_jobs`
  - Receipt/email jobs (`receipt_email`) with queue semantics.

## Folder Structure

- `lib/payments/razorpay.ts`
  - Order creation.
  - Checkout signature verification.
  - Webhook signature verification.
  - Webhook payload parsing.

- `lib/email/`
  - Resend integration and donation email composition.

- `lib/pdf/`
  - Receipt PDF generation.

- `app/api/razorpay-order/route.ts`
- `app/api/razorpay-verify/route.ts`
- `app/api/razorpay-webhook/route.ts`

## Environment Variables

Required:

- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `DONATION_EMAIL_FROM`

Operational:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DONATION_JOBS_SECRET`
- `CRON_SECRET`
- `SUPABASE_RECEIPTS_BUCKET`
- `SUPABASE_DOCUMENTS_BUCKET`
- `SUPABASE_STATIC_NGO_DOCUMENT_PATH`

## End-to-End Flow

1. Donor submits form.
2. Backend creates Razorpay order (`INR`) and pending donation record.
3. Frontend opens Razorpay checkout.
4. Frontend posts checkout response to `/api/razorpay-verify`.
5. Razorpay sends webhook event.
6. Backend verifies webhook signature and applies idempotent state transition.
7. For successful capture, backend enqueues `receipt_email` job.
8. Job worker generates receipt PDF, attaches static NGO document, and sends email via Resend.
