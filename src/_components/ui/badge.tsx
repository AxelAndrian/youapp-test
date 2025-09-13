"use client";

import React from "react";
import { cn } from "@/_utils/cn";

interface IBadge extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

const Badge = React.forwardRef<HTMLSpanElement, IBadge>(
  ({ className, children, ...rest }, ref) => {
    return (
      <span
        className={cn(
          "px-4 py-2 text-sm font-semibold text-white rounded-full bg-white/6",
          className
        )}
        {...rest}
        ref={ref}
      >
        {children}
      </span>
    );
  }
);

export default Badge;
