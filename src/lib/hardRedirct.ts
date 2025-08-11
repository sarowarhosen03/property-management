"use server";

import { redirect } from "next/navigation";
import { revalidateByTag } from "./revalidateCache";

export default async function hardRedirct(path: string) {
  return redirect(path);
}

export async function revalidateTagFormServer(tag: string | string[]) {
  await revalidateByTag(tag);
}
