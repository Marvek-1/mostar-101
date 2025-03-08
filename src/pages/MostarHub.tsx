
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useQuery } from '@tanstack/react-query';
import { Shield, Globe, Database, Brain } from 'lucide-react';
import LoadingOverlay from '../components/hub/LoadingOverlay';
import HeroSection from '../components/hub/HeroSection';
import HubTabs from '../components/hub/HubTabs';
import OverviewTab from '../components/hub/tabs/OverviewTab';
import NetworkTab from '../components/hub/tabs/NetworkTab';
import SecurityTab from '../components/hub/tabs/SecurityTab';
import AnalyticsTab from '../components/hub/tabs/AnalyticsTab';
import CommandTab from '../components/hub/tabs/CommandTab';
import { fetchAINodes } from '../services/aiNodeService';
import { ActivityFeedItem, ChartDataPoint } from '../types/ai-hub';

const MostarHub = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  const { data: aiNodes = [], isLoading: isLoadingNodes, isError } = useQuery({
    queryKey: ['aiNodes'],
    queryFn: fetchAINodes,
    staleTime: 30000,
  });

  const activityFeed: ActivityFeedItem[] = [
    { id: 1, type: 'security', message: 'Threat detected and neutralized in Sector 7', time: '2 minutes ago', icon: <Shield className="h-5 w-5 text-mostar-magenta" /> },
    { id: 2, type: 'network', message: 'New AI node deployed in Sydney region', time: '15 minutes ago', icon: <Database className="h-5 w-5 text-mostar-cyan" /> },
    { id: 3, type: 'analysis', message: 'Pattern recognition complete on Dataset Alpha', time: '37 minutes ago', icon: <Brain className="h-5 w-5 text-mostar-green" /> },
    { id: 4, type: 'system', message: 'Quantum encryption protocols updated', time: '1 hour ago', icon: <Database className="h-5 w-5 text-mostar-light-blue" /> },
    { id: 5, type: 'satellite', message: 'Geospatial anomaly detected in North Atlantic', time: '2 hours ago', icon: <Globe className="h-5 w-5 text-mostar-yellow" /> },
  ];

  const performanceData: ChartDataPoint[] = [
    { name: '00:00', value: 85 },
    { name: '04:00', value: 83 },
    { name: '08:00', value: 91 },
    { name: '12:00', value: 96 },
    { name: '16:00', value: 94 },
    { name: '20:00', value: 98 },
    { name: '24:00', value: 95 },
  ];

  const aiSystemsData: ChartDataPoint[] = [
    { name: 'Predictive Analytics', value: 25 },
    { name: 'Neural Networks', value: 30 },
    { name: 'ML Algorithms', value: 20 },
    { name: 'Data Fusion', value: 15 },
    { name: 'Quantum Computing', value: 10 },
  ];

  const securityData: ChartDataPoint[] = [
    { name: 'Mon', value: 12 },
    { name: 'Tue', value: 8 },
    { name: 'Wed', value: 15 },
    { name: 'Thu', value: 5 },
    { name: 'Fri', value: 10 },
    { name: 'Sat', value: 3 },
    { name: 'Sun', value: 7 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="scanline"></div>
      <Navbar />
      
      <main className="flex-grow pt-20">
        <HeroSection />
        
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="glassmorphism rounded-lg border border-white/10 p-6 mb-8">
              <HubTabs activeTab={activeTab} handleTabChange={handleTabChange} />
              
              {activeTab === 'overview' && (
                <OverviewTab 
                  performanceData={performanceData}
                  securityData={securityData}
                  aiSystemsData={aiSystemsData}
                  activityFeed={activityFeed}
                  aiNodes={aiNodes}
                  isLoadingNodes={isLoadingNodes}
                />
              )}
              
              {activeTab === 'network' && (
                <NetworkTab 
                  aiNodes={aiNodes}
                  isLoadingNodes={isLoadingNodes}
                />
              )}
              
              {activeTab === 'security' && (
                <SecurityTab securityData={securityData} />
              )}
              
              {activeTab === 'analytics' && (
                <AnalyticsTab performanceData={performanceData} />
              )}
              
              {activeTab === 'command' && (
                <CommandTab />
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MostarHub;
