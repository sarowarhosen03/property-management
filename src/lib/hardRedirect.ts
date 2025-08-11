"use server";

import { redirect } from "next/navigation";

export default async function hardRedirect(path: string) {
  return redirect(path);
}
