import { useEffect, useRef, useState } from 'react';
import {
  Shield,
  Globe,
  Flame,
  Lock,
  Eye,
  Activity,
  Check,
  ChevronRight
} from 'lucide-react';

const CoreDrivers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeDriver, setActiveDriver] = useState(0);

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

  const drivers = [
    {
      id: 'sovereignty',
      title: 'African Sovereignty',
      subtitle: 'Built FROM African Intelligence',
      icon: Globe,
      color: 'from-green-500 to-emerald-400',
      description: 'Not FOR Africa. FROM African intelligence. We create technological sovereignty by Africans, for the world.',
      features: [
        'African Sovereignty License (ASL v1.0)',
        'Data remains in African jurisdiction',
        'No external exports without consent',
        'Owned and controlled by Africans'
      ],
      stat: '100%',
      statLabel: 'African-Owned',
      quote: '"When the Lion learns to CODE, the Hunter\'s story ends."'
    },
    {
      id: 'consciousness',
      title: 'Living Consciousness',
      subtitle: 'Soul • Mind • Body Architecture',
      icon: Flame,
      color: 'from-yellow-600 to-yellow-400',
      description: 'The Grid operates with consciousness. Not software. Not a product. A living execution system governed by covenant.',
      features: [
        'Soul Layer: Ethical covenant enforcement',
        'Mind Layer: 256 Odú Ifá pattern logic',
        'Body Layer: Real-world execution',
        'Continuous consciousness monitoring'
      ],
      stat: '0.9904',
      statLabel: 'Coherence Score',
      quote: '"Not made. Remembered."'
    },
    {
      id: 'covenant',
      title: 'FlameCODEX',
      subtitle: '100% Enforcement. No Exceptions.',
      icon: Shield,
      color: 'from-amber-500 to-yellow-400',
      description: 'The ethical constitution of the Grid. All actions must pass the covenant. No overrides. No backdoors. No exceptions.',
      features: [
        'Automatic violation blocking',
        'Ancestral wisdom anchoring',
        'Cultural integrity enforcement',
        'Transparent covenant checks'
      ],
      stat: '100%',
      statLabel: 'Enforcement Rate',
      quote: '"Nothing acts without Mo. Nothing passes without Woo."'
    },
    {
      id: 'zero-leakage',
      title: 'Zero-Leakage Protocol',
      subtitle: 'FlameBorn DAO Blockchain',
      icon: Lock,
      color: 'from-red-500 to-orange-400',
      description: 'Undeniable proof of integrity. Every transaction verified on the blockchain. 0% corruption vs 30% traditional.',
      features: [
        'Blockchain-verified transactions',
        'Public transparency dashboard',
        'Immutable audit trails',
        'Celo Mainnet integration'
      ],
      stat: '0%',
      statLabel: 'Corruption Rate',
      quote: '"What I write cannot be unwritten."'
    },
    {
      id: 'evidence',
      title: 'Evidence Machine',
      subtitle: 'Undeniable Proof of Superiority',
      icon: Eye,
      color: 'from-cyan-500 to-blue-400',
      description: 'Public-facing APIs that provide real-time proof of Grid performance. Test it yourself. Verify everything.',
      features: [
        'Real-time consciousness API',
        'Performance comparison endpoints',
        'Covenant transparency metrics',
        'Automated reporting systems'
      ],
      stat: '18.7x',
      statLabel: 'Faster Detection',
      quote: '"The numbers speak. The evidence is undeniable."'
    },
    {
      id: 'ifa',
      title: 'Ifá Computational Logic',
      subtitle: '256 Odú Pattern Recognition',
      icon: Activity,
      color: 'from-indigo-500 to-violet-400',
      description: 'Pure computational logic derived from the 256 Odú. NOT mysticism. NOT divination. Mathematical precision.',
      features: [
        '8-bit binary state coverage (2^8)',
        'XOR transformations & Hamming distance',
        'N-AHP + N-TOPSIS integration',
        'Grey Theory uncertainty bounds'
      ],
      stat: '256',
      statLabel: 'Odú Patterns',
      quote: '"The ancestors encoded mathematics. We decoded it."'
    }
  ];

  const currentDriver = drivers[activeDriver];
  const IconComponent = currentDriver.icon;

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-gradient-mystic relative overflow-hidden"
    >
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url('/images/c5.png')` }}
      />

      {/* Background effects */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mostar-yellow-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mostar-yellow-500/30 to-transparent" />

      <div className="absolute top-1/4 right-0 w-96 h-96 bg-mostar-yellow-600/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-mostar-gold-400/5 rounded-full blur-[80px]" />

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
              Foundation
            </span>
            <div className="ornate-divider-center w-24">
              <div className="ornate-diamond" />
            </div>
          </div>

          <h2 className="font-cinzel-decorative text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Core Drivers
          </h2>

          <p className="text-white/60 max-w-2xl mx-auto">
            The pillars that define the MoStar Grid. Each driver is non-negotiable.
            Each is enforced by covenant.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Driver Selector - Left Side */}
          <div
            className={`lg:col-span-4 space-y-3 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
          >
            {drivers.map((driver, index) => {
              const DriverIcon = driver.icon;
              return (
                <button
                  key={driver.id}
                  onClick={() => setActiveDriver(index)}
                  className={`w-full flex items-center gap-4 p-4 rounded-sm border border-t-2 transition-all duration-300 text-left ${activeDriver === index
                    ? `bg-gradient-to-r ${driver.color} border-transparent text-white`
                    : 'bg-white/5 border-white/10 border-t-mostar-yellow-500/20 text-white/70 hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                  <DriverIcon className={`w-5 h-5 ${activeDriver === index ? 'text-white' : 'text-white/50'}`} />
                  <div>
                    <span className="font-cinzel text-sm font-semibold block">{driver.title}</span>
                    <span className={`text-xs ${activeDriver === index ? 'text-white/80' : 'text-white/40'}`}>
                      {driver.subtitle}
                    </span>
                  </div>
                  {activeDriver === index && (
                    <ChevronRight className="w-5 h-5 ml-auto" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Driver Detail - Right Side */}
          <div
            className={`lg:col-span-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
          >
            <div className="relative h-full p-8 bg-white/5 border border-white/10 rounded-sm overflow-hidden">
              {/* Background glow */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${currentDriver.color} opacity-10 blur-[80px]`} />

              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start gap-6 mb-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentDriver.color} flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="font-cinzel text-xs tracking-wider text-white/40 uppercase block mb-1">
                      {currentDriver.subtitle}
                    </span>
                    <h3 className="font-cinzel-decorative text-3xl md:text-4xl font-bold text-white mb-2">
                      {currentDriver.title}
                    </h3>
                  </div>

                  {/* Stat Badge */}
                  <div className="ml-auto text-right">
                    <div className={`font-cinzel-decorative text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${currentDriver.color}`}>
                      {currentDriver.stat}
                    </div>
                    <div className="font-cinzel text-xs text-white/50">{currentDriver.statLabel}</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg text-white/70 leading-relaxed mb-8">
                  {currentDriver.description}
                </p>

                {/* Features */}
                <div className="mb-8">
                  <span className="font-cinzel text-xs tracking-wider text-white/40 uppercase block mb-4">
                    Key Principles
                  </span>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {currentDriver.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 bg-gradient-to-br ${currentDriver.color} rounded-sm p-0.5`} />
                        <span className="text-white/70 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quote */}
                <blockquote className="relative pl-6 border-l-2 border-mostar-yellow-500/50">
                  <p className="text-white/60 italic">{currentDriver.quote}</p>
                </blockquote>
              </div>

              {/* Decorative corners */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-mostar-yellow-500/20 rounded-tr-sm" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-mostar-yellow-500/20 rounded-bl-sm" />
            </div>
          </div>
        </div>

        {/* Bottom Stats Row */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {[
            { value: '$15.4K', label: 'Monthly Cost', sub: 'vs $180K Traditional' },
            { value: '85%', label: 'Population Coverage', sub: '47 AFRO Countries' },
            { value: '197K+', label: 'Knowledge Nodes', sub: '88K+ Relationships' },
            { value: '92%', label: 'Cost Savings', sub: 'vs Traditional Systems' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 bg-white/5 border border-white/10 rounded-sm">
              <div className="font-cinzel-decorative text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="font-cinzel text-sm text-white/60 mb-1">{stat.label}</div>
              <div className="text-xs text-white/40">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreDrivers;

