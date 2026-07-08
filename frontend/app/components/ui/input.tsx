import { cn } from "@/lib/utils";
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-900 shadow-xs placeholder:text-stone-400 focus-visible:border-red-650 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-650/40 disabled:cursor-not-allowed disabled:opacity-50 font-medium transition-all",
          type === "search" &&
            "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
          type === "file" &&
            "p-0 pr-3 italic text-stone-400 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-stone-200 file:bg-transparent file:px-3 file:text-xs file:font-medium file:not-italic file:text-stone-900",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
