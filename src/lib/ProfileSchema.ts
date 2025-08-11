import { z } from "zod";
import { Profile } from "./db/type";

export const generateProfileSchema = (profileDict: Profile) => {

  return z.object({
    name: z.string().min(1, profileDict.NameIsRequired),
    email: z.string().email(profileDict.InvalidEmailAddress),
    phoneNumbers: z.array(
      z.object({
        number: z
          .string()
          .regex(/^\+\d{1,3}\d{3,14}$/, profileDict.InvalidPhoneNumberFormat)
          .min(5, profileDict.PhoneNumberIsTooShort)
          .max(20, profileDict.PhoneNumberIsTooLong),
        types: z
          .array(z.enum(["telegram", "whatsApp", "viber", "messenger"]))
          .optional(),
      }),
    ),
  });
};

export type ProfileFormType = z.infer<typeof profileSchema>;
