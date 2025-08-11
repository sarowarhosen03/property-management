import Messenger from "@/svgs/messenger.svg";
import Telegram from "@/svgs/telegram.svg";
import ViberIcon from "@/svgs/viber.svg";
import WhatsappIcon from "@/svgs/whatsapp.svg";
import { AgentId } from "@/types/fetchDataTypes";
import Link from "next/link";
import { AgentAvatar } from "./_components/AgentAvatar";
const phoneIcons = {
  whatsapp: {
    icon: <WhatsappIcon />,
    getLink: (phone: string) => `https://wa.me/${phone}`,
  },
  viber: {
    icon: <ViberIcon />,
    getLink: () => `#`,
  },
  telegram: {
    icon: <Telegram />,
    getLink: (phone: string) => `https://t.me/${phone}`,
  },
  messenger: {
    icon: <Messenger />,
    getLink: (phone: string) => `sms:+${phone}`,
  },
};

export default function AgentInfo({ agentId }: { agentId: AgentId }) {
  const agent = agentId;
  const { firstName, lastName, avatar } = agent;

  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="property__agent rounded-3xl bg-white p-6 max-lg:border-t lg:gap-4 lg:rounded-[48px] 2xl:p-10">
      <div className="flex flex-col items-start gap-5 lg:flex-row">
        <div className="flex items-center gap-2">
          <AgentAvatar
            firstName={firstName}
            lastName={lastName}
            avatar={avatar}
          />
          <h4 className="text-lg font-semibold lg:hidden">{fullName}</h4>
        </div>
        <div className="flex w-full flex-col lg:pt-4">
          <h4 className="hidden font-semibold lg:block 2xl:text-lg">
            {fullName}
          </h4>
          <div className="flex flex-col gap-5 text-sm lg:mt-6 2xl:text-lg">
            {agentId?.phoneNumbers &&
              agentId.phoneNumbers.map((phoneinfo, i) => {
                return (
                  <div className="flex w-full items-start gap-1" key={i}>
                    <span className="flex-1 whitespace-nowrap font-semibold leading-8 text-[#C3AA50]">
                      {phoneinfo.number}
                    </span>

                    <div className="flex w-full flex-1 flex-wrap gap-2 2xl:gap-6">
                      {phoneinfo.types.map((key, i) => {
                        return (
                          <div key={i} className="max-h-8 w-1/4 max-w-8">
                            <a
                              href={phoneIcons[
                                key.toLocaleLowerCase() as keyof typeof phoneIcons
                              ].getLink(phoneinfo.number)}
                              className="social-shadow flex aspect-square items-center justify-center whitespace-pre rounded-md bg-[#EBE9E9]"
                              target="_blank"
                            >
                              {
                                phoneIcons[
                                  key.toLocaleLowerCase() as keyof typeof phoneIcons
                                ].icon
                              }
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="mt-2 w-full">
        <Link
          className="text-sm font-semibold text-secondary"
          href={`/agents/${agent._id}`}
        >
          See Agent's Other Properties
        </Link>
      </div>
    </div>
  );
}
