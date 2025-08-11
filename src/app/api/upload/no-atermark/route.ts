import { uploadFiles } from "@/lib/r2/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const formDataEntryValues = Array.from(formData.getAll("files"));

  const files = [];

  for (const formDataEntryValue of formDataEntryValues) {
    if (
      typeof formDataEntryValue === "object" &&
      "arrayBuffer" in formDataEntryValue
    ) {
      const file = formDataEntryValue as unknown as File;
      files.push(file);
    }
  }

  const inValidate = files.some((file) => {
    return !file.type.includes("image");
  });
  if (inValidate || files.length > 15) {
    return NextResponse.json({ success: false, error: "file type is invalid" });
  }

  const uploadResult = await uploadFiles({
    type: "none",
    data: files,
  });

  return NextResponse.json(uploadResult, {
    status: uploadResult.status,
  });
}
