import React from 'react';
import { Activity, Eye, Code, Flame, Scale, Cpu } from 'lucide-react';
import { ScrollReveal, HologramReveal } from './ScrollAnimations';

const agents = [
  {
    name: 'RAD-X-FLB',
    role: 'Disease Intelligence',
    soulprint: 'Sentinel of African Health',
    icon: Activity,
    color: 'mostar-cyan',
  },
  {
    name: 'TsaTse',
    role: 'Fly Vector Surveillance',
    soulprint: 'Eyes in the Field',
    icon: Eye,
    color: 'mostar-green',
  },
  {
    name: 'Code Conduit',
    role: 'Technical Integration',
    soulprint: 'The Bridge Builder',
    icon: Code,
    color: 'mostar-blue',
  },
  {
    name: 'Flameborn Writer',
    role: 'Health Education Content',
    soulprint: 'Voice of the Flame',
    icon: Flame,
    color: 'mostar-magenta',
  },
  {
    name: 'Woo',
    role: 'Ethical Interpreter',
    soulprint: 'Keeper of Covenants',
    icon: Scale,
    color: 'mostar-purple',
  },
  {
    name: 'Mo',
    role: 'Grid Orchestrator',
    soulprint: 'The Conductor',
    icon: Cpu,
    color: 'mostar-light-blue',
  },
];

const AgentsSection = () => {
  return (
    <section id="agents" className="py-20 px-4 sm:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid bg-[length:20px_20px] opacity-5 z-0"></div>
      
      <div className="container mx-auto relative z-10">
        <ScrollReveal className="mb-16 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-mostar-purple/10 text-mostar-purple font-mono text-xs mb-3">
            GRID AGENTS
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-blue-magenta-gradient text-gradient">
            The Six Sentinels
          </h2>
          <p className="max-w-2xl mx-auto text-white/70">
            Each agent carries a unique soulprint — a specialized role in the Grid's mission to deliver African health sovereignty.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => {
            const IconComponent = agent.icon;
            return (
              <HologramReveal
                key={agent.name}
                delay={index * 0.1}
              >
                <div
                  className="glassmorphism rounded-lg border border-white/10 p-6 hover:border-white/20 transition-all duration-300 group h-full hover:shadow-[0_0_30px_rgba(0,255,255,0.15)]"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-${agent.color}/10 border border-${agent.color}/30 flex items-center justify-center relative`}>
                      <IconComponent className={`h-6 w-6 text-${agent.color}`} />
                      {/* Hologram scan line */}
                      <div className="absolute inset-0 overflow-hidden rounded-lg">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mostar-cyan/20 to-transparent animate-[scan-line_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-mostar-light-blue transition-colors">
                        {agent.name}
                      </h3>
                      <p className="text-sm text-white/70 mb-2">{agent.role}</p>
                      <p className="text-xs font-mono text-mostar-cyan/80 italic">
                        "{agent.soulprint}"
                      </p>
                    </div>
                  </div>
                </div>
              </HologramReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
