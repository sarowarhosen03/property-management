"use client";

import { langType } from "@/app/[lang]/(main)/page";
import { Dashboard } from "@/lib/db/type";
import { capitalizeFirstChar } from "@/utils/stringUtils";
import { Building2, UsersRound } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProfileAvatar } from "../profile/ProfileAvatar";
import SignOut from "./SignOut";
import {
  DashboardIcon,
  InboxIcon,
  ProfileIcon,
  PropertiesIcon,
} from "./icons/Icons";

const ADMIN = "admin";
const AGENT = "agent";

const isActiveCurrentPage = (currentPageUrl: string, targetPageUrl: string) =>
  currentPageUrl == targetPageUrl;

export default function SidebarWrapper({
  lang,
  profileInfo: data,
  dashboardDict,
  inboxBadge,
  contactBadge,
}: {
  lang: langType;
  profileInfo: any;
  dashboardDict: Dashboard;
  inboxBadge: any;
  contactBadge: any;
}) {
  const user = useSession();
  const path = usePathname();
  const token = user.data?.user.token;

  let { firstName, lastName, role, avatar } = data?.data || {};

  const name = firstName + " " + lastName;

  const MenuLinks = (lang: langType, role: string) => [
    {
      title: dashboardDict.Dashboard,
      href: `/${lang}/dashboard`,
      icon: <DashboardIcon />,
      status: true,
    },
    {
      title: dashboardDict.MyProperties,
      href: `/${lang}/dashboard/properties`,
      icon: <PropertiesIcon />,
      status: true,
    },

    {
      title: dashboardDict.Inbox,
      href: `/${lang}/dashboard/inbox`,
      icon: <InboxIcon />,
      status: role === AGENT || role === ADMIN,
    },
    {
      title: dashboardDict.Contacts,
      href: `/${lang}/dashboard/contacts`,
      icon: <InboxIcon />,
      status: role === ADMIN,
    },
    {
      title: dashboardDict.ProfileSettings,
      href: `/${lang}/dashboard/profile`,
      icon: <ProfileIcon />,
      status: true,
    },
    {
      title: dashboardDict.Users,
      href: `/${lang}/dashboard/users`,
      icon: <UsersRound size={24} />,
      status: role === ADMIN,
    },
    {
      title: dashboardDict.Branches,
      href: `/${lang}/dashboard/branches`,
      icon: <Building2 size={24} />,
      status: role === ADMIN,
    },
  ];

  return (
    <aside
      id="separator-sidebar"
      className="sticky left-0 top-[88px] z-40 w-[278px] flex-shrink-0 flex-grow-0 basis-[278px]"
      aria-label="Sidebar"
    >
      <div className="h-[calc(100vh_-_88px)] transition-transform sm:translate-x-0">
        <div className="flex h-full max-h-screen flex-col space-y-4 overflow-y-auto py-8 pl-8">
          <ul className="menu space-y-3 text-lg font-medium xxl:space-y-6">
            {MenuLinks(lang, role as string)
              .filter((link) => link.status)
              .map((link) => {
                return (
                  <li key={link.title} className="menu__item">
                    <Link
                      href={link.href}
                      className={`menu__link group ${isActiveCurrentPage(path, link.href) ? "active" : ""}`}
                    >
                      <span className="flex h-8 w-8 items-center justify-center">
                        {link.icon}
                      </span>
                      <span className="ms-3">{link.title}</span>
                      {link.href == `/${lang}/dashboard/inbox` && inboxBadge}
                      {link.href == `/${lang}/dashboard/contacts` &&
                        contactBadge}
                    </Link>
                  </li>
                );
              })}
          </ul>

          <div className="!mt-auto flex">
            <div className="flex gap-2">
              <div className="h-14 w-14 overflow-hidden rounded-full">
                <ProfileAvatar
                  avatar={avatar as string}
                  name={name as string}
                  className="h-14 w-14"
                />
              </div>
              <div className="flex flex-col text-base text-[#1D2939]">
                <h6>{name}</h6>
                <h6 className="mt-2.5">
                  {capitalizeFirstChar(role as string)}({dashboardDict.Role})
                </h6>
                <SignOut dashboardDict={dashboardDict} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
