"use client";
import { langType } from "@/app/[lang]/(main)/page";
import { Loader } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { revalidateByTag } from "@/lib/revalidateCache";
import { pushPropertyTopById } from "@/utils/fetchData";
import { useState } from "react";

const BUTTON_LAABEL = {
  en: "Update",
  hy: "Թարմացնել",
  rus: "Обновить",
};

const PropertyUpdateButton = ({
  propertyId,
  lang,
}: {
  propertyId: string;
  lang: langType;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await pushPropertyTopById(propertyId);
      revalidateByTag("properties");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Button
      size={"sm"}
      className="mt-2"
      onClick={handleClick}
      variant={"secondary"}
    >
      {isLoading && <Loader classes="ml-2" />}
      {BUTTON_LAABEL[lang]}
    </Button>
  );
};

export default PropertyUpdateButton;
