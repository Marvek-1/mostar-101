
import { supabase } from '../integrations/supabase/client';
import { AINode } from '../types/ai-hub';

export const fetchAINodes = async (): Promise<AINode[]> => {
  try {
    const { data, error } = await supabase
      .from('yaml_configurations')
      .select('*')
      .limit(10);
    
    if (error) throw error;
    
    return data.map((item, index) => ({
      id: item.id || index,
      name: item.config_name || `Node-${index}`,
      status: item.status === 'active' ? 'Active' : 'Inactive',
      config: item.yaml_content || {},
      location: 'Unknown', // Using default as metadata isn't available
      lastUpdated: item.last_sync || new Date().toISOString(),
      performance: Math.floor(Math.random() * 100),
      threats: Math.floor(Math.random() * 50),
    }));
  } catch (error) {
    console.error('Error fetching AI nodes:', error);
    return [];
  }
};
