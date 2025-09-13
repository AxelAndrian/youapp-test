"use client";

import React from "react";
import { cn } from "@/_utils/cn";

const defaultSizes = {
  default: "py-4 px-2 text-base font-bold",
};

const variantStyles = {
  primary: "text-white bg-gradient-to-l from-[#62CDCB] to-[#4599DB]",
  link: "text-white font-bold",
};

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: keyof typeof variantStyles;
  size?: keyof typeof defaultSizes;
  onClick?: () => void;
}

const Button = React.forwardRef<HTMLButtonElement, IButton>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      children,
      onClick,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-lg",
          variantStyles[variant],
          defaultSizes[size],
          className
        )}
        {...rest}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

export default Button;
