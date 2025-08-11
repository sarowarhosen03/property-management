"use client";

import { showToast } from "@/components/common/toaster/toaster";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/config/site";
import { SinglePropertyDict } from "@/lib/db/type";
import { PropertyType } from "@/lib/Propertyschema";
import { hardReload } from "@/lib/reload";
import { revalidateByTag } from "@/lib/revalidateCache";
import { ApiResponse } from "@/types";
import { Property } from "@/types/fetchDataTypes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { toast } from "sonner";
import { assetsClone } from "../../forms/_utils/assetsUpload";

async function makeDuplicateProperty(
  token: string,
  propertyId: string,
  images: string[],
): Promise<ApiResponse<PropertyType>> {
  const newImages = await assetsClone(images);
  const response = await fetch(
    `${API_URL}/properties/${propertyId}/duplicate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ images: newImages }),
    },
  );
  return await response.json();
}

const PropertyToDuplicateButton = ({
  propertyId,
  property,
  dict,
}: {
  propertyId: string;
  property: Property;
  dict: SinglePropertyDict;
}) => {
  const { data: session } = useSession();
  const token = session?.user.token as string;

  const handleOnDuplicate = async () => {
    showToast({
      type: "info",
      message: dict[`Please wait, Property being duplicated...`],
      title: dict["duplicating..."],
    });
    try {
      const duplicateResponse = await makeDuplicateProperty(
        token,
        propertyId,
        property.images,
      );
      if (!duplicateResponse.success) {
        showToast({
          type: "error",
          message: duplicateResponse.message,
          title: dict["Error"],
        });
        return;
      }
      showToast({
        message: `${propertyId} successfully duplicated!`,
        type: "success",
        title: dict.Success,
      });
      revalidateByTag("properties");
      hardReload("/dashboard/properties");
    } catch (error) {
      if (error instanceof Error) {
        showToast({
          message: error?.message,
          type: "error",
          title: dict.Error,
        });
      }
    } finally {
      toast.dismiss();
    }
  };

  return (
    <Button variant="tertiary" onClick={handleOnDuplicate}>
      <Image
        src="/svgs/duplicate.svg"
        width={24}
        height={24}
        alt="duplicate"
        className="-ml-0.5 mr-2 h-6 w-6"
      />
      {dict.Duplicate}
    </Button>
  );
};

export default PropertyToDuplicateButton;
