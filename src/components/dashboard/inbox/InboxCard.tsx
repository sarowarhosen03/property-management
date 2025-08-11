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
  const token = user.data?.user.token;
  const { handleUnreadInboxDecrement } = useReadUnread();
  const { _id: id, fullName, comment, isRead, createdAt } = inbox;
  const [isActive, setIsActive] = useState(isRead);

  const updateInboxStatus = async (inboxId: string, token: string) => {
    try {
      const response = await fetch(`${API_URL}/inboxes/${inboxId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ isRead: true, userId: user.data?.user.id }),
      });

      if (!response.ok) {
        console.error("Failed to update inbox");
      }
      handleUnreadInboxDecrement();
      return await response.json();
    } catch (error) {
      console.log("Error update inbox:", error);
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
