import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <motion.div
        className="text-center space-y-8 max-w-lg mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* 404 Illustration */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
        >
          <div className="text-8xl font-bold text-primary-200 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
              <ApperIcon name="Search" className="w-10 h-10 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        <div className="space-y-4">
          <motion.h1
            className="text-3xl font-bold text-secondary-900"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Page Not Found
          </motion.h1>
          <motion.p
            className="text-lg text-secondary-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Sorry, we couldn't find the page you're looking for. 
            The page may have been moved or doesn't exist.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={() => navigate("/")}
            icon="Home"
            size="lg"
          >
            Go to Contact Hub
          </Button>
          <Button
            onClick={() => window.history.back()}
            variant="secondary"
            icon="ArrowLeft"
            size="lg"
          >
            Go Back
          </Button>
        </motion.div>

        {/* Help Text */}
        <motion.div
          className="pt-8 border-t border-secondary-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-secondary-500">
            Need help? Contact support or visit our help center for assistance.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;