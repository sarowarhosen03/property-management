"use client";

import { langType } from "@/app/[lang]/(main)/page";
import { buttonVariants } from "@/components/ui/button";
import { Header as headerType } from "@/lib/db/type";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import CurrencyDropdown from "./CurrencyDropdown";
import LanguageDropdown from "./LanguageDropdown";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
const HOME_PATH = ["/en", "/rus", "/hy"];
export default function HeaderComponent({
  isDashboard = false,
  lang,
  dictionary,
  children,
}: {
  children: React.ReactNode;
  isDashboard?: boolean;
  lang: langType;
  dictionary: headerType;
}) {
  const [menuOpened, setMenuOpened] = useState(false);
  const path = usePathname();
  const isHome = HOME_PATH.includes(path);

  useEffect(() => {
    if (path) {
      setMenuOpened(false);
    }
  }, [path]);

  return (
    <>
      <nav
        className={`sticky left-0 right-0 top-0 z-50 px-[18px] py-4 text-light backdrop-blur-[56px] lg:px-10 lg:py-[1.1875rem] ${isHome ? "bg-secondary lg:bg-[#433B4FA6]" : "bg-secondary"}`}
      >
        <div className="mx-auto flex max-w-screen-1424 grid-cols-3 flex-wrap items-center justify-between lg:grid">
          {/* Logo and Menu Icon */}
          <Link
            prefetch={true}
            className={`items-center ${menuOpened ? "hidden" : "inline-flex"} `}
            href={`/${lang}`}
          >
            <Logo className="h-10 w-[125px] lg:h-12 lg:w-[9.375rem]" />
            <span className="sr-only">Safe House</span>
          </Link>

          <div
            onClick={() => setMenuOpened(true)}
            className={`ml-auto flex cursor-pointer items-center ${menuOpened ? "hidden" : ""} lg:hidden`}
          >
            <svg
              height={40}
              width={40}
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.00146 12.0034H32.0115"
                stroke="#FEFEFE"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M26.6759 20.0068H8.00146"
                stroke="#FEFEFE"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.00146 28.01H21.3404"
                stroke="#FEFEFE"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <nav className="hidden justify-start gap-4 text-lg font-medium lg:flex lg:gap-8 xl:justify-center">
            <Link
              className="flex items-center transition-colors hover:underline"
              href={`/${lang}/properties?category=buy&type=apartment`}
            >
              {dictionary.buy}
            </Link>
            <Link
              className="flex items-center transition-colors hover:underline lg:relative lg:left-[0.5625rem]"
              href={`/${lang}/properties?category=rent&type=apartment`}
            >
              {dictionary.rent}
            </Link>
            <Link
              className="flex items-center transition-colors hover:underline lg:relative lg:left-[1.125rem]"
              href={`/${lang}/properties?category=${encodeURIComponent(`daily rent`)}&type=apartment`}
            >
              {dictionary.DailyRent}
            </Link>
          </nav>

          {/* Navigation and Controls */}
          <div className="hidden items-center space-x-6 lg:relative lg:left-[7px] lg:flex lg:justify-end lg:space-x-10">
            <div className="hidden items-center gap-6 lg:flex">
              <div className="hidden items-center gap-5 lg:flex lg:gap-10">
                {isDashboard ? (
                  <Link
                    className={buttonVariants()}
                    href={"/dashboard/properties/add"}
                  >
                    {dictionary.PostAd}
                  </Link>
                ) : (
                  <Link
                    className={`${buttonVariants()} lg:relative lg:right-[2px]`}
                    href={"tel:+37498333939"}
                  >
                    +374 98 333939
                  </Link>
                )}
                <Link
                  title="favorites"
                  href={`/${lang}/favorites`}
                  className="h-6 w-6"
                >
                  <Image
                    src="/svgs/favorite.svg"
                    width={24}
                    height={24}
                    alt="heart"
                  />
                </Link>
              </div>

              <CurrencyDropdown />
              <LanguageDropdown />
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`z-50 max-h-[calc(100dvh-32px)] w-full list-none overflow-hidden overflow-y-auto text-base font-semibold transition-all duration-300 ease-in-out lg:hidden ${
              menuOpened ? "block" : "hidden"
            }`}
          >
            <MobileMenu
              onclose={setMenuOpened}
              dictionary={dictionary}
              isDashboard={isDashboard}
              lang={lang}
            />
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}
