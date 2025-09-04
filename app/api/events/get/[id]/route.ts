
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    // const token = req.headers.get("authorization");
    const eventId = params.id;
    const parsedEventId = eventId || req.nextUrl.searchParams.get("id");



    if (!eventId) {
      return NextResponse.json({ message: "Period ID is required" }, { status: 400 });
    }

    const apiRes = await fetch(`${API_BASE_URL}/api/v1/periods/${parsedEventId}`, {
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

