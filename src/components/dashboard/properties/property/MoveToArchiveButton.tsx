"use client";
import { showToast } from "@/components/common/toaster/toaster";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/config/site";
import { SinglePropertyDict } from "@/lib/db/type";
import { PropertyType } from "@/lib/Propertyschema";
import { revalidateByTag } from "@/lib/revalidateCache";
import { ApiResponse } from "@/types";
import { Property } from "@/types/fetchDataTypes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

async function movePropertyToArchiveUnarchive(
  token: string,
  propertyId: string,
  status,
): Promise<ApiResponse<PropertyType>> {
  const response = await fetch(`${API_URL}/properties/${propertyId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    next: {
      tags: ["properties"],
    },
    body: JSON.stringify({
      status: status ? "archive" : "published",
    }),
  });
  return await response.json();
}

const MoveToArchiveButton = ({
  propertyId,
  property,
  dict,
}: {
  propertyId: string;
  property: Property;
  dict: SinglePropertyDict;
}) => {
  const [isArchive, seIsArchive] = useState(property?.status === "archive");

  const router = useRouter();
  const session = useSession();
  const token = session.data?.user.token as string;

  const handleMoveToArchive = async () => {
    showToast({
      type: "info",
      message: dict["Please wait, Property moving to archive..."],
      title: dict["moving to archive..."],
    });
    try {
      const isMovedArchived = await movePropertyToArchiveUnarchive(
        token,
        propertyId,
        true,
      );
      if (!isMovedArchived.success) {
        showToast({
          message: isMovedArchived.message,
          type: "error",
          title: dict.Error,
        });
        return;
      }
      seIsArchive(true);
      showToast({
        message: `${propertyId} successfully moved to archive!`,
        type: "success",
        title: dict.Success,
      });
      revalidateByTag("properties");
      revalidateByTag(propertyId);
      router.refresh();
      router.push("/dashboard/properties");
    } catch (error) {
      if (error instanceof Error) {
        showToast({
          message: error?.message,
          type: "error",
          title: dict.Error,
        });
      }
    }
    toast.dismiss();
  };
  const handleMoveToUnarchive = async () => {
    showToast({
      type: "info",
      message: dict[`Please wait, Property moving to unarchive...`],
      title: dict["moving to unarchive..."],
    });
    try {
      const isMovedUnarchived = await movePropertyToArchiveUnarchive(
        token,
        propertyId,
        false,
      );
      if (!isMovedUnarchived.success) {
        showToast({
          message: isMovedUnarchived.message,
          type: "error",
          title: dict.Error,
        });
        return;
      }
      seIsArchive(false);
      showToast({
        message: `${propertyId} sucssfully moved to unarchive!`,
        type: "success",
        title: dict.Success,
      });
      revalidateByTag("properties");
      revalidateByTag(propertyId);
      router.refresh();
      router.push("/dashboard/properties");
    } catch (error) {
      if (error instanceof Error) {
        showToast({
          message: error?.message,
          type: "error",
          title: dict.Error,
        });
      }
    }
    toast.dismiss();
  };

  return (
    <Button
      variant="tertiary"
      onClick={isArchive ? handleMoveToUnarchive : handleMoveToArchive}
    >
      <Image
        src="/svgs/mailbox.svg"
        width={24}
        height={24}
        alt="archive"
        className="-ml-0.5 mr-2 h-6 w-6"
      />
      {dict["Move to"]} {isArchive ? dict.Unarchive : dict.archive}
    </Button>
  );
};

export default MoveToArchiveButton;
