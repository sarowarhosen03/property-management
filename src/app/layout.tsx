import "@/styles/globals.css";

import type { Viewport } from "next";
import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";
import RootProvider from "@/providers";
import React from "react";
export { metadata } from "@/config/site";

export const montserrat = Montserrat({ subsets: ["vietnamese"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen overflow-x-clip bg-white antialiased",
          montserrat.className,
        )}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
