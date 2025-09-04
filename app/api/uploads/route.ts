import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const eventId = req.nextUrl.searchParams.get("id");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Build new FormData to send to external API
    const forwardForm = new FormData();
    forwardForm.append("file", file, file.name);

    console.log("Forwarding file:", file.name, "to event ID:", eventId);
    const API_BASE_URL = process.env.API_BASE_URL!;
    const apiRes = await fetch(`${API_BASE_URL}/Call/contacts/${eventId}`, {
      method: "POST",
      body: forwardForm, // ✅ let fetch set the correct headers
    });

    const data = await apiRes.json();

    return NextResponse.json({
      message: "File uploaded successfully",
      apiResponse: data,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}


