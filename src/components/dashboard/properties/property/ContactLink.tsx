import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ContactLinkProps {
  href?: string;
  icon: string;
  alt: string;
}

export const ContactLink: FC<ContactLinkProps> = ({ href = "", icon, alt }) => (
  <div className="w-1/4 max-w-8 max-h-8 ">
    <Link
      href={href}
      className="flex items-center justify-center aspect-square bg-[#EBE9E9] social-shadow rounded-md"
    >
      <Image src={icon} width={20} height={20} alt={alt} className="w-5 h-5" />
    </Link>
  </div>
);
