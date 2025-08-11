"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ProfileAvatar } from "@/components/dashboard/profile/ProfileAvatar";
import { Button } from "@/components/ui/button";
import { Users } from "@/lib/db/type";
import { User } from "@/types/userType";
import { getNamePlacholder } from "@/utils/getNamePlacholder";
import Link from "next/link";
import { Input } from "../../ui/input";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  userDict: Users;
}

export function UserTable<TData extends User, TValue>({
  columns,
  data,
  searchKey,
  userDict,
}: UserTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="flex w-full flex-col">
      <div className="mb-2 flex w-full items-center justify-between">
        <h2>{userDict.users}</h2>
        <div className="flex gap-4">
          <Input
            placeholder={`${userDict.Search} ${searchKey}...`}
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="w-full md:max-w-sm"
          />
          <Button asChild>
            <Link href={"/dashboard/users/add"}>{userDict.addNewUser}</Link>
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-248px)] w-full rounded-md border">
        <Table className="relative">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const columnId = cell.column.id;
                    const isNameColumn = columnId === "name";
                    return (
                      <TableCell key={cell.id}>
                        {isNameColumn ? (
                          <div className="flex items-center gap-2">
                            <ProfileAvatar
                              avatar={row.original.avatar as string}
                              name={
                                (row.original.firstName +
                                  " " +
                                  row.original.lastName) as string
                              }
                              className="h-8 w-8 overflow-hidden rounded-full bg-secondary"
                            >
                              <h6 className="text-lg font-bold text-white">
                                {getNamePlacholder(
                                  row.original.firstName,
                                  row.original.lastName,
                                )}
                              </h6>
                            </ProfileAvatar>
                            <div className="flex flex-col">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                              <p className="text-xs">{row.original.email}</p>
                            </div>
                          </div>
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {userDict.noResults}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
