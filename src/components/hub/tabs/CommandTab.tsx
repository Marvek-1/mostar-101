
import React, { useState, useRef, useEffect } from 'react';
import { executeCommand } from '../../../services/aiNodeService';
import { CommandResponse } from '../../../types/ai-hub';
import { toast } from 'sonner';
import { Terminal } from 'lucide-react';

const CommandTab = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandResponse[]>([
    { message: '// AI assistant initialized', type: 'system', timestamp: new Date().toISOString() },
    { message: '// Welcome to MoStar Command Center', type: 'info', timestamp: new Date().toISOString() },
    { message: "// Type 'help' for available commands", type: 'info', timestamp: new Date().toISOString() },
    { message: '// Real-time AI assistance ready...', type: 'system', timestamp: new Date().toISOString() },
    { message: '// Connected to Supabase backend', type: 'success', timestamp: new Date().toISOString() },
    { message: '// Quantum processing unit online', type: 'info', timestamp: new Date().toISOString() },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom of terminal
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Focus input on component mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user input to history
    const userCommand = {
      message: `> ${input}`,
      type: 'system' as const,
      timestamp: new Date().toISOString()
    };
    
    setHistory(prev => [...prev, userCommand]);
    setIsProcessing(true);
    
    try {
      const response = await executeCommand(input);
      
      // Handle special clear command
      if (response.message === "[[CLEAR]]") {
        setHistory([
          { message: '// Terminal cleared', type: 'system', timestamp: new Date().toISOString() }
        ]);
      } else {
        setHistory(prev => [...prev, response]);
      }
    } catch (error) {
      const errorResponse = {
        message: `System error: ${error.message}`,
        type: 'error' as const,
        timestamp: new Date().toISOString()
      };
      setHistory(prev => [...prev, errorResponse]);
      toast.error('Command execution failed');
    } finally {
      setIsProcessing(false);
      setInput('');
    }
  };

  const getMessageColor = (type: CommandResponse['type']) => {
    switch (type) {
      case 'success': return 'text-mostar-green';
      case 'error': return 'text-mostar-magenta';
      case 'info': return 'text-mostar-cyan';
      default: return 'text-mostar-light-blue';
    }
  };

  return (
    <div>
      <h3 className="text-xl font-display font-bold mb-4 text-white">Interactive AI Command Center</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-black/20 rounded-lg p-6 border border-white/5 h-[350px] flex flex-col">
            <div className="mb-4 font-mono text-xs text-white/70 border-b border-white/10 pb-2 flex items-center">
              <Terminal className="h-4 w-4 mr-2" /> AI COMMAND TERMINAL
            </div>
            <div 
              ref={terminalRef}
              className="flex-grow font-mono text-sm text-white/90 bg-black/30 rounded p-4 overflow-y-auto"
            >
              {history.map((item, index) => {
                // Split messages with newlines into multiple lines
                const lines = item.message.split('\n');
                return (
                  <div key={index} className={`${getMessageColor(item.type)} mb-2`}>
                    {lines.map((line, lineIndex) => (
                      <p key={`${index}-${lineIndex}`} className="mb-0.5">
                        {line}
                      </p>
                    ))}
                  </div>
                );
              })}
              {isProcessing && (
                <div className="text-mostar-yellow animate-pulse">Processing...</div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="mt-4 flex">
              <span className="font-mono text-mostar-light-blue mr-2">&gt;</span>
              <input 
                ref={inputRef}
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-black/30 border-none outline-none text-white font-mono text-sm flex-grow focus:ring-1 focus:ring-mostar-light-blue/30 rounded-sm px-2 py-1"
                placeholder={isProcessing ? "Processing..." : "Enter command (e.g., 'status', 'help', 'analyze')"}
                disabled={isProcessing}
              />
            </form>
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
                <div className="font-mono text-xs text-mostar-cyan mb-1">list nodes</div>
                <p className="text-xs text-white/70">List all available AI nodes</p>
              </div>
              <div className="p-2 rounded bg-white/5 hover:bg-white/10 transition-colors">
                <div className="font-mono text-xs text-mostar-green mb-1">analyze [node]</div>
                <p className="text-xs text-white/70">Run analysis on specified node</p>
              </div>
              <div className="p-2 rounded bg-white/5 hover:bg-white/10 transition-colors">
                <div className="font-mono text-xs text-mostar-magenta mb-1">query [table]</div>
                <p className="text-xs text-white/70">Query data from Supabase tables</p>
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
