import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader } from './components/Loader';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ImageGrid } from './components/ImageGrid';
import { TeamSection } from './components/TeamSection';
import { FadeInText } from './components/TextAnimation';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navigation />
            
            <main>
              <HeroSection />
              
              <motion.section
                id="explore"
                className="py-20 px-4 bg-black"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="max-w-4xl mx-auto text-center">
                  <FadeInText
                    text="프로젝트 관리의 새로운 표준을 제시합니다"
                    className="text-4xl text-white font-medium mb-6"
                  />
                  <FadeInText
                    text={`계약부터 납품까지, 모든 과정을 하나의 체계 안에서 정확하고 투명하게 운영하세요.
각 승인, 기록, 자료가 명확히 축적되어 고객사와의 협업 품질을 한 단계 높입니다.`}
                    className="text-blue-100/70 text-lg leading-relaxed whitespace-pre-line"
                    delay={0.3}
                  />
                </div>
                
                {/* Floating cosmic dust effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-0.5 h-0.5 bg-white/60 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
              </motion.section>

              <ImageGrid />
              
              <TeamSection />
              
              <motion.footer
                className="py-12 px-4 bg-gradient-to-b from-black via-gray-900/40 to-blue-950/40"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="max-w-7xl mx-auto text-center">
                  <motion.div
                    className="flex items-center justify-center space-x-2 mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.img
                      src="/logo.png"
                      alt="Work Hub logo"
                      className="w-8 h-8"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="text-white text-xl font-medium">WORK HUB</span>
                  </motion.div>
                  <p className="text-blue-100/50">
                    © 2025 Work Hub. Guiding your project from contract to delivery with precision.
                  </p>
                  
                  {/* Deep space particles */}
                  <div className="mt-8 flex justify-center space-x-6">
                    <motion.div
                      className="w-2 h-2 bg-blue-400 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3],
                        boxShadow: [
                          '0 0 0px rgba(59, 130, 246, 0)',
                          '0 0 20px rgba(59, 130, 246, 0.6)',
                          '0 0 0px rgba(59, 130, 246, 0)'
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0,
                      }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 bg-sky-400 rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 1, 0.3],
                        boxShadow: [
                          '0 0 0px rgba(56, 189, 248, 0)',
                          '0 0 15px rgba(56, 189, 248, 0.6)',
                          '0 0 0px rgba(56, 189, 248, 0)'
                        ],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: 0.5,
                      }}
                    />
                    <motion.div
                      className="w-1 h-1 bg-white rounded-full"
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.4, 1, 0.4],
                        boxShadow: [
                          '0 0 0px rgba(255, 255, 255, 0)',
                          '0 0 10px rgba(255, 255, 255, 0.8)',
                          '0 0 0px rgba(255, 255, 255, 0)'
                        ],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay: 1,
                      }}
                    />
                  </div>
                </div>
              </motion.footer>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
