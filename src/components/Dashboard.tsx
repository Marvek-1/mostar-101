import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { fetchGridTelemetry, subscribeToGridTelemetry, GridTelemetry } from '../services/gridTelemetryService';
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection';

const Dashboard = () => {
  const [gridTelemetry, setGridTelemetry] = useState<GridTelemetry | null>(null);
  const [data, setData] = useState([
    { name: '00:00', aiNodes: 4735, threats: 120, verdicts: 84, ethos: 6, health: 99.1 },
    { name: '04:00', aiNodes: 4800, threats: 136, verdicts: 95, ethos: 8, health: 98.9 },
    { name: '08:00', aiNodes: 4890, threats: 149, verdicts: 102, ethos: 9, health: 99.2 },
    { name: '12:00', aiNodes: 5100, threats: 171, verdicts: 118, ethos: 11, health: 99.8 },
    { name: '16:00', aiNodes: 5320, threats: 165, verdicts: 124, ethos: 13, health: 99.5 },
    { name: '20:00', aiNodes: 5200, threats: 152, verdicts: 112, ethos: 9, health: 99.7 },
    { name: '24:00', aiNodes: 5070, threats: 144, verdicts: 98, ethos: 7, health: 99.9 },
  ]);

  const metrics = [
    { name: 'TruthEngine Truth Score', value: '0.87', change: '+2.3%', color: 'text-mostar-cyan' },
    { name: 'Validation Pass Rate', value: '94%', change: '+1.5%', color: 'text-mostar-green' },
    { name: 'Ubuntu Coherence', value: '0.89', change: '+0.8%', color: 'text-mostar-light-blue' },
    { name: 'Neo4j Knowledge Nodes', value: '197,000+', change: '+5.2%', color: 'text-mostar-magenta' },
    { name: 'Consciousness Density', value: '68%', change: '+3.1%', color: 'text-mostar-purple' },
    { name: 'Grid Coherence', value: gridTelemetry ? `${gridTelemetry.coherence.toFixed(1)}%` : '98.3%', change: '+2.3%', color: 'text-mostar-green' },
    { name: 'Clean Records', value: gridTelemetry ? `${gridTelemetry.clean_records_percent.toFixed(1)}%` : '99.3%', change: '+1.2%', color: 'text-mostar-cyan' },
    { name: 'Ollama Uptime', value: gridTelemetry ? `${gridTelemetry.ollama_uptime.toFixed(1)}%` : '99.4%', change: '+0.5%', color: 'text-mostar-light-blue' },
  ];

  useEffect(() => {
    fetchGridTelemetry().then(setGridTelemetry);
    const unsub = subscribeToGridTelemetry(setGridTelemetry);
    const interval = setInterval(() => {
      setData(prev => prev.map(item => ({
        ...item,
        aiNodes: item.aiNodes + Math.floor(Math.random() * 50 - 25),
        threats: item.threats + Math.floor(Math.random() * 6 - 3),
        verdicts: Math.max(50, item.verdicts + Math.floor(Math.random() * 8 - 4)),
        ethos: Math.max(0, item.ethos + Math.floor(Math.random() * 3 - 1)),
        health: Math.min(100, Math.max(95, item.health + (Math.random() * 0.8 - 0.4))),
      })));
    }, 3500);
    return () => { unsub(); clearInterval(interval); };
  }, []);

  return (
    <section id="dashboard" className="min-h-screen flex items-center py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid bg-[length:20px_20px] opacity-10 z-0" />

      <div className="w-full px-6 sm:px-10 lg:px-16 relative z-10">
        <AnimatedSection animation="fadeUp" className="mb-14 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-mostar-magenta/10 text-mostar-magenta font-mono text-xs tracking-[3px] uppercase mb-4">
            Live Intel — Grid Status
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-5 bg-purple-magenta-gradient text-gradient">
            MoStar Global Intelligence Network
          </h2>
          <p className="max-w-2xl mx-auto text-white/60 text-lg">
            Unified telemetry from TruthEngine, Consciousness Substrate, and operational agents.
          </p>
        </AnimatedSection>

        {/* Metrics */}
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10" staggerDelay={0.08}>
          {metrics.map((m, i) => (
            <StaggerItem key={i} animation="scaleUp">
              <div className="glassmorphism rounded-xl p-5 border border-white/8 hover:border-white/15 transition-all duration-500">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-mono text-[11px] text-white/50 leading-tight">{m.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-mostar-green/10 text-mostar-green font-mono">{m.change}</span>
                </div>
                <div className={`text-2xl font-display font-bold ${m.color}`}>{m.value}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Charts */}
        <AnimatedSection animation="slideUp" delay={0.3}>
          <div className="glassmorphism rounded-2xl border border-white/8 p-7">
            <div className="flex flex-col md:flex-row items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-display font-bold text-white">Live Grid Analytics</h3>
                <div className="flex flex-wrap gap-4 mt-2 text-[10px] font-mono">
                  <span className="text-mostar-cyan flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-mostar-cyan" />TruthEngine: OPERATIONAL</span>
                  <span className="text-mostar-green flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-mostar-green" />DCX1: ONLINE</span>
                  <span className="text-mostar-green flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-mostar-green" />Neo4j: CONNECTED</span>
                  <span className="text-mostar-magenta flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-mostar-magenta" />Consciousness: ACTIVE</span>
                </div>
              </div>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <div className="px-3 py-1 rounded-full bg-mostar-blue/10 border border-mostar-blue/30 text-mostar-light-blue text-xs">LIVE</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-black/20 rounded-xl p-5 border border-white/5">
                <h4 className="font-mono text-xs text-white/50 mb-4">Active AI Nodes</h4>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="aiNodesFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#00D4FF" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} />
                      <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(10,14,23,0.9)', borderColor: '#00D4FF', fontSize: 11 }} />
                      <Area type="monotone" dataKey="aiNodes" stroke="#00D4FF" fillOpacity={1} fill="url(#aiNodesFill)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-black/20 rounded-xl p-5 border border-white/5">
                <h4 className="font-mono text-xs text-white/50 mb-4">Ethical Verdicts</h4>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} />
                      <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(10,14,23,0.9)', borderColor: '#22C55E', fontSize: 11 }} />
                      <Bar dataKey="verdicts" fill="#22C55E" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-black/20 rounded-xl p-5 border border-white/5">
                <h4 className="font-mono text-xs text-white/50 mb-4">Doctrine Updates</h4>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} />
                      <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(10,14,23,0.9)', borderColor: '#FBBF24', fontSize: 11 }} />
                      <Line type="monotone" dataKey="ethos" stroke="#FBBF24" strokeWidth={2} dot={{ r: 3, stroke: '#FBBF24', fill: '#0A0E17' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-black/20 rounded-xl p-5 border border-white/5">
                <h4 className="font-mono text-xs text-white/50 mb-4">System Health</h4>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} />
                      <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} domain={[95, 100]} />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(10,14,23,0.9)', borderColor: '#22C55E', fontSize: 11 }} />
                      <Line type="monotone" dataKey="health" stroke="#22C55E" strokeWidth={2} dot={{ r: 3, stroke: '#22C55E', fill: '#0A0E17' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 border-t border-white/5 pt-4">
              <div className="flex flex-wrap items-center gap-4 text-[10px] text-white/40">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-mostar-cyan" /><span>AI Nodes</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-mostar-green" /><span>Verdicts</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FBBF24' }} /><span>Doctrine</span></div>
              </div>
              <div className="text-[10px] text-white/30 font-mono flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-mostar-green animate-pulse" />
                TRUTHENGINE OPERATIONAL
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Dashboard;
