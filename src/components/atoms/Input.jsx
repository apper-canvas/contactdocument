import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({
  className,
  type = "text",
  label,
  error,
  required = false,
  disabled = false,
  ...props
}, ref) => {
  const baseClasses = "block w-full px-4 py-3 text-secondary-900 bg-white border border-secondary-300 rounded-lg shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500";
  
  const errorClasses = error 
    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
    : "";
    
  const disabledClasses = disabled
    ? "bg-secondary-50 text-secondary-500 cursor-not-allowed"
    : "hover:border-secondary-400";

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-secondary-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={cn(
          baseClasses,
          errorClasses,
          disabledClasses,
          className
        )}
        disabled={disabled}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;