import { uploadFiles } from "@/lib/r2/uploadImage";
import { NextRequest, NextResponse } from "next/server";

const MAX_FILE_SIZE = 2000000;
export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const formDataEntryValues = Array.from(formData.getAll("files")); // Use getAll to retrieve all files

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
    return file.size > MAX_FILE_SIZE && !file.type.includes("image"); // Check if file size is greater than 2MB
  });
  if (inValidate) {
    return NextResponse.json({
      success: false,
      error: "max file size is 2Mb or file type is invalid",
    });
  }
  const uploadResult = await uploadFiles({
    type: "none",
    data: files,
  });

  return NextResponse.json(uploadResult, {
    status: uploadResult.status,
  });
}
