"use client";

import { UserTable } from "@/components/tables/user-tables/Usertable";
import { Toaster } from "@/components/ui/sonner";
import { Users } from "@/lib/db/type";
import { User } from "@/types/userType";
import { FC } from "react";
import { columns } from "./columns";

interface UserClientProps {
  users: User[];
  userDict: Users;
}

export const UserClient: FC<UserClientProps> = ({ users, userDict }) => {
  const cols = columns(userDict);
  return (
    <div className="flex w-full flex-col items-start justify-between">
      <UserTable
        searchKey={userDict.name}
        columns={cols}
        data={users}
        userDict={userDict}
      />
      <Toaster className="bg-white" duration={2000} />
    </div>
  );
};
