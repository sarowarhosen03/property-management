import { PropertyType } from "@/lib/Propertyschema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import { GalleryActions } from "./GalleryActions";
import { GalleryThumbnails } from "./GalleryThumbnails";

interface PropertyGalleryProps {
  property: PropertyType;
}

export const PropertyGallery: FC<PropertyGalleryProps> = ({ property }) => {
  const { images, title } = property;

  return (
    <div
      className={cn(
        "mt-3 grid min-h-[512px] gap-8 overflow-hidden rounded-3xl",
        { "grid-cols-2": images.length > 1 },
      )}
    >
      <div className="relative flex h-full w-full">
        <div className="relative h-full w-full">
          <div className="relative h-full w-full">
            <Image
              fill
              src={images[0]}
              alt={title?.en as string}
              objectFit="cover"
              className="bg-[#9f9aa6]"
            />
          </div>
          <GalleryActions />
        </div>
      </div>
      {images.length > 1 && <GalleryThumbnails images={images} title={title} />}
    </div>
  );
};
