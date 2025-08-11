import { ConfigType, SiteConfig } from "@/types";

import { env } from "@/env.mjs";
import { Metadata } from "next";

export const siteConfig: SiteConfig = {
  name: "Safe House",
  author: "Safe House",
  description: "Safe House",
  keywords: ["Safe", "House", "Real estate"],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "Safe House",
  },
  links: {},
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpeg`,
};

const config: ConfigType = {
  API_URL: env.NEXT_PUBLIC_API_URL,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url.base),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url.author,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url.base,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@_rdev7",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const { API_URL } = config;
