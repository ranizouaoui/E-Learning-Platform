import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        default:
          "bg-white text-slate-500 border-2 border-slate-200 border-b-4 active:border-b-2 hover:bg-slate-100 focus-visible:ring-slate-200",
        primary:
          "bg-sky-400 text-white border-sky-500 border-b-4 active:border-b-0 hover:bg-sky-400/90 focus-visible:ring-sky-500",
        primaryOutline:
          "bg-sky-400/15 text-sky-500 border-2 border-sky-500 border-b-4 active:border-b-2 hover:bg-sky-400/20 focus-visible:ring-sky-500",
        secondary:
          "bg-green-500 text-white border-green-600 border-b-4 active:border-b-0 hover:bg-green-500/90 focus-visible:ring-green-600",
        secondaryOutline:
          "bg-green-500/15 text-green-500 border-2 border-green-500 border-b-4 active:border-b-2 hover:bg-green-500/20 focus-visible:ring-green-500",
        destructive:
          "bg-rose-500 text-white border-rose-600 border-b-4 active:border-b-0 hover:bg-rose-500/90 focus-visible:ring-rose-600",
        destructiveOutline:
          "bg-rose-500/15 text-rose-500 border-2 border-rose-500 border-b-4 active:border-b-2 hover:bg-rose-500/20 focus-visible:ring-rose-500",
        indigo:
          "bg-indigo-500 text-white border-indigo-600 border-b-4 active:border-b-0 hover:bg-indigo-500/90 focus-visible:ring-indigo-600",
        indigoOutline:
          "bg-indigo-500/15 text-indigo-500 border-2 border-indigo-500 border-b-4 active:border-b-2 hover:bg-indigo-500/20 focus-visible:ring-indigo-500",
        ghost:
          "bg-transparent text-slate-500 border-0 border-transparent hover:bg-slate-100 focus-visible:ring-slate-200",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
