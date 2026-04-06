import "server-only";

import { Resend } from "resend";

import { env } from "@/lib/config/env";

let resendClient: Resend | null = null;

function getResend() {
  if (!env.resendApiKey) {
    throw new Error("Missing RESEND_API_KEY.");
  }

  if (!resendClient) {
    resendClient = new Resend(env.resendApiKey);
  }

  return resendClient;
}

interface SendDonationEmailInput {
  donorName: string;
  donorEmail: string;
  amountMinor: number;
  currency: string;
  transactionId: string;
  receiptPdf: Buffer;
  ngoDocumentPdf: Buffer;
}

export async function sendDonationEmail(input: SendDonationEmailInput): Promise<string | null> {
  const resend = getResend();
  if (!env.donationEmailFrom) {
    throw new Error("Missing DONATION_EMAIL_FROM.");
  }

  const amountText = `${(input.amountMinor / 100).toFixed(2)} ${input.currency}`;

  const response = await resend.emails.send({
    from: env.donationEmailFrom,
    to: [input.donorEmail],
    subject: "Thank you for your donation - Jeevkutumb Foundation",
    html: `
      <p>Dear ${input.donorName},</p>

      <p>Thank you for your generous contribution to Jeevkutumb Foundation.</p>

      <p>We deeply value your decision to support our work. Your contribution reflects a shared belief in building a more compassionate and responsible society, and it plays an important role in enabling us to continue our efforts.</p>

      <p>Please find attached your donation receipt along with our 80G certificate, which may be used to claim applicable tax benefits while filing your income tax return.</p>

      <p><strong>Amount:</strong> ${amountText}<br/>
      <strong>Transaction ID:</strong> ${input.transactionId}</p>

      <p>We are sincerely grateful for your trust and support.</p>

      <p>Warm regards,<br/>Jeevkutumb Foundation</p>
    `,
    attachments: [
      {
        filename: "donation-receipt.pdf",
        content: input.receiptPdf.toString("base64"),
      },
      {
        filename: "ngo-document.pdf",
        content: input.ngoDocumentPdf.toString("base64"),
      },
    ],
  });

  if (response.error) {
    throw new Error(`Resend email failed: ${response.error.message}`);
  }

  return response.data?.id || null;
}
