import { cloneFiles, deleteFile, uploadFiles } from "@/lib/r2/uploadImage";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";
const max_images = 50;
async function addWatermark(file: Buffer, opacity: number): Promise<Buffer> {
  try {
    const watermarkPath = path.join(process.cwd(), "public", "watermark.svg");
    const watermarkBuffer = fs.readFileSync(watermarkPath);

    // Get the dimensions of the base image
    const { width: imageWidth, height: imageHeight } =
      await sharp(file).metadata();

    // Resize the watermark based on the dimensions of the base image (e.g., 20% of the image width)
    const watermarkWidth = Math.floor(imageWidth! * 0.35); // 35% of base image width

    const resizedWatermark = await sharp(watermarkBuffer)
      .resize({ width: watermarkWidth })
      .toBuffer();

    return await sharp(file)
      .composite([
        {
          input: resizedWatermark,
          gravity: "center",
          blend: "over",
          opacity: opacity,
        },
      ])
      .toBuffer();
  } catch (error) {
    return file;
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const formDataEntryValues = Array.from(formData.getAll("files"));

  const files = [];
  const opacity = 0.5;

  for (const formDataEntryValue of formDataEntryValues) {
    if (
      typeof formDataEntryValue === "object" &&
      "arrayBuffer" in formDataEntryValue
    ) {
      const file = formDataEntryValue as unknown as File;
      const buffer = await file.arrayBuffer();
      const watermarkedBuffer = await addWatermark(
        Buffer.from(buffer),
        opacity,
      );
      files.push({
        buffer: watermarkedBuffer,
        name: file.name,
        type: file.type,
        size: file.size,
        url: null, // Set url to null for now, it will be updated later
      });
    }
  }

  const inValidate = files.some((file) => {
    return !file.type.includes("image");
  });

  if (inValidate || files.length > max_images) {
    return NextResponse.json({ success: false, error: "file type is invalid" });
  }

  const uploadResult = await uploadFiles({
    type: "watermark",
    data: files,
  });

  return NextResponse.json(uploadResult, {
    status: uploadResult.status,
  });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const files = body.files || ([] as string[]);
  const newFiles = await cloneFiles(files);
  return NextResponse.json(newFiles);
}

export async function DELETE(request: NextRequest) {
  try {
    const { urls = [] }: { urls: string[] } = (await request.json()) || {};
    if (urls && urls.length) {
      const res = await deleteFile(urls);
      return NextResponse.json(res);
    }
  } catch (error) {
    return NextResponse.json({ error: true, message: "something went wrong" });
  }
  return NextResponse.json({ error: false, message: "no file found" });
}
