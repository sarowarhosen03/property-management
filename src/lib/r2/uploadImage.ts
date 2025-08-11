import { assetsDelete } from "@/components/dashboard/forms/_utils/assetsDelete";
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import path from "path";

type FileType = {} & (
  | {
      type: "watermark";
      data: {
        buffer: Buffer;
        name: string;
        type: string;
        size: number;
      }[];
    }
  | {
      type: "none";
      data: File[];
    }
);
export async function uploadFile(
  R2: S3Client,
  fileName: string,
  buffer: Buffer,
) {
  // Create a unique key for the file
  const extname = path.extname(fileName);
  const basename = path.basename(fileName, extname);
  const key =
    `${basename}-${new Date().toISOString().replace(/:/g, "-")}${extname}`
      .trim()
      .replaceAll(" ", "-");

  const putObjectCommandClient = new PutObjectCommand({
    Bucket: "safehouse",
    Key: key,
    Body: buffer,
    // ContentType: "application/octet-stream",
  });

  try {
    // Upload the file to Cloudflare R2
    await R2.send(putObjectCommandClient);

    // Construct the file's URL
    const fileUrl = `${process.env.CLOUDFLARE_CONTENT}/${key}`;

    return { error: false, url: fileUrl };
  } catch (error: any) {
    return { error: true, message: error?.message || "" };
  }
}

export async function uploadFiles(files: FileType) {
  const R2 = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFLARE_S3_CLIENT_ENDPOINT!,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
      secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY_ID!,
    },
    requestChecksumCalculation: "WHEN_REQUIRED",
  });

  const uploadedFiles: string[] = [];
  if (files.type === "watermark") {
    for (const buffer of files.data) {
      const uploadResult = await uploadFile(R2, buffer.name, buffer.buffer);

      if (uploadResult.error) {
        await assetsDelete(uploadedFiles);
        return { success: false, message: uploadResult.message, status: 500 };
      }

      if (uploadResult?.url) {
        uploadedFiles.push(uploadResult.url);
      }
    }
  } else {
    for (const file of files.data) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadResult = await uploadFile(R2, file.name, buffer);

      if (uploadResult.error) {
        await assetsDelete(uploadedFiles);
        return { success: false, message: uploadResult.message, status: 500 };
      }

      if (uploadResult?.url) {
        uploadedFiles.push(uploadResult.url);
      }
    }
  }
  R2.destroy();
  return { success: true, urls: uploadedFiles, status: 201 };
}

export async function cloneFiles(fileNames: string[]) {
  // Initialize the S3 client for Cloudflare R2
  const R2 = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFLARE_S3_CLIENT_ENDPOINT!,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
      secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY_ID!,
    },
  });

  const sourceBucket = "safehouse"; // Replace with your source bucket name if different
  const results: string[] = [];

  // Iterate over each file name
  for (const fileName of fileNames) {
    // Create a unique key for the cloned file
    const extname = path.extname(fileName);
    const basename = path.basename(fileName, extname);

    const key =
      `${basename}-${new Date().toISOString().replace(/:/g, "-")}${extname}`
        .trim()
        .replaceAll(" ", "-");

    const targetKey = key; // The new key for the cloned file

    const copyParams = {
      Bucket: sourceBucket,
      CopySource: `${sourceBucket}${new URL(fileName).pathname}`, // Format: "sourceBucket/sourceKey"
      Key: targetKey,
    };

    try {
      // Copy the file within Cloudflare R2
      await R2.send(new CopyObjectCommand(copyParams));

      // Construct the file's URL
      const fileUrl = `${process.env.CLOUDFLARE_CONTENT}/${targetKey}`;

      results.push(fileUrl);
    } catch (error: any) {
      return { success: false, message: "Error creating" };
    }
  }
  R2.destroy();

  return { success: true, urls: results };
}
export async function deleteFile(urls: string[]) {
  const R2 = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFLARE_S3_CLIENT_ENDPOINT!,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
      secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY_ID!,
    },
  });
  const keys = urls.map((url) => {
    return R2.send(
      new DeleteObjectCommand({
        Bucket: "safehouse",
        Key: url.replace(`${process.env.CLOUDFLARE_CONTENT!}/`, ""),
      }),
    );
  });

  try {
    await Promise.all(keys);
    R2.destroy();
    return { error: false, message: "all files deleted successfully" };
  } catch (error: any) {
    R2.destroy();
    return { error: true, message: error?.message || "" };
  }
}
