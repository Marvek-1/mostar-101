
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Shield, Globe, Database, Brain, Activity, Server, Terminal, Network, Monitor, Radar, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';
import Globe from '../components/Globe';

// Fetch AI node data from Supabase
const fetchAINodes = async () => {
  try {
    const { data, error } = await supabase
      .from('yaml_configurations')
      .select('*')
      .limit(10);
    
    if (error) throw error;
    
    // Transform the data for visualization
    return data.map((item, index) => ({
      id: item.id || index,
      name: item.name || `Node-${index}`,
      status: item.active ? 'Active' : 'Inactive',
      config: item.config || {},
      location: item.metadata?.location || 'Unknown',
      lastUpdated: item.updated_at || new Date().toISOString(),
      performance: Math.floor(Math.random() * 100),
      threats: Math.floor(Math.random() * 50),
    }));
  } catch (error) {
    console.error('Error fetching AI nodes:', error);
    return [];
  }
};

const MostarHub = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  const { data: aiNodes = [], isLoading: isLoadingNodes, isError } = useQuery({
    queryKey: ['aiNodes'],
    queryFn: fetchAINodes,
    staleTime: 30000, // 30 seconds
  });

  // Simulate activity feed data
  const activityFeed = [
    { id: 1, type: 'security', message: 'Threat detected and neutralized in Sector 7', time: '2 minutes ago', icon: <Shield className="h-5 w-5 text-mostar-magenta" /> },
    { id: 2, type: 'network', message: 'New AI node deployed in Sydney region', time: '15 minutes ago', icon: <Server className="h-5 w-5 text-mostar-cyan" /> },
    { id: 3, type: 'analysis', message: 'Pattern recognition complete on Dataset Alpha', time: '37 minutes ago', icon: <Brain className="h-5 w-5 text-mostar-green" /> },
    { id: 4, type: 'system', message: 'Quantum encryption protocols updated', time: '1 hour ago', icon: <Database className="h-5 w-5 text-mostar-light-blue" /> },
    { id: 5, type: 'satellite', message: 'Geospatial anomaly detected in North Atlantic', time: '2 hours ago', icon: <Globe className="h-5 w-5 text-mostar-yellow" /> },
  ];

  // Performance metrics data
  const performanceData = [
    { name: '00:00', value: 85 },
    { name: '04:00', value: 83 },
    { name: '08:00', value: 91 },
    { name: '12:00', value: 96 },
    { name: '16:00', value: 94 },
    { name: '20:00', value: 98 },
    { name: '24:00', value: 95 },
  ];

  // AI Systems data for the pie chart
  const aiSystemsData = [
    { name: 'Predictive Analytics', value: 25 },
    { name: 'Neural Networks', value: 30 },
    { name: 'ML Algorithms', value: 20 },
    { name: 'Data Fusion', value: 15 },
    { name: 'Quantum Computing', value: 10 },
  ];

  // Security incidents data
  const securityData = [
    { name: 'Mon', value: 12 },
    { name: 'Tue', value: 8 },
    { name: 'Wed', value: 15 },
    { name: 'Thu', value: 5 },
    { name: 'Fri', value: 10 },
    { name: 'Sat', value: 3 },
    { name: 'Sun', value: 7 },
  ];

  // Simulate the loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    toast(`Accessing ${tab.charAt(0).toUpperCase() + tab.slice(1)} Module`, {
      icon: <Zap className="h-5 w-5 text-mostar-cyan" />,
    });
  };

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-content flex flex-col items-center">
          <div className="loading-logo"></div>
          <div className="mt-8 font-display text-2xl text-mostar-light-blue text-glow-blue">
            MOSTAR HUB
          </div>
          <div className="mt-2 font-mono text-xs text-white/70">
            INITIALIZING AI NEXUS...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="scanline"></div>
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero section */}
        <section className="relative h-[50vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-cyber-grid bg-[length:30px_30px] opacity-10 z-0"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-mostar-dark z-10"></div>
          
          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-4xl">
              <span className="inline-block px-3 py-1 rounded-full bg-mostar-magenta/10 text-mostar-magenta font-mono text-xs mb-3">
                CLASSIFIED ACCESS
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 bg-blue-magenta-gradient text-gradient">
                MoStar Hub <span className="text-mostar-light-blue">AI Nexus</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-8 max-w-3xl">
                The intelligence epicenter where global analytics, cyber intelligence, and quantum computing technologies converge for unprecedented insights.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="button-cyber flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  <span>Access Terminal</span>
                </button>
                <button className="bg-transparent border border-mostar-light-blue/30 text-mostar-light-blue px-6 py-3 rounded font-display text-sm uppercase tracking-wide hover:bg-mostar-light-blue/10 transition-colors flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Security Protocols</span>
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main hub content */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="glassmorphism rounded-lg border border-white/10 p-6 mb-8">
              <div className="flex flex-wrap mb-6 border-b border-white/10 pb-4">
                <button 
                  onClick={() => handleTabChange('overview')} 
                  className={`px-4 py-2 mr-2 mb-2 rounded-md font-mono text-sm transition-all ${activeTab === 'overview' ? 'bg-mostar-blue/20 text-mostar-light-blue' : 'text-white/70 hover:text-white'}`}
                >
                  <span className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Overview
                  </span>
                </button>
                <button 
                  onClick={() => handleTabChange('network')} 
                  className={`px-4 py-2 mr-2 mb-2 rounded-md font-mono text-sm transition-all ${activeTab === 'network' ? 'bg-mostar-green/20 text-mostar-green' : 'text-white/70 hover:text-white'}`}
                >
                  <span className="flex items-center gap-2">
                    <Network className="h-4 w-4" />
                    Global Network
                  </span>
                </button>
                <button 
                  onClick={() => handleTabChange('security')} 
                  className={`px-4 py-2 mr-2 mb-2 rounded-md font-mono text-sm transition-all ${activeTab === 'security' ? 'bg-mostar-magenta/20 text-mostar-magenta' : 'text-white/70 hover:text-white'}`}
                >
                  <span className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Security
                  </span>
                </button>
                <button 
                  onClick={() => handleTabChange('analytics')} 
                  className={`px-4 py-2 mr-2 mb-2 rounded-md font-mono text-sm transition-all ${activeTab === 'analytics' ? 'bg-mostar-cyan/20 text-mostar-cyan' : 'text-white/70 hover:text-white'}`}
                >
                  <span className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    AI Analytics
                  </span>
                </button>
                <button 
                  onClick={() => handleTabChange('command')} 
                  className={`px-4 py-2 mr-2 mb-2 rounded-md font-mono text-sm transition-all ${activeTab === 'command' ? 'bg-mostar-yellow/20 text-mostar-yellow' : 'text-white/70 hover:text-white'}`}
                >
                  <span className="flex items-center gap-2">
                    <Terminal className="h-4 w-4" />
                    Command Center
                  </span>
                </button>
              </div>
              
              {/* Overview Tab Content */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-display font-bold mb-4 text-white">System Status Overview</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-black/20 rounded-lg p-4 border border-white/5">
                        <h4 className="font-mono text-sm text-white/70 mb-2">Global AI Performance</h4>
                        <div className="h-40">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData}>
                              <defs>
                                <linearGradient id="performanceFill" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#00a2ff" stopOpacity={0.3} />
                                  <stop offset="100%" stopColor="#00a2ff" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <Tooltip 
                                contentStyle={{ backgroundColor: 'rgba(10, 14, 23, 0.8)', borderColor: 'rgba(0, 162, 255, 0.3)' }}
                                labelStyle={{ color: '#00a2ff' }}
                              />
                              <Area type="monotone" dataKey="value" stroke="#00a2ff" fillOpacity={1} fill="url(#performanceFill)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <div className="bg-black/20 rounded-lg p-4 border border-white/5">
                        <h4 className="font-mono text-sm text-white/70 mb-2">Security Incidents</h4>
                        <div className="h-40">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={securityData}>
                              <Tooltip 
                                contentStyle={{ backgroundColor: 'rgba(10, 14, 23, 0.8)', borderColor: 'rgba(248, 28, 229, 0.3)' }}
                                labelStyle={{ color: '#f81ce5' }}
                              />
                              <Bar dataKey="value" fill="#f81ce5" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                    <div className="bg-black/20 rounded-lg p-4 border border-white/5">
                      <h4 className="font-mono text-sm text-white/70 mb-2">AI Systems Distribution</h4>
                      <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={aiSystemsData}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {aiSystemsData.map((entry, index) => {
                                const colors = ['#00a2ff', '#00ffff', '#00ff9d', '#f81ce5', '#ffca00'];
                                return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                              })}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ backgroundColor: 'rgba(10, 14, 23, 0.8)', borderColor: 'rgba(0, 162, 255, 0.3)' }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-1">
                    <h3 className="text-xl font-display font-bold mb-4 text-white">Live Activity Feed</h3>
                    <div className="bg-black/20 rounded-lg border border-white/5 h-[500px] overflow-y-auto">
                      <div className="p-4 border-b border-white/10 flex items-center justify-between">
                        <span className="font-mono text-sm text-white/70">REAL-TIME INTEL</span>
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-mostar-green animate-pulse mr-2"></div>
                          <span className="text-xs text-mostar-green">LIVE</span>
                        </div>
                      </div>
                      <div className="divide-y divide-white/5">
                        {activityFeed.map((activity) => (
                          <div key={activity.id} className="p-4 hover:bg-white/5 transition-colors">
                            <div className="flex items-start mb-2">
                              {activity.icon}
                              <div className="ml-3">
                                <p className="text-white text-sm">{activity.message}</p>
                                <span className="text-white/50 text-xs">{activity.time}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        {isLoadingNodes ? (
                          <div className="p-4 text-center text-white/50">Loading node data...</div>
                        ) : (
                          aiNodes.slice(0, 5).map((node, index) => (
                            <div key={index} className="p-4 hover:bg-white/5 transition-colors">
                              <div className="flex items-start mb-2">
                                <Server className="h-5 w-5 text-mostar-blue" />
                                <div className="ml-3">
                                  <p className="text-white text-sm">
                                    Node {node.name} reports {node.performance}% efficiency
                                  </p>
                                  <span className="text-white/50 text-xs">
                                    {new Date(node.lastUpdated).toLocaleTimeString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Network Tab Content */}
              {activeTab === 'network' && (
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
              )}
              
              {/* Security Tab Content */}
              {activeTab === 'security' && (
                <div>
                  <h3 className="text-xl font-display font-bold mb-4 text-white">Security & Threat Intelligence</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="glassmorphism rounded-lg p-4">
                      <h4 className="font-mono text-sm text-white/70 mb-2">Threat Level</h4>
                      <div className="text-3xl font-display text-mostar-green">Low</div>
                      <div className="text-xs text-white/50 mt-1">No immediate concerns</div>
                    </div>
                    <div className="glassmorphism rounded-lg p-4">
                      <h4 className="font-mono text-sm text-white/70 mb-2">Incidents Today</h4>
                      <div className="text-3xl font-display text-mostar-light-blue">14</div>
                      <div className="text-xs text-white/50 mt-1">-3 from yesterday</div>
                    </div>
                    <div className="glassmorphism rounded-lg p-4">
                      <h4 className="font-mono text-sm text-white/70 mb-2">Resolution Rate</h4>
                      <div className="text-3xl font-display text-mostar-cyan">99.8%</div>
                      <div className="text-xs text-white/50 mt-1">+0.3% improvement</div>
                    </div>
                    <div className="glassmorphism rounded-lg p-4">
                      <h4 className="font-mono text-sm text-white/70 mb-2">Avg Response Time</h4>
                      <div className="text-3xl font-display text-mostar-magenta">1.2s</div>
                      <div className="text-xs text-white/50 mt-1">-0.3s improvement</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="bg-black/20 rounded-lg p-4 border border-white/5">
                        <h4 className="font-mono text-sm text-white/70 mb-4">Weekly Threat Analysis</h4>
                        <div className="h-60">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={securityData}>
                              <Tooltip 
                                contentStyle={{ backgroundColor: 'rgba(10, 14, 23, 0.8)', borderColor: 'rgba(248, 28, 229, 0.3)' }}
                                labelStyle={{ color: '#f81ce5' }}
                              />
                              <Bar dataKey="value" name="Incidents" fill="#f81ce5" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-1">
                      <div className="bg-black/20 rounded-lg p-4 border border-white/5 h-full">
                        <h4 className="font-mono text-sm text-white/70 mb-4">Security Protocols</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-white">Firewall Status</span>
                              <span className="text-xs text-mostar-green">Active</span>
                            </div>
                            <div className="w-full bg-white/10 h-1 rounded-full">
                              <div className="h-full bg-mostar-green" style={{ width: '100%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-white">Encryption</span>
                              <span className="text-xs text-mostar-green">256-bit AES</span>
                            </div>
                            <div className="w-full bg-white/10 h-1 rounded-full">
                              <div className="h-full bg-mostar-green" style={{ width: '100%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-white">Intrusion Detection</span>
                              <span className="text-xs text-mostar-green">Active</span>
                            </div>
                            <div className="w-full bg-white/10 h-1 rounded-full">
                              <div className="h-full bg-mostar-green" style={{ width: '100%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-white">Threat Database</span>
                              <span className="text-xs text-mostar-cyan">Updating</span>
                            </div>
                            <div className="w-full bg-white/10 h-1 rounded-full">
                              <div className="h-full bg-mostar-cyan" style={{ width: '90%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-white">Authentication</span>
                              <span className="text-xs text-mostar-green">Multi-Factor</span>
                            </div>
                            <div className="w-full bg-white/10 h-1 rounded-full">
                              <div className="h-full bg-mostar-green" style={{ width: '100%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Analytics Tab Content */}
              {activeTab === 'analytics' && (
                <div>
                  <h3 className="text-xl font-display font-bold mb-4 text-white">AI Analytics & Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-black/20 rounded-lg p-4 border border-white/5">
                      <h4 className="font-mono text-sm text-white/70 mb-2">AI Model Performance</h4>
                      <div className="h-60">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={performanceData}>
                            <Tooltip 
                              contentStyle={{ backgroundColor: 'rgba(10, 14, 23, 0.8)', borderColor: 'rgba(0, 255, 157, 0.3)' }}
                              labelStyle={{ color: '#00ff9d' }}
                            />
                            <Line type="monotone" dataKey="value" stroke="#00ff9d" strokeWidth={2} dot={{ r: 4, stroke: '#00ff9d', fill: '#121212' }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="glassmorphism rounded-lg p-6">
                      <h4 className="font-mono text-sm text-white/70 mb-6">AI System Distribution</h4>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-white">Predictive Analytics</span>
                            <span className="text-xs text-mostar-light-blue">25%</span>
                          </div>
                          <div className="w-full bg-white/10 h-1 rounded-full mb-4">
                            <div className="h-full bg-mostar-light-blue" style={{ width: '25%' }}></div>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-white">Neural Networks</span>
                            <span className="text-xs text-mostar-cyan">30%</span>
                          </div>
                          <div className="w-full bg-white/10 h-1 rounded-full mb-4">
                            <div className="h-full bg-mostar-cyan" style={{ width: '30%' }}></div>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-white">ML Algorithms</span>
                            <span className="text-xs text-mostar-green">20%</span>
                          </div>
                          <div className="w-full bg-white/10 h-1 rounded-full">
                            <div className="h-full bg-mostar-green" style={{ width: '20%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-white">Data Fusion</span>
                            <span className="text-xs text-mostar-magenta">15%</span>
                          </div>
                          <div className="w-full bg-white/10 h-1 rounded-full mb-4">
                            <div className="h-full bg-mostar-magenta" style={{ width: '15%' }}></div>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-white">Quantum Computing</span>
                            <span className="text-xs text-mostar-yellow">10%</span>
                          </div>
                          <div className="w-full bg-white/10 h-1 rounded-full mb-4">
                            <div className="h-full bg-mostar-yellow" style={{ width: '10%' }}></div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-white font-medium">Efficiency Rating</span>
                            <span className="text-xs text-mostar-green font-medium">94.3%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Command Center Tab Content */}
              {activeTab === 'command' && (
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
                          <span className="font-mono text-mostar-light-blue mr-2">></span>
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
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MostarHub;
