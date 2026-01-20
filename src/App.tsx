import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { SlopLogo, ThemeToggle } from './components'

// Motion-enabled Link component for smooth animations
const MotionLink = motion.create(Link)

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
}

// Chat message type
interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

// Demo conversation that types out
const demoConversation: ChatMessage[] = [
  { role: 'user', content: 'Can you help me plan a themed birthday party?' },
  { role: 'assistant', content: 'Absolutely! I love themed parties. What\'s the vibe - elegant dinner party, 90s nostalgia, or full chaos goblin mode? No judgment here. 🎉' },
  { role: 'user', content: 'Chaos goblin mode sounds perfect actually' },
  { role: 'assistant', content: 'A person of culture! Let\'s brainstorm: DIY slime station, competitive Mario Kart tournament, a "worst outfit" contest, or my personal favorite - a mystery box challenge where guests have to cook something with random ingredients. Chaos, but make it memorable.' },
]

// Showcase items for gallery
interface ShowcaseItem {
  id: string
  title: string
  description: string
  category: string
  image: string
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: '1',
    title: 'Dinosaur Birthday Bash',
    description: 'AI-generated prehistoric party scenes with T-Rex cake toppers',
    category: 'Events',
    image: '/showcases/dinosaur-party-new.webp'
  },
  {
    id: '2',
    title: '90s Nostalgia Central',
    description: 'Tamagotchis, slap bracelets, and that carpet pattern from everywhere',
    category: 'Creative',
    image: '/showcases/90s-nostalgia-v2.webp'
  },
  {
    id: '3',
    title: 'Chaos Goblin Mode',
    description: 'Mystery box cooking challenges and competitive Mario Kart tournaments',
    category: 'Party Ideas',
    image: '/showcases/chaos-goblin-v2.webp'
  },
  {
    id: '4',
    title: 'Post-Apocalyptic IKEA',
    description: 'DnD campaigns in the furniture maze. Billy bookshelf fortresses included.',
    category: 'Gaming',
    image: '/showcases/ikea-apocalypse-v2.webp'
  },
  {
    id: '5',
    title: 'Medieval Tech Support',
    description: 'Explaining quantum computing to peasants, one ox-drawn analogy at a time',
    category: 'Learning',
    image: '/showcases/medieval-tech-v2.webp'
  },
  {
    id: '6',
    title: 'Creative Writing',
    description: 'From apology letters to houseplants to epic fantasy worlds',
    category: 'Writing',
    image: '/showcases/dinosaur-party-new.webp'
  }
]

