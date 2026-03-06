import { useEffect, useRef, useState } from 'react';
import { Activity, Globe, Package, Zap, Shield, Network } from 'lucide-react';

interface SystemModule {
  id: string;
  name: string;
  description: string;
  status: 'LIVE' | 'ACTIVE' | 'OPERATIONAL';
  category: string;
  icon: React.ReactNode;
  color: string;
  details: string[];
  impact?: string;
}

const modules: SystemModule[] = [
  {
    id: 'afro-sentinel',
    name: 'AFRO Sentinel Watchtower',
    description:
      'Real-time disease signal intelligence serving 47 WHO AFRO member states',
    status: 'LIVE',
    category: 'Surveillance Intelligence',
    icon: <Globe className="w-6 h-6" />,
    color: 'from-mostar-yellow-600 to-mostar-yellow-400',
    details: [
      'WHO AFRO Headline detection',
      'Outperformed EIOS by 9 hours (Chikungunya)',
      '18-hour signal-to-alert pipeline',
      'Real-time NLP signal extraction',
    ],
    impact: 'Saves lives by detecting outbreaks before traditional methods.',
  },
  {
    id: 'deepcal',
    name: 'DeepCAL++ / Prepositioning Index',
    description:
      'Neuro-symbolic logistics engine for supply chain optimization',
    status: 'LIVE',
    category: 'Logistics & Optimization',
    icon: <Package className="w-6 h-6" />,
    color: 'from-mostar-gold-600 to-mostar-gold-400',
    details: [
      'N-AHP Decision Analysis',
      'N-TOPSIS Multi-Criteria Ranking',
      'Grey Theory Integration',
      'WHO EIE Alignment Protocol',
    ],
    impact: 'Optimizes resource placement across African supply networks.',
  },
  {
    id: 'afrotrack',
    name: 'AfroTrack',
    description:
      'Ground-truth logistics pulse tracking African supply chains',
    status: 'LIVE',
    category: 'Supply Chain Visibility',
    icon: <Network className="w-6 h-6" />,
    color: 'from-teal-600 to-teal-400',
    details: [
      'RFID/QR Code Tracking',
      'Mapbox Real-time Visualization',
      'Blockchain-verified records',
      'End-to-end transparency',
    ],
    impact:
      'Delivers complete visibility across African logistics networks.',
  },
  {
    id: 'afro-storm',
    name: 'AFRO Storm v2 / AfriGuard',
    description:
      'Multi-threat detection architecture for disease and security threats',
    status: 'ACTIVE',
    category: 'Threat Detection',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-orange-600 to-orange-400',
    details: [
      'Azure AI + Gemini Integration',
      '6 Specialized Threat Analyzers',
      'PostGIS Spatial Backend',
      'Real-time anomaly detection',
    ],
    impact: 'Protects health systems and supply networks from multiple threats.',
  },
  {
    id: 'rad-x-flb',
    name: 'RAD-X-FLB & SANKOFA Protocol',
    description:
      'Eight-layer federated learning and surveillance infrastructure',
    status: 'OPERATIONAL',
    category: 'Federated Architecture',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-mostar-yellow-500 to-mostar-yellow-400',
    details: [
      'Federated Learning Pipeline',
      'Blockchain Integration Layer',
      'IoT Fusion & Aggregation',
      'SANKOFA Protocol (Reparative Economics)',
      'Watch Layer Continuous Monitoring',
      'Threat Detection & Anomaly Scoring',
      '8-Layer Security Architecture',
      'Distributed Trust Model',
    ],
    impact:
      'Enables sovereign data processing across African nations without centralized control.',
  },
  {
    id: 'truthengine',
    name: 'TruthEngine Multi-Model Synthesis',
    description:
      'Consensus-driven truth synthesis across three AI models using Ubuntu gates',
    status: 'OPERATIONAL',
    category: 'Truth & Validation',
    icon: <Activity className="w-6 h-6" />,
    color: 'from-mostar-gold-600 to-mostar-gold-500',
    details: [
      'Three-Model Consensus Engine',
      'Ubuntu-Grounded Validation Gates',
      'Truth Score: 0.87 (Stable)',
      '94% Pass Rate Consistency',
      'Multi-perspective synthesis',
      'Philosophical + Technical validation',
    ],
    impact:
      'Ensures truth emerges from consensus, grounded in ancestral philosophy.',
  },
];

