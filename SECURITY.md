# Security Policy

## Reporting a Vulnerability

Report security issues privately by email to:

jeevkutumbfoundation@gmail.com

Do not open public GitHub issues or disclose vulnerabilities publicly.

Include the following in your report:

- A clear description of the issue and potential impact
- Steps to reproduce (proof of concept if available)
- Affected endpoints, routes, or components
- Any relevant logs, request IDs, or timestamps
- Whether the issue is confirmed in production or only in test mode

Please use test accounts and avoid accessing or modifying real donor data.

### Response expectations

- Acknowledgement within 2 business days
- Initial triage within 5 business days
- Status updates at least every 7 days until resolved
- Target remediation windows:
  - Critical: 30 days
  - High: 60 days
  - Medium: 90 days
  - Low: as scheduled

We will coordinate disclosure timelines once a fix is available.

## Scope

In scope:

- Donation flow and payment verification endpoints
- Razorpay webhook handling and signature verification
- Receipt generation and storage access
- Email delivery of receipts
- API routes and server-side logic in this repository
- Configuration under version control in this repository

Out of scope:

- Issues in third-party services (Razorpay, Supabase, Resend, Vercel, GoDaddy)
  unless caused by our configuration or code
- Social engineering, phishing, or physical attacks
- Denial-of-service testing or high-traffic attacks
- Issues requiring access to private data or credentials

Thank you for helping us protect donors and beneficiaries.