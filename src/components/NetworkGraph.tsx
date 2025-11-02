// components/NetworkGraph.tsx
import React, { useEffect, useRef, useState } from 'react';

const NetworkGraph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    
    // MoStar Grid Nodes
    const nodes = [
      // Soul Layer
      { id: 'overlord', x: 0, y: 0, size: 8, color: '#FFD700', layer: 'soul', name: 'Overlord' },
      { id: 'woo', x: -60, y: -40, size: 6, color: '#FF6B35', layer: 'soul', name: 'Woo' },
      { id: 'flameborn-writer', x: 60, y: -40, size: 5, color: '#FF8C42', layer: 'soul', name: 'Flameborn Writer' },
      
      // Mind Layer
      { id: 'assessor', x: -80, y: 20, size: 6, color: '#4CC9F0', layer: 'mind', name: 'Assessor' },
      { id: 'oracle', x: -40, y: 60, size: 6, color: '#4361EE', layer: 'mind', name: 'Oracle' },
      { id: 'judge', x: 40, y: 60, size: 6, color: '#3A0CA3', layer: 'mind', name: 'Judge' },
      { id: 'tsatse-fly', x: 80, y: 20, size: 5, color: '#7209B7', layer: 'mind', name: 'TsaTse Fly' },
      { id: 'deepcal-core', x: 0, y: 80, size: 7, color: '#4895EF', layer: 'mind', name: 'DeepCAL Core' },
      
      // Body Layer
      { id: 'executor', x: 0, y: -80, size: 6, color: '#06D6A0', layer: 'body', name: 'Executor' },
      { id: 'code-conduit', x: -60, y: -80, size: 5, color: '#0DB39E', layer: 'body', name: 'Code Conduit' },
      
      // Meta Layer
      { id: 'radx-flb', x: 60, y: -120, size: 7, color: '#F72585', layer: 'meta', name: 'RAD-X-FLB' },
      { id: 'phoenix', x: -60, y: -120, size: 5, color: '#B5179E', layer: 'meta', name: 'Phoenix' }
    ];

    // Neural Links - Enhanced connections with data flow
    const connections = [
      // Soul Layer connections
      { source: 'overlord', target: 'woo', strength: 2, type: 'neural', dataFlow: 0.9 },
      { source: 'overlord', target: 'flameborn-writer', strength: 1, type: 'neural', dataFlow: 0.7 },
      
      // Mind Layer connections
      { source: 'assessor', target: 'judge', strength: 3, type: 'cognitive', dataFlow: 1.0 },
      { source: 'oracle', target: 'judge', strength: 2, type: 'cognitive', dataFlow: 0.85 },
      { source: 'tsatse-fly', target: 'assessor', strength: 2, type: 'monitoring', dataFlow: 0.95 },
      { source: 'deepcal-core', target: 'judge', strength: 2, type: 'cognitive', dataFlow: 0.9 },
      { source: 'deepcal-core', target: 'assessor', strength: 1, type: 'cognitive', dataFlow: 0.8 },
      
      // Body Layer connections
      { source: 'judge', target: 'executor', strength: 3, type: 'execution', dataFlow: 1.0 },
      { source: 'code-conduit', target: 'executor', strength: 2, type: 'execution', dataFlow: 0.9 },
      
      // Cross-layer neural links
      { source: 'overlord', target: 'assessor', strength: 1, type: 'command', dataFlow: 0.95 },
      { source: 'overlord', target: 'executor', strength: 2, type: 'command', dataFlow: 1.0 },
      { source: 'woo', target: 'flameborn-writer', strength: 2, type: 'neural', dataFlow: 0.8 },
      { source: 'radx-flb', target: 'executor', strength: 2, type: 'meta', dataFlow: 0.85 },
      { source: 'radx-flb', target: 'assessor', strength: 1, type: 'meta', dataFlow: 0.75 },
      { source: 'phoenix', target: 'overlord', strength: 1, type: 'meta', dataFlow: 0.9 },
      
      // Additional neural grid links
      { source: 'woo', target: 'oracle', strength: 1, type: 'neural', dataFlow: 0.7 },
      { source: 'executor', target: 'tsatse-fly', strength: 1, type: 'feedback', dataFlow: 0.8 },
      { source: 'oracle', target: 'deepcal-core', strength: 2, type: 'cognitive', dataFlow: 0.9 },
      { source: 'flameborn-writer', target: 'code-conduit', strength: 1, type: 'neural', dataFlow: 0.75 }
    ];

    // Link type colors
    const linkColors: { [key: string]: string } = {
      neural: '#FF6B35',
      cognitive: '#4CC9F0',
      execution: '#06D6A0',
      command: '#FFD700',
      meta: '#F72585',
      monitoring: '#7209B7',
      feedback: '#4361EE'
    };

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = Math.min(canvas.width, canvas.height) / 300;
      
      // Draw neural links with data flow animation
      connections.forEach((conn, idx) => {
        const source = nodes.find(n => n.id === conn.source);
        const target = nodes.find(n => n.id === conn.target);
        
        if (source && target) {
          const sourceX = centerX + source.x * scale;
          const sourceY = centerY + source.y * scale;
          const targetX = centerX + target.x * scale;
          const targetY = centerY + target.y * scale;
          
          // Animated neural link with pulse
          const pulse = Math.sin(time * 2 + idx * 0.5) * 0.3 + 0.7;
          const linkColor = linkColors[conn.type] || '#FFFFFF';
          
          // Draw main link
          ctx.beginPath();
          ctx.moveTo(sourceX, sourceY);
          ctx.lineTo(targetX, targetY);
          ctx.strokeStyle = linkColor + Math.floor(0.15 * pulse * 255).toString(16).padStart(2, '0');
          ctx.lineWidth = conn.strength * pulse;
          ctx.stroke();
          
          // Draw data flow particles
          const flowProgress = (time * conn.dataFlow + idx * 0.3) % 1;
          const particleX = sourceX + (targetX - sourceX) * flowProgress;
          const particleY = sourceY + (targetY - sourceY) * flowProgress;
          
          ctx.beginPath();
          ctx.arc(particleX, particleY, 2 * scale, 0, 2 * Math.PI);
          ctx.fillStyle = linkColor;
          ctx.shadowColor = linkColor;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
          
          // Draw signal strength indicator
          if (conn.dataFlow > 0.85) {
            const midX = (sourceX + targetX) / 2;
            const midY = (sourceY + targetY) / 2;
            const signalSize = 1.5 + Math.sin(time * 4 + idx) * 0.5;
            
            ctx.beginPath();
            ctx.arc(midX, midY, signalSize, 0, 2 * Math.PI);
            ctx.fillStyle = linkColor + '40';
            ctx.fill();
          }
        }
      });
      
      // Draw nodes
      nodes.forEach(node => {
        const x = centerX + node.x * scale;
        const y = centerY + node.y * scale;
        const time = Date.now() * 0.001;
        
        // Pulsing effect
        const pulse = 1 + Math.sin(time * 2 + node.x) * 0.1;
        const size = node.size * scale * pulse;
        
        // Main node
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fillStyle = node.color;
        
        // Glow effect
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Pulsing ring for important nodes
        if (['overlord', 'deepcal-core', 'radx-flb'].includes(node.id)) {
          ctx.beginPath();
          const ringSize = size + 4 + Math.sin(time * 4) * 2;
          ctx.arc(x, y, ringSize, 0, 2 * Math.PI);
          ctx.strokeStyle = node.color + '80';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        
        // Node label
        if (scale > 1.5) {
          ctx.font = '12px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(node.name, x, y + size + 5);
        }
      });
      
      // Add floating data particles
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2 + time * 0.5;
        const radius = 150 * scale;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(76, 201, 240, ${0.5 + Math.sin(time + i) * 0.3})`;
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start
    window.addEventListener('resize', handleResize);
    handleResize();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default NetworkGraph;
