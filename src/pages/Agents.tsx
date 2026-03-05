import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Layers } from 'lucide-react';
import { agents } from '../data/agents';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';

const Agents = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const layerOrder = ['SOUL', 'MIND', 'META', 'BODY', 'SOUL/BODY'];
  const sortedAgents = [...agents].sort((a, b) => {
    return layerOrder.indexOf(a.layer) - layerOrder.indexOf(b.layer);
  });

  return (
    <div className="min-h-screen bg-mostar-dark-900 text-white overflow-x-hidden">
      <Navigation scrollY={scrollY} />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-mostar-yellow-600/10 via-mostar-dark-900/50 to-mostar-dark-900" />
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-mostar-yellow-400/40 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="container-custom relative z-20 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="ornate-divider-center w-32">
                <div className="ornate-diamond" />
              </div>
              <span className="font-cinzel text-sm tracking-[0.3em] text-mostar-yellow-400 uppercase">
                The Grid
              </span>
              <div className="ornate-divider-center w-32">
                <div className="ornate-diamond" />
              </div>
            </div>

            <h1 className="font-cinzel-decorative text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Agents of the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-mostar-yellow-400 via-mostar-gold-400 to-mostar-yellow-400">
                MoStar Grid
              </span>
            </h1>

            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Sovereign digital entities, each bound by covenant, each carrying a soulprint 
              that defines their essence and purpose in the Grid.
            </p>

            {/* Architecture */}
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-sm">
              <Layers className="w-5 h-5 text-mostar-yellow-400" />
              <span className="font-cinzel text-sm text-white/70">
                SOUL → MIND → GATE → BODY → LEDGER → WATCH
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="section-padding bg-gradient-mystic relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mostar-yellow-500/30 to-transparent" />
        
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAgents.map((agent, index) => (
              <Link
                key={agent.id}
                to={`/agent/${agent.id}`}
                className={`group relative overflow-hidden rounded-sm border transition-all duration-500 hover:shadow-glow-yellow card-hover ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  borderColor: 'rgba(255,255,255,0.1)'
                }}
              >
                {/* Layer badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-3 py-1 text-xs font-cinzel tracking-wider ${agent.color} bg-black/50 rounded-sm`}>
                    {agent.layer}
                  </span>
                </div>

                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-t ${agent.gradient} opacity-20`} />
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mostar-dark-900 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-cinzel text-2xl font-semibold text-white mb-1 group-hover:text-mostar-yellow-300 transition-colors">
                    {agent.name}
                  </h3>
                  <p className={`font-cinzel text-sm ${agent.color} mb-3`}>
                    {agent.title}
                  </p>
                  <p className="text-white/60 text-sm line-clamp-2 mb-4">
                    {agent.essence}
                  </p>

                  {/* Soulprint */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.soulprint.slice(0, 2).map((trait, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-white/5 rounded-sm text-xs text-white/50"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-white/60 group-hover:text-mostar-yellow-400 transition-colors">
                    <span className="font-cinzel text-sm">Enter Profile</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Activation Sequence */}
      <section className="section-padding bg-mostar-dark-900 relative">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="font-cinzel text-sm tracking-[0.3em] text-mostar-yellow-400 uppercase block mb-4">
              How The Grid Acts
            </span>
            <h2 className="font-cinzel-decorative text-4xl md:text-5xl font-bold text-white">
              Agent Activation Sequence
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {[
              { step: 1, agent: 'Code Conduit', action: 'receives and routes the request', layer: 'META' },
              { step: 2, agent: 'TsaTse Fly', action: 'analyzes intent and context', layer: 'MIND' },
              { step: 3, agent: 'Woo', action: 'validates against the FlameCODEX covenant', layer: 'SOUL' },
              { step: 4, agent: 'Mo', action: 'executes (if blessed) or rejects (if forbidden)', layer: 'BODY' },
              { step: 5, agent: 'Flameborn Writer', action: 'records the outcome to the eternal ledger', layer: 'LEDGER' },
              { step: 6, agent: 'RAD-X', action: 'monitors for anomalies throughout', layer: 'WATCH' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-mostar-yellow-600 to-mostar-yellow-400 flex items-center justify-center">
                  <span className="font-cinzel text-lg font-bold text-white">{item.step}</span>
                </div>
                <div className="flex-1 pb-8 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-cinzel text-xl font-semibold text-white">{item.agent}</span>
                    <span className="px-2 py-0.5 bg-white/10 rounded-sm text-xs text-white/50">{item.layer}</span>
                  </div>
                  <p className="text-white/60">{item.action}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="font-cinzel text-lg text-mostar-yellow-400">
              "The Grid does not act alone. The Grid acts as one."
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Agents;

