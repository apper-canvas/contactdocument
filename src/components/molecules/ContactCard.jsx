import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const ContactCard = ({ 
  contact, 
  onCall, 
  onEmail, 
  onEdit, 
  onView, 
  onToggleFavorite,
  className 
}) => {
  const handleCall = (e) => {
    e.stopPropagation();
    if (contact.phone) {
      window.open(`tel:${contact.phone}`, "_self");
      onCall?.(contact);
    }
  };

  const handleEmail = (e) => {
    e.stopPropagation();
    if (contact.email) {
      window.open(`mailto:${contact.email}`, "_blank");
      onEmail?.(contact);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit?.(contact);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    onToggleFavorite?.(contact);
  };

  const initials = `${contact.firstName?.charAt(0) || ""}${contact.lastName?.charAt(0) || ""}`.toUpperCase();
  const fullName = `${contact.firstName || ""} ${contact.lastName || ""}`.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      <Card 
        className="p-6 cursor-pointer relative overflow-hidden"
        onClick={() => onView?.(contact)}
      >
        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className={cn(
            "absolute top-4 right-4 p-1.5 rounded-full transition-all duration-150",
            contact.isFavorite
              ? "text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50"
              : "text-secondary-300 hover:text-yellow-500 hover:bg-yellow-50"
          )}
        >
          <ApperIcon 
            name={contact.isFavorite ? "Star" : "Star"} 
            className={cn(
              "w-4 h-4",
              contact.isFavorite && "fill-current"
            )} 
          />
        </button>

        {/* Category Badge */}
        {contact.category && (
          <div className="absolute top-4 left-4">
            <Badge variant={contact.category.toLowerCase()} size="sm">
              {contact.category}
            </Badge>
          </div>
        )}

        {/* Avatar and Basic Info */}
        <div className="flex items-center space-x-4 mb-4 mt-8">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
            {initials || "?"}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-secondary-900 truncate">
              {fullName || "Unnamed Contact"}
            </h3>
            {contact.position && contact.company && (
              <p className="text-sm text-secondary-600 truncate">
                {contact.position} at {contact.company}
              </p>
            )}
            {!contact.position && contact.company && (
              <p className="text-sm text-secondary-600 truncate">
                {contact.company}
              </p>
            )}
            {contact.position && !contact.company && (
              <p className="text-sm text-secondary-600 truncate">
                {contact.position}
              </p>
            )}
          </div>
        </div>

        {/* Contact Details */}
        <div className="space-y-2 mb-6">
          {contact.phone && (
            <div className="flex items-center text-sm text-secondary-600">
              <ApperIcon name="Phone" className="w-4 h-4 mr-2 text-secondary-400" />
              <span className="truncate">{contact.phone}</span>
            </div>
          )}
          {contact.email && (
            <div className="flex items-center text-sm text-secondary-600">
              <ApperIcon name="Mail" className="w-4 h-4 mr-2 text-secondary-400" />
              <span className="truncate">{contact.email}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {contact.phone && (
            <button
              onClick={handleCall}
              className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-md transition-colors duration-150 btn-scale"
            >
              <ApperIcon name="Phone" className="w-4 h-4 mr-1" />
              Call
            </button>
          )}
          {contact.email && (
            <button
              onClick={handleEmail}
              className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors duration-150 btn-scale"
            >
              <ApperIcon name="Mail" className="w-4 h-4 mr-1" />
              Email
            </button>
          )}
          <button
            onClick={handleEdit}
            className="inline-flex items-center justify-center px-3 py-2 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 text-sm font-medium rounded-md transition-colors duration-150 btn-scale"
          >
            <ApperIcon name="Edit3" className="w-4 h-4" />
          </button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ContactCard;