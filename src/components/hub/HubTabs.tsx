
import React from 'react';
import { Activity, Network, Shield, Brain, Terminal } from 'lucide-react';
import { toast } from 'sonner';
import { Zap } from 'lucide-react';

interface HubTabsProps {
  activeTab: string;
  handleTabChange: (tab: string) => void;
}

const HubTabs: React.FC<HubTabsProps> = ({ activeTab, handleTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Activity className="h-4 w-4" /> },
    { id: 'network', label: 'Global Network', icon: <Network className="h-4 w-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="h-4 w-4" /> },
    { id: 'analytics', label: 'AI Analytics', icon: <Brain className="h-4 w-4" /> },
    { id: 'command', label: 'Command Center', icon: <Terminal className="h-4 w-4" /> },
  ];

  const onTabChange = (tab: string) => {
    handleTabChange(tab);
    toast(`Accessing ${tab.charAt(0).toUpperCase() + tab.slice(1)} Module`, {
      icon: <Zap className="h-5 w-5 text-mostar-cyan" />,
    });
  };

  return (
    <div className="flex flex-wrap mb-6 border-b border-white/10 pb-4">
      {tabs.map((tab) => (
        <button 
          key={tab.id}
          onClick={() => onTabChange(tab.id)} 
          className={`px-4 py-2 mr-2 mb-2 rounded-md font-mono text-sm transition-all ${
            activeTab === tab.id ? 
              tab.id === 'overview' ? 'bg-mostar-blue/20 text-mostar-light-blue' : 
              tab.id === 'network' ? 'bg-mostar-green/20 text-mostar-green' :
              tab.id === 'security' ? 'bg-mostar-magenta/20 text-mostar-magenta' :
              tab.id === 'analytics' ? 'bg-mostar-cyan/20 text-mostar-cyan' :
              'bg-mostar-yellow/20 text-mostar-yellow' 
            : 'text-white/70 hover:text-white'
          }`}
        >
          <span className="flex items-center gap-2">
            {tab.icon}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default HubTabs;
