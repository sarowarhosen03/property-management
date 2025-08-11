"use client";
import { showToast } from "@/components/common/toaster/toaster";
import { assetsDelete } from "@/components/dashboard/forms/_utils/assetsDelete";
import { API_URL } from "@/config/site";
import { Users } from "@/lib/db/type";
import { revalidateByTag } from "@/lib/revalidateCache";
import { User } from "@/types/userType";
import { Edit, Eye, Trash } from "lucide-react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface CellActionProps {
  data: User;
  userDict: Users;
}

const deleteUser = async (
  { id, avatar }: { id: string; avatar: string },
  token: string,
) => {
  const deleteUser = await fetch(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });
  const res = await assetsDelete([avatar]);

  if (!deleteUser.ok) {
    throw new Error("Failded to fetch data");
  }

  revalidateByTag("users");
};

export const CellAction: FC<CellActionProps> = ({ data, userDict }) => {
  const { _id: id, avatar } = data;
  const session = useSession();
  const token = session?.data?.user.token as string;

  const router = useRouter();

  const handleDeleteUser = async (id: string) => {
    showToast({
      type: "info",
      message: userDict.PleaseWait,
      title: userDict.Deleting,
    });
    try {
      await deleteUser({ id, avatar }, token);
      showToast({
        type: "success",
        message: userDict.UserSuccessfullyDeleted,
        title: userDict.Success,
      });
    } catch {
      showToast({
        type: "error",
        message: userDict.SomethingWentWrongPleaseTryAgainLater,
        title: userDict.Error,
      });
    }
  };

  return (
    <>
      <div className="flex">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center hover:opacity-40"
          onClick={() => router.push(`/dashboard/users/${id}`)}
        >
          <Eye className="h-4 w-4" />
        </button>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center hover:opacity-40"
        >
          <Edit
            className="h-4 w-4"
            onClick={() => router.push(`/dashboard/users/${id}/edit`)}
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
