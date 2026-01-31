import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const directionOffsets = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { y: 0, x: 60 },
    right: { y: 0, x: -60 },
  };

  const offset = directionOffsets[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: offset.y, x: offset.x }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: offset.y, x: offset.x }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const multiplier = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed * multiplier, -100 * speed * multiplier]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} className={className} style={{ y: smoothY }}>
      {children}
    </motion.div>
  );
};

interface ScrollProgressProps {
  className?: string;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ className = '' }) => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className={`fixed right-4 top-1/2 -translate-y-1/2 w-1 h-32 bg-white/10 rounded-full overflow-hidden z-50 ${className}`}
    >
      <motion.div
        className="w-full bg-gradient-to-b from-mostar-cyan via-mostar-light-blue to-mostar-magenta rounded-full origin-top"
        style={{ scaleY, height: '100%' }}
      />
    </motion.div>
  );
};

interface StickySectionProps {
  children: React.ReactNode;
  className?: string;
  height?: string;
}

export const StickySection: React.FC<StickySectionProps> = ({
  children,
  className = '',
  height = '200vh',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={ref} className={`relative ${className}`} style={{ height }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {typeof children === 'function' ? (children as (progress: any) => React.ReactNode)(scrollYProgress) : children}
      </div>
    </div>
  );
};

interface HologramRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const HologramReveal: React.FC<HologramRevealProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.8, rotateX: 15 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0, scale: 0.8, rotateX: 15 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      style={{ perspective: 1000 }}
    >
      {/* Holographic scan line effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: delay + 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-mostar-cyan/30 via-transparent to-transparent" />
      </motion.div>
      {children}
    </motion.div>
  );
};

interface Card3DRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}

export const Card3DReveal: React.FC<Card3DRevealProps> = ({
  children,
  className = '',
  delay = 0,
  index = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Staggered fly-in from different angles based on index
  const angles = [
    { rotateY: -25, rotateX: 10, x: -100 },
    { rotateY: 0, rotateX: 15, x: 0 },
    { rotateY: 25, rotateX: 10, x: 100 },
    { rotateY: -20, rotateX: -10, x: -80 },
    { rotateY: 0, rotateX: -15, x: 0 },
    { rotateY: 20, rotateX: -10, x: 80 },
  ];
  
  const angle = angles[index % angles.length];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        y: 80, 
        x: angle.x,
        rotateX: angle.rotateX, 
        rotateY: angle.rotateY,
        scale: 0.9
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        x: 0,
        rotateX: 0, 
        rotateY: 0,
        scale: 1
      } : { 
        opacity: 0, 
        y: 80, 
        x: angle.x,
        rotateX: angle.rotateX, 
        rotateY: angle.rotateY,
        scale: 0.9
      }}
      transition={{
        duration: 0.8,
        delay: delay + index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

interface FloatAnimationProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}

export const FloatAnimation: React.FC<FloatAnimationProps> = ({
  children,
  className = '',
  duration = 3,
  distance = 10,
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

interface GlowPulseProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export const GlowPulse: React.FC<GlowPulseProps> = ({
  children,
  className = '',
  color = 'mostar-cyan',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-20%' });

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      animate={isInView ? {
        boxShadow: [
          `0 0 20px rgba(0, 255, 255, 0.3)`,
          `0 0 40px rgba(0, 255, 255, 0.5)`,
          `0 0 20px rgba(0, 255, 255, 0.3)`,
        ],
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};
