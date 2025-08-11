import { langType } from "@/app/[lang]/(main)/page";
import { SearchPage } from "@/lib/db/type";
import { getAllProperties } from "@/utils/fetchData";
import Products from "../../Properties";
import { PropertyPagination } from "./Pagination";

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center">
      <div className="container">
        <h1 className="mx-auto max-w-[430px] text-center text-xl font-semibold text-danger">
          {message}
        </h1>
      </div>
    </div>
  );
}

export default async function AllProperties({
  searchParams,
  searchDictionary,
  lang,
}: {
  lang: langType;
  searchParams: string;
  searchDictionary: SearchPage;
}) {
  try {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("expand");

    const { properties, pagination } = await getAllProperties({
      searchParams: newSearchParams.toString(),
    });

    if (!properties || properties.length === 0) {
      return <ErrorMessage message={searchDictionary.property_not_found} />;
    }

    return (
      <>
        <Products
          className="grid-cols-1 px-2 lg:grid-cols-3 xl:-mx-2 xl:gap-x-4 xl:px-0"
          properties={properties}
          lang={lang}
        />
        <PropertyPagination
          pagination={pagination}
          previousLabel={searchDictionary.prevPage}
          nextLabel={searchDictionary.nextPage}
        />
      </>
    );
  } catch (err) {
    console.error("Error fetching properties:", err);
    return <ErrorMessage message={searchDictionary.property_error_message} />;
  }
}
