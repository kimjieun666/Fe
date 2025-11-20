import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageHoverProps {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export function ImageHover({ src, alt, title, description }: ImageHoverProps) {
  return (
    <motion.div
      className="relative group cursor-pointer overflow-hidden rounded-xl"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-64 w-full">
        <ImageWithFallback
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
        
        {/* Content */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          initial={{ y: "100%" }}
          whileHover={{ y: 0 }}
        >
          <h3 className="text-xl mb-2">{title}</h3>
          <p className="text-white/80">{description}</p>
        </motion.div>
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-all duration-1000"
          initial={{ x: "100%" }}
          whileHover={{ x: "-100%" }}
        />
      </div>
    </motion.div>
  );
}