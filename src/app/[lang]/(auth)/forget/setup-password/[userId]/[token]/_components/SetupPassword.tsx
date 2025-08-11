"use client";

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
import { API_URL } from "@/config/site";
import {
  SetupPasswordFormType,
  setupPasswordSchema,
} from "@/lib/PasswordChangeSchema";
import EyeInvisible from "@/svgs/eye-hidden.svg";
import EyeVisible from "@/svgs/eye.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type setupPasswordDataType = {
  userId: string;
  token: string;
  password: string;
};

async function setupPassword(data: setupPasswordDataType) {
  const userId = data.userId;
  const token = data.token;
  const response = await fetch(
    `${API_URL}/auth/forgot-password/${userId}/${token}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Failed to setup password");
  }

  return responseData;
}

const PasswordChangeForm = ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const form = useForm<SetupPasswordFormType>({
    resolver: zodResolver(setupPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: SetupPasswordFormType) => {
    const setupPasswordData = {
      userId,
      token,
      password: data.confirmPassword,
    };
    try {
      const setupPasswordResponse = await setupPassword(setupPasswordData);
      setHasError(false);
      setMessage(setupPasswordResponse.message);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      if (error instanceof Error) {
        const { message = "Failed to setup password" } = error;
        setHasError(true);
        setMessage(message);
      }
    }
  };

  const {
    formState: { isSubmitting },
  } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-[600px]"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <>
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={toggleNewPasswordVisibility}
                        className="absolute right-2 top-1/2 -translate-y-1/2 transform"
                      >
                        {showNewPassword ? <EyeVisible /> : <EyeInvisible />}
                      </button>
                    </>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Confirm Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute right-2 top-1/2 -translate-y-1/2 transform"
                      >
                        {showConfirmPassword ? (
                          <EyeVisible />
                        ) : (
                          <EyeInvisible />
                        )}
                      </button>
                    </>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="text-center">
          <Button className="mt-8" type="submit">
            {isSubmitting ? "Changing Password..." : "Change Password"}
          </Button>
        </div>
        {message && (
          <div
            className={`${
              hasError ? "bg-[#fef3f3]" : "bg-[#daf8e6]"
            } mt-10 inline-flex w-full rounded-lg px-[18px] py-4 text-center shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)]`}
          >
            <p
              className={`flex items-center text-sm font-medium ${
                hasError ? "text-[#BC1C21]" : "text-[#004434]"
              }`}
            >
              {message}
            </p>
          </div>
        )}
      </form>
    </Form>
  );
};

export default PasswordChangeForm;
