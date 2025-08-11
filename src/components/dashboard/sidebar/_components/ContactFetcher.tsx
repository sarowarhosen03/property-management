import { getContacts } from "@/app/[lang]/(dashboard)/dashboard/contacts/page";
import { auth } from "@/auth";
import ContactBadge from "./ContactBadge";

export default async function ContactFetcher() {
  const session = await auth();
  const token = session?.user.token as string;

  const getTotalInboxesResponse = await getContacts({}, token);
  const getTotalInboxes = getTotalInboxesResponse.data;

  const totalUnredInboxes = getTotalInboxes.filter(
    (inbox: any) => inbox.isRead == false,
  ).length;

  return (
    <>
      <ContactBadge
        getTotalInboxes={getTotalInboxes}
        totalUnredInboxes={totalUnredInboxes}
      />
    </>
  );
}
