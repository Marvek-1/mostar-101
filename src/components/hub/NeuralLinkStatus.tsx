import React, { useEffect, useState } from 'react';
import { Activity, Zap, Radio } from 'lucide-react';

interface NeuralLink {
  id: string;
  source: string;
  target: string;
  bandwidth: number;
  latency: number;
  status: 'active' | 'degraded' | 'offline';
}

const NeuralLinkStatus: React.FC = () => {
  const [links, setLinks] = useState<NeuralLink[]>([
    { id: '1', source: 'Overlord', target: 'Assessor', bandwidth: 98.5, latency: 2, status: 'active' },
    { id: '2', source: 'Assessor', target: 'Judge', bandwidth: 99.2, latency: 1, status: 'active' },
    { id: '3', source: 'Judge', target: 'Executor', bandwidth: 97.8, latency: 3, status: 'active' },
    { id: '4', source: 'Oracle', target: 'DeepCAL', bandwidth: 95.4, latency: 4, status: 'active' },
    { id: '5', source: 'Woo', target: 'Grid', bandwidth: 99.7, latency: 1, status: 'active' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLinks(prev => prev.map(link => ({
        ...link,
        bandwidth: Math.max(90, Math.min(100, link.bandwidth + (Math.random() - 0.5) * 2)),
        latency: Math.max(1, Math.min(10, link.latency + (Math.random() - 0.5))),
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'degraded': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const avgBandwidth = links.reduce((acc, link) => acc + link.bandwidth, 0) / links.length;
  const avgLatency = links.reduce((acc, link) => acc + link.latency, 0) / links.length;

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
          <Radio className="w-5 h-5 animate-pulse" />
          Neural Link Status
        </h3>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">Avg: {avgBandwidth.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300">{avgLatency.toFixed(1)}ms</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {links.map((link) => (
          <div
            key={link.id}
            className="bg-black/60 rounded-lg p-4 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(link.status)} animate-pulse`}></div>
                <span className="text-white font-medium">
                  {link.source} → {link.target}
                </span>
              </div>
              <span className={`text-xs font-bold uppercase ${getStatusColor(link.status)}`}>
                {link.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-400 text-xs mb-1">Bandwidth</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-green-400 transition-all duration-500"
                      style={{ width: `${link.bandwidth}%` }}
                    ></div>
                  </div>
                  <span className="text-cyan-400 font-mono text-xs">
                    {link.bandwidth.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div>
                <div className="text-gray-400 text-xs mb-1">Latency</div>
                <div className="flex items-center gap-2">
                  <Activity className="w-3 h-3 text-blue-400" />
                  <span className="text-blue-400 font-mono text-xs">
                    {link.latency.toFixed(1)}ms
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-cyan-500/20">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="text-gray-400 text-xs mb-1">Active Links</div>
            <div className="text-green-400 font-bold text-lg">{links.filter(l => l.status === 'active').length}</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs mb-1">Total Throughput</div>
            <div className="text-cyan-400 font-bold text-lg">{(avgBandwidth * links.length / 10).toFixed(1)} Gb/s</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs mb-1">Grid Health</div>
            <div className="text-green-400 font-bold text-lg">
              {avgBandwidth > 95 ? 'Optimal' : avgBandwidth > 85 ? 'Good' : 'Degraded'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralLinkStatus;
