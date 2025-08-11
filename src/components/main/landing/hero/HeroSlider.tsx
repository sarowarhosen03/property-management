"use client";
import Image from "next/image";
import swiperCore from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import HeroSliderNavigation from "./HeroSliderNavigation";
import slideImage1 from "/public/assets/images/slider-1.png";
import slideImage2 from "/public/assets/images/slider-3.jpg";

const sliderImages = [slideImage1, slideImage2];

const HeroSlider = () => {
  swiperCore.use([Autoplay]);
  return (
    <Swiper
      loop={true}
      speed={400}
      allowTouchMove
      autoplay={{
        delay: 5000,
      }}
      modules={[Pagination]}
      pagination
      className="group relative h-full w-full overflow-hidden"
    >
      {sliderImages.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="hero__image">
            {image && (
              <Image
                src={image}
                height={1522}
                width={712}
                alt="safe house"
                className="h-full w-full object-cover"
                quality={100}
                placeholder="blur"
                priority
              />
            )}
          </div>
        </SwiperSlide>
      ))}
      <HeroSliderNavigation />
    </Swiper>
  );
};

export default HeroSlider;
