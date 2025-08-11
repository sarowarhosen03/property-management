import { langType } from "@/app/[lang]/(main)/page";
import { DuplicatePropertyBadge } from "@/components/duplicate-property-badge";
import SpecialProducts from "@/components/main/products/SpecialProducts";
import { CardImage } from "@/components/ui/card";
import { SingeProperty } from "@/lib/db/type";
import { roomsOptions } from "@/lib/feildData";
import { Property } from "@/types/fetchDataTypes";
import { formatDateFromISODate } from "@/utils/formatDateFromISODate";
import generateTitie from "@/utils/generateTitie";
import getIp from "@/utils/getIp";
import getTranslatedProvinceDistrict from "@/utils/translatedProvinceDistric";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import SpecialPropertyLoader from "../loader/SpecialPropertyLoader";
import PropertySlider from "../properties/PropertySlider";
import FeatureList from "./_components/FeatureList";
import Likes from "./_components/Likes";
import PropertyDetails from "./_components/PropertyDetails";
import AgentInfo from "./AgentInfo";
import PriceContainer from "./PriceContainer";
import ProductDetailsGallery from "./ProductDetailsGallery";
import Share from "./Share";
import BookingRequestForm from "./SingleBookingRequestForm";
import TotalViews from "./TotalViews";

const RENOVATION_OPTIONS = {
  en: [
    { value: "no renovation", label: "No Renovation" },
    { value: "needs renovation", label: "Needs Renovation" },
    { value: "cosmetic renovation", label: "Cosmetic Renovation" },
    { value: "major renovation", label: "Major Renovation" },
    { value: "designer renovation", label: "Designer Renovation" },
  ],
  hy: [
    { value: "no renovation", label: "Առանց վերանորոգման" },
    { value: "needs renovation", label: "Վերանորոգման կարիք ունի" },
    { value: "cosmetic renovation", label: "Կոսմետիկ վերանորոգում" },
    { value: "major renovation", label: "Կապիտալ վերանորոգում" },
    { value: "designer renovation", label: "Դիզայներական վերանորոգում" },
  ],
  rus: [
    { value: "no renovation", label: "Без ремонта" },
    { value: "needs renovation", label: "Требуется ремонт" },
    { value: "cosmetic renovation", label: "Косметический" },
    { value: "major renovation", label: "Капитальный" },
    { value: "designer renovation", label: "Дизайнерский" },
  ],
};

const HOUSE_TYPES = {
  en: [
    { value: "house", label: "House" },
    { value: "luxury private house", label: "Luxury Private House" },
    { value: "townhouses", label: "Townhouse" },
    { value: "country House", label: "Country House" },
  ],
  hy: [
    { value: "house", label: "Տուն" },
    { value: "luxury private house", label: "Շքեղ առանձնատուն" },
    { value: "townhouses", label: "Թաուն Հաուս" },
    { value: "country House", label: "Ամառանոց" },
  ],
  rus: [
    { value: "house", label: "Дом" },
    { value: "luxury private house", label: "Роскошный частный дом" },
    { value: "townhouses", label: "Таунхаусы" },
    { value: "country House", label: "Загородный дом" },
  ],
};

const SOCIAL_ICONS = {
  facebook: "/svgs/facebook.svg",
  instagram: "/svgs/instagram.svg",
  youtube: "/svgs/youtube.svg",
  linkedin: "/svgs/linkdin.svg",
  twitter: "/svgs/twitter.svg",
};

interface SinglePropertyDetailsProps {
  propertyId: string;
  lang: langType;
  property: Property;
  isFromDashBoard?: boolean;
  singePropertyDict: SingeProperty;
  contactDict?: any;
}

