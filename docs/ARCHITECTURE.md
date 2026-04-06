# 🏗️ System Architecture & Flow Diagrams

## **End-to-End Donation Flow**

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DONATION PLATFORM                           │
└─────────────────────────────────────────────────────────────────────┘

1. FRONTEND: Donation Form
   ┌──────────────────────────┐
   │ app/donate/page.tsx      │
   │                          │
   │ Form Input:             │
   │ - Donor Name            │
   │ - Email                 │
   │ - Amount                │
   │ - Country Code          │
   └────────────┬─────────────┘
                │
                │ POST /api/payments/create
                │
                ▼
2. BACKEND: Payment Routing
   ┌──────────────────────────────────────────┐
   │ app/api/payments/create/route.ts         │
   │                                          │
   │ 1. Save donation → DB (status: pending) │
   │ 2. Route by country:                    │
   │    - country_code="IN" → Razorpay      │
   │    - else → Stripe                      │
   │ 3. Create payment session               │
   └───────────────────────┬──────────────────┘
         ┌────────────────┴────────────────┐
         │                                 │
         ▼                                 ▼
3. PAYMENT PROVIDER: Checkout Session
   ┌────────────────────┐        ┌────────────────────┐
   │   RAZORPAY      │        │      STRIPE        │
   │                │        │                    │
   │ Create Order   │        │ Create Checkout    │
   │ Redirect URL   │        │ Session → URL      │
   │                │        │                    │
   └────┬───────────┘        └──────┬─────────────┘
        │                           │
        │ Donor completes payment   │
        │                           │
        ▼                           ▼
4. WEBHOOK: Payment Captured
   ┌────────────────────────────────┐    ┌────────────────────────────────┐
   │ Razorpay Webhook               │    │ Stripe Webhook                 │
   │ POST /payments/razorpay/webhook│    │ POST /payments/stripe/webhook  │
   │                                │    │                                │
   │ 1. Verify HMAC signature       │    │ 1. Verify signature            │
   │ 2. Parse payment.captured      │    │ 2. Parse completion event      │
   │ 3. Check idempotency (prevent │    │ 3. Check idempotency          │
   │    duplicate events)           │    │                                │
   │ 4. Mark donation as "paid"     │    │ 4. Mark donation as "paid"     │
   │ 5. Create payment_event record │    │ 5. Create payment_event record │
   │ 6. Queue jobs/receipt_email    │    │ 6. Queue jobs/receipt_email    │
   └────────────────┬───────────────┘    └──────────┬──────────────────────┘
                    │                               │
                    └───────────────┬────────────────┘
                                    │
                                    ▼
5. DATABASE: Payment Recorded
   ┌──────────────────────────┐
   │ Supabase Postgres        │
   │                          │
   │ donations:               │
   │ ├─ id: UUID             │
   │ ├─ status: "paid"       │ ◄── Updated
   │ └─ payment_provider: "razorpay" or "stripe"
   │                          │
   │ payment_events:          │
   │ ├─ id: UUID             │
   │ ├─ provider_event_id: "unique"
   │ │  (prevents duplicates) │
   │ └─ status: "recorded"    │
   │                          │
   │ processing_jobs:         │
   │ ├─ id: UUID             │
   │ ├─ type: "receipt_email" │
   │ ├─ status: "pending"    │ ◄── NEW
   │ └─ donation_id: UUID    │
   └──────────────┬───────────┘
                  │
                  │ Cron job / Manual trigger
                  │
                  ▼
6. ASYNC PROCESSOR: Receipt & Email
   ┌──────────────────────────────────────┐
   │ app/api/jobs/receipt-email/route.ts  │
   │                                      │
   │ 1. Fetch pending jobs (batch limit)  │
   │ 2. For each job:                     │
   │    a. Generate Receipt PDF           │
   │       - PDFKit dynamic content       │
   │       - Donor name, amount, date     │
   │       - NGO legal details            │
   │    b. Upload to Supabase Storage     │
   │    c. Get static NGO doc from bucket │
   │    d. Send email via Resend          │
   │       - Receipt PDF (attachment)     │
   │       - NGO doc PDF (attachment)     │
   │       - Thank you message            │
   │ 3. Mark job complete                 │
   │ 4. Record delivery status            │
   └──────────────┬───────────────────────┘
                  │
        ┌─────────┴──────────┬──────────────┐
        │                    │              │
        ▼                    ▼              ▼
   ┌─────────────┐   ┌──────────────┐   ┌────────────────┐
   │  SUPABASE   │   │   RESEND     │   │  Donor Inbox   │
   │  STORAGE    │   │   API        │   │                │
   │             │   │              │   │ ✅ Email       │
   │ receipts/   │   │ Send Email   │   │ ✅ Receipt.pdf │
   │ {id}.pdf    │   │ with PDFs    │   │ ✅ NGO_doc.pdf │
   │             │   │              │   │                │
   └─────────────┘   └──────────────┘   └────────────────┘
