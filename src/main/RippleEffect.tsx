import { motion } from 'motion/react';
import { useState, useCallback } from 'react';

interface RippleProps {
  children: React.ReactNode;
  className?: string;
}

export function RippleEffect({ children, className = '' }: RippleProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const createRipple = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  }, []);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onClick={createRipple}
    >
      {children}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-4 h-4 bg-gradient-to-r from-blue-400/50 to-sky-300/50 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
      ))}
    </div>
  );
}