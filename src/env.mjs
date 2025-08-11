import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_API_URL: z.string().min(1),
    // NEXT_PUBLIC_GOOGLE_MAP_API: z.string().min(1),
  },
  server: {
    AUTH_SECRET: z.string().min(10),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    // NEXT_PUBLIC_GOOGLE_MAP_API: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
  },
});
