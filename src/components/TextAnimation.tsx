import { motion } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function FadeInText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {text}
    </motion.div>
  );
}

export function TypewriterText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  return (
    <motion.div className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05, delay: delay + index * 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function GlowText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  return (
    <motion.div
      className={`${className} relative`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
    >
      <motion.span
        className="relative z-10"
        animate={{
          textShadow: [
            '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(147, 197, 253, 0.3)',
            '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(147, 197, 253, 0.5), 0 0 40px rgba(255, 255, 255, 0.2)',
            '0 0 15px rgba(59, 130, 246, 0.6), 0 0 25px rgba(147, 197, 253, 0.4)',
            '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(147, 197, 253, 0.3)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
}

export function FloatingText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileInView={{
        y: [0, -10, 0],
      }}
      viewport={{ once: false }}
      style={{
        animation: 'float 3s ease-in-out infinite',
      }}
    >
      {text}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </motion.div>
  );
}