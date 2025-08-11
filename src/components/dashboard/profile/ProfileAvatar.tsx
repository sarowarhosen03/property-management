import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AvatarPlaceholder from "@/svgs/addAvatar.svg";
import Image from "next/image";
import { FC, useState } from "react";

interface AvatarProps {
  avatar: string;
  name: string;
  className: string;
  fallbackImage?: string;
  children?: JSX.Element;
}

export const ProfileAvatar: FC<AvatarProps> = ({
  avatar,
  name,
  className,
  children,
}) => {
  const [loadError, setLoadError] = useState(false);

  return (
    <Avatar
      className={`avatar-shadow cursor-pointer overflow-hidden rounded-full border-4 border-white ${className}`}
    >
      <AvatarFallback className="bg-secondary">
        {loadError ? (
          <AvatarPlaceholder />
        ) : (
          <>
            {avatar && (
              <Image
                className="rounded-full object-cover"
                src={avatar}
                alt={name}
                onError={() => setLoadError(true)}
                fill
              />
            )}
          </>
        )}
        {children}
      </AvatarFallback>
    </Avatar>
  );
};
