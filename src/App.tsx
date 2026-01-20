import { motion, useReducedMotion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import confetti from 'canvas-confetti'
import './index.css'
import { SlopBlob, SlopLogo, GlitchText, Marquee } from './components'
import { MICROCOPY, getRandomRotation, MARQUEE_PROMPTS } from './constants/microcopy'

// Motion-enabled Link component for smooth animations
const MotionLink = motion.create(Link)

// Anthropic/Claude-inspired clean aesthetic with humor
// "The Slop Will Be Televised"

// Meme-native chaotic spring animations
const chaosSpring = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 15,
  mass: 1
}

const fadeIn = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: chaosSpring
}

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } }
}

// Bouncy spring for playful interactions
const bouncy = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 20
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

// Showcase items for carousel
interface ShowcaseItem {
  id: string
  title: string
  description: string
  category: string
  bgGradient: string
  image: string
  isVideo?: boolean
  videoType?: 'gif' | 'mp4' | 'webm'
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: '1',
    title: 'Dinosaur Birthday Bash',
    description: 'AI-generated prehistoric party scenes with T-Rex cake toppers and meteor piñatas',
    category: 'Events',
    bgGradient: 'from-emerald-400 to-teal-600',
    image: '/showcases/dinosaur-party-new.webp'
  },
  {
    id: '2',
    title: '90s Nostalgia Central',
    description: 'Tamagotchis, slap bracelets, and that carpet pattern from everywhere',
    category: 'Creative',
    bgGradient: 'from-purple-400 to-pink-600',
    image: '/showcases/90s-nostalgia.webp'
  },
  {
    id: '3',
    title: 'Chaos Goblin Mode',
    description: 'Mystery box cooking challenges and competitive Mario Kart tournaments',
    category: 'Party Ideas',
    bgGradient: 'from-orange-400 to-red-600',
    image: '/showcases/chaos-goblin-new.webp',
    isVideo: true,
    videoType: 'gif'
  },
  {
    id: '4',
    title: 'Post-Apocalyptic IKEA',
    description: 'DnD campaigns in the furniture maze. Billy bookshelf fortresses included.',
    category: 'Gaming',
    bgGradient: 'from-blue-400 to-indigo-600',
    image: '/showcases/ikea-apocalypse.webp'
  },
  {
    id: '5',
    title: 'Medieval Tech Support',
    description: 'Explaining quantum computing to peasants, one ox-drawn analogy at a time',
    category: 'Learning',
    bgGradient: 'from-amber-400 to-yellow-600',
    image: '/showcases/medieval-tech.webp',
    isVideo: true,
    videoType: 'gif'
  },
  {
    id: '6',
    title: 'Blob Evolution',
    description: 'Watch the Slop Blob transform through various moods and expressions',
    category: 'Behind the Scenes',
    bgGradient: 'from-slop to-chaos',
    image: '/showcases/chaos-goblin-new.webp', // TODO: Replace with /showcases/videos/blob-evolution.gif when created
    isVideo: true,
    videoType: 'gif'
  }
]

// Konami code sequence
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

