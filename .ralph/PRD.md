# PRD: SlopGPT Meme-Native Redesign

## Overview

Transform SlopGPT from generic AI SaaS aesthetic to **meme-native, internet-culture-first design**. The site should feel like it was made by someone terminally online, for people who are terminally online.

**Reference**: Duolingo's unhinged TikTok presence, anti-corporate Gen-Z humor, "brain rot" aesthetics, self-aware irony.

---

## Success Criteria

- [ ] Site no longer looks like every other AI startup
- [ ] Visitors immediately understand the vibe within 3 seconds
- [ ] At least 3 elements that are screenshot/share-worthy
- [ ] Mascot is recognizable and memeable
- [ ] Copy and visuals are aligned in tone
- [ ] AI Slop Score drops from 38 to under 15

---

## The Slop Blob Mascot

### Concept
An amorphous, dripping AI blob with mismatched googly eyes. Chaotic but friendly. Slightly unhinged energy. The visual embodiment of "slop."

### Design Specs
- **Colors**: Orange (#FF6B35) → Magenta (#FF00FF) → Radioactive Green (#00FF9F) gradient
- **Shape**: Organic blob with SVG goo filter, dripping appendages
- **Eyes**: Asymmetrical googly eyes, pupils looking slightly different directions
- **Expressions**: Default, Thinking, Excited, Error, Sneaky (see expression sheet)

### Files Created
- `/public/mascot/slop-blob-concept.svg` - Main mascot
- `/public/mascot/slop-blob-expressions.svg` - Expression sheet (5 variants)

### Usage
- [ ] Logo: Replace text-only logo with Blob + "SlopGPT" wordmark
- [ ] Hero: Blob appears in corner, subtly animated (wobble)
- [ ] Loading states: Blob with "Thinking" expression
- [ ] Error states: Blob with "Error" expression (X eyes)
- [ ] Chat interface: Blob as AI avatar
- [ ] 404 page: Blob looking confused
- [ ] Cursor follower: Small blob follows cursor (optional chaos mode)

---

## Typography Overhaul

### Kill List
- [x] ~~Inter~~ (most generic AI font)
- [x] ~~Space Grotesk~~ (still too safe)
- [x] ~~All gray text~~ (burn it)

### New Font Stack

| Element | Font | Google Fonts Link | Why |
|---------|------|-------------------|-----|
| **Display (H1-H3)** | Bricolage Grotesque | `Bricolage+Grotesque:wght@600;700;800` | Chunky, weird, personality |
| **Body** | Outfit | `Outfit:wght@400;500;600` | Readable but not boring |
| **Accent/Meme** | Shantell Sans | `Shantell+Sans:wght@500;700` | Handwritten, DIY energy |
| **Impact moments** | Impact (system) | N/A | The meme font, used ironically |

### Implementation
- [x] Update `index.html` Google Fonts import
- [x] Update `tailwind.config.js` fontFamily
- [x] Update `src/index.css` root font-family
- [x] Apply `font-display` to all headings
- [x] Use `font-accent` for badges, labels, fun callouts

---

## Color Palette Overhaul

### Kill List
- [ ] All grays except #0D0D0D (true black)
- [ ] Safe, muted tones
- [ ] The corporate warmth

### New Palette

```javascript
// tailwind.config.js
colors: {
  // Primary - Hot orange (not tech blue)
  'slop': {
    DEFAULT: '#FF6B35',
    light: '#FF8A5B',
    dark: '#E55A2B',
  },
  // Secondary - Radioactive green
  'chaos': {
    DEFAULT: '#00FF9F',
    light: '#5AFFBE',
    dark: '#00CC7F',
  },
  // Accent - Magenta (chaos incarnate)
  'unhinged': {
    DEFAULT: '#FF00FF',
    light: '#FF66FF',
    dark: '#CC00CC',
  },
  // Background - True black
  'void': {
    DEFAULT: '#0D0D0D',
    light: '#1A1A1A',
    lighter: '#2D2D2D',
  },
  // Text - Warm white
  'cream': {
    DEFAULT: '#FFFEF0',
    muted: '#FFFEF0CC',
  },
  // Danger - Actual red
  'error': '#FF0000',
}
```

### Implementation
- [x] Update `tailwind.config.js` with new colors
- [x] Update `src/index.css` CSS variables
- [x] Replace all gray usages in `App.tsx`
- [x] Update component backgrounds to void/black
- [x] Update text to cream/warm white

---

## Layout Destruction

### Current (Boring)
```
Hero (centered)
  ↓
Features (3-column grid)
  ↓
Examples (2-column grid)
  ↓
CTA (centered)
  ↓
Footer
```

### New (Chaos)
```
Hero (asymmetric, blob in corner, text at slight angle)
  ↓
Marquee (scrolling user-generated slop examples)
  ↓
"What is Slop?" (meme format explanation - Drake meme style)
  ↓
Live Examples Gallery (masonry, overlapping, auto-playing)
  ↓
Features (scattered cards, not grid, blob peeking)
  ↓
FAQ (accordion with unhinged microcopy)
  ↓
CTA (blob front and center, "Let's get weird" button)
  ↓
Footer (minimal, self-aware "© 2026 or whatever")
```

### Specific Changes

#### Hero Section
- [x] Remove centered layout
- [x] Add Blob mascot to right side (40% of hero)
- [x] Tilt headline slightly (-2deg rotation)
- [x] Add glitch/static effect on hover
- [x] Change background to void black with noise texture
- [x] Add floating emoji/sparkles (subtle chaos)

#### Marquee Section (NEW)
- [x] Add horizontal scrolling marquee
- [x] Content: Example prompts users have asked
- [x] Infinite scroll, pausable on hover
- [x] Style: Handwritten font, colorful tags

#### Meme Explanation Section (NEW)
- [x] Drake meme format (or similar)
- [x] Left: "Boring AI that takes itself seriously" ❌
- [x] Right: "AI that embraces the chaos" ✓
- [x] Or: Before/After format

#### Gallery Section
- [x] Replace carousel with masonry grid
- [x] Overlapping cards with rotation (-3deg to +3deg random)
- [x] Hover: Card pops forward, blob "Excited" expression appears
- [x] Add video examples (GIFs at minimum)
- [x] Each card has category tag in Shantell Sans

#### Features Section
- [ ] Remove 3-column grid
- [ ] Scatter cards at different heights
- [ ] Add blob peeking from behind one card
- [ ] Cards have slight rotations
- [ ] On hover: Card shakes slightly

#### CTA Section
- [x] Blob as main visual (large, centered)
- [x] Button text: "Let's get weird" or "Unleash the slop"
- [x] Add confetti on button hover
- [x] Background: Gradient void with floating particles

---

## Animation Overhaul

### Kill List
- [ ] Smooth ease-in-out (too corporate)
- [ ] Subtle fades (boring)
- [ ] Professional transitions

### New Animation Style

```javascript
// Bouncy, chaotic springs
const chaosSpring = {
  type: 'spring',
  stiffness: 500,
  damping: 15,
  mass: 1
}

// Wobbly entrance
const wobbleIn = {
  initial: { opacity: 0, scale: 0.8, rotate: -5 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  transition: chaosSpring
}

// Shake on hover
const shake = {
  whileHover: {
    rotate: [-1, 1, -1, 1, 0],
    transition: { duration: 0.3 }
  }
}
```

### Specific Animations
- [x] Blob: Constant subtle wobble (CSS keyframes)
- [x] Cards: Bounce in with stagger
- [x] Buttons: Scale + slight rotate on hover
- [x] Page transitions: Glitch effect
- [x] Loading: Blob "Thinking" with bouncing dots
- [x] Scroll: Parallax on blob, cards slide in from sides

---

## Microcopy Overhaul

### Loading States
| Current | Meme-Native |
|---------|-------------|
| "Loading..." | "Summoning the slop..." |
| "Processing..." | "The blob is thinking..." |
| "Please wait" | "Consulting the chaos council..." |

### Error States
| Current | Meme-Native |
|---------|-------------|
| "Something went wrong" | "oops. the blob broke something." |
| "Error" | "skill issue (ours, not yours)" |
| "Try again" | "try again (the blob promises to behave)" |

### Empty States
| Current | Meme-Native |
|---------|-------------|
| "No results" | "the void is empty. for now." |
| "Nothing here" | "nothing here yet. touch grass?" |

### Button Text
| Current | Meme-Native |
|---------|-------------|
| "Get Started" | "let's get weird" |
| "Learn More" | "explain like I'm 5" |
| "Contact Us" | "yell into the void" |
| "Submit" | "send it" |

### Implementation
- [x] Create `microcopy.ts` constants file
- [x] Update all loading states
- [x] Update all error states
- [x] Update all button text
- [x] Add random rotation to fun copy elements
- [x] Implement microcopy across App.tsx and Chat.tsx

---

## New Components Needed

### 1. SlopBlob Component
```typescript
// src/components/SlopBlob.tsx
interface SlopBlobProps {
  expression: 'default' | 'thinking' | 'excited' | 'error' | 'sneaky'
  size: 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
  followCursor?: boolean
}
```
- [ ] Create component
- [ ] Import SVG expressions
- [ ] Add wobble animation
- [ ] Add cursor follow option

### 2. Marquee Component
```typescript
// src/components/Marquee.tsx
interface MarqueeProps {
  items: string[]
  speed?: number
  pauseOnHover?: boolean
}
```
- [ ] Create infinite scroll marquee
- [ ] Style with handwritten font
- [ ] Add pause on hover

### 3. MemeCard Component
```typescript
// src/components/MemeCard.tsx
interface MemeCardProps {
  type: 'drake' | 'before-after' | 'expanding-brain'
  panels: { image?: string, text: string, good?: boolean }[]
}
```
- [ ] Create meme format component
- [ ] Drake format for "What is Slop?"

### 4. ChaosButton Component
```typescript
// src/components/ChaosButton.tsx
interface ChaosButtonProps {
  children: React.ReactNode
  variant: 'primary' | 'secondary' | 'chaos'
  confetti?: boolean
}
```
- [ ] Create button with shake hover
- [ ] Add confetti option
- [ ] Bouncy click feedback

### 5. GlitchText Component
```typescript
// src/components/GlitchText.tsx
interface GlitchTextProps {
  children: string
  intensity?: 'subtle' | 'medium' | 'chaos'
}
```
- [ ] Create CSS glitch effect
- [ ] Trigger on hover or scroll

---

## File Changes Summary

### Modify
- [ ] `index.html` - New fonts, meta theme color
- [ ] `tailwind.config.js` - New colors, fonts, animations
- [ ] `src/index.css` - New CSS variables, base styles
- [ ] `src/App.tsx` - Complete layout overhaul

### Create
- [ ] `src/components/SlopBlob.tsx`
- [ ] `src/components/Marquee.tsx`
- [ ] `src/components/MemeCard.tsx`
- [ ] `src/components/ChaosButton.tsx`
- [ ] `src/components/GlitchText.tsx`
- [ ] `src/constants/microcopy.ts`
- [ ] `public/mascot/` - Already created

### Assets Needed
- [ ] 10+ example AI-generated images
- [ ] 2-3 video/GIF examples
- [ ] Noise texture for backgrounds
- [ ] Glitch effect sprites (optional)

---

## Implementation Order

### Phase 1: Foundation (Do First)
1. [x] Update color palette
2. [x] Update typography
3. [x] Create SlopBlob component
4. [x] Update background to dark mode

### Phase 2: Layout (Do Second)
5. [x] Rebuild Hero with blob + asymmetric layout
6. [x] Add Marquee section
7. [x] Convert features to scattered layout
8. [x] Rebuild CTA with blob

### Phase 3: Polish (Do Third)
9. [x] Add animations (wobble, bounce, shake)
10. [x] Implement microcopy
11. [ ] Add meme explanation section
12. [ ] Add gallery with real images

### Phase 4: Chaos Mode (Optional)
13. [ ] Cursor following blob
14. [ ] Confetti on CTA
15. [ ] Glitch effects
16. [ ] Easter eggs

---

## Verification

After implementation, re-run AI Slop detection:

```bash
# Target scores:
# - Inter usage: 0 (currently 15)
# - Gray palette: 0 (currently 10)
# - Cookie-cutter layout: 0 (currently 10)
# - 3-column grid: 0 (currently 8)
# - Unique elements: +20 (currently 0)
# - Target total: < 15 (currently 38)
```

---

## References

- [Gen Z Web Design - NATIV3](https://retro.nativ3.io/l/gen-z-web-design/)
- [Designing for Gen Z - Toptal](https://www.toptal.com/designers/brand/gen-z-design)
- [2026 Web Design Trends - Squarespace](https://www.squarespace.com/blog/web-design-trends)
- [Brain Rot Aesthetic - Medium](https://medium.com/@WebdesignerDepot/7-real-predictions-for-web-design-in-2026-c808a2e0bd18)
- Duolingo TikTok (the gold standard)

---

---

# PHASE 5: COMPREHENSIVE OVERHAUL (January 2026)

## Audit Summary

| Area | Grade | Critical Issue |
|------|-------|----------------|
| Brand/Logo | B+ | Asset inconsistency, "SLLOP" typo |
| UX/Interactions | B+ | Missing mobile nav, modal focus trap |
| Visual Design | B+ | Showcase images don't match descriptions |
| Performance | C | LCP 4.4s (target <2.5s) |
| Copy/Content | B- | Value proposition unclear |
| SEO | B- | Missing robots.txt, sitemap |

---

## P0: Critical Fixes (This Week)

### Value Proposition Clarity
- [ ] Rewrite hero subtext: "AI photo booth for events. Chat to design your theme. We generate the photos."
- [ ] Add 3-4 step "How It Works" section below hero
- [ ] Move "What is Slop?" section above gallery (it's the value prop)
- [ ] Update CTA button hover text to clarify action

### LCP Performance (Target: <2.5s)
- [ ] Remove unused fonts: Boogaloo, Shantell Sans (keep Bricolage + Outfit + DM Sans)
- [ ] Self-host critical fonts instead of Google Fonts CDN
- [ ] Add `font-display: optional` to non-critical fonts
- [ ] Inline critical CSS for hero (extract ~5KB above-fold styles)
- [ ] Implement code splitting: `React.lazy()` for below-fold sections
- [ ] Remove 59KB unused JavaScript from bundle

### Showcase Images (Match Content to Titles)
- [ ] DELETE: `/public/logo/slop-generated.png` (has "SLLOP" typo)
- [ ] REPLACE: medieval-tech.webp → knight explaining computer (not castle)
- [ ] REPLACE: ikea-apocalypse.webp → furniture fortress (not coffee equipment)
- [ ] REPLACE: 90s-nostalgia.webp → actual 90s items (not esports gamer)
- [ ] ENSURE: Consistent illustration style across all 6 showcase images

### SEO Infrastructure
- [ ] CREATE: `/public/robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://slopgpt.com/sitemap.xml
```
- [ ] CREATE: `/public/sitemap.xml` with routes (/, /chat)
- [ ] REPLACE: og-image.svg → og-image.png (compressed <300KB)
- [ ] ADD: `<link rel="canonical" href="https://slopgpt.com/" />`
- [ ] ADD: JSON-LD WebApplication structured data

---

## P1: Trust Building (Next Sprint)

### Social Proof
- [ ] Design TestimonialCard component
- [ ] Add section with 3-5 real testimonials (need to gather)
- [ ] Add client logos grid (if applicable)
- [ ] Add stats: "X events powered", "Y photos generated"

### Mobile Navigation
- [ ] Create MobileNav component with hamburger
- [ ] Items: Features, Examples, Get Started
- [ ] Focus trap + escape key handling
- [ ] Smooth slide animation

### Demo Enhancement
- [ ] Show photo generation in demo (not just text chat)
- [ ] Add disabled state styling to demo input
- [ ] Consider interactive mini-demo

---

## P2: Code Quality

### Component Extraction (App.tsx is 1095 lines)
- [ ] Extract: HeroSection.tsx
- [ ] Extract: WhatIsSlop.tsx
- [ ] Extract: ShowcaseGallery.tsx
- [ ] Extract: DemoChat.tsx
- [ ] Extract: Features.tsx
- [ ] Extract: Examples.tsx
- [ ] Extract: FinalCTA.tsx

### Asset Cleanup
- [ ] Remove duplicate logo files
- [ ] Update SlopLogo.tsx to use SVG (better scaling)
- [ ] Remove unused PNG variants

### Accessibility Polish
- [ ] Add focus trap to lead capture modal
- [ ] Add `aria-label` to interactive blob
- [ ] Add keyboard handlers to marquee
- [ ] Screen reader testing

---

## Verification Commands

```bash
# LCP Check
npx lighthouse https://slopgpt.com --only-categories=performance --output=json

# SEO Check
curl -s https://slopgpt.com/robots.txt && curl -s https://slopgpt.com/sitemap.xml

# Bundle Analysis
cd ~/slopgpt-landing && npm run build && npx source-map-explorer dist/assets/*.js

# Full Audit
npx lighthouse https://slopgpt.com --output=html --output-path=./audit.html
```

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| LCP | 4.4s | <2.5s |
| Lighthouse Performance | 76 | 90+ |
| Lighthouse SEO | 72 | 95+ |
| Social Proof Items | 0 | 3+ |
| Value Prop Clarity | Unclear | 5-second test pass |

---

## Sources

- [web.dev LCP Optimization](https://web.dev/articles/optimize-lcp)
- [Leadfeeder Landing Page Best Practices 2026](https://www.leadfeeder.com/blog/landing-pages-convert/)
- [DebugBear Font Preloading](https://www.debugbear.com/blog/preload-web-fonts)
- [Unbounce Landing Page Best Practices](https://unbounce.com/landing-page-articles/landing-page-best-practices/)

---

## Sign-off

**Designed by**: Ray Donovan diagnostic process
**Mascot concept**: Slop Blob v1
**PRD Version**: 2.0 (January 2026 Overhaul)
**Ready for execution**: Yes
