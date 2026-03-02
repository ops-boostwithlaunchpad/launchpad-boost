import { NextRequest, NextResponse } from "next/server";
import { getDataSource, OnboardingSubmission } from "@/lib/db";

export async function GET() {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(OnboardingSubmission);

    const submissions = await repo.find({
      order: { createdAt: "DESC" },
    });

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error("Fetch submissions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, data } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Submission ID is required" },
        { status: 400 }
      );
    }

    const ds = await getDataSource();
    const repo = ds.getRepository(OnboardingSubmission);

    await repo.update(id, data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update submission error:", error);
    return NextResponse.json(
      { error: "Failed to update submission" },
      { status: 500 }
    );
  }
}
