import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

export async function POST(request: NextRequest) {
  try {
    // Check if Cloudinary is configured
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.error("Cloudinary credentials are missing:", {
        cloudName: !!cloudName,
        apiKey: !!apiKey,
        apiSecret: !!apiSecret,
      });
      return NextResponse.json(
        {
          error:
            "Cloudinary not configured. Please add CLOUDINARY credentials to .env.local",
        },
        { status: 500 },
      );
    }

    // Configure Cloudinary inside the handler to ensure env vars are loaded
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

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

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "e-commerce-app",
      resource_type: "auto",
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("Error uploading image:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: `Upload failed: ${errorMessage}` },
      { status: 500 },
    );
  }
}
