import { useEffect, useRef, useState } from 'react';
import { Shield, Scale, BookOpen, Gem } from 'lucide-react';

interface Pillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  principle: string;
  icon: React.ReactNode;
  color: string;
}

const pillars: Pillar[] = [
  {
    id: 'guardianship',
    title: 'Guardianship Over Extraction',
    subtitle: 'Protection First',
    description:
      'Tech is not built to mine attention or data. Every system is framed as a guardian of something: health, memory, balance, time.',
    principle: 'What does this protect? Who does it shield?',
    icon: <Shield className="w-8 h-8" />,
    color: 'from-yellow-600 to-yellow-400',
  },
  {
    id: 'balance',
    title: 'Balance Over Extremes',
    subtitle: 'Equilibrium',
    description:
      'Mostar lives in the tension: light/dark, chaos/order, logic/myth. Products should stabilize people, not polarize them.',
    principle: 'After using a Mostar tool, you should feel more grounded, not more frantic.',
    icon: <Scale className="w-8 h-8" />,
    color: 'from-amber-500 to-yellow-400',
  },
  {
    id: 'ancestral',
    title: 'Ancestral Wisdom, Modern Execution',
    subtitle: 'Heritage & Innovation',
    description:
      'We do not cosplay futurism; we extend lineages. African philosophies are treated as infrastructure, not aesthetics.',
    principle: 'If an elder watched this, would they feel disrespected or honored?',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'from-teal-500 to-cyan-400',
  },
  {
    id: 'artifacts',
    title: 'Artifacts, Not Features',
    subtitle: 'Purposeful Design',
    description:
      'Mostar does not ship "features"; it ships artifacts. Each artifact embodies a principle and a promise.',
    principle: 'A user should be able to name the artifact and what it protects.',
    icon: <Gem className="w-8 h-8" />,
    color: 'from-rose-500 to-pink-400',
  },
];

const Doctrine = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activePillar, setActivePillar] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="doctrine"
      ref={sectionRef}
      className="section-padding bg-mostar-dark-900 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mostar-yellow-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mostar-yellow-500/30 to-transparent" />

      {/* Decorative orbs */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-mostar-yellow-600/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-mostar-gold-400/5 rounded-full blur-[60px]" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="ornate-divider-center w-24">
              <div className="ornate-diamond" />
            </div>
            <span className="font-cinzel text-sm tracking-[0.3em] text-mostar-yellow-400 uppercase">
              Our Foundation
            </span>
            <div className="ornate-divider-center w-24">
              <div className="ornate-diamond" />
            </div>
          </div>
          <h2 className="font-cinzel-decorative text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Core Doctrine
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            The internal OS that guides everything we build. Four pillars that define our approach to myth-tech.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => {
            const delayClass = `pillar-delay-${Math.min(index, 3)}`;

            return (
              <div
                key={pillar.id}
                className={`group relative transition-all duration-700 ${delayClass} ${isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
                  }`}
                onMouseEnter={() => setActivePillar(pillar.id)}
                onMouseLeave={() => setActivePillar(null)}
              >
                <div
                  className={`relative p-8 rounded-sm border border-t-2 border-t-mostar-yellow-500/40 transition-all duration-500 h-full ${activePillar === pillar.id
                    ? 'bg-white/10 border-mostar-yellow-500/60 shadow-glow-yellow'
                    : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                    }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 shadow-lg`}
                  >
                    <div className="text-white">{pillar.icon}</div>
                  </div>

                  {/* Content */}
                  <span className="font-cinzel text-xs tracking-wider text-white/40 uppercase mb-2 block">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-cinzel text-2xl font-bold text-white mb-4 group-hover:text-mostar-yellow-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Principle Quote */}
                  <div className="relative pl-4 border-l-2 border-mostar-yellow-500/30">
                    <p className="text-sm text-mostar-yellow-300 italic">
                      "{pillar.principle}"
                    </p>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-mostar-yellow-500/20 rounded-tr-sm" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-mostar-yellow-500/20 rounded-bl-sm" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand Spine Quote */}
        <div
          className={`mt-20 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="max-w-4xl mx-auto relative">
            {/* Quote marks */}
            <div className="absolute -top-8 left-0 text-8xl font-cinzel-decorative text-mostar-yellow-500/20">
              "
            </div>
            <div className="absolute -bottom-16 right-0 text-8xl font-cinzel-decorative text-mostar-yellow-500/20">
              "
            </div>

            <blockquote className="relative z-10 py-8">
              <p className="font-cinzel text-xl md:text-2xl text-white/90 leading-relaxed mb-6">
                Mostar Industries is a myth-tech civilization that builds intelligent guardians for human life.
                We turn ancient African wisdom into AI systems that protect health, preserve knowledge, and keep people in balance.
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="ornate-divider-center w-16">
                  <div className="ornate-diamond" />
                </div>
                <span className="font-cinzel text-sm text-mostar-yellow-400 tracking-wider">
                  The Mostar Pledge
                </span>
                <div className="ornate-divider-center w-16">
                  <div className="ornate-diamond" />
                </div>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctrine;

