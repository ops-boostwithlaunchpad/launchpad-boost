import { NextRequest, NextResponse } from "next/server";
import { getDataSource, EmailSignup } from "@/lib/db";

export async function GET() {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(EmailSignup);

    const emails = await repo.find({
      order: { createdAt: "DESC" },
    });

    return NextResponse.json({ emails });
  } catch (error) {
    console.error("Fetch emails error:", error);
    return NextResponse.json(
      { error: "Failed to fetch email signups" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const ds = await getDataSource();
    const repo = ds.getRepository(EmailSignup);

    // Check for existing signup
    const existing = await repo.findOne({ where: { email } });
    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Email already registered",
      });
    }

    await repo.save({ email });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email signup error:", error);
    return NextResponse.json(
      { error: "Failed to save email signup" },
      { status: 500 }
    );
  }
}
