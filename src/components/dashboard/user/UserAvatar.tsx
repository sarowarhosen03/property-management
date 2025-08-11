"use client";
import { FC } from "react";
import { ProfileAvatar } from "../profile/ProfileAvatar";

interface UserAvatarProps {
  src: string;
  firstName: string;
  lastName: string;
  className?: string;
  fallbackImage?: string;
}

export const UserAvatar: FC<UserAvatarProps> = ({
  src,
  firstName,
  lastName,
}) => {
  return (
    <ProfileAvatar
      avatar={src as string}
      name={(firstName + " " + lastName) as string}
      className="h-20 w-20"
    />
  );
};
