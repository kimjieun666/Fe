import { motion } from 'motion/react';
import { useState } from 'react';
import { Menu, X, Star, Telescope, Rocket, Globe } from 'lucide-react';

type Props = {
  isAuthenticated?: boolean;
  collapseOnIdle?: boolean;
};

export function Navigation({ isAuthenticated, collapseOnIdle = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const navItems = [
    { name: 'Home', icon: Star, href: '/' },
    { name: 'About', icon: Telescope, href: '#explore' },
    { name: 'Team', icon: Globe, href: '#team' },
  ];

  const shouldCollapse = collapseOnIdle && !isHovering;

  const handleHoverStart = () => {
    if (collapseOnIdle) {
      setIsHovering(true);
    }
  };

  const handleHoverEnd = () => {
    if (collapseOnIdle) {
      setIsHovering(false);
    }
  };

  return (
    <>
      {collapseOnIdle && (
        <div
          className="fixed top-0 left-0 right-0 h-20 z-30"
          onMouseEnter={handleHoverStart}
          onMouseLeave={handleHoverEnd}
        />
      )}
    <motion.nav
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b transition-transform duration-300 ${
        shouldCollapse ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      } ${
        isAuthenticated
          ? 'bg-white/90 border-blue-400/10'
          : 'bg-black/70 border-blue-400/10'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.img
              src="/logo.png"
              alt="Work Hub logo"
              className="w-8 h-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <span className={`${isAuthenticated ? 'text-black' : 'text-white'} text-xl font-medium`}>WORK HUB</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`${isAuthenticated ? 'text-gray-800 hover:text-black' : 'text-blue-100/70 hover:text-sky-300'} flex items-center space-x-2 transition-colors`}
                whileHover={{ scale: 1.1, y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={`md:hidden ${isAuthenticated ? 'text-black' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-4">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 py-2 ${isAuthenticated ? 'text-gray-800 hover:text-black' : 'text-blue-100/70 hover:text-sky-300'}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
    </>
  );
}
