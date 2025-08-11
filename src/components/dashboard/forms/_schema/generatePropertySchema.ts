import { langType } from "@/app/[lang]/(main)/page";
import { PropertyForm } from "@/lib/db/type";
import { CategoryType, ChooseType } from "@/types";
import { providenceDistricList } from "@/utils/Areas";
import { z } from "zod";

const customRegex = /^([1-9]|[1-9][0-9])\/([1-9]|[0-9]{1,3}[0-9])$/;
const allProvidenceList = Object.keys(providenceDistricList).reduce(
  (prev, curr) => {
    return [
      ...prev,
      ...Object.keys(
        providenceDistricList[curr as keyof typeof providenceDistricList],
      ),
    ];
  },
  [""],
);
export const allDistricts = Object.keys(providenceDistricList).reduce(
  (acc: string[], langKey) => {
    const languageData =
      providenceDistricList[langKey as keyof typeof providenceDistricList];
    Object.keys(languageData).forEach((province) => {
      const districts = languageData[province as keyof typeof languageData];
      acc = acc.concat(districts as readonly string[]);
    });
    return acc;
  },
  [],
);
const IdType = z.string().optional();
const priceType = (dict: PropertyForm, isContractBased: boolean) =>
  z.object({
    amount: z
      .union([
        z.string().refine(
          (value) => {
            if (isContractBased) {
              return true;
            }
            const priceAmount = parseFloat(value?.replace(/,/g, ""));
            return priceAmount >= 0 && Number?.isInteger(priceAmount); // Allow 0 without error
          },
          {
            message: dict["price.required"],
          },
        ),
        z.number().min(0, {
          // Allow 0 for number type as well
          message: dict["price.required"],
        }),
      ])
      .optional(),
    currency: z
      .string()
      .min(1, {
        message: dict["price.required"],
      })
      .refine((value) => {
        if (isContractBased) return true; // Skip validation if isContractBased
        return value.length > 0;
      }),
  });

const FloorType = (dict: PropertyForm) =>
  z.union([
    z
      .string()
      .min(1, { message: dict["Enter type 3/16X format"] })
      .refine(
        (value) => {
          const match = value.match(customRegex);
          if (!match) return false;
          const [first, second] = value.split("/").map(Number);
          return first <= second;
        },
        {
          message: dict["Enter type 3/16X format"],
        },
      ),
    z.number().int().nonnegative(),
  ]);

const invalidInput = {
  en: "Select",
  hy: "Ընտրել",
  rus: "Выбирать:",
};
const locationSchema = (dict: PropertyForm, lang: langType) => {
  return z.object({
    street: z.string().optional(),
    state: z
      .string({ message: invalidInput[lang] })
      .refine((value) => allProvidenceList.includes(value), {
        message: invalidInput[lang],
      }),
    city: z
      .string({ message: invalidInput[lang] })
      .refine((value) => allDistricts.includes(value), {
        message: invalidInput[lang],
      }),
    tState: z.object({
      en: z.string().optional().default(""),
      hy: z.string().optional().default(""),
      rus: z.string().optional().default(""),
    }),
    tCity: z.object({
      en: z.string().optional().default(""),
      hy: z.string().optional().default(""),
      rus: z.string().optional().default(""),
    }),

    address: z.object({
      en: z.string().optional().default(""),
      hy: z.string().optional().default(""),
      rus: z.string().optional().default(""),
    }),
    zipCode: z.string().nullable().optional().default(null),
    country: z.string().optional(),
    latitude: z.union([z.number().default(0), z.string().default("")]),
    longitude: z.union([z.number().default(0), z.string().default("")]),
  });
};

const TitleType = () =>
  z.object({
    en: z.string().optional().default(""),
    hy: z.string().optional().default(""),
    rus: z.string().optional().default(""),
    // en: z.string().min(1, { message: dict["title.enRequired"] }),
    // hy: z.string().min(1, { message: dict["title.hyRequired"] }),
    // rus: z.string().min(1, { message: dict["title.rusRequired"] }),
  });

const DescriptionType = () =>
  z.object({
    en: z.string().optional().default(""),
    hy: z.string().optional().default(""),
    rus: z.string().optional().default(""),
  });

const socialsSchema = z.object({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  youtube: z.string().optional(),
});

