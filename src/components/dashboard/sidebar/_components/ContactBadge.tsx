"use client";

import { useReadUnread } from "@/providers/ReadUnreadProvider";
import { useEffect } from "react";

export default function ContactBadge({ totalUnredInboxes, getTotalInboxes }) {
  const { unreadContactCount, handleSetUnreadContactCount } = useReadUnread();
  useEffect(() => {
    handleSetUnreadContactCount(totalUnredInboxes);
  }, [totalUnredInboxes]);

  return (
    <>
      <span
        className={`ml-auto flex h-7 w-7 items-center justify-center rounded-full text-xs ${unreadContactCount ? "bg-success" : "bg-secondary text-light"}`}
      >
        {unreadContactCount || getTotalInboxes.length}
      </span>
    </>
  );
}
