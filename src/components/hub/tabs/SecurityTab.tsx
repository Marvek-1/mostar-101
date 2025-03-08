
import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartDataPoint } from '../../../types/ai-hub';

interface SecurityTabProps {
  securityData: ChartDataPoint[];
}

const SecurityTab: React.FC<SecurityTabProps> = ({ securityData }) => {
  return (
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
  );
};

export default SecurityTab;
