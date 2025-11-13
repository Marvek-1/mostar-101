import { supabase } from '../integrations/supabase/client';

export interface GridTelemetry {
  nodes: number;
  coherence: number;
  active_verdicts: number;
  clean_records_percent: number;
  ollama_uptime: number;
  dcx1_status: 'online' | 'offline';
  dcx2_status: 'online' | 'offline';
  neo4j_connected: boolean;
  timestamp: string;
}

/**
 * Fetch live grid telemetry data
 * This would connect to your /api/grid-telemetry endpoint
 */
export const fetchGridTelemetry = async (): Promise<GridTelemetry | null> => {
  try {
    // For now, return mock data that simulates live telemetry
    // Replace this with actual API call when backend is ready
    return {
      nodes: Math.floor(Math.random() * 1000) + 24000,
      coherence: 98.7 + (Math.random() * 1.3 - 0.5),
      active_verdicts: Math.floor(Math.random() * 500) + 2000,
      clean_records_percent: 97.5 + (Math.random() * 2),
      ollama_uptime: 99.2 + (Math.random() * 0.8),
      dcx1_status: Math.random() > 0.05 ? 'online' : 'offline',
      dcx2_status: Math.random() > 0.05 ? 'online' : 'offline',
      neo4j_connected: Math.random() > 0.02,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Failed to fetch grid telemetry:', error);
    return null;
  }
};

/**
 * Subscribe to real-time telemetry updates
 */
export const subscribeToGridTelemetry = (
  callback: (data: GridTelemetry) => void
) => {
  // Simulate real-time updates every 3 seconds
  const interval = setInterval(async () => {
    const data = await fetchGridTelemetry();
    if (data) callback(data);
  }, 3000);

  return () => clearInterval(interval);
};
