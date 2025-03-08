
import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import TechnologyCard from '../components/TechnologyCard';
import Dashboard from '../components/Dashboard';
import VisionSection from '../components/VisionSection';
import GetInvolved from '../components/GetInvolved';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ChatBot from '../components/ChatBot';
import Particles from '../components/Particles';
import { Shield, Globe, Database, Brain } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for the futuristic loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const technologies = [
    {
      id: 1,
      title: 'AI & Predictive Intelligence',
      description: 'Leading-edge machine learning algorithms and data fusion systems powered by Supabase AI.',
      icon: <Brain className="h-12 w-12 text-mostar-light-blue" />,
      features: ['Machine Learning', 'Data Fusion', 'Supabase AI', 'Neural Networks'],
      color: 'blue',
    },
    {
      id: 2,
      title: 'Geospatial Tracking & Surveillance',
      description: 'Advanced global monitoring systems using CesiumJS, OpenWeather, and Sentinel AI technologies.',
      icon: <Globe className="h-12 w-12 text-mostar-cyan" />,
      features: ['CesiumJS', 'OpenWeather', 'Copernicus', 'Sentinel AI'],
      color: 'cyan',
    },
    {
      id: 3,
      title: 'Cybersecurity & Threat Intelligence',
      description: 'Zero Trust Security framework with AI-based intrusion detection for unbreakable system protection.',
      icon: <Shield className="h-12 w-12 text-mostar-green" />,
      features: ['Zero Trust Security', 'AI-based Intrusion Detection', 'Threat Intelligence', 'Security Analysis'],
      color: 'green',
    },
    {
      id: 4,
      title: 'Data Fusion & Visualization',
      description: 'Real-time dashboards powered by PostgreSQL and Big Data analytics for comprehensive insights.',
      icon: <Database className="h-12 w-12 text-mostar-magenta" />,
      features: ['Real-time Dashboards', 'PostgreSQL', 'Big Data', 'Visual Analytics'],
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
            INITIALIZING SYSTEM...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="scanline"></div>
      <Particles />
      
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        <section id="technologies" className="py-20 px-4 sm:px-8 relative overflow-hidden">
          <div className="container mx-auto">
            <div className="mb-16 text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-mostar-blue/10 text-mostar-light-blue font-mono text-xs mb-3">
                CORE SYSTEMS
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-blue-magenta-gradient text-gradient">
                What We Do
              </h2>
              <p className="max-w-2xl mx-auto text-white/70">
                Our advanced AI systems are operating at the frontier of technology, processing petabytes of data to deliver unparalleled intelligence solutions.
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
