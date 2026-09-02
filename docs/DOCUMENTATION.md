# MoStar Industries — Complete Application Documentation

**Version:** 3.1.0  
**Codename:** MoGrid Sovereign  
**Last Updated:** January 2026

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Overview](#architecture-overview)
3. [Core Features](#core-features)
4. [Pages & Routes](#pages--routes)
5. [Components Reference](#components-reference)
6. [AI Agents](#ai-agents)
7. [Backend Services](#backend-services)
8. [Authentication System](#authentication-system)
9. [Database Schema](#database-schema)
10. [Edge Functions](#edge-functions)
11. [Design System](#design-system)
12. [Deployment](#deployment)

---

## Executive Summary

MoStar Industries is a cutting-edge African health sovereignty platform powered by AI systems rooted in **Ifa computational logic** — 256 patterns of ancestral mathematics powering modern disease intelligence. The application serves as a command center for the MoStar Grid, a global intelligence network of nine specialized AI agents.

### Mission
To revolutionize African health infrastructure through coordinated artificial intelligence, providing real-time threat detection, automated diagnosis, and intelligent decision-making at scale.

### Core Philosophy
> "Truth is the flame. Transparency the wick. Humanity the hand that holds the light."
> — Doctrine of the Clear Flame, v2.0

---

## Architecture Overview

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18 + TypeScript + Vite | Core UI framework |
| **Styling** | Tailwind CSS + Custom Design System | Cyberpunk aesthetic |
| **State Management** | TanStack Query (React Query) | Server state & caching |
| **Routing** | React Router v6 | Navigation |
| **Visualization** | Recharts + Mapbox GL | Charts & globe |
| **Backend** | Lovable Cloud (Supabase) | Database, Auth, Edge Functions |
| **AI Gateway** | Google Gemini 2.5 Flash | Chatbot intelligence |
| **External APIs** | FastAPI (Executor/Assessor/Judge) | MoGrid Core services |

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    MOSTAR GRID ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   Frontend   │───▶│ Edge Funcs   │───▶│  FastAPI     │      │
│  │  (React 18)  │    │  (Deno)      │    │  (External)  │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│         │                   │                   │               │
│         ▼                   ▼                   ▼               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   Supabase   │◀──▶│   NeonDB     │◀──▶│   Neo4j      │      │
│  │   (Cloud)    │    │  (External)  │    │  (Memory)    │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    AI AGENT LAYER                          │ │
│  │  Overlord │ Assessor │ Judge │ Oracle │ Executor │ Woo    │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Core Features

### 1. Global Intelligence Dashboard
Real-time monitoring of the MoStar Grid with live telemetry from all AI agents.

**Metrics Displayed:**
- Active AI Nodes (5,270+)
- Grid Coherence (98.7%)
- Clean Records (97.5%)
- Active Verdicts
- Ollama Uptime
- DCX1/DCX2 Status
- Neo4j Connection Status

### 2. AI Hub (Protected Route)
Command center for authenticated operators with five main tabs:
- **Overview**: System health, activity feed, AI node status
- **Network**: Neural link status, Mapbox globe visualization
- **Security**: Threat monitoring, security events
- **Analytics**: Performance graphs, trend analysis
- **Command**: Terminal interface for direct grid commands

### 3. Woo Chatbot
AI-powered conversational interface with:
- Voice input (Web Speech API)
- Streaming responses
- Session-based context
- Authentication-aware interactions

### 4. Technology Showcase
Grid systems powered by African computational logic:
- Ifa Computational Core (256 binary patterns)
- RAD-X Disease Intelligence
- FlameBorn Health Education
- WHO Signal Intelligence
- MNTRK Colony Detection
- Woo Interpreter (Ethical adjudication)

### 5. News Carousel
Auto-playing carousel with latest updates, products, and innovations.

---

## Pages & Routes

| Route | Component | Protection | Description |
|-------|-----------|------------|-------------|
| `/` | `Index.tsx` | Public | Landing page with all sections |
| `/auth` | `Auth.tsx` | Public | Sign in / Sign up |
| `/hub` | `MostarHub.tsx` | **Protected** | AI Hub command center |
| `/technologies` | `Technologies.tsx` | Public | Technology details |
| `*` | `NotFound.tsx` | Public | 404 page |

---

## Components Reference

### Layout Components

#### `Navbar.tsx`
Responsive navigation with:
- Logo and brand
- Desktop navigation links
- Mobile hamburger menu
- User dropdown (when authenticated)
- Sign out functionality

**Props:** None (uses `useAuth` hook)

#### `Footer.tsx`
Site footer with:
- Company info and description
- Social media links (Twitter, LinkedIn, GitHub, Discord)
- Solutions links
- Company links
- Copyright and version info

### Page Sections

#### `HeroSection.tsx`
Landing hero with:
- Animated background (cyber grid, glowing orbs)
- "Enter the Grid" CTA button
- Statistics display (Health Records, Ifa Patterns, Grid Agents, WHO Data Sheets)
- Scroll indicator

#### `AgentsSection.tsx`
Displays the six main Grid agents with their roles and soulprints:
- RAD-X-FLB (Disease Intelligence)
- TsaTse (Vector Surveillance)
- Code Conduit (Technical Integration)
- Flameborn Writer (Health Education)
- Woo (Ethical Interpreter)
- Mo (Grid Orchestrator)

#### `Dashboard.tsx`
Live analytics dashboard with:
- Real-time metrics (nodes, coherence, verdicts, uptime)
- Area chart (Active AI Nodes)
- Bar chart (Ethical Verdicts)
- Line charts (Doctrine Updates, System Health)
- DCX1/DCX2/Neo4j status indicators
- WebSocket subscriptions for live updates

#### `VisionSection.tsx`
Company philosophy and ecosystem:
- Central AI hub visualization
- Five ecosystem items (Security, Intelligence, Monitoring, Processing, Networks)
- Strategic partners display

#### `GetInvolved.tsx`
Call-to-action section with:
- Four audience types (Health Workers, Developers, Data Partners, Community Leaders)
- Email registration form
- Audience type selection

#### `NewsCarousel.tsx`
Auto-playing news carousel with:
- Image cards with badges
- Category and date display
- Pagination dots
- Navigation arrows

### Interactive Components

#### `ChatBot.tsx`
Floating AI chatbot with:
- **States:** Open, Hovered, Locked, Closed
- **Features:**
  - Voice input via Web Speech API
  - Text input
  - Streaming AI responses
  - Conversation history
  - Auto-scroll to latest message
  - Authentication-required modal for guests
- **Edge Function:** `mostar-chat`

#### `TechnologyCard.tsx`
Card component for technology display:
- Icon, title, description
- Feature list with bullets
- Color-coded variants

#### `NetworkGraph.tsx`
Background particle network animation.

#### `Globe.tsx`
3D globe component for global visualization.

### Hub Components

#### `HubTabs.tsx`
Tab navigation for AI Hub:
- Overview, Network, Security, Analytics, Command

#### `LoadingOverlay.tsx`
Full-screen loading animation for Hub.

#### `MusicPlayer.tsx`
Ambient music player for Hub experience.

#### `MapboxGlobe.tsx`
Mapbox GL globe with AI node markers.

#### `NeuralLinkStatus.tsx`
Neural network connection status display.

### Hub Tab Contents

#### `OverviewTab.tsx`
- Performance chart
- Security events chart
- AI systems load chart
- Activity feed
- AI nodes list

#### `NetworkTab.tsx`
- NeuralLinkStatus component
- MapboxGlobe visualization
- AI nodes grid

#### `SecurityTab.tsx`
- Security events bar chart
- Threat monitoring

#### `AnalyticsTab.tsx`
- Performance line chart
- Grid harmony metrics

#### `CommandTab.tsx`
Terminal interface with commands:
- `help` - Command registry
- `status` - System status
- `diagnose [loc] [symptoms...]` - Run MoGrid diagnosis
- `analyze [data]` - Omni-Neuro analysis
- `secure [protocol]` - Security activation
- `deploy [node]` - Deploy AI node
- `clear` - Clear terminal

### Protected Components

#### `ProtectedRoute.tsx`
Route guard that:
- Shows loading state during auth check
- Redirects to `/auth` if not authenticated
- Renders children if authenticated

---

## AI Agents

### The Nine MoStar AI Agents

| Agent | Role | Function |
|-------|------|----------|
| **Overlord** | System Core | Central orchestration, resource allocation |
| **Assessor** | Signal Analysis | Pattern recognition, ODU calculation |
| **Oracle** | Doctrine Layer | Historical data, policy recommendations |
| **Judge** | Verdict Engine | Decision validation, confidence scoring |
| **Executor** | Action Layer | Task execution, response coordination |
| **Code Conduit** | Development | Code review, deployment automation |
| **RAD-X-FLB** | Emergency Response | Rapid assessment, emergency protocols |
| **TsaTse Fly** | Surveillance | 24/7 monitoring, anomaly alerts |
| **Woo** | Communication | NLP, user guidance, interface |

### ODU (Operational Disruption Unit)

Severity metric quantifying impact:

| Range | Severity | Action |
|-------|----------|--------|
| 0-25 | Minimal | Routine monitoring |
| 26-50 | Low | Watchlist status |
| 51-75 | Moderate | Investigation required |
| 76-100 | High | Immediate attention |
| 100+ | Critical | All-hands response |

---

## Backend Services

### Service Layer (`src/services/`)

#### `gridService.ts`
```typescript
// Send signal for diagnosis
sendSignal(signal: Signal): Promise<FinalDecision>

// Fetch recent grid signals
fetchGridSignals(): Promise<GridSignal[]>

// Fetch recent grid decisions
fetchGridDecisions(): Promise<GridDecision[]>
```

#### `gridTelemetryService.ts`
```typescript
// Fetch grid telemetry data
fetchGridTelemetry(): Promise<GridTelemetry>

// Subscribe to live telemetry updates
subscribeToGridTelemetry(callback): UnsubscribeFn
```

#### `aiNodeService.ts`
```typescript
// Fetch AI nodes for hub display
fetchAINodes(): Promise<AINode[]>
```

---

## Authentication System

### Provider
Lovable Cloud (Supabase Auth)

### Methods
1. **Email/Password** - Standard signup/login
2. **Google OAuth** - SSO via Google

### Auth Context (`src/contexts/AuthContext.tsx`)

```typescript
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp(email, password): Promise<{ error }>
  signIn(email, password): Promise<{ error }>
  signInWithGoogle(): Promise<{ error }>
  signOut(): Promise<void>
}
```

### Protected Routes
- `/hub` - AI Hub (requires authentication)

### Profile Management
Profiles are auto-created via database trigger on signup:

```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
```

---

## Database Schema

### Tables

#### `profiles`
User profile data linked to auth.users.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (matches auth.users.id) |
| email | TEXT | User email |
| display_name | TEXT | Display name |
| avatar_url | TEXT | Avatar URL |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update |

**RLS Policies:**
- Users can view all profiles (authenticated)
- Users can insert/update their own profile

#### `grid_signals` (via Edge Function)
Stores signal data from MoGrid diagnostics.

#### `ai_memory` (via ChatBot)
Stores chat interactions for AI learning.

---

## Edge Functions

### `mostar-chat/index.ts`
AI chat endpoint using Lovable AI Gateway.

**Endpoint:** `POST /functions/v1/mostar-chat`

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "Hello Woo" }
  ]
}
```

**Response:** SSE streaming with OpenAI-compatible format

**Features:**
- Zod input validation
- MOSTAR_KNOWLEDGE system prompt
- Streaming responses
- Error handling with request IDs
- Rate limiting (429)
- Usage limiting (402)

### `signal/index.ts`
Grid signal processing endpoint.

**Endpoint:** `POST /functions/v1/signal`

**Request:**
```json
{
  "location": "Grid-7",
  "symptoms": ["fever", "headache"],
  "evidence": []
}
```

**Response:**
```json
{
  "status": "completed",
  "location": "Grid-7",
  "root_cause": "...",
  "odu": 45,
  "confidence": 0.87,
  "recommended_action": "...",
  "assessor_hash": "...",
  "decision_hash": "..."
}
```

**Flow:**
1. Validate input with Zod
2. Forward to FastAPI Executor
3. Store result in `grid_signals` table
4. Return decision to client

### `diagnose/index.ts`
Direct Assessor endpoint.

### `evaluate/index.ts`
Direct Judge endpoint.

---

## Design System

### Color Palette (HSL)

| Token | Value | Usage |
|-------|-------|-------|
| `--mostar-dark` | 222 47% 8% | Background |
| `--mostar-dark-blue` | 222 47% 12% | Cards |
| `--mostar-blue` | 210 100% 40% | Primary |
| `--mostar-light-blue` | 199 89% 60% | Primary light |
| `--mostar-cyan` | 180 100% 50% | Accent |
| `--mostar-green` | 150 100% 50% | Success |
| `--mostar-magenta` | 300 100% 60% | Warning |
| `--mostar-purple` | 280 100% 60% | Secondary |
| `--mostar-yellow` | 60 100% 50% | Alert |

### Typography

- **Display Font:** Custom display font (`font-display`)
- **Mono Font:** Monospace for terminal/code (`font-mono`)

### Effects

| Class | Effect |
|-------|--------|
| `glassmorphism` | Frosted glass effect |
| `shadow-neon-blue` | Blue glow shadow |
| `text-glow-blue` | Blue text glow |
| `bg-cyber-grid` | Cyber grid pattern |
| `animate-pulse` | Pulsing animation |
| `animate-rotate-slow` | Slow rotation |

### Components (shadcn/ui)
Full component library including:
- Button, Input, Label
- Card, Dialog, Sheet
- Tabs, Accordion
- Toast, Sonner
- Carousel, Badge
- And 50+ more...

---

## Deployment

### Platforms

| Service | Purpose |
|---------|---------|
| **Lovable Cloud** | Frontend hosting, Edge Functions, Database |
| **Vercel** | Alternative frontend deployment |
| **External FastAPI** | MoGrid Core (Assessor, Judge, Executor) |
| **Cloudflare Tunnel** | Ollama AI model exposure |

### Environment Variables

```env
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=[anon-key]
VITE_SUPABASE_PROJECT_ID=[project-id]
```

### Edge Function Secrets

| Secret | Purpose |
|--------|---------|
| `LOVABLE_API_KEY` | AI Gateway authentication |
| `EXECUTOR_URL` | FastAPI Executor endpoint |
| `OLLAMA_BASE_URL` | Ollama model endpoint |

### URLs

| Environment | URL |
|-------------|-----|
| Preview | https://id-preview--[id].lovable.app |
| Production | https://mostar-101.lovable.app |

---

## API Reference

### External FastAPI Endpoints

| Service | Endpoint | Description |
|---------|----------|-------------|
| Assessor | `/diagnose` | Analyze signals, calculate ODU |
| Judge | `/evaluate` | Validate findings, assign confidence |
| Executor | `/signal` | Orchestrate full diagnosis flow |

### Signal Processing Flow

```
1. User Input → Executor /signal
2. Executor → Assessor /diagnose
3. Assessor → Returns ODU + analysis
4. Executor → Judge /evaluate
5. Judge → Returns verdict + confidence
6. Executor → Returns FinalDecision
7. Result stored in grid_signals
```

---

## Support & Contact

For technical support, integration inquiries, or partnership opportunities, access the **MoStar Intelligence Hub** at `/hub`.

---

*This documentation is maintained by the MoStar Grid and updated with each release.*

**© 2026 MoStar Industries. All rights reserved.**
