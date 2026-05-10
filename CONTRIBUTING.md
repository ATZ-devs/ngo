# Contributing

Thank you for contributing. This project handles donations and tax compliance, so changes must be careful, reviewed, and secure.

## Prerequisites

- Node.js 20.9+ and npm 10+
- Supabase account (PostgreSQL + Storage)
- Razorpay account (test mode for development)
- Resend account for email delivery

## Local setup

1. Clone the repository
   ```bash
   git clone https://github.com/ATZ-devs/ngo.git
   cd ngo
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Copy the environment template
   ```bash
   cp .env.example .env.local
   ```

4. Configure environment variables (see below)

5. Initialize Supabase
   - Run SQL from supabase/schema.sql
   - Create storage buckets: receipts and documents
   - Upload the 80G certificate PDF to the documents bucket

6. Start the development server
   ```bash
   npm run dev
   ```

7. Open http://localhost:3000

## Environment variables

- Required variables are listed in .env.example.
- Use .env.local for local development only.
- Do not commit secrets or paste them into issues or PRs.
- Use Razorpay test keys for local development.
- Keep the webhook secret in sync with Razorpay dashboard settings.
- Use a verified sender or sandbox domain for Resend.

## Webhook testing (Razorpay)

1. Expose your local server with an HTTPS tunnel.
2. Configure a webhook in Razorpay pointing to:
   /api/razorpay/webhook
3. Set the same webhook secret in Razorpay and .env.local.
4. Trigger a test payment and send a test webhook from the Razorpay dashboard.
5. Confirm the donation is recorded once and the receipt is generated.
6. Replay the same webhook to verify idempotency (no duplicate donation or receipt).

## Testing and quality

- Run lint checks:
  ```bash
  npm run lint
  ```
- If you add tests, include them in your PR and document how to run them.

## Pull request process

- Create a feature branch.
- Link a relevant issue in the PR description.
- Keep changes focused and minimal.
- Update documentation when behavior changes.
- Complete the PR checklist, including webhook idempotency verification.

## Security issues

Do not open public issues for vulnerabilities. See SECURITY.md for reporting.