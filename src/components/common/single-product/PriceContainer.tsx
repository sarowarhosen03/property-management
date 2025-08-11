import { getCurrencyRate } from "@/lib/getCurrrencyRate";
import { CurrencyCode } from "@/utils/convertCurrency";
import Price from "./Price";

export default async function PriceContainer({
  price,
  currency,
}: {
  price: any;
  currency: CurrencyCode;
}) {
  const rates = await getCurrencyRate(currency);

  return <Price price={price} rate={rates} />;
}
