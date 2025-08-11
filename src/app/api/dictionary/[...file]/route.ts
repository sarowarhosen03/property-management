import { getDectionaryInfo } from "@/lib/getDictionary";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  {
    params: { file: fileParam },
  }: {
    params: { file: string[] };
  },
) {
  if (fileParam.length === 0) {
    return NextResponse.json(
      { message: "forbidden" },
      {
        status: 403,
      },
    );
  }
  const [fileName, langCode, node] = fileParam[0].split("-");

  let data = await getDectionaryInfo(langCode, node, fileName);
  return NextResponse.json(data);
}
