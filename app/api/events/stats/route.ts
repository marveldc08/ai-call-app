// app/api/users/get-users/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {


  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const eventId =  req.nextUrl.searchParams.get("id");

    const apiRes = await fetch(`${API_BASE_URL}/Call?eventId=${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
