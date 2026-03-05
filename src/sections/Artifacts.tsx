import { useEffect, useRef, useState } from 'react';
import { Shield, Heart, BookOpen, Scale, Flame, ArrowRight, Sparkles, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Artifact {
  id: string;
  name: string;
  guardian: string;
  title: string;
  description: string;
  products: string[];
  userBenefit: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  agentLink?: string;
}

const artifacts: Artifact[] = [
  {
    id: 'sentinel',
    name: 'Sentinel Artifacts',
    guardian: 'The Sentinel',
    title: 'Protection Layer',
    description:
      'Towering figures, armor, watchful eyes, firm posture. These artifacts become your first line of defense in the digital realm.',
    products: [
      'Account Guardians - Monitor suspicious activity, wallet connections, logins',
      'Risk Dashboards - Show threat levels, alerts on outbreaks, scams, system failures',
    ],
    userBenefit:
      'This part of Mostar stands guard so you do not have to be paranoid.',
    icon: <Shield className="w-6 h-6" />,
    color: 'text-yellow-400',
    gradient: 'from-yellow-600/20 to-yellow-400/5',
    agentLink: '/agent/rad-x',
  },
  {
    id: 'healer',
    name: 'Healer Artifacts',
    guardian: 'The Healer',
    title: 'Health & Regeneration',
    description:
      'Open palms, flowing energy, water, light, warmth. Where healing begins when something is wrong.',
    products: [
      'Health Insight Modules - Outbreak risk, clinic statuses, resource gaps',
      'Recovery Flows - Guided processes when something breaks: account support, protocol incidents',
    ],
    userBenefit: 'When something is wrong, this artifact is where healing begins.',
    icon: <Heart className="w-6 h-6" />,
    color: 'text-teal-400',
    gradient: 'from-teal-600/20 to-cyan-400/5',
  },
  {
    id: 'archivist',
    name: 'Archivist Artifacts',
    guardian: 'The Archivist',
    title: 'Knowledge & Foresight',
    description:
      'Scrolls, books, constellations, many eyes, quiet power. The story behind the data.',
    products: [
      'Knowledge Interfaces - Explainable AI: "What is happening? Why did the system decide this?"',
      'Forecast Panels - Simulations, future scenarios, "if you do X, you will likely see Y"',
    ],
    userBenefit:
      'This artifact tells you the story behind the data so you can choose wisely.',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'text-indigo-400',
    gradient: 'from-indigo-600/20 to-blue-400/5',
    agentLink: '/agent/tsatse',
  },
  {
    id: 'balancer',
    name: 'Balance Artifacts',
    guardian: 'The Balancer',
    title: 'Governance & Alignment',
    description:
      'Scales, mirrored figures, dual colors, equilibrium. Where you decide your boundaries.',
    products: [
      'Governance / Voting UI - DAO proposals, validator choices, policy changes',
      'Preference & Boundary Settings - Privacy controls, notification filters, time limits',
    ],
    userBenefit:
      'This is where I decide my boundaries and how the system behaves.',
    icon: <Scale className="w-6 h-6" />,
    color: 'text-amber-400',
    gradient: 'from-amber-600/20 to-yellow-400/5',
    agentLink: '/agent/writer',
  },
  {
    id: 'flame',
    name: 'Flame Artifacts',
    guardian: 'The Flameborn',
    title: 'Change Engine',
    description:
      'Fire, metamorphosis, breaking shells, radiance. The part of Mostar that shows you evolving.',
    products: [
      'Launch / Upgrade Moments - New feature intros, level-ups, crossing to mainnet, unlocking roles',
      'Personal Progress Visualizations - "How far have I come?" XP-style visual for contribution',
    ],
    userBenefit: 'This is the part of Mostar that shows me evolving.',
    icon: <Flame className="w-6 h-6" />,
    color: 'text-orange-400',
    gradient: 'from-orange-600/20 to-red-400/5',
    agentLink: '/agent/mo',
  },
];

const Artifacts = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeArtifact, setActiveArtifact] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="artifacts"
      ref={sectionRef}
      className="section-padding bg-gradient-mystic relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-mostar-dark-900 via-mostar-dark-800 to-mostar-dark-900" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mostar-yellow-600/5 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-mostar-gold-400/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="ornate-divider-center w-24">
              <div className="ornate-diamond" />
            </div>
            <span className="font-cinzel text-sm tracking-[0.3em] text-mostar-yellow-400 uppercase">
              The Ecosystem
            </span>
            <div className="ornate-divider-center w-24">
              <div className="ornate-diamond" />
            </div>
          </div>
          <h2 className="font-cinzel-decorative text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Artifacts to Products
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            How we turn our guardians into an actual app ecosystem. Each artifact maps to real products and user benefits.
          </p>
        </div>

        {/* Agents CTA */}
        <div className={`mb-12 text-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link 
            to="/agents"
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-mostar-yellow-500/30 rounded-sm hover:bg-mostar-yellow-500/20 transition-all duration-300"
          >
            <Users className="w-5 h-5 text-mostar-yellow-400" />
            <span className="font-cinzel text-white">Meet the Grid Agents</span>
            <ChevronRight className="w-5 h-5 text-mostar-yellow-400" />
          </Link>
        </div>

        {/* Artifacts List */}
        <div className="space-y-6">
          {artifacts.map((artifact, index) => (
            <div
              key={artifact.id}
              className={`transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveArtifact(artifact.id)}
              onMouseLeave={() => setActiveArtifact(null)}
            >
              <div
                className={`relative rounded-sm border overflow-hidden transition-all duration-500 ${
                  activeArtifact === artifact.id
                    ? 'bg-white/10 border-mostar-yellow-500/50 shadow-glow-yellow'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${artifact.gradient} opacity-50`}
                />

                <div className="relative p-6 md:p-8">
                  <div className="grid lg:grid-cols-12 gap-6 items-start">
                    {/* Icon & Title */}
                    <div className="lg:col-span-3 flex items-start gap-4">
                      <div
                        className={`w-14 h-14 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center flex-shrink-0 ${artifact.color}`}
                      >
                        {artifact.icon}
                      </div>
                      <div>
                        <span className="font-cinzel text-xs tracking-wider text-white/40 uppercase block mb-1">
                          {artifact.guardian}
                        </span>
                        <h3 className="font-cinzel text-xl font-bold text-white">
                          {artifact.name}
                        </h3>
                        <span className={`text-sm ${artifact.color}`}>
                          {artifact.title}
                        </span>
                        
                        {/* Agent Link */}
                        {artifact.agentLink && (
                          <Link 
                            to={artifact.agentLink}
                            className="inline-flex items-center gap-1 mt-2 text-xs text-mostar-yellow-400 hover:text-mostar-yellow-300 transition-colors"
                          >
                            <span>View Agent</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="lg:col-span-4">
                      <p className="text-white/60 text-sm leading-relaxed">
                        {artifact.description}
                      </p>
                    </div>

                    {/* Products */}
                    <div className="lg:col-span-3">
                      <span className="font-cinzel text-xs tracking-wider text-white/40 uppercase block mb-2">
                        Becomes
                      </span>
                      <ul className="space-y-2">
                        {artifact.products.map((product, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-white/70"
                          >
                            <Sparkles className="w-4 h-4 text-mostar-yellow-400 flex-shrink-0 mt-0.5" />
                            <span>{product}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* User Benefit */}
                    <div className="lg:col-span-2">
                      <div className="relative pl-4 border-l-2 border-mostar-yellow-500/30">
                        <span className="font-cinzel text-xs tracking-wider text-white/40 uppercase block mb-1">
                          You Understand
                        </span>
                        <p className="text-sm text-mostar-yellow-300 italic">
                          "{artifact.userBenefit}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expand indicator */}
                <div className="absolute bottom-4 right-4">
                  <ArrowRight
                    className={`w-5 h-5 text-white/30 transition-all duration-300 ${
                      activeArtifact === artifact.id
                        ? 'translate-x-1 text-mostar-yellow-400'
                        : ''
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex flex-col items-center">
            <p className="text-white/60 mb-6 max-w-xl">
              Each artifact embodies a principle and a promise: "This thing exists to guard something for you."
            </p>
            <Link to="/guardians" className="btn-primary flex items-center gap-2 group">
              <span>Explore The Ecosystem</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Artifacts;

