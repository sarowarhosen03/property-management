import { getNamePlacholder } from "@/utils/getNamePlacholder";
import Image from "next/image";
import { FC } from "react";

type AgentInfo = {
  avatar?: string;
  firstName: string;
  lastName: string;
};

const AvatarImage: FC<{
  avatar: string;
  firstName: string;
  lastName: string;
}> = ({ avatar, firstName, lastName }) => {
  return (
    <Image
      src={avatar}
      alt={`${firstName} ${lastName}`}
      className="object-cover"
      fill
      quality={100}
    />
  );
};

export const AgentAvatar: FC<AgentInfo> = ({ avatar, firstName, lastName }) => {
  if (!firstName || !lastName) return null;

  return (
    <div className="relative h-[78px] w-[74px] overflow-hidden rounded-2xl bg-gray-100 lg:h-[143px] lg:w-[105px] xxl:h-[243px] xxl:w-[205px]">
      {avatar ? (
        <AvatarImage
          avatar={avatar}
          firstName={firstName}
          lastName={lastName}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-400">
          <span className="text-2xl font-bold uppercase text-black md:text-4xl lg:text-6xl">
            {getNamePlacholder(firstName, lastName)}
          </span>
        </div>
      )}
    </div>
  );
};
