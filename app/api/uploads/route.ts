// import { NextResponse, NextRequest } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file") as File;
//     const eventId = req.nextUrl.searchParams.get("id");

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     // Build new FormData to send to external API
//     const forwardForm = new FormData();
//     forwardForm.append("file", file, file.name);

//     console.log("Forwarding file:", file.name, "to event ID:", eventId);
//     const API_BASE_URL = process.env.API_BASE_URL!;
//     const apiRes = await fetch(`${API_BASE_URL}/Call/contacts/${eventId}`, {
//       method: "POST",
//       body: forwardForm, // ✅ let fetch set the correct headers
//     });

//     const data = await apiRes.json();

//     return NextResponse.json({
//       message: "File uploaded successfully",
//       apiResponse: data,
//     });
//   } catch (error) {
//     console.error("Upload error:", error);
//     return NextResponse.json({ error: "File upload failed" }, { status: 500 });
//   }
// }

// /app/api/upload/route.ts (Next.js 13+ with App Router)
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const eventId = req.nextUrl.searchParams.get("id");
  const API_BASE_URL = process.env.API_BASE_URL!;


  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  const forwardForm = new FormData();
  forwardForm.append("file", file);
  const token = req.headers.get("authorization"); 

  // Forward file as binary to your real backend endpoint
  const backendRes = await fetch(`${API_BASE_URL}/Call/contacts/${eventId}`, {
    method: "POST",
    headers: { "Authorization": `${token}`, },
    body: forwardForm, // send binary
  });

  if (!backendRes.ok) {
     const text = await backendRes.text();
     return NextResponse.json(
       { error: "Backend upload failed", details: text },
       { status: backendRes.status }
     );
   }

  return NextResponse.json({ success: true });
}



