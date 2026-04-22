import { NextRequest } from "next/server";
import { POST as paymentsRazorpayWebhookPOST } from "@/app/api/payments/razorpay/webhook/route";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
	return paymentsRazorpayWebhookPOST(request);
}
