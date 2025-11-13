import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SearchBar = ({ 
  placeholder = "Search contacts...", 
  value = "", 
  onChange,
  className,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <ApperIcon 
          name="Search" 
          className={cn(
            "h-5 w-5 transition-colors duration-150",
            isFocused ? "text-primary-600" : "text-secondary-400"
          )} 
        />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "block w-full pl-12 pr-4 py-3 text-secondary-900 bg-white border border-secondary-300 rounded-lg shadow-sm transition-all duration-150",
          "placeholder:text-secondary-400",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
          "hover:border-secondary-400"
        )}
        {...props}
      />
      {value && (
        <button
          onClick={() => onChange?.("")}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-secondary-400 hover:text-secondary-600 transition-colors duration-150"
        >
          <ApperIcon name="X" className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;