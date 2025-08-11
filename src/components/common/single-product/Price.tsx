"use client";

import useCurrency from "@/hooks/useCurrency";
import {
  convertCurrency,
  convertToBaseCurrency,
  CurrencyCode,
  currencyList,
  CurrencyRate,
} from "@/utils/convertCurrency";

export default function Price({
  price,
  rate,
  isCard = false,
}: {
  price: {
    currency: CurrencyCode;
    amount: number;
  };
  rate: CurrencyRate;
  isCard?: boolean;
}) {
  const [currency] = useCurrency();
  const basePrice = convertToBaseCurrency(price.amount, price.currency, rate);
  const formattedNumber = parseFloat(
    convertCurrency(currency, basePrice, rate).toString().replace(/,/g, ""),
  ).toLocaleString("en-US");

  return (
    <h3
      className={
        isCard
          ? ``
          : "text-xl font-bold leading-none max-lg:text-[#635577] lg:text-[2rem] lg:font-semibold lg:leading-10"
      }
    >
      {currencyList.find((i) => i.code === currency)?.sign} {formattedNumber}
    </h3>
  );
}
