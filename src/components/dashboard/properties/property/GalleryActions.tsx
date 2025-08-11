import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FC } from "react";

export const GalleryActions: FC = () => (
  <div className="absolute top-6 left-6 flex gap-2">
    <Button variant="normal" size="sm" className="p-0 w-8 bg-success">
      <Image
        src="/svgs/coins-percent-arrow-up.svg"
        width={24}
        height={24}
        alt="heart"
        className="w-6 h-6"
      />
    </Button>
    <Button
      variant="normal"
      size="sm"
      className="bg-gradient-to-r from-[#AB99C4] to-[#635577] text-white font-semibold"
    >
      New Construction
    </Button>
  </div>
);
