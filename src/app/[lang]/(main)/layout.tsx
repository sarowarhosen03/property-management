import Header from "@/components/header/Header";
import { Footer } from "@/components/main/footer/Footer";
import { Header as headerType } from "@/lib/db/type";
import { getDectionary } from "@/lib/getDictionary";
import { locales } from "@/lib/internationlization";
import React from "react";
import { pagePropType } from "./page";

interface RootLayoutProps extends pagePropType {
  children: React.ReactNode;
}

export async function generateStaticParams() {
  return locales?.map((item) => ({
    lang: item.code,
  }));
}
export default async function RootLayout({
  children,
  params: { lang },
}: RootLayoutProps) {
  const dictionary: headerType = await getDectionary(lang, "header");
  return (
    <>
      <Header lang={lang} isDashboard={false} dictionary={dictionary}>
        <main>{children}</main>
        <Footer lang={lang} />
      </Header>
    </>
  );
}
