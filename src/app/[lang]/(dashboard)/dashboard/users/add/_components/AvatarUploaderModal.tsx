"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { CircleStencil, Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

export default function AvatarUploaderModal({
  imageSrc,
  onClose,
  setImageSrc,
}: {
  imageSrc: File[];
  onClose: Function;
  setImageSrc: Function;
}) {

  const { data: session } = useSession();
  const { user } = session || {};

  const cropperRef = useRef<CropperRef>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (imageSrc && imageSrc.length > 0) {
      const blobURL = URL.createObjectURL(imageSrc[0]);
      setImagePreview(blobURL);

      return () => {
        URL.revokeObjectURL(blobURL);
      };
    }
  }, [imageSrc]);

  const handleImageSave = async () => {
    const dataURL = cropperRef.current?.getCanvas()?.toDataURL();

    if (dataURL) {
      const [header, base64] = dataURL.split(",");
      const mimeMatch = header.match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : "image/png";

      // Decode base64 to binary
      const binary = atob(base64);
      const array = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
      }

      // Create a Blob with the correct MIME type
      const blob = new Blob([array], { type: mime });
      const extension = mime.split("/")[1];
      const fileObject = new File(
        [blob],
        `${user?.name.replaceAll(" ", "-").toLowerCase()}.${extension}`,
        { type: mime },
      );

      // Create the new imageSrc format
      const newImageSrc = {
        path: fileObject.name,
        preview: URL.createObjectURL(fileObject), // Create a blob URL for preview
        lastModified: fileObject.lastModified,
        lastModifiedDate: fileObject.lastModifiedDate,
        name: fileObject.name,
        size: fileObject.size,
        type: fileObject.type,
      };

      // Update the imageSrc with the new data
      setImageSrc([newImageSrc]); // Wrap it in an array if imageSrc is an array
      onClose(""); // Close the modal
    }
  };

  // Close modal when clicking outside of it
  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose(""); // Close the modal
      setImageSrc([]);
    }
  };

  return (
    <div>
      {/* Background Blur Overlay */}
      <div
        className="fixed inset-0 z-[99] bg-black/50 bg-opacity-30 backdrop-blur-[5px]"
        onClick={handleClickOutside} // Detect clicks outside modal
      ></div>

      {/* Centered Modal */}
      <Card
        ref={modalRef} // Reference the modal
        className="property__agent fixed left-1/2 top-1/2 z-[9000] mx-auto mt-10 w-full max-w-80 -translate-x-1/2 -translate-y-1/2 transform rounded-3xl bg-white px-4 py-6"
      >
        {/* Close Icon */}
        <div
          className="absolute right-4 top-4 cursor-pointer"
          onClick={() => {
            setImageSrc([]);
            onClose("");
          }} // Close modal on icon click
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="#F72626"
              stroke="#F72626"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15 9L9 15"
              stroke="#FEFFFF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 9L15 15"
              stroke="#FEFFFF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <CardContent className="flex flex-col items-center">
          <div className="relative mb-6 flex w-full items-center justify-center overflow-hidden">
            {imagePreview && (
              <Cropper
                ref={cropperRef}
                stencilSize={{
                  width: 300,
                  height: 300,
                }}
                src={imagePreview} // Use imagePreview state
                className="cropper aspect-square w-full rounded-full"
                stencilComponent={CircleStencil}
              />
            )}
          </div>

          <Button onClick={handleImageSave} className="w-full">
            Save image
          </Button>
          <Button
            onClick={() => {
              setImageSrc([]);
              onClose("");
            }}
            style={{ marginTop: "15px" }}
            variant={"tertiary"}
            className="w-full"
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
