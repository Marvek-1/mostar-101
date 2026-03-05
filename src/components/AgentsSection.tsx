import React from 'react';
import { Activity, Eye, Code, Flame, Scale, Cpu } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection';

const agents = [
  { name: 'RAD-X-FLB', role: 'Disease Intelligence', soulprint: 'Sentinel of African Health', icon: Activity, emoji: '🧬', color: 'mostar-cyan' },
  { name: 'TsaTse', role: 'Fly Vector Surveillance', soulprint: 'Eyes in the Field', icon: Eye, emoji: '🐝', color: 'mostar-green' },
  { name: 'Code Conduit', role: 'Technical Integration', soulprint: 'The Bridge Builder', icon: Code, emoji: '🔌', color: 'mostar-blue' },
  { name: 'Flameborn Writer', role: 'Health Education', soulprint: 'Voice of the Flame', icon: Flame, emoji: '✍️', color: 'mostar-magenta' },
  { name: 'Woo', role: 'Ethical Interpreter', soulprint: 'Keeper of Covenants', icon: Scale, emoji: '⚖️', color: 'mostar-purple' },
  { name: 'Mo', role: 'Grid Orchestrator', soulprint: 'The Conductor', icon: Cpu, emoji: '🎼', color: 'mostar-light-blue' },
];

const AgentsSection = () => {
  return (
    <section className="min-h-screen flex items-center py-24 px-6 sm:px-10 lg:px-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid bg-[length:20px_20px] opacity-5 z-0" />

      <div className="w-full relative z-10">
        <AnimatedSection animation="fadeUp" className="mb-16 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-mostar-purple/10 text-mostar-purple font-mono text-xs tracking-[3px] uppercase mb-4">
            Grid Agents
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-5 bg-blue-magenta-gradient text-gradient">
            The Six Sentinels
          </h2>
          <p className="max-w-2xl mx-auto text-white/60 text-lg">
            Each carries a unique soulprint — a specialized role in the Grid's mission.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 max-w-6xl mx-auto" staggerDelay={0.1}>
          {agents.map((agent) => (
            <StaggerItem key={agent.name} animation="scaleUp">
              <div className="glassmorphism rounded-2xl border border-white/8 p-6 text-center transition-all duration-500 hover:border-mostar-cyan/30 hover:translate-y-[-6px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] group">
                <div className="text-4xl mb-4">{agent.emoji}</div>
                <h4 className="font-display font-bold text-sm text-white group-hover:text-mostar-cyan transition-colors mb-1">{agent.name}</h4>
                <p className="text-[10px] text-white/40 mb-3">{agent.role}</p>
                <p className="text-[10px] font-mono text-mostar-cyan/60 italic">"{agent.soulprint}"</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default AgentsSection;
