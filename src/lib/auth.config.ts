import { API_URL } from "@/config/site";
import { NextAuthConfig } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { headers } from "next/headers";
const WEEK_IN_SECONDS = 604800;
export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: WEEK_IN_SECONDS,
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Token expiration time in milliseconds (30 days)
      const tokenExpirationTime = 30 * 24 * 60 * 60 * 1000;

      if (trigger === "signIn") {
        return {
          ...token,
          ...user,
          expiresAt: Date.now() + tokenExpirationTime, // Set expiresAt on sign-in
        };
      }
      if (trigger === "update") {
        return {
          ...token,
          ...session,
          ...user,
        };
      }

      // Check if the token has expired
      if (token.expiresAt && Date.now() > token.expiresAt) {
        return null; // Throw error to handle auto-logout
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...token,
        },
      };
    },
    authorized: ({ auth }) => {
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
  },
  trustHost: true,
  providers: [
    CredentialProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const body = JSON.stringify({ email, password });
        const headersList = await headers();
        const userAgent = headersList.get("user-agent");

        const fetchAuth = await fetch(`${API_URL}/auth/login`, {
          headers: {
            "Content-Type": "application/json",
            "User-Agent": userAgent || "",
          },
          method: "POST",
          body,
        });

        const authData = await fetchAuth.json();

        if (!authData.success) {
          throw new Error(authData.message);
        }

        return authData.data;
      },
    }),
  ],
  logger: {
    error(code, ...message) {
      if (process.env.NODE_ENV === "development") console.debug(code, message);
    },
    warn(code, ...message) {
      if (process.env.NODE_ENV === "development") console.debug(code, message);
    },
    debug(code, ...message) {
      if (process.env.NODE_ENV === "development") console.debug(code, message);
    },
  },
} satisfies NextAuthConfig;
