import React from 'react';
import { Globe, Shield, AlertTriangle, Presentation } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection';

const proofCards = [
  {
    label: 'WHO AFRO HEADLINE',
    title: 'Signal Tracker — WHO AFRO Website Feature',
    description: 'Our disease signal intelligence dashboard became the headline feature on the WHO African Region website. Institutional recognition at the highest level.',
    icon: Globe,
    accent: 'mostar-cyan',
  },
  {
    label: 'VERIFIED DETECTION',
    title: 'Chikungunya — Seychelles',
    highlight: '9 hours ahead',
    description: 'Detected current, country-confirmed signal before EIOS flagged only a historical reference. Confirmed by EPR team.',
    icon: Shield,
    accent: 'mostar-green',
  },
  {
    label: 'EARLY WARNING',
    title: 'Cyclone Gezani — Madagascar',
    description: 'Alert surfaced days before international headline news — before 40 lives were lost and 16,000 displaced. Confirmed by EPR team on February 14, 2026.',
    icon: AlertTriangle,
    accent: 'mostar-magenta',
  },
  {
    label: 'DAKAR 2026',
    title: 'OSL Architecture Presented',
    description: 'Full integrated data flow system — OR/SR workflows, BMS synchronization, two-section visibility architecture. Presented at WHO AFRO Dakar 2026 conference.',
    icon: Presentation,
    accent: 'mostar-light-blue',
  },
];

const ProofBanner = () => {
  return (
    <section className="min-h-[70vh] flex items-center py-24 relative overflow-hidden border-t border-b border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-mostar-cyan/5 via-transparent to-mostar-magenta/5" />

      <div className="w-full px-6 sm:px-10 lg:px-16 relative z-10">
        <AnimatedSection animation="reveal" className="text-center mb-14">
          <span className="font-mono text-xs tracking-[4px] uppercase text-mostar-cyan">
            🔥 Field-Validated Intelligence — Not Theory
          </span>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto" staggerDelay={0.15}>
          {proofCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <StaggerItem key={index} animation="slideUp">
                <div className={`glassmorphism rounded-xl p-7 border border-white/10 relative overflow-hidden hover:border-${card.accent}/30 transition-all duration-500 hover:translate-y-[-4px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] h-full`}>
                  <div className={`absolute top-0 left-0 w-1 h-full bg-${card.accent}`} />

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-mostar-green animate-pulse" />
                    <span className="font-mono text-[10px] tracking-[2px] uppercase text-mostar-green">
                      {card.label}
                    </span>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-${card.accent}/10 border border-${card.accent}/20`}>
                      <IconComponent className={`h-5 w-5 text-${card.accent}`} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-lg mb-1">{card.title}</h3>
                      {card.highlight && (
                        <div className="font-mono text-3xl font-bold text-mostar-cyan mb-2">{card.highlight}</div>
                      )}
                      <p className="text-sm text-white/55 leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default ProofBanner;
