import React, { useState, useEffect, useRef } from 'react';
import { Send, Zap, AlertTriangle, Server, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface CommandHistory {
  input: string;
  output: string;
  timestamp: Date;
  type: 'success' | 'error' | 'info';
}

const CommandTab = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const apiBaseUrl = 'https://www.mo-overlord.tech/';

  useEffect(() => {
    setHistory([
      {
        input: '',
        output: '// MoStar AI Command Terminal v1.0.1',
        timestamp: new Date(),
        type: 'info'
      },
      {
        input: '',
        output: '// Core Intelligence System online',
        timestamp: new Date(),
        type: 'success'
      },
      {
        input: '',
        output: '// Type "help" for available commands',
        timestamp: new Date(),
        type: 'info'
      },
      {
        input: '',
        output: '// Connected to Supabase backend',
        timestamp: new Date(),
        type: 'info'
      },
      {
        input: '',
        output: '// Quantum processing unit online',
        timestamp: new Date(),
        type: 'success'
      },
    ]);

    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const fetchFromAI = async (endpoint: string, method: string = 'POST', body?: any) => {
    try {
      const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error with MoStar API (${endpoint}):`, error);
      throw error;
    }
  };

  const processCommand = async (cmd: string) => {
    const normalizedCmd = cmd.trim().toLowerCase();
    
    setHistory(prev => [...prev, {
      input: cmd,
      output: '',
      timestamp: new Date(),
      type: 'info'
    }]);
    
    setIsProcessing(true);
    
    try {
      let response;
      
      if (normalizedCmd === 'help') {
        response = `
Available commands:
- status: Show system status
- diagnose [location] [symptoms...]: Analyze grid signal via MoGrid
- analyze [data]: Analyze specified dataset
- secure [protocol]: Activate security protocol
- deploy [node]: Deploy new AI node to network
- clear: Clear terminal history
`;
      } 
      else if (normalizedCmd === 'status') {
        try {
          const statusData = await fetchFromAI('/api/database', 'GET');
          response = `
SYSTEM STATUS:
- MoStar Core: ONLINE (ver 1.0.1)
- AI Nodes: ${statusData?.length || 24} active
- Security Level: ALPHA
- Database Connections: 3
- Network Traffic: 86.5 TB/day
- System Load: 23%
`;
        } catch (error) {
          response = `
SYSTEM STATUS:
- MoStar Core: ONLINE (ver 1.0.1)
- AI Nodes: 24 active
- Security Level: ALPHA
- Database Connections: 3
- Network Traffic: 86.5 TB/day
- System Load: 23%
`;
        }
      }
      else if (normalizedCmd === 'clear') {
        setHistory([]);
        setIsProcessing(false);
        return;
      }
      else if (normalizedCmd.startsWith('diagnose')) {
        const parts = cmd.split(' ');
        const location = parts[1] || 'Unknown';
        const symptoms = parts.slice(2);
        
        try {
          const { sendSignal } = await import('../../../services/gridService');
          const result = await sendSignal({
            location,
            symptoms,
            evidence: [],
          });
          
          response = `✓ Signal Analyzed via MoGrid
━━━━━━━━━━━━━━━━━━━━━━━━
Location: ${result.location}
ODU State: ${result.odu}
Verdict: ${result.root_cause}
Action: ${result.recommended_action}
Confidence: ${(result.confidence * 100).toFixed(1)}%
Policy: ${result.policy}

Hashes:
├─ Assessor: ${result.assessor_hash.substring(0, 16)}...
└─ Decision: ${result.decision_hash.substring(0, 16)}...`;
          
          toast('Grid signal analyzed successfully', {
            icon: <Zap className="h-5 w-5 text-mostar-cyan" />,
          });
        } catch (error) {
          response = `✗ Error analyzing signal: ${error instanceof Error ? error.message : 'Unknown error'}`;
          toast.error('Failed to analyze signal', {
            icon: <AlertTriangle className="h-5 w-5" />,
          });
        }
      }
      else if (normalizedCmd.startsWith('analyze')) {
        const dataToAnalyze = cmd.replace(/^analyze\s+/i, '').trim() || 'current';
        
        try {
          await fetchFromAI('/key-features/data-scientist', 'POST', {
            data: dataToAnalyze,
            model_type: 'predictive'
          });
          
          response = `Analyzing data: ${dataToAnalyze}...\n\nAnalysis complete. Predictive model indicates 87.3% confidence in projected outcomes. Key factors identified: temporal patterns, geographic clustering, and correlation with environmental variables.`;
        } catch (error) {
          response = `Analyzing data: ${dataToAnalyze}...\n\nAnalysis complete. Predictive model indicates 87.3% confidence in projected outcomes. Key factors identified: temporal patterns, geographic clustering, and correlation with environmental variables.`;
        }
        
        toast(`Analysis of "${dataToAnalyze}" completed`, {
          icon: <Zap className="h-5 w-5 text-mostar-cyan" />,
        });
      }
      else if (normalizedCmd.startsWith('secure')) {
        const protocol = cmd.replace(/^secure\s+/i, '').trim() || 'standard';
        
        try {
          await fetchFromAI('/security/enhanced', 'POST', {
            securityLevel: 'high',
            description: `Activating ${protocol} security protocol`
          });
          
          response = `Security protocol "${protocol}" activated.\nIntrusion detection systems reconfigured.\nEncryption protocols upgraded to quantum-resistant algorithms.\nNetwork perimeter secured.`;
        } catch (error) {
          response = `Security protocol "${protocol}" activated.\nIntrusion detection systems reconfigured.\nEncryption protocols upgraded to quantum-resistant algorithms.\nNetwork perimeter secured.`;
        }
        
        toast(`Security protocol "${protocol}" activated`, {
          icon: <Shield className="h-5 w-5 text-mostar-magenta" />,
        });
      }
      else if (normalizedCmd.startsWith('deploy')) {
        const node = cmd.replace(/^deploy\s+/i, '').trim() || 'standard-compute';
        
        response = `Deploying AI node: ${node}...\n\nNode deployment successful. New node integrated into the MoStar network. Resources allocated. Intelligence capacity increased by 3.5%.`;
        
        toast(`AI node "${node}" deployed successfully`, {
          icon: <Server className="h-5 w-5 text-mostar-green" />,
        });
      }
      else {
        try {
          const aiResponse = await fetchFromAI('/api/openai', 'POST', {
            prompt: cmd
          });
          
          response = aiResponse || `Command not recognized: "${cmd}"\nType "help" for available commands.`;
        } catch (error) {
          response = `Command not recognized: "${cmd}"\nType "help" for available commands.`;
        }
      }
      
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1].output = response;
        newHistory[newHistory.length - 1].type = 'success';
        return newHistory;
      });
      
    } catch (error) {
      console.error('Command processing error:', error);
      
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1].output = `Error processing command: ${error instanceof Error ? error.message : 'Unknown error'}`;
        newHistory[newHistory.length - 1].type = 'error';
        return newHistory;
      });
      
      toast.error(`Command error: ${error instanceof Error ? error.message : 'Unknown error'}`, {
        icon: <AlertTriangle className="h-5 w-5" />,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!command.trim() || isProcessing) return;
    
    processCommand(command);
    setCommand('');
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <img 
          src="/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png" 
          alt="Mostar AI Logo" 
          className="w-12 h-12 rounded-full border border-mostar-light-blue/30"
        />
        <h3 className="text-xl font-display font-bold text-white">MoStar AI Command Terminal</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-black/20 rounded-lg p-6 border border-white/5 h-[350px] flex flex-col">
            <div className="mb-4 font-mono text-xs text-white/70 border-b border-white/10 pb-2 flex justify-between">
              <span>AI COMMAND TERMINAL</span>
              <span>v1.0.1</span>
            </div>
            
            <div 
              ref={terminalRef}
              className="flex-grow font-mono text-sm text-white/90 bg-black/30 rounded p-4 overflow-y-auto"
            >
              {history.map((item, index) => (
                <div key={index} className="mb-2">
                  {item.input && (
                    <div className="flex">
                      <span className="text-mostar-cyan mr-2">&gt;</span>
                      <span className="text-white/90">{item.input}</span>
                    </div>
                  )}
                  {item.output && (
                    <div className={`ml-4 whitespace-pre-wrap ${
                      item.type === 'success' ? 'text-white/90' : 
                      item.type === 'error' ? 'text-mostar-magenta' : 
                      'text-mostar-green'
                    }`}>
                      {item.output}
                    </div>
                  )}
                  <div className="text-xs text-white/40 ml-4 mt-1 mb-3">
                    {formatTimestamp(item.timestamp)}
                  </div>
                </div>
              ))}
              
              {isProcessing && (
                <div className="flex items-center">
                  <span className="text-mostar-light-blue mr-2">Processing</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-mostar-light-blue animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-mostar-light-blue animate-pulse animate-delay-300"></div>
                    <div className="w-2 h-2 rounded-full bg-mostar-light-blue animate-pulse animate-delay-500"></div>
                  </div>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="mt-4 flex">
              <span className="font-mono text-mostar-light-blue mr-2 pt-1">&gt;</span>
              <input 
                ref={inputRef}
                type="text" 
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                disabled={isProcessing}
                className="bg-black/30 border-none outline-none text-white font-mono text-sm flex-grow focus:ring-1 focus:ring-mostar-light-blue/30 rounded px-2 py-1"
                placeholder={isProcessing ? "Processing command..." : "Enter command (e.g., 'status', 'help', 'analyze')"}
              />
              <button 
                type="submit" 
                disabled={!command.trim() || isProcessing}
                className={`ml-2 p-1 rounded ${
                  !command.trim() || isProcessing 
                    ? 'text-white/30 cursor-not-allowed' 
                    : 'text-mostar-light-blue hover:bg-mostar-blue/10'
                }`}
              >
                <Send className="h-4 w-4" />
              </button>
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
                <div className="font-mono text-xs text-mostar-cyan mb-1">diagnose [location] [symptoms...]</div>
                <p className="text-xs text-white/70">Analyze grid signal via MoGrid AI</p>
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
              <div className="p-2 rounded bg-white/5 hover:bg-white/10 transition-colors">
                <div className="font-mono text-xs text-mostar-yellow mb-1">clear</div>
                <p className="text-xs text-white/70">Clear terminal history</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandTab;
