"use client";
import { langType } from "@/app/[lang]/(main)/page";
import { locales } from "@/lib/internationlization";
import { hardReload } from "@/lib/reload";
import { getCookie, setCookie } from "@/utils/cookes";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { LanguageContext } from "..";

function LanguageProviderComp({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { lang: currentLangPath }: { lang: langType } = useParams();

  const languages = locales;
  const { push } = useRouter();
  useEffect(() => {
    const lang = getCookie("lang");
    if (lang !== currentLangPath) {
      setCookie("lang", currentLangPath);
    }
  }, [currentLangPath]);
  const found = languages.find((lang) => lang.code === currentLangPath);
  const [selectedLang, setSelectedLanguage] = useState(found ?? languages[0]);

  async function handleSwitchLanguage(lang: string) {
    const selectedLanguage =
      locales.find((local) => local.code === lang) || locales[0];
    //set preferred language in cookie
    setCookie("lang", selectedLang.code);
    //i can parsist it via server-side cookie due to courese limitation i cant make any api call
    const newPathName = pathname.replace(`/${currentLangPath}`, `/${lang}`);
    const params = new URLSearchParams(searchParams.toString());
    setSelectedLanguage(selectedLanguage);

    hardReload(newPathName + "?" + params.toString());
  }

  return (
    <LanguageContext.Provider value={[selectedLang, handleSwitchLanguage]}>
      {children}
    </LanguageContext.Provider>
  );
}
export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <LanguageProviderComp>{children}</LanguageProviderComp>
    </Suspense>
  );
}
