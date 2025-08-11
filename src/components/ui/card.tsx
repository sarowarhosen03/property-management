import * as React from "react";

import { langType } from "@/app/[lang]/(main)/page";
import { Properties } from "@/lib/db/type";
import { roomsOptions } from "@/lib/feildData";
import { cn } from "@/lib/utils";
import { formatNumberShort } from "@/utils/formatNumberShort";
import Image from "next/image";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col", className)} {...props} />
));
Card.displayName = "Card";

const CardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  />
));

CardImage.displayName = "CardImage";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";
interface CardLocationProps extends React.HTMLAttributes<HTMLDivElement> {
  location: any;
  dict: Properties;
}

const CardLocation = React.forwardRef<HTMLDivElement, CardLocationProps>(
  ({ className, dict = {}, location, ...props }, ref) => (
    <div ref={ref} {...props} className={cn("flex", className)}>
      <div className="relative mr-2 h-6 w-6 font-medium">
        <Image
          title={dict?.location}
          src="/svgs/location.svg"
          width={24}
          height={24}
          alt="views"
        />
      </div>
      <span className="text-sm font-medium">{location}</span>
    </div>
  ),
);

CardLocation.displayName = "CardLocation";
interface BaseProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface PropertyStatsProps extends BaseProps {
  type: "property";
  bedroom: number | undefined;
  bathroom: string | undefined;
  area: string | undefined;
  totalareas: number | undefined;
  dict: Properties;
}

interface SocialStatsProps extends BaseProps {
  type: "social";
  views: number | undefined;
  shares: number | undefined;
  likes: number | undefined;
  dict: Properties;
  lang: langType;
}
const m = {
  en: "m²",
  hy: "մ²",
  rus: "м²",
};

type CardStatsProps = PropertyStatsProps | SocialStatsProps;

const CardStats = React.forwardRef<HTMLDivElement, CardStatsProps>(
  ({ className, type, lang = "en", dict = {}, ...props }, ref) => {
    const stats =
      type === "property"
        ? [
            {
              title: dict?.bed,
              icon: "/svgs/bed.svg",
              label: "bedrooms",
              value:
                roomsOptions[lang as langType]?.find(
                  (item: any) =>
                    item.value ===
                    (props as PropertyStatsProps).bedroom?.toString(),
                )?.label || "",
            },
            {
              title: dict?.bathroom,

              icon: "/svgs/bathroom.svg",
              label: "bathrooms",
              value: (props as PropertyStatsProps).bathroom,
            },
            {
              title: dict?.area,
              icon: "/svgs/anchor.svg",
              label: "area",
              value: `${(props as PropertyStatsProps)?.totalareas || (props as PropertyStatsProps)?.area} ${m[lang as langType]}`,
            },
          ]
        : [
            {
              title: dict?.views,

              icon: "/svgs/eye.svg",
              label: "views",
              value: formatNumberShort(
                (props as SocialStatsProps).views as number,
              ),
            },
            {
              title: dict?.shares,

              icon: "/svgs/share.svg",
              label: "shares",
              value: formatNumberShort(
                (props as SocialStatsProps).shares as number,
              ),
            },
            {
              title: dict?.likes,

              icon: "/svgs/favorite.svg",
              label: "likes",
              value: formatNumberShort(
                (props as SocialStatsProps).likes as number,
              ),
            },
          ];

    return (
      <div ref={ref} {...props} className={cn("flex gap-4", className)}>
        {stats.map((stat, index) =>
          stat.value ? (
            <div className="flex" key={index}>
              <div className="relative mr-2 h-6 w-6">
                <Image
                  title={stat.title}
                  src={stat.icon}
                  width={24}
                  height={24}
                  alt={stat.label}
                />
              </div>
              <span>{stat.value ?? ""}</span>
            </div>
          ) : null,
        )}
      </div>
    );
  },
);

CardStats.displayName = "CardStats";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-4 lg:pt-6", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardLocation,
  CardStats,
  CardTitle,
};
