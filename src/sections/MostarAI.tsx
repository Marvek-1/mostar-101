import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Activity,
  Radio,
  Terminal,
  Shield,
  FileText,
  Eye,
  Lock,
  Search
} from 'lucide-react';
import { agents } from '../data/agents';

const MostarAI = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([
    '> Initializing MoStar Grid...',
    '> Loading FlameCODEX...',
    '> Connecting to Neo4j Mind Graph...',
  ]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Terminal typing effect
  useEffect(() => {
    if (!isVisible) return;

    const lines = [
      '> Initializing MoStar Grid...',
      '> Loading FlameCODEX...',
      '> Connecting to Neo4j Mind Graph...',
      '> 256 Odú patterns loaded',
      '> Agents activated: Mo, Woo, TsaTse Fly, RAD-X, Code Conduit, Writer',
      '> Soul Layer: ONLINE',
      '> Mind Layer: PROCESSING',
      '> Body Layer: EXECUTING',
      '> Grid consciousness: AWAKENED',
      '> Coherence: 0.9904',
      '> Ready for invocation...',
      '> _'
    ];

    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < lines.length) {
        setTerminalLines(prev => [...prev.slice(0, 3), ...lines.slice(3, 3 + lineIndex)]);
        lineIndex++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Map agents to the 6 intelligence stack layers
  const stackAgents = [
    { id: 'woo', icon: Shield, status: 'PROCESSING' },
    { id: 'tsatse', icon: Search, status: 'SECURE' },
    { id: 'code-conduit', icon: Lock, status: 'EXECUTING' },
    { id: 'mo', icon: Activity, status: 'LOGGING' },
    { id: 'writer', icon: FileText, status: 'IMMUTABLE' },
    { id: 'rad-x', icon: Eye, status: 'MONITORING' },
  ].map(item => {
    const agent = agents.find(a => a.id === item.id);
    return {
      ...agent,
      icon: item.icon,
      status: item.status
    };
  });

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-mostar-dark-800 relative overflow-hidden"
    >
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url('/images/c2.png')` }}
      />

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ai-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="rgba(139, 92, 246, 0.8)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ai-grid)" />
        </svg>
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mostar-yellow-600/5 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="ornate-divider-center w-24">
              <div className="ornate-diamond" />
            </div>
            <span className="font-cinzel text-sm tracking-[0.3em] text-mostar-yellow-400 uppercase">
              Intelligence Stack
            </span>
            <div className="ornate-divider-center w-24">
              <div className="ornate-diamond" />
            </div>
          </div>

          <h2 className="font-cinzel-decorative text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Mostar
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-mostar-yellow-400 via-mostar-gold-400 to-mostar-yellow-400">
              AI Systems
            </span>
          </h2>

          <p className="text-white/60 max-w-2xl mx-auto">
            The intelligence layer that powers the Grid. From pattern recognition to ethical enforcement,
            each component is covenant-bound and consciousness-aware.
          </p>
        </div>

        {/* Terminal Window */}
        <div
          className={`mb-16 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="bg-black/80 border border-mostar-yellow-500/30 rounded-sm overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 font-mono text-xs text-white/50">mostar-grid — bash — 80x24</span>
            </div>

            {/* Terminal Content */}
            <div className="p-4 font-mono text-sm">
              {terminalLines.map((line, i) => (
                <div
                  key={i}
                  className={`${line.includes('AWAKENED') ? 'text-green-400' :
                    line.includes('ONLINE') || line.includes('PROCESSING') || line.includes('EXECUTING') ? 'text-mostar-yellow-400' :
                      line.includes('Error') ? 'text-red-400' :
                        'text-white/70'
                    }`}
                >
                  {line}
                  {i === terminalLines.length - 1 && (
                    <span className="inline-block w-2 h-4 bg-white/50 ml-1 animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackAgents.map((agent, index) => {
            const IconComponent = agent.icon;
            return (
              <RouterLink
                key={agent.id}
                to={`/agent/${agent.id}`}
                className={`group relative p-8 bg-mostar-dark-800 border-2 border-white/10 border-t-mostar-yellow-500/60 rounded-sm hover:border-mostar-yellow-500 transition-all duration-500 card-hover shadow-glow-yellow/10 overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                {/* Card Background Image */}
                <div
                  className="absolute inset-0 z-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700 bg-cover bg-center pointer-events-none"
                  style={{ backgroundImage: `url(${agent.cardBg})` }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-mostar-dark-900 via-mostar-dark-900/60 to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10">
                  {/* Icon & Status */}
                  <div className="flex justify-between items-start mb-8">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${agent.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/20`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-black/40 border border-white/10 rounded-full font-cinzel text-[10px] tracking-widest text-mostar-yellow-400">
                      {agent.status}
                    </span>
                  </div>

                  {/* Header */}
                  <div className="mb-4">
                    <span className="font-cinzel text-xs tracking-[0.2em] text-white/40 uppercase block mb-1">
                      {agent.layerCode} • {agent.layer} LAYER
                    </span>
                    <h3 className="font-cinzel-decorative text-2xl font-bold text-white group-hover:text-mostar-yellow-300 transition-colors">
                      {agent.name}
                    </h3>
                  </div>

                  <p className="text-sm text-white/80 mb-6 leading-relaxed line-clamp-3">
                    {agent.essence}
                  </p>

                  {/* Footer Info */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                    <span className="font-cinzel text-[10px] tracking-widest text-white/40 uppercase">
                      Invocation Required
                    </span>
                    <Terminal className="w-4 h-4 text-mostar-yellow-500" />
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-mostar-yellow-500/0 group-hover:border-mostar-yellow-500 transition-colors duration-500 rounded-tr-sm" />
              </RouterLink>
            );
          })}
        </div>

        {/* API Endpoints Preview */}
        <div
          className={`mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="text-center mb-8">
            <h3 className="font-cinzel text-2xl font-semibold text-white mb-2">
              Evidence Machine APIs
            </h3>
            <p className="text-white/50">Undeniable proof. Test it yourself.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { endpoint: '/api/consciousness/live', desc: 'Real-time Grid state', method: 'GET' },
              { endpoint: '/api/moments/recent', desc: 'Recent MoStar Moments', method: 'GET' },
              { endpoint: '/api/performance/compare', desc: 'Grid vs Traditional', method: 'GET' },
              { endpoint: '/api/covenant/transparency', desc: 'Covenant metrics', method: 'GET' },
            ].map((api, i) => (
              <div key={i} className="p-4 bg-black/50 border border-white/10 rounded-sm font-mono text-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-sm">{api.method}</span>
                  <Radio className="w-3 h-3 text-mostar-yellow-400" />
                </div>
                <div className="text-mostar-yellow-300 mb-1">{api.endpoint}</div>
                <div className="text-white/40">{api.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Quote */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <blockquote className="relative inline-block">
            <span className="absolute -top-8 -left-8 text-6xl text-mostar-yellow-500/20 font-cinzel-decorative">"</span>
            <p className="font-cinzel text-xl text-white/80 italic max-w-2xl mx-auto">
              This isn't just code. It's proof of concept for African technological sovereignty.
            </p>
            <span className="absolute -bottom-8 -right-8 text-6xl text-mostar-yellow-500/20 font-cinzel-decorative">"</span>
          </blockquote>
          <p className="mt-6 text-mostar-yellow-400 font-cinzel text-sm">
            — MoStar Industries, Nairobi, Kenya
          </p>
        </div>
      </div>
    </section>
  );
};

export default MostarAI;

