"use client";
import { Loader } from "@/components/common/Loader";
import { showToast } from "@/components/common/toaster/toaster";
import { Button } from "@/components/ui/button";
import { SinglePropertyDict } from "@/lib/db/type";
import { propertyToPost } from "@/utils/fetchData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const PropertyPostButton = ({
  propertyId,
  dict,
}: {
  propertyId: string;
  dict: SinglePropertyDict;
}) => {
  const router = useRouter();
  const session = useSession();
  const token = session.data?.user.token as string;
  const [isLoading, setLoading] = useState(false);

  const handleOnPostProperty = async () => {
    setLoading(true);
    showToast({
      type: "info",
      message: dict[`Please wait, Property being to published...`],
      title: dict["Publishing..."],
    });
    try {
      const isPosted = await propertyToPost(token, propertyId);
      if (!isPosted.success) {
        showToast({
          message: isPosted.message,
          type: "error",
          title: dict.Error,
        });
        return;
      }
      showToast({
        message: `${propertyId} ${dict["Post has been successfully published"]}`,
        type: "success",
        title: dict.Success,
      });
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
    setLoading(false);
    toast.dismiss();
  };

  return (
    <Button
      className="flex gap-2"
      variant="primary"
      onClick={handleOnPostProperty}
      disabled={isLoading}
    >
      {dict["Post an Ad?"]} {isLoading && <Loader />}
    </Button>
  );
};

export default PropertyPostButton;
