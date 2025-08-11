import { Loader } from "@/components/common/Loader";
import { API_URL } from "@/config/site";
import { Inbox } from "@/lib/db/type";
import { InboxTypeWithId } from "@/lib/inboxSchema";
import { revalidateByTag } from "@/lib/revalidateCache";
import Delete from "@/svgs/delete.svg";
import { formatDateFromISODate } from "@/utils/formatDateFromISODate";
import { formatTimeFromISODate } from "@/utils/formatTimeFromISODate";
import { TabsContent } from "@radix-ui/react-tabs";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useState } from "react";
import EmailAttachmentViewer from "./EmailAttachmentViewer";

export type InboxTabContentProps = {
  inbox: InboxTypeWithId;
  inboxDict: Inbox;
};

export const InboxTabContent: FC<InboxTabContentProps> = ({
  inbox,
  inboxDict,
}) => {
  const user = useSession();
  const token = user.data?.user.token;
  const {
    _id,
    fullName,
    email,
    phone,
    comment,
    createdAt,
    propertyId,
    attachments,
  } = inbox;

  const [isDeleting, setIsDeleting] = useState(false);

  const deleteInbox = async (inboxId: string, token: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${API_URL}/contacts/${inboxId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId: user.data?.user.id }),
      });

      if (!response.ok) {
        console.error("Failed to delete inbox");
      }
      revalidateByTag("contact");
    } catch (error) {
      console.error("Error deleting inbox:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <TabsContent value={_id} key={_id}>
      <div className="h-full rounded-lg border border-secondary-500 p-10">
        <div className="flex justify-between font-semibold">
          <div>
            {inboxDict.date} {formatDateFromISODate(createdAt)}{" "}
            {formatTimeFromISODate(createdAt)}
          </div>
          <button type="button" onClick={() => deleteInbox(_id, token || "")}>
            {isDeleting ? <Loader classes="w-4 h-4" /> : <Delete />}
          </button>
        </div>

        <h6 className="mt-4 text-lg font-semibold">
          {inboxDict.name}: {fullName}
        </h6>
        <h6 className="mt-4 text-lg font-semibold">
          {inboxDict.email}: {email}
        </h6>
        <h6 className="mt-4 text-lg font-semibold">
          {inboxDict.propertyId}:{" "}
          <Link className="text-[#C3AA50]" href={`/properties/${propertyId}`}>
            {propertyId}
          </Link>
        </h6>
        <h6 className="mt-4 text-lg font-semibold">
          {inboxDict.phone}:{" "}
          <a href={`tel:${phone}`} className="text-[#C3AA50]">
            {phone}
          </a>
        </h6>
        <div className="mt-4">
          <h6 className="mb-2 text-lg font-semibold">{inboxDict.message}: </h6>
          <div>{comment}</div>
        </div>
        {attachments && (
          <div className="mt-4">
            <EmailAttachmentViewer attachments={attachments} />
          </div>
        )}
      </div>
    </TabsContent>
  );
};
