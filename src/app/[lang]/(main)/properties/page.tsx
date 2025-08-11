import PropertyLoader from "@/components/common/loader/PropertyLoader";
import AllProperties from "@/components/main/products/allProducts/_components/AllProperties";
import FilterTypes, {
  Sortbutton,
} from "@/components/main/products/allProducts/filter/FilterTypes";
import FilterPopup from "@/components/main/products/allProducts/FilterPopup";
import SideBar from "@/components/main/products/allProducts/SideBar";
import { SearchPage } from "@/lib/db/type";
import { getDectionary } from "@/lib/getDictionary";
import { Suspense } from "react";
import { pagePropType } from "../page";
interface pageProps extends pagePropType {
  searchParams: string;
}

export const dynamic = "force-dynamic";

export default async function PropertiesPage({
  searchParams,
  params: { lang },
}: pageProps) {
  const searchDictionary: SearchPage = await getDectionary(lang, "searchPage");
  return (
    <>
      <section className="my-5 md:container md:mb-10 md:mt-5 md:ps-6">
        <FilterTypes dict={searchDictionary} />

        <div className="flex w-full flex-col items-center md:hidden">
          <Suspense>
            <Sortbutton dict={searchDictionary} />
          </Suspense>
        </div>
        <div className="my-2 grid-cols-3 gap-4 md:mb-6 md:mt-5 md:grid xl:grid-cols-4 xl:gap-8">
          <div className="sidebar hidden md:block">
            <Suspense>
              <SideBar dict={searchDictionary} />
            </Suspense>
          </div>

          <div className="products col-span-2 w-full md:-mt-2 xl:col-span-3">
            <Suspense fallback={<PropertyLoader />}>
              <AllProperties
                lang={lang}
                searchDictionary={searchDictionary}
                searchParams={searchParams}
              />
            </Suspense>
          </div>
        </div>
        <FilterPopup searchDictionary={searchDictionary} />
      </section>
    </>
  );
}
