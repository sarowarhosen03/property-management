import { Button } from "@/components/ui/button";
import { PropertyType } from "@/lib/Propertyschema";
import Image from "next/image";
import { FC } from "react";

type GalleryThumbnailsProps = {
  title: PropertyType["title"];
  images: PropertyType["images"];
};

export const GalleryThumbnails: FC<GalleryThumbnailsProps> = ({
  title,
  images,
}) => {
  return (
    <div className="relative grid grid-cols-2 gap-x-8 gap-y-6">
      {images.map((image: string, index: number) => (
        <div key={index} className="relative overflow-hidden">
          <Image
            width={336}
            height={244}
            src={image}
            alt={title.en}
            quality={100}
            className="bg-[#9f9aa6]"
          />
        </div>
      ))}

      <Button
        className="absolute bottom-6 right-6"
        variant="secondary"
        size="sm"
      >
        See all
      </Button>
    </div>
  );
};
