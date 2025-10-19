import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";
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
    const { userId } = getAuth(req);
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const fileField = formData.get("file");
    if (!(fileField instanceof File))
      return NextResponse.json({ error: "File not found" }, { status: 400 });

    const title = getFieldString(formData.get("title"), "Untitled");
    const description = getFieldString(formData.get("description"), "");

    const buffer = Buffer.from(await fileField.arrayBuffer());

    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "next-cloudinary-uploads",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(buffer).pipe(uploadStream);
    });

    const image = await prisma.image.create({
      data: {
        userId,
        publicId: result.public_id,
        url: result.secure_url,
        bytes: result.bytes,
        title,
        description,
      },
    });

    return NextResponse.json({ image });
  } catch (error) {
    console.error("❌ Upload image failed:", error);
    return NextResponse.json({ error: "Upload image failed" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
