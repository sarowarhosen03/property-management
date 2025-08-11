import { AgentType } from "@/lib/AgentSchema";
import { FC } from "react";
import { ContactLink } from "./ContactLink";

type AgentContactType = Partial<AgentType>;

export const AgentContact: FC<AgentContactType> = ({ phoneNumbers }) => {
  return (
    <>
      {phoneNumbers?.map(({ number, types }) => (
        <div className="w-full flex items-start gap-6" key={number}>
          <div className="text-[#C3AA50] font-semibold leading-8 whitespace-nowrap">
            <span>{number}</span>
          </div>
          <div className="w-full flex flex-wrap gap-2 2xl:gap-6">
            {types.map((type, index) => (
              <ContactLink icon={`/svgs/${type}.svg`} alt={type} key={index} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};
