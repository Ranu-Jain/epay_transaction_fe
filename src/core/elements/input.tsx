import * as React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface InputProps extends React.ComponentProps<"input"> {
  error?: string;
  successMessage?: string;
  icon?: string;
  iconClassName?:string;
}

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & { label: string,}
>(({ className,iconClassName, type = "text", label, error, icon, successMessage, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const message = error || successMessage;
  const messageColor = error ? "text-red-500" : successMessage ? "text-green-500" : '';

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIsFocused(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative w-full">
      {/* Floating label */}
      <label
        className={cn(
          "absolute left-3 transition-all duration-200 ease-in-out text-muted-foreground pointer-events-none",
          isFocused || value
            ? "text-sm top-[-10px] left-2 bg-background px-1 text-[#280071]"
            : "text-base top-2"
        )}
      >
        {label}
      </label>
      {/* Input element */}
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md bg-background px-3 py-2 border border-input text-base focus:outline-[#00A9E0] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm placeholder-transparent",
          className
        )}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
        {...props}
      />
      
      {icon && (
        <div className={`${iconClassName?iconClassName:""} absolute right-3 top-3`}><img src={icon} alt="" /></div>
      )
      }
      {message && <p className={`text-sm font-[500] ${messageColor} mt-1 text-end`}>{message}</p>}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
