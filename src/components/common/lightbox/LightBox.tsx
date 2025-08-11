"use client";
import NextButton from "@/svgs/next.svg";
import PrevButton from "@/svgs/previous.svg";
import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import "./lightBox-style.css";

type lightboxTypes = {
  onController: Function;
  images: Array<{ src: string; id?: string }>;
  index?: number;
  open: boolean;
};
interface KeyboardEvent {
  key: string;
}
export default function LightBox({
  onController,
  images,
  index = 0,
  open,
}: lightboxTypes) {
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    setImageIndex(index);
  }, [index]);
  const imageList = images
    .map((imgItem) => ({
      ...imgItem,
      id: uuid(),
    }))
    .filter((_item, i) => i !== index);
  imageList.unshift({ ...images[index], id: uuid() });
  const overlay = useRef<HTMLDivElement | null>(null);
  const scrolDash = useRef<HTMLDivElement | null>(null);

  const showNextImage = useCallback(() => {
    setImageIndex((index) => {
      if (index === images.length - 1) return 0;
      return index + 1;
    });
  }, [images.length]);

  const showPrevImage = useCallback(() => {
    setImageIndex((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  }, [images.length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        showNextImage();
      } else if (e.key === "ArrowLeft") {
        showPrevImage();
      } else if (e.key === "Escape") {
        onController(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = open ? "hidden" : "unset"; // Prevent background scrolling
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "unset"; // Re-enable background scrolling
    };
  }, [onController, showNextImage, showPrevImage, open]);

  useEffect(() => {
    let ignore = false;
    if (ignore) {
      onController(false);
    }
    return () => {
      ignore = true;
    };
  }, [onController]);

  return (
    <div
      ref={overlay}
      onClick={() => onController(false)}
      id="default-modal"
      tabIndex={-1}
      className={`fixed inset-0 z-50 flex items-center bg-[#423B4E99] bg-opacity-50 px-5 backdrop-blur-sm transition-all duration-500 ease-in-out ${open ? "opacity-1 visible" : "invisible opacity-0"}`}
    >
      <X className="absolute right-5 top-5 z-50 size-8 cursor-pointer text-white" />
      <section
        aria-label="Image Slider"
        style={{ width: "100%", height: "100%", position: "relative" }}
        className="flex items-center justify-center md:pt-4 lg:items-start lg:px-8 lg:pb-4 lg:pt-[7.4rem] "
      >
        <a href="#after-image-slider-controls" className="skip-link">
          Skip Image Slider Controls
        </a>
        <div
          style={{
            display: "flex",
            overflow: "hidden",
            minHeight: "450px",
          }}
          className="relative scroll-smooth transition duration-150 ease-in-out md:size-[90%] lg:size-[98%]"
        >
          <div className="absolute right-6 top-6 z-40 flex h-8 w-14 justify-center rounded-full bg-secondary text-center text-sm font-bold text-white">
            <p className="my-auto">{`${imageIndex + 1} / ${images.length}`}</p>
          </div>
          {images.map(({ src }, index) => (
            <Image
              onClick={(e) => e.stopPropagation()}
              draggable={false}
              key={index}
              src={src}
              height={700}
              width={1000}
              quality={100}
              alt={"image preview"}
              aria-hidden={imageIndex !== index}
              className="img-slider-img rounded-md !object-contain"
              style={{
                translate: `${-100 * imageIndex}%`,
              }}
            />
          ))}
        </div>

        {imageIndex + 1 > 1 && (
          <PrevButton
            onClick={(e) => {
              showPrevImage();
              e.stopPropagation();
            }}
            className="absolute left-0 top-1/2 z-[50] me-4 -translate-y-1/2 transform cursor-pointer"
            aria-label="View Previous Image"
          />
        )}
        {imageIndex + 1 < images.length && (
          <NextButton
            onClick={(e) => {
              showNextImage();
              e.stopPropagation();
            }}
            className="absolute -right-2 top-1/2 z-[50] -translate-y-1/2 transform cursor-pointer"
            aria-label="View Previous Image"
          />
        )}
        <div
          style={{
            position: "absolute",
            bottom: ".5rem",
            left: "50%",
            translate: "-50%",
            display: "flex",
            gap: ".25rem",
          }}
          ref={scrolDash}
          onClick={(e) => e.stopPropagation()}
        >
          {/* {images.map((_, index) => (
            <button
              key={index}
              className="img-slider-dot-btn"
              aria-label={`View Image ${index + 1}`}
              onClick={() => setImageIndex(index)}
            >
              {index === imageIndex ? (
                <CircleDot
                  aria-hidden
                  className="scale-150 fill-primary-600 stroke-primary"
                />
              ) : (
                <Circle aria-hidden className="scale-90 stroke-primary" />
              )}
            </button>
          ))} */}
        </div>
        <div id="after-image-slider-controls" />
      </section>
    </div>
  );
}
