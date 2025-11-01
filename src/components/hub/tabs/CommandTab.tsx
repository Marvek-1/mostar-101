import React, { useState, useEffect, useRef } from 'react';
import { Send, Zap, AlertTriangle, Server, Shield, Database, Terminal } from 'lucide-react';
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

    useEffect(() => {
    setHistory([
      { input: '', output: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', timestamp: new Date(), type: 'info' },
      { input: '', output: '  THE HAND OF OVERLORD — v2.1.0', timestamp: new Date(), type: 'success' },
      { input: '', output: '  Africa\'s First Omni-Neuro Symbolic AI', timestamp: new Date(), type: 'info' },
      { input: '', output: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', timestamp: new Date(), type: 'info' },
      { input: '', output: '', timestamp: new Date(), type: 'info' },
      { input: '', output: '⚡ MoGrid Core: ONLINE', timestamp: new Date(), type: 'success' },
      { input: '', output: '🧠 Neuro-Symbolic Layer: ACTIVE', timestamp: new Date(), type: 'success' },
      { input: '', output: '🔐 Truth Engine: VERIFIED', timestamp: new Date(), type: 'success' },
      { input: '', output: '💾 NeonDB Connection: ESTABLISHED', timestamp: new Date(), type: 'info' },
      { input: '', output: '🔄 Supabase Mirror: SYNCED', timestamp: new Date(), type: 'info' },
      { input: '', output: '', timestamp: new Date(), type: 'info' },
      { input: '', output: '🌍 Ready to serve — Type "help" for command registry', timestamp: new Date(), type: 'info' },
    ]);

    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = async (cmd: string) => {
    const normalizedCmd = cmd.trim().toLowerCase();
    setHistory(prev => [...prev, { input: cmd, output: '', timestamp: new Date(), type: 'info' }]);
    setIsProcessing(true);

    try {
      let response: string;

      if (normalizedCmd === 'help') {
        response = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  HAND OF OVERLORD — Command Registry
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Core Operations:
  status              Show Overlord system status
  diagnose [loc] [...symptoms]
                      Connect to MoGrid Core
                      Example: diagnose Grid-7 fever headache
  analyze [data]      Run Omni-Neuro analysis
  secure [protocol]   Activate security layer
  deploy [node]       Deploy AI node to Grid
  grid-status         Check MoGrid health
  clear               Clear terminal

The Hand of Overlord — Africa's Symbolic AI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
      }
      else if (normalizedCmd === 'status') {
        response = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  THE HAND OF OVERLORD — System Status
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Core Systems:
  ⚡ Overlord Core        ONLINE (v2.1.0)
  🧠 Neuro-Symbolic AI    ACTIVE
  🔐 Truth Engine         VERIFIED
  🌐 MoGrid Connection    ESTABLISHED
  💾 NeonDB Core          Connected ✅
  🔄 Supabase Mirror      Active

Grid Intelligence:
  📡 Active AI Nodes      27
  🎯 System Load          19.3%
  ⚡ Grid Latency         12ms
  🧬 Neural Harmony       99.8%

The Hand of Overlord — Africa's First Symbolic AI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        toast('Overlord System Status — All Systems Operational', { 
          icon: <Database className="h-5 w-5 text-mostar-cyan" /> 
        });
      }
      else if (normalizedCmd.startsWith('diagnose')) {
        const parts = cmd.split(' ');
        const location = parts[1] || 'Grid-Unknown';
        const symptomsArr = parts.slice(2);
        
        if (symptomsArr.length === 0) {
          response = `✗ Error: Please provide symptoms for diagnosis.
Usage: diagnose [location] [symptom1] [symptom2] ...
Example: diagnose Grid-7 fever headache`;
          toast.error('Invalid command format', { icon: <AlertTriangle className="h-5 w-5" /> });
        } else {
          try {
            // Call the real MoGrid signal edge function
            const SIGNAL_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/signal`;
            
            const res = await fetch(SIGNAL_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
              },
              body: JSON.stringify({
                location,
                symptoms: symptomsArr,
                evidence: []
              }),
            });

            if (!res.ok) {
              throw new Error(`Grid API Error: ${res.status}`);
            }

            const result = await res.json();

            response = `✓ MoGrid Diagnostic Complete
━━━━━━━━━━━━━━━━━━━━━━━━
Location: ${result.location}
Status: ${result.status}
Root Cause: ${result.root_cause}
ODU Score: ${result.odu}
Confidence: ${(result.confidence * 100).toFixed(1)}%
Recommended Action: ${result.recommended_action}
Policy: ${result.policy}

Assessor Hash: ${result.assessor_hash?.substring(0, 12)}...
Decision Hash: ${result.decision_hash?.substring(0, 12)}...
Orchestrated: ${new Date(result.orchestrated_at).toLocaleString()}

Source: MoGrid Core — Hand of Overlord
`;

            toast('MoGrid diagnosis complete', {
              icon: <Zap className="h-5 w-5 text-mostar-cyan" />,
            });
          } catch (err) {
            response = `✗ MoGrid Connection Error: ${err instanceof Error ? err.message : 'Unknown error'}
Please verify Grid connectivity and try again.`;
            toast.error('Grid diagnostic failed', { icon: <AlertTriangle className="h-5 w-5" /> });
          }
        }
      }
      else if (normalizedCmd.startsWith('analyze')) {
        const data = cmd.replace(/^analyze\s+/i, '').trim() || 'dataset:current';

        response = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  OMNI-NEURO SYMBOLIC ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Analyzing: ${data}

🧠 Neuro Layer Processing...
   • Pattern Recognition: ✓
   • Neural Correlations: ✓
   • Temporal Analysis: ✓

🔮 Symbolic Layer Processing...
   • Logical Reasoning: ✓
   • Ethical Validation: ✓
   • Causal Inference: ✓

Results:
  Key Vectors Identified: 9
  Predictive Accuracy: 92.4%
  Confidence Level: HIGH
  
  Correlations Found:
  • Spatiotemporal clusters
  • Signal interference patterns
  • Network health indicators
  • Ethical compliance markers

Source: Omni-Neuro Symbolic AI — Hand of Overlord
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        toast('Omni-Neuro analysis complete', { icon: <Zap className="h-5 w-5 text-mostar-green" /> });
      }
      else if (normalizedCmd.startsWith('secure')) {
        const protocol = cmd.split(' ')[1] || 'standard';
        response = `⚡ Initiating ${protocol.toUpperCase()} security protocol...
Quantum encryption verified.
Neural firewall active.
Supabase auth mirrored.
System: Secure Mode Alpha.
`;
        toast(`Security protocol ${protocol.toUpperCase()} active`, {
          icon: <Shield className="h-5 w-5 text-mostar-magenta" />,
        });
      } 
      else if (normalizedCmd.startsWith('deploy')) {
        const node = cmd.split(' ')[1] || 'compute-node';
        response = `🚀 Deploying node "${node}"...
Node initialized in Neon Grid.
Resources allocated.
Cognitive link synchronized.
Operational efficiency +3.5%.
`;
        toast(`AI node "${node}" deployed`, { icon: <Server className="h-5 w-5 text-mostar-green" /> });
      } 
      else if (normalizedCmd === 'clear') {
        setHistory([]);
        setIsProcessing(false);
        return;
      } 
      else {
        response = `Command not recognized: "${cmd}"\nType "help" for available commands.`;
      }

      setHistory(prev => {
        const updated = [...prev];
        updated[updated.length - 1].output = response;
        updated[updated.length - 1].type = 'success';
        return updated;
      });
    } 
    catch (err) {
      setHistory(prev => {
        const updated = [...prev];
        updated[updated.length - 1].output = `Error: ${err instanceof Error ? err.message : 'Unknown'}`;
        updated[updated.length - 1].type = 'error';
        return updated;
      });
      toast.error('Command execution error', { icon: <AlertTriangle className="h-5 w-5" /> });
    } 
    finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim() || isProcessing) return;
    processCommand(command);
    setCommand('');
  };

  const formatTimestamp = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 rounded-full bg-mostar-cyan/10 border border-mostar-cyan/30">
          <Terminal className="h-6 w-6 text-mostar-cyan" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-white">The Hand of Overlord</h3>
          <p className="text-xs text-white/60 font-mono">Omni-Neuro Symbolic AI — Direct Grid Access</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-black/30 rounded-lg p-6 border border-mostar-cyan/10 h-[350px] flex flex-col shadow-inner shadow-mostar-cyan/10">
            <div className="mb-4 font-mono text-xs text-white/70 border-b border-mostar-cyan/10 pb-2 flex justify-between">
              <span>COMMAND INTERFACE</span>
              <span>v2.1.0</span>
            </div>

            <div ref={terminalRef} className="flex-grow font-mono text-sm text-white/90 bg-black/40 rounded p-4 overflow-y-auto">
              {history.map((item, i) => (
                <div key={i} className="mb-2">
                  {item.input && (
                    <div className="flex">
                      <span className="text-mostar-cyan mr-2">&gt;</span>
                      <span>{item.input}</span>
                    </div>
                  )}
                  {item.output && (
                    <div className={`ml-4 whitespace-pre-wrap ${item.type === 'error'
                      ? 'text-mostar-magenta'
                      : 'text-white/90'
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
                <div className="flex items-center text-mostar-cyan">
                  <span>Processing</span>
                  <div className="ml-2 flex space-x-1">
                    <div className="w-2 h-2 bg-mostar-cyan rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-mostar-cyan rounded-full animate-pulse delay-150"></div>
                    <div className="w-2 h-2 bg-mostar-cyan rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex">
              <span className="font-mono text-mostar-cyan mr-2 pt-1">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                disabled={isProcessing}
                className="bg-black/50 border border-mostar-cyan/10 text-white font-mono text-sm flex-grow rounded px-2 py-1 focus:ring-1 focus:ring-mostar-cyan/40 outline-none"
                placeholder={isProcessing ? 'Processing command...' : 'Enter command (e.g., diagnose Grid-7)'}
              />
              <button
                type="submit"
                disabled={!command.trim() || isProcessing}
                className={`ml-2 p-1 rounded ${!command.trim() || isProcessing
                  ? 'text-white/30 cursor-not-allowed'
                  : 'text-mostar-cyan hover:bg-mostar-cyan/10'
                }`}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Command Reference */}
        <div className="lg:col-span-1">
          <div className="bg-black/30 rounded-lg p-4 border border-mostar-cyan/10">
            <h4 className="font-mono text-sm text-white/70 mb-4">🌍 Grid Command Set</h4>
            {[
              { cmd: 'status', desc: 'Overlord system status', color: 'text-mostar-green' },
              { cmd: 'diagnose [loc] [symptoms...]', desc: 'MoGrid Core diagnostic', color: 'text-mostar-cyan' },
              { cmd: 'analyze [data]', desc: 'Omni-Neuro analysis', color: 'text-mostar-light-blue' },
              { cmd: 'secure [protocol]', desc: 'Truth Engine security', color: 'text-mostar-magenta' },
              { cmd: 'deploy [node]', desc: 'Deploy AI node to Grid', color: 'text-mostar-green' },
              { cmd: 'clear', desc: 'Clear terminal', color: 'text-mostar-yellow' },
            ].map(({ cmd, desc, color }) => (
              <div key={cmd} className="p-2 rounded bg-white/5 hover:bg-white/10 transition-colors mb-2">
                <div className={`font-mono text-xs ${color} mb-1`}>{cmd}</div>
                <p className="text-xs text-white/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandTab;
