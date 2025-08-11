import { z } from "zod";
import { Users } from "./db/type";

const phoneTypeEnum = z.enum(["whatsApp", "viber", "telegram", "messenger"]);

export const generateAgentSchema = (userDict: Users) => {
  // Define nested schemas with error messages from `userDict`
  const phoneSchema = z.object({
    number: z.string().optional(),
    types: z.array(phoneTypeEnum).optional(),
  });

  const addressSchema = z
    .object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      zipCode: z.string(),
      country: z.string(),
    })
    .optional();

  return z.object({
    firstName: z.string().min(1, { message: userDict.firstNameError }),
    lastName: z.string().min(1, { message: userDict.lastNameError }),
    // password: z.string().optional(),
    email: z.string().email({ message: userDict.emailError }),
    phoneNumbers: z.array(phoneSchema).optional(),
    address: addressSchema.optional(),
    avatar: z.any().optional(),
    bio: z.string().optional(),
    role: z.enum(["agent", "manager", "director"], {
      message: userDict.roleError,
    }),
    branchId: z.string().min(1, { message: userDict.branchIdError }),
  });
};

export type AgentType = z.infer<ReturnType<typeof generateAgentSchema>>;