const generatePropertySchema = (
  type: ChooseType,
  category: CategoryType,
  lang: langType,
  dict: PropertyForm,
  isContractBased: boolean,
) => {
  const title = TitleType();
  const description = DescriptionType();
  const price = priceType(dict, isContractBased);
  const floor = FloorType(dict);
  const location = locationSchema(dict, lang);

  if (type === "house" && category === "buy")
    return z.object({
      title,
      description,
      price,
      details: z.object({
        bedrooms: z.union([
          z.string().min(1, dict["details.bedroomRequired"]),
          z.number().min(0, dict["details.bedroomRequired"]),
        ]),
        bathrooms: z.union([
          z.string().min(1, dict["details.bathroomRequired"]),
          z.number().min(1, dict["details.bathroomRequired"]),
        ]),
        area: z.union([
          z.string().min(1, dict["details.areaRequired"]),
          z.number().min(1, dict["details.areaRequired"]),
        ]),
        totalAreas: z.union([
          z.string().min(1, dict["details.totalAreasRequired"]),
          z.number().min(1, dict["details.totalAreasRequired"]),
        ]),
        // floor: FloorType,
        floorNumber: z.union([z.string().optional(), z.number().optional()]),
        totalFloors: z.union([z.string().optional(), z.number().optional()]),
        utilities: z.array(z.string().min(1, dict["details.utilityRequired"])),
        additionalUtilities: z.array(z.string().optional()),
      }),
      location,
      images: z.array(z.any()).min(1, dict["images.required"]),
      likes: z.number().int().default(0),
      shares: z.number().int().default(0),
      views: z.number().int().default(0),
      projectType: z.array(z.string()).optional(),
      houseType: z.string().min(1, dict["houseType.required"]),
      buildingType: z.string().min(1, dict["buildingType.required"]),
      renovation: z.string().min(1, dict["renovation.required"]),
      isContractBased: z.boolean().default(false).optional(),
      status: z
        .enum(["published", "draft", "archive", "preview"])
        .default("draft"),
      _id: IdType,
      isBestOffers: z.boolean().optional(),
      socials: socialsSchema.optional(),
    });
  if (type === "house" && category === "rent") {
    return z.object({
      title,
      description,
      price,
      isContractBased: z.boolean().default(false).optional(),
      details: z.object({
        bedrooms: z.union([
          z.string().min(1, dict["details.bedroomRequired"]),
          z.number().min(0, dict["details.bedroomRequired"]),
        ]),
        bathrooms: z.union([
          z.string().min(1, dict["details.bathroomRequired"]),
          z.number().min(1, dict["details.bathroomRequired"]),
        ]),
        area: z.union([
          z.string().min(1, dict["details.areaRequired"]),
          z.number().min(1, dict["details.areaRequired"]),
        ]),
        totalAreas: z.union([
          z.string().min(1, dict["details.totalAreasRequired"]),
          z.number().min(1, dict["details.totalAreasRequired"]),
        ]),
        utilities: z.array(z.string().min(1, dict["details.utilityRequired"])),
        additionalUtilities: z.array(z.string().optional()),
      }),
      location,
      images: z.array(z.any()).min(1, dict["images.required"]),
      likes: z.number().int().default(0),
      shares: z.number().int().default(0),
      views: z.number().int().default(0),
      houseType: z.string().min(1, dict.houseType),
      projectType: z.array(z.string()).optional(),
      buildingType: z.string().min(1, dict["buildingType.required"]),
      renovation: z.string().min(1, dict["renovation.required"]),
      furniture: z.string().min(1, dict["Furniture type is required"]),
      status: z
        .enum(["published", "draft", "archive", "preview"])
        .default("draft"),
      _id: IdType,
      isBestOffers: z.boolean().optional(),
      socials: socialsSchema.optional(),
    });
  }
  if (type === "house" && category === "daily rent") {
    return z.object({
      title,
      description,
      isContractBased: z.boolean().default(false).optional(),
      price,
      details: z.object({
        bedrooms: z.union([
          z.string().min(1, dict["details.bedroomRequired"]),
          z.number().min(0, dict["details.bedroomRequired"]),
        ]),
        bathrooms: z.union([
          z.string().min(1, dict["details.bathroomRequired"]),
          z.number().min(1, dict["details.bathroomRequired"]),
        ]),
        area: z.union([
          z.string().min(1, dict["details.areaRequired"]),
          z.number().min(1, dict["details.areaRequired"]),
        ]),
        totalAreas: z.union([
          z.string().min(1, dict["details.totalAreasRequired"]),
          z.number().min(1, dict["details.totalAreasRequired"]),
        ]),
        utilities: z.array(z.string().min(1, dict["details.utilityRequired"])),
        additionalUtilities: z.array(z.string().optional()),
      }),
      location,

      images: z.array(z.any()).min(1, dict["images.required"]),
      likes: z.number().int().default(0),
      shares: z.number().int().default(0),
      views: z.number().int().default(0),
      houseType: z.string().min(1, dict.houseType),
      buildingType: z.string().min(1, dict["buildingType.required"]),
      renovation: z.string().min(1, dict["renovation.required"]),
      projectType: z.array(z.string()).optional(),
      status: z
        .enum(["published", "draft", "archive", "preview"])
        .default("draft"),
      _id: IdType,
      isBestOffers: z.boolean().optional(),
      socials: socialsSchema.optional(),
    });
  }
  if (type === "land" && category === "buy") {
    return z.object({
      title,
      description,
      isContractBased: z.boolean().default(false).optional(),
      price,
      details: z.object({
        totalAreas: z.union([
          z.string().min(1, dict["details.totalAreasRequired"]),
          z.number().min(1, dict["details.totalAreasRequired"]),
        ]),
        utilities: z.array(z.string().min(1, dict["details.utilityRequired"])),
      }),
      location,
      images: z.array(z.any()).min(1, dict["images.required"]),
      likes: z.number().int().default(0),
      shares: z.number().int().default(0),
      views: z.number().int().default(0),
      projectType: z.array(z.string()).optional(),

      significance: z
        .array(z.string())
        .min(1, dict["details.SignificanceRequired"]),
      status: z
        .enum(["published", "draft", "archive", "preview"])
        .default("draft"),
      _id: IdType,
      isBestOffers: z.boolean().optional(),
      socials: socialsSchema.optional(),
    });
  }
  if (type === "land") {
    return z.object({
      title,
      description,
      price,
      isContractBased: z.boolean().default(false).optional(),
      details: z.object({
        totalAreas: z.union([
          z.string().min(1, dict["details.totalAreasRequired"]),
          z.number().min(1, dict["details.totalAreasRequired"]),
        ]),
        utilities: z.array(z.string().min(1, dict["details.utilityRequired"])),
      }),
      location,
      images: z.array(z.any()).min(1, dict["images.required"]),
      likes: z.number().int().default(0),
      shares: z.number().int().default(0),
      views: z.number().int().default(0),
      projectType: z.array(z.string()).min(1, "Project type is required"),
      significance: z
        .array(z.string())
        .min(1, dict["details.SignificanceRequired"]),
      status: z
        .enum(["published", "draft", "archive", "preview"])
        .default("draft"),
      _id: IdType,
      isBestOffers: z.boolean().optional(),
      socials: socialsSchema.optional(),
    });
  }
  if (type === "apartment" && category === "buy") {
    return z.object({
      title,
      description,
      price,
      isContractBased: z.boolean().default(false).optional(),
      details: z.object({
        bedrooms: z.union([
          z.string().min(1, dict["details.bedroomRequired"]),
          z.number().min(0, dict["details.bedroomRequired"]),
        ]),
        bathrooms: z.union([
          z.string().min(1, "Bathroom required"),
          z.number().min(1, "Bathroom required"),
        ]),
        totalAreas: z.union([
          z.string().min(1, dict["details.areaRequired"]),
          z.number().min(1, dict["details.areaRequired"]),
        ]),
        floor,
        totalFloors: z.union([z.string().optional(), z.number().optional()]),
        floorNumber: z.union([z.string().optional(), z.number().optional()]),
        utilities: z.array(z.string().min(1, dict["details.utilityRequired"])),
        additionalUtilities: z.array(z.string().optional()),
      }),
      location,

      images: z.array(z.any()).min(1, dict["images.required"]),
      likes: z.number().int().default(0),
      shares: z.number().int().default(0),
      views: z.number().int().default(0),
      projectType: z.array(z.string()).optional(),
      buildingType: z.string().min(1, dict["ConstructionType.required"]),
      renovation: z.string().min(1, dict["renovation.required"]),
      status: z
        .enum(["published", "draft", "archive", "preview"])
        .default("draft"),
      _id: IdType,
      isBestOffers: z.boolean().optional(),
      socials: socialsSchema.optional(),
    });
  }
  if (type === "apartment") {
    return z.object({
      title,
      description,
      price,
      isContractBased: z.boolean().default(false).optional(),
      details: z.object({
        bedrooms: z.union([
          z.string().min(1, dict["details.bedroomRequired"]),
          z.number().min(0, dict["details.bedroomRequired"]),
        ]),
        bathrooms: z.union([
          z.string().min(1, "Bathroom required"),
          z.number().min(1, "Bathroom required"),
        ]),
        totalAreas: z.union([
          z.string().min(1, dict["details.areaRequired"]),
          z.number().min(1, dict["details.areaRequired"]),
        ]),
        floor,
        totalFloors: z.union([z.string().optional(), z.number().optional()]),
        floorNumber: z.union([z.string().optional(), z.number().optional()]),
        utilities: z.array(z.string().min(1, dict["details.utilityRequired"])),
        additionalUtilities: z.array(z.string().optional()),
      }),
      location,
      images: z.array(z.any()).min(1, dict["images.required"]),
      likes: z.number().int().default(0),
      shares: z.number().int().default(0),
      views: z.number().int().default(0),
      buildingType: z.string().min(1, dict["buildingType.required"]),
      projectType: z.array(z.string()).optional(),
      renovation: z.string().min(1, dict["renovation.required"]),
      status: z
        .enum(["published", "draft", "archive", "preview"])
        .default("draft"),
      _id: IdType,
      isBestOffers: z.boolean().optional(),
      socials: socialsSchema.optional(),
    });
  }
  if (type === "commercial" && category === "rent") {
    return z.object({
      title,
      description,
      price,
      isContractBased: z.boolean().default(false).optional(),
      details: z.object({
        bathrooms: z.union([
          z.string().min(1, dict["details.bathroomRequired"]),
          z.number().min(1, dict["details.bathroomRequired"]),
        ]),
        area: z.union([
          z.string().min(1, dict["details.areaRequired"]),
          z.number().min(1, dict["details.areaRequired"]),
        ]),
        utilities: z.array(z.string().min(1, dict["details.utilityRequired"])),
        additionalUtilities: z.array(z.string().optional()),
      }),
      location,
      images: z.array(z.any()).min(1, dict["images.required"]),
      likes: z.number().int().default(0),
      shares: z.number().int().default(0),
      views: z.number().int().default(0),
      buildingType: z.string().min(1, dict["buildingType.required"]),
      renovation: z.string().min(1, dict["renovation.required"]),
      projectType: z.array(z.string()).optional(),
      significance: z
        .array(z.string())
        .min(1, dict["details.SignificanceRequired"]),
      status: z
        .enum(["published", "draft", "archive", "preview"])
        .default("draft"),
      _id: IdType,
      isBestOffers: z.boolean().optional(),
      socials: socialsSchema.optional(),
    });
  }
  if (type === "commercial") {
    return z.object({
      title,
      description,
      price,
      isContractBased: z.boolean().default(false),
      details: z.object({
        bathrooms: z.union([
          z.string().min(1, dict["details.bathroomRequired"]),
          z.number().min(1, dict["details.bathroomRequired"]),
        ]),
        area: z.union([
          z.string().min(1, dict["details.areaRequired"]),
          z.number().min(1, dict["details.areaRequired"]),
        ]),
        totalAreas: z.union([
          z.string().min(1, dict["details.totalAreasRequired"]),
          z.number().min(1, dict["details.totalAreasRequired"]),
        ]),
        utilities: z.array(z.string().min(1, dict["details.utilityRequired"])),
        additionalUtilities: z.array(z.string().optional()),
      }),
      location,
      images: z.array(z.any()).min(1, dict["images.required"]),
      likes: z.number().int().default(0),
      shares: z.number().int().default(0),
      views: z.number().int().default(0),
      projectType: z.array(z.string()).optional(),
      buildingType: z.string().min(1, dict["buildingType.required"]),
      renovation: z.string().min(1, dict["renovation.required"]),
      significance: z
        .array(z.string())
        .min(1, dict["details.SignificanceRequired"]),
      status: z
        .enum(["published", "draft", "archive", "preview"])
        .default("draft"),
      _id: IdType,
      isBestOffers: z.boolean().optional(),
      socials: socialsSchema.optional(),
    });
  }

  // Default schema for any unhandled type/category combinations
  return z.object({
    title,
    description,
    price,
    isContractBased: z.boolean().default(false),
    details: z.object({
      utilities: z.array(z.string().min(1, dict["details.utilityRequired"])),
      additionalUtilities: z.array(z.string().optional()),
    }),
    location,
    images: z.array(z.any()).min(1, dict["images.required"]),
    likes: z.number().int().default(0),
    shares: z.number().int().default(0),
    views: z.number().int().default(0),
    status: z
      .enum(["published", "draft", "archive", "preview"])
      .default("draft"),
    _id: IdType,
    isBestOffers: z.boolean().optional(),
    socials: socialsSchema.optional(),
  });
};
export default generatePropertySchema;
