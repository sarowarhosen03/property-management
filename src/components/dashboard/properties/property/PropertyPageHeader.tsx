"use client";
import { Button } from "@/components/ui/button";

import { SinglePropertyDict } from "@/lib/db/type";
import ArrowLeft from "@/svgs/arrow-left.svg";
import { Property } from "@/types/fetchDataTypes";
import { isSuperAdmin } from "@/utils/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import DeleteProperty from "./DeleteProperty";
import MoveToArchiveButton from "./MoveToArchiveButton";
import PropertyToDuplicateButton from "./PropertyToDuplcateButton";

interface PropertyPageHeaderProps {
  propertyId: string;
  property: Property;
  auth: any;
  dict: SinglePropertyDict;
}

export const PropertyPageHeader: FC<PropertyPageHeaderProps> = ({
  propertyId,
  property,
  auth,
  dict,
}) => {
  const router = useRouter();
  function handleBack() {
    const savedUrl = sessionStorage.getItem("propertyBackUrl");
    if (savedUrl) {
      router.replace(savedUrl);
      sessionStorage.removeItem("propertyBackUrl");
    } else {
      router.replace("/dashboard/properties");
    }
  }

  return (
    <div className="flex flex-col">
      <Button
        variant={"normal"}
        size={"normal"}
        className="-ml-4 cursor-pointer self-start"
        onClick={handleBack}
      >
        <span className="flex items-center">
          <ArrowLeft className="mr-2" />
          {dict.Back}
        </span>
      </Button>

      <div className="mt-8 flex gap-6">
        <Button
          variant="tertiary"
          // asChild
          onClick={() =>
            router.push(`/dashboard/properties/${propertyId}/edit`)
          }
        >
          <>
            <Image
              src="/svgs/edit.svg"
              width={24}
              height={24}
              alt="edit"
              className="-ml-0.5 mr-2 h-6 w-6"
            />
            {dict.Edit}
          </>
        </Button>
        <PropertyToDuplicateButton
          propertyId={propertyId}
          property={property}
          dict={dict}
        />
        <MoveToArchiveButton
          propertyId={propertyId}
          property={property}
          dict={dict}
        />
        {isSuperAdmin(auth.role) && (
          <DeleteProperty property={property} dict={dict} />
        )}
      </div>
    </div>
  );
};
