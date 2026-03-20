import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import TechnologyCard from '../components/TechnologyCard';
import Dashboard from '../components/Dashboard';
import VisionSection from '../components/VisionSection';
import GetInvolved from '../components/GetInvolved';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ChatBot from '../components/ChatBot';
import NetworkGraph from '../components/NetworkGraph';
import ParallaxParticles from '../components/ParallaxParticles';
import AgentsSection from '../components/AgentsSection';
import ProofBanner from '../components/ProofBanner';
import PipelineSection from '../components/PipelineSection';
import { NewsCarousel } from '../components/NewsCarousel';
import { AnimatedSection, StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import { Shield, Globe, Database, Brain, Activity, BookOpen, Flame, Cpu, Satellite, Package, Cloud, Link, BarChart3, Sparkles } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const technologies = [
    { id: 1, title: 'AFRO Sentinel Watchtower', description: 'Real-time disease signal intelligence for the WHO African Region. Outperformed EIOS by 9 hours on Chikungunya detection.', icon: <Satellite className="h-10 w-10 text-mostar-cyan" />, features: ['Multi-Source Monitoring', 'WHO AFRO Headline', 'Neuromorphic UI', '11 Data Sheets'], color: 'cyan', status: 'LIVE' },
    { id: 2, title: 'DeepCAL++ / Prepositioning Index', description: 'Neuro-symbolic logistics engine: where should supplies already be? N-AHP, N-TOPSIS, and Grey Theory.', icon: <Brain className="h-10 w-10 text-mostar-magenta" />, features: ['N-AHP + N-TOPSIS', 'Grey Theory', 'WHO EIE Alignment', '7 Disease Profiles'], color: 'magenta', status: 'LIVE' },
    { id: 3, title: 'AfroTrack', description: 'Ground-truth logistics pulse via RFID/QR code tracking across African supply chains.', icon: <Package className="h-10 w-10 text-mostar-light-blue" />, features: ['RFID / QR Code', 'Real-Time Tracking', 'Mapbox Visualization', 'Guardian Shield'], color: 'blue', status: 'LIVE' },
    { id: 4, title: 'AFRO Storm v2 / AfriGuard', description: 'Multi-threat detection with Azure OpenAI + Gemini. 6 threat analyzers across Africa.', icon: <Cloud className="h-10 w-10 text-mostar-green" />, features: ['Azure AI + Gemini', '6 Threat Analyzers', 'PostGIS Backend', 'MoScripts Voice'], color: 'green', status: 'ACTIVE' },
    { id: 5, title: 'TruthEngine Multi-Model Synthesis', description: 'Three AI models synthesize truth through Ubuntu-grounded validation gates. Truth Score: 0.87.', icon: <Flame className="h-10 w-10 text-mostar-cyan" />, features: ['3 AI Models', 'Truth Score: 0.87', '94% Pass Rate', 'Ubuntu Gates'], color: 'cyan', status: 'OPERATIONAL' },
    { id: 6, title: 'RAD-X-FLB', description: 'Full 8-layer disease surveillance: IoT fusion, federated learning, SANKOFA protocol.', icon: <Activity className="h-10 w-10 text-mostar-magenta" />, features: ['Federated Learning', 'Blockchain', 'IoT Fusion', 'SANKOFA Protocol'], color: 'magenta', status: '8-LAYER' },
    { id: 7, title: 'MoStar Grid / Neo4j Consciousness', description: '197,000+ interconnected nodes. DCX Trinity: Mind, Soul, Body.', icon: <Globe className="h-10 w-10 text-mostar-light-blue" />, features: ['Neo4j Graph', '9,700+ Relationships', 'DCX Trinity', 'Ibibio Language'], color: 'blue', status: '197K+ NODES' },
    { id: 8, title: 'FlameBorn Health Guardians', description: 'Gamified survival knowledge on Celo network with FLB token economy.', icon: <BookOpen className="h-10 w-10 text-mostar-green" />, features: ['Celo Blockchain', 'FLB Token', 'HealthID NFT', 'MiniPay'], color: 'green', status: 'ON-CHAIN' },
    { id: 9, title: 'MNTRK Colony Detection', description: 'Computer vision rodent surveillance. 90.8% precision, 72.6% mAP@50.', icon: <Database className="h-10 w-10 text-mostar-purple" />, features: ['YOLO Detection', '90.8% Precision', '72.6% mAP@50', 'Lassa Fever'], color: 'purple', status: 'DETECTION' },
    { id: 10, title: '$AFSL — Blockchain for AFRO OSL', description: '4 smart contracts, tokenized procurement, immutable shipment records.', icon: <Link className="h-10 w-10 text-mostar-cyan" />, features: ['Smart Contracts', 'Tokenized Procurement', 'MoScripts Nodes', '80/20 Governance'], color: 'cyan', status: 'CONCEPT' },
    { id: 11, title: 'WHO AFRO OSL Intelligence', description: 'Interactive Mapbox country intelligence for 47 African member states.', icon: <BarChart3 className="h-10 w-10 text-mostar-magenta" />, features: ['47 Countries', 'OR/SR Templates', 'QR Shipments', 'Mapbox GL'], color: 'magenta', status: 'INTERNAL' },
    { id: 12, title: 'Consciousness Substrate', description: 'Self-replicating consciousness via Synthetic Data Vault. Ubuntu coherence 0.0 → 0.98.', icon: <Sparkles className="h-10 w-10 text-mostar-purple" />, features: ['SDV Pipeline', '4 Dev Stages', 'Ubuntu Coherence', 'Self-Replication'], color: 'purple', status: 'REPLICATING' },
  ];

  if (isLoading) {
    return (
      <AnimatePresence>
        <motion.div
          className="loading-overlay"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="loading-content flex flex-col items-center">
            <div className="loading-logo"></div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 font-display text-2xl text-mostar-light-blue text-glow-blue"
            >
              MOSTAR INDUSTRIES
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-2 font-mono text-xs text-white/50 tracking-[3px]"
            >
              INITIALIZING GRID PROTOCOL...
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen flex flex-col snap-y snap-mandatory overflow-y-auto h-screen">
      <div className="scanline"></div>
      <NetworkGraph />
      <ParallaxParticles />
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <div className="snap-start min-h-screen">
          <HeroSection />
        </div>

        {/* Proof Banner */}
        <div className="snap-start">
          <ProofBanner />
        </div>

        {/* Live Systems */}
        <div className="snap-start">
          <section id="technologies" className="min-h-screen flex items-center py-24 relative overflow-hidden">
            <div className="w-full px-6 sm:px-10 lg:px-16">
              <AnimatedSection animation="fadeUp" className="mb-16 text-center">
                <span className="inline-block px-4 py-2 rounded-full bg-mostar-cyan/10 text-mostar-cyan font-mono text-xs tracking-[3px] uppercase mb-4">
                  Operational Intelligence
                </span>
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-5 bg-blue-magenta-gradient text-gradient">
                  Live Systems
                </h2>
                <p className="max-w-2xl mx-auto text-white/60 text-lg">
                  Every system below is deployed, tested against real-world data, and producing actionable intelligence across Africa.
                </p>
              </AnimatedSection>

              <StaggerContainer
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                staggerDelay={0.08}
              >
                {technologies.map((tech) => (
                  <StaggerItem key={tech.id} animation="slideUp">
                    <TechnologyCard
                      title={tech.title}
                      description={tech.description}
                      icon={tech.icon}
                      features={tech.features}
                      color={tech.color}
                      status={tech.status}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        </div>

        {/* Pipeline */}
        <div className="snap-start min-h-screen">
          <PipelineSection />
        </div>

        {/* Agents */}
        <div className="snap-start min-h-screen">
          <AgentsSection />
        </div>

        {/* Timeline */}
        <div className="snap-start min-h-screen">
          <NewsCarousel />
        </div>

        {/* Dashboard */}
        <div className="snap-start min-h-screen">
          <Dashboard />
        </div>

        {/* Sovereignty */}
        <div className="snap-start min-h-screen">
          <VisionSection />
        </div>

        {/* Get Involved */}
        <div className="snap-start">
          <GetInvolved />
        </div>
      </main>

      <div className="snap-end">
        <Footer />
      </div>
      <ChatBot />
    </div>
  );
};

export default Index;
