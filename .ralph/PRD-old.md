# PRD: SlopGPT Poolside Vibes Typography Fix

## Objective
Transform SlopGPT.com from "corporate SaaS" feel to Poolside FM-inspired playful, retro energy. Primary focus: font swap.

## Success Criteria
- [ ] Headings use Space Grotesk (playful, geometric)
- [ ] Site builds without errors
- [ ] Lighthouse performance > 90
- [ ] Visual tone matches copy energy

---

## Tasks

### 1. Font Infrastructure
- [ ] Add Space Grotesk to Google Fonts import in `index.html`
- [ ] Update `tailwind.config.js` fontFamily with `display: ['Space Grotesk', ...]`
- [ ] Update `src/index.css` to apply display font to headings

### 2. Apply Display Font to Headings
- [ ] Hero h1: "AI that doesn't take itself too seriously" → Space Grotesk
- [ ] Section h2s: "Creative Chaos", "Why talk to us?", etc. → Space Grotesk
- [ ] Carousel h3s: showcase titles → Space Grotesk
- [ ] Feature card h3s → Space Grotesk
- [ ] CTA h2: "Ready to make some slop?" → Space Grotesk

### 3. Enhance Caveat Usage
- [ ] Consider using Caveat for taglines or callouts beyond just "Slop" logo
- [ ] Evaluate badge text "The Slop Will Be Televised" in Caveat

### 4. Animation Energy Boost
- [ ] Update Framer Motion transitions to use spring physics
- [ ] Add stagger delay to feature cards entrance
- [ ] Make hover states more playful (bounce effect)

### 5. Media Gallery (User has images)
- [ ] Create gallery component for example AI images
- [ ] Add 8-12 example images from user's collection
- [ ] Implement masonry or carousel layout

### 6. Verification
- [ ] Run `npm run build` - no errors
- [ ] Run `npm run dev` - preview locally
- [ ] Test on mobile viewport
- [ ] Lighthouse audit

---

## Files to Modify
1. `/Users/fredpro/slopgpt-landing/index.html`
2. `/Users/fredpro/slopgpt-landing/tailwind.config.js`
3. `/Users/fredpro/slopgpt-landing/src/index.css`
4. `/Users/fredpro/slopgpt-landing/src/App.tsx`

## Reference
- Skill: `~/launchpad/skills/slopgpt-poolside-vibes.md`
- Audit: `~/audit/audits/slopgpt-desktop.png`
