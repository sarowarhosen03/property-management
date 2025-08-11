import LoginForm from "@/components/dashboard/forms/LoginForm";
import Logo from "@/components/header/Logo";
import { Login } from "@/lib/db/type";
import { getDectionary } from "@/lib/getDictionary";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pagePropType } from "../../(main)/page";

export const metadata: Metadata = {
  title: "Sign In - Safe House",
  description: "Safe House - A well know real estate property selling service",
};

export default async function LoginPage({ params: { lang } }: pagePropType) {
  const loginDict: Login = await getDectionary(lang, "login");
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black"></div>
        <Image src="/safe-house.jpg" alt="safe house" fill />
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {loginDict.singnInTitle}
            </h1>
          </div>

          <LoginForm loginDict={loginDict} />

        </div>
      </div>
    </div>
  );
}
