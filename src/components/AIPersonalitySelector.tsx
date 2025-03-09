
import React from 'react';
import { Brain, Lightbulb, Shield, Rocket, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AIPersonality = 'analytical' | 'creative' | 'tactical' | 'galactic';

interface AIPersonalitySelectorProps {
  currentPersonality: AIPersonality;
  onChange: (personality: AIPersonality) => void;
  className?: string;
}

const personalities = [
  {
    id: 'analytical',
    name: 'Analytical',
    icon: <Brain className="h-4 w-4 text-mostar-light-blue" />,
    description: 'Focused on data processing and logical analysis'
  },
  {
    id: 'creative',
    name: 'Creative',
    icon: <Lightbulb className="h-4 w-4 text-mostar-cyan" />,
    description: 'Generates innovative solutions and ideas'
  },
  {
    id: 'tactical',
    name: 'Tactical',
    icon: <Shield className="h-4 w-4 text-mostar-green" />,
    description: 'Specialized in security and strategic planning'
  },
  {
    id: 'galactic',
    name: 'Galactic',
    icon: <Rocket className="h-4 w-4 text-mostar-magenta" />,
    description: 'Advanced multi-dimensional intelligence'
  }
];

const AIPersonalitySelector: React.FC<AIPersonalitySelectorProps> = ({ 
  currentPersonality, 
  onChange,
  className
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const currentPersonalityData = personalities.find(
    p => p.id === currentPersonality
  ) || personalities[0];

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-xs bg-black/30 border border-white/10 rounded-md px-2 py-1"
      >
        <span className="flex items-center">
          {currentPersonalityData.icon}
          <span className="ml-1">{currentPersonalityData.name}</span>
        </span>
        <ChevronDown className="h-3 w-3 text-white/50" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-1 right-0 z-50 w-48 bg-black/80 border border-white/10 rounded-md shadow-xl backdrop-blur-lg">
          <div className="p-1">
            {personalities.map((personality) => (
              <button
                key={personality.id}
                onClick={() => {
                  onChange(personality.id as AIPersonality);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full text-left rounded-sm px-2 py-1.5 text-xs flex items-center justify-between hover:bg-mostar-blue/10",
                  personality.id === currentPersonality && "bg-mostar-blue/20"
                )}
              >
                <span className="flex items-center">
                  {personality.icon}
                  <span className="ml-1.5 font-medium">{personality.name}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="border-t border-white/10 p-2">
            <p className="text-xs text-white/50">
              {currentPersonalityData.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPersonalitySelector;
