"use server";

import { Property } from "@/types/fetchDataTypes";
import { CurrencyRate, rates } from "@/utils/convertCurrency";
import { isArray } from "lodash";
import { cache } from "react";
const SIX_HOURS = 21600;

export const getCurrencyRate = cache(async (currency = "USD") => {
  if (process.env.NODE_ENV === "production") {
    const currencyRate: CurrencyRate = await fetch(
      `https://v6.exchangerate-api.com/v6/46b5ace20a3aea302950589f/latest/${currency}`,
      {
        next: {
          revalidate: SIX_HOURS,
        },
      },
    )
      .then((res) => res.json())
      .then((rates) => ({
        conversion_rates: {
          USD: rates.conversion_rates.USD,
          RUB: rates.conversion_rates.RUB,
          EUR: rates.conversion_rates.EUR,
          AMD: rates.conversion_rates.AMD,
        },
        static: true,
      }))
      .catch(() => {
        return {
          conversion_rates: rates,
          static: true,
        };
      });

    return currencyRate;
  }
  return {
    conversion_rates: rates,
    static: true,
  };
});

export const getRateForAllCurrency = cache(
  async (properties: Property[] | undefined, codes?: string[] | undefined) => {
    const currencyDistinct = [
      ...new Set(properties?.map((i) => i.price.currency)),
    ];
    if (isArray(codes)) {
      return await Promise.all(
        codes.map(async (currency) => {
          const currencyRate = await getCurrencyRate(currency);
          return {
            currency: currency,
            currencyRate,
          };
        }),
      );
    }
    return await Promise.all(
      currencyDistinct.map(async (currency) => {
        const currencyRate = await getCurrencyRate(currency);
        return {
          currency: currency,
          currencyRate,
        };
      }),
    );
  },
);
