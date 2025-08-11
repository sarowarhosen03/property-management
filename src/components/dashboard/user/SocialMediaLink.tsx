import { FC } from "react";

type SocialMediaLinkProps = {
  url: string;
  icon: FC<{ className?: string }>;
};

const SocialMediaLink: FC<SocialMediaLinkProps> = ({ url, icon: Icon }) =>
  url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-7 h-7 bg-secondary text-white rounded-full"
    >
      <Icon className="scale-75" />
    </a>
  ) : (
    ""
  );

export default SocialMediaLink;
