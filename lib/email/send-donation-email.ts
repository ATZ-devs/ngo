import "server-only";

import { Resend } from "resend";

import { env } from "@/lib/config/env";
import { escapeHtml } from "@/lib/security/crypto";

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
  ngoDocumentPdf?: Buffer; // Optional: only if PAN is provided
  includeTaxBenefit?: boolean; // Whether to mention tax benefits in email
}

export interface SendEmailResult {
  success: boolean;
  messageId: string | null;
  error: string | null;
}

export async function sendDonationEmail(input: SendDonationEmailInput): Promise<SendEmailResult> {
  const resend = getResend();
  if (!env.donationEmailFrom) {
    const error = "Missing DONATION_EMAIL_FROM.";
    console.error("[sendDonationEmail] ERROR:", error);
    throw new Error(error);
  }

  const donorName = escapeHtml(input.donorName);
  const transactionId = escapeHtml(input.transactionId);
  const amountText = `${(input.amountMinor / 100).toFixed(2)} ${input.currency}`;

  console.log(
    `[sendDonationEmail] Sending email to ${input.donorEmail} for transaction ${transactionId}` +
    (input.includeTaxBenefit ? " (with 80G certificate)" : " (receipt only)")
  );

  try {
    // Build attachments array
    const attachments: Array<{ filename: string; content: string }> = [
      {
        filename: "donation-receipt.pdf",
        content: input.receiptPdf.toString("base64"),
      },
    ];

    // Conditionally add 80G certificate
    if (input.ngoDocumentPdf) {
      attachments.push({
        filename: "80g-certificate.pdf",
        content: input.ngoDocumentPdf.toString("base64"),
      });
    }

    // Build email body
    const taxBenefitParagraph = input.includeTaxBenefit
      ? `<p>Please find attached your donation receipt along with our 80G certificate, which may be used to claim applicable tax benefits while filing your income tax return.</p>`
      : `<p>Please find attached your donation receipt.</p>`;

    const response = await resend.emails.send({
      from: env.donationEmailFrom,
      to: [input.donorEmail],
      subject: "Thank you for your donation - Jeevkutumb Foundation",
      html: `
        <p>Dear ${donorName},</p>

        <p>Thank you for your generous contribution to Jeevkutumb Foundation.</p>

        <p>We deeply value your decision to support our work. Your contribution reflects a shared belief in building a more compassionate and responsible society, and it plays an important role in enabling us to continue our efforts.</p>

        ${taxBenefitParagraph}

        <p><strong>Amount:</strong> ${amountText}<br/>
        <strong>Transaction ID:</strong> ${transactionId}</p>

        <p>We are sincerely grateful for your trust and support.</p>

        <p>Warm regards,<br/>Jeevkutumb Foundation</p>
      `,
      attachments,
    });

    if (response.error) {
      const errorMessage = `Resend API error: ${response.error.message}`;
      console.error(`[sendDonationEmail] FAILED for ${input.donorEmail}:`, errorMessage);
      return {
        success: false,
        messageId: null,
        error: errorMessage,
      };
    }

    const messageId = response.data?.id || null;
    if (!messageId) {
      const errorMessage = "Resend returned success but no message ID";
      console.warn(`[sendDonationEmail] WARNING for ${input.donorEmail}:`, errorMessage);
      return {
        success: false,
        messageId: null,
        error: errorMessage,
      };
    }

    console.log(
      `[sendDonationEmail] SUCCESS for ${input.donorEmail}, messageId=${messageId}`
    );

    return {
      success: true,
      messageId,
      error: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error sending email";
    console.error(
      `[sendDonationEmail] EXCEPTION for ${input.donorEmail}:`,
      errorMessage
    );
    return {
      success: false,
      messageId: null,
      error: errorMessage,
    };
  }
}
