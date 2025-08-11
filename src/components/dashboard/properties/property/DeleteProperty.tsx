"use client";
import { showToast } from "@/components/common/toaster/toaster";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import useFavarioute from "@/hooks/useFavarioute";
import { SinglePropertyDict } from "@/lib/db/type";
import { revalidateByTag } from "@/lib/revalidateCache";
import { Property } from "@/types/fetchDataTypes";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deleteProperty } from "./actions";

export default function DeleteProperty({
  property,
  dict,
}: {
  dict: SinglePropertyDict;
  property: Property;
}) {
  const [_fav, setFav] = useFavarioute();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  async function handleDelete() {
    try {
      showToast({
        type: "info",
        message: dict[`Deleting property....`],
        title: dict["Deleting...."],
      });
      const res = await deleteProperty(property._id, property.images);
      if (res.success) {
        setFav((prev) => prev.filter((p) => p._id !== property._id));
        showToast({
          type: "success",
          message: dict[`Deleted property`],
          title: dict["Delete"],
        });
        revalidateByTag(property._id);
        revalidateByTag("properties");
        router.replace("/dashboard/properties");
      } else {
        showToast({
          message: dict[`something went wrong while deleting property`],
          type: "error",
          title: dict["Error"],
        });
      }
    } catch (error) {
      showToast({
        message: dict["Failed to delete property"],
        type: "error",
        title: dict["Error"],
      });
    }
    setIsOpen(false);
    toast.dismiss();
  }
  return (
    <>
      <Button
        className="flex space-x-2 space-y-1 hover:bg-red-600 hover:text-white"
        variant="tertiary"
        onClick={() => setIsOpen(true)}
      >
        <Trash2 className="mx-2" />
        {dict["Delete"]}
        <span></span> {/* Move to {isArchive ? "Unarchive" : "archive"} */}
      </Button>
      <Modal
        className={{
          title: "text-white",
          description: "text-white",
        }}
        isOpen={isOpen}
        title={dict["Delete"]}
        description={
          dict[
            "Are you sure you want to delete? This Action can only be undone"
          ]
        }
        onClose={() => setIsOpen(false)}
      >
        <div className="flex w-full justify-between">
          <Button
            onClick={async () => await handleDelete()}
            className="bg-red-500 text-white"
          >
            {dict["Yes"]}
          </Button>
          <Button
            className="bg-white text-black"
            onClick={() => setIsOpen(false)}
          >
            {dict["No"]}
          </Button>
        </div>
      </Modal>
    </>
  );
}
