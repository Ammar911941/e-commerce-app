import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const deals = await db.deals.findMany();
    return NextResponse.json(deals);
  } catch (error) {
    console.error("Error fetching deals:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await db.user.findUnique({
      where: { clerkId: user.id },
    });

    if (dbUser?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { offer, details, image, link } = await request.json();

    const deal = await db.deals.create({
      data: {
        offer,
        details,
        image,
        link,
      },
    });

    return NextResponse.json(deal);
  } catch (error) {
    console.error("Error creating deal:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await db.user.findUnique({
      where: { clerkId: user.id },
    });

    if (dbUser?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id, offer, details, image, link } = await request.json();

    const deal = await db.deals.update({
      where: { id },
      data: {
        offer,
        details,
        image,
        link,
      },
    });

    return NextResponse.json(deal);
  } catch (error) {
    console.error("Error updating deal:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await db.user.findUnique({
      where: { clerkId: user.id },
    });

    if (dbUser?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const dealId = searchParams.get("id");

    if (!dealId) {
      return NextResponse.json({ error: "Deal ID required" }, { status: 400 });
    }

    await db.deals.delete({
      where: { id: dealId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting deal:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
