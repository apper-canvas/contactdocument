import { cn } from "@/utils/cn";

const Badge = ({ 
  children, 
  variant = "default", 
  size = "md",
  className,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-full border";
  
  const variants = {
    default: "bg-secondary-100 text-secondary-800 border-secondary-200",
    primary: "bg-primary-100 text-primary-800 border-primary-200",
    success: "bg-emerald-100 text-emerald-800 border-emerald-200",
    warning: "bg-amber-100 text-amber-800 border-amber-200",
    danger: "bg-red-100 text-red-800 border-red-200",
    info: "bg-blue-100 text-blue-800 border-blue-200",
    work: "bg-blue-100 text-blue-800 border-blue-200",
    personal: "bg-green-100 text-green-800 border-green-200",
    family: "bg-purple-100 text-purple-800 border-purple-200",
    friends: "bg-pink-100 text-pink-800 border-pink-200",
    business: "bg-indigo-100 text-indigo-800 border-indigo-200",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={cn(
        baseClasses,
        variants[variant] || variants.default,
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;