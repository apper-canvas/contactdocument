import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({
  className,
  children,
  hover = true,
  ...props
}, ref) => {
  const baseClasses = "bg-white rounded-lg border border-secondary-200";
  const hoverClasses = hover ? "card-shadow" : "shadow-sm";

  return (
    <div
      ref={ref}
      className={cn(baseClasses, hoverClasses, className)}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;