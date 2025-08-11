"use client";
import { langType } from "@/app/[lang]/(main)/page";
import useCurrency from "@/hooks/useCurrency";
import useLanguage from "@/hooks/useLanguage";
import { Header } from "@/lib/db/type";
import { locales } from "@/lib/internationlization";
import { currencyList } from "@/utils/convertCurrency";
import { Check } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

import CloseIcon from "@/svgs/close.svg";
import HeartIcon from "@/svgs/heart.svg";

export default function MobileMenu({
  onclose,
  isDashboard,
  dictionary,
  lang,
}: {
  onclose: Function;
  isDashboard: boolean;
  dictionary: Header;
  lang: langType;
}) {
  const [defaultCurrency, setCurrency] = useCurrency();
  const [defaultLocal, setLocal] = useLanguage();

  return (
    <>
      <div className="mb-7 flex w-full items-center justify-between bg-transparent">
        <span>{dictionary.Menu}</span>
        <div className="cursor-pointer text-gray-300">
          <CloseIcon onClick={() => onclose(false)} />
        </div>
      </div>
      <ul className="flex flex-col gap-4">
        <li className="bg-transparent">
          <Link
            href={`/${lang}/properties?category=buy&type=apartment`}
            onClick={() => onclose(false)}
          >
            {dictionary.buy}
          </Link>
        </li>
        <li className="bg-transparent">
          <Link
            href={`/${lang}/properties?category=rent&type=apartment`}
            onClick={() => onclose(false)}
          >
            {dictionary.rent}
          </Link>
        </li>
        <li className="bg-transparent">
          <Link
            href={`/${lang}/properties?category=${encodeURIComponent(`daily rent`)}&type=apartment`}
            onClick={() => onclose(false)}
          >
            {dictionary.DailyRent}
          </Link>
        </li>
      </ul>

      <li className="mt-8 bg-transparent">
        <span className="mb-2.5 block text-base font-medium">
          {dictionary.currency}{" "}
        </span>
        <ul className="flex flex-col gap-4">
          {currencyList.map((currency, i) =>
            defaultCurrency === currency.code ? (
              <li
                className="flex"
                key={i}
                onClick={() => setCurrency(currency.code)}
              >
                <span>{currency.label}</span>{" "}
                <span className="ml-3">
                  <Check />
                </span>
              </li>
            ) : (
              <li
                className="flex"
                key={i}
                onClick={() => setCurrency(currency.code)}
              >
                {currency.label}
              </li>
            ),
          )}
        </ul>
      </li>
      <li className="mt-8 bg-transparent">
        <span className="mb-2.5 block text-base font-medium">Language </span>
        <ul className="flex flex-col gap-4">
          {locales.map((local, i) =>
            defaultLocal.code === local.code ? (
              <li className="flex" key={i} onClick={() => setLocal(local.code)}>
                <span>{local.label}</span>{" "}
                <span className="ml-3">
                  <Check />
                </span>
              </li>
            ) : (
              <li className="flex" key={i} onClick={() => setLocal(local.code)}>
                {local.label}
              </li>
            ),
          )}
        </ul>
      </li>
      <li className="mt-8 bg-transparent">
        <Link href={`/${lang}/favorites`} className="flex text-lg font-medium">
          <span className="mr-2">
            <HeartIcon className="h-[24px] fill-white" />
          </span>{" "}
          {dictionary.Favorite}
          <span></span>{" "}
        </Link>
      </li>

      <li className="mt-7 w-full">
        {isDashboard ? (
          <Link
            className={`${buttonVariants()} mx-auto`}
            href={"/dashboard/properties/add"}
          >
            {dictionary.PostAd}
          </Link>
        ) : (
          <Link
            className={`${buttonVariants()} w-full`}
            href={"tel:+374 98 333939"}
          >
            +374 98 333939
          </Link>
        )}
      </li>
    </>
  );
}