export async function SinglePropertyDetails({
  lang,
  property,
  isFromDashBoard = false,
  singePropertyDict,
  contactDict,
}: SinglePropertyDetailsProps) {
  const {
    title,
    _id,
    updatedAt,
    shares,
    views,
    price,
    location,
    details,
    description,
    renovation,
    images: prevImages,
    type,
    buildingType,
    agentId,
    isDuplicate,
    projectType,
    isContractBased,
    socials,
    category,
  } = property;

  // Prepare property details array
  const propertyDetails = [
    {
      title: singePropertyDict.numberOfBedrooms,
      iconSrc: "/svgs/bed.svg",
      alt: "bed icon",
      value:
        roomsOptions[lang].find(
          (item) => item.value === details?.bedrooms?.toString(),
        )?.label || "",
    },
    {
      title: singePropertyDict.numberOfBathrooms,
      iconSrc: "/svgs/bathroom.svg",
      alt: "bathroom icon",
      value: details?.bathrooms,
    },
    {
      title: singePropertyDict.area,
      iconSrc: "/svgs/anchor.svg",
      alt: "area icon",
      value: details?.totalAreas
        ? `${details?.totalAreas} ${singePropertyDict["m²"]}`
        : undefined,
    },
    {
      title: singePropertyDict.numberOfFloor,
      iconSrc: "/svgs/layer.svg",
      alt: "floor icon",
      value: details.floorNumber
        ? `${details?.floorNumber}/${details?.totalFloors}`
        : details?.totalFloors,
    },
    {
      title: singePropertyDict.renovation,
      iconSrc: "/svgs/paintRoller.svg",
      alt: "renovation icon",
      value: RENOVATION_OPTIONS[lang]?.find(
        (item) => item?.value === renovation,
      )?.label,
    },
    {
      title: singePropertyDict.buildingType,
      iconSrc: "/svgs/brickwall.svg",
      alt: "building type icon",
      value: HOUSE_TYPES[lang]?.find((item) => item?.value === type)?.label,
    },
  ];

  // Translate location
  const { city, state } = getTranslatedProvinceDistrict({
    from: "en",
    to: lang,
    state: location.state,
    city: location.city,
  });

  // Process images
  const images = prevImages?.map((item) =>
    typeof item === "string" ? item : URL.createObjectURL(item),
  );

  const ipPromise = getIp();
  const propertyTitle =
    title[lang as keyof typeof title] ||
    generateTitie({ city: "", type, lang });

  return (
    <>
      {/* Property Header */}
      <PropertyHeader
        lang={lang}
        title={propertyTitle}
        isDuplicate={isDuplicate}
        updatedAt={updatedAt}
        _id={_id}
        singePropertyDict={singePropertyDict}
        agentId={agentId?._id}
        views={views}
        shares={shares}
        property={property}
      />

      {/* Property Gallery */}
      <div className="hidden md:block">
        <ProductDetailsGallery
          propertyImages={images}
          lang={lang}
          buildingType={buildingType}
          projectType={projectType}
          dict={singePropertyDict.seeAll}
          title={title}
        />
      </div>
      <div className="block md:hidden">
        <CardImage className="relative">
          <PropertySlider isSingle={true} property={property} />
        </CardImage>
      </div>

      {/* Property Main Content */}
      <div className="mt-4 grid grid-cols-2 gap-8 lg:mt-6">
        {/* Left Column - Property Info */}
        <div className="col-span-2 flex flex-col md:col-span-1">
          <PriceSection
            isContractBased={isContractBased}
            price={price}
            category={category}
            singePropertyDict={singePropertyDict}
          />

          <LocationSection
            location={location}
            lang={lang}
            state={state as string}
            city={city as string}
            singePropertyDict={singePropertyDict}
          />

          <PropertyDetails propertyDetails={propertyDetails} />

          {description?.[lang] && (
            <DescriptionSection
              description={description}
              lang={lang}
              singePropertyDict={singePropertyDict}
            />
          )}

          {socials && <SocialLinksSection socials={socials} />}

          <FeatureList
            lang={lang}
            details={{
              utilities: details.utilities || [],
              additionalUtilities: details.additionalUtilities || [],
            }}
            type={type}
            dict={singePropertyDict}
          />
        </div>

        {/* Right Column - Agent Info and Booking */}
        <div className="col-span-2 flex flex-col md:col-span-1">
          <div className="relative rounded-[48px] bg-[#62567673] max-lg:-mx-4 lg:mt-5 lg:pb-6">
            {agentId?._id && <AgentInfo agentId={agentId} />}
            <div className="px-4 py-6 md:p-8">
              <Suspense fallback={<h1>loading...</h1>}>
                <BookingRequestForm
                  propertyId={_id}
                  agentId={agentId?._id || "undefined"}
                  dict={contactDict}
                  ipinfo={ipPromise}
                />
              </Suspense>
            </div>
            <div className="property__agent absolute inset-0 -z-1 rounded-[48px]"></div>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      {!isFromDashBoard && (
        <SimilarPropertiesSection
          lang={lang}
          property={property}
          singePropertyDict={singePropertyDict}
        />
      )}
    </>
  );
}

