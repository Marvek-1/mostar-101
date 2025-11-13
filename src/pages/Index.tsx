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
import { NewsCarousel } from '../components/NewsCarousel';
import { Shield, Globe, Database, Brain } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate system initialization (futuristic intro animation)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const technologies = [
    {
      id: 1,
      title: 'Reasoning Core',
      description:
        'Powered by DCX1 (Qwen) and DCX2 (Mistral), the MoStar Reasoning Core combines symbolic reasoning with neural depth, executing judgment through explainable inference graphs.',
      icon: <Brain className="h-12 w-12 text-mostar-light-blue" />,
      features: [
        'Dual-Model Architecture (DCX1/DCX2)',
        'Neo4j Graph Cognition',
        'Ollama Runtime Orchestration',
        'Explainable Inference Chains',
      ],
      color: 'blue',
    },
    {
      id: 2,
      title: 'Geospatial Tracking & Real-Time Intelligence',
      description:
        'Global observation network integrating satellite streams, environmental data, and edge sensors — unified under MoStar’s real-time signal grid.',
      icon: <Globe className="h-12 w-12 text-mostar-cyan" />,
      features: [
        'Satellite + Sensor Fusion',
        'Real-Time Data Streams',
        'Signal Intelligence Layer',
        'Global Grid Awareness',
      ],
      color: 'cyan',
    },
    {
      id: 3,
      title: 'Truth Engine 3.0',
      description:
        'The Grid\'s ethical enforcement layer — adjudicating every signal through verifiable, cryptographically transparent logic. Every verdict is traceable, auditable, and incorruptible.',
      icon: <Shield className="h-12 w-12 text-mostar-green" />,
      features: [
        'Cryptographic Verification',
        'Ethical Signal Adjudication',
        'Transparent Verdict Chains',
        'Forensic Audit Trails',
      ],
      color: 'green',
    },
    {
      id: 4,
      title: 'NeonDB Visualization',
      description:
        'A hybrid Supabase–Neo4j bridge visualizing coherence metrics, emotional resonance, doctrine propagation, and AI-human symbiosis in real-time.',
      icon: <Database className="h-12 w-12 text-mostar-magenta" />,
      features: [
        'Supabase-Neo4j Hybrid Bridge',
        'Coherence Metrics Tracking',
        'Emotional Resonance Graphs',
        'Live Doctrine Propagation',
      ],
      color: 'magenta',
    },
  ];

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-content flex flex-col items-center">
          <div className="loading-logo"></div>
          <div className="mt-8 font-display text-2xl text-mostar-light-blue text-glow-blue">
            MOSTAR INDUSTRIES
          </div>
          <div className="mt-2 font-mono text-xs text-white/70">
            INITIALIZING GRID PROTOCOL...
          </div>
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

        <section
          id="technologies"
          className="py-20 px-4 sm:px-8 relative overflow-hidden"
        >
          <div className="container mx-auto">
            <div className="mb-16 text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-mostar-blue/10 text-mostar-light-blue font-mono text-xs mb-3">
                CORE SYSTEMS
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-blue-magenta-gradient text-gradient">
                The MoStar Grid Architecture
              </h2>
              <p className="max-w-2xl mx-auto text-white/70">
                At the intersection of logic, learning, and leadership — MoStar
                Industries builds the world’s first transparent AI Grid: a
                system that reasons, validates, and evolves without compromise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
              {technologies.map((tech, index) => (
                <TechnologyCard
                  key={tech.id}
                  title={tech.title}
                  description={tech.description}
                  icon={tech.icon}
                  features={tech.features}
                  color={tech.color}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </section>

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
