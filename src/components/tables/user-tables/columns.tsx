"use client";
import { formatDateFromISODate } from "@/utils/formatDateFromISODate";
import { ReactNode } from "react";
import { CellAction } from "./cell-action";

export const columns = (userDict) => {
  return [
    // {
    //   id: "select",
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      header: userDict.NAME,
      accessorKey: "name",
    },

    // {
    //   accessorFn: (row) => `${row?.phoneNumbers[0]?.number}`,
    //   accessorKey: "phoneNumbers",
    //   header: "PHONE NUMUBER",
    // },
    {
      accessorKey: "role",
      header: userDict.ROLE,
    },

    {
      accessorFn: (row) => row.branchId?.name,
      header: userDict.BRANCH,
    },
    {
      accessorFn: (row) => `
        ${userDict.Browser}: ${row.activity?.userAgent ?? userDict.noBrowser}
        ${userDict.LastLogin}: ${row.activity?.loginTime ? formatDateFromISODate(row.activity?.loginTime) : "00.00.00"}
      `,
      header: userDict.ACTIVITY,
      cell: (row) => (
        <div className="table-cell text-xs">{row.getValue() as ReactNode}</div>
      ),
    },
    {
      id: "actions",
      header: userDict.ACTION,
      cell: ({ row }) => <CellAction data={row.original} userDict={userDict} />,
    },
  ];
};
