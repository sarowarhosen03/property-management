import { langType } from "@/app/[lang]/(main)/page";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/config/site";
import { HomePage } from "@/lib/db/type";
import { MAX_BEST_PROPERTIES } from "@/utils/constant";
import Link from "next/link";
import Properties from "./Properties";

async function getBestProperties() {
  try {
    const response = await fetch(
      `${API_URL}/properties?status=published&isBestOffers=true`,
      {
        next: {
          revalidate: 300,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Something went wrong, Please try again later!");
    }
    const responseBody = await response.json();
    return responseBody.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
}

export default async function BestOffers({
  dict,
  lang,
}: {
  dict: HomePage;
  lang: langType;
}) {
  const properties = await getBestProperties();

  return (
    <>
      <Properties
        lang={lang}
        properties={properties}
        className={"gird-cols-4 xl:gap-x-4 xl:gap-y-8"}
      />
      {properties?.length > MAX_BEST_PROPERTIES && (
        <div className="mt-14 text-center">
          <Link href={"/properties/"}>
            <Button
              variant={"tertiary"}
              size={"md"}
              className="w-full max-w-[280px] bg-secondary-300"
            >
              {dict.seeMore}
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
