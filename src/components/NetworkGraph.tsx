
import React, { useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useIsMobile } from '@/hooks/use-mobile';

type Node = {
  id: string;
  name: string;
  val: number;
  color: string;
  group?: string;
  layer: 'soul' | 'mind' | 'body' | 'meta';
};

type Link = {
  source: string;
  target: string;
  value: number;
  color: string;
};

type GraphData = {
  nodes: Node[];
  links: Link[];
};

type NetworkGraphProps = {
  centerNodeId?: string;
};

// MoStar Grid Agent Definitions
const MOSTAR_AGENTS = [
  // Soul Layer
  { id: 'overlord', name: 'Overlord', layer: 'soul', color: '#FFD700', size: 8 },
  { id: 'woo', name: 'Woo', layer: 'soul', color: '#FF6B35', size: 6 },
  { id: 'flameborn-writer', name: 'Flameborn Writer', layer: 'soul', color: '#FF8C42', size: 5 },
  
  // Mind Layer
  { id: 'assessor', name: 'Assessor', layer: 'mind', color: '#4CC9F0', size: 6 },
  { id: 'oracle', name: 'Oracle', layer: 'mind', color: '#4361EE', size: 6 },
  { id: 'judge', name: 'Judge', layer: 'mind', color: '#3A0CA3', size: 6 },
  { id: 'tsatse-fly', name: 'TsaTse Fly', layer: 'mind', color: '#7209B7', size: 5 },
  { id: 'deepcal-core', name: 'DeepCAL Core', layer: 'mind', color: '#4895EF', size: 7 },
  
  // Body Layer
  { id: 'executor', name: 'Executor', layer: 'body', color: '#06D6A0', size: 6 },
  { id: 'code-conduit', name: 'Code Conduit', layer: 'body', color: '#0DB39E', size: 5 },
  
  // Meta Layer
  { id: 'radx-flb', name: 'RAD-X-FLB', layer: 'meta', color: '#F72585', size: 7 },
  { id: 'phoenix', name: 'Phoenix', layer: 'meta', color: '#B5179E', size: 5 }
];

// Define core connections between agents
const CORE_CONNECTIONS = [
  // Soul Layer connections
  { source: 'overlord', target: 'woo', strength: 2 },
  { source: 'overlord', target: 'flameborn-writer', strength: 1 },
  
  // Mind Layer connections
  { source: 'assessor', target: 'judge', strength: 3 },
  { source: 'oracle', target: 'judge', strength: 2 },
  { source: 'tsatse-fly', target: 'assessor', strength: 2 },
  { source: 'deepcal-core', target: 'judge', strength: 2 },
  { source: 'deepcal-core', target: 'assessor', strength: 1 },
  
  // Body Layer connections
  { source: 'judge', target: 'executor', strength: 3 },
  { source: 'code-conduit', target: 'executor', strength: 2 },
  
  // Cross-layer connections
  { source: 'overlord', target: 'assessor', strength: 1 },
  { source: 'overlord', target: 'executor', strength: 2 },
  { source: 'woo', target: 'flameborn-writer', strength: 2 },
  { source: 'radx-flb', target: 'executor', strength: 2 },
  { source: 'radx-flb', target: 'assessor', strength: 1 },
  { source: 'phoenix', target: 'overlord', strength: 1 }
];

const generateMoStarNodes = (centerNodeId: string): Node[] => {
  const nodes: Node[] = MOSTAR_AGENTS.map(agent => ({
    id: agent.id,
    name: agent.name,
    val: agent.size,
    color: agent.color,
    layer: agent.layer,
    group: agent.layer
  }));

  // Add some random data nodes to represent global operations
  const dataNodes = Array.from({ length: 30 }, (_, i) => {
    const layers: Node['layer'][] = ['soul', 'mind', 'body', 'meta'];
    const layer = layers[Math.floor(Math.random() * layers.length)];
    const colors = {
      soul: '#FF6B35',
      mind: '#4361EE', 
      body: '#06D6A0',
      meta: '#F72585'
    };
    
    return {
      id: `data-${i}`,
      name: `Data Stream ${i + 1}`,
      val: Math.random() * 2 + 1,
      color: colors[layer] + '80', // Semi-transparent
      layer,
      group: 'data'
    };
  });

  return [...nodes, ...dataNodes];
};

