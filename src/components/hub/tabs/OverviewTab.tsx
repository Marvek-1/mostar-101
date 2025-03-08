
import React from 'react';
import { Server, Shield, Brain, Database, Globe } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Tooltip } from 'recharts';
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
  isLoadingNodes
}) => {
  return (
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
  );
};

export default OverviewTab;
