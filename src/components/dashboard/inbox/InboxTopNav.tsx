"use client";

import { Inbox } from "@/lib/db/type";
import { revalidateByTag } from "@/lib/revalidateCache";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface InboxProps {
  inboxDict: Inbox;
}

export const InboxTopNav = ({ inboxDict }: InboxProps) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const isReadFilterActive = searchParams.get("isRead") === "false";

  const handleFilter = (type: string) => {
    const params = new URLSearchParams(searchParams);

    if (type === "isRead") {
      params.set("isRead", "false");
      revalidateByTag("inboxes");
    } else {
      params.delete("isRead");
      revalidateByTag("inboxes");
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
            {inboxDict.all}
          </button>
        </li>

        <li>
          <button
            className={`group rounded-full px-3 py-1.5 text-sm text-secondary transition-all duration-300 hover:bg-secondary hover:text-white ${isReadFilterActive ? "bg-secondary text-white" : ""}`}
            onClick={() => handleFilter("isRead")}
          >
            {inboxDict.new}
          </button>
        </li>
      </ul>
    </div>
  );
};
