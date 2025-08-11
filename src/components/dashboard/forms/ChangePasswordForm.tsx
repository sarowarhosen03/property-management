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

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Loader } from "@/components/common/Loader";
import { API_URL } from "@/config/site";
import { Profile } from "@/lib/db/type";
import EyeInvisible from "@/svgs/eye-hidden.svg";
import EyeVisible from "@/svgs/eye.svg";
import { generatePasswordChangeSchema } from "@/lib/PasswordChangeSchema";

async function changedPassword(data: any, token: string, userId: string) {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      userId,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Failed to change password");
  }

  return responseData;
}

const PasswordChangeForm = ({
  userId,
  token,
  profileDict,
}: {
  userId: string;
  token: string;
  profileDict: Profile;
}) => {
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleOldPasswordVisibility = () => setShowOldPassword((prev) => !prev);
  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const form = useForm<any>({
    resolver: zodResolver(generatePasswordChangeSchema(profileDict)),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit = async (data: PasswordChangeFormType) => {
    const { oldPassword, newPassword, confirmPassword } = data;
    const changedPasswordData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    try {
      const setupPasswordResponse = await changedPassword(
        changedPasswordData,
        token,
        userId,
      );
      setHasError(false);
      setMessage(setupPasswordResponse.message);
      reset();
    } catch (error) {
      if (error instanceof Error) {
        const { message = profileDict.failedToSetupPassword } = error;
        setHasError(true);
        setMessage(message);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 w-full">
        <div className="w-1/2 space-y-4 2xl:w-1/3">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{profileDict.oldPassword}</FormLabel>
                <div className="relative">
                  <FormControl>
                    <>
                      <Input
                        type={showOldPassword ? "text" : "password"}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={toggleOldPasswordVisibility}
                        className="absolute right-2 top-1/2 -translate-y-1/2 transform"
                      >
                        {showOldPassword ? <EyeVisible /> : <EyeInvisible />}
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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{profileDict.newPassword}</FormLabel>
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
                <FormLabel>{profileDict.confirmPassword}</FormLabel>
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

        <Button className="mt-8 flex gap-2" type="submit">
          {isSubmitting
            ? profileDict.changingPassword
            : profileDict.changePassword}
          {isSubmitting && <Loader />}
        </Button>
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
