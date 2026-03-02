import { NextRequest, NextResponse } from "next/server";
import { getDataSource, ClientProfile } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { name, password } = await req.json();

    const ds = await getDataSource();
    const repo = ds.getRepository(ClientProfile);

    // Case-insensitive search by businessName and exact password match
    const client = await repo
      .createQueryBuilder("client")
      .where("LOWER(client.business_name) = LOWER(:name)", { name })
      .andWhere("client.password = :password", { password })
      .getOne();

    if (client) {
      return NextResponse.json({
        success: true,
        client: {
          id: client.id,
          businessName: client.businessName,
        },
      });
    }

    return NextResponse.json({ success: false });
  } catch (error) {
    console.error("Client verify error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