const generateMoStarLinks = (nodes: Node[], centerNodeId: string): Link[] => {
  const links: Link[] = [];
  
  // Core agent connections
  CORE_CONNECTIONS.forEach(conn => {
    links.push({
      source: conn.source,
      target: conn.target,
      value: conn.strength,
      color: getConnectionColor(conn.source, conn.target, nodes)
    });
  });
  
  // Connect data nodes to random agents
  nodes.forEach(node => {
    if (node.id.startsWith('data-')) {
      // Connect to 1-3 random agents
      const agentNodes = nodes.filter(n => !n.id.startsWith('data-'));
      const numConnections = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < numConnections; i++) {
        const randomAgent = agentNodes[Math.floor(Math.random() * agentNodes.length)];
        links.push({
          source: node.id,
          target: randomAgent.id,
          value: 0.5,
          color: `${node.color}40` // Very transparent
        });
      }
    }
  });
  
  // Add some random connections between agents for network effect
  const agentNodes = nodes.filter(n => !n.id.startsWith('data-'));
  agentNodes.forEach((agent, index) => {
    if (Math.random() > 0.7) { // 30% chance for extra connections
      const otherAgents = agentNodes.filter((_, i) => i !== index);
      const randomAgent = otherAgents[Math.floor(Math.random() * otherAgents.length)];
      
      // Check if connection already exists
      const existingConnection = links.find(link => 
        (link.source === agent.id && link.target === randomAgent.id) ||
        (link.source === randomAgent.id && link.target === agent.id)
      );
      
      if (!existingConnection) {
        links.push({
          source: agent.id,
          target: randomAgent.id,
          value: 0.3,
          color: getConnectionColor(agent.id, randomAgent.id, nodes)
        });
      }
    }
  });
  
  return links;
};

const getConnectionColor = (sourceId: string, targetId: string, nodes: Node[]): string => {
  const sourceNode = nodes.find(n => n.id === sourceId);
  const targetNode = nodes.find(n => n.id === targetId);
  
  if (sourceNode && targetNode) {
    // If same layer, use layer color
    if (sourceNode.layer === targetNode.layer) {
      return sourceNode.color + '60';
    }
    // Cross-layer connections get special color
    return '#FFFFFF40';
  }
  
  return '#FFFFFF20';
};

