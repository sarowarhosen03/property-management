"use client";

import { Inbox } from "@/lib/db/type";
import { InboxTypeWithId } from "@/lib/inboxSchema";
import { Tabs } from "@radix-ui/react-tabs";
import { FC } from "react";
import { InboxTabContent } from "./InboxTabContent";
import InboxTabList from "./InboxTabList";

interface InboxType {
  inboxes: InboxTypeWithId[];
  inboxDict: Inbox;
}

export const InboxTabs: FC<InboxType> = ({ inboxes, inboxDict }) => {
  const sortedContacts = inboxes.sort((a: any, b: any) => {
    if (a.isRead === b.isRead) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return Number(a.isRead) - Number(b.isRead);
  });

  return (
    <Tabs
      className="grid w-full grid-cols-2 gap-10"
      defaultValue={`${inboxes[0]._id}`}
    >
      <InboxTabList inboxes={inboxes} />
      {sortedContacts.map((inbox) => (
        <InboxTabContent inbox={inbox} key={inbox._id} inboxDict={inboxDict} />
      ))}
    </Tabs>
  );
};
