# PRD: SlopGPT Brand Polish

## Mission
Professional playful brand. 3D drippy SLOP blob with GPT - polished execution.

## Current Problems
- Logo has white background (not transparent)
- "gpt" is lowercase and too far from SLOP
- Website uses rose theme instead of orange (brand mismatch)
- Inconsistent visual identity

## Target Aesthetic
Dark theme + coral orange accents. Playful but professional. Like Duolingo meets Linear.

---

## Phase 1: Logo Fix (CRITICAL)

### Make Logo Transparent
- [ ] Install rembg: `pip install rembg`
- [ ] Remove background: `rembg i public/logo/slop-blob-v2.webp public/logo/slop-transparent.png`
- [ ] Verify transparency in Finder/Preview
- [ ] Optimize PNG size with ImageMagick if needed

### Fix Typography
- [ ] Update SlopLogo.tsx:
  - Change "gpt" → "GPT" (uppercase)
  - Tighten spacing (reduce negative margin)
  - Align baseline properly
- [ ] Increase logo sizes:
  - sm: 32px → 36px
  - md: 36px → 48px
  - lg: 44px → 60px
  - xl: 52px → 72px
  - hero: 72px → 100px
- [ ] Update GPT text sizes proportionally

### Logo Variants
- [ ] Create dark variant (white GPT text for dark backgrounds)
- [ ] Test logo at all sizes in browser

---

## Phase 2: Color System (Orange Theme)

### Update index.css Color Tokens
```css
:root {
  /* Dark theme base */
  --color-bg: #0A0A0A;
  --color-bg-elevated: #171717;
  --color-bg-card: #1A1A1A;
  --color-border: #262626;
  --color-border-hover: #3D3D3D;

  /* Text */
  --color-text: #FAFAFA;
  --color-text-secondary: #D4D4D4;
  --color-text-muted: #A3A3A3;

  /* Orange accent (coral) */
  --color-accent: #FF6B35;
  --color-accent-hover: #FF8A5B;
  --color-accent-subtle: rgba(255, 107, 53, 0.15);
}
```

### Remove Rose References
- [ ] Replace all `rose-*` classes with orange equivalents
- [ ] Update `#E11D48` → `#FF6B35` throughout
- [ ] Remove any pink/rose color tokens

---

## Phase 3: App.tsx Theme Update

### Navigation
- [ ] `bg-white/80` → `bg-[#0A0A0A]/90`
- [ ] `border-neutral-200` → `border-[#262626]`
- [ ] `text-neutral-*` → `text-[#FAFAFA]` / `text-[#A3A3A3]`
- [ ] Button: `bg-rose-600` → `bg-[#FF6B35]`

### Hero Section
- [ ] `bg-white` → `bg-[#0A0A0A]`
- [ ] `text-neutral-900` → `text-[#FAFAFA]`
- [ ] Badge: `bg-rose-50 text-rose-600` → `bg-[#FF6B35]/10 text-[#FF6B35]`
- [ ] Heading accent: `text-rose-600` → `text-[#FF6B35]`
- [ ] CTA: `bg-rose-600` → `bg-[#FF6B35]`
- [ ] Secondary CTA: dark border variant

### Value Proposition Section
- [ ] `bg-neutral-50` → `bg-[#171717]`
- [ ] Cards: `bg-white border-neutral-200` → `bg-[#1A1A1A] border-[#262626]`
- [ ] SlopGPT card: `border-rose-200` → `border-[#FF6B35]/50`

### Gallery Section
- [ ] `bg-white` → `bg-[#0A0A0A]`
- [ ] Cards: dark theme
- [ ] Category tags: orange

### Chat Preview
- [ ] Outer bg: `bg-neutral-50` → `bg-[#171717]`
- [ ] Chat container: `bg-white` → `bg-[#1A1A1A]`
- [ ] User messages: `bg-rose-600` → `bg-[#FF6B35]`
- [ ] Bot messages: dark with border

### Features Section
- [ ] `bg-white` → `bg-[#0A0A0A]`
- [ ] Cards: `bg-neutral-50` → `bg-[#1A1A1A]`

### Examples Section
- [ ] `bg-neutral-50` → `bg-[#171717]`
- [ ] Cards: `bg-white` → `bg-[#1A1A1A]`
- [ ] Category: `text-rose-600` → `text-[#FF6B35]`

### CTA Section
- [ ] Keep `bg-rose-600` → change to `bg-[#FF6B35]`
- [ ] Button: white on orange

### Footer
- [ ] `bg-white` → `bg-[#0A0A0A]`
- [ ] `border-neutral-200` → `border-[#262626]`
- [ ] Text: light colors

---

## Phase 4: Final Polish

- [ ] Build: `npm run build` - no errors
- [ ] Visual check: all sections dark + orange
- [ ] Logo check: transparent, GPT uppercase, tight
- [ ] Deploy: `vercel --prod`

---

## Verification Checklist

| Item | Criteria |
|------|----------|
| Logo transparency | No white/gray box visible |
| Logo text | "GPT" uppercase, close to SLOP |
| Logo size | Larger, impactful in hero |
| Background | Dark (#0A0A0A) throughout |
| Accent color | Orange (#FF6B35) on all CTAs |
| Consistency | Same colors across all sections |
| Contrast | Text readable (WCAG AA) |

---

## Commands

```bash
# Remove logo background
pip install rembg
rembg i public/logo/slop-blob-v2.webp public/logo/slop-transparent.png

# Build
cd ~/slopgpt-landing && npm run build

# Deploy
cd ~/slopgpt-landing && vercel --prod
```

---

**PRD Version**: 4.0 (Brand Polish - Dark + Orange)
**Created by**: Ray Donovan
