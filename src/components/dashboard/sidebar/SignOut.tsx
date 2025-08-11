"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const SignOut = ({ dashboardDict }) => {
  const handleSignOut = () => {
    signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  };
  return (
    <Button
      variant="ghost"
      className="-ml-4 mt-4 gap-2 p-0"
      onClick={handleSignOut}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          d="M10.6673 6.66669H8.00065C6.52732 6.66669 5.33398 7.86002 5.33398 9.33335V22.6667C5.33398 24.14 6.52732 25.3334 8.00065 25.3334H10.6673"
          stroke="#0A0A0A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.9093 27.936L24.576 26.464C25.7986 26.1947 26.668 25.1107 26.668 23.86V8.14002C26.668 6.88935 25.7986 5.80535 24.576 5.53602L17.9093 4.06402C16.2453 3.69602 14.668 4.96268 14.668 6.66802V25.3333C14.668 27.0373 16.2453 28.304 17.9093 27.936V27.936Z"
          stroke="#0A0A0A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.6667 14.6667V17.3334"
          stroke="#0A0A0A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{dashboardDict.logout}</span>
    </Button>
  );
};

export default SignOut;
