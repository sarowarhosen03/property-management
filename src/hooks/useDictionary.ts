"use client";
import { getAdminDictionary } from "@/lib/getDictionary";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type ParamsType = {
  lang: "en" | "rus" | "hy";
};

export default function useDictionary(node: string) {
  const { lang } = useParams<ParamsType>();
  const [dictionary, setDictionary] = useState<any>();

  useEffect(() => {
    (async () => {
      const dict: any = await getAdminDictionary(lang, node);
      setDictionary(dict);
    })();
  }, [lang, node]);

  return dictionary;
}
