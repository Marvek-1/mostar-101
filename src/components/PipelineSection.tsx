import React from 'react';
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection';
import { motion } from 'framer-motion';

const pipelineNodes = [
  { emoji: '👁️', title: 'Dashboard', subtitle: 'Eyes — what you see', color: 'mostar-cyan' },
  { emoji: '🧠', title: 'LPI Engine', subtitle: 'Brain — planning logic', color: 'mostar-magenta' },
  { emoji: '🔮', title: 'DeepCAL++', subtitle: 'Wisdom — reasoning', color: 'mostar-purple' },
  { emoji: '✋', title: 'AfroTrack', subtitle: 'Hands — ground truth', color: 'mostar-green' },
];

const PipelineSection = () => {
  return (
    <section className="min-h-screen flex items-center py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mostar-cyan/[0.02] to-transparent" />

      <div className="w-full px-6 sm:px-10 lg:px-16 relative z-10">
        <AnimatedSection animation="fadeUp" className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-mostar-cyan/10 text-mostar-cyan font-mono text-xs tracking-[3px] uppercase mb-4">
            Core Architecture
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-5 bg-blue-magenta-gradient text-gradient">
            The Intelligence Pipeline
          </h2>
          <p className="max-w-xl mx-auto text-white/60 text-lg">
            Four stages. Clean data flow. Feedback loop. This is how signals become supply chain action.
          </p>
        </AnimatedSection>

        {/* Pipeline Flow */}
        <StaggerContainer className="flex flex-col md:flex-row items-center justify-center gap-5 mb-16" staggerDelay={0.2}>
          {pipelineNodes.map((node, index) => (
            <React.Fragment key={node.title}>
              <StaggerItem animation="scaleUp">
                <div className="glassmorphism rounded-2xl p-8 border border-white/10 text-center min-w-[180px] hover:border-mostar-cyan/30 transition-all duration-500 hover:translate-y-[-6px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                  <div className="text-4xl mb-4">{node.emoji}</div>
                  <h4 className="font-display font-bold text-white text-base mb-1">{node.title}</h4>
                  <p className="text-[11px] text-white/45">{node.subtitle}</p>
                </div>
              </StaggerItem>
              {index < pipelineNodes.length - 1 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.4 }}
                  className="text-3xl text-mostar-cyan md:rotate-0 rotate-90"
                >
                  →
                </motion.span>
              )}
            </React.Fragment>
          ))}
        </StaggerContainer>

        <AnimatedSection animation="reveal" delay={0.5} className="text-center max-w-2xl mx-auto">
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            When AFRO Sentinel fires a signal, DeepCAL++ tells you whether the supply chain is positioned to respond.
            AfroTrack validates against reality. The loop closes: prediction vs. outcome feeds back into learning.
          </p>
          <p className="text-mostar-cyan/60 text-xs font-mono">
            Dashboard → LPI → DeepCAL → AfroTrack → back to DeepCAL's learning.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PipelineSection;
