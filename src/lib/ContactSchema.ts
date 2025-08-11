import { z } from "zod";

export const contactSchema = z.object({
  countryCode: z.string().min(1, { message: "Country code is required." }),
  phone: z.string().min(5, { message: "Phone number is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  fullName: z.string().min(1, { message: "FullName is required." }),
  comment: z.string(),
  attachments: z.any(),
});

export type ContactType = z.infer<typeof contactSchema>;
