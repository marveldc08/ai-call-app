import { NextResponse } from "next/server";

// Mock in-memory DB (replace with real DB e.g. Prisma, MongoDB, PostgreSQL)
let schedules: { id: number; interval: string }[] = [];
let idCounter = 1;

// POST -> Create schedule(s)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Expecting: { schedules: [{ interval: "5" }, { interval: "10" }] }
    if (!body.schedules || !Array.isArray(body.schedules)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const newSchedules = body.schedules.map((s: { interval: string }) => ({
      id: idCounter++,
      interval: s.interval,
    }));

    schedules.push(...newSchedules);

    return NextResponse.json({
      message: "Schedules created successfully",
      schedules: newSchedules,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET -> Fetch schedules
export async function GET() {
  return NextResponse.json({ schedules });
}

// DELETE -> Clear all schedules (optional)
export async function DELETE() {
  schedules = [];
  return NextResponse.json({ message: "All schedules cleared" });
}
