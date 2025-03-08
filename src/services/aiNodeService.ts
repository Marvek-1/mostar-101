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

export const executeCommand = async (commandText: string): Promise<CommandResponse> => {
  try {
    // Parse the command
    const command = commandText.trim().toLowerCase();
    const tokens = command.split(' ');
    const action = tokens[0];
    let response: CommandResponse = {
      message: '',
      type: 'system',
      timestamp: new Date().toISOString()
    };

    // Process different commands
    switch (action) {
      case 'help':
        response.message = `
Available commands:
- status: Check system status
- list nodes: List all AI nodes
- analyze [node_name]: Analyze specific node
- secure [protocol]: Check security protocols
- deploy [node]: Simulate node deployment
- query [table]: Query database tables
- clear: Clear terminal output
        `;
        response.type = 'info';
        break;

      case 'status':
        response.message = "System Status: Online. All subsystems operational. Quantum processors at 98% efficiency.";
        response.type = 'success';
        break;

      case 'list':
        if (tokens[1] === 'nodes') {
          const nodes = await fetchAINodes();
          response.message = `Found ${nodes.length} active nodes:\n${nodes.map(n => `- ${n.name} (${n.status})`).join('\n')}`;
          response.type = 'success';
        } else {
          response.message = "Unknown list command. Try 'list nodes'";
          response.type = 'error';
        }
        break;

      case 'analyze':
        if (tokens.length < 2) {
          response.message = "Please specify a node to analyze";
          response.type = 'error';
        } else {
          const nodeName = tokens.slice(1).join(' ');
          const nodes = await fetchAINodes();
          const node = nodes.find(n => n.name.toLowerCase().includes(nodeName.toLowerCase()));
          
          if (node) {
            response.message = `Analysis of node ${node.name}:\nStatus: ${node.status}\nPerformance: ${node.performance}%\nThreats detected: ${node.threats}\nLocation: ${node.location}\nLast update: ${new Date(node.lastUpdated).toLocaleString()}`;
            response.type = 'success';
          } else {
            response.message = `Node "${nodeName}" not found`;
            response.type = 'error';
          }
        }
        break;

      case 'query':
        if (tokens.length < 2) {
          response.message = "Please specify a table to query";
          response.type = 'error';
        } else {
          const table = tokens[1];
          try {
            const { data, error } = await supabase
              .from(table)
              .select('*')
              .limit(5);
            
            if (error) throw error;
            
            response.message = `Query results from ${table}:\n${JSON.stringify(data, null, 2)}`;
            response.type = 'success';
          } catch (error) {
            response.message = `Error querying table ${table}: ${error.message}`;
            response.type = 'error';
          }
        }
        break;

      case 'secure':
        if (tokens.length < 2) {
          response.message = "Please specify a security protocol";
          response.type = 'error';
        } else {
          const protocol = tokens.slice(1).join(' ');
          response.message = `Security protocol "${protocol}" activated. Defensive measures online.`;
          response.type = 'success';
        }
        break;

      case 'deploy':
        if (tokens.length < 2) {
          response.message = "Please specify a node to deploy";
          response.type = 'error';
        } else {
          const nodeName = tokens.slice(1).join(' ');
          response.message = `Deployment sequence initiated for node "${nodeName}". Estimated time to completion: 3 minutes.`;
          response.type = 'success';
        }
        break;

      case 'clear':
        response.message = "[[CLEAR]]";
        response.type = 'system';
        break;

      default:
        response.message = `Unknown command: '${command}'. Type 'help' for available commands.`;
        response.type = 'error';
        break;
    }

    // Save command to history
    await supabase.from('command_history').insert({
      command: commandText,
      response: response.message,
      status: response.type
    });

    return response;
  } catch (error) {
    console.error('Error executing command:', error);
    return {
      message: `System error: ${error.message}`,
      type: 'error',
      timestamp: new Date().toISOString()
    };
  }
};
