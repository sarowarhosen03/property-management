"use client";

import { useReadUnread } from "@/providers/ReadUnreadProvider";
import { useEffect } from "react";

export default function InboxBadge({ totalUnredInboxes, getTotalInboxes }) {
  const { unreadInboxCount, handleSetUnreadInboxCount } = useReadUnread();
  useEffect(() => {
    handleSetUnreadInboxCount(totalUnredInboxes);
  }, [totalUnredInboxes]);
  return (
    <>
      <span
        className={`ml-auto flex h-7 w-7 items-center justify-center rounded-full text-xs ${unreadInboxCount ? "bg-success" : "bg-secondary text-light"}`}
      >
        {unreadInboxCount || getTotalInboxes.length}
      </span>
    </>
  );
}
