import { z } from "zod";

export const BookingSchema = z.object({
  countryCode: z.string().min(1, { message: "Country code is required." }),
  phone: z.string().min(1, { message: "Phone number is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  fullName: z.string().min(1, { message: "fullName is required." }),
  comment: z.string().min(1, { message: "Comment is required." }),
  propertyId: z.string().min(1, { message: "Property ID is required." }),
  agentId: z.string().min(1, { message: "Agent ID is required." }),
});

export type BookingSchemaType = z.infer<typeof BookingSchema>;

