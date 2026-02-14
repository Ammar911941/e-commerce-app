import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const featured = await db.featuredProducts.findMany();
    return NextResponse.json(featured);
  } catch (error) {
    console.error("Error fetching featured products:", error);
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

    const { title, description, image, link } = await request.json();

    const featured = await db.featuredProducts.create({
      data: {
        title,
        description,
        image,
        link,
      },
    });

    return NextResponse.json(featured);
  } catch (error) {
    console.error("Error creating featured product:", error);
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

    const { id, title, description, image, link } = await request.json();

    const featured = await db.featuredProducts.update({
      where: { id },
      data: {
        title,
        description,
        image,
        link,
      },
    });

    return NextResponse.json(featured);
  } catch (error) {
    console.error("Error updating featured product:", error);
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
    const featuredId = searchParams.get("id");

    if (!featuredId) {
      return NextResponse.json(
        { error: "Featured product ID required" },
        { status: 400 },
      );
    }

    await db.featuredProducts.delete({
      where: { id: featuredId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting featured product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
