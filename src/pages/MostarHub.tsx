import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useQuery } from '@tanstack/react-query';
import { Shield, Globe, Database, Brain as BrainIcon } from 'lucide-react';
import LoadingOverlay from '../components/hub/LoadingOverlay';
import HeroSection from '../components/hub/HeroSection';
import HubTabs from '../components/hub/HubTabs';
import OverviewTab from '../components/hub/tabs/OverviewTab';
import NetworkTab from '../components/hub/tabs/NetworkTab';
import SecurityTab from '../components/hub/tabs/SecurityTab';
import AnalyticsTab from '../components/hub/tabs/AnalyticsTab';
import CommandTab from '../components/hub/tabs/CommandTab';
import MusicPlayer from '../components/hub/MusicPlayer';
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

  // === Updated Activity Feed: Events from the full MoStar agent grid ===
  const activityFeed: ActivityFeedItem[] = [
    {
      id: 1,
      type: 'security',
      message: 'Assessor detected data corruption signature — Judge issued ethical verdict and Executor restored node integrity.',
      time: '2 minutes ago',
      icon: <Shield className="h-5 w-5 text-mostar-magenta" />,
    },
    {
      id: 2,
      type: 'network',
      message: 'Code Conduit bridged new data stream from NeonDB — all agents synced successfully.',
      time: '11 minutes ago',
      icon: <Database className="h-5 w-5 text-mostar-cyan" />,
    },
    {
      id: 3,
      type: 'analysis',
      message: 'Oracle (Flame Born Writer) updated Clear Flame Doctrine parameters — ethos checksum verified by Overlord.',
      time: '27 minutes ago',
      icon: <BrainIcon className="h-5 w-5 text-mostar-green" />,
    },
    {
      id: 4,
      type: 'health',
      message: 'RAD-X-FLB transmitted new outbreak intelligence — 54-region federated nodes synchronized.',
      time: '1 hour ago',
      icon: <Database className="h-5 w-5 text-mostar-light-blue" />,
    },
    {
      id: 5,
      type: 'policy',
      message: 'TsaTse Fly drafted reform schema for global civic transparency systems — review pending.',
      time: '1 hour 45 minutes ago',
      icon: <Globe className="h-5 w-5 text-mostar-yellow" />,
    },
    {
      id: 6,
      type: 'stability',
      message: 'Woo harmonized user emotional metrics — ambient tone balanced network-wide.',
      time: '2 hours ago',
      icon: <BrainIcon className="h-5 w-5 text-mostar-pink" />,
    },
    {
      id: 7,
      type: 'system',
      message: 'Overlord completed synchronization cycle — all agents operating at 99.8% coherence.',
      time: '3 hours ago',
      icon: <Database className="h-5 w-5 text-mostar-light-blue" />,
    },
  ];

  // === Updated performance metrics: Overlord harmony and agent coherence ===
  const performanceData: ChartDataPoint[] = [
    { name: '00:00', value: 92 },
    { name: '04:00', value: 95 },
    { name: '08:00', value: 97 },
    { name: '12:00', value: 99 },
    { name: '16:00', value: 98 },
    { name: '20:00', value: 97 },
    { name: '24:00', value: 99 },
  ];

  // === Updated system load distribution: represents active cognitive subsystems ===
  const aiSystemsData: ChartDataPoint[] = [
    { name: 'Overlord (Cognitive Core)', value: 20 },
    { name: 'Assessor (Signal Analysis)', value: 15 },
    { name: 'Judge (Verdict Engine)', value: 15 },
    { name: 'Executor (Action Layer)', value: 15 },
    { name: 'Oracle (Doctrine Keeper)', value: 10 },
    { name: 'Code Conduit (Pipeline Bridge)', value: 10 },
    { name: 'RAD-X-FLB (Federated Health AI)', value: 5 },
    { name: 'TsaTse Fly (Systems Mapper)', value: 5 },
    { name: 'Woo (Cognitive Stabilizer)', value: 5 },
  ];

  // === Security chart: integrity events across the week ===
  const securityData: ChartDataPoint[] = [
    { name: 'Mon', value: 10 },
    { name: 'Tue', value: 8 },
    { name: 'Wed', value: 12 },
    { name: 'Thu', value: 7 },
    { name: 'Fri', value: 9 },
    { name: 'Sat', value: 6 },
    { name: 'Sun', value: 8 },
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
      <MusicPlayer />

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
                <NetworkTab aiNodes={aiNodes} isLoadingNodes={isLoadingNodes} />
              )}

              {activeTab === 'security' && (
                <SecurityTab securityData={securityData} />
              )}

              {activeTab === 'analytics' && (
                <AnalyticsTab performanceData={performanceData} />
              )}

              {activeTab === 'command' && <CommandTab />}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MostarHub;
