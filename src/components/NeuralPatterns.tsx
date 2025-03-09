
import React, { useEffect, useRef } from 'react';

interface NeuralPatternsProps {
  isActive: boolean;
  className?: string;
}

const NeuralPatterns: React.FC<NeuralPatternsProps> = ({ isActive, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const container = containerRef.current;
    const nodeCount = 5;
    const nodes: HTMLDivElement[] = [];
    
    // Create neural nodes
    for (let i = 0; i < nodeCount; i++) {
      const node = document.createElement('div');
      node.className = 'absolute w-1.5 h-1.5 rounded-full bg-mostar-light-blue/70 shadow-glow-blue';
      node.style.left = `${Math.random() * 100}%`;
      node.style.top = `${Math.random() * 100}%`;
      node.style.animationDelay = `${Math.random() * 2}s`;
      node.style.animationDuration = `${1 + Math.random() * 2}s`;
      container.appendChild(node);
      nodes.push(node);
    }
    
    // Create neural connections (SVG lines)
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'absolute inset-0 w-full h-full z-0');
    container.appendChild(svg);
    
    const lines: SVGLineElement[] = [];
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('stroke', 'rgba(0, 162, 255, 0.3)');
        line.setAttribute('stroke-width', '0.5');
        svg.appendChild(line);
        lines.push(line);
      }
    }
    
    // Animation frame
    let animationFrame: number;
    
    const updateLines = () => {
      let lineIndex = 0;
      
      for (let i = 0; i < nodes.length; i++) {
        const nodeI = nodes[i];
        const nodeIRect = nodeI.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeJ = nodes[j];
          const nodeJRect = nodeJ.getBoundingClientRect();
          
          const x1 = nodeIRect.left - containerRect.left + nodeIRect.width / 2;
          const y1 = nodeIRect.top - containerRect.top + nodeIRect.height / 2;
          const x2 = nodeJRect.left - containerRect.left + nodeJRect.width / 2;
          const y2 = nodeJRect.top - containerRect.top + nodeJRect.height / 2;
          
          lines[lineIndex].setAttribute('x1', x1.toString());
          lines[lineIndex].setAttribute('y1', y1.toString());
          lines[lineIndex].setAttribute('x2', x2.toString());
          lines[lineIndex].setAttribute('y2', y2.toString());
          
          lineIndex++;
        }
      }
      
      animationFrame = requestAnimationFrame(updateLines);
    };
    
    updateLines();
    
    return () => {
      cancelAnimationFrame(animationFrame);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [isActive]);
  
  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{ 
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}
    />
  );
};

export default NeuralPatterns;
