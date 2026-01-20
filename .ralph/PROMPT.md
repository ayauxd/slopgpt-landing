# SlopGPT Meme-Native Build - Iteration Prompt

You are implementing a meme-native redesign of SlopGPT. Your job is to complete the next unchecked task in the PRD.

## Instructions

1. Read `.ralph/PRD.md` to find the next unchecked `- [ ]` task
2. Implement ONLY that task completely
3. Mark it as `- [x]` when done
4. Run `npm run build` to verify no errors
5. Stop after completing ONE task

## Context

**Project**: SlopGPT Landing Page (React + Vite + Tailwind)
**Goal**: Transform from generic AI SaaS to meme-native, internet-culture-first design
**Mascot**: Slop Blob (SVGs already in `/public/mascot/`)

## Key Files

- `src/App.tsx` - Main application
- `src/index.css` - Global styles
- `tailwind.config.js` - Tailwind configuration
- `index.html` - HTML entry with fonts
- `public/mascot/` - Blob SVGs (already created)

## Design System

**Colors:**
- Slop Orange: #FF6B35
- Chaos Green: #00FF9F
- Unhinged Magenta: #FF00FF
- Void Black: #0D0D0D
- Cream White: #FFFEF0

**Fonts:**
- Display: Bricolage Grotesque (chunky, weird)
- Body: Outfit (readable)
- Accent: Shantell Sans (handwritten)

**Animation:**
- Use spring physics: `{ type: 'spring', stiffness: 500, damping: 15 }`
- Wobble, bounce, shake - NOT smooth fades

## Rules

1. NO generic AI patterns (Inter font, gray palette, 3-column grids)
2. Every element should feel intentional and chaotic
3. Copy must match visuals in tone
4. Test build after each change
5. Mark task complete in PRD when done

## Current State

Check `.ralph/PRD.md` for which tasks are done `[x]` and which remain `[ ]`.

Start with the first unchecked task and implement it fully.
