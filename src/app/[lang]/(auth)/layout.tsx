import { locales } from "@/lib/internationlization";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

export async function generateStaticParams() {
  return locales?.map((item) => ({
    lang: item.code,
  }));
}

export default function RootLayout({ children }: RootLayoutProps) {
  return <main className="relative">{children}</main>;
}
