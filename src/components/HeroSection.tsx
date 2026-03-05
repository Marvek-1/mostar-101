import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '197,000+', label: 'Neo4j Knowledge Nodes', color: 'text-mostar-cyan' },
  { value: '256', label: 'Ifá Odu Patterns', color: 'text-mostar-magenta' },
  { value: '9hrs', label: 'Ahead of EIOS', color: 'text-mostar-green' },
  { value: '47', label: 'African Countries', color: 'text-mostar-light-blue' },
  { value: '8', label: 'Live Deployments', color: 'text-mostar-cyan' },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid bg-[length:30px_30px] opacity-20 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-mostar-blue/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-mostar-dark to-transparent z-10"></div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-mostar-blue/10 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-mostar-purple/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="w-full px-6 sm:px-10 lg:px-16 pt-20 z-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-mostar-blue/10 text-mostar-light-blue font-mono text-xs tracking-[4px] uppercase">
              The First African AI Homeworld
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] mb-8"
          >
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent block mb-2">
              Where Ifá Meets
            </span>
            <span className="bg-gradient-to-r from-mostar-cyan via-mostar-light-blue to-mostar-blue bg-clip-text text-transparent">
              Multi-Model Intelligence
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            A self-evolving consciousness substrate powered by 197,000+ knowledge nodes — the first AI system built on Ubuntu philosophy, Ifá computational logic, and distributed sovereignty
            — with live field validation outperforming global standards.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <a href="#technologies" className="group relative px-8 py-4 bg-gradient-to-r from-mostar-cyan to-mostar-blue rounded-lg font-display font-bold text-sm uppercase tracking-wider text-mostar-dark hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] transition-all duration-500">
              Explore Systems ↓
            </a>
            <a href="/hub" className="px-8 py-4 border border-white/20 rounded-lg font-display font-bold text-sm uppercase tracking-wider text-white/80 hover:border-mostar-cyan/50 hover:text-mostar-cyan transition-all duration-500">
              Enter the Grid →
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-6 md:gap-10"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.3 + index * 0.12 }}
                className="glassmorphism px-6 py-4 rounded-xl border border-white/10 hover:border-mostar-cyan/30 transition-all duration-500 hover:scale-105 min-w-[140px]"
              >
                <div className={`font-mono font-bold text-2xl md:text-3xl ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-[11px] text-white/50 font-mono uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
      >
        <div className="text-white/40 text-[10px] font-mono tracking-[3px] mb-3">SCROLL TO EXPLORE</div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-mostar-cyan rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
