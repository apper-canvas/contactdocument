import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No contacts found", 
  message = "Get started by adding your first contact to build your professional network.",
  actionLabel = "Add Contact",
  onAction,
  showAction = true,
  icon = "Users"
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
      >
        <ApperIcon name={icon} className="w-10 h-10 text-primary-600" />
      </motion.div>

      <motion.h3
        className="text-2xl font-bold text-secondary-900 mb-3 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h3>

      <motion.p
        className="text-secondary-600 text-center max-w-md mb-8 text-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {message}
      </motion.p>

      {showAction && onAction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={onAction}
            icon="Plus"
            size="lg"
            variant="primary"
          >
            {actionLabel}
          </Button>
        </motion.div>
      )}

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-200 rounded-full opacity-50"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent-300 rounded-full opacity-60"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-accent-200 rounded-full opacity-50"></div>
      </div>
    </motion.div>
  );
};

export default Empty;