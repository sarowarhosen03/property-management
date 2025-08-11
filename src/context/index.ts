"use client";
import { Property } from "@/types/fetchDataTypes";
import { CurrencyCode, CurrencyRate } from "@/utils/convertCurrency";
import React, { createContext } from "react";

export const CurrencyContext = createContext<
  [CurrencyCode, Function, CurrencyRate | null]
>(["USD", () => {}, null]);
export const LanguageContext = createContext<
  // eslint-disable-next-line no-unused-vars
  [{ code: string; language: string; label: string }, (v: string) => {}]
  // eslint-disable-next-line no-unused-vars
>([{ code: "en", language: "English", label: "English" }, (v: string) => v]);

export const FavoriteContext = createContext<
  [Property[], React.Dispatch<React.SetStateAction<Property[]>>]
>([[], () => {}]);
