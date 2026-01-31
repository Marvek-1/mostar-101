

## Animated 3D Landing Page with Scroll Effects

### Overview
Transform the MoStar Industries landing page into an immersive, animated 3D experience with scroll-linked animations. This will enhance the cyberpunk African AI aesthetic with cinematic scroll experiences while maintaining the existing design system.

---

### Technical Approach

**Libraries Required:**
- `@react-three/fiber@^8.18` - React Three Fiber for 3D rendering
- `@react-three/drei@^9.122.0` - Helper tools including ScrollControls
- `three@^0.166` - Three.js core library
- `framer-motion` (already installed) - For 2D scroll animations

---

### Implementation Details

#### Phase 1: 3D Hero Section with Interactive Globe

**File: `src/components/HeroSection3D.tsx`**
- Create a new 3D hero component using React Three Fiber
- Replace the canvas-based Globe with a proper 3D sphere model
- Add floating particles orbiting the globe with African continent highlight
- Implement parallax depth effect - globe moves subtly on scroll
- Stars/grid pattern in background that shifts with mouse movement

**3D Elements:**
- Animated wireframe sphere with glowing edges (mostar-cyan/mostar-blue)
- Floating data nodes connected by light beams
- African continent overlay with pulsing hotspots
- Particle system representing "Ifa patterns" (256 particles)

---

#### Phase 2: Scroll-Linked Section Animations

**File: `src/components/ScrollAnimations.tsx`**
Utility components for consistent scroll behavior:

1. **ScrollReveal** - Elements fade up and scale in when entering viewport
2. **ParallaxSection** - Layered depth effect on scroll
3. **ScrollProgress** - Progress indicators for long sections
4. **StickySection** - Pin sections during scroll for reveal effects

**Applied to existing sections:**
- `TechnologyCard` - Cards fly in sequentially with 3D rotation
- `AgentsSection` - Agent cards materialize like holograms
- `Dashboard` - Charts animate in with data flow effects
- `VisionSection` - Central hub pulses as scroll reaches it
- `GetInvolved` - Form elements slide in from sides

---

#### Phase 3: 3D Background Canvas (Full Page)

**File: `src/components/Scene3D.tsx`**
Full-page 3D canvas that sits behind all content:

- Neural network visualization floating in space
- Connects to existing `NetworkGraph.tsx` concept but in 3D
- Nodes represent AI agents, links show data flow
- Subtle rotation that responds to scroll position
- Gradient fog effect transitioning between sections

**Scroll triggers:**
- 0-25%: Network contracts toward center
- 25-50%: Expands and highlights tech nodes
- 50-75%: Agent nodes pulse active
- 75-100%: Converges toward CTA

---

#### Phase 4: Section-Specific 3D Elements

**Technologies Section:**
- Floating 3D icons that rotate on hover
- Cards emerge from a central nexus point
- Light beams connect related technologies

**Agents Section:**
- Holographic agent portraits
- Orbital rings showing agent relationships
- Glow effects matching agent color schemes

**Dashboard Section:**
- 3D data visualization cubes
- Charts that have depth and perspective
- Floating metrics that parallax on scroll

---

#### Phase 5: Smooth Scroll Implementation

**File: `src/components/SmoothScroll.tsx`**
Wrapper component using Framer Motion:

```text
Features:
- Momentum-based smooth scrolling
- Scroll snap points for each section
- Mobile touch optimization
- Scroll progress indicator (vertical bar on side)
- Section navigation dots
```

---

### File Changes Summary

| Action | File | Description |
|--------|------|-------------|
| Create | `src/components/HeroSection3D.tsx` | New 3D hero with interactive globe |
| Create | `src/components/Scene3D.tsx` | Full-page 3D background canvas |
| Create | `src/components/ScrollAnimations.tsx` | Scroll reveal utilities |
| Create | `src/components/SmoothScroll.tsx` | Smooth scroll wrapper |
| Create | `src/components/FloatingIcons3D.tsx` | 3D technology icons |
| Modify | `src/pages/Index.tsx` | Integrate 3D components and scroll wrapper |
| Modify | `src/components/TechnologyCard.tsx` | Add scroll reveal animations |
| Modify | `src/components/AgentsSection.tsx` | Add holographic effects |
| Modify | `src/components/VisionSection.tsx` | Add parallax and 3D hub |
| Modify | `src/components/Dashboard.tsx` | Add 3D chart effects |
| Modify | `src/index.css` | Add 3D-specific animations and effects |

---

### New Dependencies

```text
@react-three/fiber@^8.18
@react-three/drei@^9.122.0  
three@^0.166
```

---

### Performance Considerations

- Lazy load 3D components to prevent initial load delay
- Use `Suspense` with loading fallbacks matching current loading screen
- Implement level-of-detail for mobile devices
- Canvas will pause when not visible (tab switching)
- Particle count reduced on mobile (256 to 64)

---

### Theme Integration

All 3D elements will use the existing color palette:
- `mostar-dark` (#0A0E17) - Background
- `mostar-blue` (#0039e6) - Primary accents
- `mostar-light-blue` (#00a2ff) - Glows and highlights
- `mostar-cyan` (#00ffff) - Active/hover states
- `mostar-purple` (#6b46c1) - Secondary accents
- `mostar-magenta` (#f81ce5) - Emphasis

Glassmorphism and cyber-grid patterns will be maintained as overlays on 3D scenes.

---

### Mobile Responsiveness

- 3D canvas reduces complexity on mobile (fewer particles, simpler geometry)
- Touch gestures for globe interaction
- Scroll animations adjust timing for touch scrolling
- Fallback to enhanced 2D animations if WebGL unavailable

