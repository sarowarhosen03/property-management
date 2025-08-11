export const currencyList = [
  { code: "USD", label: "USD", sign: "$", rate: 1 },
  { code: "RUB", label: "RUB", sign: "₽", rate: 92.5 },
  { code: "AMD", label: "AMD", sign: "֏", rate: 405 },
  { code: "EUR", label: "EURO", sign: "€", rate: 0.92 },
] as const;

// Deriving the CurrencyCode type from the array
export type CurrencyCode = (typeof currencyList)[number]["code"];
// Defining the ConversionRates type
export type Conversionrates = {
  // eslint-disable-next-line no-unused-vars
  [key in CurrencyCode]: number;
};

export interface CurrencyRate {
  conversion_rates: Conversionrates;
  static: boolean;
}

// Using reduce to create an object where each currency code is mapped to its rate
export const rates: Prettify<Conversionrates> = currencyList.reduce(
  (acc, curr) => {
    acc[curr.code] = curr.rate;
    return acc;
  },
  {} as Prettify<Conversionrates>,
);

export const rate = {
  USD: 1,
  AMD: 386.48,
  RUS: 0.9,
};

export function convertCurrency(
  currency: CurrencyCode,
  price: number,
  currencyRate: CurrencyRate,
) {
  return Math.round(currencyRate?.conversion_rates[currency] * price).toFixed(
    2,
  );
}

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export const convertToBaseCurrency = (
  price: number,
  currency: CurrencyCode,
  rates: any,
) => {
  return price / rates?.conversion_rates[currency].toFixed(2);
};
