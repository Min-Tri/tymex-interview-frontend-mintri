import { Spin } from 'antd';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-[#0a0a1a] z-50"
    >
      <div className="text-center">
        <Spin size="large" />
        <p className="mt-4 text-gray-400">Loading...</p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;