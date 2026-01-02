import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import TechnologyCard from '../components/TechnologyCard';
import Dashboard from '../components/Dashboard';
import VisionSection from '../components/VisionSection';
import GetInvolved from '../components/GetInvolved';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ChatBot from '../components/ChatBot';
import NetworkGraph from '../components/NetworkGraph';
import AgentsSection from '../components/AgentsSection';
import { NewsCarousel } from '../components/NewsCarousel';
import { Shield, Globe, Database, Brain, Activity, BookOpen } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const technologies = [
    {
      id: 1,
      title: 'Ifa Computational Core',
      description: '256 binary patterns for parallel state resolution. All states exist simultaneously until contextual collapse. Dual-model reasoning (DCX1/DCX2) through Odu mathematics.',
      icon: <Brain className="h-12 w-12 text-mostar-light-blue" />,
      features: ['256 Binary Pattern Resolution', 'Parallel State Cognition', 'Odu Mathematical Framework', 'Contextual Collapse Logic'],
      color: 'blue',
    },
    {
      id: 2,
      title: 'RAD-X Disease Intelligence',
      description: 'Real-time African disease surveillance integrating WHO AFRO data (12,500+ records, 2017-2024). Azure OpenAI + Mapbox visualization for outbreak intelligence.',
      icon: <Activity className="h-12 w-12 text-mostar-cyan" />,
      features: ['WHO AFRO Data Integration', '12,500+ Health Records', 'Outbreak Pattern Detection', 'Real-Time Surveillance'],
      color: 'cyan',
    },
    {
      id: 3,
      title: 'FlameBorn Health Education',
      description: 'Blockchain-based learning on Celo network with FLB token economy and MiniPay integration. Gamified survival knowledge for African health sovereignty.',
      icon: <BookOpen className="h-12 w-12 text-mostar-green" />,
      features: ['Celo Blockchain Learning', 'FLB Token Economy', 'MiniPay Integration', 'Gamified Health Knowledge'],
      color: 'green',
    },
    {
      id: 4,
      title: 'WHO Signal Intelligence',
      description: 'Neuromorphic UI with African map visualization. 11 data sheets processed in real-time for outbreak pattern detection and health signal analysis.',
      icon: <Globe className="h-12 w-12 text-mostar-magenta" />,
      features: ['African Map Visualization', '11 WHO Data Sheets', 'Neuromorphic Interface', 'Pattern Detection Engine'],
      color: 'magenta',
    },
    {
      id: 5,
      title: 'MNTRK Colony Detection',
      description: 'Rodent surveillance for disease vector monitoring. Real-time alerts feeding into the Grid for early warning on vector-borne disease outbreaks.',
      icon: <Database className="h-12 w-12 text-mostar-purple" />,
      features: ['Vector Surveillance Network', 'Real-Time Alert System', 'Disease Vector Monitoring', 'Early Warning Integration'],
      color: 'purple',
    },
    {
      id: 6,
      title: 'Woo Interpreter',
      description: 'Ethical adjudication through covenant governance. Resonance scoring and soulprint validation ensure every decision aligns with African health sovereignty.',
      icon: <Shield className="h-12 w-12 text-mostar-cyan" />,
      features: ['Covenant Governance', 'Resonance Scoring', 'Soulprint Validation', 'Ethical Adjudication'],
      color: 'cyan',
    },
  ];

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-content flex flex-col items-center">
          <div className="loading-logo"></div>
          <div className="mt-8 font-display text-2xl text-mostar-light-blue text-glow-blue">MOSTAR INDUSTRIES</div>
          <div className="mt-2 font-mono text-xs text-white/70">INITIALIZING GRID PROTOCOL...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="scanline"></div>
      <NetworkGraph />
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <section id="technologies" className="py-20 px-4 sm:px-8 relative overflow-hidden">
          <div className="container mx-auto">
            <div className="mb-16 text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-mostar-blue/10 text-mostar-light-blue font-mono text-xs mb-3">
                AFRICAN HEALTH ARCHITECTURE
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-blue-magenta-gradient text-gradient">
                The MoStar Grid Systems
              </h2>
              <p className="max-w-2xl mx-auto text-white/70">
                African health sovereignty through ancestral computation and modern AI — the first intelligence grid built on Ifa computational logic.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              {technologies.map((tech, index) => (
                <TechnologyCard key={tech.id} title={tech.title} description={tech.description} icon={tech.icon} features={tech.features} color={tech.color} delay={index * 100} />
              ))}
            </div>
          </div>
        </section>
        <AgentsSection />
        <NewsCarousel />
        <Dashboard />
        <VisionSection />
        <GetInvolved />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
