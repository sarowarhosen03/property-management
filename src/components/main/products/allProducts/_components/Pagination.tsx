"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  pagination: {
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
    totalPages: number;
  };
  previousLabel?: string;
  nextLabel?: string;
}

export function PropertyPagination({ pagination }: PaginationProps) {
  const { currentPage, nextPage, prevPage, totalPages } = pagination;
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageLink = (page: number | null) => {
    if (!page) return "#";

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    return `?${params.toString()}`;
  };

  return (
    <div className="mt-6 p-4">
      <Pagination>
        <PaginationContent className="inline-flex gap-0 -space-x-px text-xs font-medium">
          <PaginationItem>
            <Link
              href={createPageLink(prevPage)}
              className={cn(
                "ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-secondary bg-white px-3 leading-tight text-secondary hover:bg-gray-100 hover:text-gray-700",
                {
                  "pointer-events-none border-gray-500 text-gray-500":
                    !prevPage,
                },
              )}
            >
              <ChevronLeft />
            </Link>
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, index) => {
            const pageNum = index + 1;
            if (
              pageNum === currentPage ||
              pageNum === currentPage + 1 ||
              pageNum === currentPage + 2 ||
              pageNum === totalPages - 1 ||
              pageNum === totalPages
            ) {
              return (
                <PaginationItem key={pageNum}>
                  <Link
                    href={createPageLink(pageNum)}
                    className={cn(
                      "flex h-8 items-center justify-center border border-secondary bg-white px-3 leading-tight text-secondary hover:bg-gray-100 hover:text-gray-700",
                      { "bg-secondary text-white": pageNum === currentPage },
                    )}
                  >
                    {pageNum}
                  </Link>
                </PaginationItem>
              );
            }
            if (pageNum === currentPage + 3) {
              return (
                <PaginationItem key={pageNum}>
                  <PaginationEllipsis className="hover:text-gray-70 flex h-8 items-center justify-center border border-secondary bg-white px-3 leading-tight text-secondary hover:bg-gray-100" />
                </PaginationItem>
              );
            }
            return null;
          })}

          <PaginationItem>
            <Link
              href={createPageLink(nextPage)}
              className={cn(
                "flex h-8 items-center justify-center rounded-e-lg border border-secondary bg-white px-3 leading-tight text-secondary hover:bg-gray-100 hover:text-gray-700",
                {
                  "pointer-events-none border-gray-500 text-gray-500":
                    !nextPage,
                },
              )}
            >
              <ChevronRight />
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
