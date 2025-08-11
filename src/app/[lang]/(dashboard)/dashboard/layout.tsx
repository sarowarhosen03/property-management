import { auth } from "@/auth";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import Header from "@/components/header/Header";
import { Dashboard, Header as HeaderType } from "@/lib/db/type";
import { getAdminDictionary, getDectionary } from "@/lib/getDictionary";
import { locales } from "@/lib/internationlization";
import ReadUnreadProvider from "@/providers/ReadUnreadProvider";
import { getUserById } from "@/utils/fetchData";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { langType } from "../../(main)/page";
interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export async function generateStaticParams() {
  return locales?.map((item) => ({
    lang: item.code,
  }));
}

export default async function layout({
  children,
  params: { lang },
}: RootLayoutProps) {
  const session = await auth();
  const dictionary: HeaderType = await getDectionary(lang, "header");
  const dashboardDict: Dashboard = await getAdminDictionary(
    lang as langType,
    "dashboard",
  );
  const profileInfo = await getUserById(session?.user?.id);

  return (
    <SessionProvider session={session}>
      <Header
        isDashboard={true}
        lang={lang as langType}
        dictionary={dictionary}
      >
        <ReadUnreadProvider>
          <main className="main-dashboard relative flex bg-secondary-100">
            <div className="flex w-full items-start justify-start">
              {session && (
                <Sidebar
                  lang={lang as langType}
                  profileInfo={profileInfo}
                  dashboardDict={dashboardDict}
                />
              )}
              <div className="w-full max-w-[calc(100%-278px)] overflow-hidden p-8">
                <div className="min-h-[calc(100vh-152px)] overflow-hidden rounded-lg bg-secondary-50 p-8">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </ReadUnreadProvider>
      </Header>
    </SessionProvider>
  );
}
