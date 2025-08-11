import { HomePage } from "@/lib/db/type";
import Image from "next/image";
import Link from "next/link";

import apartmentImage from "/public/assets/images/apartment.png";
import commercialImage from "/public/assets/images/commercial.jpeg";
import houseImage from "/public/assets/images/house.jpeg";
import landImage from "/public/assets/images/land.jpeg";

export function CategoryGallery({ dict }: { dict: HomePage }) {
  return (
    <section className="my-[76px] xxl:mt-[154px]">
      <div className="container">
        <h2 className="lg mb-4 text-lg font-semibold lg:mb-8 lg:text-[32px] xxl:mb-12">
          {dict.chooseYourType}
        </h2>

        <div className="flex grid-cols-5 grid-rows-[656px_296px] flex-col overflow-hidden max-lg:gap-4 lg:grid lg:rounded-[3rem]">
          <div className="relative z-[1] col-start-1 col-end-4 row-start-1 row-end-2 grid grid-rows-2 gap-4 bg-white lg:gap-8 lg:pb-8 lg:pr-8">
            <Link
              className="relative min-h-[128px] flex-1 overflow-hidden p-6 max-lg:rounded-[2rem] lg:px-12 lg:py-12"
              href="/properties?category=buy&type=apartment"
            >
              <h2 className="text-lg font-semibold text-white lg:text-[2rem]">
                {dict.apartment}
              </h2>
              <div className="absolute inset-0 z-[-1]">
                <Image
                  alt={dict.apartment}
                  className="-z-1 object-cover"
                  src={apartmentImage}
                  fill
                  quality={100}
                  placeholder="blur"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(77,65,94,0.407)] to-[rgba(55,46,68,0.55)]"></div>
              </div>
            </Link>
            <Link
              className="relative min-h-[128px] flex-1 overflow-hidden p-6 max-lg:rounded-[2rem] lg:px-12 lg:py-10"
              href="/properties?category=buy&type=commercial"
            >
              <h2 className="text-lg font-semibold text-white lg:text-[2rem]">
                {dict.commercial}
              </h2>
              <div className="absolute inset-0 z-[-1]">
                <Image
                  alt={dict.commercial}
                  className="-z-1 object-cover"
                  src={commercialImage}
                  fill
                  quality={100}
                  placeholder="blur"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(77,65,94,0.407)] to-[rgba(55,46,68,0.55)]"></div>
              </div>
            </Link>
          </div>
          <div className="relative col-start-3 col-end-6 row-start-1 row-end-3 flex lg:pl-8">
            <Link
              className="relative min-h-[128px] flex-1 overflow-hidden p-6 max-lg:rounded-[2rem] lg:px-12 lg:py-10"
              href="/properties?category=buy&type=house"
            >
              <h2 className="text-lg font-semibold text-white lg:hidden lg:text-[2rem]">
                {dict.house}
              </h2>
              <div className="absolute inset-0 z-[-1]">
                <Image
                  alt={dict.house}
                  className="-z-1 object-cover"
                  src={houseImage}
                  fill
                  quality={100}
                  placeholder="blur"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(77,65,94,0.407)] to-[rgba(55,46,68,0.55)]"></div>
              </div>
            </Link>
          </div>
          <div className="col-start-1 col-end-3 row-start-2 flex">
            <Link
              className="relative min-h-[128px] flex-1 overflow-hidden p-6 max-lg:rounded-[2rem] lg:px-12 lg:py-10"
              href="/properties?category=buy&type=land"
            >
              <h2 className="text-lg font-semibold text-white lg:text-[2rem]">
                {dict.land}
              </h2>
              <div className="absolute inset-0 z-[-1]">
                <Image
                  alt={dict.apartment}
                  className="-z-1 object-cover"
                  src={landImage}
                  fill
                  quality={100}
                  placeholder="blur"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(77,65,94,0.407)] to-[rgba(55,46,68,0.55)]"></div>
              </div>
            </Link>
          </div>
          <div className="pointer-events-none col-start-4 col-end-6 row-start-1 hidden pl-12 pt-10 lg:flex">
            <h2 className="hidden text-lg font-semibold text-white lg:block lg:text-[2rem]">
              {dict.house}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
