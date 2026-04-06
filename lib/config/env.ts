import "server-only";

function getEnv(name: string, fallback = ""): string {
  return process.env[name] || fallback;
}

export const env = {
  supabaseUrl: getEnv("SUPABASE_URL"),
  supabaseServiceRoleKey: getEnv("SUPABASE_SERVICE_ROLE_KEY"),
  stripeSecretKey: getEnv("STRIPE_SECRET_KEY"),
  stripeWebhookSecret: getEnv("STRIPE_WEBHOOK_SECRET"),
  razorpayKeyId: getEnv("RAZORPAY_KEY_ID"),
  razorpayKeySecret: getEnv("RAZORPAY_KEY_SECRET"),
  razorpayWebhookSecret: getEnv("RAZORPAY_WEBHOOK_SECRET"),
  resendApiKey: getEnv("RESEND_API_KEY"),
  donationEmailFrom: getEnv("DONATION_EMAIL_FROM"),
  appBaseUrl: getEnv("APP_BASE_URL", "http://localhost:3000"),
  donationJobsSecret: getEnv("DONATION_JOBS_SECRET"),
  receiptsBucket: getEnv("SUPABASE_RECEIPTS_BUCKET", "receipts"),
  documentsBucket: getEnv("SUPABASE_DOCUMENTS_BUCKET", "documents"),
  staticNgoDocumentPath: getEnv("SUPABASE_STATIC_NGO_DOCUMENT_PATH", "docs/80G.pdf"),
  ngoName: getEnv("NGO_NAME", "NGO Foundation"),
  ngoRegistrationNumber: getEnv("NGO_REGISTRATION_NUMBER", ""),
  ngoPan: getEnv("NGO_PAN", ""),
};
