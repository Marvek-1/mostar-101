export interface Guardian {
  id: string;
  name: string;
  title: string;
  domain: string;
  description: string;
  manifestation: string;
  image: string;
  color: string;
  gradient: string;
  visualVibe: string;
  products: {
    name: string;
    description: string;
    features: string[];
  }[];
  userBenefit: string;
  stats: {
    label: string;
    value: number;
  }[];
  links: {
    label: string;
    url: string;
    type: 'internal' | 'external';
  }[];
  relatedGuardians: string[];
  quote: string;
}

export const guardians: Guardian[] = [
  {
    id: 'sentinel',
    name: 'The Sentinel',
    title: 'Guardian of Protection',
    domain: 'Protection',
    description: 'The Sentinel watches your gates. She monitors suspicious activity, wallet connections, and logins. Her armor gleams with the wisdom of ages, standing firm against all threats.',
    manifestation: 'AFRO Sentinel, RAD-X surveillance, Account guardians, Risk dashboards, Threat detection',
    image: '/images/sentinel-guardian.png',
    color: 'text-purple-400',
    gradient: 'from-purple-600 to-purple-400',
    visualVibe: 'Towering figures, armor, watchful eyes, firm posture',
    products: [
      {
        name: 'Account Guardians',
        description: 'Monitor suspicious activity, wallet connections, logins.',
        features: [
          'Real-time login monitoring',
          'Wallet connection verification',
          'Suspicious activity alerts',
          'Multi-factor authentication'
        ]
      },
      {
        name: 'Risk Dashboards',
        description: 'Show threat levels, alerts on outbreaks, scams, system failures.',
        features: [
          'Color-coded threat visualization',
          'Real-time risk scoring',
          'Outbreak detection alerts',
          'System health monitoring'
        ]
      }
    ],
    userBenefit: 'This part of Mostar stands guard so you do not have to be paranoid.',
    stats: [
      { label: 'Threats Blocked', value: 2847291 },
      { label: 'Uptime %', value: 99.99 },
      { label: 'Countries', value: 47 }
    ],
    links: [
      { label: 'Security Dashboard', url: '/security', type: 'internal' },
      { label: 'Threat Map', url: '/threats', type: 'internal' },
      { label: 'AFRO Sentinel', url: '/afro', type: 'internal' }
    ],
    relatedGuardians: ['healer', 'balancer', 'rad-x'],
    quote: 'I watch so you may rest. I guard so you may thrive.'
  },
  {
    id: 'healer',
    name: 'The Healer',
    title: 'Guardian of Regeneration',
    domain: 'Health',
    description: 'When something is wrong, this artifact is where healing begins. His open palms channel flowing energy, water, and light to restore balance and health.',
    manifestation: 'Health insight modules, Disease outbreak detection, Recovery flows, Community health support',
    image: '/images/healer-guardian.png',
    color: 'text-teal-400',
    gradient: 'from-teal-500 to-cyan-400',
    visualVibe: 'Open palms, flowing energy, water, light, warmth',
    products: [
      {
        name: 'Health Insight Modules',
        description: 'For Flameborn: outbreak risk, clinic statuses, resource gaps.',
        features: [
          'Outbreak risk assessment',
          'Clinic status monitoring',
          'Resource gap analysis',
          'Community health tracking'
        ]
      },
      {
        name: 'Recovery Flows',
        description: 'Guided processes when something breaks: account support, protocol incidents, crisis responses.',
        features: [
          'Step-by-step recovery guides',
          'Crisis response protocols',
          'Account restoration',
          'Incident documentation'
        ]
      }
    ],
    userBenefit: 'When something is wrong, this artifact is where healing begins.',
    stats: [
      { label: 'Lives Saved', value: 15234 },
      { label: 'Outbreaks Detected', value: 847 },
      { label: 'Recovery Rate %', value: 97.3 }
    ],
    links: [
      { label: 'Health Dashboard', url: '/health', type: 'internal' },
      { label: 'Outbreak Map', url: '/outbreaks', type: 'internal' },
      { label: 'WHO Data', url: 'https://who.int', type: 'external' }
    ],
    relatedGuardians: ['sentinel', 'archivist', 'rad-x'],
    quote: 'From brokenness comes wholeness. From darkness, light.'
  },
  {
    id: 'archivist',
    name: 'The Archivist',
    title: 'Guardian of Knowledge',
    domain: 'Knowledge',
    description: 'This artifact tells you the story behind the data so you can choose wisely. She holds ancient scrolls and sees through the constellation of possibilities.',
    manifestation: 'Neo4j knowledge graphs, Ibibio language preservation, Ifá corpus, Explainable AI interfaces',
    image: '/images/archivist-guardian.png',
    color: 'text-indigo-400',
    gradient: 'from-indigo-600 to-blue-400',
    visualVibe: 'Scrolls, books, constellations, many eyes, quiet power',
    products: [
      {
        name: 'Knowledge Interfaces',
        description: 'Explainable AI that answers: "What is happening? Why did the system decide this?"',
        features: [
          'Decision explanation engine',
          'Knowledge graph visualization',
          'Ifá pattern interpretation',
          'Context-aware responses'
        ]
      },
      {
        name: 'Forecast Panels',
        description: 'Simulations, future scenarios, "if you do X, you will likely see Y."',
        features: [
          'Predictive modeling',
          'Scenario simulation',
          'Risk forecasting',
          'Trend analysis'
        ]
      }
    ],
    userBenefit: 'This artifact tells you the story behind the data so you can choose wisely.',
    stats: [
      { label: 'Knowledge Nodes', value: 197000 },
      { label: 'Relationships', value: 88000 },
      { label: 'Languages', value: 12 }
    ],
    links: [
      { label: 'Knowledge Graph', url: '/graph', type: 'internal' },
      { label: 'Ifá Corpus', url: '/ifa', type: 'internal' },
      { label: 'Ibibio Dictionary', url: '/ibibio', type: 'internal' }
    ],
    relatedGuardians: ['healer', 'balancer', 'tsatse'],
    quote: 'In knowledge lies power. In understanding, wisdom.'
  },
  {
    id: 'balancer',
    name: 'The Balancer',
    title: 'Guardian of Equilibrium',
    domain: 'Governance',
    description: 'This is where you decide your boundaries and how the system behaves. His scales represent the eternal balance between light and shadow, chaos and order.',
    manifestation: 'FlameBorn DAO governance, Voting UI, Privacy controls, Zero Leakage Protocol',
    image: '/images/balancer-guardian.png',
    color: 'text-amber-400',
    gradient: 'from-amber-500 to-yellow-400',
    visualVibe: 'Scales, mirrored figures, dual colors, equilibrium',
    products: [
      {
        name: 'Governance / Voting UI',
        description: 'DAO proposals, validator choices, policy changes.',
        features: [
          'Proposal creation and voting',
          'Validator selection',
          'Policy change tracking',
          'Voting power calculation'
        ]
      },
      {
        name: 'Preference & Boundary Settings',
        description: 'Privacy controls, notification filters, time limits.',
        features: [
          'Granular privacy controls',
          'Custom notification rules',
          'Usage time limits',
          'Data sharing preferences'
        ]
      }
    ],
    userBenefit: 'This is where I decide my boundaries and how the system behaves.',
    stats: [
      { label: 'DAO Votes', value: 4827 },
      { label: 'Proposals', value: 384 },
      { label: 'Participants', value: 15234 }
    ],
    links: [
      { label: 'DAO Portal', url: '/dao', type: 'internal' },
      { label: 'Governance Docs', url: '/governance', type: 'internal' },
      { label: 'FLB Token', url: '/token', type: 'internal' }
    ],
    relatedGuardians: ['sentinel', 'archivist', 'writer'],
    quote: 'In balance, there is strength. In equilibrium, peace.'
  },
  {
    id: 'flameborn',
    name: 'The Flameborn',
    title: 'Guardian of Transformation',
    domain: 'Evolution',
    description: 'This is the part of Mostar that shows you evolving. She rises like a phoenix, embodying change, metamorphosis, and the breaking of old shells.',
    manifestation: 'FLB Token mechanics, Progress visualization, Evolution tracking, Mainnet launches',
    image: '/images/flame-guardian.png',
    color: 'text-orange-400',
    gradient: 'from-orange-500 to-red-500',
    visualVibe: 'Fire, metamorphosis, breaking shells, radiance',
    products: [
      {
        name: 'Launch / Upgrade Moments',
        description: 'New feature intros, level-ups, crossing to mainnet, unlocking roles.',
        features: [
          'Feature launch celebrations',
          'Level progression system',
          'Mainnet milestone tracking',
          'Role unlock notifications'
        ]
      },
      {
        name: 'Personal Progress Visualizations',
        description: '"How far have I come?" XP-style visual for contribution, care, or learning.',
        features: [
          'XP progress tracking',
          'Contribution visualization',
          'Learning journey maps',
          'Achievement badges'
        ]
      }
    ],
    userBenefit: 'This is the part of Mostar that shows me evolving.',
    stats: [
      { label: 'FLB Holders', value: 15234 },
      { label: 'Mainnet TX', value: 847291 },
      { label: 'Upgrades', value: 47 }
    ],
    links: [
      { label: 'FlameBorn Portal', url: '/flameborn', type: 'internal' },
      { label: 'FLB Token', url: '/token', type: 'internal' },
      { label: 'Progress Tracker', url: '/progress', type: 'internal' }
    ],
    relatedGuardians: ['balancer', 'writer', 'mo'],
    quote: 'From ashes we rise. Through fire, we transform.'
  }
];

export const getGuardianById = (id: string): Guardian | undefined => {
  return guardians.find(guardian => guardian.id === id);
};

export const getRelatedGuardians = (guardian: Guardian): Guardian[] => {
  return guardians.filter(g => guardian.relatedGuardians.includes(g.id));
};
