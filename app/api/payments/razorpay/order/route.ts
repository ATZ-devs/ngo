import { NextRequest } from "next/server";
import { POST as razorpayOrderPost } from "@/app/api/razorpay-order/route";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  return razorpayOrderPost(request);
}
