"use client";
import { CurrencyContext } from "@/context";
import { useContext } from "react";

export default function useCurrency() {
  return useContext(CurrencyContext);
}