function App() {
  const shouldReduceMotion = useReducedMotion()
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const [isTyping, setIsTyping] = useState(false)

  // Gallery hover state
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Chaos mode state
  const [chaosMode, setChaosMode] = useState(false)
  const [konamiProgress, setKonamiProgress] = useState<string[]>([])

  // Blob poke counter
  const [blobPokes, setBlobPokes] = useState(0)
  const [showPokeCount, setShowPokeCount] = useState(false)

  // Rotating CTA text
  const [ctaIndex, setCtaIndex] = useState(0)

  // Rotate CTA text periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setCtaIndex(prev => (prev + 1) % MICROCOPY.ctaRotations.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Konami code detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newProgress = [...konamiProgress, e.key].slice(-KONAMI_CODE.length)
      setKonamiProgress(newProgress)

      if (newProgress.join(',') === KONAMI_CODE.join(',')) {
        setChaosMode(prev => !prev)
        setKonamiProgress([])
        // Celebrate chaos activation
        confetti({
          particleCount: 200,
          spread: 180,
          origin: { y: 0.5 },
          colors: ['#FF6B35', '#00FF9F', '#FF00FF', '#FFFEF0']
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konamiProgress])

  // Handle blob poke
  const handleBlobPoke = () => {
    setBlobPokes(prev => prev + 1)
    setShowPokeCount(true)
    setTimeout(() => setShowPokeCount(false), 2000)
  }

  // Parallax scroll effects
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const blobRotate = useTransform(scrollYProgress, [0, 1], [0, 15])
  const blobScale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

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

  // Random rotations for masonry cards - more visible chaos
  const cardRotations = [-4, -2.5, -1, 1, 2.5, 4]
  const getCardRotation = (index: number) => cardRotations[index % cardRotations.length]

  return (
    <div className={`min-h-screen bg-void text-cream transition-all duration-500 ${chaosMode ? 'chaos-mode' : ''}`}>
      {/* Chaos mode indicator */}
      <AnimatePresence>
        {chaosMode && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-unhinged/90 text-void px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm border border-unhinged"
          >
            CHAOS MODE ACTIVATED
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cursor-following blob in chaos mode */}
      {chaosMode && !shouldReduceMotion && (
        <SlopBlob
          expression="sneaky"
          size="sm"
          animate={true}
          followCursor={true}
        />
      )}

      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-void focus:text-cream focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Navigation - Clean, Anthropic-style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-void/80 backdrop-blur-md border-b border-void-lighter" role="navigation">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 min-h-[44px] py-2 group">
            <SlopLogo size="sm" animate={true} />
          </a>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-cream-muted hover:text-cream transition-colors hidden md:block min-h-[44px] flex items-center link-underline">
              Features
            </a>
            <a href="#examples" className="text-sm text-cream-muted hover:text-cream transition-colors hidden md:block min-h-[44px] flex items-center link-underline">
              Examples
            </a>
            <MotionLink
              to="/chat"
              className="text-sm px-5 py-3 min-h-[44px] inline-flex items-center bg-slop text-void rounded-lg font-semibold transition-all duration-200"
              whileHover={{
                scale: 1.05,
                rotate: [-1, 1, -1, 0],
                backgroundColor: '#FF8A5B',
                transition: {
                  rotate: { duration: 0.3 },
                  scale: chaosSpring
                }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {MICROCOPY.nav.chat}
            </MotionLink>
          </div>
        </div>
      </nav>

      <main id="main-content">
        {/* Hero - Asymmetric with blob - compact, content-driven height */}
        <motion.section
          ref={heroRef}
          className="relative flex items-center overflow-hidden bg-void pt-20 pb-8 md:pt-24 md:pb-12 bg-warm-accent"
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Noise texture background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}
          />

          {/* Grid container for asymmetric layout - tighter spacing */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-[60%_40%] gap-8 items-center">
            {/* Left side - Content (60%) */}
            <motion.div
              className="space-y-6"
              initial="initial"
              animate="animate"
              variants={shouldReduceMotion ? {} : stagger}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-slop/20 backdrop-blur-sm text-cream rounded-full text-sm font-medium border border-slop/40"
                variants={shouldReduceMotion ? {} : fadeIn}
                style={{ transform: getRandomRotation('subtle') }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slop opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-slop"></span>
                </span>
                <span className="font-accent text-base">The Slop Will Be Televised</span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-cream font-display"
                style={{ transform: 'rotate(-2deg)' }}
                variants={shouldReduceMotion ? {} : fadeIn}
              >
                <GlitchText intensity="medium">
                  AI that doesn't take itself
                </GlitchText>
                <br />
                <GlitchText intensity="medium" className="text-slop">
                  too seriously
                </GlitchText>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-cream/80 max-w-xl leading-relaxed"
                variants={shouldReduceMotion ? {} : fadeIn}
              >
                {MICROCOPY.cta.heroSubtext}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-start gap-4 pt-4"
                variants={shouldReduceMotion ? {} : fadeIn}
              >
                <MotionLink
                  to="/chat"
                  className={`px-8 py-4 bg-slop text-void rounded-lg text-lg font-semibold shadow-lg transition-all duration-200 inline-flex items-center gap-2 glow-slop ${chaosMode ? 'animate-pulse' : 'animate-subtle-pulse'}`}
                  whileHover={shouldReduceMotion ? {} : {
                    scale: 1.05,
                    y: -4,
                    rotate: chaosMode ? [-2, 2, -2, 0] : [-1, 1, 0],
                    boxShadow: '0 20px 40px rgba(255,107,53,0.5)',
                    transition: {
                      rotate: { duration: 0.3 },
                      scale: chaosSpring,
                      y: chaosSpring
                    }
                  }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95, rotate: 0 }}
                >
                  <motion.span
                    key={ctaIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {MICROCOPY.ctaRotations[ctaIndex]}
                  </motion.span>
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </MotionLink>
                <motion.a
                  href="#examples"
                  className="px-8 py-4 border-2 border-cream/50 text-cream rounded-lg text-lg font-semibold transition-all duration-200 inline-flex items-center"
                  whileHover={shouldReduceMotion ? {} : {
                    scale: 1.05,
                    rotate: [-0.5, 0.5, 0],
                    backgroundColor: 'rgba(255,254,240,0.1)',
                    borderColor: 'rgba(255,254,240,0.8)',
                    transition: {
                      rotate: { duration: 0.3 },
                      scale: chaosSpring
                    }
                  }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  {MICROCOPY.buttons.viewMore}
                </motion.a>
              </motion.div>

              <motion.p
                className="text-sm text-cream/60 inline-block"
                variants={shouldReduceMotion ? {} : fadeIn}
                style={{ transform: getRandomRotation('subtle') }}
              >
                No sign-up. No credit card. Just vibes.
              </motion.p>
            </motion.div>

            {/* Right side - Blob mascot (40%) with parallax */}
            <motion.div
              className="relative flex items-center justify-center lg:justify-end"
              initial={shouldReduceMotion ? {} : { opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={shouldReduceMotion ? {} : {
                y: blobY,
                rotate: chaosMode ? blobRotate : blobRotate,
                scale: blobScale
              }}
            >
              <div className="relative">
                {/* Glow effect behind blob */}
                <div className={`absolute inset-0 blur-3xl rounded-full scale-150 transition-colors duration-500 ${chaosMode ? 'bg-unhinged/40' : 'bg-slop/20'}`} />
                {/* Large interactive blob */}
                <SlopBlob
                  expression="excited"
                  size="xl"
                  animate={true}
                  interactive={true}
                  onPoke={handleBlobPoke}
                />
                {/* Poke counter tooltip */}
                <AnimatePresence>
                  {showPokeCount && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.8 }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 bg-void-lighter border border-slop px-3 py-1 rounded-full text-sm text-cream whitespace-nowrap"
                    >
                      {blobPokes === 1 && "hey!"}
                      {blobPokes === 2 && "stop that!"}
                      {blobPokes === 3 && "seriously?"}
                      {blobPokes >= 4 && blobPokes < 10 && `${blobPokes} pokes... why?`}
                      {blobPokes >= 10 && blobPokes < 20 && "you're committed to this huh"}
                      {blobPokes >= 20 && "blob poke champion 🏆"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

        </motion.section>

        {/* Marquee - Scrolling example prompts */}
        <motion.section
          className="py-6 bg-void border-y border-slop/30 overflow-hidden"
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Marquee
            items={MARQUEE_PROMPTS}
            speed={chaosMode ? 80 : 40}
            pauseOnHover={true}
          />
        </motion.section>

        {/* Meme Explanation - Drake Format */}
        <motion.section
          className="py-6 md:py-10 px-6 bg-void overflow-hidden"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-10 text-cream">
              What is <GlitchText intensity="medium">Slop</GlitchText>?
            </h2>

            {/* Drake Meme Format */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left side - BAD (Drake disapproves) */}
              <motion.div
                className="relative group"
                initial={shouldReduceMotion ? {} : { opacity: 0, x: -50, rotate: -3 }}
                whileInView={{ opacity: 1, x: 0, rotate: -2 }}
                viewport={{ once: true }}
                transition={chaosSpring}
                whileHover={shouldReduceMotion ? {} : { rotate: -4, scale: 1.02 }}
              >
                <div className="bg-void-lighter border-2 border-void-lighter rounded-2xl p-8 h-full relative overflow-hidden">
                  {/* Red X overlay */}
                  <div className="absolute top-4 right-4 text-6xl text-error opacity-80 font-display">
                    ❌
                  </div>

                  <div className="relative z-10">
                    <div className="text-7xl mb-6">😒</div>
                    <h3 className="text-2xl font-display font-bold mb-4 text-cream/60 line-through">
                      Boring AI that takes itself seriously
                    </h3>
                    <ul className="space-y-3 text-cream/50">
                      <li className="flex items-start gap-2">
                        <span className="text-xl">•</span>
                        <span>Generic corporate vibes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-xl">•</span>
                        <span>Pretends to be "professional"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-xl">•</span>
                        <span>Afraid of personality</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-xl">•</span>
                        <span>No fun allowed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Right side - GOOD (Drake approves) */}
              <motion.div
                className="relative group"
                initial={shouldReduceMotion ? {} : { opacity: 0, x: 50, rotate: 3 }}
                whileInView={{ opacity: 1, x: 0, rotate: 2 }}
                viewport={{ once: true }}
                transition={chaosSpring}
                whileHover={shouldReduceMotion ? {} : { rotate: 4, scale: 1.02 }}
              >
                <div className="bg-gradient-to-br from-slop/20 via-chaos/10 to-unhinged/20 border-2 border-slop rounded-2xl p-8 h-full relative overflow-hidden">
                  {/* Green checkmark overlay */}
                  <div className="absolute top-4 right-4 text-6xl text-chaos opacity-90 font-display animate-pulse-glow">
                    ✓
                  </div>

                  {/* Decorative blob in corner */}
                  <div className="absolute -bottom-8 -right-8 opacity-20">
                    <SlopBlob expression="excited" size="lg" animate={true} />
                  </div>

                  <div className="relative z-10">
                    <div className="text-7xl mb-6">😎</div>
                    <h3 className="text-2xl font-display font-bold mb-4 text-cream">
                      AI that embraces the chaos
                    </h3>
                    <ul className="space-y-3 text-cream/90">
                      <li className="flex items-start gap-2">
                        <span className="text-xl text-chaos">✓</span>
                        <span>Unhinged but helpful</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-xl text-chaos">✓</span>
                        <span>Meme-native personality</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-xl text-chaos">✓</span>
                        <span>Actually fun to use</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-xl text-chaos">✓</span>
                        <span>Chaos goblin energy ✨</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom tagline */}
            <motion.p
              className="text-center mt-12 text-xl md:text-2xl font-accent text-cream/80"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, ...chaosSpring }}
              style={{ fontWeight: 700, transform: getRandomRotation('medium') }}
            >
              Because life's too short for boring AI.
            </motion.p>
          </div>
        </motion.section>

        {/* Gallery - Masonry Grid */}
        <motion.section
          id="gallery"
          className="py-8 md:py-10 px-6 bg-gradient-to-b from-void-light to-void overflow-hidden"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-10"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 font-display text-cream">
                Creative Chaos, <span className="text-slop">Visualized</span>
              </h2>
              <p className="text-cream/70 text-lg">
                From dinosaur parties to medieval tech support. We make it happen.
              </p>
            </motion.div>

            {/* Masonry Grid with overlapping cards */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {showcaseItems.map((item, index) => {
                const rotation = getCardRotation(index)
                const isHovered = hoveredCard === item.id

                return (
                  <motion.div
                    key={item.id}
                    className="break-inside-avoid relative group cursor-pointer"
                    initial={shouldReduceMotion ? {} : {
                      opacity: 0,
                      y: 40,
                      rotate: rotation
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      rotate: rotation
                    }}
                    whileHover={shouldReduceMotion ? {} : {
                      scale: 1.05,
                      rotate: 0,
                      zIndex: 50,
                      transition: chaosSpring
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1,
                      ...chaosSpring
                    }}
                    onMouseEnter={() => setHoveredCard(item.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      transform: shouldReduceMotion ? 'none' : `rotate(${rotation}deg)`,
                    }}
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-void-lighter hover:border-slop/50 bg-void-lighter transition-colors">
                      {/* Image or Video */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {item.isVideo ? (
                          item.videoType === 'gif' ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <video
                              src={item.image}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          )
                        ) : (
                          <img
                            src={item.image}
                            alt={item.title}
                            loading={index === 0 ? 'eager' : 'lazy'}
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        )}
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                        {/* Video indicator badge */}
                        {item.isVideo && (
                          <div className="absolute top-3 left-3 px-2 py-1 bg-void/80 backdrop-blur-sm rounded-md flex items-center gap-1">
                            <svg className="w-3 h-3 text-chaos" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                            <span className="text-xs text-cream font-semibold uppercase tracking-wide">{item.videoType}</span>
                          </div>
                        )}
                      </div>

                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                        {/* Category tag */}
                        <motion.span
                          className="inline-block px-3 py-1 bg-slop/80 backdrop-blur-sm rounded-full text-xs font-semibold mb-3 border border-slop font-accent"
                          initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                          style={{ transform: getRandomRotation('subtle') }}
                        >
                          {item.category}
                        </motion.span>

                        <h3 className="text-xl md:text-2xl font-bold mb-2 drop-shadow-lg font-display">
                          {item.title}
                        </h3>
                        <p className="text-sm text-cream/90 drop-shadow line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {/* Blob appears on hover */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="absolute top-4 right-4 pointer-events-none"
                            initial={{ opacity: 0, scale: 0, rotate: -20 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0, rotate: 20 }}
                            transition={chaosSpring}
                          >
                            <SlopBlob expression="excited" size="sm" animate={true} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>

        {/* Demo Chat Preview */}
        <motion.section
          className="py-8 md:py-10 px-6 bg-void-light"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="bg-void-lighter rounded-2xl border border-void-lighter overflow-hidden shadow-xl"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Chat header */}
              <div className="px-6 py-4 border-b border-void-lighter flex items-center gap-3">
                <SlopLogo size="sm" animate={false} />
                <div>
                  <p className="font-semibold text-sm text-cream">Agent</p>
                  <p className="text-xs text-cream/60">Usually responds instantly</p>
                </div>
              </div>

              {/* Chat messages */}
              <div className="p-6 space-y-4 min-h-[320px]">
                {demoConversation.slice(0, visibleMessages).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={shouldReduceMotion ? {} : {
                      opacity: 0,
                      x: msg.role === 'user' ? 20 : -20
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-slop text-void rounded-br-md'
                          : 'bg-void-light border border-void-lighter text-cream rounded-bl-md'
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
                    <div className="bg-void-light border border-void-lighter px-4 py-3 rounded-2xl rounded-bl-md">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-slop rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-slop rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-slop rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat input preview */}
              <div className="px-6 pb-6">
                <div className="flex items-center gap-3 bg-void-light border border-void-lighter rounded-xl px-4 py-2 transition-all duration-200 focus-within:border-slop focus-within:ring-2 focus-within:ring-slop/20">
                  <input
                    type="text"
                    placeholder="Ask me anything..."
                    aria-label="Chat message input"
                    className="flex-1 bg-transparent outline-none text-sm text-cream placeholder-cream/50 min-h-[44px]"
                    disabled
                  />
                  <button
                    className="w-11 h-11 bg-slop rounded-lg flex items-center justify-center text-void hover:bg-slop-light active:scale-95 transition-all duration-200 hover:shadow-lg hover:shadow-slop/30"
                    disabled
                    aria-label="Send message"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Features - What makes us different */}
        <motion.section
          id="features"
          className="py-8 md:py-10 px-6 bg-void"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-10"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 font-display text-cream">
                Why talk to <span className="text-slop">us</span>?
              </h2>
              <p className="text-cream/70 text-lg max-w-xl mx-auto">
                We're not trying to replace your job or become your therapist.
                We're just a helpful, slightly unhinged AI friend.
              </p>
            </motion.div>

            {/* Scattered layout with rotations - chaotic but intentional */}
            <div className="relative min-h-[600px] md:min-h-[500px]">
              {[
                {
                  icon: <span className="text-5xl" style={{ transform: 'rotate(-10deg)', display: 'inline-block' }}>🚪</span>,
                  title: 'No Lock-In',
                  desc: 'We don\'t trap your data. Chat, get help, leave. Come back whenever. It\'s casual.',
                  position: 'top-0 left-0 md:left-[5%]',
                  rotation: -2
                },
                {
                  icon: <span className="text-5xl" style={{ transform: 'rotate(8deg)', display: 'inline-block' }}>🧠</span>,
                  title: 'Actually Creative',
                  desc: 'We\'ll help you brainstorm the weird stuff. Party themes, story ideas, that thing you can\'t quite describe.',
                  position: 'top-[60px] md:top-[80px] left-0 md:left-[35%]',
                  rotation: 1.5,
                  hasBlobPeek: true
                },
                {
                  icon: <span className="text-5xl" style={{ transform: 'rotate(-5deg)', display: 'inline-block' }}>🏃</span>,
                  title: 'Fast & Direct',
                  desc: 'No 47-step onboarding. No premium tier to unlock "good" answers. Just start talking.',
                  position: 'top-[120px] md:top-[40px] left-0 md:left-[68%]',
                  rotation: -1.5
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className={`relative md:absolute ${feature.position} w-full md:w-[28%] p-10 bg-void-lighter rounded-xl border border-void-lighter shadow-[0_4px_24px_rgba(255,107,53,0.1)]`}
                  style={{
                    transform: shouldReduceMotion ? 'none' : `rotate(${feature.rotation}deg)`,
                    zIndex: 10
                  }}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30, rotate: feature.rotation }}
                  whileInView={{ opacity: 1, y: 0, rotate: feature.rotation }}
                  whileHover={shouldReduceMotion ? {} : {
                    y: -8,
                    scale: 1.05,
                    rotate: [feature.rotation, feature.rotation + 1, feature.rotation - 1, feature.rotation],
                    boxShadow: '0 24px 48px -12px rgba(255, 107, 53, 0.25)',
                    transition: {
                      type: 'spring',
                      stiffness: 400,
                      damping: 15,
                      rotate: {
                        duration: 0.3,
                        repeat: 0
                      }
                    }
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 25 }}
                >
                  {/* Blob peeking from behind second card */}
                  {feature.hasBlobPeek && (
                    <motion.div
                      className="absolute -bottom-8 -right-8 z-0 opacity-60"
                      initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 0.6, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <SlopBlob expression="sneaky" size="md" animate={true} />
                    </motion.div>
                  )}

                  <div className="relative z-10">
                    <div className="mb-5">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-cream font-display">{feature.title}</h3>
                    <p className="text-cream/70 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Examples / Use Cases */}
        <motion.section
          id="examples"
          className="py-8 md:py-10 px-6 bg-void-light"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-10"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 font-display text-cream">
                Things people <span className="text-slop">ask us</span>
              </h2>
              <p className="text-cream/70 text-lg">
                From the practical to the peculiar. We don't judge.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { q: '"Help me write a resignation letter that\'s professional but satisfying"', category: 'Work', rotation: -1 },
                { q: '"Plan a DnD campaign set in a post-apocalyptic IKEA"', category: 'Creative', rotation: 1.5 },
                { q: '"Explain quantum computing like I\'m a medieval peasant"', category: 'Learning', rotation: -0.5 },
                { q: '"Generate AI photos for my kid\'s dinosaur birthday party"', category: 'Events', rotation: 1 },
                { q: '"What should I make for dinner with just eggs and shame"', category: 'Life', rotation: -1.5 },
                { q: '"Write a sincere apology to my houseplant I forgot to water"', category: 'Humor', rotation: 0.5 },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-void-lighter rounded-xl border border-slop/20 shadow-[0_2px_16px_rgba(255,107,53,0.08)] cursor-pointer group transition-all duration-200 hover-tilt"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20, rotate: item.rotation }}
                  whileInView={{ opacity: 1, y: 0, rotate: item.rotation }}
                  whileHover={shouldReduceMotion ? {} : {
                    y: -6,
                    scale: 1.02,
                    rotate: 0,
                    boxShadow: '0 12px 32px -8px rgba(255, 107, 53, 0.3)',
                    transition: bouncy
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-xs font-semibold text-slop uppercase tracking-wider font-accent inline-block" style={{ transform: getRandomRotation('subtle') }}>{item.category}</span>
                  <p className="mt-3 text-cream/80 leading-relaxed text-lg group-hover:text-cream transition-colors">{item.q}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section - Rebuilt with blob and chaos */}
        <motion.section
          id="chat"
          className="relative py-8 md:py-10 px-6 overflow-hidden"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Warm gradient background with orange accents */}
          <div className="absolute inset-0 bg-gradient-to-br from-void via-slop/5 to-void" />

          <motion.div
            className="relative z-10 max-w-3xl mx-auto text-center px-4 sm:px-0"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Large blob as main visual */}
            <motion.div
              className="relative mx-auto mb-8 flex justify-center"
              initial={shouldReduceMotion ? {} : { scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-slop/30 via-chaos/20 to-unhinged/30 blur-3xl scale-150" />
              {/* Blob */}
              <SlopBlob expression="excited" size="xl" animate={true} />
            </motion.div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4 md:mb-6 font-display text-cream">
              {MICROCOPY.cta.finalCta}
            </h2>
            <p className="text-cream/70 text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed">
              {MICROCOPY.cta.finalCtaSubtext}
            </p>
            <MotionLink
              to="/chat"
              className="inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-slop text-void rounded-lg text-base md:text-lg font-bold transition-all duration-200 shadow-xl shadow-slop/30 hover:shadow-2xl hover:shadow-slop/40 w-full sm:w-auto relative overflow-hidden group"
              whileHover={{ scale: 1.05, y: -4, rotate: [0, -1, 1, 0] }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => {
                // Confetti on hover
                confetti({
                  particleCount: 40,
                  spread: 60,
                  origin: { y: 0.7 },
                  colors: ['#FF6B35', '#00FF9F', '#FF00FF', '#FFFEF0']
                })
              }}
            >
              <span className="relative z-10">{MICROCOPY.buttons.tryNow}</span>
              <svg
                className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              {/* Animated gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-slop-light to-slop opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MotionLink>
            <p className="mt-8 text-sm text-cream/60 inline-block" style={{ transform: getRandomRotation('subtle') }}>
              questions? {MICROCOPY.buttons.contactUs} at <a href="mailto:hello@slopgpt.com" className="text-slop hover:text-slop-light hover:underline py-3 px-1 min-h-[44px] inline-flex items-center transition-colors">hello@slopgpt.com</a>
            </p>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer
        className="py-8 md:py-10 px-6 border-t border-void-lighter"
        role="contentinfo"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <SlopLogo size="md" animate={true} />
            </div>
            <div className="flex items-center gap-4 text-sm text-cream/60">
              <a href="#features" className="hover:text-cream transition-colors py-2 px-3 min-h-[44px] min-w-[44px] inline-flex items-center justify-center">Features</a>
              <a href="#examples" className="hover:text-cream transition-colors py-2 px-3 min-h-[44px] min-w-[44px] inline-flex items-center justify-center">Examples</a>
              <a href="#chat" className="hover:text-cream transition-colors py-2 px-3 min-h-[44px] min-w-[44px] inline-flex items-center justify-center">Chat</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-void-lighter flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cream/60">
            <p>A <a href="https://softworkstrading.com" className="text-cream/60 hover:text-cream transition-colors py-2 px-1 inline-flex items-center">Softworks Trading Company</a> project</p>
            <p className="text-cream/40">{MICROCOPY.footer.copyright}</p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default App