```

---

## **Database Schema Relationship Diagram**

```
┌──────────────────────────────────────────────────────────────────┐
│                       SUPABASE POSTGRES                          │
└──────────────────────────────────────────────────────────────────┘

┌─────────────────────────────┐
│     donations (Main)        │
├─────────────────────────────┤
│ id (UUID) PK                │
│ donor_name (text)           │
│ donor_email (email)         │
│ amount (integer, paise)     │
│ currency_code (IN/USD)      │ ◄──┐
│ country_code (IN/US)        │    │
│ payment_provider (text)     │    │
│ payment_provider_id (text)  │    │
│ status (pending/paid)       │ ◄── from payment flow
│ error_message (text)        │
│ created_at (timestamp)      │
│ updated_at (timestamp)      │
│ metadata (jsonb)            │
└──┬──────────────────────────┘
   │
   │ (1 to Many)
   ├──────────────────────────────┐
   │                              │
   ▼                              ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│  payment_events          │  │  processing_jobs         │
├──────────────────────────┤  ├──────────────────────────┤
│ id (UUID) PK             │  │ id (UUID) PK             │
│ donation_id (FK) ────────┼──┼─ donation_id (FK)        │
│ provider (razorpay/stripe)  │ type (receipt_email)     │
│ provider_event_id (text) │  │ status (pending/success) │
│ event_name (text)        │  │ error_message (text)     │
│ event_data (jsonb)       │  │ retry_count (integer)    │
│ status (recorded)        │  │ last_attempt_at (ts)     │
│ created_at (timestamp)   │  │ completed_at (timestamp) │
├──────────────────────────┤  └──┬───────────────────────┘
│ UNIQUE:                  │     │
│ (provider, event_id)     │     │ (1 to Many)
│ ◄─ Prevents duplicates   │     │
└──────────────────────────┘     │
                                 ├──────────────────────────┐
                                 │                          │
                                 ▼                          ▼
                          ┌────────────────────┐  ┌──────────────────────┐
                          │  receipts          │  │  email_deliveries    │
                          ├────────────────────┤  ├──────────────────────┤
                          │ id (UUID) PK       │  │ id (UUID) PK         │
                          │ donation_id (FK)   │  │ donation_id (FK)     │
                          │ file_path (text)   │  │ recipient_email      │
                          │ file_size_bytes    │  │ status (success/fail)│
                          │ created_at         │  │ provider_response    │
                          └────────────────────┘  │ created_at           │
                                                  └──────────────────────┘
```

---

## **Webhook Signature Verification Flow**

```
CLIENT (Razorpay/Stripe) sends webhook
        │
        ▼
HTTP POST /api/payments/{provider}/webhook
├─ Headers: X-Razorpay-Signature or Stripe-Signature
├─ Body: Raw JSON payload
        │
        ▼
Extract signature from headers
        │
        ▼
Reconstruct signature = HMAC-SHA256(secret, body)
        │
        ├─ If Razorpay:
        │  └─ HMAC-SHA256(RAZORPAY_WEBHOOK_SECRET, body)
        │
        └─ If Stripe:
           └─ HMAC-SHA256(STRIPE_WEBHOOK_SECRET, timestamp.body)
        │
        ▼
Compare: webhook_signature === reconstructed_signature
        │
        ├─ ✅ MATCH: Process event (trusted)
        │  ├─ Parse event data
        │  ├─ Check idempotency (provider_event_id unique?)
        │  ├─ Update donation status
        │  ├─ Create payment_event record
        │  └─ Queue receipt_email job
        │
        └─ ❌ MISMATCH: Reject (untrusted)
           └─ Log error + return 403
