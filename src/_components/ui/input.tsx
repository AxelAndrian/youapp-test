"use client";

import React, { HTMLInputTypeAttribute } from "react";
import { cn } from "@/_utils/cn";
import { Eye, EyeOff } from "lucide-react";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  classWrapper?: string;
  type?: HTMLInputTypeAttribute;
}

const Input = React.forwardRef<HTMLInputElement, IInput>(
  ({ className, classWrapper, type = "text", ...rest }, ref) => {
    const [show, setShow] = React.useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && show ? "text" : type;

    return (
      <div className={cn("relative w-full", classWrapper)}>
        <input
          ref={ref}
          type={inputType}
          className={cn(
            `w-full px-4 py-4.5 rounded-xl text-white placeholder-white/40 text-sm 
           bg-white/5 focus:outline-none`,
            isPassword && "pr-12",
            className
          )}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-xs px-2 py-1 focus:outline-none"
            onClick={() => setShow((s) => !s)}
          >
            {show ? (
              <EyeOff size={20} color="#D5BE88" />
            ) : (
              <Eye size={20} color="#D5BE88" />
            )}
          </button>
        )}
      </div>
    );
  }
);

export default Input;
