# SlopGPT Premium Rebrand PRD

## Mission
**Convert users, not entertain them.** Clean, professional, gets out of the way.

## Current Problems
- Logo: Amateur bubble letters, inconsistent colors
- Theme: Noisy muddy gradients, visual chaos
- UX: Distracts from value proposition

## Target Aesthetic
Stripe/Linear/Notion level polish - light OR refined dark, spacious, conversion-focused

---

## Phase 1: Logo Overhaul (P0 - DO FIRST)

### Generate New Logo
- [ ] Open pfs-logoworks (localhost:3001)
- [ ] Mode: Create New → LOGO
- [ ] Style: Minimalist Modern
- [ ] Prompt: `Minimalist wordmark logo "slopgpt" in lowercase, modern geometric sans-serif typeface, clean tech startup aesthetic, single color black on white background, no icons or graphics, professional typography only`
- [ ] Generate 3-4 variations
- [ ] Select best, process through Extract workflow

### Export Logo Assets
- [ ] Export SVG (primary vector)
- [ ] Export PNG (fallback, 2x resolution)
- [ ] Create favicon variant (single "s" lettermark)
- [ ] Create white variant for dark sections

### Replace Logo Files
- [ ] Delete old logos: `public/logo/slop-*.{png,webp,svg}`
- [ ] Save new: `public/logo/slopgpt-wordmark.svg`
- [ ] Save new: `public/logo/slopgpt-wordmark-white.svg`
- [ ] Save new: `public/favicon.svg` (s lettermark)
- [ ] Update `src/components/SlopLogo.tsx` with new SVG

---

## Phase 2: Color System (P0)

### Update CSS Tokens in `src/index.css`
```css
:root {
  /* Light theme option - clean and spacious */
  --bg-primary: #FFFFFF;
  --bg-secondary: #FAFAFA;
  --bg-elevated: #F5F5F5;

  /* OR Dark theme done RIGHT (YouTube-grade) */
  --bg-primary: #0F0F0F;
  --bg-secondary: #1A1A1A;
  --bg-elevated: #262626;

  /* Text - high contrast */
  --text-primary: #0A0A0A;  /* or #FFFFFF for dark */
  --text-secondary: #525252; /* or #A3A3A3 for dark */
  --text-muted: #A3A3A3;    /* or #737373 for dark */

  /* Accent - rose, premium (replaces cheap orange) */
  --accent: #E11D48;
  --accent-hover: #BE123C;
  --accent-subtle: rgba(225, 29, 72, 0.08);

  /* Borders */
  --border: #E5E5E5;        /* or #262626 for dark */
  --border-hover: #D4D4D4;  /* or #3D3D3D for dark */
}
```

### Update Body Styles
- [ ] Set background to chosen theme
- [ ] Set text colors for readability
- [ ] Update selection color to rose tint
- [ ] Remove muddy brown/orange gradients

---

## Phase 3: Hero Cleanup (P0)

### Simplify Hero Layout
- [ ] Remove or minimize marquee ticker
- [ ] Simplify hero to: Headline + Subhead + 2 CTAs
- [ ] Add visual proof (screenshot/demo) below CTAs
- [ ] Ensure value prop visible without scrolling

### Update Hero Copy
- [ ] Headline: Clear what SlopGPT does
- [ ] Subhead: One line, why they want it
- [ ] CTA 1: Primary action (rose button)
- [ ] CTA 2: Secondary action (outline button)

### Remove Visual Noise
- [ ] Reduce or remove chaotic animations
- [ ] Remove background gradients (or make very subtle)
- [ ] Simplify/minimize SlopBlob mascot in hero
- [ ] Add whitespace, let content breathe

---

## Phase 4: Component Updates (P1)

### Button Updates
- [ ] Primary: Rose background (#E11D48), white text
- [ ] Secondary: Transparent with rose border
- [ ] Hover states: Darker rose, subtle shadow

### Card/Section Updates
- [ ] Clean backgrounds
- [ ] Subtle borders
- [ ] Consistent spacing

### Typography
- [ ] Simplify to 2 fonts max (display + body)
- [ ] Remove unused: Boogaloo, Shantell Sans
- [ ] Ensure proper hierarchy

---

## Phase 5: Polish (P2)

### Favicon & OG Image
- [ ] New favicon with "s" lettermark
- [ ] New OG image matching rebrand

### Remove Unused
- [ ] Delete old logo files
- [ ] Remove unused font imports
- [ ] Clean up orphaned CSS

### Test
- [ ] Check mobile responsiveness
- [ ] Verify contrast ratios
- [ ] Test CTA visibility

---

## Success Criteria

| Metric | Target |
|--------|--------|
| Value prop clarity | Understood in 3 seconds |
| Visual noise | Minimal, content-focused |
| Logo quality | Professional wordmark |
| Theme | Clean, spacious, premium |
| CTA visibility | Obvious primary action |

---

## Files to Modify

```
src/index.css                    - Color tokens, typography
src/App.tsx                      - Hero layout, animations
src/components/SlopLogo.tsx      - New logo component
src/components/index.ts          - Component exports
public/logo/                     - Logo assets
public/favicon.svg               - New favicon
index.html                       - Meta tags if needed
```

---

## Verification Commands

```bash
# Start dev server
cd ~/slopgpt-landing && npm run dev

# Build check
npm run build

# Deploy preview
npx vercel

# Deploy production
npx vercel --prod
```

---

## Sign-off

**Designed by**: Ray Donovan diagnostic process
**PRD Version**: 3.0 (Premium Rebrand)
**Ready for execution**: Yes
