
import React from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartDataPoint } from '../../../types/ai-hub';

interface AnalyticsTabProps {
  performanceData: ChartDataPoint[];
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ performanceData }) => {
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <img 
          src="/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png" 
          alt="Mostar AI Logo" 
          className="w-12 h-12 rounded-full border border-mostar-light-blue/30"
        />
        <h3 className="text-xl font-display font-bold text-white">AI Analytics & Insights</h3>
      </div>
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
  );
};

export default AnalyticsTab;
