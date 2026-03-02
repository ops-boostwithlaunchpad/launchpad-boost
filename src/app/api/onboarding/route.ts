import { NextRequest, NextResponse } from "next/server";
import { getDataSource, OnboardingSubmission } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    const ds = await getDataSource();
    const repo = ds.getRepository(OnboardingSubmission);

    const submission = await repo.save({
      businessName: formData.businessName,
      category: formData.category,
      phone: formData.phone,
      email: formData.email,
      website: formData.website,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      description: formData.description,
      services: formData.services,
      keywords: formData.keywords,
      customKeywords: formData.customKeywords,
      gbpOption: formData.gbpOption,
      weekdayOpen: formData.weekdayOpen,
      weekdayClose: formData.weekdayClose,
      saturdayOpen: formData.saturdayOpen,
      saturdayClose: formData.saturdayClose,
      keywordSearchReport: formData.keywordSearchReport ?? false,
      formData: formData,
      repoName: formData.repoName,
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error("Onboarding submission error:", error);
    return NextResponse.json(
      { error: "Failed to save onboarding submission" },
      { status: 500 }
    );
  }
}
