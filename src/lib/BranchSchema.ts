import { z } from "zod";

export const createBranchSchema = (userDict) => {
  // Address Schema
  const addressSchema = z.object({
    street: z.string().min(1, { message: userDict.streetError }),
    city: z.string().min(1, { message: userDict.cityError }),
    state: z.string().min(1, { message: userDict.stateError }),
    zipCode: z.string().min(1, { message: userDict.zipCodeError }),
    country: z.string().min(1, { message: userDict.countryError }),
  });

  // Contact Schema
  const contactSchema = z.object({
    phone: z.string().min(1, { message: userDict.phoneError }),
    email: z.string().email({ message: userDict.emailError }),
    fax: z.string().optional(),
    website: z.string().optional(),
  });

  // Branch Schema
  return z.object({
    _id: z.string().optional(),
    name: z.string().min(1, { message: userDict.branchNameError }),
    coverImage: z.any(),
    address: addressSchema,
    contact: contactSchema,
  });
};