```

---

## **Idempotency Pattern**

```
PROBLEM: What if webhook fires twice?
│
├─ Network timeout: Webhook sent, but response lost
├─ Retry logic: Provider resends webhook
└─ Result: Duplicate donation/receipt/email

SOLUTION: Idempotent Processing
│
├─ Key: (payment_provider, provider_event_id)
├─ Database: UNIQUE constraint on (provider, provider_event_id)
│
├─ Flow:
│  1. Webhook arrives with event_id = "payment.razorpay.abc123"
│  2. Try INSERT into payment_events:
│     INSERT INTO payment_events
│       (donation_id, provider, provider_event_id, ...)
│     VALUES
│       (123, 'razorpay', 'abc123', ...)
│  3. If event_id already exists:
│     └─ Unique constraint violation
│     └─ Skip duplicate processing
│     └─ Return 200 OK (webhook OK, event ignored)
│  4. If event_id is new:
│     └─ Insert succeeds
│     └─ Process normally
│     └─ Return 200 OK (webhook processed)
│
RESULT: Only ONE receipt + ONE email per payment ✅
```

---

## **Async Job Processing Architecture**

```
SCENARIO 1: Webhook Immediately
├─ Webhook received ✅
├─ Donation marked paid ✅
├─ Job queued ✅
└─ Return 200 OK quickly (< 1 second)

SCENARIO 2: Heavy Work Deferred
├─ DON'T wait for:
│  ├─ PDF generation (slow)
│  ├─ Supabase Storage upload (slow)
│  └─ Email sending (slow)
├─ Instead: Queue job + respond immediately
└─ Worker processes later

WORKER TRIGGERED BY (choose one):

Option A: Vercel Crons (if deployed on Vercel)
├─ Configure vercel.json:
│  {
│    "crons": [{
│      "path": "/api/jobs/receipt-email",
│      "schedule": "*/5 * * * *"  # Every 5 min
│    }]
│  }
└─ Automatic invocation every 5 minutes

