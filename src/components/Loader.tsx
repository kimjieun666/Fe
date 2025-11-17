import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-blue-950 flex items-center justify-center z-50"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="text-center">
        <motion.div
          className="relative mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-32 h-32 rounded-full border-4 border-blue-400/20 relative">
            <div className="absolute inset-4 rounded-full border-2 border-sky-300/30" />
            <div className="absolute inset-8 rounded-full border border-white/50" />
            <motion.div
              className="absolute top-2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2"
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
        
        <motion.h1
          className="text-4xl text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          COSMOS
        </motion.h1>
        
        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 to-sky-300 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
        
        <motion.p
          className="text-blue-100/50 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Exploring the universe...
        </motion.p>
      </div>
    </motion.div>
  );
}