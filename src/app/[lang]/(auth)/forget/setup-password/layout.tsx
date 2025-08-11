import Header from "@/components/header/Header";
import { Footer } from "@/components/main/footer/Footer";
import { Header as headerType } from "@/lib/db/type";
import { getDectionary } from "@/lib/getDictionary";
import React from "react";
import { pagePropType } from "./[userId]/[token]/page";

interface RootLayoutProps extends pagePropType {
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
  params: { lang },
}: RootLayoutProps) {
  const dictionary: headerType = await getDectionary(lang, "header");

  return (
    <>
      <Header lang={lang} dictionary={dictionary} />
      <main>{children}</main>
      <Footer lang={lang} />
    </>
  );
}
