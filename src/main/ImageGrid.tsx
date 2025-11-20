import { motion } from 'motion/react';
import { ImageHover } from './ImageHover';

const cosmicImages = [
  {
    src: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500&h=500&fit=crop',
    alt: 'Galaxy',
    title: 'Distant Galaxy',
    description: 'A spiral galaxy millions of light-years away'
  },
  {
    src: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&h=500&fit=crop',
    alt: 'Nebula',
    title: 'Cosmic Nebula',
    description: 'A stellar nursery where new stars are born'
  },
  {
    src: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500&h=500&fit=crop',
    alt: 'Planet',
    title: 'Exoplanet',
    description: 'A planet orbiting a distant star'
  },
  {
    src: 'https://images.unsplash.com/photo-1614314149691-52f1ac2c9c40?w=500&h=500&fit=crop',
    alt: 'Astronaut',
    title: 'Space Explorer',
    description: 'Human exploration of the Work Hub'
  },
  {
    src: 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?w=500&h=500&fit=crop',
    alt: 'Solar System',
    title: 'Solar System',
    description: 'Our Work Hub'
  },
  {
    src: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=500&h=500&fit=crop',
    alt: 'Black Hole',
    title: 'Black Hole',
    description: 'The mysterious heart of darkness'
  }
];

export function ImageGrid() {
  return (
    <section className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cosmicImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ImageHover {...image} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}