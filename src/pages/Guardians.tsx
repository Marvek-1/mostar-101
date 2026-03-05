import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, BookOpen, Scale, Flame, ChevronRight } from 'lucide-react';
import { guardians } from '../data/guardians';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sentinel: Shield,
  healer: Heart,
  archivist: BookOpen,
  balancer: Scale,
  flameborn: Flame
};

const Guardians = () => {
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
                The Pantheon
              </span>
              <div className="ornate-divider-center w-32">
                <div className="ornate-diamond" />
              </div>
            </div>

            <h1 className="font-cinzel-decorative text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Meet The
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-mostar-yellow-400 via-mostar-gold-400 to-mostar-yellow-400">
                Guardians
              </span>
            </h1>

            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Each guardian embodies a principle and a promise. They are the archetypes 
              that manifest across all MoStar products and systems.
            </p>

            <p className="font-cinzel text-sm text-mostar-yellow-400">
              "This thing exists to guard something for you."
            </p>
          </div>
        </div>
      </section>

      {/* Guardians Grid */}
      <section className="section-padding bg-gradient-mystic relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mostar-yellow-500/30 to-transparent" />
        
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guardians.map((guardian, index) => {
              const GuardianIcon = iconMap[guardian.id] || Shield;
              return (
                <Link
                  key={guardian.id}
                  to={`/guardian/${guardian.id}`}
                  className={`group relative overflow-hidden rounded-sm border transition-all duration-500 hover:shadow-glow-yellow card-hover ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    borderColor: 'rgba(255,255,255,0.1)'
                  }}
                >
                  {/* Domain badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1 text-xs font-cinzel tracking-wider ${guardian.color} bg-black/50 rounded-sm`}>
                      {guardian.domain}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative h-80 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-t ${guardian.gradient} opacity-20`} />
                    <img
                      src={guardian.image}
                      alt={guardian.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-mostar-dark-900 via-mostar-dark-900/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${guardian.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <GuardianIcon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="font-cinzel text-2xl font-semibold text-white mb-1 group-hover:text-mostar-yellow-300 transition-colors">
                      {guardian.name}
                    </h3>
                    <p className={`font-cinzel text-sm ${guardian.color} mb-3`}>
                      {guardian.title}
                    </p>
                    <p className="text-white/60 text-sm line-clamp-2 mb-4">
                      {guardian.description}
                    </p>

                    {/* Products preview */}
                    <div className="mb-4">
                      <span className="text-xs text-white/40 uppercase tracking-wider">Manifests As</span>
                      <p className="text-white/50 text-sm line-clamp-1">{guardian.manifestation}</p>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-white/60 group-hover:text-mostar-yellow-400 transition-colors">
                      <span className="font-cinzel text-sm">Enter Realm</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Artifacts Philosophy */}
      <section className="section-padding bg-mostar-dark-900 relative">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-cinzel text-sm tracking-[0.3em] text-mostar-yellow-400 uppercase block mb-4">
              Our Philosophy
            </span>
            <h2 className="font-cinzel-decorative text-4xl md:text-5xl font-bold text-white mb-8">
              Artifacts, Not Features
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              MoStar doesn't ship "features"; it ships <strong className="text-white">artifacts</strong>. 
              Each artifact embodies a principle and a promise: "This thing exists to guard something for you."
            </p>
            <p className="text-white/50">
              A user should be able to <em>name</em> the artifact and what it protects.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Guardians;

