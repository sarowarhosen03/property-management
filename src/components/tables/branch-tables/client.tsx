"use client";

import { Toaster } from "@/components/ui/sonner";
import { Branch } from "@/lib/BranchSchema";
import { BranchTypes } from "@/lib/db/type";
import { FC } from "react";
import { BranchTable } from "./Branchtable";
import { columns } from "./columns";

interface BranchClientProps {
  branches: Branch[];
  branchDict: BranchTypes;
}

export const BranchClient: FC<BranchClientProps> = ({
  branches,
  branchDict,
}) => {
  const cols = columns(branchDict);

  return (
    <div className="flex w-full flex-col items-start justify-between">
      <BranchTable
        searchKey={branchDict.name}
        columns={cols}
        data={branches}
        branchDict={branchDict}
      />
      <Toaster className="bg-white" duration={2000} branchDict={branchDict} />
    </div>
  );
};
