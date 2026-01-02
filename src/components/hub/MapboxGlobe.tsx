import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AINode } from '@/types/ai-hub';

interface MapboxGlobeProps {
  aiNodes: AINode[];
}

const MapboxGlobe: React.FC<MapboxGlobeProps> = ({ aiNodes }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map with token from environment variable
    const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    if (!mapboxToken) {
      console.error('Mapbox access token not configured');
      return;
    }
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/akanimo1/cld9kmj9k004201qotgjwx52l',
      projection: { name: 'globe' },
      zoom: 1.5,
      center: [30, 15],
      pitch: 0,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add atmosphere and fog effects
    map.current.on('style.load', () => {
      if (!map.current) return;
      
      map.current.setFog({
        color: 'rgb(0, 20, 40)',
        'high-color': 'rgb(0, 255, 128)',
        'horizon-blend': 0.1,
        'space-color': 'rgb(0, 0, 0)',
        'star-intensity': 0.6
      });

      // Add markers for AI nodes
      const markers: mapboxgl.Marker[] = [];
      aiNodes.forEach((node, index) => {
        if (!map.current) return;
        
        // Generate coordinates based on location
        const coords = getCoordinatesForLocation(node.location);
        
        // Create custom marker element with neural pulse
        const el = document.createElement('div');
        el.className = 'relative w-4 h-4';
        el.innerHTML = `
          <div class="absolute inset-0 rounded-full animate-ping" style="background-color: ${node.status === 'Active' ? '#00ff80' : '#ff00ff'}; opacity: 0.4;"></div>
          <div class="absolute inset-0 rounded-full animate-pulse" style="background-color: ${node.status === 'Active' ? '#00ff80' : '#ff00ff'}; box-shadow: 0 0 15px ${node.status === 'Active' ? '#00ff80' : '#ff00ff'};"></div>
        `;

        // Add marker to map
        const marker = new mapboxgl.Marker(el)
          .setLngLat(coords)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div style="color: #fff; background: rgba(0,0,0,0.95); padding: 12px; border-radius: 6px; border: 1px solid ${node.status === 'Active' ? '#00ff80' : '#ff00ff'};">
                  <strong style="color: ${node.status === 'Active' ? '#00ff80' : '#ff00ff'}; font-size: 14px;">${node.name}</strong><br/>
                  <div style="margin-top: 6px; font-size: 11px;">
                    <div style="margin: 3px 0;">🔗 Status: <span style="color: ${node.status === 'Active' ? '#00ff80' : '#ff00ff'}">${node.status}</span></div>
                    <div style="margin: 3px 0;">⚡ Performance: ${node.performance}%</div>
                    <div style="margin: 3px 0;">📍 Location: ${node.location}</div>
                    <div style="margin: 3px 0;">🧠 Neural Link: Active</div>
                  </div>
                </div>
              `)
          )
          .addTo(map.current);
        
        markers.push(marker);
      });

      // Add neural link connections between nodes
      if (aiNodes.length > 1) {
        map.current.on('load', () => {
          if (!map.current) return;

          // Create neural link lines
          const linkCoordinates: [number, number][][] = [];
          for (let i = 0; i < aiNodes.length - 1; i++) {
            const start = getCoordinatesForLocation(aiNodes[i].location);
            const end = getCoordinatesForLocation(aiNodes[i + 1].location);
            linkCoordinates.push([start, end]);
          }

          // Add source for neural links
          if (!map.current.getSource('neural-links')) {
            map.current.addSource('neural-links', {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: linkCoordinates.map((coords, idx) => ({
                  type: 'Feature',
                  geometry: {
                    type: 'LineString',
                    coordinates: coords
                  },
                  properties: {
                    linkId: idx
                  }
                }))
              }
            });

            // Add neural link layer with glow effect
            map.current.addLayer({
              id: 'neural-links-glow',
              type: 'line',
              source: 'neural-links',
              paint: {
                'line-color': '#00ffff',
                'line-width': 3,
                'line-blur': 4,
                'line-opacity': 0.6
              }
            });

            map.current.addLayer({
              id: 'neural-links-core',
              type: 'line',
              source: 'neural-links',
              paint: {
                'line-color': '#00ff80',
                'line-width': 1.5,
                'line-opacity': 0.9
              }
            });
          }
        });
      }
    });

    // Rotation animation settings
    const secondsPerRevolution = 180;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;
    let userInteracting = false;
    let spinEnabled = true;

    // Spin globe function
    function spinGlobe() {
      if (!map.current) return;
      
      const zoom = map.current.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = map.current.getCenter();
        center.lng -= distancePerSecond;
        map.current.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    // Event listeners for interaction
    map.current.on('mousedown', () => {
      userInteracting = true;
    });
    
    map.current.on('dragstart', () => {
      userInteracting = true;
    });
    
    map.current.on('mouseup', () => {
      userInteracting = false;
      spinGlobe();
    });
    
    map.current.on('touchend', () => {
      userInteracting = false;
      spinGlobe();
    });

    map.current.on('moveend', () => {
      spinGlobe();
    });

    // Start the globe spinning
    spinGlobe();

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [aiNodes]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/20 rounded-lg" />
    </div>
  );
};

// Helper function to generate coordinates based on location name
function getCoordinatesForLocation(location: string): [number, number] {
  const locationMap: { [key: string]: [number, number] } = {
    'US-East': [-77, 39],
    'EU-West': [2, 48],
    'Asia-Pacific': [139, 35],
    'US-West': [-122, 37],
    'EU-Central': [13, 52],
    'South America': [-47, -23],
    'Africa': [18, -33],
    'Middle East': [51, 25],
    'Australia': [151, -33],
    'Canada': [-79, 43],
  };

  return locationMap[location] || [0, 0];
}

export default MapboxGlobe;
