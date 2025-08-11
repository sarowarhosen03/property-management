"use client";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const PropertySlider = ({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) => {
  return (
    <Swiper modules={[Pagination]} pagination>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-[290px] bg-gray-100">
            {image && (
              <Image src={image} fill alt={alt} className="object-cover" />
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PropertySlider;
