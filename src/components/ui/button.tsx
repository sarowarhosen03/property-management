import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition duration-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:shadow-md border border-primary disabled:bg-gray-200 disabled:text-gray-400 font-semibold",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",

        outline: "border border-secondary hover:text-light hover:bg-secondary",

        secondary:
          "bg-secondary text-secondary-foreground border border-secondary hover:bg-secondary-300 hover:text-secondary hover:border-secondary-300",

        tertiary:
          "bg-secondary-100 text-secondary border border-secondary hover:bg-secondary-500 disabled:bg-gray-100 disabled:text-gray-300 disabled:border-gray-200 font-medium",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        normal: "",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        normal: "p-0 h-auto",
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-5 py-2 text-sm",
        lg: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
