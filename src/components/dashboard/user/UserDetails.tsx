import { Users } from "@/lib/db/type";
import { User } from "@/types/userType";
import { FC } from "react";
import { UserAvatar } from "./UserAvatar";

import Messenger from "@/svgs/messenger.svg";
import Telegram from "@/svgs/telegram.svg";
import ViberIcon from "@/svgs/viber.svg";
import WhatsappIcon from "@/svgs/whatsapp.svg";

type UserDetailsProps = {
  user: User;
  userDict: Users;
};

const phoneIcons = {
  whatsApp: <WhatsappIcon />,
  viber: <ViberIcon />,
  telegram: <Telegram />,
  messenger: <Messenger />,
};

type PhoneKey = keyof typeof phoneIcons;

const UserDetails: FC<UserDetailsProps> = ({ user, userDict }) => {
  const {
    firstName,
    lastName,
    avatar,
    email,
    phoneNumbers,
    address: { street, city, state, country, zipCode },
  } = user;
  const name = `${firstName} ${lastName}`;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center rounded-t-xl bg-secondary p-8 text-white">
        <div className="h-20 w-20">
          <UserAvatar src={avatar} firstName={firstName} lastName={firstName} />
        </div>
        <h2 className="mt-2 font-semibold">{name}</h2>
      </div>
      <div className="flex flex-col rounded-b-xl border border-secondary-100 text-xs font-medium">
        <div className="flex flex-col">
          <div className="flex justify-between border-b border-secondary-100 px-3 py-2">
            <span>{userDict.steet}</span>
            <strong>{street}</strong>
          </div>

          <div className="flex justify-between border-b border-secondary-100 px-3 py-2">
            <span>{userDict.City}</span>
            <strong>{city}</strong>
          </div>

          <div className="flex justify-between border-b border-secondary-100 px-3 py-2">
            <span>{userDict.State}</span>
            <strong>{state}</strong>
          </div>

          <div className="flex justify-between border-b border-secondary-100 px-3 py-2">
            <span>{userDict.Country}</span>
            <strong>{country}</strong>
          </div>

          <div className="flex justify-between border-b border-secondary-100 px-3 py-2">
            <span>{userDict.ZipCode}</span>
            <strong>{zipCode}</strong>
          </div>

          <div className="flex justify-between border-b border-secondary-100 px-3 py-2">
            <span>{userDict.Email}</span>
            <strong>{email}</strong>
          </div>

          <div className="flex items-center justify-between border-b border-secondary-100 px-3 py-2">
            <span>{userDict.PhoneNumber}</span>
            <strong>
              {phoneNumbers.map((phoneNumber) => (
                <span
                  className="flex items-center gap-4"
                  key={phoneNumber.number}
                >
                  <span className="flex gap-0.5">
                    {phoneNumber.types.map(
                      (phoneNumberType) =>
                        phoneIcons[phoneNumberType as PhoneKey],
                    )}
                  </span>
                  <span className="ml-auto"> {phoneNumber.number}</span>
                </span>
              ))}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
