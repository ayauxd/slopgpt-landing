import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import './index.css'

// Anthropic/Claude-inspired clean aesthetic with humor
// "The Slop Will Be Televised"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
}

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } }
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
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: '1',
    title: 'Dinosaur Birthday Bash',
    description: 'AI-generated prehistoric party scenes with T-Rex cake toppers and meteor piñatas',
    category: 'Events',
    bgGradient: 'from-emerald-400 to-teal-600',
    image: '/showcases/dinosaur-party.jpg'
  },
  {
    id: '2',
    title: '90s Nostalgia Central',
    description: 'Tamagotchis, slap bracelets, and that carpet pattern from everywhere',
    category: 'Creative',
    bgGradient: 'from-purple-400 to-pink-600',
    image: '/showcases/90s-nostalgia.jpg'
  },
  {
    id: '3',
    title: 'Chaos Goblin Mode',
    description: 'Mystery box cooking challenges and competitive Mario Kart tournaments',
    category: 'Party Ideas',
    bgGradient: 'from-orange-400 to-red-600',
    image: '/showcases/chaos-goblin.jpg'
  },
  {
    id: '4',
    title: 'Post-Apocalyptic IKEA',
    description: 'DnD campaigns in the furniture maze. Billy bookshelf fortresses included.',
    category: 'Gaming',
    bgGradient: 'from-blue-400 to-indigo-600',
    image: '/showcases/ikea-apocalypse.jpg'
  },
  {
    id: '5',
    title: 'Medieval Tech Support',
    description: 'Explaining quantum computing to peasants, one ox-drawn analogy at a time',
    category: 'Learning',
    bgGradient: 'from-amber-400 to-yellow-600',
    image: '/showcases/medieval-tech.jpg'
  }
]

// Hero images for animated showcase
const heroImages = [
  '/showcases/dinosaur-party.jpg',
  '/showcases/chaos-goblin.jpg',
  '/showcases/medieval-tech.jpg',
]

