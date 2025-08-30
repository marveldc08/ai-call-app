// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {  email, password, confirmPassword } = body;

  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token =  req.headers.get("authorization")

    const apiRes = await fetch(`${API_BASE_URL}/api/v1/users/onboard/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ?? "",
      },
      body: JSON.stringify({ email, password, confirmPassword }),
    });

    const contentType = apiRes.headers.get("content-type");

    const data = contentType?.includes("application/json")
      ? await apiRes.json()
      : { message: await apiRes.text() };

    return NextResponse.json(data, { status: apiRes.status });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Proxy Error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
