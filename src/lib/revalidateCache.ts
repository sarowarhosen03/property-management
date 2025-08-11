"use server";

import { revalidateTag } from "next/cache";

const revalidateByTag = (tag: string) => {
  revalidateTag(tag);
};

export { revalidateByTag };
