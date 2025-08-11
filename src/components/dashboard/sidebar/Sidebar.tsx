import { langType } from "@/app/[lang]/(main)/page";
import { Dashboard } from "@/lib/db/type";
import SidebarWrapper from "./SideBarWrapper";
import ContactFetcher from "./_components/ContactFetcher";
import InboxFetcher from "./_components/InboxFetcher";

export default function Sidebar({
  lang,
  profileInfo: data,
  dashboardDict,
}: {
  lang: langType;
  profileInfo: any;
  dashboardDict: Dashboard;
}) {
  return (
    <>
      <SidebarWrapper
        dashboardDict={dashboardDict}
        lang={lang}
        profileInfo={data}
        inboxBadge={<InboxFetcher />}
        contactBadge={<ContactFetcher />}
      />
    </>
  );
}
