import { langType } from "@/app/[lang]/(main)/page";
import { auth } from "@/auth";
import { InboxTopNav } from "@/components/dashboard/inbox/InboxTopNav";
import { API_URL } from "@/config/site";
import { Inbox } from "@/lib/db/type";
import { getAdminDictionary } from "@/lib/getDictionary";
import { InboxTypeWithId } from "@/lib/inboxSchema";
import { ApiResponse } from "@/types";
import { buildQueryString } from "@/utils/query";
import { FC } from "react";
import { SearchParams } from "../properties/page";
import { InboxTabs } from "./_components/InboxTabs";

async function getInboxes(
  searchParams: SearchParams,
  token: string,
): Promise<ApiResponse<InboxTypeWithId[]>> {
  const queryStr = buildQueryString(searchParams);
  const response = await fetch(`${API_URL}/inboxes?${queryStr}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["inboxes"],
    },
  });

  return await response.json();
}

interface InboxPageProps {
  searchParams: SearchParams;
  params: { lang: langType };
}

const InboxPage: FC<InboxPageProps> = async ({
  searchParams,
  params: { lang },
}) => {
  const session = await auth();
  const token = session?.user.token as string;
  const { data: inboxes } = await getInboxes(searchParams, token);

  const inboxDict: Inbox = await getAdminDictionary(lang, "inbox");

  return (
    <div className="h-screen">
      <InboxTopNav inboxDict={inboxDict} />
      <div className="flex flex-wrap">
        {inboxes?.length > 0 ? (
          <InboxTabs inboxes={inboxes} inboxDict={inboxDict} />
        ) : (
          inboxDict.noNewMailFound
        )}
      </div>
    </div>
  );
};
export default InboxPage;
