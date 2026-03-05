import { useEffect, useRef, useState } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ExternalLink, 
  Shield, 
  Heart, 
  BookOpen, 
  Scale, 
  Flame,
  Check,
  ChevronRight
} from 'lucide-react';
import { getGuardianById, guardians, getRelatedGuardians } from '../data/guardians';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sentinel: Shield,
  healer: Heart,
  archivist: BookOpen,
  balancer: Scale,
  flameborn: Flame
};

const GuardianDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const guardian = id ? getGuardianById(id) : undefined;
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

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
    setActiveProduct(0);
  }, [id]);

  if (!guardian) {
    return (
      <div className="min-h-screen bg-mostar-dark-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-cinzel-decorative text-4xl text-white mb-4">Guardian Not Found</h1>
          <RouterLink to="/" className="btn-primary">Return Home</RouterLink>
        </div>
      </div>
    );
  }

  const relatedGuardians = getRelatedGuardians(guardian);
  const currentIndex = guardians.findIndex(g => g.id === guardian.id);
  const prevGuardian = currentIndex > 0 ? guardians[currentIndex - 1] : null;
  const nextGuardian = currentIndex < guardians.length - 1 ? guardians[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-mostar-dark-900 text-white overflow-x-hidden">
      <Navigation scrollY={scrollY} />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${guardian.gradient} opacity-10`} />
          <div className="absolute inset-0 bg-gradient-to-b from-mostar-dark-900/80 via-mostar-dark-900/50 to-mostar-dark-900" />
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full animate-float ${guardian.color.replace('text-', 'bg-')}/40`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="container-custom relative z-20 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="relative aspect-[3/4] max-w-md mx-auto">
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-t ${guardian.gradient} opacity-30 blur-[80px]`} />
                
                {/* Character image */}
                <div className="relative character-pedestal">
                  <img
                    src={guardian.image}
                    alt={guardian.name}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-mostar-yellow-500/50 to-transparent" />
              </div>
            </div>

            {/* Right: Content */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              {/* Back button */}
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-cinzel text-sm tracking-wider">Back</span>
              </button>

              {/* Domain badge */}
              <div className="flex items-center gap-4 mb-6">
                <div className="ornate-divider-center w-24">
                  <div className="ornate-diamond" />
                </div>
                <span className={`font-cinzel text-sm tracking-[0.2em] uppercase ${guardian.color}`}>
                  {guardian.domain} Domain
                </span>
              </div>

              {/* Name & Title */}
              <h1 className="font-cinzel-decorative text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2">
                {guardian.name}
              </h1>
              <p className={`font-cinzel text-2xl ${guardian.color} mb-6`}>
                {guardian.title}
              </p>

              {/* Quote */}
              <blockquote className="relative pl-6 border-l-2 border-mostar-yellow-500/50 mb-8">
                <p className="text-xl text-white/80 italic">"{guardian.quote}"</p>
              </blockquote>

              {/* Description */}
              <p className="text-white/60 leading-relaxed mb-8">
                {guardian.description}
              </p>

              {/* Visual Vibe */}
              <div className="mb-8">
                <span className="font-cinzel text-xs tracking-wider text-white/40 uppercase block mb-2">
                  Visual Essence
                </span>
                <p className="text-white/70 italic">{guardian.visualVibe}</p>
              </div>

              {/* Manifestation */}
              <div className="relative p-6 bg-white/5 border border-white/10 rounded-sm mb-8">
                <span className="font-cinzel text-xs tracking-wider text-white/40 uppercase block mb-2">
                  Manifests As
                </span>
                <p className="text-white/80">{guardian.manifestation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding bg-gradient-mystic relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mostar-yellow-500/30 to-transparent" />
        
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="font-cinzel text-sm tracking-[0.3em] text-mostar-yellow-400 uppercase block mb-4">
              Products & Features
            </span>
            <h2 className="font-cinzel-decorative text-4xl md:text-5xl font-bold text-white">
              What This Guardian Becomes
            </h2>
          </div>

          {/* Product Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {guardian.products.map((product, i) => (
              <button
                key={i}
                onClick={() => setActiveProduct(i)}
                className={`px-6 py-3 font-cinzel text-sm rounded-sm border transition-all duration-300 ${
                  activeProduct === i
                    ? `bg-gradient-to-r ${guardian.gradient} border-transparent text-white`
                    : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                }`}
              >
                {product.name}
              </button>
            ))}
          </div>

          {/* Active Product Display */}
          <div className="max-w-4xl mx-auto">
            <div className="p-8 bg-white/5 border border-white/10 rounded-sm">
              <h3 className="font-cinzel text-2xl font-semibold text-white mb-4">
                {guardian.products[activeProduct].name}
              </h3>
              <p className="text-white/70 mb-6">
                {guardian.products[activeProduct].description}
              </p>
              
              <span className="font-cinzel text-xs tracking-wider text-white/40 uppercase block mb-4">
                Key Features
              </span>
              <ul className="grid md:grid-cols-2 gap-3">
                {guardian.products[activeProduct].features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 ${guardian.color} flex-shrink-0 mt-0.5`} />
                    <span className="text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* User Benefit */}
          <div className="mt-12 max-w-3xl mx-auto text-center">
            <div className="relative p-8 bg-gradient-to-r from-mostar-yellow-600/20 to-mostar-yellow-400/10 border border-mostar-yellow-500/30 rounded-sm">
              <span className="font-cinzel text-xs tracking-wider text-mostar-yellow-400 uppercase block mb-4">
                You Understand It As
              </span>
              <p className="text-xl text-white italic">"{guardian.userBenefit}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-mostar-dark-900 relative">
        <div className="container-custom">
          <h3 className="font-cinzel-decorative text-3xl font-bold text-white mb-12 text-center">
            Impact Metrics
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {guardian.stats.map((stat, i) => (
              <div 
                key={i}
                className="text-center p-8 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 transition-all duration-300"
              >
                <div className={`font-cinzel-decorative text-4xl md:text-5xl font-bold ${guardian.color} mb-2`}>
                  {stat.value.toLocaleString()}
                </div>
                <div className="font-cinzel text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="py-16 bg-gradient-mystic relative">
        <div className="container-custom">
          <h3 className="font-cinzel-decorative text-3xl font-bold text-white mb-8 text-center">
            Access Points
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {guardian.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target={link.type === 'external' ? '_blank' : undefined}
                rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 rounded-sm hover:bg-mostar-yellow-500/20 hover:border-mostar-yellow-500/50 transition-all duration-300"
              >
                <span className="font-cinzel text-white">{link.label}</span>
                {link.type === 'external' && <ExternalLink className="w-4 h-4 text-white/60" />}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guardians */}
      {relatedGuardians.length > 0 && (
        <section className="py-16 bg-mostar-dark-900 relative">
          <div className="container-custom">
            <h3 className="font-cinzel-decorative text-3xl font-bold text-white mb-8 text-center">
              Related Guardians
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedGuardians.map((related) => {
                const RelatedIcon = iconMap[related.id] || Shield;
                return (
                  <RouterLink
                    key={related.id}
                    to={`/guardian/${related.id}`}
                    className="group p-6 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 hover:border-mostar-yellow-500/30 transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${related.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <RelatedIcon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-cinzel text-xl font-semibold text-white mb-1">
                      {related.name}
                    </h4>
                    <p className={`text-sm ${related.color} mb-2`}>{related.title}</p>
                    <p className="text-white/50 text-sm line-clamp-2">{related.description}</p>
                  </RouterLink>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Navigation to other guardians */}
      <section className="py-8 bg-mostar-dark-900 border-t border-white/10">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            {prevGuardian ? (
              <RouterLink 
                to={`/guardian/${prevGuardian.id}`}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <div className="text-left">
                  <span className="font-cinzel text-xs text-white/40 block">Previous</span>
                  <span className="font-cinzel">{prevGuardian.name}</span>
                </div>
              </RouterLink>
            ) : <div />}
            
            {nextGuardian && (
              <RouterLink 
                to={`/guardian/${nextGuardian.id}`}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <div className="text-right">
                  <span className="font-cinzel text-xs text-white/40 block">Next</span>
                  <span className="font-cinzel">{nextGuardian.name}</span>
                </div>
                <ChevronRight className="w-5 h-5" />
              </RouterLink>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GuardianDetail;

