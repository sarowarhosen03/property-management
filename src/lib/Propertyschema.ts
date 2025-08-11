import { locationSchema } from "@/components/dashboard/forms/_schema/generatePropertySchema";
import { z } from "zod";

const previewFileSchema = z.object({
  name: z.string().min(1, "File name is required"),
  size: z.number().min(1, "File size must be greater than 0"),
  type: z.string().min(1, "File type is required"),
  preview: z.string().min(1, "File preview is required"),
});

export const propertySchema = z.object({
  title: z.object({
    en: z.string().min(1, "English title is required"),
    hy: z.string().optional(),
    rus: z.string().optional(),
  }),
  description: z.object({
    en: z.string().min(1, "English description is required"),
    hy: z.string().optional(),
    rus: z.string().optional(),
  }),
  type: z.enum(["apartment", "house", "commercial", "land"], {
    message: "Type is required",
  }),
  category: z.enum(["rent", "buy", "daily rent"], {
    message: "Choose types is required",
  }),
  price: z.object({
    amount: z.string().min(1, "Price is required"),
    currency: z.string().min(1, "Currency is required"),
  }),
  isContractBased: z.string().nullable(),
  location: locationSchema,
  details: z.object({
    bedrooms: z.string().min(1, "Room is required"),
    bathrooms: z.string().optional(),
    area: z.string().min(1, "House area required"),
    totalAreas: z.string().min(1, "Land surface required"),
    totalRooms: z.string().optional(),
    floorNumber: z.string().optional(),
    totalFloors: z.string().optional(),
    utilities: z.array(z.string().min(1, "Utility value is required")),
    additionalUtilities: z.array(z.string().optional()),
  }),
  availability: z
    .object({
      rentalPeriod: z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      }),
      status: z.enum(["available", "unavailable"], {
        errorMap: () => ({ message: "Availability status is required" }),
      }),
      availableFrom: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
      }),
    })
    .optional(),
  images: z.array(z.any()).min(1, "Minimum 1 image required"),
  likes: z.number().int().default(0),
  shares: z.number().int().default(0),
  views: z.number().int().default(0),
  agentId: z.string().min(1, "Agent ID is required"),
  projectType: z
    .array(z.string({ message: "Project type is required" }))
    .min(1, "Project type is required"),
  houseType: z.enum(
    ["house", "luxury private house", "townhouses", "country House"],
    {
      message: "House type is required",
      required_error: "House type is required",
    },
  ),
  constructionType: z
    .string({ message: "Building type is required" })
    .optional(),
  significance: z.string().optional(),
  renovation: z.enum(
    [
      "no renovation",
      "needs renovation",
      "cosmetic renovation",
      "major renovation",
      "designer renovation",
    ],
    {
      required_error: "Renovation type is required",
    },
  ),
  status: z.enum(["published", "draft", "archive", "preview"]).default("draft"),
});

export type PropertyType = z.infer<typeof propertySchema>;
export type PreviewFile = z.infer<typeof previewFileSchema>;
export type PropertyTypeWithId = {
  _id?: string;
} & PropertyType;
