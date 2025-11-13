import { cn } from "@/utils/cn";
import Badge from "@/components/atoms/Badge";

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  className 
}) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <button
        onClick={() => onCategoryChange("all")}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all duration-150",
          selectedCategory === "all"
            ? "bg-primary-600 text-white shadow-md"
            : "bg-white text-secondary-600 border border-secondary-300 hover:bg-secondary-50 hover:border-secondary-400"
        )}
      >
        All Contacts
      </button>
      {categories.map((category) => (
        <button
          key={category.Id}
          onClick={() => onCategoryChange(category.name)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-150",
            selectedCategory === category.name
              ? "bg-primary-600 text-white shadow-md"
              : "bg-white text-secondary-600 border border-secondary-300 hover:bg-secondary-50 hover:border-secondary-400"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;