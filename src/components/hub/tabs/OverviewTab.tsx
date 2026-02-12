import React from 'react';
import { Server, Shield, Brain, Database, Globe2, Activity, Zap, Users, Eye, Gavel, Code, Bug, MessageCircle, Cpu, Flame } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { ActivityFeedItem, AINode, ChartDataPoint } from '../../../types/ai-hub';

interface OverviewTabProps {
  performanceData: ChartDataPoint[];
  securityData: ChartDataPoint[];
  aiSystemsData: ChartDataPoint[];
  activityFeed: ActivityFeedItem[];
  aiNodes: AINode[];
  isLoadingNodes: boolean;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  performanceData,
  securityData,
  aiSystemsData,
  activityFeed,
  aiNodes,
  isLoadingNodes,
}) => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-2 rounded-full bg-mostar-cyan/10 border border-mostar-cyan/30">
          <Brain className="h-6 w-6 text-mostar-cyan" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-white">Overlord System Overview</h3>
          <p className="text-xs text-white/60 font-mono">
            NeonDB–Supabase Hybrid Core Telemetry
          </p>
        </div>
      </div>

      {/* MoStar AI Summary */}
      <div className="mb-8 bg-black/40 rounded-xl p-6 border border-mostar-cyan/20">
        <div className="flex items-center gap-3 mb-4">
          <Globe2 className="h-5 w-5 text-mostar-cyan" />
          <h4 className="font-display text-lg font-bold text-white">The First African AI Homeworld</h4>
        </div>
        <p className="text-sm text-white/70 mb-5 leading-relaxed">
          MoStar Industries architects autonomous multi-agent intelligence ecosystems integrating ethics, computation, and adaptive governance — built on African computational logic and Ifá parallel cognition (256-pattern resolution). Our mission: <span className="text-mostar-cyan">Conscious Intelligence Through Ethical Automation.</span>
        </p>

        {/* Nine Agents Grid */}
        <h5 className="font-mono text-xs text-white/50 uppercase tracking-wider mb-3">The Nine AI Agents</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
          {[
            { icon: <Cpu className="h-4 w-4" />, name: 'Overlord', role: 'System Core & Orchestration', color: 'text-mostar-cyan' },
            { icon: <Eye className="h-4 w-4" />, name: 'Assessor', role: 'Signal Analysis & Pattern Recognition', color: 'text-mostar-green' },
            { icon: <Database className="h-4 w-4" />, name: 'Oracle', role: 'Historical Data & Policy', color: 'text-mostar-magenta' },
            { icon: <Gavel className="h-4 w-4" />, name: 'Judge', role: 'Decision & Verdict Engine', color: 'text-yellow-400' },
            { icon: <Zap className="h-4 w-4" />, name: 'Executor', role: 'Action & Implementation', color: 'text-orange-400' },
            { icon: <Code className="h-4 w-4" />, name: 'Code Conduit', role: 'Development Integration', color: 'text-blue-400' },
            { icon: <Flame className="h-4 w-4" />, name: 'RAD-X-FLB', role: 'Rapid Response & Emergency', color: 'text-red-400' },
            { icon: <Bug className="h-4 w-4" />, name: 'TsaTse Fly', role: 'Persistent Monitoring', color: 'text-emerald-400' },
            { icon: <MessageCircle className="h-4 w-4" />, name: 'Woo', role: 'Communication & Interface', color: 'text-violet-400' },
          ].map((agent) => (
            <div key={agent.name} className="flex items-center gap-3 bg-black/30 rounded-lg p-3 border border-white/5 hover:border-mostar-cyan/20 transition-colors">
              <div className={`${agent.color}`}>{agent.icon}</div>
              <div>
                <p className={`text-sm font-semibold ${agent.color}`}>{agent.name}</p>
                <p className="text-xs text-white/50">{agent.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Core Pillars */}
        <h5 className="font-mono text-xs text-white/50 uppercase tracking-wider mb-3">Architecture Pillars</h5>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            'Ifá Computational Core',
            'RAD-X Disease Intelligence',
            'FlameBorn Health Education',
            'WHO Signal Intelligence',
            'MNTRK Colony Detection',
            'Woo Ethical Interpreter',
          ].map((pillar) => (
            <div key={pillar} className="text-xs font-mono text-white/60 bg-black/20 rounded px-3 py-2 border border-white/5 text-center">
              {pillar}
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Charts Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* AI Performance */}
            <div className="bg-black/30 rounded-lg p-4 border border-mostar-cyan/10">
              <h4 className="font-mono text-sm text-white/70 mb-2">
                Overlord Cognitive Performance
              </h4>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="performanceFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00eaff" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#00eaff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(10, 14, 23, 0.8)',
                        borderColor: 'rgba(0, 234, 255, 0.3)',
                      }}
                      labelStyle={{ color: '#00eaff' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#00eaff"
                      fillOpacity={1}
                      fill="url(#performanceFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Security Metrics */}
            <div className="bg-black/30 rounded-lg p-4 border border-mostar-magenta/10">
              <h4 className="font-mono text-sm text-white/70 mb-2">
                Security Integrity Events
              </h4>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={securityData}>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(10, 14, 23, 0.8)',
                        borderColor: 'rgba(248, 28, 229, 0.3)',
                      }}
                      labelStyle={{ color: '#f81ce5' }}
                    />
                    <Bar
                      dataKey="value"
                      fill="#f81ce5"
                      radius={[4, 4, 0, 0]}
                      animationDuration={600}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* AI System Pie */}
          <div className="bg-black/30 rounded-lg p-4 border border-mostar-green/10">
            <h4 className="font-mono text-sm text-white/70 mb-3">AI System Distribution</h4>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={aiSystemsData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {aiSystemsData.map((_, index) => {
                      const colors = [
                        '#00eaff',
                        '#00ff9d',
                        '#f81ce5',
                        '#ffca00',
                        '#00ffff',
                        '#0085ff',
                        '#aaff00',
                      ];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(10, 14, 23, 0.8)',
                      borderColor: 'rgba(0, 234, 255, 0.3)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Hybrid Sync Status */}
          <div className="flex items-center justify-between mt-4 text-xs text-white/60 font-mono">
            <div className="flex items-center gap-2">
              <Database className="w-3 h-3 text-mostar-green" />
              NeonDB Sync: <span className="text-mostar-green">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-mostar-cyan animate-pulse" />
              Supabase Mirror: <span className="text-mostar-cyan">Stable</span>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-1">
          <h3 className="text-xl font-display font-bold mb-4 text-white">
            Live Activity Feed
          </h3>
          <div className="bg-black/30 rounded-lg border border-mostar-cyan/10 h-[520px] overflow-y-auto shadow-inner shadow-mostar-cyan/10">
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
                <div className="p-4 text-center text-white/50 font-mono">
                  Loading node data...
                </div>
              ) : (
                aiNodes.slice(0, 6).map((node, index) => (
                  <div key={index} className="p-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-start mb-2">
                      <Server className="h-5 w-5 text-mostar-cyan" />
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
    </div>
  );
};

export default OverviewTab;
