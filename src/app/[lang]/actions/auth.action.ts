"use server";
import { ForgetUserFormValue } from "./../../../lib/AuthSchema";

import { signIn, signOut } from "@/auth";
import { API_URL } from "@/config/site";
import { UserFormValue, signInSchema } from "@/lib/AuthSchema";
import { AuthError } from "next-auth";

const signInAction = async ({ email, password }: UserFormValue) => {
  const validatedFields = signInSchema.safeParse({
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const user = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      code: 200,
      success: true,
      message: "User signed in successfully",
      data: {
        ...user,
      },
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            code: 401,
            success: false,
            message: "Invalid Credentials!",
          };
        case "CallbackRouteError":
          return {
            code: 401,
            success: false,
            message: "Invalid Credentials!",
          };
        default:
          return {
            code: 500,
            success: false,
            message: "Someting went wrong, please try again!",
          };
      }
    }
    throw error;
  }
};
const forgetAction = async ({ email }: ForgetUserFormValue) => {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const json = await response.json();
  return json;
};

const signOutAction = async () => await signOut();
export { forgetAction, signInAction, signOutAction };
