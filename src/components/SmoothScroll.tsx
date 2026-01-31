import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ScrollProgress } from './ScrollAnimations';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <>
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Section Navigation Dots */}
      <SectionDots />
      
      {/* Main Content */}
      <div className="relative">
        {children}
      </div>
    </>
  );
};

const SectionDots: React.FC = () => {
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'technologies', label: 'Technologies' },
    { id: 'agents', label: 'Agents' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'vision', label: 'Vision' },
    { id: 'get-involved', label: 'Get Involved' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {sections.map((section, index) => (
        <motion.button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative flex items-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-2 h-2 rounded-full bg-white/30 group-hover:bg-mostar-cyan transition-colors duration-300" />
          <span className="absolute left-6 text-xs font-mono text-white/0 group-hover:text-white/70 transition-all duration-300 whitespace-nowrap">
            {section.label}
          </span>
        </motion.button>
      ))}
    </motion.nav>
  );
};

export default SmoothScroll;
