"use client";
import { BranchTypes } from "@/lib/db/type";
import { CellAction } from "./cell-action";

export const columns = (branchDict: BranchTypes) => {
  return [
    {
      id: "select",
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: branchDict.BRANCH,
      accessorKey: "name",
      accessorFn: (row) => `${row?.name}\n${row?.contact.email}`,
    },

    {
      accessorKey: "contact.phone",
      header: branchDict.PHONENUMBER,
    },

    {
      accessorFn: (row) =>
        `${row?.address.street}, ${row?.address.city}, ${row?.address.state} - ${row?.address.zipCode}, ${row?.address.country}`,
      header: branchDict.ADDRESS,
    },

    {
      id: "actions",
      header: branchDict.ACTION,
      cell: ({ row }) => (
        <CellAction data={row.original} branchDict={branchDict} />
      ),
    },
  ];
};
