import React from 'react';
import { Eye, Brain, Sparkles, Hand } from 'lucide-react';

const pipelineNodes = [
  { icon: Eye, emoji: '👁️', title: 'Dashboard', subtitle: 'Eyes — what you see', color: 'mostar-cyan' },
  { icon: Brain, emoji: '🧠', title: 'LPI Engine', subtitle: 'Brain — planning logic', color: 'mostar-magenta' },
  { icon: Sparkles, emoji: '🔮', title: 'DeepCAL++', subtitle: 'Wisdom — reasoning', color: 'mostar-purple' },
  { icon: Hand, emoji: '✋', title: 'AfroTrack', subtitle: 'Hands — ground truth', color: 'mostar-green' },
];

const PipelineSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mostar-cyan/[0.02] to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-mostar-cyan/10 text-mostar-cyan font-mono text-xs mb-3">
            CORE ARCHITECTURE
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-blue-magenta-gradient text-gradient">
            The Intelligence Pipeline
          </h2>
          <p className="max-w-xl mx-auto text-white/70">
            Four stages. Clean data flow. Feedback loop. This is how signals become supply chain action.
          </p>
        </div>

        {/* Pipeline Flow */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
          {pipelineNodes.map((node, index) => (
            <React.Fragment key={node.title}>
              <div className="glassmorphism rounded-xl p-6 border border-white/10 text-center min-w-[160px] hover:border-mostar-cyan/30 transition-all duration-300">
                <div className="text-3xl mb-3">{node.emoji}</div>
                <h4 className="font-display font-bold text-white text-sm mb-1">{node.title}</h4>
                <p className="text-[11px] text-white/50">{node.subtitle}</p>
              </div>
              {index < pipelineNodes.length - 1 && (
                <span className="text-2xl text-mostar-cyan animate-pulse md:rotate-0 rotate-90">→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <p className="text-white/60 text-sm leading-relaxed">
            When AFRO Sentinel fires a signal, DeepCAL++ tells you whether the supply chain is positioned to respond.
            AfroTrack validates against reality. The loop closes: prediction vs. outcome feeds back into learning.
          </p>
          <p className="text-mostar-cyan/70 text-xs font-mono mt-4">
            Dashboard → LPI → DeepCAL → AfroTrack → back to DeepCAL's learning.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PipelineSection;
