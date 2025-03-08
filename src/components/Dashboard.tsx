
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState([
    { name: '00:00', aiNodes: 3400, threats: 120, health: 98, environmental: 76 },
    { name: '04:00', aiNodes: 3450, threats: 132, health: 97, environmental: 79 },
    { name: '08:00', aiNodes: 3500, threats: 145, health: 96, environmental: 78 },
    { name: '12:00', aiNodes: 3800, threats: 162, health: 99, environmental: 81 },
    { name: '16:00', aiNodes: 4200, threats: 170, health: 97, environmental: 83 },
    { name: '20:00', aiNodes: 4100, threats: 156, health: 98, environmental: 80 },
    { name: '24:00', aiNodes: 3900, threats: 142, health: 99, environmental: 78 },
  ]);
  
  const metrics = [
    { id: 1, name: 'Active AI Nodes', value: '4,735', change: '+12.6%', color: 'blue' },
    { id: 2, name: 'Threats Neutralized', value: '12,346', change: '+5.3%', color: 'magenta' },
    { id: 3, name: 'System Health', value: '99.8%', change: '+0.6%', color: 'green' },
    { id: 4, name: 'Environmental Tracking', value: '83.2%', change: '+2.1%', color: 'cyan' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data updates
      setData(prevData => {
        return prevData.map(item => ({
          ...item,
          aiNodes: item.aiNodes + Math.floor(Math.random() * 100) - 50,
          threats: item.threats + Math.floor(Math.random() * 10) - 5,
          health: Math.min(100, Math.max(90, item.health + (Math.random() * 2) - 1)),
          environmental: Math.min(100, Math.max(70, item.environmental + (Math.random() * 2) - 1)),
        }));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="dashboard" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid bg-[length:20px_20px] opacity-10 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-mostar-magenta/10 text-mostar-magenta font-mono text-xs mb-3">
            LIVE INTEL
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-purple-magenta-gradient text-gradient">
            Global AI Monitoring
          </h2>
          <p className="max-w-2xl mx-auto text-white/70">
            Real-time analytics from our global network of AI-powered monitoring systems.
          </p>
        </div>

        {/* Metrics overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric) => (
            <div 
              key={metric.id}
              className="glassmorphism rounded-lg p-6 border border-white/10"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-mono text-sm text-white/70">{metric.name}</h3>
                <span className={`text-xs px-2 py-1 rounded bg-mostar-${metric.color}/10 text-mostar-${metric.color}`}>
                  {metric.change}
                </span>
              </div>
              <div className={`text-3xl font-display font-bold text-mostar-${metric.color} text-glow-${metric.color === 'magenta' ? 'cyan' : metric.color}`}>
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Main dashboard */}
        <div className="glassmorphism rounded-lg border border-white/10 p-6">
          <div className="flex flex-col md:flex-row items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-display font-bold text-white">System Overview</h3>
              <p className="text-white/70 text-sm">Live data from the MoStar global network</p>
            </div>
            
            <div className="flex space-x-2 mt-4 md:mt-0">
              <div className="px-3 py-1 rounded-full border border-mostar-blue/30 text-white/70 text-xs">
                24H
              </div>
              <div className="px-3 py-1 rounded-full bg-mostar-blue/10 border border-mostar-blue/30 text-mostar-light-blue text-xs">
                7D
              </div>
              <div className="px-3 py-1 rounded-full border border-mostar-blue/30 text-white/70 text-xs">
                30D
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Nodes Chart */}
            <div className="bg-black/20 rounded-lg p-4 border border-white/5">
              <h4 className="font-mono text-sm text-white/70 mb-4">Active AI Nodes</h4>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="aiNodesFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#33a1ff" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#33a1ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)' }} stroke="rgba(255,255,255,0.1)" />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.5)' }} stroke="rgba(255,255,255,0.1)" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(10, 14, 23, 0.8)', borderColor: 'rgba(51, 161, 255, 0.3)' }}
                      labelStyle={{ color: '#33a1ff' }}
                    />
                    <Area type="monotone" dataKey="aiNodes" stroke="#33a1ff" fillOpacity={1} fill="url(#aiNodesFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Threats Chart */}
            <div className="bg-black/20 rounded-lg p-4 border border-white/5">
              <h4 className="font-mono text-sm text-white/70 mb-4">Threats Neutralized</h4>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)' }} stroke="rgba(255,255,255,0.1)" />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.5)' }} stroke="rgba(255,255,255,0.1)" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(10, 14, 23, 0.8)', borderColor: 'rgba(248, 28, 229, 0.3)' }}
                      labelStyle={{ color: '#f81ce5' }}
                    />
                    <Bar dataKey="threats" fill="#f81ce5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* System Health Chart */}
            <div className="bg-black/20 rounded-lg p-4 border border-white/5">
              <h4 className="font-mono text-sm text-white/70 mb-4">System Health</h4>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)' }} stroke="rgba(255,255,255,0.1)" />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.5)' }} stroke="rgba(255,255,255,0.1)" domain={[90, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(10, 14, 23, 0.8)', borderColor: 'rgba(0, 255, 157, 0.3)' }}
                      labelStyle={{ color: '#00ff9d' }}
                    />
                    <Line type="monotone" dataKey="health" stroke="#00ff9d" strokeWidth={2} dot={{ r: 4, stroke: '#00ff9d', fill: '#121212' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Environmental Tracking Chart */}
            <div className="bg-black/20 rounded-lg p-4 border border-white/5">
              <h4 className="font-mono text-sm text-white/70 mb-4">Environmental Tracking</h4>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)' }} stroke="rgba(255,255,255,0.1)" />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.5)' }} stroke="rgba(255,255,255,0.1)" domain={[70, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(10, 14, 23, 0.8)', borderColor: 'rgba(0, 255, 255, 0.3)' }}
                      labelStyle={{ color: '#00ffff' }}
                    />
                    <Line type="monotone" dataKey="environmental" stroke="#00ffff" strokeWidth={2} dot={{ r: 4, stroke: '#00ffff', fill: '#121212' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Legend and timestamp */}
          <div className="flex justify-between items-center mt-6 border-t border-white/10 pt-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-mostar-blue"></div>
                <span className="text-xs text-white/70">AI Nodes</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-mostar-magenta"></div>
                <span className="text-xs text-white/70">Threats</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-mostar-green"></div>
                <span className="text-xs text-white/70">Health</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-mostar-cyan"></div>
                <span className="text-xs text-white/70">Environmental</span>
              </div>
            </div>
            <div className="text-xs text-white/50 font-mono flex items-center">
              <div className="w-2 h-2 rounded-full bg-mostar-green animate-pulse mr-2"></div>
              LIVE UPDATING
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
