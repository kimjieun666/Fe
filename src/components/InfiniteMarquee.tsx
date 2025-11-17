import { motion } from 'motion/react';

const cosmicFacts = [
  '🌌 The observable universe contains over 2 trillion galaxies',
  '⭐ Stars are born in stellar nurseries called nebulae',
  '🌍 Earth is 4.54 billion years old',
  '🚀 Light from the nearest star takes 4.37 years to reach us',
  '🕳️ Black holes warp space and time around them',
  '🌙 The Moon is slowly moving away from Earth',
  '☄️ Comets are ancient time capsules from the early solar system',
  '🪐 Saturn could float in water due to its low density',
  '🌟 Our Sun converts 4 million tons of matter into energy every second',
  '🌠 Meteor showers occur when Earth passes through comet debris'
];

export function InfiniteMarquee() {
  return (
    <div className="py-12 bg-gradient-to-r from-gray-900/60 via-black to-blue-950/40 overflow-hidden border-y border-blue-400/10">
      <motion.div
        className="flex space-x-8 whitespace-nowrap"
        animate={{ x: [-1000, 1000] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...cosmicFacts, ...cosmicFacts].map((fact, index) => (
          <motion.span
            key={index}
            className="text-blue-100/60 text-lg font-medium inline-block"
            whileHover={{ 
              scale: 1.1,
              color: '#38bdf8',
              textShadow: '0 0 10px rgba(56, 189, 248, 0.6), 0 0 20px rgba(59, 130, 246, 0.3), 0 0 30px rgba(255, 255, 255, 0.1)'
            }}
          >
            {fact}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}