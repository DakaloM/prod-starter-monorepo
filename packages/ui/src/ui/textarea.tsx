import * as React from "react";
import { cn } from "../lib";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex h-[100px] w-full rounded-md border border-borderColor bg-transparent outline-none foculs:outline-none text-black dark:text-white px-3 py-2 text-sm  placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