Option B: External Service (ngrok + third-party)
├─ EasyCron (https://www.easycron.com)
├─ AWS EventBridge
├─ Railway scheduled jobs
└─ Curl command on external server

Option C: Manual Trigger (for testing)
├─ curl -X POST http://localhost:3000/api/jobs/receipt-email
├─ Guard: Authorization Bearer token
└─ Response: {"processed": X}

SECURITY:
├─ Endpoint protected with Authorization header
├─ Bearer token: DONATION_JOBS_SECRET
├─ Only jobs with status='pending' processed
├─ Transaction ensures atomicity
└─ Retry logic handles failures


BATCH PROCESSING:
Job Processor fetches:
├─ LIMIT 10 pending jobs per invocation
├─ Prevents overwhelming system
├─ Can be re-invoked when needed
└─ Scales naturally
```

---

## **Environment Variable Flow**

```
.env (Local Machine)
│
├─ Supabase credentials
│  ├─ SUPABASE_URL
│  └─ SUPABASE_SERVICE_ROLE_KEY
│
├─ Razorpay credentials (Test Mode)
│  ├─ RAZORPAY_KEY_ID
│  ├─ RAZORPAY_KEY_SECRET
│  ├─ RAZORPAY_WEBHOOK_SECRET
│  └─ NEXT_PUBLIC_RAZORPAY_KEY_ID
│
├─ Stripe credentials (Test Mode)
│  ├─ STRIPE_SECRET_KEY
│  └─ STRIPE_WEBHOOK_SECRET
│
├─ Email credentials
│  ├─ RESEND_API_KEY
│  └─ DONATION_EMAIL_FROM
│
├─ Security
│  └─ DONATION_JOBS_SECRET
│
├─ App URLs
│  └─ APP_BASE_URL (ngrok URL)
│
└─ NGO Details
   ├─ NGO_NAME
   ├─ NGO_REGISTRATION_NUMBER
   └─ NGO_PAN

Next.js App reads at:
├─ Runtime (server-side):
│  ├─ process.env.SUPABASE_URL
│  ├─ process.env.RAZORPAY_KEY_SECRET (secret)
│  └─ process.env.STRIPE_SECRET_KEY (secret)
│
└─ Build time (client-side with NEXT_PUBLIC_):
   ├─ process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
   └─ process.env.NEXT_PUBLIC_APP_BASE_URL
```

---

## **Security Layers**

```
┌────────────────────────────────────────────────────────┐
│           SECURITY ARCHITECTURE                        │
└────────────────────────────────────────────────────────┘

LAYER 1: Webhook Signature Verification
├─ Razorpay: HMAC-SHA256
├─ Stripe: HMAC-SHA256 (with timestamp)
└─ Prevents: Man-in-the-middle attacks

LAYER 2: Idempotent Processing
├─ UNIQUE (provider, provider_event_id)
└─ Prevents: Duplicate processing from retries

LAYER 3: Bearer Token Authentication
├─ Job processor endpoint: /api/jobs/receipt-email
├─ Header: Authorization: Bearer {DONATION_JOBS_SECRET}
└─ Prevents: Unauthorized job triggering

LAYER 4: Database Constraints
├─ Foreign keys (donation_id references donations)
├─ Not null constraints (critical fields)
└─ Prevents: Data integrity violations

LAYER 5: Environment Variable Isolation
├─ Secrets in .env (never committed)
├─ Public keys exposed safely (NEXT_PUBLIC_)
├─ Lazy client initialization (no build-time errors)
└─ Prevents: Accidental key exposure

LAYER 6: Error Handling
├─ Webhook failures logged but don't crash
├─ Job processor errors recorded in DB
├─ Email delivery failures tracked
└─ Prevents: Silent failures

LAYER 7: Logging & Monitoring
├─ Each operation logged in database
├─ Timestamps on all events
├─ Error messages captured
└─ Enables: Audit trail & debugging
```

---

## **Data Flow: From Donation to Inbox**

```
Timeline of Complete Donation Process:

T+0s:   Donor fills form & clicks "Donate"
        └─ Form data: name, email, amount, country

T+0.5s: POST /api/payments/create
        ├─ Validate input
        ├─ Create donation row (status="pending")
        ├─ Route: India → Razorpay | Else → Stripe
        └─ Return: checkout URL + payment session ID

T+1s:   Donor redirected to Razorpay/Stripe checkout
        └─ Complete payment on provider's platform

T+1.5s: Provider captures payment ✅
        └─ Provider calls webhook

T+2s:   Webhook received at /api/payments/{provider}/webhook
        ├─ Verify signature ✅
        ├─ Parse event
        ├─ Check not duplicate (UNIQUE constraint) ✅
        ├─ Update donation status="paid"
        ├─ Record payment_event
        ├─ Queue processing_jobs (type="receipt_email", status="pending")
        └─ Return 200 OK

T+2.5s: API returns to Razorpay/Stripe ✅
        └─ Webhook confirmed received (prevent retry)

T+3s - T+3min: Background job processor runs
        ├─ Fetch all pending jobs (LIMIT 10)
        ├─ For each job:
        │  ├─ Generate receipt PDF (PDFKit)
        │  ├─ Upload to Supabase Storage/receipts/{id}.pdf
        │  ├─ Fetch static NGO doc from Supabase Storage/documents/80G.pdf
        │  ├─ Send email via Resend:
        │  │  ├─ To: donor_email
        │  │  ├─ From: onboarding@resend.dev
        │  │  ├─ Subject: "Thank You for Your Donation"
        │  │  ├─ Body: HTML template with links + details
        │  │  └─ Attachments: [receipt.pdf, 80G.pdf]
        │  ├─ Record email_delivery (status="success")
        │  └─ Update processing_job (status="success")
        └─ Return: {"processed": N, "results": [...]}

T+3min: Donor checks inbox
        ├─ Email received ✅
        ├─ Receipt PDF attached ✅
        ├─ NGO doc attached ✅
        └─ Thank you message displayed ✅

TOTAL TIME: ~3 minutes from donation to inbox email
(Most of which is processing_job run frequency)
```

---

## **Provider-Specific Implementation Details**

### **Razorpay**

```
RAZORPAY FLOW:

1. Create Order (Backend)
   POST https://api.razorpay.com/v1/orders
   ├─ Key: RAZORPAY_KEY_ID
   ├─ Secret: RAZORPAY_KEY_SECRET
   ├─ Body: { amount (paise), currency, receipt }
   └─ Response: { id: "order_abc123..." }

2. Frontend Checkout
   ├─ Load Razorpay script: <script src="https://checkout.razorpay.com/v1/checkout.js">
   ├─ Initialize: var rzp = new Razorpay({...})
   ├─ Open: rzp.open()
   └─ Donor completes payment in Razorpay modal

3. Webhook (Payment Captured)
   POST https://your-domain/api/payments/razorpay/webhook
   ├─ Event: "payment.captured"
   ├─ Header: X-Razorpay-Signature = HMAC-SHA256(secret, body)
   ├─ Body: { event, payload: { payment: { id, amount, receipt } } }
   └─ Action: Mark donation paid, queue receipt_email

KEY VALIDATIONS:
├─ Verify signature matches exactly
├─ Check payment.amount == donation.amount (prevent tampering)
└─ Check payment.receipt == donation.id (idempotency key)

WEBHOOK SECRET:
├─ Generate in Dashboard → Settings → Webhooks
├─ Used ONLY for signature verification
└─ Different from API secret key
```

### **Stripe**

```
STRIPE FLOW:

1. Create Checkout Session (Backend)
   POST https://api.stripe.com/v1/checkout/sessions
   ├─ Key: STRIPE_SECRET_KEY (Bearer token)
   ├─ Body: { 
   │    checkout.mode: "payment",
   │    line_items: [{ price_data: { amount: X, currency: "usd" } }],
   │    success_url: "...",
   │    cancel_url: "..."
   │  }
   └─ Response: { id: "cs_test_abc123...", url: "..." }

2. Frontend Redirect
   ├─ Redirect to Stripe Checkout URL
   ├─ Donor enters card details on Stripe
   └─ Completes payment

3. Webhook (Checkout Session Completed)
   POST https://your-domain/api/payments/stripe/webhook
   ├─ Event: "checkout.session.completed"
   ├─ Header: Stripe-Signature = HMAC-SHA256(secret, timestamp.body)
   ├─ Body: { type: "checkout.session.completed", data: { object: {...} } }
   └─ Action: Mark donation paid, queue receipt_email

KEY VALIDATIONS:
├─ Verify signature with timestamp included
├─ Check session.amount_total == donation.amount (prevent tampering)
├─ Check session.metadata.donation_id for idempotency
└─ Check session.payment_status == "paid"

WEBHOOK SECRET:
├─ Generate in Dashboard → Developers → Webhooks → Endpoint
├─ Different from API secret key
└─ Used ONLY for signature verification
```

---

## **Deployment Checklist**

```
LOCAL TESTING COMPLETE ✅

BEFORE PRODUCTION:

[ ] Update API Keys
    [ ] Replace Test Mode keys with Live Mode keys
    [ ] Razorpay: Settings → Switch to Live Mode
    [ ] Stripe: Switch to Live Mode
    [ ] Rotate all credentials (new API keys)

[ ] Update Resend
    [ ] Verify domain: somaiya.edu
    [ ] Update DONATION_EMAIL_FROM to domain sender
    [ ] Enable DKIM/SPF/DMARC

[ ] Update Webhooks
    [ ] Point production URL (not ngrok)
    [ ] Configure in both Razorpay & Stripe live dashboards
    [ ] Test with production keys locally before deploying

[ ] Environment Configuration
    [ ] Vercel `.env.production`
    [ ] Railway env vars
    [ ] AWS Lambda env vars (if using)
    [ ] Ensure DONATION_JOBS_SECRET != test value

[ ] Cron Job Setup
    [ ] Vercel Crons: Configure vercel.json
    [ ] Or external: Set up scheduled curl to job endpoint
    [ ] Test: Verify jobs run automatically every 5 min

[ ] Monitoring
    [ ] Set up error logging (Sentry, Datadog)
    [ ] Monitor webhook delivery rates
    [ ] Monitor email delivery rates
    [ ] Alert on failures

[ ] Security Audit
    [ ] .env not committed to git
    [ ] No secrets in code
    [ ] CORS configured correctly
    [ ] Rate limiting on payment endpoints
    [ ] IP whitelisting for webhooks (optional)

[ ] Testing with Live Keys
    [ ] Make real test payment (small amount)
    [ ] Verify webhook delivery
    [ ] Verify email sent
    [ ] Verify PDF receipt
    [ ] Delete test donation after verification

[ ] Go Live
    [ ] Deploy to production
    [ ] Monitor for errors
    [ ] Be ready to rollback
```

---

**Architecture Last Updated**: April 6, 2026  
**System Status**: Production-Ready (local testing phase)
