import { NextRequest, NextResponse } from "next/server";
import { getDataSource, ClientProfile } from "@/lib/db";

export async function GET() {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(ClientProfile);

    const [clients, count] = await repo.findAndCount({
      order: { createdAt: "DESC" },
    });

    return NextResponse.json({ clients, stats: { count } });
  } catch (error) {
    console.error("Fetch clients error:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { businessName, category, email, city, password } = await req.json();

    const ds = await getDataSource();
    const repo = ds.getRepository(ClientProfile);

    await repo.save({
      businessName,
      category,
      email,
      city,
      password,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Create client error:", error);
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 }
      );
    }

    const ds = await getDataSource();
    const repo = ds.getRepository(ClientProfile);

    await repo.delete(Number(id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete client error:", error);
    return NextResponse.json(
      { error: "Failed to delete client" },
      { status: 500 }
    );
  }
}
