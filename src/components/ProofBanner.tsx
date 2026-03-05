import React from 'react';
import { Globe, Shield, AlertTriangle, Presentation } from 'lucide-react';

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
    description: 'Detected current, country-confirmed signal before EIOS (WHO\'s global Event Information System) flagged only a historical reference. Confirmed by EPR team.',
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
    <section className="py-16 relative overflow-hidden border-t border-b border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-mostar-cyan/5 via-transparent to-mostar-magenta/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <span className="font-mono text-xs tracking-[4px] uppercase text-mostar-cyan">
            🔥 Field-Validated Intelligence — Not Theory
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {proofCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className={`glassmorphism rounded-xl p-6 border border-white/10 relative overflow-hidden hover:border-${card.accent}/30 transition-all duration-300`}
              >
                <div className={`absolute top-0 left-0 w-1 h-full bg-${card.accent}`} />
                
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full bg-mostar-green animate-pulse`} />
                  <span className={`font-mono text-[10px] tracking-[2px] uppercase text-mostar-green`}>
                    {card.label}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-${card.accent}/10 border border-${card.accent}/20`}>
                    <IconComponent className={`h-5 w-5 text-${card.accent}`} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-base mb-1">{card.title}</h3>
                    {card.highlight && (
                      <div className="font-mono text-2xl font-bold text-mostar-cyan mb-2">{card.highlight}</div>
                    )}
                    <p className="text-sm text-white/60 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProofBanner;
