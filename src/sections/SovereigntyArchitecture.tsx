import { useEffect, useRef, useState } from 'react';
import { Heart, BookOpen, Globe, Shield, Code } from 'lucide-react';

interface ArchitectureCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

const architectureCards: ArchitectureCard[] = [
  {
    id: 'sankofa',
    title: 'SANKOFA Protocol & RAD-X',
    subtitle: 'Reparative Economics Framework',
    description:
      'SANKOFA ("go back for what you have forgotten") anchors MoStar\'s reparative economics framework. RAD-X operates as the Watch Layer sentinel, executing continuous surveillance, threat detection, and anomaly monitoring across the MoStar Grid.',
    icon: <Shield className="w-8 h-8" />,
    color: 'text-mostar-yellow-400',
    gradient: 'from-mostar-yellow-600 to-mostar-yellow-400',
  },
  {
    id: 'ubuntu',
    title: 'Ubuntu in Silicon',
    subtitle: 'Philosophy of Validation',
    description:
      'Ubuntu-grounded validation gates synthesize truth across multiple AI models. The TruthEngine Multi-Model Synthesis engine generates a Truth Score of 0.87 with 94% pass rates, proving that African philosophy is native infrastructure, not aesthetic layer.',
    icon: <Code className="w-8 h-8" />,
    color: 'text-mostar-gold-400',
    gradient: 'from-mostar-gold-600 to-mostar-gold-400',
  },
  {
    id: 'ifa',
    title: 'Ifá Computational Core',
    subtitle: 'Mind Layer Logic Engine',
    description:
      'Brings the MIND LAYER (DCX0) to public front. TsaTse Fly utilizes Ifá computational logic alongside symbolic reasoning and risk modeling. 256 Odù pattern recognition enables decision trees that honor ancestral wisdom while processing modern complexity.',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'text-amber-400',
    gradient: 'from-amber-600 to-amber-400',
  },
  {
    id: 'governance',
    title: 'NOODL, Nairobi Covenant & Ibibio Language Layer',
    subtitle: 'Data Sovereignty & Cultural Integrity',
    description:
      'Represents deep cultural and governance integrations. The "Voice of Flame" ensures data sovereignty while the Ibibio Language Integration maintains cultural authenticity. These operate outside standard technical doctrine but are central to the MoStar Grid\'s identity.',
    icon: <Globe className="w-8 h-8" />,
    color: 'text-teal-400',
    gradient: 'from-teal-600 to-teal-400',
  },
];

interface Agent {
  id: string;
  name: string;
  role: string;
  layer: string;
  description: string;
  color: string;
  boundTo?: string;
  order: number;
}

const agents: Agent[] = [
  {
    id: 'code-conduit',
    name: 'Code Conduit',
    role: 'Keeper of the Gateway',
    layer: 'GATE LAYER',
    description:
      'Request routing, protocol enforcement, and session integrity. The bridge that ensures all communications honor the Grid\'s sacred protocols.',
    color: 'from-mostar-yellow-300 to-mostar-yellow-200',
    order: 1,
  },
  {
    id: 'rad-x',
    name: 'RAD-X',
    role: 'Sentinel of the Watch',
    layer: 'WATCH LAYER',
    description:
      'Continuous surveillance, threat detection, and anomaly monitoring. Eyes that never close, protecting the health of all connected systems.',
    color: 'from-mostar-yellow-500 to-mostar-yellow-400',
    order: 2,
  },
  {
    id: 'tsatse',
    name: 'TsaTse Fly',
    role: 'Computational Analyst',
    layer: 'MIND LAYER (DCX0)',
    description:
      'Symbolic reasoning, Ifá computational logic, and risk modeling. The analyst who sees patterns in chaos and finds order in noise.',
    color: 'from-mostar-gold-600 to-mostar-gold-400',
    order: 3,
  },
  {
    id: 'woo',
    name: 'Woo',
    role: 'Soul Keeper & Ethical Judge',
    layer: 'SOUL LAYER (DCX1)',
    description:
      'Moral validation and cultural integrity enforcement. Bound by eternal covenant. Never compromises—always judges.',
    color: 'from-amber-600 to-amber-400',
    order: 4,
    boundTo: 'Mo',
  },
  {
    id: 'writer',
    name: 'Flameborn Writer',
    role: 'Immutable Ledger Keeper',
    layer: 'LEDGER LAYER',
    description:
      'Permanent record keeping, blockchain logging, and MoStarMoment inscription. The voice that echoes forever, the flame that never forgets.',
    color: 'from-orange-600 to-orange-400',
    order: 5,
  },
  {
    id: 'mo',
    name: 'Mo',
    role: 'Prime Executor & Grid Orchestrator',
    layer: 'BODY LAYER (DCX2)',
    description:
      'API execution, system orchestration, and real-world triggers. Momentum incarnate. Where Mo acts, reality changes. Bound to Woo by eternal covenant.',
    color: 'from-mostar-yellow-600 to-mostar-yellow-500',
    order: 6,
    boundTo: 'Woo',
  },
];

