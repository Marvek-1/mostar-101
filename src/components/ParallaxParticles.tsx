import React, { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
  blur: number;
  layer: number;
}

const ParallaxParticles: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [dimensions, setDimensions] = useState({ w: 1920, h: 5000 });

  useEffect(() => {
    const update = () => setDimensions({ w: window.innerWidth, h: document.body.scrollHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const particles = useMemo<Particle[]>(() => {
    const colors = [
      'hsl(195, 100%, 50%)',  // cyan
      'hsl(220, 80%, 60%)',   // blue
      'hsl(300, 70%, 50%)',   // magenta
      'hsl(160, 100%, 40%)',  // green
      'hsl(270, 60%, 55%)',   // purple
    ];
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.3 + 0.05,
      speed: (Math.random() - 0.5) * 2,
      color: colors[i % colors.length],
      blur: Math.random() * 2,
      layer: Math.floor(Math.random() * 3),
    }));
  }, []);

  // Three depth layers with different parallax speeds
  const y0 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  const layers = [y0, y1, y2];

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {[0, 1, 2].map((layer) => (
        <motion.div
          key={layer}
          style={{ y: layers[layer] }}
          className="absolute inset-0"
        >
          {particles
            .filter((p) => p.layer === layer)
            .map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  opacity: p.opacity,
                  background: p.color,
                  boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                  filter: `blur(${p.blur}px)`,
                }}
              />
            ))}
        </motion.div>
      ))}

      {/* Large ambient glow orbs for depth */}
      <motion.div style={{ y: y0 }} className="absolute inset-0">
        <div className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-[hsl(195,100%,50%)] opacity-[0.02] blur-[100px]" />
        <div className="absolute top-[45%] right-[15%] w-80 h-80 rounded-full bg-[hsl(300,70%,50%)] opacity-[0.02] blur-[120px]" />
        <div className="absolute top-[75%] left-[50%] w-72 h-72 rounded-full bg-[hsl(160,100%,40%)] opacity-[0.015] blur-[100px]" />
      </motion.div>
    </div>
  );
};

export default ParallaxParticles;
