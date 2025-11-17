import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RippleEffect } from './RippleEffect';

const teamMembers = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Astrophysicist',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop',
    bio: 'Leading research in exoplanet discovery and characterization',
    speciality: 'Exoplanets'
  },
  {
    name: 'Dr. Marcus Rodriguez',
    role: 'Cosmologist',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    bio: 'Expert in dark matter and cosmic microwave background',
    speciality: 'Dark Matter'
  },
  {
    name: 'Dr. Aisha Patel',
    role: 'Planetary Scientist',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    bio: 'Studying planetary formation and atmospheric dynamics',
    speciality: 'Planetary Formation'
  },
  {
    name: 'Dr. James Thompson',
    role: 'Space Engineer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
    bio: 'Designing next-generation space exploration vehicles',
    speciality: 'Spacecraft Design'
  }
];

export function TeamSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black via-gray-900/30 to-blue-950/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl text-white font-medium mb-4">Our Cosmic Team</h2>
          <p className="text-blue-100/50 max-w-2xl mx-auto">
            Meet the brilliant minds pushing the boundaries of our understanding of the universe
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <RippleEffect className="bg-gray-900/40 rounded-xl p-6 backdrop-blur-sm border border-blue-400/10 hover:border-sky-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
                <motion.div
                  className="relative mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden relative">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-sky-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>
                  
                  {/* Floating cosmic particles */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-1.5 h-1.5 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      y: [0, -10, 0],
                      x: [0, 5, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-2 -left-2 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      y: [0, -8, 0],
                      x: [0, -3, 0],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />
                  <motion.div
                    className="absolute top-1/2 -right-3 w-0.5 h-0.5 bg-white rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      y: [0, -6, 0],
                      x: [0, 2, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </motion.div>

                <div className="text-center">
                  <h3 className="text-white text-lg font-medium mb-1">{member.name}</h3>
                  <p className="text-sky-300 text-sm mb-2">{member.role}</p>
                  <p className="text-blue-100/50 text-sm mb-3">{member.bio}</p>
                  
                  <motion.div
                    className="inline-block px-3 py-1 bg-gradient-to-r from-blue-950/40 to-sky-950/30 text-sky-200 text-xs font-medium rounded-full border border-blue-400/20"
                    whileHover={{ 
                      scale: 1.05, 
                      background: 'linear-gradient(to right, rgba(30, 58, 138, 0.6), rgba(12, 74, 110, 0.5))',
                      borderColor: 'rgba(56, 189, 248, 0.4)'
                    }}
                  >
                    {member.speciality}
                  </motion.div>
                </div>
              </RippleEffect>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}