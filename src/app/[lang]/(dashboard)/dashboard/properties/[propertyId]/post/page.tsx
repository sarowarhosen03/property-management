import { langType } from "@/app/[lang]/(main)/page";
import { auth } from "@/auth";
import { PropertyCardWithSlider } from "@/components/dashboard/properties/PropertyCard-Slider";
import PropertyPostButton from "@/components/dashboard/properties/property/PropertyPostButton";
import { PropertyStatusHeadline } from "@/components/dashboard/properties/property/PropertyStatusHeader/PropertyStatusHeadline";
import { Button } from "@/components/ui/button";
import { SinglePropertyDict } from "@/lib/db/type";
import { getAdminDictionary } from "@/lib/getDictionary";
import { StatusOptions } from "@/types";
import Link from "next/link";
import { getProperty } from "../../action";

const options: {
  en: StatusOptions[];
  hy: StatusOptions[];
  rus: StatusOptions[];
} = {
  en: [
    { label: "Fill in", status: "active" },
    { label: "Preview", status: "active" },
    { label: "Post", status: "inactive" },
  ],
  hy: [
    { label: "Լրացնել", status: "active", className: "w-1/3" },
    { label: "Նախադիտում", status: "inactive", className: "w-1/3" },
    {
      label: "Հրապարակել",
      status: "inactive",
    },
  ],
  rus: [
    { label: "Заполнить", status: "active", className: "w-1/3" },
    { label: "Предпросмотр", status: "inactive", className: "w-1/3" },
    {
      label: "Опубликовать",
      status: "inactive",
    },
  ],
};

export default async function PropertyPage({
  params: { propertyId, lang },
}: {
  params: { propertyId: string; lang: langType };
}) {
  const session = await auth();
  const token = session?.user.token as string;

  const property = await getProperty(token, propertyId);
  const dict: SinglePropertyDict = await getAdminDictionary(
    lang,
    "singleProperty",
  );
  return (
    <>
      <div className="flex flex-col">
        <div className="w-full max-w-[604px]">
          <PropertyStatusHeadline
            title={dict["Post an Ad?"]}
            options={options[lang]}
          />
        </div>
        <div className="w-1/3">
          <h2 className="mt-6 text-lg font-semibold">
            {
              dict[
                "Are you ready to post your advertisement? Please review all details to ensure accuracy."
              ]
            }
          </h2>

          <div className="mt-6">
            <div className="w-[336px]">
              <PropertyCardWithSlider property={property} lang={lang} />
            </div>

            <div className="mt-8 flex gap-8">
              <Button variant={"tertiary"} asChild>
                <Link href={"/dashboard/properties"}>{dict.Cancel}</Link>
              </Button>
              <PropertyPostButton propertyId={propertyId} dict={dict} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
