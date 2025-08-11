import Image from "next/image";

interface PropertyItem {
  value?: string | number;
  title: string;
  iconSrc: string;
  alt: string;
}

export default function PropertyDetails({
  propertyDetails,
}: {
  propertyDetails: PropertyItem[];
}) {
  return (
    <ul className="mt-6 grid w-fit grid-cols-2 flex-wrap gap-3 gap-y-3 md:w-full md:gap-4 lg:mt-2 lg:flex lg:gap-x-10">
      {propertyDetails
        .filter((item) => item?.value)
        .map((item) => (
          <li
            key={item.alt}
            className="flex gap-2 text-start xl:whitespace-nowrap"
          >
            <Image
              title={item.title}
              className="h-6 w-6 shrink-0"
              src={item.iconSrc}
              height={24}
              width={24}
              alt={item.alt}
              loading="lazy"
              aria-hidden="true"
            />
            <span className="font-semibold">{item.value}</span>
          </li>
        ))}
    </ul>
  );
}
