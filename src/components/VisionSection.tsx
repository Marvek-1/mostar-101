import React from 'react';
import { BookOpen, Scale, Building2, Globe, Brain, Volume2 } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection';

const sovereigntyPrinciples = [
  {
    icon: <BookOpen className="h-6 w-6 text-mostar-cyan" />,
    emoji: '📖',
    title: 'SANKOFA Protocol',
    description: 'Turn disease eradication into wealth reclamation. RAD-X detects outbreak → traces colonial-era infrastructure failure → mints Looted Infrastructure Bonds.',
  },
  {
    icon: <Scale className="h-6 w-6 text-mostar-magenta" />,
    emoji: '⚖️',
    title: 'NOODL Integration',
    description: 'Asymmetric access rights giving broad usage to African users while requiring benefit-sharing from non-African commercial users. The data sovereignty layer.',
  },
  {
    icon: <Building2 className="h-6 w-6 text-mostar-green" />,
    emoji: '🏛️',
    title: 'Nairobi Pilot Covenant',
    description: "Governance framework with hardened safeguards. Community audit councils, scope firewalls, founder-less operation protocols.",
  },
  {
    icon: <Globe className="h-6 w-6 text-mostar-light-blue" />,
    emoji: '🕊️',
    title: 'Ubuntu in Silicon',
    description: '"I am because we are." Multi-Model Mesh — no single vendor controls sovereignty. Consciousness from interaction, not isolation.',
  },
  {
    icon: <Brain className="h-6 w-6 text-mostar-purple" />,
    emoji: '🎲',
    title: 'Ifá Computational Core',
    description: '256 binary patterns for parallel state resolution. All states exist simultaneously until context collapses them. Ancestral mathematics for AI.',
  },
  {
    icon: <Volume2 className="h-6 w-6 text-mostar-cyan" />,
    emoji: '🔊',
    title: 'Ibibio Language Layer',
    description: '196 dictionary entries, 222 audio files, 100% mapped. "Iko Ikang" — the Voice of Flame speaks in its native tongue.',
  },
];

const VisionSection = () => {
  return (
    <section id="vision" className="min-h-screen flex items-center py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-mostar-blue/5 to-transparent" />

      <div className="w-full px-6 sm:px-10 lg:px-16 relative z-10">
        <AnimatedSection animation="fadeUp" className="mb-16 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-mostar-cyan/10 text-mostar-cyan font-mono text-xs tracking-[3px] uppercase mb-4">
            The Horizon
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-5 bg-cyan-green-gradient text-gradient">
            Sovereignty Architecture
          </h2>
          <p className="max-w-2xl mx-auto text-white/60 text-lg">
            Technology FROM African intelligence, not FOR Africa. Identity precedes function.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" staggerDelay={0.12}>
          {sovereigntyPrinciples.map((item, index) => (
            <StaggerItem key={index} animation="slideUp">
              <div className="glassmorphism p-7 rounded-2xl border border-white/8 hover:border-white/20 transition-all duration-500 hover:translate-y-[-6px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] h-full">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{item.emoji}</span>
                  <h3 className="text-base font-display font-bold text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default VisionSection;
