import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Endpoint disabled. Use /api/payments/create." },
    { status: 410 }
  );
}