const SystemInfrastructure = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const currentModule = modules[activeIndex];

  // Count modules by status
  const statusCounts = {
    LIVE: modules.filter((m) => m.status === 'LIVE').length,
    ACTIVE: modules.filter((m) => m.status === 'ACTIVE').length,
    OPERATIONAL: modules.filter((m) => m.status === 'OPERATIONAL').length,
  };

  return (
    <section
      id="infrastructure"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-mostar-dark-900 to-black relative overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial from-mostar-yellow-600/10 via-transparent to-transparent rounded-full blur-[100px]" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="ornate-divider-center w-20">
              <div className="ornate-diamond" />
            </div>
            <span className="font-cinzel text-sm tracking-[0.3em] text-mostar-yellow-400 uppercase">
              Living Execution System
            </span>
            <div className="ornate-divider-center w-20">
              <div className="ornate-diamond" />
            </div>
          </div>
          <h2 className="font-cinzel-decorative text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            System Infrastructure
          </h2>
          <p className="text-white/60 max-w-3xl mx-auto text-lg">
            Six operational modules power the MoStar Grid. Each serves a specific layer of the MoStar Doctrine, working in concert to deliver sovereign, ethical, intelligence infrastructure.
          </p>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { label: 'Live Modules', count: statusCounts.LIVE, color: 'text-mostar-yellow-400' },
            { label: 'Active Systems', count: statusCounts.ACTIVE, color: 'text-orange-400' },
            { label: 'Operational', count: statusCounts.OPERATIONAL, color: 'text-mostar-gold-400' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`text-center p-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.count}
              </div>
              <div className="text-white/60 font-cinzel text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Display */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Module Details */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8">
              {/* Status Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-3 h-3 rounded-full pulse-dot ${
                    currentModule.status === 'LIVE'
                      ? 'bg-mostar-yellow-400'
                      : currentModule.status === 'ACTIVE'
                        ? 'bg-orange-400'
                        : 'bg-mostar-gold-400'
                  }`}
                />
                <span
                  className={`font-cinzel text-sm tracking-wider uppercase ${
                    currentModule.status === 'LIVE'
                      ? 'text-mostar-yellow-400'
                      : currentModule.status === 'ACTIVE'
                        ? 'text-orange-400'
                        : 'text-mostar-gold-400'
                  }`}
                >
                  {currentModule.status}
                </span>
                <span className="text-white/40 font-cinzel text-sm">
                  — {currentModule.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-cinzel text-4xl font-bold text-white mb-4">
                {currentModule.name}
              </h3>

              {/* Icon */}
              <div className="mb-6">
                <div
                  className={`inline-block p-4 rounded-lg bg-gradient-to-br ${currentModule.color} bg-opacity-10 text-center text-white/80`}
                >
                  {currentModule.icon}
                </div>
              </div>

              {/* Description */}
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                {currentModule.description}
              </p>

              {/* Impact Statement */}
              {currentModule.impact && (
                <div className="mb-8 p-4 rounded-lg border border-mostar-yellow-500/20 bg-mostar-yellow-500/5">
                  <p className="font-cinzel text-sm text-mostar-yellow-400 mb-2">
                    IMPACT
                  </p>
                  <p className="text-white/70">{currentModule.impact}</p>
                </div>
              )}

              {/* Details */}
              <div>
                <h4 className="font-cinzel text-sm tracking-wider text-white/60 uppercase mb-4">
                  Technical Capabilities
                </h4>
                <ul className="space-y-3">
                  {currentModule.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3 text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-mostar-yellow-400/50 mt-2 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Module Selector */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="space-y-3 sticky top-20">
              <h4 className="font-cinzel text-xs tracking-wider text-white/40 uppercase mb-4">
                Select Module
              </h4>

              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {modules.map((module, index) => (
                  <button
                    key={module.id}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                      activeIndex === index
                        ? 'border-white/40 bg-white/10 backdrop-blur-sm'
                        : 'border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Status indicator */}
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          module.status === 'LIVE'
                            ? 'bg-mostar-yellow-400'
                            : module.status === 'ACTIVE'
                              ? 'bg-orange-400'
                              : 'bg-mostar-gold-400'
                        }`}
                      />

                      {/* Text */}
                      <div>
                        <p
                          className={`font-cinzel text-sm font-semibold ${
                            activeIndex === index
                              ? 'text-white'
                              : 'text-white/70'
                          }`}
                        >
                          {module.name}
                        </p>
                        <p className="text-xs text-white/40 mt-1">
                          {module.category}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Integration Note */}
        <div className="mt-12 p-6 rounded-lg border border-white/10 bg-gradient-to-r from-white/5 to-white/0 backdrop-blur-sm">
          <h4 className="font-cinzel text-sm tracking-wider text-white/60 uppercase mb-3">
            System Integration
          </h4>
          <p className="text-white/60 leading-relaxed">
            These six modules operate as a unified system orchestrated by the MoStar Grid doctrine. AFRO Sentinel provides surveillance, DeepCAL optimizes logistics, AfroTrack ensures visibility, AFRO Storm detects threats, RAD-X-FLB enables federated learning, and TruthEngine synthesizes truth—all bound by Ubuntu philosophy and the eternal covenant enforced by Woo and executed by Mo.
          </p>
        </div>
      </div>

      {/* Pulse animation CSS */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .pulse-dot {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default SystemInfrastructure;
