import SwiperPrev from "@/svgs/left-circle.svg";
import SwiperRight from "@/svgs/right-circle.svg";
import { useSwiper } from "swiper/react";

const HeroSliderNavigation = () => {
  const swiper = useSwiper();

  return (
    <>
      <button
        className="absolute left-0 top-1/2 z-[50] -mt-6 h-12 w-12 cursor-pointer opacity-0 transition-all duration-300 group-hover:left-3 group-hover:opacity-100 lg:group-hover:left-[7%]"
        onClick={() => swiper.slidePrev()}
      >
        <SwiperPrev />
      </button>

      <button
        className="absolute right-0 top-1/2 z-[50] -mt-6 h-12 w-12 cursor-pointer opacity-0 transition-all duration-300 group-hover:right-3 group-hover:opacity-100 lg:group-hover:right-[7%]"
        onClick={() => swiper.slideNext()}
      >
        <SwiperRight />
      </button>
    </>
  );
};

export default HeroSliderNavigation;