const NetworkGraph: React.FC<NetworkGraphProps> = ({ 
  centerNodeId = 'overlord'
}) => {
  const graphRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [hoverNode, setHoverNode] = useState<Node | null>(null);
  
  useEffect(() => {
    // Generate MoStar Grid data
    const nodes = generateMoStarNodes(centerNodeId);
    const links = generateMoStarLinks(nodes, centerNodeId);
    
    setGraphData({ nodes, links });
  }, [centerNodeId]);
  
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    // Initial size
    updateDimensions();
    
    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  useEffect(() => {
    if (graphRef.current && graphData.nodes.length > 0) {
      // Center the view and zoom out to show entire network
      setTimeout(() => {
        graphRef.current.zoomToFit(400, 20);
      }, 1000);
    }
  }, [graphData]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full bg-transparent relative"
    >
      {/* Node Info Display */}
      {hoverNode && (
        <div className="absolute top-4 left-4 bg-black/80 border border-cyan-500 rounded-lg p-3 text-sm text-cyan-100 max-w-xs backdrop-blur-sm">
          <div className="font-semibold text-cyan-300">{hoverNode.name}</div>
          <div className="text-cyan-500 text-xs capitalize">{hoverNode.layer} Layer</div>
          {hoverNode.group === 'data' && (
            <div className="text-cyan-600 text-xs mt-1">Data Stream</div>
          )}
        </div>
      )}
      
      {dimensions.width > 0 && dimensions.height > 0 && (
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeRelSize={6}
          nodeVal={node => (node as Node).val}
          nodeColor={node => (node as Node).color}
          linkWidth={link => (link as Link).value}
          linkColor={link => (link as Link).color}
          cooldownTime={20000}
          enableNodeDrag={true}
          enableZoomInteraction={true}
          enablePanInteraction={true}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.1}
          warmupTicks={200}
          onEngineStop={() => {
            // Keep the simulation alive with occasional reheat
            setTimeout(() => {
              if (graphRef.current) {
                graphRef.current.d3ReheatSimulation();
              }
            }, 5000);
          }}
          onNodeHover={node => {
            setHoverNode(node as Node | null);
          }}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const { x, y, color, val, id, layer } = node as Node & { x: number, y: number };
            const time = Date.now() * 0.001;
            
            // Size adjustments
            const baseSize = val * 3;
            let size = baseSize;
            
            // Pulsing effect for active nodes
            const isActive = !id.startsWith('data-');
            if (isActive) {
              const pulseIntensity = 1 + Math.sin(time * 2) * 0.1;
              size = baseSize * pulseIntensity;
            }
            
            // Floating animation for all nodes
            const floatOffset = Math.sin(time + parseInt(id.slice(-2) || '0')) * 0.8;
            const nodeY = y + floatOffset;
            
            // Main node circle
            ctx.beginPath();
            ctx.arc(x, nodeY, size, 0, 2 * Math.PI);
            
            // Enhanced glow for agent nodes
            if (isActive) {
              ctx.shadowColor = color;
              ctx.shadowBlur = 15 + Math.sin(time * 3) * 5;
            } else {
              ctx.shadowColor = color;
              ctx.shadowBlur = 5;
            }
            
            ctx.fillStyle = color;
            ctx.fill();
            
            // Add ring around core agents
            if (isActive && !id.startsWith('data-')) {
              ctx.beginPath();
              const ringRadius = size + 4 + Math.sin(time * 2) * 2;
              ctx.arc(x, nodeY, ringRadius, 0, 2 * Math.PI);
              ctx.strokeStyle = color + '40';
              ctx.lineWidth = 1.5;
              ctx.stroke();
              
              // Inner ring for important nodes
              if (['overlord', 'deepcal-core', 'radx-flb'].includes(id)) {
                ctx.beginPath();
                const innerRingRadius = size + 2;
                ctx.arc(x, nodeY, innerRingRadius, 0, 2 * Math.PI);
                ctx.strokeStyle = color + '80';
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }
            
            // Node label for agents
            if (isActive && globalScale > 0.7) {
              ctx.font = `${Math.max(10, 12 / globalScale)}px Inter, sans-serif`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'top';
              ctx.fillStyle = '#FFFFFF';
              ctx.fillText((node as Node).name, x, nodeY + size + 5);
            }
            
            // Reset shadow
            ctx.shadowBlur = 0;
          }}
          linkCanvasObject={(link, ctx, globalScale) => {
            const { source, target, color, value } = link as Link & { 
              source: { x: number; y: number }; 
              target: { x: number; y: number } 
            };
            
            // Animated flowing effect for strong connections
            if (value > 1) {
              const time = Date.now() * 0.001;
              const pulse = Math.sin(time * 3) * 0.3 + 0.7;
              
              ctx.strokeStyle = color.replace(')', `, ${pulse})`).replace('rgba', 'rgba');
              ctx.lineWidth = value * pulse;
            } else {
              ctx.strokeStyle = color;
              ctx.lineWidth = value;
            }
            
            ctx.beginPath();
            ctx.moveTo(source.x, source.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
          }}
        />
      )}
    </div>
  );
};

export default NetworkGraph;
