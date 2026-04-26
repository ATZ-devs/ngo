import { NextRequest, NextResponse } from "next/server";

import { POST as createPaymentPost } from "@/app/api/payments/create/route";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  return createPaymentPost(request);
}
