import Landing from "@/components/main/landing/Landing";
export type langType = "en" | "rus" | "hy";
export interface pagePropType {
  params: {
    lang: langType;
  };
}

export default function HomePage({ params: { lang } }: pagePropType) {
  return <Landing lang={lang} />;
}
