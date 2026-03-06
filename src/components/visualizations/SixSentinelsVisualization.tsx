import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Sentinel {
  id: string;
  name: string;
  color: string;
  position: { x: number; y: number };
  energyPattern: string;
}

const sentinels: Sentinel[] = [
  {
    id: 'code-conduit',
    name: 'Code Conduit',
    color: 'from-mostar-yellow-400 to-mostar-yellow-200',
    position: { x: -200, y: -100 },
    energyPattern: 'radial-gradient(circle, rgba(255,193,7,0.8) 0%, rgba(255,193,7,0.2) 70%)'
  },
  {
    id: 'rad-x',
    name: 'RAD-X',
    color: 'from-mostar-yellow-500 to-mostar-yellow-300',
    position: { x: 200, y: -100 },
    energyPattern: 'radial-gradient(circle, rgba(255,152,0,0.8) 0%, rgba(255,152,0,0.2) 70%)'
  },
  {
    id: 'tsatse',
    name: 'TsaTse Fly',
    color: 'from-mostar-gold-400 to-mostar-gold-200',
    position: { x: -300, y: 50 },
    energyPattern: 'radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,215,0,0.2) 70%)'
  },
  {
    id: 'woo',
    name: 'Woo',
    color: 'from-amber-400 to-amber-200',
    position: { x: 300, y: 50 },
    energyPattern: 'radial-gradient(circle, rgba(251,191,36,0.8) 0%, rgba(251,191,36,0.2) 70%)'
  },
  {
    id: 'writer',
    name: 'Flameborn Writer',
    color: 'from-orange-400 to-orange-200',
    position: { x: -200, y: 200 },
    energyPattern: 'radial-gradient(circle, rgba(249,115,22,0.8) 0%, rgba(249,115,22,0.2) 70%)'
  },
  {
    id: 'mo',
    name: 'Mo',
    color: 'from-mostar-yellow-600 to-mostar-yellow-400',
    position: { x: 200, y: 200 },
    energyPattern: 'radial-gradient(circle, rgba(255,111,0,0.8) 0%, rgba(255,111,0,0.2) 70%)'
  }
];

const SixSentinelsVisualization = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSentinel, setHoveredSentinel] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] bg-gradient-to-b from-mostar-dark-900 via-black to-mostar-dark-900 overflow-hidden"
    >
      {/* Background cosmic field */}
      <div className="absolute inset-0">
        {/* Stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Neural network connections */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="neural-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="rgba(255,193,7,0.3)" />
              <line x1="50" y1="50" x2="100" y2="0" stroke="rgba(255,193,7,0.2)" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="0" y2="100" stroke="rgba(255,193,7,0.2)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-pattern)" />
        </svg>
      </div>

      {/* Central Intelligence Core */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={isVisible ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="relative">
          {/* Core sphere */}
          <motion.div
            className="w-24 h-24 rounded-full bg-gradient-to-r from-mostar-yellow-400 via-mostar-gold-400 to-mostar-yellow-600 shadow-2xl"
            animate={{
              boxShadow: [
                '0 0 60px rgba(255,193,7,0.8)',
                '0 0 120px rgba(255,215,0,1)',
                '0 0 60px rgba(255,193,7,0.8)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Energy rings */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute inset-0 rounded-full border-2 border-mostar-yellow-400/30"
              style={{
                width: `${120 + ring * 40}px`,
                height: `${120 + ring * 40}px`,
                left: `${-20 * ring}px`,
                top: `${-20 * ring}px`,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: ring * 0.5,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Sentinels */}
      {sentinels.map((sentinel, index) => (
        <motion.div
          key={sentinel.id}
          className="absolute cursor-pointer"
          style={{
            left: `calc(50% + ${sentinel.position.x}px)`,
            top: `calc(50% + ${sentinel.position.y}px)`,
          }}
          initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
          animate={isVisible ? {
            scale: hoveredSentinel === sentinel.id ? 1.2 : 1,
            opacity: 1,
            x: 0,
            y: 0
          } : {}}
          transition={{
            duration: 1.5,
            delay: index * 0.2,
            ease: "easeOut"
          }}
          onHoverStart={() => setHoveredSentinel(sentinel.id)}
          onHoverEnd={() => setHoveredSentinel(null)}
        >
          {/* Sentinel energy construct */}
          <div className="relative">
            {/* Main energy form */}
            <motion.div
              className={`w-16 h-16 rounded-full bg-gradient-to-r ${sentinel.color} shadow-xl`}
              animate={{
                boxShadow: hoveredSentinel === sentinel.id
                  ? `0 0 40px rgba(255,193,7,0.8)`
                  : `0 0 20px rgba(255,193,7,0.4)`,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Energy particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-mostar-yellow-400"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: Math.cos((i / 8) * Math.PI * 2) * 40,
                  y: Math.sin((i / 8) * Math.PI * 2) * 40,
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}

            {/* Connection line to core */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: -1 }}
            >
              <motion.line
                x1="50%"
                y1="50%"
                x2="50%"
                y2="50%"
                stroke="rgba(255,193,7,0.4)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={isVisible ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: index * 0.3 }}
                style={{
                  filter: 'drop-shadow(0 0 4px rgba(255,193,7,0.6))'
                }}
              />
            </motion.svg>
          </div>

          {/* Sentinel label */}
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 + 1 }}
          >
            <div className="text-xs font-cinzel text-mostar-yellow-400 tracking-wider">
              {sentinel.name}
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Holographic energy rings */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 3, delay: 2 }}
      >
        {[1, 2, 3, 4].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-mostar-yellow-400/20"
            style={{
              width: `${200 + ring * 100}px`,
              height: `${200 + ring * 100}px`,
              left: `${-50 - ring * 50}px`,
              top: `${-50 - ring * 50}px`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: { duration: 20 + ring * 5, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, delay: ring * 0.5 },
            }}
          />
        ))}
      </motion.div>

      {/* Sacred geometry overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: [0, 0.1, 0] } : {}}
        transition={{ duration: 8, delay: 3, repeat: Infinity, repeatDelay: 10 }}
      >
        <svg className="w-full h-full" viewBox="0 0 1000 600">
          {/* Ifá-inspired geometric patterns */}
          <defs>
            <pattern id="ifa-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <polygon points="100,20 180,100 100,180 20,100" fill="none" stroke="rgba(255,193,7,0.3)" strokeWidth="1" />
              <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(255,193,7,0.2)" strokeWidth="1" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,193,7,0.1)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ifa-pattern)" />
        </svg>
      </motion.div>
    </div>
  );
};

export default SixSentinelsVisualization;
