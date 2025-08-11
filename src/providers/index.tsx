import { ThemeProvider } from "@/components/theme-provider";
import { Toaster as ToastProvider } from "@/components/ui/toaster";
import CurrencyProvider from "@/context/providers/CurrencyProvider";
import LanguageProvider from "@/context/providers/LanguageProvider";
import { SessionProvider } from "next-auth/react";
import React, { Suspense } from "react";
import { Toaster } from "sonner";
import FvariouteProvider from "./FvariouteProvider";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <Suspense>
          <CurrencyProvider>
            <LanguageProvider>
              <FvariouteProvider>{children}</FvariouteProvider>
            </LanguageProvider>
          </CurrencyProvider>
        </Suspense>
        <Toaster expand={true} visibleToasts={4} />
        <ToastProvider />
      </SessionProvider>
    </ThemeProvider>
  );
}
