import { z } from "zod";
import { Profile } from "./db/type";

export const setupPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const generatePasswordChangeSchema = (profileDict: Profile) => {
  return z
    .object({
      oldPassword: z.string().min(6, profileDict.oldPasswordError),
      newPassword: z.string().min(6, profileDict.newPasswordError),
      confirmPassword: z.string().min(6, profileDict.confirmPasswordError),
    })
    .refine((values) => values.newPassword === values.confirmPassword, {
      message: profileDict.confirmPasswordError,
      path: ["confirmPassword"],
    });
};

export type SetupPasswordFormType = z.infer<typeof setupPasswordSchema>;
