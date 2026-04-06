import "server-only";

import PDFDocument from "pdfkit";

import type { DonationRow } from "@/lib/donations/types";

interface NgoDetails {
  name: string;
  registrationNumber: string;
  pan: string;
  address: string;
}

const ngoDetails: NgoDetails = {
  name: process.env.NGO_NAME || "JeevKutumb Foundation",
  registrationNumber: process.env.NGO_REGISTRATION_NUMBER || "REG-PLACEHOLDER",
  pan: process.env.NGO_PAN || "PAN-PLACEHOLDER",
  address: process.env.NGO_ADDRESS || "NGO Registered Address",
};

export async function generateReceiptPdf(donation: DonationRow, receiptNumber: string): Promise<Buffer> {
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const chunks: Buffer[] = [];

  return new Promise((resolve, reject) => {
    doc.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fontSize(20).text("Donation Receipt", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Receipt Number: ${receiptNumber}`);
    doc.text(`Date: ${new Date(donation.paid_at || donation.created_at).toLocaleDateString("en-IN")}`);
    doc.text(`Transaction ID: ${donation.provider_payment_id || "Pending"}`);
    doc.moveDown();

    doc.fontSize(14).text("Donor Details", { underline: true });
    doc.fontSize(12).text(`Name: ${donation.donor_name}`);
    doc.text(`Email: ${donation.donor_email}`);
    doc.text(`Amount: ${(donation.amount_minor / 100).toFixed(2)} ${donation.currency}`);
    doc.moveDown();

    doc.fontSize(14).text("NGO Details", { underline: true });
    doc.fontSize(12).text(`Name: ${ngoDetails.name}`);
    doc.text(`Registration Number: ${ngoDetails.registrationNumber}`);
    doc.text(`PAN: ${ngoDetails.pan}`);
    doc.text(`Address: ${ngoDetails.address}`);

    doc.moveDown(2);
    doc.fontSize(10).fillColor("#555").text("This is a computer-generated receipt and does not require a signature.", {
      align: "center",
    });

    doc.end();
  });
}