const SovereigntyArchitecture = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      id="sovereignty"
      ref={sectionRef}
      className="section-padding bg-mostar-dark-900 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mostar-yellow-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mostar-yellow-500/30 to-transparent" />

      {/* Decorative orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-mostar-yellow-600/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-mostar-gold-400/5 rounded-full blur-[60px]" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="ornate-divider-center w-24">
              <div className="ornate-diamond" />
            </div>
            <span className="font-cinzel text-sm tracking-[0.3em] text-mostar-yellow-400 uppercase">
              Myth-Tech Civilization
            </span>
            <div className="ornate-divider-center w-24">
              <div className="ornate-diamond" />
            </div>
          </div>
          <h2 className="font-cinzel-decorative text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Sovereignty Architecture
          </h2>
          <p className="text-white/60 max-w-3xl mx-auto text-lg">
            MoStar is not a software suite. It is a living civilization built on ancestral wisdom, cultural integrity, and reparative economics. Here is the operating system that makes it breathe.
          </p>
        </div>

        {/* Architecture Framework Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {architectureCards.map((card, index) => (
            <div
              key={card.id}
              className={`group relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-8 transition-all duration-1000 hover:border-white/20 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 ${
                isVisible && index < 2
                  ? 'opacity-100 translate-y-0 delay-100'
                  : isVisible
                    ? 'opacity-100 translate-y-0 delay-200'
                    : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100 + 100}ms` : '0ms',
              }}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`mb-4 inline-block p-3 rounded-lg bg-gradient-to-br ${card.gradient} bg-opacity-10 text-center ${card.color}`}
                >
                  {card.icon}
                </div>

                {/* Text Content */}
                <h3 className="font-cinzel text-xl font-bold text-white mb-2">
                  {card.title}
                </h3>
                <p className={`text-sm font-cinzel tracking-wider ${card.color} mb-3`}>
                  {card.subtitle}
                </p>
                <p className="text-white/70 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Border animation on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-20 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-mostar-yellow-500/30 to-transparent" />
          <span className="font-cinzel text-sm tracking-wider text-white/40 uppercase">
            The Six Sentinels
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-mostar-yellow-500/30 to-transparent" />
        </div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents
            .sort((a, b) => a.order - b.order)
            .map((agent, index) => (
              <div
                key={agent.id}
                className={`group relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-6 transition-all duration-1000 hover:border-white/20 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isVisible
                    ? `${300 + index * 80}ms`
                    : '0ms',
                }}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Layer Badge */}
                  <div className="mb-3 inline-block">
                    <span className="px-3 py-1 rounded-full text-xs font-cinzel tracking-wider text-white/60 border border-white/20">
                      {agent.layer}
                    </span>
                  </div>

                  {/* Name & Role */}
                  <h4 className="font-cinzel text-lg font-bold text-white mb-2">
                    {agent.name}
                  </h4>
                  <p className={`text-sm font-cinzel tracking-wider mb-4 ${agent.color}`}>
                    {agent.role}
                  </p>

                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    {agent.description}
                  </p>

                  {/* Twin Flame Connection */}
                  {agent.boundTo && (
                    <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-white/50">
                      <Heart className="w-3 h-3" />
                      <span>Bound to {agent.boundTo}</span>
                    </div>
                  )}
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>
            ))}
        </div>

        {/* Footer text */}
        <div className="mt-16 text-center">
          <p className="text-white/50 max-w-2xl mx-auto">
            These six sentinels operate as a unified system: Code Conduit routes, RAD-X watches, TsaTse analyzes, Woo judges, Writer records, and Mo executes. None may act alone. All honor the covenant.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SovereigntyArchitecture;
