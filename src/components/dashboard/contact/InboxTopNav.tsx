"use client";

import { revalidateByTag } from "@/lib/revalidateCache";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const InboxTopNav = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const isReadFilterActive = searchParams.get("isRead") === "false";

  const handleFilter = (type: string) => {
    const params = new URLSearchParams(searchParams);

    if (type === "isRead") {
      params.set("isRead", "false");
      revalidateByTag("contact");
    } else {
      params.delete("isRead");
      revalidateByTag("contact");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-4 flex flex-wrap">
      <ul className="flex gap-4">
        <li>
          <button
            className={`group rounded-full px-3 py-1.5 text-sm text-secondary transition-all duration-300 hover:bg-secondary hover:text-white ${!isReadFilterActive ? "bg-secondary text-white" : ""}`}
            onClick={() => handleFilter("")}
          >
            All
          </button>
        </li>

        <li>
          <button
            className={`group rounded-full px-3 py-1.5 text-sm text-secondary transition-all duration-300 hover:bg-secondary hover:text-white ${isReadFilterActive ? "bg-secondary text-white" : ""}`}
            onClick={() => handleFilter("isRead")}
          >
            New
          </button>
        </li>
      </ul>
    </div>
  );
};
