"use client";
import { signInAction } from "@/app/[lang]/actions/auth.action";
import { Button } from "@/components/ui/button";
import EyeHidden from "@/svgs/eye-hidden.svg";
import EyeVisible from "@/svgs/eye-visible.svg";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserFormValue, signInSchema } from "@/lib/AuthSchema";
import { Login } from "@/lib/db/type";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function UserAuthForm({ loginDict }: { loginDict: Login }) {
  const [isShowPassword, setIsShowPassword] = useState<Boolean>(false);
  const [signInError, setSignInError] = useState<String>();
  const router = useRouter();
  const defaultValues = {
    email: "",
    password: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(signInSchema),
    defaultValues,
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (formData: UserFormValue) => {
    const { email, password } = formData;
    setSignInError("");
    try {
      const user = await signInAction({
        email,
        password,
      });

      if (!user?.success) {
        setSignInError(user?.message);
        throw new Error(user?.message);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        setSignInError(error?.message);
      }
    }
  };

  const handleDisplayPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{loginDict.email}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={`${loginDict.emailmessage}...`}
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>{loginDict.password}</FormLabel>
                <FormControl>
                  <Input
                    type={isShowPassword ? "text" : "password"}
                    placeholder={`${loginDict.passwordMessage}...`}
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <button
                  className="absolute bottom-2 right-2"
                  type="button"
                  onClick={handleDisplayPassword}
                >
                  {isShowPassword ? <EyeVisible /> : <EyeHidden />}
                </button>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-end">
            <Link href="/forget" className="hover:underline">
              {loginDict.forget}
            </Link>
          </div>
          <Button
            disabled={isSubmitting}
            className="ml-auto w-full"
            type="submit"
          >
            {isSubmitting ? `${loginDict.signing}...` : loginDict.signin}
          </Button>
        </form>
      </Form>
      {signInError && (
        <p className="text-[0.8rem] font-medium text-destructive">
          {signInError}
        </p>
      )}
    </>
  );
}
