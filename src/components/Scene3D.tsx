import React, { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

// Neural network node
interface NodeData {
  position: THREE.Vector3;
  connections: number[];
  color: string;
  scale: number;
}

const NeuralNode: React.FC<{ 
  position: THREE.Vector3; 
  color: string; 
  scale: number;
  scrollProgress: number;
}> = ({ position, color, scale, scrollProgress }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Pulse effect
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + position.x) * 0.1;
      meshRef.current.scale.setScalar(scale * pulse);
      
      // Move based on scroll
      const scrollOffset = (scrollProgress - 0.5) * 2;
      meshRef.current.position.z = position.z + scrollOffset * 3;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      {/* Glow effect */}
      <mesh position={position}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </Float>
  );
};

// Connection lines between nodes
const ConnectionLine: React.FC<{
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
  scrollProgress: number;
}> = ({ start, end, color, scrollProgress }) => {
  const lineRef = useRef<THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>>(null);
  
  const geometry = useMemo(() => {
    const points = [start, end];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [start, end]);

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.2 });
  }, [color]);

  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.material.opacity = 0.15 + Math.sin(scrollProgress * Math.PI) * 0.15;
    }
  });

  return (
    <primitive object={new THREE.Line(geometry, material)} ref={lineRef} />
  );
};

// Neural Network visualization
const NeuralNetwork: React.FC<{ nodeCount: number; scrollProgress: number }> = ({ 
  nodeCount, 
  scrollProgress 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const { nodes, connections } = useMemo(() => {
    const nodesList: NodeData[] = [];
    const connectionsList: { start: number; end: number }[] = [];
    
    const colors = ['#00ffff', '#00a2ff', '#f81ce5', '#6b46c1', '#00ff9d'];
    
    // Create nodes in a spherical distribution
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 8 + Math.random() * 6;
      
      nodesList.push({
        position: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta) - 2,
          radius * Math.cos(phi) - 5
        ),
        connections: [],
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: 0.8 + Math.random() * 0.4,
      });
    }
    
    // Create connections between nearby nodes
    for (let i = 0; i < nodesList.length; i++) {
      for (let j = i + 1; j < nodesList.length; j++) {
        const dist = nodesList[i].position.distanceTo(nodesList[j].position);
        if (dist < 4 && Math.random() > 0.7) {
          connectionsList.push({ start: i, end: j });
          nodesList[i].connections.push(j);
          nodesList[j].connections.push(i);
        }
      }
    }
    
    return { nodes: nodesList, connections: connectionsList };
  }, [nodeCount]);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle rotation
      groupRef.current.rotation.y += 0.0005;
      
      // Scale based on scroll position
      const scale = 0.8 + Math.sin(scrollProgress * Math.PI * 2) * 0.2;
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      {connections.map((conn, i) => (
        <ConnectionLine
          key={`conn-${i}`}
          start={nodes[conn.start].position}
          end={nodes[conn.end].position}
          color="#00a2ff"
          scrollProgress={scrollProgress}
        />
      ))}
      
      {/* Nodes */}
      {nodes.map((node, i) => (
        <NeuralNode
          key={`node-${i}`}
          position={node.position}
          color={node.color}
          scale={node.scale}
          scrollProgress={scrollProgress}
        />
      ))}
    </group>
  );
};

// Fog/atmosphere effect
const Atmosphere: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      // Change fog color based on scroll
      const hue = 200 + scrollProgress * 60;
      material.color.setHSL(hue / 360, 0.8, 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -20]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color="#0a0e17" transparent opacity={0.95} />
    </mesh>
  );
};

// Main scene component
const Scene: React.FC<{ isMobile: boolean; scrollProgress: number }> = ({ 
  isMobile, 
  scrollProgress 
}) => {
  const nodeCount = isMobile ? 30 : 80;

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#00a2ff" />
      <pointLight position={[-10, -10, 5]} intensity={0.2} color="#f81ce5" />
      
      <Atmosphere scrollProgress={scrollProgress} />
      <NeuralNetwork nodeCount={nodeCount} scrollProgress={scrollProgress} />
    </>
  );
};

// Main Scene3D component - fixed background
const Scene3D: React.FC = () => {
  const isMobile = useIsMobile();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / scrollHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          dpr={isMobile ? 1 : [1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        >
          <Scene isMobile={isMobile} scrollProgress={scrollProgress} />
        </Canvas>
      </Suspense>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-mostar-dark/60 via-mostar-dark/40 to-mostar-dark/60" />
    </div>
  );
};

export default Scene3D;
