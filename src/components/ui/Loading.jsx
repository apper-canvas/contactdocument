import { motion } from "framer-motion";

const Loading = ({ message = "Loading contacts..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-3 h-3 bg-primary-500 rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
      
      <motion.p
        className="text-secondary-600 mt-4 text-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </motion.p>

      {/* Contact Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 w-full max-w-6xl">
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg p-6 shadow-sm animate-pulse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-secondary-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-secondary-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-secondary-200 rounded mr-2"></div>
                <div className="h-3 bg-secondary-200 rounded w-2/3"></div>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-secondary-200 rounded mr-2"></div>
                <div className="h-3 bg-secondary-200 rounded w-3/4"></div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <div className="flex-1 h-8 bg-secondary-200 rounded"></div>
              <div className="flex-1 h-8 bg-secondary-200 rounded"></div>
              <div className="w-8 h-8 bg-secondary-200 rounded"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;