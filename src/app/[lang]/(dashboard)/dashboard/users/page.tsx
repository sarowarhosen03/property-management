import { langType } from "@/app/[lang]/(main)/page";
import { auth } from "@/auth";
import { UserClient } from "@/components/tables/user-tables/client";
import { API_URL } from "@/config/site";
import { Users } from "@/lib/db/type";
import { getAdminDictionary } from "@/lib/getDictionary";
import { ApiResponse } from "@/types";
import { User } from "@/types/userType";

async function getUsers(): Promise<ApiResponse<User[]>> {
  const session = await auth();
  const token = session?.user.token;

  const response = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["users"],
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch data");
  }

  const json: ApiResponse<User[]> = await response.json();
  return json;
}

export default async function UsersPages({
  params: { lang },
}: {
  params: { lang: langType };
}) {
  const { data: users } = await getUsers();
  const userDict: Users = await getAdminDictionary(lang, "users");

  return (
    <div className="h-full">
      <UserClient
        userDict={userDict}
        users={users.filter((u) => u.role.toLowerCase() !== "admin")}
      />
    </div>
  );
}
