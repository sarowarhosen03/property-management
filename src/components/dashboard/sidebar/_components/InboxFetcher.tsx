import { auth } from "@/auth";
import { getInboxes } from "@/utils/mutations";
import InboxBadge from "./InboxBadge";

export default async function InboxFetcher() {
  const { user } = await auth();
  const token = user.token;
  const getTotalInboxesResponse = await getInboxes(token as string);
  const getTotalInboxes = getTotalInboxesResponse.data;
  const totalUnredInboxes = getTotalInboxes?.filter(
    (inbox: any) => inbox.isRead == false,
  ).length;

  return (
    <>
      <InboxBadge
        getTotalInboxes={getTotalInboxes}
        totalUnredInboxes={totalUnredInboxes}
      />
    </>
  );
}
