import { auth } from "@/auth";
import { BranchClient } from "@/components/tables/branch-tables/client";
import { API_URL } from "@/config/site";
import { Branch } from "@/lib/BranchSchema";
import { BranchTypes } from "@/lib/db/type";
import { getAdminDictionary } from "@/lib/getDictionary";
import { revalidateByTag } from "@/lib/revalidateCache";
import { ApiResponse } from "@/types";

async function getBranches(token: string): Promise<ApiResponse<Branch[]>> {
  const response = await fetch(`${API_URL}/branches`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["branch"],
    },
  });

  if (!response.ok) {
    throw new Error("There was an problem!");
  }

  return await response.json();
}

export default async function UsersPages({ params: { lang } }) {
  const session = await auth();
  const token = session?.user.token as string;
  const { data: branches } = await getBranches(token);
  const branchDict: BranchTypes = await getAdminDictionary(lang, "branches");
  revalidateByTag("branch");

  return (
    <div className="h-full">
      <BranchClient branches={branches} branchDict={branchDict} />
    </div>
  );
}

export const revalidate = 0;
