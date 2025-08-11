"use client";

import { LanguageContext } from "@/context";
import { useContext } from "react";

export default function useLanguage() {
  return useContext(LanguageContext);
}
