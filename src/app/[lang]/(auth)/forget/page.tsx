import Logo from "@/components/header/Logo";
import { Forget } from "@/lib/db/type";
import { getDectionary } from "@/lib/getDictionary";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pagePropType } from "../../(main)/page";
import ForgetForm from "./_components/ForgetForm";

export const metadata: Metadata = {
  title: "Forget Password - Safe House",
  description: "Safe House - A well know real estate property selling service",
};

export default async function ForgetPage({ params: { lang } }: pagePropType) {
  const forgetDict: Forget = await getDectionary(lang, "forget");
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Repudiandae expedita deleniti aut porro velit! Libero, est
              reprehenderit suscipit accusantium eveniet praesentium aliquam
              sint aliquid voluptates saepe. Inventore dolores odio officiis.
            </p>
            <footer className="text-sm">Safe House</footer>
          </blockquote>
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black"></div>
        <Image src="/safe-house.jpg" alt="safe house" fill />
      </div>

      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {forgetDict.title}
            </h1>
          </div>

          <ForgetForm forgetDict={forgetDict} />
          {/*
           <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
          */}

        </div>
      </div>
    </div>
  );
}
