import { NextRequest, NextResponse } from "next/server";
import { getDataSource, ClientProfile } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    const ds = await getDataSource();
    const repo = ds.getRepository(ClientProfile);

    // Check if any client profile matches the password
    const client = await repo.findOne({ where: { password } });
    if (client) {
      return NextResponse.json({
        success: true,
        businessId: client.id,
      });
    }

    // Check against master admin password
    const masterPassword = process.env.ADMIN_PASSWORD || "launchpad2026";
    if (password === masterPassword) {
      return NextResponse.json({
        success: true,
        admin: true,
      });
    }

    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
