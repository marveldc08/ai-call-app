// app/api/events/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const eventId = body.id;
  try {
    const API_BASE_URL = process.env.API_BASE_URL;
    if (!API_BASE_URL) {
      return NextResponse.json(
        { message: "API_BASE_URL is not configured" },
        { status: 500 }
      );
    }

    const apiRes = await fetch(`${API_BASE_URL}/Call/event?eventId=${eventId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const contentType = apiRes.headers.get("content-type");
    const data = contentType?.includes("application/json")
      ? await apiRes.json()
      : { message: await apiRes.text() };

    return NextResponse.json(data, { status: apiRes.status });

  } catch (err) {
    console.error("Proxy Error:", err);
    return NextResponse.json({ message: "Error deleting event" }, { status: 500 });
  }
}