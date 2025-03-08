
import React from 'react';

const CommandTab = () => {
  return (
    <div>
      <h3 className="text-xl font-display font-bold mb-4 text-white">Interactive AI Command Center</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-black/20 rounded-lg p-6 border border-white/5 h-[350px] flex flex-col">
            <div className="mb-4 font-mono text-xs text-white/70 border-b border-white/10 pb-2">
              AI COMMAND TERMINAL
            </div>
            <div className="flex-grow font-mono text-sm text-white/90 bg-black/30 rounded p-4 overflow-y-auto">
              <p className="text-mostar-green mb-2">// AI assistant initialized</p>
              <p className="text-mostar-cyan mb-2">// Welcome to MoStar Command Center</p>
              <p className="text-mostar-light-blue mb-2">// Type 'help' for available commands</p>
              <p className="text-white/50 mb-2">// Real-time AI assistance ready...</p>
              <p className="text-mostar-magenta mb-2">// Connected to Supabase backend</p>
              <p className="text-mostar-yellow mb-2">// Quantum processing unit online</p>
            </div>
            <div className="mt-4 flex">
              <span className="font-mono text-mostar-light-blue mr-2">&gt;</span>
              <input 
                type="text" 
                className="bg-black/30 border-none outline-none text-white font-mono text-sm flex-grow focus:ring-1 focus:ring-mostar-light-blue/30"
                placeholder="Enter command (e.g., 'status', 'help', 'analyze')"
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-black/20 rounded-lg p-4 border border-white/5">
            <h4 className="font-mono text-sm text-white/70 mb-4">Command Reference</h4>
            <div className="space-y-3">
              <div className="p-2 rounded bg-white/5 hover:bg-white/10 transition-colors">
                <div className="font-mono text-xs text-mostar-light-blue mb-1">status</div>
                <p className="text-xs text-white/70">Display current system status</p>
              </div>
              <div className="p-2 rounded bg-white/5 hover:bg-white/10 transition-colors">
                <div className="font-mono text-xs text-mostar-cyan mb-1">analyze [data]</div>
                <p className="text-xs text-white/70">Run analysis on specified dataset</p>
              </div>
              <div className="p-2 rounded bg-white/5 hover:bg-white/10 transition-colors">
                <div className="font-mono text-xs text-mostar-green mb-1">secure [protocol]</div>
                <p className="text-xs text-white/70">Activate security protocol</p>
              </div>
              <div className="p-2 rounded bg-white/5 hover:bg-white/10 transition-colors">
                <div className="font-mono text-xs text-mostar-magenta mb-1">deploy [node]</div>
                <p className="text-xs text-white/70">Deploy new AI node to network</p>
              </div>
              <div className="p-2 rounded bg-white/5 hover:bg-white/10 transition-colors">
                <div className="font-mono text-xs text-mostar-yellow mb-1">help</div>
                <p className="text-xs text-white/70">Display available commands</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandTab;
