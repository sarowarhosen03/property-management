"use client";
import { API_URL } from "@/config/site";
import { getCurrencyRate } from "@/lib/getCurrrencyRate";
import { convertCurrency } from "@/utils/convertCurrency";
import { useEffect, useState } from "react";
import useCurrency from "./useCurrency";

const fetchPriceRange = async (): Promise<any> => {
  try {
    const res = await fetch(`${API_URL}/properties/prices`);
    return res.json();
  } catch (err: any) {
    return {
      code: 500,
      success: false,
      message: err.message,
      data: {
        maxPrice: 0,
        minPrice: 0,
      },
    };
  }
};

export default function useRange() {
  const [currency] = useCurrency();
  const [priceRanges, setPriceRanges] = useState({ minPrice: 0, maxPrice: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currency) {
      return;
    }

    (async () => {
      setLoading(true);
      const rates = await fetchPriceRange();
      const crates = await getCurrencyRate();

      setPriceRanges({
        minPrice: parseInt(
          convertCurrency(currency, rates.data.minPrice, crates),
        ),
        maxPrice: parseInt(
          convertCurrency(currency, rates.data.maxPrice, crates),
        ),
      });
      setLoading(false);
    })();
  }, [currency]);

  return { priceRanges, loading };
}
