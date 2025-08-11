import { langType } from "@/app/[lang]/(main)/page";
import { auth, signOut } from "@/auth";
import Logo from "@/components/header/Logo";
import { buttonVariants } from "@/components/ui/button";
import { Footer as FooterType } from "@/lib/db/type";
import { getDectionary } from "@/lib/getDictionary";
import Link from "next/link";
import React from "react";

const footDict = {
  en: "Hrachya Kochar Street, 13A",
  hy: "Հրաչյա Քոչարի փողոց, 13Ա",
  rus: "Улица Грачья Кочара, 13А",
};
const copyRight = {
  en: "2024 All Rights Reserved",
  rus: "2024 Все права защищены",
  hy: " 2024 Բոլոր իրավունքները պաշտպանված են",
};
export async function Footer({ lang }: { lang: langType }) {
  const user = await auth();
  const footer: FooterType = await getDectionary(lang, "footer");
  return (
    <footer className="bg-secondary px-6 py-12 text-sm font-semibold text-white lg:pb-4 lg:pt-14 xl:px-0">
      <div className="container mx-auto grid grid-cols-1 gap-12 px-4 md:grid-cols-3 md:gap-12 md:px-6 lg:gap-8 lg:px-8">
        <div className="flex flex-col space-y-6 lg:space-y-4">
          <div className="flex items-start space-x-2 lg:items-center">
            <MapPinIcon className="h-6 w-6 flex-[0_0_24px]" />
            <span>{footDict[lang]}</span>
          </div>
          <div className="flex items-start space-x-2 lg:items-center">
            <PhoneIcon className="h-6 w-6 flex-[0_0_24px]" />
            <a href="+37498333939">+374 98 333939</a>
            <a href="+37411333939">+374 11 333939</a>
          </div>
          <div className="flex items-start space-x-2 lg:items-center">
            <MailIcon className="h-6 w-6 flex-[0_0_24px]" />
            <a href="mailto:it@safehouse.am">info@safehouse.am</a>
          </div>

          <div className="flex items-center space-x-8">
            <Link
              className="hover:text-gray-300"
              href="https://www.facebook.com/SafeHouseRealty/"
              target="_blank"
            >
              <FacebookIcon className="h-8 w-8" />
            </Link>
            <Link
              className="hover:text-gray-300"
              href="https://www.instagram.com/safehouse.am/"
              target="_blank"
            >
              <Instagram className="h-8 w-8" />
            </Link>
            {/* <Link className="hover:text-gray-300" href="#">
              <TelegramIcon className="h-8 w-8" />
            </Link>
            <Link className="hover:text-gray-300" href="#">
              <TiktokIcon className="h-8 w-8" />
            </Link> */}
          </div>
        </div>
        <div className="flex justify-center space-y-3 text-left md:text-center">
          <ul className="mr-auto space-y-6 text-left md:mx-auto lg:space-y-4">
            <li className="">
              <Link
                className="hover:text-gray-300"
                href={`/${lang}/properties?category=buy&type=apartment`}
              >
                {footer.buy}
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-gray-300"
                href={`/${lang}/properties?category=rent&type=apartment`}
              >
                {footer.rent}
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-gray-300"
                href={`${lang}/properties?category=${encodeURIComponent(`daily rent`)}&type=apartment`}
              >
                {footer.DailyRent}
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-300" href="/investment">
                {footer.investment}
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-300" href="/privacy-policy">
                {footer.privacyPolicy}
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-center max-lg:text-center md:items-center lg:items-end">
          <div className="flex items-center justify-center">
            <Logo width={174.86} height={56} />
          </div>
          <div className="mt-10 flex flex-col gap-3 text-center max-lg:-mx-6">
            {!user ? (
              <Link
                className={`${buttonVariants()} mx-auto w-[90%] text-center md:w-auto`}
                href={"/login"}
              >
                {footer.login}
              </Link>
            ) : (
              <>
                <Link
                  className={`${buttonVariants()} mx-auto w-full`}
                  href={"/dashboard"}
                >
                  {footer.dashboard}
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button
                    className={`${buttonVariants()} max-lg:w-full`}
                    type="submit"
                  >
                    {footer.logout}
                  </button>
                </form>
              </>
            )}
          </div>
          <div className="mt-8 w-full lg:text-right">
            <p className="font-normal">Safe House © {copyRight[lang]}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.6667 4H9.33333C6.388 4 4 6.388 4 9.33333V22.6667C4 25.612 6.388 28 9.33333 28H16.828V18.7187H13.704V15.0853H16.828V12.412C16.828 9.31333 18.7227 7.624 21.488 7.624C22.42 7.62133 23.3507 7.66933 24.2773 7.764V11.004H22.3733C20.8667 11.004 20.5733 11.716 20.5733 12.7667V15.08H24.1733L23.7053 18.7133H20.552V28H22.6667C25.612 28 28 25.612 28 22.6667V9.33333C28 6.388 25.612 4 22.6667 4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TelegramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="27"
      viewBox="0 0 30 27"
      fill="none"
      {...props}
    >
      <path
        d="M28.5301 1.19274C28.0501 0.785704 27.2962 0.727464 26.5166 1.04042H26.5154C25.6955 1.36938 3.30831 10.9719 2.39695 11.3643C2.23119 11.4219 0.783513 11.962 0.932633 13.1652C1.06575 14.25 2.22927 14.6993 2.37135 14.7511L8.06287 16.6999C8.44047 17.9569 9.83247 22.5943 10.1403 23.5851C10.3323 24.2027 10.6453 25.0142 11.1938 25.1812C11.675 25.3668 12.1538 25.1972 12.4635 24.954L15.9432 21.7265L21.5605 26.1073L21.6942 26.1873C22.0757 26.3563 22.4411 26.4407 22.7899 26.4407C23.0594 26.4407 23.3179 26.3902 23.565 26.2891C24.4066 25.9435 24.7432 25.1415 24.7784 25.0507L28.9742 3.24138C29.2302 2.07658 28.8744 1.48394 28.5301 1.19274ZM13.0824 17.4795L11.1624 22.5995L9.24239 16.1995L23.9624 5.31946L13.0824 17.4795Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TiktokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="28" height="28" rx="14" fill="currentColor" />
      <path
        d="M18.4684 4.2002H15.0155V17.5509C15.0155 19.1417 13.6876 20.4483 12.035 20.4483C10.3823 20.4483 9.05435 19.1417 9.05435 17.5509C9.05435 15.9886 10.3528 14.7103 11.9464 14.6535V11.3017C8.43461 11.3584 5.60156 14.1138 5.60156 17.5509C5.60156 21.0164 8.49363 23.8002 12.0645 23.8002C15.6353 23.8002 18.5273 20.988 18.5273 17.5509V10.7051C19.8258 11.6141 21.4194 12.1538 23.1016 12.1822V8.83034C20.5046 8.74512 18.4684 6.6999 18.4684 4.2002Z"
        fill="#433B4F"
      />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path
        fill="currentColor"
        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
      />
    </svg>
  );
}