// Extracted Components
function PropertyHeader({
  lang,
  title,
  isDuplicate,
  updatedAt,
  _id,
  singePropertyDict,
  agentId,
  views,
  shares,
  property,
}: {
  lang: langType;
  title: string;
  isDuplicate?: boolean;
  updatedAt: string;
  _id: string;
  singePropertyDict: SingeProperty;
  agentId?: string;
  views?: number;
  shares?: number;
  property: Property;
}) {
  return (
    <div className="mb-2 mt-4 flex flex-col lg:mb-3 lg:mt-11">
      <div className="grid grid-cols-2">
        <h2 className="col-span-2 space-x-2 space-y-2 text-lg font-bold capitalize md:col-span-1 lg:text-xl">
          {title}
          {isDuplicate && (
            <div>
              <DuplicatePropertyBadge />
            </div>
          )}
        </h2>
        <div className="col-span-2 mt-4 flex w-full items-center justify-end gap-4 text-center text-sm md:col-span-1 md:justify-end lg:mt-0 2xl:text-base">
          <div>
            <span className="text-[#625676]">{singePropertyDict.date}</span>{" "}
            {formatDateFromISODate(updatedAt) || ""}
          </div>
          <div>
            <span className="text-[#625676]">ID</span> [{_id}]
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="hidden md:block">
              <div className="flex items-center">
                <div className="2xl:h6 relative mr-1 h-4 w-4 2xl:mr-2 2xl:w-6">
                  <Image
                    title={singePropertyDict.views}
                    src={"/svgs/eye.svg"}
                    width={24}
                    height={24}
                    alt={"views"}
                    className="2xl:h6 h-4 w-4 2xl:w-6"
                  />
                </div>
                <TotalViews
                  agentId={agentId || "undefined"}
                  views={views as number}
                  id={_id}
                />
              </div>
            </div>
            <div className="hidden md:block">
              <Share
                agentId={agentId || "undefined"}
                shareCount={shares as number}
                id={_id}
                title={title}
                description={property.description[lang] || ""}
                dict={singePropertyDict}
              />
            </div>
            <div className="hidden md:block">
              <Likes property={property} dict={singePropertyDict.Favorites} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PriceSection({
  isContractBased,
  price,
  category,
  singePropertyDict,
}: {
  isContractBased?: boolean;
  price: Property["price"];
  category: string;
  singePropertyDict: SingeProperty;
}) {
  return (
    <div className="flex items-center">
      {!isContractBased && (
        <Suspense fallback={<span>Loading...</span>}>
          <PriceContainer price={price} currency={price.currency} />
        </Suspense>
      )}
      {["rent", "daily rent"].includes(category) && (
        <span className="ml-1.5 text-sm font-semibold text-foreground">
          {category === "rent"
            ? singePropertyDict.perMonth
            : singePropertyDict.perDay}
        </span>
      )}
    </div>
  );
}

function LocationSection({
  location,
  lang,
  state,
  city,
  singePropertyDict,
}: {
  location: Property["location"];
  lang: langType;
  state: string;
  city: string;
  singePropertyDict: SingeProperty;
}) {
  return (
    (location?.state || location?.city) && (
      <div className="mt-0 flex">
        <Link
          href={`https://yandex.com/maps/?from=api-maps&origin=jsapi_2_1_79&rtext=${encodeURIComponent(
            `~${location.longitude},${location.latitude}`,
          )}&ll=${`${location.latitude},${location.longitude}`}&z=12`}
          target="_blank"
          className="relative mr-2 h-6 w-6"
        >
          <Image
            title={singePropertyDict.location}
            src="/svgs/location.svg"
            width={24}
            height={24}
            alt="location"
          />
        </Link>
        <span className="text-sm font-medium">
          {` ${location?.address?.[lang as keyof typeof location.address] || ``},${state} , ${city}`}
        </span>
      </div>
    )
  );
}

function DescriptionSection({
  description,
  lang,
  singePropertyDict,
}: {
  description: Property["description"];
  lang: langType;
  singePropertyDict: SingeProperty;
}) {
  return (
    <div className="mt-6 lg:mt-8">
      <h6 className="text-lg font-semibold 2xl:text-xl">
        {singePropertyDict.description}
      </h6>
      <div className="mt-2 text-sm font-medium 2xl:text-base">
        <p>{description[lang] || description["en"]}</p>
      </div>
    </div>
  );
}

function SocialLinksSection({ socials }: { socials: Property["socials"] }) {
  return (
    <div className="mt-6 flex gap-2">
      <h6 className="font-semibold">Socials:</h6>
      <ul className="flex gap-2">
        {Object.entries(socials)
          .filter(([, value]) => value)
          .map(([key, value]) => (
            <li key={key}>
              <Link href={value as URL} target="_blank">
                <Image
                  src={SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS]}
                  alt={key}
                  width={20}
                  height={20}
                  className="ml-2"
                />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

function SimilarPropertiesSection({
  lang,
  property,
  singePropertyDict,
}: {
  lang: langType;
  property: Property;
  singePropertyDict: SingeProperty;
}) {
  return (
    <div className="mb-20">
      <div className="py-4">
        <h2 className="mb-10 text-2xl font-bold">
          {singePropertyDict.specialProperty}
        </h2>
        <Suspense fallback={<SpecialPropertyLoader />}>
          <SpecialProducts
            lang={lang}
            location={property.location.city}
            price={property.price.amount}
            category={property.category}
            type={property.type}
            id={property._id}
            singePropertyDict={singePropertyDict}
          />
        </Suspense>
      </div>
    </div>
  );
}
