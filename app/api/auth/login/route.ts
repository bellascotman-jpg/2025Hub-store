import { NextResponse } from "next/server";
export async function POST() {
 return NextResponse.json({ error: "Authentication is not enabled until secure database-backed account storage is configured." }, { status: 503 });
}