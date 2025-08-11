"use client";

import { LanguageConfig } from "@/constants";
import { getCurrencyRate } from "@/lib/getCurrrencyRate";
import hardRedirct from "@/lib/hardRedirct";
import {
  convertCurrency,
  CurrencyCode,
  CurrencyRate,
} from "@/utils/convertCurrency";
import { getCookie, setCookie } from "@/utils/cookes";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CurrencyContext } from "..";

export default function CurrencyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [rates, setRates] = useState<CurrencyRate | null>(null);
  const pathName = usePathname();
  const searchPerams = useSearchParams();
  useEffect(() => {
    (async () => {
      const selectedCurrency: CurrencyCode = getCookie(
        "currency",
      ) as CurrencyCode;
      if (!selectedCurrency) {
        setCookie("currency", LanguageConfig.DEFAULT_CURRENCY);
      }

      if (selectedCurrency) {
        setCurrency(selectedCurrency);
        const newRates = await getCurrencyRate(selectedCurrency);
        if (newRates?.conversion_rates) {
          setRates(newRates);
        }
      }
    })();
  }, []);

  async function handleCurrencyChange(currencyCode: CurrencyCode) {
    setCurrency(currencyCode);
    setCookie("currency", currencyCode);
    const newRates = await getCurrencyRate(currencyCode);
    const prevPerams = new URLSearchParams(searchPerams.toString());
    const hasMinPrice = prevPerams.get("minprice");
    const hasMaxPeixw = prevPerams.get("maxprice");

    if (newRates?.conversion_rates) {
      setRates((prev) => {
        if (currencyCode !== currency && prev) {
          if (hasMinPrice) {
            prevPerams.set(
              "minprice",
              convertCurrency(currencyCode, parseInt(hasMinPrice), prev),
            );
          }
          if (hasMaxPeixw) {
            prevPerams.set(
              "maxprice",
              convertCurrency(currencyCode, parseInt(hasMaxPeixw), prev),
            );
          }
          if (hasMinPrice || hasMaxPeixw) {
            prevPerams.set(
              "rate",
              JSON.stringify({
                rates: newRates,
                currency: currencyCode,
              }),
            );
          }
        }
        return newRates;
      });
    }

    hardRedirct(`${pathName}?${prevPerams.toString()}`);
  }

  return (
    <CurrencyContext.Provider value={[currency, handleCurrencyChange, rates]}>
      {children}
    </CurrencyContext.Provider>
  );
}
