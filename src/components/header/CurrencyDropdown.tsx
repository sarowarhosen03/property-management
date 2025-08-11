"use client";
import useCurrency from "@/hooks/useCurrency";
import { currencyList } from "@/utils/convertCurrency";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function CurrencyDropdown() {
  const [selectedCurrency, setSelectedCurrency] = useCurrency();
  async function handleCurrencyChange(currency: string) {
    setSelectedCurrency(currency);
  }

  return (
    <div className="lg:relative lg:left-[3px]">
      <Select onValueChange={handleCurrencyChange}>
        <SelectTrigger className="w-auto justify-start gap-2 border-0 p-0">
          <SelectValue placeholder={selectedCurrency.toUpperCase()} />
        </SelectTrigger>
        <SelectContent>
          {currencyList.map((currency, i) => (
            <SelectItem key={i} value={currency.code}>
              {currency.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
