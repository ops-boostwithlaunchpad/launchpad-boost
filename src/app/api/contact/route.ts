import { NextRequest, NextResponse } from "next/server";
import { getDataSource, ContactSubmission } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { name, email, serviceInterest, message } = await req.json();

    const ds = await getDataSource();
    const repo = ds.getRepository(ContactSubmission);

    await repo.save({
      name,
      email,
      serviceInterest,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Failed to save contact submission" },
      { status: 500 }
    );
  }
}
