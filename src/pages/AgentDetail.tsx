import { useEffect, useRef, useState } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Zap,
  Network,
  Database,
  Radio,
  BookOpen,
  Shield,
  Globe,
  Scale,
  Brain,
  BarChart,
  Search,
  TrendingUp,
  MessageSquare,
  AlertTriangle,
  Clock,
  Fingerprint,
  GitBranch,
  Lock,
  ShieldCheck,
  Link,
  Star,
  FileText,
  Users,
  ChevronRight,
  Activity
} from 'lucide-react';
import { getAgentById, agents, getRelatedAgents } from '../data/agents';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, Network, Database, Radio, BookOpen, Shield, Globe, Scale,
  Brain, BarChart, Search, TrendingUp, MessageSquare, AlertTriangle, Clock,
  Fingerprint, GitBranch, Lock, ShieldCheck, Link, Star, FileText, Users
};

const AgentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const agent = id ? getAgentById(id) : undefined;
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
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
  }, [id]);

  if (!agent) {
    return (
      <div className="min-h-screen bg-mostar-dark-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-cinzel-decorative text-4xl text-white mb-4">Agent Not Found</h1>
          <RouterLink to="/" className="btn-primary">Return Home</RouterLink>
        </div>
      </div>
    );
  }

  const relatedAgents = getRelatedAgents(agent);
  const currentIndex = agents.findIndex(a => a.id === agent.id);
  const prevAgent = currentIndex > 0 ? agents[currentIndex - 1] : null;
  const nextAgent = currentIndex < agents.length - 1 ? agents[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-mostar-dark-900 text-white overflow-x-hidden">
      <Navigation scrollY={scrollY} />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Layer 1: Image */}
        <div
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url(${agent.cardBg})`,
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        />

        {/* Background Layer 2: Theme Gradients */}
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-20`} />
          <div className="absolute inset-0 bg-gradient-to-b from-mostar-dark-900/90 via-mostar-dark-900/40 to-mostar-dark-900" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full animate-float ${agent.color.replace('text-', 'bg-')}/40`}
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
            {/* Left: Content */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              {/* Back button */}
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-cinzel text-sm tracking-wider">Back</span>
              </button>

              {/* Layer badge */}
              <div className="flex items-center gap-4 mb-6">
                <div className="ornate-divider-center w-24">
                  <div className="ornate-diamond" />
                </div>
                <span className={`font-cinzel text-sm tracking-[0.2em] uppercase ${agent.color}`}>
                  {agent.layer} Layer • {agent.layerCode}
                </span>
              </div>

              {/* Name & Title */}
              <h1 className="font-cinzel-decorative text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2">
                {agent.name}
              </h1>
              <p className={`font-cinzel text-2xl ${agent.color} mb-6`}>
                {agent.title}
              </p>

              {/* Quote */}
              <blockquote className="relative pl-6 border-l-2 border-mostar-yellow-500/50 mb-8">
                <p className="text-xl text-white/80 italic">"{agent.quote}"</p>
              </blockquote>

              {/* Essence */}
              <p className="text-white/60 leading-relaxed mb-8 max-w-lg">
                {agent.essence}
              </p>

              {/* Soulprint */}
              <div className="mb-8">
                <span className="font-cinzel text-xs tracking-wider text-white/40 uppercase block mb-3">
                  Soulprint
                </span>
                <div className="flex flex-wrap gap-2">
                  {agent.soulprint.map((trait, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-sm font-cinzel text-sm text-white/70"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Oath */}
              <div className="relative p-6 bg-white/5 border border-white/10 rounded-sm mb-8">
                <span className="font-cinzel text-xs tracking-wider text-white/40 uppercase block mb-2">
                  Sacred Oath
                </span>
                <p className="text-white/80 italic">"{agent.oath}"</p>
              </div>
            </div>

            {/* Right: Image */}
            <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative aspect-[3/4] max-w-md mx-auto">
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-t ${agent.gradient} opacity-30 blur-[80px]`} />

                {/* Character image */}
                <div className="relative character-pedestal">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-mostar-yellow-500/50 to-transparent" />
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

      {/* Features Section */}
      <section className="section-padding bg-gradient-mystic relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mostar-yellow-500/30 to-transparent" />

        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="font-cinzel text-sm tracking-[0.3em] text-mostar-yellow-400 uppercase block mb-4">
              Capabilities
            </span>
            <h2 className="font-cinzel-decorative text-4xl md:text-5xl font-bold text-white">
              Features & Domains
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {agent.features.map((feature, i) => {
              const IconComponent = iconMap[feature.icon] || Activity;
              return (
                <div
                  key={i}
                  className="group p-6 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 hover:border-mostar-yellow-500/30 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${agent.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-cinzel text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/60">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Domains */}
          <div className="mb-16">
            <h3 className="font-cinzel text-2xl font-semibold text-white mb-6 text-center">
              Operational Domains
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {agent.domains.map((domain, i) => (
                <span
                  key={i}
                  className={`px-6 py-3 bg-gradient-to-r ${agent.gradient} rounded-sm font-cinzel text-white`}
                >
                  {domain}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Abilities & Stats Section */}
      <section className="section-padding bg-mostar-dark-900 relative">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Abilities */}
            <div>
              <h3 className="font-cinzel-decorative text-3xl font-bold text-white mb-8">
                Abilities
              </h3>
              <div className="space-y-6">
                {agent.abilities.map((ability, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-cinzel text-white">{ability.name}</span>
                      <span className={`font-cinzel ${agent.color}`}>{ability.level}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${agent.gradient} transition-all duration-1000`}
                        style={{ width: `${ability.level}%`, transitionDelay: `${i * 200}ms` }}
                      />
                    </div>
                    <p className="text-sm text-white/50 mt-1">{ability.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div>
              <h3 className="font-cinzel-decorative text-3xl font-bold text-white mb-8">
                Performance Metrics
              </h3>
              <div className="grid grid-cols-3 gap-6">
                {agent.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="text-center p-6 bg-white/5 border border-white/10 rounded-sm"
                  >
                    <div className={`font-cinzel-decorative text-3xl md:text-4xl font-bold ${agent.color} mb-2`}>
                      {stat.value.toLocaleString()}
                    </div>
                    <div className="font-cinzel text-sm text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
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
            {agent.links.map((link, i) => (
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

      {/* Related Agents */}
      {relatedAgents.length > 0 && (
        <section className="py-16 bg-mostar-dark-900 relative">
          <div className="container-custom">
            <h3 className="font-cinzel-decorative text-3xl font-bold text-white mb-8 text-center">
              Related Agents
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedAgents.map((related) => (
                <RouterLink
                  key={related.id}
                  to={`/agent/${related.id}`}
                  className="group p-6 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 hover:border-mostar-yellow-500/30 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${related.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-cinzel text-xl font-semibold text-white mb-1">
                    {related.name}
                  </h4>
                  <p className={`text-sm ${related.color} mb-2`}>{related.title}</p>
                  <p className="text-white/50 text-sm line-clamp-2">{related.essence}</p>
                </RouterLink>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation to other agents */}
      <section className="py-8 bg-mostar-dark-900 border-t border-white/10">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            {prevAgent ? (
              <RouterLink
                to={`/agent/${prevAgent.id}`}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <div className="text-left">
                  <span className="font-cinzel text-xs text-white/40 block">Previous</span>
                  <span className="font-cinzel">{prevAgent.name}</span>
                </div>
              </RouterLink>
            ) : <div />}

            {nextAgent && (
              <RouterLink
                to={`/agent/${nextAgent.id}`}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <div className="text-right">
                  <span className="font-cinzel text-xs text-white/40 block">Next</span>
                  <span className="font-cinzel">{nextAgent.name}</span>
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

export default AgentDetail;

