"use client";
import { forgetAction } from "@/app/[lang]/actions/auth.action";
import { showToast } from "@/components/common/toaster/toaster";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgetSchema, UserFormValue } from "@/lib/AuthSchema";
import { Forget } from "@/lib/db/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ForgetForm({ forgetDict }: { forgetDict: Forget }) {
  const [signInError, setSignInError] = useState<String>();
  const router = useRouter();
  const defaultValues = {
    email: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(forgetSchema),
    defaultValues,
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (formData: UserFormValue) => {
    const { email } = formData;
    setSignInError("");
    try {
      const forgetResponse = await forgetAction({
        email,
      });

      if (!forgetResponse?.success) {
        setSignInError(forgetResponse?.message);
        throw new Error(forgetResponse?.message);
      } else {
        showToast({
          message: forgetResponse.message,
          type: "success",
          title: "Success",
        });
        router.push("/login");
      }
    } catch (error) {
      if (error instanceof Error) {
        setSignInError(error?.message);
      }
    }
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
                <FormLabel>{forgetDict.email}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={`${forgetDict.emailmessage}...`}
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isSubmitting}
            className="ml-auto w-full"
            type="submit"
          >
            {isSubmitting ? `${forgetDict.submitting}...` : forgetDict.button}
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
