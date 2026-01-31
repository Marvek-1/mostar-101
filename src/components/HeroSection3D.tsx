import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Trail, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

// Wireframe globe with glowing edges
const Globe: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Main wireframe sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#00a2ff"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Inner glow sphere */}
      <mesh ref={glowRef} scale={1.02}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
      
      {/* Outer glow */}
      <mesh scale={2.1}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#0039e6"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// Floating data nodes (256 Ifa patterns represented)
const DataNodes: React.FC<{ count: number }> = ({ count }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.5 + Math.random() * 1.5;
      
      temp.push({
        position: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        ] as [number, number, number],
        scale: 0.02 + Math.random() * 0.03,
        speed: 0.5 + Math.random() * 0.5,
        color: Math.random() > 0.5 ? '#00ffff' : '#00a2ff',
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={node.speed} rotationIntensity={0} floatIntensity={0.5}>
          <mesh position={node.position}>
            <sphereGeometry args={[node.scale, 8, 8]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.8} />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Orbital rings
const OrbitalRings: React.FC = () => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ring1Ref.current) ring1Ref.current.rotation.z += 0.003;
    if (ring2Ref.current) ring2Ref.current.rotation.x += 0.002;
    if (ring3Ref.current) ring3Ref.current.rotation.y += 0.004;
  });

  return (
    <group>
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00a2ff" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <torusGeometry args={[3.3, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <torusGeometry args={[3.6, 0.01, 16, 100]} />
        <meshBasicMaterial color="#f81ce5" transparent opacity={0.25} />
      </mesh>
    </group>
  );
};

// Africa continent hotspot
const AfricaHotspot: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      meshRef.current.scale.setScalar(scale);
    }
  });

  // Position roughly over Africa on the globe
  const position: [number, number, number] = [0.5, 0.8, 1.8];

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.8} />
      </mesh>
      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.12, 0.18, 32]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// Scene camera controller
const CameraController: React.FC = () => {
  const { camera } = useThree();
  
  useFrame((state) => {
    // Subtle camera movement based on mouse
    const x = state.pointer.x * 0.5;
    const y = state.pointer.y * 0.3;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, x, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, y + 1, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// Main 3D Scene
const Scene: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const particleCount = isMobile ? 64 : 256;

  return (
    <>
      <CameraController />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00a2ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#f81ce5" />
      
      <Stars
        radius={50}
        depth={50}
        count={isMobile ? 1000 : 3000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      
      <Globe />
      <DataNodes count={particleCount} />
      <OrbitalRings />
      <AfricaHotspot />
    </>
  );
};

// Hero content overlay
const HeroContent: React.FC = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
      <motion.div
        className="text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.span
          className="inline-block px-4 py-1.5 rounded-full bg-mostar-blue/10 border border-mostar-light-blue/30 text-mostar-light-blue font-mono text-xs mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          THE GRID AWAKENS — AFRICAN HEALTH SOVEREIGNTY
        </motion.span>
        
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <span className="bg-blue-magenta-gradient text-gradient">MoStar</span>
          <br />
          <span className="text-white text-4xl md:text-5xl lg:text-6xl">Industries</span>
        </motion.h1>
        
        <motion.p
          className="max-w-xl mx-auto text-white/70 text-lg md:text-xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          The first intelligence grid built on Ifa computational logic — 
          256 binary patterns for African health sovereignty.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <a
            href="#technologies"
            className="button-cyber inline-flex items-center justify-center gap-2"
          >
            <span className="relative z-10">Explore The Grid</span>
          </a>
          <a
            href="#dashboard"
            className="button-cyber inline-flex items-center justify-center gap-2 border-mostar-magenta/30"
          >
            <span className="relative z-10">View Live Intel</span>
          </a>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 2, duration: 0.5 },
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-mostar-cyan rounded-full animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
};

// Loading fallback
const LoadingFallback: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-mostar-dark">
    <div className="loading-logo" />
  </div>
);

// Main HeroSection3D component
const HeroSection3D: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            camera={{ position: [0, 1, 8], fov: 45 }}
            dpr={isMobile ? 1 : [1, 2]}
            gl={{ antialias: !isMobile, alpha: true }}
          >
            <Scene isMobile={isMobile} />
          </Canvas>
        </Suspense>
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-mostar-dark/30 via-transparent to-mostar-dark pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-mostar-dark/80 pointer-events-none" />
      
      {/* Hero Content */}
      <HeroContent />
      
      {/* Cyber grid overlay */}
      <div className="absolute inset-0 bg-cyber-grid bg-[length:30px_30px] opacity-[0.03] pointer-events-none" />
    </section>
  );
};

export default HeroSection3D;
