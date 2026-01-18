# SlopGPT Landing Page

AI-powered photo experience service for events. Built with React + Vite + Tailwind CSS, deployed on Vercel.

## Project Overview

SlopGPT creates bespoke AI photo experiences for events - birthdays, weddings, corporate events, product launches. Guests are transformed into heroes of custom-designed scenes.

**Live URL:** https://slopgpt.com
**Repo:** https://github.com/ayauxd/slopgpt-landing

## Key Features

- Landing page with hero showcase carousel
- AI chat assistant for lead qualification (Claude API)
- Lead capture form with n8n + Supabase + Slack integration
- Mobile-responsive design with premium UI

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    SLOPGPT.COM                          │
├─────────────────────────────────────────────────────────┤
│  /              Landing page (React + Vite)             │
│  /chat          AI chat assistant (Claude API)          │
│  /api/chat      Chat endpoint (Edge Function)           │
│  /api/lead      Lead capture endpoint (Edge Function)   │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    N8N WORKFLOW                         │
│  Webhook: /webhook/slopgpt-lead-intake                  │
│  - Validates & classifies lead priority                 │
│  - Stores in Supabase (slopgpt_leads table)            │
│  - Sends Slack notification to #automation             │
└─────────────────────────────────────────────────────────┘
```

## Environment Variables (Vercel)

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | Claude API for chat |
| `N8N_WEBHOOK_URL` | n8n webhook base URL (ngrok) |
| `LEAD_EMAIL` | Fallback email for Formsubmit |

## Lead Flow

1. User chats with AI assistant on /chat
2. AI qualifies lead and triggers contact form
3. User submits name/email/phone
4. `/api/lead` POSTs to n8n webhook
5. n8n: validates → stores in Supabase → sends Slack notification
6. Fallback: Formsubmit email if n8n unavailable

## Files Structure

```
slopgpt-landing/
├── api/
│   ├── chat.ts         # Claude API chat endpoint
│   └── lead.ts         # Lead capture → n8n webhook
├── src/
│   ├── main.tsx        # React Router setup
│   ├── App.tsx         # Landing page
│   └── pages/
│       └── Chat.tsx    # AI chat interface
├── public/
│   └── showcases/      # Hero images (WebP)
└── index.html
```

## Related Projects

- **softworks-n8n**: Contains the `slopgpt-lead-intake` workflow
- **Supabase**: `slopgpt_leads` table for lead storage
- **Slack**: #automation channel for notifications

## Commands

```bash
npm run dev      # Local development
npm run build    # Production build
vercel           # Deploy to Vercel
```

## Contact

- hello@slopgpt.com (public)
- fred@softworkstrading.com (leads notification)
