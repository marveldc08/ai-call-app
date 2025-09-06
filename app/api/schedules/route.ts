// app/api/events/route.ts
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const body = await req.json();
  const { callType, schedule, startDate, endDate } = body;
  const token = req.headers.get("authorization"); 
  console.log(token)

  try {
    const API_BASE_URL = process.env.API_BASE_URL;
    if (!API_BASE_URL) {
      return NextResponse.json(
        { message: "API_BASE_URL is not configured" },
        { status: 500 }
      );
    }

    const apiRes = await fetch(`${API_BASE_URL}/Call/ScheduleCall`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `${token}`, },
      body: JSON.stringify({ callType, schedule, startDate, endDate }),
    });

    const contentType = apiRes.headers.get("content-type");
    const data = contentType?.includes("application/json")
      ? await apiRes.json()
      : { message: await apiRes.text() };

    return NextResponse.json(data, { status: apiRes.status });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Proxy Error:", err);
    return NextResponse.json(
      { message: "Internal proxy Error" },
      { status: 500 }
    );
  }
}





