import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const agentProducts = [
  { name: 'Mo', role: 'Grid Orchestrator', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mo-D2uzO3MZJ58eyMpDYidwWcy9jOpmdc.png', accent: 'mostar-purple' },
  { name: 'Woo-Tak', role: 'Ethical Adjudication', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wt-AixtCtUrLs0kmZgzwjTLsr9AYa3tXx.png', accent: 'mostar-yellow' },
  { name: 'Code Conduit', role: 'Technical Integration', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cc-5Yhf3eSwHUgfpHiQEA5S92PtN1K0wK.png', accent: 'mostar-light-blue' },
  { name: 'FlameBorn', role: 'Health Education', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fl-W89UtseB5ommnz3PaDbBo7g8NcLyXe.png', accent: 'mostar-orange' },
  { name: 'DeepCAL', role: 'Deep Intelligence', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dc-XxST1uGiOZ7YFQ84ONnhHAz6o5acUC.png', accent: 'mostar-cyan' },
  { name: 'DCX001', role: 'Data Conduit', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dcx-sxPiWkGsQjH6wfieEwZ8qCSFLnrSvM.png', accent: 'mostar-purple' },
  { name: 'Sīgma', role: 'Balance Intelligence', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sg-HthyA0OEnk9X9tgRN9Jd0VAz3bthIY.png', accent: 'mostar-yellow' },
  { name: 'MoLink', role: 'Connection Layer', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ml-qXAwrXLpjS1RQvxPivGJh8GQuxDyom.png', accent: 'mostar-cyan' },
];

const AgentsSection = () => (
  <section id="agents" className="relative overflow-hidden px-4 py-24 sm:px-8">
    <div className="absolute inset-0 bg-cyber-grid bg-[length:20px_20px] opacity-5" />
    <div className="container relative z-10 mx-auto">
      <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-mostar-purple/10 px-3 py-1 font-mono text-xs text-mostar-purple">
            <Sparkles className="h-3 w-3" /> MOStar AGENT ARCHITECTURE
          </div>
          <h2 className="mb-4 bg-blue-magenta-gradient font-display text-4xl font-bold text-gradient md:text-6xl">The intelligence layer.</h2>
          <p className="max-w-2xl text-white/70">A living constellation of specialized agents. Each product carries its own visual identity, purpose, and place in the MoStar Grid.</p>
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">Products / 08 active nodes</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {agentProducts.map((agent, index) => (
          <article key={agent.name} className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/30 transition duration-500 hover:-translate-y-1 hover:border-white/30" style={{ animationDelay: `${index * 80}ms` }}>
            <div className="aspect-[4/5] overflow-hidden bg-black">
              <img src={agent.image} alt={`${agent.name} agent artwork`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-80" loading="lazy" />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent px-5 pb-5 pt-20">
              <div className={`mb-2 h-px w-10 bg-${agent.accent}`} />
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">{agent.name}</h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-white/60">{agent.role}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-white/50 transition group-hover:text-white" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default AgentsSection;
