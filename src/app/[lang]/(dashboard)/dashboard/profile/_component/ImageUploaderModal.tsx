"use client";
import { showToast } from "@/components/common/toaster/toaster";
import { assetsUploadsWithoutWatermark } from "@/components/dashboard/forms/_utils/assetsUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Profile } from "@/lib/db/type";
import { updateAndCreateAvatarMutation } from "@/utils/mutations";
import { Function } from "lodash";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { CircleStencil, Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { toast } from "sonner";

export default function ImageUploaderModal({
  imageSrc,
  onClose,
  profileDict,
}: {
  imageSrc: string;
  onClose: Function;
  profileDict: Profile;
}) {
  const { data: session, update } = useSession();
  const { user } = session || {};
  // const [zoomValue, setZoomValue] = useState(0); // Initial zoom value
  // const [isFirstIncrement, setIsFirstIncrement] = useState(true); // Track first increment
  const cropperRef = useRef<CropperRef>(null);
  const [isLoading, setIsLoading] = useState(false);

  // আমরা এটা সময় পেলেই সমাধান করবো।
  // const handleZoomValueChange = (value) => {
  //   const zoom = value[0];
  //   if (cropperRef.current?.zoomImage) {
  //     cropperRef.current.zoomImage(zoom / 8); // Adjust zoom factor as needed
  //   }
  //   setZoomValue(zoom);
  // };

  // const handleIncrement = () => {
  //   setZoomValue((prev) => {
  //     let newZoomValue;
  //     if (isFirstIncrement) {
  //       newZoomValue = Math.min(prev + 0.8, 10); // First increment step of 0.8
  //       setIsFirstIncrement(false);
  //     } else {
  //       newZoomValue = Math.min(prev + 0.3, 10); // Subsequent increments step of 0.3
  //     }
  //     handleZoomValueChange([newZoomValue]);
  //     return newZoomValue;
  //   });
  // };

  // const handleDecrement = () => {
  //   setZoomValue((prev) => {
  //     const newZoomValue = Math.max(prev - 0.3, 0); // Decrement step of 0.3
  //     handleZoomValueChange([newZoomValue]);
  //     return newZoomValue;
  //   });
  // };

  const handleImageSave = async () => {
    showToast({
      type: "info",
      message: profileDict.profileImageUploading,
      title: profileDict.uploading,
    });
    setIsLoading(true);
    const dataURL = cropperRef.current?.getCanvas()?.toDataURL();
    if (dataURL) {
      const [header, base64] = dataURL.split(",");
      const mimeMatch = header.match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : "image/png"; // Default to 'image/png' if MIME is not found

      // Decode base64 to binary
      const binary = atob(base64);
      const array = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
      }

      // Create a Blob with the correct MIME type
      const blob = new Blob([array], { type: mime });
      const extension = mime.split("/")[1]; // Get file extension from MIME type

      // Create a File object with a proper name and extension
      const fileObject = new File(
        [blob],
        `${user?.name.replaceAll(" ", "-").toLowerCase()}.${extension}`,
        {
          type: mime,
        },
      );

      try {
        const imageurl: string[] = await assetsUploadsWithoutWatermark([
          fileObject,
        ]);

        if (imageurl?.length) {
          await updateAndCreateAvatarMutation({
            avatar: imageurl[0],
          });

          update({ avatar: imageurl[0] });
          onClose("");
        }
        showToast({
          type: "success",
          message: profileDict.profileUpdateSuccess,
          title: profileDict.success,
        });
      } catch (err) {
        showToast({
          type: "error",
          message: profileDict.thereWasAnErrorUpdatingYourProfile,
          title: profileDict.error,
        });
      }
    }
    toast.dismiss();
    setIsLoading(false);
  };

  return (
    <div>
      <Card className="property__agent absolute left-[50%] top-0 mx-auto mt-10 w-full max-w-[344px] rounded-xl bg-white px-4 py-6">
        <CardContent className="flex flex-col items-center p-0">
          <div className="relative mb-6 flex w-full items-center justify-center overflow-hidden">
            <Cropper
              ref={cropperRef}
              stencilSize={{
                width: 300,
                height: 300,
              }}
              src={imageSrc}
              className="cropper aspect-square w-full rounded-full"
              stencilComponent={CircleStencil}
            />
          </div>
          {/* Slider Tracking Problem */}
          {/* <div className="flex w-full items-center space-x-1">
          <Button
            variant="ghost"
            size={"sm"}
            className="text-xl"
            onClick={handleDecrement}
          >
            -
          </Button>
          <Slider
            value={[zoomValue]}
            onValueChange={handleZoomValueChange}
            step={0.1} // Adjust step for smooth slider movement
            min={0}
            max={10}
            className="w-full"
          />
          <Button
            variant="ghost"
            size={"sm"}
            className="text-xl"
            onClick={handleIncrement}
          >
            +
          </Button>
        </div> */}
          <Button
            onClick={!isLoading && handleImageSave}
            disabled={isLoading}
            className="mb-3 h-[44px] w-full"
          >
            {profileDict.saveImage}
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => onClose("")}
            variant={"tertiary"}
            className="h-[44px] w-full"
          >
            {profileDict.cancel}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
