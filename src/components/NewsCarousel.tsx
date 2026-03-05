import React from 'react';
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection';

const updates = [
  { date: 'Mar 2026', badge: 'BLOCKCHAIN', badgeColor: 'bg-mostar-cyan/15 text-mostar-cyan', text: '$AFSL Blockchain for AFRO OSL — 4 smart contracts, tokenized procurement architecture' },
  { date: 'Mar 2026', badge: 'WHO', badgeColor: 'bg-mostar-green/15 text-mostar-green', text: 'QR code shipment sharing deployed for AFRO OSL — Nairobi and Dakar hubs' },
  { date: 'Feb 2026', badge: 'HEADLINE', badgeColor: 'bg-mostar-magenta/15 text-mostar-magenta', text: 'Signal tracker becomes the headline feature on the WHO AFRO website' },
  { date: 'Feb 2026', badge: 'DETECTION', badgeColor: 'bg-mostar-cyan/15 text-mostar-cyan', text: 'Chikungunya detected 9 hours ahead of EIOS. Cyclone Gezani flagged before 40 deaths.' },
  { date: 'Feb 2026', badge: 'DAKAR', badgeColor: 'bg-mostar-light-blue/15 text-mostar-light-blue', text: 'AFRO OSL architecture presented at Dakar 2026 — OR/SR workflows, BMS sync' },
  { date: 'Feb 2026', badge: 'ENGINE', badgeColor: 'bg-mostar-purple/15 text-mostar-purple', text: 'TruthEngine LIVE — Truth Score 0.87, Pass Rate 94%, Ubuntu Coherence 0.88' },
  { date: 'Feb 2026', badge: 'SOVEREIGNTY', badgeColor: 'bg-mostar-green/15 text-mostar-green', text: 'NOODL license integrated. Nairobi Pilot Covenant hardened.' },
  { date: 'Jan 2026', badge: 'GRID', badgeColor: 'bg-mostar-cyan/15 text-mostar-cyan', text: 'Neo4j reaches 197,000+ nodes. 9,700+ cross-domain relationships mapped.' },
  { date: 'Dec 2025', badge: 'ARCHITECTURE', badgeColor: 'bg-mostar-light-blue/15 text-mostar-light-blue', text: 'Four-stage pipeline finalized: Dashboard → LPI → DeepCAL → AfroTrack' },
  { date: 'Sep 2025', badge: 'RAD-X', badgeColor: 'bg-mostar-magenta/15 text-mostar-magenta', text: 'RAD-X-FLB full 8-layer architecture — 38 FastAPI endpoints, SANKOFA Protocol' },
];

export const NewsCarousel = () => {
  return (
    <section className="min-h-screen flex items-center py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mostar-purple/[0.02] to-transparent" />

      <div className="w-full px-6 sm:px-10 lg:px-16 relative z-10">
        <AnimatedSection animation="fadeUp" className="text-center mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-mostar-light-blue/10 text-mostar-light-blue font-mono text-xs tracking-[3px] uppercase mb-4">
            Timeline
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-5 text-gradient">
            Latest Breakthroughs
          </h2>
        </AnimatedSection>

        <StaggerContainer className="flex flex-col gap-3 max-w-4xl mx-auto" staggerDelay={0.08}>
          {updates.map((item, index) => (
            <StaggerItem key={index} animation="fadeLeft">
              <div className="flex items-center gap-4 glassmorphism rounded-xl border border-white/6 px-6 py-4 hover:border-white/15 transition-all duration-500 hover:translate-x-2 group">
                <span className="font-mono text-[11px] text-white/30 whitespace-nowrap min-w-[72px]">{item.date}</span>
                <span className={`text-[9px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap ${item.badgeColor} border border-current/20`}>
                  {item.badge}
                </span>
                <span className="text-[13px] text-white/55 group-hover:text-white/80 transition-colors flex-1">{item.text}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
