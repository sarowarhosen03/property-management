"use client";
import { showToast } from "@/components/common/toaster/toaster";
import { API_URL } from "@/config/site";
import { Branch } from "@/lib/BranchSchema";
import { BranchTypes } from "@/lib/db/type";
import { revalidateByTag } from "@/lib/revalidateCache";
import { Edit, Eye, Trash } from "lucide-react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CellActionProps {
  data: Branch;
  branchDict: BranchTypes;
}

const deleteBranch = async (id: string, token: string) => {
  const deleteBranch = await fetch(`${API_URL}/branches/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  if (!deleteBranch.ok) {
    throw new Error("Failded to fetch data");
  }

  revalidateByTag("branch");
};

export const CellAction: React.FC<CellActionProps> = ({ data, branchDict }) => {
  const { _id: id = "" } = data;
  const session = useSession();
  const token = session?.data?.user.token as string;

  const router = useRouter();

  const handleDeleteUser = async (id: string) => {
    showToast({
      type: "info",
      message: branchDict.PleaseWait,
      title: branchDict.Deleting,
    });
    try {
      await deleteBranch(id, token);
      showToast({
        type: "success",
        message: branchDict.BranchSuccessfullyDeleted,
        title: branchDict.success,
      });
    } catch {
      showToast({
        type: "error",
        message: branchDict.SomethingWentWrongPleaseTryAgainLater,
        title: branchDict.error,
      });
    }
  };

  return (
    <>
      <div className="flex">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center hover:opacity-40"
        >
          <Eye
            className="h-4 w-4"
            onClick={() => router.push(`/dashboard/branches/${id}`)}
          />
        </button>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center hover:opacity-40"
        >
          <Edit
            className="h-4 w-4"
            onClick={() => router.push(`/dashboard/branches/${id}/edit`)}
          />
        </button>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center hover:opacity-40"
          onClick={() => handleDeleteUser(id)}
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>
    </>
  );
};
