# NGO Donation Platform

Production-oriented donation flow for Next.js App Router with:

- Razorpay for India donations
- Stripe for international donations
- Supabase Postgres for donation and webhook state
- Supabase Storage for receipt PDF storage
- Resend for donation email delivery
- PDFKit for dynamic receipt PDF generation

## Backend Flow Summary

1. Client submits donation form to `POST /api/payments/create`.
2. Backend creates a `pending` donation row in Supabase.
3. Backend routes payment provider:
	- `IN` -> Razorpay order
	- Other countries -> Stripe checkout session
4. Provider webhooks confirm payment:
	- `POST /api/payments/razorpay/webhook`
	- `POST /api/payments/stripe/webhook`
5. Webhook handler marks donation `paid`, stores event idempotently, and enqueues `receipt_email` job.
6. Worker endpoint `POST /api/jobs/receipt-email` processes queued jobs:
	- Generate receipt PDF
	- Upload receipt PDF to Supabase Storage
	- Download static NGO PDF from Supabase Storage
	- Send email with both attachments using Resend

## Setup

1. Copy env template:

```bash
cp .env.example .env.local
```

2. Configure all variables in `.env.local`.

3. Initialize Supabase tables:

```sql
-- Run in Supabase SQL editor
-- File: supabase/schema.sql
```

4. Create Supabase storage buckets:
	- `receipts`
	- `documents`

5. Upload your static NGO document to the `documents` bucket at:
	- `ngo-static-document.pdf`
	- Or change `SUPABASE_STATIC_NGO_DOCUMENT_PATH`

6. Start app:

```bash
npm run dev
```

## Worker Endpoint and Cron

Webhook handlers are intentionally lightweight. Job execution is decoupled and triggered via:

- `POST /api/jobs/receipt-email`
- Header: `Authorization: Bearer <DONATION_JOBS_SECRET>`

For production, invoke this route on a short schedule (for example every minute) with Vercel Cron or any external scheduler.

## Important API Endpoints

- `POST /api/payments/create`
- `POST /api/payments/razorpay/order`
- `POST /api/payments/stripe/checkout`
- `POST /api/payments/razorpay/webhook`
- `POST /api/payments/stripe/webhook`
- `POST /api/jobs/receipt-email`

## Security Checklist

- Keep all secrets server-side only.
- Verify webhook signatures.
- Do not trust frontend success callbacks for payment confirmation.
- Use idempotent webhook event inserts (`provider + provider_event_id` unique key).
- Restrict job endpoint using bearer secret.

