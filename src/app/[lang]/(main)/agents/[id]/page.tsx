import { PropertyPagination } from "@/components/main/products/allProducts/_components/Pagination";
import { Properties } from "@/components/main/products/Properties";
import { Properties as PropertyType } from "@/lib/db/type";
import { getDectionary } from "@/lib/getDictionary";
import { getAllProperties, getUserById } from "@/utils/fetchData";

export default async function Page({
  searchParams,
  params: { id: agentId, lang },
}: any) {
  const newSearchParams = new URLSearchParams(searchParams);
  const { properties, pagination } = await getAllProperties({
    searchParams: `agentId=${agentId}&${newSearchParams.toString()}`,
  });
  const { data: agent } = await getUserById(agentId);
  const dictionary: PropertyType = await getDectionary(lang, "properties");

  return (
    <section className="py-6">
      <div className="container">
        <div className="text-center">
          {agent ? (
            <h1 className="text-4xl">
              See all{" "}
              <strong>
                {agent.firstName} {agent.lastName}
              </strong>
              {"'s properties"}
            </h1>
          ) : (
            <h1>{dictionary.propertyNotFound}</h1>
          )}
        </div>

        {agent && (
          <div className="mt-6">
            <Properties
              lang={lang}
              properties={properties}
              className="gird-cols-4 xl:gap-x-4 xl:gap-y-8"
            />
            <PropertyPagination pagination={pagination} />
          </div>
        )}
      </div>
    </section>
  );
}
