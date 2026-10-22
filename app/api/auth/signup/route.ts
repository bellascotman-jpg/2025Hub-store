import { NextResponse } from "next/server";
export async function POST() {
 return NextResponse.json({ error: "Registration is not enabled until secure database-backed account storage is configured." }, { status: 503 });
}