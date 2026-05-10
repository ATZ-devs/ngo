# Jeev Kutumb Foundation - Donation Platform

> Making a Difference, One Donation at a Time

This platform is built to protect donor trust, verify every Razorpay payment server-side, and automate 80G tax compliance end to end. It is designed for clear accountability, secure processing, and rapid receipt delivery.

---

## Donor trust and payment transparency

- Server-side verification only. Payment status is never trusted from the frontend.
- Razorpay webhook signatures are validated before any record is updated.
- Idempotent processing prevents duplicate donations from repeated webhooks.
- Every donation has a verifiable audit trail and receipt lifecycle.

---

## Automated 80G compliance

- 80G certificate is automatically attached to every verified receipt.
- PDF receipts are generated only after successful signature verification.
- Receipts are delivered through a secure transactional email provider.
- Donation records are stored for audit, donor reference, and compliance.

---

## Razorpay security model

- Card and UPI data never touch our servers; Razorpay handles payment data.
- All payment traffic is protected by TLS 1.2+ in transit.
- Webhooks are verified cryptographically using a shared secret.
- Frontend status is treated as informational only and never authoritative.

---

## Platform impact

The platform supports transparent, verifiable giving across healthcare, education, skill development, women empowerment, and social welfare initiatives. Donors receive immediate confirmation and compliant tax documentation without manual follow-up.

---

## Architecture overview

### Technology stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 14 (App Router) | Donor interface and form experience |
| Backend | Next.js API Routes | Payment verification and receipts |
| Database | Supabase (PostgreSQL) | Donation and event storage |
| Storage | Supabase Storage | Receipt PDFs and documents |
| Payments | Razorpay | Payment processing and webhooks |
| Email | Resend | Transactional email delivery |
| Hosting | Vercel | Global CDN and serverless runtime |
| Domain | GoDaddy (DNS via Vercel) | Custom domain and SSL/TLS |

### Data flow

```
Donor -> Razorpay -> Webhook verification -> Database update -> Receipt PDF -> Email delivery
```

Key principle: every step is independently verified. No assumptions are made about frontend-reported payment status.

---

## Support and contact

- Website: https://jeevkutumbfoundation.com
- Email: jeevkutumbfoundation@gmail.com
- Phone: +91 77100 75418

---

## Security

For vulnerability reporting, see SECURITY.md. Do not disclose vulnerabilities in public issues.

---

Last updated: May 10, 2026

