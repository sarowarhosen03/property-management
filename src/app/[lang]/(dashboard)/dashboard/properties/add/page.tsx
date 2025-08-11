import { pagePropType } from "@/app/[lang]/(main)/page";
import AddPropertyForm from "@/components/dashboard/forms/AddPropertyForm";
import { PropertyForm } from "@/lib/db/type";
import { getAdminDictionary } from "@/lib/getDictionary";

export default async function AddPropertyPage({
  params: { lang },
}: pagePropType) {
  const propertyForm: PropertyForm = await getAdminDictionary(
    lang,
    "propertyForm",
  );
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold">{propertyForm["Post an Ad"]}</h2>
      <div className="mb-10 mt-4 flex w-1/2">
        <div className="flex w-1/3 items-center">
          <div className="relative mr-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200">
            <div className="h-3 w-3 rounded-full bg-secondary"></div>
            <span className="absolute -bottom-10 left-0 whitespace-nowrap">
              {propertyForm["Fill in"]}
            </span>
          </div>
          <div className="mr-1.5 h-[2px] w-full flex-1 rounded-full bg-gray-200"></div>
        </div>
        <div className="flex w-1/3 items-center">
          <div className="relative mr-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200">
            <div className="h-3 w-3 rounded-full bg-white"></div>
            <span className="absolute -bottom-10 whitespace-nowrap">
              {propertyForm.Preview}
            </span>
          </div>
          <div className="mr-1.5 h-[2px] w-full flex-1 rounded-full bg-gray-200"></div>
        </div>
        <div className="flex w-1/3 items-center">
          <div className="relative mr-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200">
            <div className="h-3 w-3 rounded-full bg-white"></div>
            <span className="absolute -bottom-10 whitespace-nowrap">
              {propertyForm.Post}
            </span>
          </div>
        </div>
      </div>
      <AddPropertyForm dict={propertyForm} lang={lang} />
    </div>
  );
}

export const revalidate = 0;