function App() {
  const shouldReduceMotion = useReducedMotion()
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const [isTyping, setIsTyping] = useState(false)
  const [heroIndex, setHeroIndex] = useState(0)

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right

  // Animate hero images
  useEffect(() => {
    if (shouldReduceMotion) return
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [shouldReduceMotion])

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

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % showcaseItems.length)
    }, 5000) // Rotate every 5 seconds
    return () => clearInterval(timer)
  }, [])

  // Manual navigation
  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % showcaseItems.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length)
  }

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#1a1a1a]">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#1a1a1a] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Navigation - Clean, Anthropic-style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf8]/80 backdrop-blur-md border-b border-[#e5e5e5]" role="navigation">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center min-h-[44px] py-2 group">
            <span className="text-4xl transition-transform duration-200 group-hover:scale-105" style={{ fontFamily: 'Caveat, cursive', fontWeight: 600, transform: 'rotate(-2deg)', color: '#cc2936' }}>Slop</span>
            <span className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>GPT</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors hidden md:block min-h-[44px] flex items-center">
              Features
            </a>
            <a href="#examples" className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors hidden md:block min-h-[44px] flex items-center">
              Examples
            </a>
            <motion.a
              href="https://chat.slopgpt.com"
              className="text-sm px-5 py-3 min-h-[44px] inline-flex items-center bg-[#1a1a1a] text-white rounded-lg font-semibold transition-all duration-200"
              whileHover={{ scale: 1.02, backgroundColor: '#333' }}
              whileTap={{ scale: 0.98 }}
            >
              Start Chatting
            </motion.a>
          </div>
        </div>
      </nav>

      <main id="main-content">
        {/* Hero - Full-bleed immersive */}
        <motion.section
          className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Full-bleed background image */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={heroIndex}
                src={heroImages[heroIndex]}
                alt="AI-generated event photo"
                className="absolute inset-0 w-full h-full object-cover"
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? {} : { opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            </AnimatePresence>
            {/* Dark gradient overlay for text readability - increased opacity for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
          </div>

          {/* Content overlay */}
          <motion.div
            className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-20"
            initial="initial"
            animate="animate"
            variants={shouldReduceMotion ? {} : stagger}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white/90 rounded-full text-sm font-medium mb-6 border border-white/20"
              variants={shouldReduceMotion ? {} : fadeIn}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cc2936] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#cc2936]"></span>
              </span>
              The Slop Will Be Televised
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-white"
              variants={shouldReduceMotion ? {} : fadeIn}
            >
              AI that doesn't take itself
              <br />
              <span className="text-[#ff4d5a]">too seriously</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed"
              variants={shouldReduceMotion ? {} : fadeIn}
            >
              Most AI tools trap you in one boring box. We're here for the weird stuff—party chaos, creative tangents, and whatever that thing you can't quite explain is.
            </motion.p>

            {/* Image indicator dots - larger, more confident */}
            <motion.div
              className="flex justify-center gap-2 mb-10"
              variants={shouldReduceMotion ? {} : fadeIn}
            >
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center group"
                  aria-label={`View image ${i + 1}`}
                >
                  <span className={`transition-all duration-300 rounded-full ${
                    i === heroIndex
                      ? 'w-10 h-2.5 bg-white shadow-lg shadow-white/30'
                      : 'w-2.5 h-2.5 bg-white/40 group-hover:bg-white/70'
                  }`} />
                </button>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4 sm:px-0"
              variants={shouldReduceMotion ? {} : fadeIn}
            >
              <motion.a
                href="https://chat.slopgpt.com"
                className="px-8 py-4 bg-white text-[#1a1a1a] rounded-lg text-lg font-semibold w-full sm:w-auto sm:min-w-[200px] shadow-lg transition-all duration-200 text-center"
                whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                Start Creating
              </motion.a>
              <motion.a
                href="#examples"
                className="px-8 py-4 border-2 border-white/50 text-white rounded-lg text-lg font-semibold w-full sm:w-auto sm:min-w-[200px] transition-all duration-200 text-center"
                whileHover={shouldReduceMotion ? {} : { scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.8)' }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                See What's Possible
              </motion.a>
            </motion.div>

            <motion.p
              className="mt-6 text-sm text-white/60"
              variants={shouldReduceMotion ? {} : fadeIn}
            >
              No sign-up. No credit card. Just vibes.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Showcase Carousel */}
        <motion.section
          className="py-20 md:py-32 px-6 bg-gradient-to-b from-[#faf9f7] to-white overflow-hidden"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                Creative Chaos, Visualized
              </h2>
              <p className="text-[#666] text-lg">
                From dinosaur parties to medieval tech support. We make it happen.
              </p>
            </motion.div>

            {/* Carousel Container */}
            <div className="relative">
              {/* Main Carousel */}
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentSlide}
                    custom={direction}
                    initial={shouldReduceMotion ? {} : {
                      x: direction > 0 ? 1000 : -1000,
                      opacity: 0
                    }}
                    animate={{
                      x: 0,
                      opacity: 1
                    }}
                    exit={shouldReduceMotion ? {} : {
                      x: direction > 0 ? -1000 : 1000,
                      opacity: 0
                    }}
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    className="absolute inset-0"
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      {/* Background image */}
                      <img
                        src={showcaseItems[currentSlide].image}
                        alt={showcaseItems[currentSlide].title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* Overlay gradient for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Content overlay */}
                      <div className="relative w-full h-full flex flex-col items-center justify-end p-12 text-white">
                        <motion.div
                          className="max-w-2xl text-center mb-8"
                          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                            {showcaseItems[currentSlide].category}
                          </span>
                          <h3 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                            {showcaseItems[currentSlide].title}
                          </h3>
                          <p className="text-lg md:text-xl text-white/90 drop-shadow">
                            {showcaseItems[currentSlide].description}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows - Premium styled, responsive */}
                <motion.button
                  onClick={prevSlide}
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/90 md:bg-white rounded-lg flex items-center justify-center shadow-lg md:shadow-xl z-10 border border-[#e5e5e5]"
                  aria-label="Previous slide"
                  whileHover={{ scale: 1.05, x: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button
                  onClick={nextSlide}
                  className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/90 md:bg-white rounded-lg flex items-center justify-center shadow-lg md:shadow-xl z-10 border border-[#e5e5e5]"
                  aria-label="Next slide"
                  whileHover={{ scale: 1.05, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>

              {/* Dots Navigation - Premium styled */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {showcaseItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all min-w-[44px] min-h-[44px] flex items-center justify-center group`}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === currentSlide}
                  >
                    <span className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? 'w-10 h-2.5 bg-[#cc2936] shadow-lg shadow-[#cc2936]/30'
                        : 'w-2.5 h-2.5 bg-[#d5d5d5] group-hover:bg-[#999]'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Demo Chat Preview */}
        <motion.section
          className="py-20 md:py-32 px-6 bg-white"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="bg-[#fafaf8] rounded-2xl border border-[#e5e5e5] overflow-hidden shadow-xl"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Chat header */}
              <div className="px-6 py-4 border-b border-[#e5e5e5] flex items-center gap-3">
                <div className="flex items-center">
                  <span className="text-2xl" style={{ fontFamily: 'Caveat, cursive', fontWeight: 600, transform: 'rotate(-2deg)', color: '#cc2936' }}>Slop</span>
                  <span className="text-xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>GPT</span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#1a1a1a]">Agent</p>
                  <p className="text-xs text-[#888]">Usually responds instantly</p>
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
                          ? 'bg-[#1a1a1a] text-white rounded-br-md'
                          : 'bg-white border border-[#e5e5e5] rounded-bl-md'
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
                    <div className="bg-white border border-[#e5e5e5] px-4 py-3 rounded-2xl rounded-bl-md">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-[#999] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-[#999] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-[#999] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat input preview */}
              <div className="px-6 pb-6">
                <div className="flex items-center gap-3 bg-white border border-[#e5e5e5] rounded-xl px-4 py-2 transition-all duration-200 focus-within:border-[#cc2936] focus-within:ring-2 focus-within:ring-[#cc2936]/20">
                  <input
                    type="text"
                    placeholder="Ask me anything..."
                    className="flex-1 bg-transparent outline-none text-sm placeholder-[#999] min-h-[44px]"
                    disabled
                  />
                  <button className="w-11 h-11 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-white hover:bg-[#333] active:scale-95 transition-all duration-200 hover:shadow-lg hover:shadow-[#1a1a1a]/30" disabled>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className="py-20 md:py-32 px-6"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                Why talk to us?
              </h2>
              <p className="text-[#666] text-lg max-w-xl mx-auto">
                We're not trying to replace your job or become your therapist.
                We're just a helpful, slightly unhinged AI friend.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-12 h-12 text-[#cc2936]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                  ),
                  title: 'No Lock-In',
                  desc: 'We don\'t trap your data. Chat, get help, leave. Come back whenever. It\'s casual.'
                },
                {
                  icon: (
                    <svg className="w-12 h-12 text-[#cc2936]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                    </svg>
                  ),
                  title: 'Actually Creative',
                  desc: 'We\'ll help you brainstorm the weird stuff. Party themes, story ideas, that thing you can\'t quite describe.'
                },
                {
                  icon: (
                    <svg className="w-12 h-12 text-[#cc2936]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                    </svg>
                  ),
                  title: 'Fast & Direct',
                  desc: 'No 47-step onboarding. No premium tier to unlock "good" answers. Just start talking.'
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="p-10 bg-white rounded-xl border border-transparent shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-200"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={shouldReduceMotion ? {} : {
                    y: -8,
                    boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.12)',
                    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="mb-5">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-[#1a1a1a]">{feature.title}</h3>
                  <p className="text-[#555] leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Examples / Use Cases */}
        <motion.section
          id="examples"
          className="py-20 md:py-32 px-6 bg-white"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                Things people ask us
              </h2>
              <p className="text-[#666] text-lg">
                From the practical to the peculiar. We don't judge.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
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
                  className="p-8 bg-[#fafaf8] rounded-xl border border-transparent shadow-[0_2px_16px_rgba(0,0,0,0.04)] cursor-pointer group transition-all duration-200"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={shouldReduceMotion ? {} : {
                    y: -4,
                    boxShadow: '0 12px 32px -8px rgba(204, 41, 54, 0.15)',
                    transition: { duration: 0.2 }
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-xs font-semibold text-[#cc2936] uppercase tracking-wider">{item.category}</span>
                  <p className="mt-3 text-[#333] leading-relaxed text-lg group-hover:text-[#1a1a1a] transition-colors">{item.q}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          id="chat"
          className="py-20 md:py-32 px-6"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="max-w-2xl mx-auto text-center px-4 sm:px-0"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 md:mb-6">
              Ready to make some slop?
            </h2>
            <p className="text-[#666] text-base md:text-lg mb-8 md:mb-10">
              No account. No credit card. No judgment.
              <br />
              Just bring your weird ideas.
            </p>
            <motion.a
              href="https://chat.slopgpt.com"
              className="inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-[#cc2936] text-white rounded-lg text-base md:text-lg font-semibold transition-all duration-200 shadow-xl shadow-[#cc2936]/30 hover:shadow-2xl hover:shadow-[#cc2936]/40 w-full sm:w-auto"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Let's Get Started</span>
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.a>
            <p className="mt-8 text-sm text-[#999]">
              Questions? Hit us up at <a href="mailto:slop@slopgpt.com" className="text-[#cc2936] hover:underline py-3 px-1 min-h-[44px] inline-flex items-center">slop@slopgpt.com</a>
            </p>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer
        className="py-12 md:py-20 px-6 border-t border-[#e5e5e5]"
        role="contentinfo"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center">
              <span className="text-3xl" style={{ fontFamily: 'Caveat, cursive', fontWeight: 600, transform: 'rotate(-2deg)', color: '#cc2936' }}>Slop</span>
              <span className="text-2xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>GPT</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#666]">
              <a href="#features" className="hover:text-[#1a1a1a] transition-colors py-2 px-3 min-h-[44px] min-w-[44px] inline-flex items-center justify-center">Features</a>
              <a href="#examples" className="hover:text-[#1a1a1a] transition-colors py-2 px-3 min-h-[44px] min-w-[44px] inline-flex items-center justify-center">Examples</a>
              <a href="#chat" className="hover:text-[#1a1a1a] transition-colors py-2 px-3 min-h-[44px] min-w-[44px] inline-flex items-center justify-center">Chat</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#e5e5e5] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#999]">
            <p>A <a href="https://softworkstrading.com" className="text-[#666] hover:text-[#1a1a1a] transition-colors py-2 px-1 inline-flex items-center">Softworks Trading Company</a> project</p>
            <p className="text-[#bbb]">"The Slop Will Be Televised" © 2026</p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default App
