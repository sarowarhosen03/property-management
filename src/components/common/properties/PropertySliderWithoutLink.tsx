"use client";
import { langType } from "@/app/[lang]/(main)/page";
import { projectType } from "@/components/dashboard/forms/_components/HouseForm";
import { Button } from "@/components/ui/button";
import useFavarioute from "@/hooks/useFavarioute";
import { increaseLike } from "@/lib/propertyAnalitics";
import Heart from "@/svgs/heart.svg";
import { Property } from "@/types/fetchDataTypes";
import {
  addToFavorite,
  isFavorite,
  removeFavorite,
} from "@/utils/locals/favorites";
import { uniqueId } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import LightBox from "../lightbox/LightBox";
import { showToast } from "../toaster/toaster";
import PropertySlider from "./PropertySlider";

type Size = "sm" | "lg";
type RoundType = Record<Size, string>;

type PropertySliderProps = {
  property: Property;
  isSingle?: boolean;
  rounded?: Size;
  height?: Size;
  linkPrefix?: string;
  isHideHeartIcon?: boolean;
};

export const PropertySliderWithoutLink = ({
  property,
  isSingle = false,
  rounded = "lg",
  height = "lg",
  linkPrefix = "",
  isHideHeartIcon = false,
}: PropertySliderProps) => {
  const [isFav, setIsFav] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [_fav, setFav] = useFavarioute();
  const [open, setOpen] = useState(false);
  // const { push } = useRouter();
  const { _id, images, title } = property || {};

  const ROUND: RoundType = {
    sm: "12px",
    lg: "32px",
  };

  const HEIGHT: RoundType = {
    sm: "272px",
    lg: "290px",
  };

  function handleToggleLike(fav: boolean) {
    if (!fav) {
      const isLiked = addToFavorite(property);
      if (isLiked) {
        setIsFav(true);
        showToast({
          message: `Favorite added successfully`,
          type: "success",
          title: "Success",
        });
      }
      return;
    }

    const isRemoved = removeFavorite(_id);
    if (isRemoved) {
      setIsFav(false);
      showToast({
        message: `Favorite removed successfully`,
        type: "warning",
        title: "Success",
      });
    }
  }
  const {
    lang,
  }: {
    lang: langType;
  } = useParams();
  useEffect(() => {
    setIsFav(isFavorite(_id));
  }, [_id]);

  const link = linkPrefix
    ? `${linkPrefix}/properties/${_id}`
    : `/properties/${_id}`;

  return (
    <>
      {isSingle && (
        <LightBox
          images={images.map((src) => ({ src: src }))}
          open={open && isSingle}
          onController={setOpen}
          index={imageIndex}
        />
      )}
      <Swiper
        mousewheel={true}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        keyboard={{
          enabled: true,
        }}
        modules={[Mousewheel, Pagination, Navigation, Keyboard]}
        className={`card-slider size-full rounded-[${ROUND[rounded]}] overflow-hidden`}
      >
        {images
          .slice(0, 5)
          .map((itm) => ({ img: itm, id: uniqueId() }))
          .map((image, i) => (
            <SwiperSlide
              key={image.id}
              className={`overflow-hidden rounded-[${ROUND[rounded]}] overflow-hidden`}
            >
              <div className="group relative flex size-full">
                <Image
                  src={image.img}
                  height={294}
                  width={288}
                  // fill
                  onClick={() => {
                    setOpen(true);
                    setImageIndex(i);
                  }}
                  className={`mx-auto h-[${HEIGHT[height]}] w-full bg-[#9f9aa6] object-cover rounded-[${ROUND[rounded]}] ${!isSingle && "cursor-pointer"}`}
                  alt={title.en}
                  quality={90}
                />

                {!isSingle && !isHideHeartIcon && (
                  <Heart
                    onClick={async () => {
                      handleToggleLike(isFav);
                      await increaseLike(_id, isFav, property.agentId._id);

                      if (!isFav) {
                        setFav((prev) => [...prev, property]);
                      } else {
                        setFav((prev) =>
                          prev.filter((p) => p._id !== property._id),
                        );
                      }
                    }}
                    className={`absolute right-10 top-4 z-1 cursor-pointer stroke-secondary tab:right-11 md:right-4 ${isFav ? "fill-secondary stroke-white text-secondary" : "fill-white stroke-secondary"} text-xl`}
                  />
                )}

                <div className="absolute left-6 top-6 flex flex-wrap gap-2">
                  {property.projectType?.includes("investment") && (
                    <Button
                      variant={"normal"}
                      size={"sm"}
                      className="w-8 bg-success p-0"
                    >
                      <Link href={`/investment`}>
                        <Image
                          src={"/svgs/coins-percent-arrow-up.svg"}
                          width={24}
                          height={24}
                          alt="heart"
                          className="h-6 w-6"
                        />
                      </Link>
                    </Button>
                  )}

                  {property.projectType
                    .filter((project) => project !== "investment")
                    .map((item) => (
                      <Button
                        key={item}
                        variant={"normal"}
                        size={"sm"}
                        className="bg-gradient-to-r from-[#AB99C4] to-[#635577] font-semibold capitalize text-white"
                      >
                        {projectType[lang].find((i) => i.value === item)?.label}
                      </Button>
                    ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default PropertySlider;
