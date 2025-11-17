import { motion } from 'motion/react';
import { TypewriterText, GlowText } from './TextAnimation';
import { RippleEffect } from './RippleEffect';

export function HeroSection() {
  return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Deep space background */}
        <div className="absolute inset-0 bg-black">
        {/* Stars field */}
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Distant galaxy clouds */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-900/15 to-purple-900/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 120, 240, 360],
            x: [0, 50, -30, 0],
            y: [0, -20, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-indigo-900/20 to-blue-950/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.4, 1.2],
            rotate: [360, 240, 120, 0],
            x: [0, -40, 20, 0],
            y: [0, 30, -25, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-gray-800/10 to-blue-900/8 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.5, 1.2, 1],
            x: [0, 30, -20, 0],
            y: [0, -40, 30, 0],
            opacity: [0.1, 0.3, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Deep space dust */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-950/5 to-transparent"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 0.5, -0.5, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <GlowText
            text="EXPLORE THE WORK HUB"
            className="text-6xl md:text-8xl text-white font-medium mb-6"
            delay={1}
          />
        </motion.div>

        <TypewriterText
          text="모든 프로젝트의 중심이 되는 공간"
          className="text-xl md:text-2xl text-blue-100/60 mb-8"
          delay={2}
        />

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3 }}
        >
          <RippleEffect className="inline-block">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-medium rounded-full hover:from-blue-700 hover:to-sky-600 transition-all duration-300 shadow-lg shadow-blue-500/20"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              Sign in
            </motion.button>
          </RippleEffect>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-sky-400/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-sky-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
