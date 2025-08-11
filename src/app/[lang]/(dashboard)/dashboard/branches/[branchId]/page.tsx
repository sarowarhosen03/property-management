import { Button } from "@/components/ui/button";
import { API_URL } from "@/config/site";
import { BranchTypes } from "@/lib/db/type";
import { getAdminDictionary } from "@/lib/getDictionary";
import ArrowLeft from "@/svgs/arrow-left.svg";
import { Branch } from "@/types/fetchDataTypes";
import Image from "next/image";
import Link from "next/link";

interface BranchPageProps {
  params: {
    branchId: string;
    lang: string;
  };
}

const fetchBranch = async (branchId: string): Promise<Branch> => {
  const response = await fetch(`${API_URL}/branches/${branchId}`, {
    next: {
      tags: ["branch"],
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch branch with id ${branchId}`);
  }
  const { data: branch } = await response.json();
  return branch;
};

export default async function BranchPage({ params }: BranchPageProps) {
  const { branchId, lang } = params;
  const {
    _id: id,
    name,
    coverImage,
    address: { city, state, zipCode, country },
    contact: { email, phone },
  } = await fetchBranch(branchId);
  const branchDict: BranchTypes = await getAdminDictionary(lang, "branches");
  return (
    <>
      <Button
        variant={"normal"}
        size={"normal"}
        className="-ml-4 self-start"
        asChild
      >
        <Link href={"/dashboard/branches"}>
          <ArrowLeft className="mr-2" />
          {branchDict.Back}
        </Link>
      </Button>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="flex flex-col">
          <div className="relative flex min-h-[120px] flex-col items-center overflow-hidden rounded-t-xl bg-secondary">
            {coverImage && (
              <Image
                src={coverImage}
                fill
                alt={name}
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
          <div className="flex flex-col rounded-b-xl border border-secondary-100 text-xs font-medium">
            <div className="flex flex-col">
              <div className="flex justify-between border-b border-secondary-100 px-3 py-2">
                <span>{branchDict.Email}</span>
                <strong>{email}</strong>
              </div>

              <div className="flex justify-between border-b border-secondary-100 px-3 py-2">
                <span>{branchDict.Phone}</span>
                <strong>{phone}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 flex flex-col rounded-xl border border-secondary-100">
          <div className="border-b border-secondary-100 px-5 py-3">
            <h3 className="font-semibold">{branchDict.BranchDetails}</h3>
          </div>
          <div className="p-5">
            <div className="text-sm">
              <div className="flex flex-col rounded-xl border border-secondary-100 text-xs font-medium">
                <div className="flex justify-between border-b border-secondary-100 px-3 py-2 last:border-b-0">
                  <span>{branchDict.IdentificationNumber}</span>
                  <strong>{id}</strong>
                </div>

                <div className="flex justify-between border-b border-secondary-100 px-3 py-2 last:border-b-0">
                  <span>{branchDict.Name}</span>
                  <strong>{name}</strong>
                </div>

                <div className="flex justify-between border-b border-secondary-100 px-3 py-2 last:border-b-0">
                  <span>{branchDict.City}</span>
                  <strong>{city}</strong>
                </div>

                <div className="flex justify-between border-b border-secondary-100 px-3 py-2 last:border-b-0">
                  <span>{branchDict.State}</span>
                  <strong>{state}</strong>
                </div>

                <div className="flex justify-between border-b border-secondary-100 px-3 py-2 last:border-b-0">
                  <span>{branchDict.ZipCode}</span>
                  <strong>{zipCode}</strong>
                </div>

                <div className="flex justify-between border-b border-secondary-100 px-3 py-2">
                  <span>{branchDict.Country}</span>
                  <strong>{country}</strong>
                </div>

                {/* <div className="flex justify-between border-b border-secondary-100 px-3 py-2 last:border-b-0">
                  <span>City</span>
                  <strong>New York</strong>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
