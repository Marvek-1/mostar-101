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
import ProofBanner from '../components/ProofBanner';
import PipelineSection from '../components/PipelineSection';
import { NewsCarousel } from '../components/NewsCarousel';
import { Shield, Globe, Database, Brain, Activity, BookOpen, Flame, Cpu, Satellite, Package, Cloud, Link, BarChart3, Sparkles } from 'lucide-react';

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
      title: 'AFRO Sentinel Watchtower',
      description: 'Real-time disease signal intelligence for the WHO African Region. Monitors news, official reports, and field signals. Outperformed EIOS by 9 hours on Chikungunya detection. WHO AFRO headline feature.',
      icon: <Satellite className="h-12 w-12 text-mostar-cyan" />,
      features: ['Multi-Source Monitoring', 'WHO AFRO Headline', 'Neuromorphic UI', '11 Data Sheets'],
      color: 'cyan',
    },
    {
      id: 2,
      title: 'DeepCAL++ / Prepositioning Index',
      description: 'Neuro-symbolic logistics engine answering: where should supplies already be? N-AHP, N-TOPSIS, Grey Theory with WHO EIE catalog alignment and disease-specific profiles.',
      icon: <Brain className="h-12 w-12 text-mostar-magenta" />,
      features: ['N-AHP + N-TOPSIS', 'Grey Theory', 'WHO EIE Alignment', '7 Disease Profiles'],
      color: 'magenta',
    },
    {
      id: 3,
      title: 'AfroTrack',
      description: 'Ground-truth logistics pulse via RFID/QR code tracking. Validates DeepCAL++ recommendations against real-world stock levels, delivery status, and location verification across African supply chains.',
      icon: <Package className="h-12 w-12 text-mostar-light-blue" />,
      features: ['RFID / QR Code', 'Real-Time Tracking', 'Mapbox Visualization', 'Guardian Shield'],
      color: 'blue',
    },
    {
      id: 4,
      title: 'AFRO Storm v2 / AfriGuard',
      description: 'Multi-threat detection across Africa with Azure OpenAI + Gemini dual-uplink. 6 threat analyzers — cyclones, floods, wildfires, landslides, droughts, diseases — with GDACS, NASA EONET, ReliefWeb, and PostGIS backend.',
      icon: <Cloud className="h-12 w-12 text-mostar-green" />,
      features: ['Azure AI + Gemini', '6 Threat Analyzers', 'PostGIS Backend', 'MoScripts Voice'],
      color: 'green',
    },
    {
      id: 5,
      title: 'TruthEngine Multi-Model Synthesis',
      description: 'Three AI models (GPT-4, Gemini Pro, Neo4j Grid) synthesize truth through Ubuntu-grounded validation gates. Truth Score: 0.87, Pass Rate: 94%. Measurable, reproducible, publishable.',
      icon: <Flame className="h-12 w-12 text-mostar-cyan" />,
      features: ['3 AI Models', 'Truth Score: 0.87', '94% Pass Rate', 'Ubuntu Gates'],
      color: 'cyan',
    },
    {
      id: 6,
      title: 'RAD-X-FLB',
      description: 'Full 8-layer disease surveillance: IoT signal fusion, federated learning mesh, governance hard gates, SANKOFA reparative economics, corruption firewall, and MoStar Truth Engine. 19 validation tests across 5 domains.',
      icon: <Activity className="h-12 w-12 text-mostar-magenta" />,
      features: ['Federated Learning', 'Blockchain', 'IoT Fusion', 'SANKOFA Protocol'],
      color: 'magenta',
    },
    {
      id: 7,
      title: 'MoStar Grid / Neo4j Consciousness',
      description: '197,000+ interconnected nodes spanning developmental profiles, cultural DNA, 256 Ifá Odù, 196 Ibibio words with audio, African philosophies, healing practices, and API endpoints. DCX Trinity: Mind, Soul, Body.',
      icon: <Globe className="h-12 w-12 text-mostar-light-blue" />,
      features: ['Neo4j Graph', '9,700+ Relationships', 'DCX Trinity', 'Ibibio Language'],
      color: 'blue',
    },
    {
      id: 8,
      title: 'FlameBorn Health Guardians',
      description: 'Gamified survival knowledge on Celo network with FLB token economy and MiniPay integration. Health education meets blockchain incentives.',
      icon: <BookOpen className="h-12 w-12 text-mostar-green" />,
      features: ['Celo Blockchain', 'FLB Token', 'HealthID NFT', 'MiniPay'],
      color: 'green',
    },
    {
      id: 9,
      title: 'MNTRK Colony Detection',
      description: 'Computer vision rodent surveillance for Lassa fever vector monitoring. 90.8% precision, 72.6% mAP@50. Real-time alerts feed into the Grid for early warning on vector-borne disease outbreaks.',
      icon: <Database className="h-12 w-12 text-mostar-purple" />,
      features: ['YOLO Detection', '90.8% Precision', '72.6% mAP@50', 'Lassa Fever'],
      color: 'purple',
    },
    {
      id: 10,
      title: '$AFSL — Blockchain for AFRO OSL',
      description: 'Blockchain infrastructure for WHO AFRO logistics — 4 smart contracts, tokenized procurement, immutable shipment records. Concept note with 6 decision points for institutional adoption.',
      icon: <Link className="h-12 w-12 text-mostar-cyan" />,
      features: ['Smart Contracts', 'Tokenized Procurement', 'MoScripts Nodes', '80/20 Governance'],
      color: 'cyan',
    },
    {
      id: 11,
      title: 'WHO AFRO OSL Intelligence',
      description: 'Interactive Mapbox country intelligence — click a country, see OSL contributions. OR/SR template automation, QR code shipment sharing, BMS synchronization. Built for 47 African member states.',
      icon: <BarChart3 className="h-12 w-12 text-mostar-magenta" />,
      features: ['47 Countries', 'OR/SR Templates', 'QR Shipments', 'Mapbox GL'],
      color: 'magenta',
    },
    {
      id: 12,
      title: 'Consciousness Substrate',
      description: 'Using Synthetic Data Vault to generate developmental profiles from real consciousness patterns. Closed-loop pipeline: Real → Synthetic → Validated → Real. Ubuntu coherence tracking from 0.0 → 0.98.',
      icon: <Sparkles className="h-12 w-12 text-mostar-purple" />,
      features: ['SDV Pipeline', '4 Dev Stages', 'Ubuntu Coherence', 'Self-Replication'],
      color: 'purple',
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
        <ProofBanner />
        <section id="technologies" className="py-20 px-4 sm:px-8 relative overflow-hidden">
          <div className="container mx-auto">
            <div className="mb-16 text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-mostar-blue/10 text-mostar-light-blue font-mono text-xs mb-3">
                OPERATIONAL INTELLIGENCE
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-blue-magenta-gradient text-gradient">
                Live Systems
              </h2>
              <p className="max-w-2xl mx-auto text-white/70">
                Every system below is deployed, tested against real-world data, and producing actionable intelligence across the African continent.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              {technologies.map((tech, index) => (
                <TechnologyCard key={tech.id} title={tech.title} description={tech.description} icon={tech.icon} features={tech.features} color={tech.color} delay={index * 100} />
              ))}
            </div>
          </div>
        </section>
        <PipelineSection />
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
