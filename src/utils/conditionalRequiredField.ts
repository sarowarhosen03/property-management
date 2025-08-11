/* eslint-disable no-unused-vars */
import { z } from "zod";

export const requireFieldBasedOnCondition = <T extends z.ZodTypeAny>(
  schema: T,
  condition: (data: z.infer<T>) => boolean,
  fieldPath: keyof z.infer<T>,
  errorMessage: string,
) => {
  return schema.refine(
    (data) => {
      if (condition(data)) {
        return !!data[fieldPath];
      }
      return true;
    },
    {
      message: errorMessage,
      path: [fieldPath as string],
    },
  );
};
