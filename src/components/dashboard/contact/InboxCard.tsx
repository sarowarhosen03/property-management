"use client";
import { API_URL } from "@/config/site";
import { InboxTypeWithId } from "@/lib/inboxSchema";
import { cn } from "@/lib/utils";
import { useReadUnread } from "@/providers/ReadUnreadProvider";
import { formatDateFromISODate } from "@/utils/formatDateFromISODate";
import { formatTimeFromISODate } from "@/utils/formatTimeFromISODate";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
type InboxCardProps = {
  inbox: InboxTypeWithId;
};

const InboxCard: FC<InboxCardProps> = ({ inbox }) => {
  const user = useSession();
  const { handleUnreadContactDecrement } = useReadUnread();
  const token = user.data?.user.token;
  const { _id: id, fullName, comment, isRead, createdAt } = inbox;
  const [isActive, setIsActive] = useState(isRead);

  const updateInboxStatus = async (inboxId: string, token: string) => {
    try {
      const response = await fetch(`${API_URL}/contacts/${inboxId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ isRead: true }),
      });

      if (!response.ok) {
        console.error("Failed to update contact");
      }
      // revalidateByTag("contact");
      handleUnreadContactDecrement();
      return await response.json();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleClick = () => {
    if (!isActive) {
      setIsActive(true);
    }
    updateInboxStatus(id, token as string);
  };

  return (
    <div
      className={cn(
        "inbox-shadow flex flex-col rounded-xl border border-transparent p-4 transition-all duration-300 hover:border-secondary-500 group-data-[state=active]:border-secondary",
        { "bg-secondary-100": !isRead && !isActive },
      )}
      onClick={handleClick}
    >
      <div className="mb-3 flex flex-wrap justify-between">
        <h6 className="text-base">{fullName}</h6>
        <div className="flex">
          Date {formatDateFromISODate(createdAt)}{" "}
          {formatTimeFromISODate(createdAt)}
        </div>
      </div>
      <p className="text-left">{comment}</p>
    </div>
  );
};

export default InboxCard;
