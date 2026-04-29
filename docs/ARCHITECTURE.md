# Donation Platform Architecture (Razorpay-Only)

## Core Principles

- Razorpay is the only payment provider.
- All donations are processed in INR.
- Webhooks are the source of truth for payment state.
- Receipt/email generation runs synchronously on webhook (no background jobs).

## API Surface

- POST `/api/razorpay-order`
  - Creates donation row in `pending` state.
  - Creates Razorpay order in INR.
  - Returns order details for checkout.

- POST `/api/razorpay-verify`
  - Verifies checkout response signature (`order_id|payment_id`) using `RAZORPAY_KEY_SECRET`.
  - Acknowledgement endpoint only; final state is still decided by webhook.

- POST `/api/payments/razorpay/webhook`
  - Accepts raw request body.
  - Verifies `x-razorpay-signature` using `RAZORPAY_WEBHOOK_SECRET`.
  - Handles `payment.captured` and `payment.failed`.
  - Uses idempotent event persistence (`provider, provider_event_id`).
  - **On payment.captured**: Immediately generates receipt PDF, uploads to storage, and sends email via Resend.
  - Returns HTTP 200 to acknowledge receipt (emails handled internally).

## Data Model Notes

- `donations`
  - `provider`: constrained to `razorpay`.
  - `currency`: persisted as `INR`.
  - `status`: `pending | paid | failed`.

- `payment_events`
  - Idempotency key: unique `(provider, provider_event_id)`.
  - Stores webhook payload for auditability.

- `email_deliveries`
  - Tracks email send status: `queued | sent | failed`.
  - References donation for audit trail.

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
  - Creates donation and Razorpay order.

- `app/api/razorpay-verify/route.ts`
  - Verifies checkout signature (frontend acknowledgement).

- `app/api/payments/razorpay/webhook/route.ts`
  - Webhook handler: processes payment events and sends receipts synchronously.

## Environment Variables

**Core (Required)**:
- `RAZORPAY_KEY_ID` - Razorpay API key ID
- `RAZORPAY_KEY_SECRET` - Razorpay API secret key
- `RAZORPAY_WEBHOOK_SECRET` - Webhook signature verification secret
- `RESEND_API_KEY` - Email service API key
- `DONATION_EMAIL_FROM` - Sender email address
- `SUPABASE_URL` - Database URL
- `SUPABASE_SERVICE_ROLE_KEY` - Admin database token

**Optional (with sensible defaults)**:
- `APP_BASE_URL` - Base URL for email links (default: `http://localhost:3000`)
- `SUPABASE_RECEIPTS_BUCKET` - Storage bucket for receipts (default: `receipts`)
- `SUPABASE_DOCUMENTS_BUCKET` - Storage bucket for documents (default: `documents`)
- `SUPABASE_STATIC_NGO_DOCUMENT_PATH` - Path to 80G document (default: `docs/80G.pdf`)
- `NGO_NAME` - Organization name for receipts
- `NGO_REGISTRATION_NUMBER` - Registration number for receipts
- `NGO_PAN` - PAN for receipts

## End-to-End Flow

1. Donor submits form on `/donate` page.
2. Frontend calls POST `/api/razorpay-order` to create donation and Razorpay order.
3. Backend returns order details for checkout.
4. Frontend opens Razorpay checkout modal.
5. After payment, frontend calls POST `/api/razorpay-verify` to verify signature.
6. Razorpay sends webhook event to `/api/payments/razorpay/webhook`.
7. Backend verifies webhook signature and applies idempotent state transition.
8. **On payment.captured**: Backend immediately:
   - Generates receipt PDF with NGO info
   - Uploads receipt to Supabase Storage
   - Downloads static 80G document
   - Sends receipt email via Resend with both attachments
   - Creates email_deliveries record with status=`sent` or `failed`
9. Donor receives email within seconds with receipt and 80G certificate.
