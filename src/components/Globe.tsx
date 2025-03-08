
import React, { useEffect, useRef } from 'react';

const Globe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Center coordinates
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Globe radius
    const radius = Math.min(centerX, centerY) * 0.8;
    
    // Animation variables
    let rotation = 0;
    const dataPoints: Array<{x: number, y: number, size: number, speed: number, color: string}> = [];
    
    // Create random data points
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * radius * 0.8 + radius * 0.2;
      dataPoints.push({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.01 + 0.005,
        color: [
          '#4CC9F0', // mostar-light-blue
          '#4361EE', // mostar-blue
          '#3A0CA3', // mostar-purple
          '#7209B7', // mostar-magenta
          '#06D6A0'  // mostar-green
        ][Math.floor(Math.random() * 5)]
      });
    }
    
    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Rotate
      rotation += 0.002;
      
      // Draw grid lines (latitude)
      for (let i = 0; i < 10; i++) {
        const latRadius = radius * (i + 1) / 10;
        ctx.beginPath();
        ctx.arc(centerX, centerY, latRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(67, 97, 238, 0.2)'; // mostar-blue
        ctx.stroke();
      }
      
      // Draw grid lines (longitude)
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        const x = centerX + Math.cos(angle + rotation) * radius;
        const y = centerY + Math.sin(angle + rotation) * radius;
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(67, 97, 238, 0.2)'; // mostar-blue
        ctx.stroke();
      }
      
      // Draw globe outline
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(76, 201, 240, 0.6)'; // mostar-light-blue
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.lineWidth = 1;
      
      // Draw data points
      dataPoints.forEach(point => {
        // Rotate point
        const rotatedX = 
          centerX + 
          (point.x * Math.cos(rotation) - point.y * Math.sin(rotation));
        const rotatedY = 
          centerY + 
          (point.x * Math.sin(rotation) + point.y * Math.cos(rotation));
        
        // Draw point
        ctx.beginPath();
        ctx.arc(rotatedX, rotatedY, point.size, 0, Math.PI * 2);
        ctx.fillStyle = point.color;
        ctx.fill();
        
        // Draw glow
        ctx.beginPath();
        ctx.arc(rotatedX, rotatedY, point.size * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          rotatedX, rotatedY, point.size,
          rotatedX, rotatedY, point.size * 2
        );
        gradient.addColorStop(0, point.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw random data lines between some points
        if (Math.random() > 0.99) {
          const targetIndex = Math.floor(Math.random() * dataPoints.length);
          const target = dataPoints[targetIndex];
          
          const targetX = 
            centerX + 
            (target.x * Math.cos(rotation) - target.y * Math.sin(rotation));
          const targetY = 
            centerY + 
            (target.x * Math.sin(rotation) + target.y * Math.cos(rotation));
          
          ctx.beginPath();
          ctx.moveTo(rotatedX, rotatedY);
          ctx.lineTo(targetX, targetY);
          ctx.strokeStyle = point.color;
          ctx.stroke();
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      // Cleanup if needed
    };
  }, []);
  
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 10px rgba(76, 201, 240, 0.5))' }}
      />
      {/* Additional decorative elements */}
      <div className="absolute w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-mostar-light-blue rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-mostar-green rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-mostar-magenta rounded-full animate-ping" style={{ animationDuration: '5s' }}></div>
      </div>
    </div>
  );
};

export default Globe;
