import { langType } from "@/app/[lang]/(main)/page";
import { montserrat } from "@/app/layout";
import { Hero } from "@/lib/db/type";
import { getDectionary } from "@/lib/getDictionary";
import FilterLandingPage from "../FilterLandingPage";
import Search from "./_components/Search";
import HeroSlider from "./HeroSlider";

const HeroComp = async ({ lang }: { lang: langType }) => {
  const heroDict: Hero = await getDectionary(lang, "hero");

  return (
    <>
      <section className="relative -mt-[72px] lg:-mt-[88px]">
        <div className="relative flex h-[279px] flex-col items-center justify-center px-6 pb-6 pt-[96px] md:h-[50vh] lg:h-[74vh] lg:pt-[88px] xl:pb-[12vh]">
          <div className="pointer-events-none relative mx-auto w-full">
            <h1
              className={`mb-[16px] text-4xl font-semibold md:mb-10 md:text-center ${montserrat.className} text-left text-primary-50 md:text-[3.3rem] md:text-h1 md:font-semibold lg:relative lg:left-[9px] lg:top-[-14px] lg:text-[64px]`}
            >
              {heroDict.title}
            </h1>
          </div>
          <Search search={heroDict.search} lang={lang} />
          <div className="absolute inset-0 -z-[1]">
            <HeroSlider />
          </div>
        </div>
      </section>
      <FilterLandingPage dict={heroDict} lang={lang} />
    </>
  );
};

export default HeroComp;