function App() {
  const shouldReduceMotion = useReducedMotion()
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const [isTyping, setIsTyping] = useState(false)

  // Hero ref
  const heroRef = useRef<HTMLDivElement>(null)

  // Animate demo conversation
  useEffect(() => {
    if (visibleMessages < demoConversation.length) {
      const timer = setTimeout(() => {
        if (demoConversation[visibleMessages].role === 'assistant') {
          setIsTyping(true)
          setTimeout(() => {
            setIsTyping(false)
            setVisibleMessages(v => v + 1)
          }, 1500)
        } else {
          setVisibleMessages(v => v + 1)
        }
      }, visibleMessages === 0 ? 2000 : 2500)
      return () => clearTimeout(timer)
    }
  }, [visibleMessages])

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-all duration-500">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--color-bg-secondary)] focus:text-[var(--color-text)] focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)]" role="navigation">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center min-h-[44px]">
            <SlopLogo size="md" animate={false} />
          </a>

          {/* Nav links */}
          <div className="flex items-center gap-3 md:gap-6">
            <a href="#features" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors hidden md:flex items-center min-h-[44px]">
              Features
            </a>
            <a href="#examples" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors hidden md:flex items-center min-h-[44px]">
              Examples
            </a>
            <ThemeToggle />
            <MotionLink
              to="/chat"
              className="text-sm px-5 py-2.5 min-h-[44px] inline-flex items-center bg-[var(--color-accent)] text-white rounded-lg font-semibold transition-all duration-200 hover:bg-[var(--color-accent-hover)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Try it free
            </MotionLink>
          </div>
        </div>
      </nav>

      <main id="main-content">
        {/* Hero - Dark with orange accents */}
        <motion.section
          ref={heroRef}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-[var(--color-bg)]"
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              className="space-y-6"
              initial="initial"
              animate="animate"
              variants={shouldReduceMotion ? {} : stagger}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)]/15 text-[var(--color-accent)] rounded-full text-sm font-medium border border-[#FF6B35]/30"
                variants={shouldReduceMotion ? {} : fadeIn}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
                </span>
                Now in beta
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-[var(--color-text)]"
                variants={shouldReduceMotion ? {} : fadeIn}
              >
                AI that doesn't take itself{' '}
                <span className="text-[var(--color-accent)]">too seriously</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed"
                variants={shouldReduceMotion ? {} : fadeIn}
              >
                Creative brainstorming, party planning, weird questions — all the fun stuff other AI won't touch.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                variants={shouldReduceMotion ? {} : fadeIn}
              >
                <MotionLink
                  to="/chat"
                  className="px-8 py-4 bg-[var(--color-accent)] text-white rounded-lg text-lg font-semibold shadow-lg shadow-[#FF6B35]/25 transition-all duration-200 inline-flex items-center gap-2 hover:bg-[var(--color-accent-hover)] hover:shadow-xl hover:shadow-[#FF6B35]/30"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start chatting
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </MotionLink>
                <motion.a
                  href="#examples"
                  className="px-8 py-4 border border-[var(--color-border-hover)] text-[var(--color-text-secondary)] rounded-lg text-lg font-medium transition-all duration-200 inline-flex items-center hover:border-[#FF6B35]/50 hover:text-[var(--color-text)]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  See examples
                </motion.a>
              </motion.div>

              <motion.p
                className="text-sm text-[var(--color-text-muted)]"
                variants={shouldReduceMotion ? {} : fadeIn}
              >
                No sign-up required. Free to use.
              </motion.p>
            </motion.div>
          </div>
        </motion.section>

        {/* Value Proposition - Visual Comparison */}
        <motion.section
          className="py-16 md:py-24 px-6 bg-[var(--color-bg-secondary)]"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-5xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-12">
              <motion.p
                className="text-[var(--color-accent)] text-sm font-medium tracking-wide uppercase mb-3"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Same prompt. Different vibe.
              </motion.p>
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-text)]">
                See the difference
              </h2>
            </div>

            {/* Visual comparison - showing actual responses */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {/* Generic AI Response */}
              <motion.div
                className="relative group"
                initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="absolute -inset-px bg-gradient-to-b from-[var(--color-border)] to-transparent rounded-2xl opacity-50" />
                <div className="relative bg-[var(--color-bg)] rounded-2xl p-5 h-full border border-[var(--color-border)]">
                  {/* Mock chat header */}
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--color-border-subtle)]">
                    {/* Boring robot avatar */}
                    <div className="w-7 h-7 rounded-full bg-[var(--color-border)] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="4" y="4" width="16" height="16" rx="2"/>
                        <circle cx="9" cy="10" r="1.5" fill="currentColor"/>
                        <circle cx="15" cy="10" r="1.5" fill="currentColor"/>
                        <path d="M9 15h6"/>
                      </svg>
                    </div>
                    <span className="text-xs text-[var(--color-text-muted)] font-medium">GenericAI</span>
                  </div>
                  {/* User message */}
                  <div className="flex justify-end mb-3">
                    <div className="bg-[var(--color-border)] text-[var(--color-text-muted)] text-sm px-3 py-2 rounded-xl rounded-br-sm max-w-[85%]">
                      Help me plan a chaotic birthday party
                    </div>
                  </div>
                  {/* AI Response */}
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-border)] flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="4" y="4" width="16" height="16" rx="2"/>
                      </svg>
                    </div>
                    <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-muted)] text-sm px-3 py-2 rounded-xl rounded-tl-sm max-w-[85%]">
                      I'd be happy to help you plan a birthday party. Here are some organized suggestions: 1) Choose a venue 2) Create a guest list 3) Plan activities 4) Arrange catering...
                    </div>
                  </div>
                  {/* Muted label */}
                  <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)]">
                    <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Formal. Predictable.</span>
                  </div>
                </div>
              </motion.div>

              {/* SlopGPT Response */}
              <motion.div
                className="relative group overflow-hidden"
                initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {/* Subtle confetti/spark accents */}
                <div className="absolute top-4 right-8 w-1.5 h-1.5 rounded-full bg-[#FF6B35]/40 animate-pulse" />
                <div className="absolute top-12 right-4 w-1 h-1 rounded-full bg-[#FF8A5B]/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-16 right-6 w-1 h-1 rounded-full bg-[#FF6B35]/30 animate-pulse" style={{ animationDelay: '1s' }} />

                <div className="absolute -inset-px bg-gradient-to-b from-[#FF6B35]/30 to-transparent rounded-2xl" />
                <div className="relative bg-[var(--color-bg)] rounded-2xl p-5 h-full border border-[#FF6B35]/40">
                  {/* Mock chat header */}
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#FF6B35]/20">
                    {/* Expressive mascot avatar */}
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8A5B] flex items-center justify-center shadow-lg shadow-[#FF6B35]/25">
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10" className="fill-white/20"/>
                        <path d="M8 9.5c0-.5.5-1 1-1s1 .5 1 1"/>
                        <path d="M14 9.5c0-.5.5-1 1-1s1 .5 1 1"/>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                      </svg>
                    </div>
                    <span className="text-xs text-[var(--color-accent)] font-medium">SlopGPT</span>
                  </div>
                  {/* User message */}
                  <div className="flex justify-end mb-3">
                    <div className="bg-[var(--color-accent)] text-white text-sm px-3 py-2 rounded-xl rounded-br-sm max-w-[85%]">
                      Help me plan a chaotic birthday party
                    </div>
                  </div>
                  {/* AI Response with inline visual cues */}
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8A5B] flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text)] text-sm px-3 py-2 rounded-xl rounded-tl-sm max-w-[85%]">
                      <span>Chaos? Say less. We're doing a </span>
                      <span className="inline-flex items-center gap-1 text-[var(--color-accent)]">
                        <svg className="w-3 h-3 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                        mystery box cooking challenge
                      </span>
                      <span>, competitive </span>
                      <span className="inline-flex items-center gap-1 text-[var(--color-accent)]">
                        <svg className="w-3 h-3 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M12 18h.01"/></svg>
                        Mario Kart
                      </span>
                      <span> on a projector, and a </span>
                      <span className="inline-flex items-center gap-1 text-[var(--color-accent)]">
                        <svg className="w-3 h-3 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
                        "worst outfit" contest
                      </span>
                      <span>. Loser has to give a toast.</span>
                    </div>
                  </div>
                  {/* Highlighted label */}
                  <div className="mt-4 pt-3 border-t border-[#FF6B35]/20">
                    <span className="text-[10px] text-[var(--color-accent)] uppercase tracking-wider font-medium">Creative. Gets it.</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bento grid features - with rich 3D illustrations */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  image: '/features/instant.webp',
                  label: 'Instant',
                  desc: 'No sign-up needed'
                },
                {
                  image: '/features/personality.webp',
                  label: 'Personality',
                  desc: 'Actually fun to talk to'
                },
                {
                  image: '/features/creative.webp',
                  label: 'Creative',
                  desc: 'Weird is welcome'
                },
                {
                  image: '/features/private.webp',
                  label: 'Private',
                  desc: 'Your data stays yours'
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="group relative"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl p-4 h-full transition-all duration-300 group-hover:border-[#FF6B35]/50 group-hover:shadow-lg group-hover:shadow-[#FF6B35]/10 overflow-hidden">
                    <div className="relative w-full aspect-square mb-3 rounded-xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.label}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-base font-semibold text-[var(--color-text)] mb-1">{item.label}</p>
                    <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Gallery */}
        <motion.section
          id="gallery"
          className="py-16 md:py-24 px-6 bg-[var(--color-bg)]"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-[var(--color-text)]">
                What people create
              </h2>
              <p className="text-[var(--color-text-muted)] text-lg">
                From party planning to creative writing. Real examples from real users.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {showcaseItems.slice(0, 6).map((item, index) => (
                <motion.div
                  key={item.id}
                  className="group cursor-pointer"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative rounded-xl overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[#FF6B35]/50 transition-colors">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <span className="inline-block px-2 py-1 bg-[var(--color-accent)] rounded text-xs font-medium mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-lg font-semibold mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/80 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Demo Chat Preview - Minimalist */}
        <motion.section
          className="py-16 md:py-24 px-6 bg-[var(--color-bg-secondary)]"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl mx-auto">
            {/* Section header */}
            <motion.div
              className="text-center mb-8"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-text)] mb-2">
                Try it yourself
              </h2>
              <p className="text-sm text-[var(--color-text-muted)]">
                A real conversation, not a demo script
              </p>
            </motion.div>

            <motion.div
              className="bg-[var(--color-bg)] rounded-2xl border border-[var(--color-border)] overflow-hidden"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Minimal header bar */}
              <div className="px-4 py-3 border-b border-[var(--color-border-subtle)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                  <span className="text-xs text-[var(--color-text-muted)] font-medium">SlopGPT</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
                  <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
                  <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
                </div>
              </div>

              {/* Chat messages */}
              <div className="p-5 space-y-5 min-h-[280px]">
                {demoConversation.slice(0, visibleMessages).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {/* Assistant avatar */}
                    {msg.role === 'assistant' && (
                      <div className="flex-shrink-0 mr-2.5 mt-0.5">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8A5B] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] text-[13px] leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[var(--color-accent)] text-white px-3.5 py-2.5 rounded-2xl rounded-br-sm'
                          : 'text-[var(--color-text-secondary)]'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex-shrink-0 mr-2.5">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8A5B] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 py-2">
                      <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Minimal input preview */}
              <div className="px-4 pb-4">
                <MotionLink
                  to="/chat"
                  className="flex items-center justify-between bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl px-4 py-3 group hover:border-[#FF6B35]/40 transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <span className="text-sm text-[var(--color-text-muted)]">Type something...</span>
                  <div className="w-8 h-8 bg-[var(--color-accent)] rounded-lg flex items-center justify-center text-white group-hover:bg-[var(--color-accent-hover)] transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </MotionLink>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          id="features"
          className="py-16 md:py-24 px-6 bg-[var(--color-bg)]"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-[var(--color-text)]">
                Why people choose us
              </h2>
              <p className="text-[var(--color-text-muted)] text-lg max-w-xl mx-auto">
                An AI assistant that's helpful and enjoyable to use.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'No Sign-up',
                  desc: 'Start chatting immediately. No account, no email, no friction.',
                },
                {
                  title: 'Actually Creative',
                  desc: 'We help with the fun stuff — party planning, story ideas, creative projects.',
                },
                {
                  title: 'Fast & Direct',
                  desc: 'No premium tiers or paywalls. Get quality answers from the start.',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="p-8 bg-[var(--color-bg-elevated)] rounded-xl border border-[var(--color-border)] hover:border-[#FF6B35]/50 transition-colors"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-3 text-[var(--color-text)]">{feature.title}</h3>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Examples */}
        <motion.section
          id="examples"
          className="py-16 md:py-24 px-6 bg-[var(--color-bg-secondary)]"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-[var(--color-text)]">
                What people ask us
              </h2>
              <p className="text-[var(--color-text-muted)] text-lg">
                From the practical to the creative. No question is too weird.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { q: '"Help me write a resignation letter that\'s professional but satisfying"', category: 'Work' },
                { q: '"Plan a DnD campaign set in a post-apocalyptic IKEA"', category: 'Creative' },
                { q: '"Explain quantum computing like I\'m a medieval peasant"', category: 'Learning' },
                { q: '"Generate AI photos for my kid\'s dinosaur birthday party"', category: 'Events' },
                { q: '"What should I make for dinner with just eggs and shame"', category: 'Life' },
                { q: '"Write a sincere apology to my houseplant I forgot to water"', category: 'Humor' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-[var(--color-bg-elevated)] rounded-xl border border-[var(--color-border)] hover:border-[#FF6B35]/50 cursor-pointer group transition-all duration-200"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider">{item.category}</span>
                  <p className="mt-3 text-[var(--color-text-secondary)] leading-relaxed text-lg group-hover:text-[var(--color-text)] transition-colors">{item.q}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          id="chat"
          className="py-20 md:py-28 px-6 bg-[var(--color-accent)]"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-white">
              Ready to try something different?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              No sign-up, no credit card. Just start a conversation and see what happens.
            </p>
            <MotionLink
              to="/chat"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-bg)] text-[var(--color-accent)] rounded-lg text-lg font-semibold transition-all duration-200 hover:bg-[var(--color-bg-secondary)]"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Start chatting now
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MotionLink>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[var(--color-border)] bg-[var(--color-bg)]" role="contentinfo">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <SlopLogo size="lg" animate={false} />
            </div>
            <div className="flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
              <a href="#features" className="hover:text-[var(--color-text)] transition-colors py-2">Features</a>
              <a href="#examples" className="hover:text-[var(--color-text)] transition-colors py-2">Examples</a>
              <a href="mailto:hello@slopgpt.com" className="hover:text-[var(--color-text)] transition-colors py-2">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-muted)]">
            <p>A <a href="https://softworkstrading.com" className="hover:text-[var(--color-text-muted)] transition-colors">Softworks Trading Company</a> project</p>
            <p>© 2025 SlopGPT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
