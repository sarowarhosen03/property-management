import InboxCard from "@/components/dashboard/inbox/InboxCard";
import { InboxTypeWithId } from "@/lib/inboxSchema";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { FC } from "react";

export type InboxCardType = {
  inboxes: InboxTypeWithId[];
};

const InboxTabList: FC<InboxCardType> = ({ inboxes }) => {
  const sortedInboxes = inboxes.sort(
    (a, b) => Number(a.isRead) - Number(b.isRead),
  );

  return (
    <TabsList className="w-full">
      <ScrollArea className="h-[600px] w-full overflow-y-auto">
        <div className="flex flex-col gap-4 pr-6">
          {sortedInboxes.map((inbox) => (
            <TabsTrigger
              key={inbox._id}
              value={`${inbox._id}`}
              className="group"
            >
              <InboxCard inbox={inbox} />
            </TabsTrigger>
          ))}
        </div>
      </ScrollArea>
    </TabsList>
  );
};

export default InboxTabList;
