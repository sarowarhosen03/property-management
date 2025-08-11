import { langType } from "@/app/[lang]/(main)/page";
import PropertyLoader from "@/components/common/loader/PropertyLoader";
import { HomePage } from "@/lib/db/type";
import { getDectionary } from "@/lib/getDictionary";
import { Suspense } from "react";
import { ContactUs } from "../contactUs/ContactUs";
import BestOffers from "../products/BestOffers";
import { CategoryGallery } from "./gallery/CategoryGallery";
import HeroComp from "./hero/Hero";

export default async function Landing({ lang }: { lang: langType }) {
  const dict: HomePage = await getDectionary(lang, "homePage");

  return (
    <>
      <HeroComp lang={lang} />

      {/* Best Offer Section */}
      <div className="mb-12 mt-12 md:my-40 md:px-14">
        <section>
          <div className="container">
            <h2 className="mb-6 text-lg font-semibold lg:mb-8 lg:text-[32px]/tight">
              {dict.bestOffer}
            </h2>
            <Suspense fallback={<PropertyLoader />}>
              <BestOffers dict={dict} lang={lang} />
            </Suspense>
          </div>
        </section>
        <CategoryGallery dict={dict} />
        <ContactUs lang={lang} />
      </div>
    </>
  );
}
