import React from "react";
import { cn } from "@/_utils/cn";

interface ICard extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  isLoading?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, ICard>(
  ({ className, children, isLoading = false, ...rest }, ref) => {
    return (
      <div
        className={cn("relative p-6 rounded-2xl", className)}
        {...rest}
        ref={ref}
      >
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-white/10 rounded w-3/4" />
            <div className="h-4 bg-white/10 rounded w-1/2" />
            <div className="h-4 bg-white/10 rounded w-full" />
          </div>
        ) : (
          children
        )}
      </div>
    );
  }
);

export default Card;
