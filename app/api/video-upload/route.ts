import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";
import streamifier from "streamifier";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const config = { api: { bodyParser: false } };

function getFieldString(
  field: FormDataEntryValue | null,
  defaultValue: string = ""
): string {
  if (!field) return defaultValue;
  return typeof field === "string" ? field : defaultValue;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const fileField = formData.get("file");
    if (!(fileField instanceof File))
      return NextResponse.json({ error: "File not found" }, { status: 400 });

    const title = getFieldString(formData.get("title"), "Untitled");
    const description = getFieldString(formData.get("description"), "");
    const originalSize = String(fileField.size);

    const buffer = Buffer.from(await fileField.arrayBuffer());

    // Upload video to Cloudinary
    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "video-uploads",
          transformation: [{ quality: "auto", fetch_format: "mp4" }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(buffer).pipe(uploadStream);
    });

    const video = await prisma.video.create({
      data: {
        title,
        description,
        publicId: result.public_id,
        originalSize,
        compressedSize: String(result.bytes),
        duration: result.duration || 0,
      },
    });

    return NextResponse.json({ video });
  } catch (error) {
    console.error("❌ Upload video failed:", error);
    return NextResponse.json({ error: "Upload video failed" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
