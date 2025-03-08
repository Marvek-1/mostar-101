
import React from 'react';
import { Globe, Server } from 'lucide-react';
import { AINode } from '../../../types/ai-hub';

interface NetworkTabProps {
  aiNodes: AINode[];
  isLoadingNodes: boolean;
}

const NetworkTab: React.FC<NetworkTabProps> = ({ aiNodes, isLoadingNodes }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h3 className="text-xl font-display font-bold mb-4 text-white">Global AI Network</h3>
        <div className="bg-black/20 rounded-lg p-4 border border-white/5 h-[400px]">
          <Globe />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="glassmorphism rounded-lg p-4">
            <h4 className="font-mono text-sm text-white/70 mb-2">Active Nodes</h4>
            <div className="text-3xl font-display text-mostar-light-blue">
              {isLoadingNodes ? '...' : aiNodes.length}
            </div>
            <div className="text-xs text-white/50 mt-1">+12% from last week</div>
          </div>
          <div className="glassmorphism rounded-lg p-4">
            <h4 className="font-mono text-sm text-white/70 mb-2">Data Processed</h4>
            <div className="text-3xl font-display text-mostar-cyan">
              1.8 PB
            </div>
            <div className="text-xs text-white/50 mt-1">+5% from yesterday</div>
          </div>
          <div className="glassmorphism rounded-lg p-4">
            <h4 className="font-mono text-sm text-white/70 mb-2">Response Time</h4>
            <div className="text-3xl font-display text-mostar-green">
              12ms
            </div>
            <div className="text-xs text-white/50 mt-1">-3ms improvement</div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-1">
        <h3 className="text-xl font-display font-bold mb-4 text-white">Node Status</h3>
        <div className="bg-black/20 rounded-lg border border-white/5 h-[500px] overflow-y-auto">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <span className="font-mono text-sm text-white/70">GLOBAL NODES</span>
            <button className="text-xs text-mostar-light-blue hover:text-mostar-cyan transition-colors">
              Refresh Data
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {isLoadingNodes ? (
              <div className="p-4 text-center text-white/50">Loading node data...</div>
            ) : (
              aiNodes.map((node, index) => (
                <div key={index} className="p-4 hover:bg-white/5 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${node.status === 'Active' ? 'bg-mostar-green' : 'bg-mostar-magenta'} mr-2`}></div>
                      <span className="font-mono text-sm">{node.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${node.status === 'Active' ? 'bg-mostar-green/10 text-mostar-green' : 'bg-mostar-magenta/10 text-mostar-magenta'}`}>
                      {node.status}
                    </span>
                  </div>
                  <div className="text-xs text-white/50 mb-2">
                    Location: {node.location}
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-mostar-blue to-mostar-cyan" 
                      style={{ width: `${node.performance}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-white/50">Performance</span>
                    <span className="text-xs text-white/70">{node.performance}%</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkTab;
