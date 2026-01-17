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

function App() {
  const shouldReduceMotion = useReducedMotion()
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const [isTyping, setIsTyping] = useState(false)

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right

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
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1a1a]">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#1a1a1a] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Navigation - Clean, Anthropic-style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f7]/80 backdrop-blur-md border-b border-[#e5e5e5]" role="navigation">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <span className="text-2xl" style={{ fontFamily: 'Caveat, cursive', fontWeight: 600, transform: 'rotate(-2deg)', color: '#cc2936' }}>Slop</span>
            <span className="text-xl font-semibold tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>GPT</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors hidden md:block">
              Features
            </a>
            <a href="#examples" className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors hidden md:block">
              Examples
            </a>
            <a
              href="#chat"
              className="text-sm px-4 py-2 bg-[#1a1a1a] text-white rounded-lg font-medium hover:bg-[#333] transition-colors"
            >
              Start Chatting
            </a>
          </div>
        </div>
      </nav>

      <main id="main-content">
        {/* Hero - Anthropic style with humor */}
        <motion.section
          className="min-h-screen flex flex-col items-center justify-center px-6 pt-16"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={shouldReduceMotion ? {} : stagger}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#cc2936]/10 text-[#cc2936] rounded-full text-sm font-medium mb-8"
              variants={shouldReduceMotion ? {} : fadeIn}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cc2936] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#cc2936]"></span>
              </span>
              The Slop Will Be Televised
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] mb-6"
              variants={shouldReduceMotion ? {} : fadeIn}
            >
              AI that doesn't take
              <br />
              <span className="text-[#cc2936]">itself too seriously</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-[#666] max-w-xl mx-auto mb-10 leading-relaxed"
              variants={shouldReduceMotion ? {} : fadeIn}
            >
              Most AI apps are single-use tools with lock-in.
              We're just here to help you have fun, get stuff done, and maybe
              make something weird along the way.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={shouldReduceMotion ? {} : fadeIn}
            >
              <a
                href="#chat"
                className="px-8 py-4 bg-[#1a1a1a] text-white rounded-xl text-lg font-medium hover:bg-[#333] transition-colors min-w-[200px] shadow-lg shadow-[#1a1a1a]/20"
              >
                Talk to Our Agent
              </a>
              <a
                href="#examples"
                className="px-8 py-4 border border-[#ddd] rounded-xl text-lg font-medium hover:border-[#bbb] transition-colors min-w-[200px]"
              >
                See Examples
              </a>
            </motion.div>

            <motion.p
              className="mt-6 text-sm text-[#999]"
              variants={shouldReduceMotion ? {} : fadeIn}
            >
              No sign-up required. Just start chatting.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Showcase Carousel */}
        <motion.section
          className="py-20 px-6 bg-gradient-to-b from-[#faf9f7] to-white overflow-hidden"
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

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all hover:scale-110 shadow-lg z-10"
                  aria-label="Previous slide"
                >
                  <svg className="w-6 h-6 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all hover:scale-110 shadow-lg z-10"
                  aria-label="Next slide"
                >
                  <svg className="w-6 h-6 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Dots Navigation */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {showcaseItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all ${
                      index === currentSlide
                        ? 'w-8 h-3 bg-[#cc2936] rounded-full'
                        : 'w-3 h-3 bg-[#ddd] hover:bg-[#bbb] rounded-full'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === currentSlide}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Demo Chat Preview */}
        <motion.section
          className="py-20 px-6 bg-white"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="bg-[#faf9f7] rounded-2xl border border-[#e5e5e5] overflow-hidden shadow-xl"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Chat header */}
              <div className="px-6 py-4 border-b border-[#e5e5e5] flex items-center gap-3">
                <div className="flex items-center">
                  <span className="text-lg" style={{ fontFamily: 'Caveat, cursive', fontWeight: 600, transform: 'rotate(-2deg)', color: '#cc2936' }}>Slop</span>
                  <span className="text-base font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>GPT</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Agent</p>
                  <p className="text-xs text-[#999]">Usually responds instantly</p>
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
                <div className="flex items-center gap-3 bg-white border border-[#e5e5e5] rounded-xl px-4 py-3 transition-all duration-200 focus-within:border-[#cc2936] focus-within:ring-2 focus-within:ring-[#cc2936]/20">
                  <input
                    type="text"
                    placeholder="Ask me anything..."
                    className="flex-1 bg-transparent outline-none text-sm placeholder-[#999]"
                    disabled
                  />
                  <button className="w-8 h-8 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-white hover:bg-[#333] active:scale-95 transition-all duration-200 hover:shadow-lg hover:shadow-[#1a1a1a]/30">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className="py-32 px-6"
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
                    <svg className="w-10 h-10 text-[#cc2936]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                  ),
                  title: 'No Lock-In',
                  desc: 'We don\'t trap your data. Chat, get help, leave. Come back whenever. It\'s casual.'
                },
                {
                  icon: (
                    <svg className="w-10 h-10 text-[#cc2936]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                    </svg>
                  ),
                  title: 'Actually Creative',
                  desc: 'We\'ll help you brainstorm the weird stuff. Party themes, story ideas, that thing you can\'t quite describe.'
                },
                {
                  icon: (
                    <svg className="w-10 h-10 text-[#cc2936]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                    </svg>
                  ),
                  title: 'Fast & Direct',
                  desc: 'No 47-step onboarding. No premium tier to unlock "good" answers. Just start talking.'
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="p-8 bg-white rounded-2xl border border-[#e5e5e5] hover:border-[#ccc] transition-colors shadow-sm"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={shouldReduceMotion ? {} : {
                    y: -8,
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-[#666] leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Examples / Use Cases */}
        <motion.section
          id="examples"
          className="py-32 px-6 bg-white"
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
                  className="p-6 bg-[#faf9f7] rounded-xl border border-[#e5e5e5] hover:border-[#cc2936]/30 transition-colors cursor-pointer group"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-xs font-medium text-[#cc2936] uppercase tracking-wider">{item.category}</span>
                  <p className="mt-2 text-[#1a1a1a] leading-relaxed group-hover:text-[#cc2936] transition-colors">{item.q}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          id="chat"
          className="py-32 px-6"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
              Ready to chat?
            </h2>
            <p className="text-[#666] text-lg mb-10">
              No account needed. No credit card. No catch.
              <br />
              Just a conversation waiting to happen.
            </p>
            <a
              href="mailto:agents@softworkstrading.com"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#1a1a1a] text-white rounded-xl text-lg font-medium hover:bg-[#333] transition-colors shadow-xl shadow-[#1a1a1a]/20"
            >
              <span>Talk to Our Agent</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <p className="mt-8 text-sm text-[#999]">
              Or email us at <a href="mailto:agents@softworkstrading.com" className="text-[#cc2936] hover:underline">agents@softworkstrading.com</a>
            </p>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer
        className="py-16 px-6 border-t border-[#e5e5e5]"
        role="contentinfo"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center">
              <span className="text-xl" style={{ fontFamily: 'Caveat, cursive', fontWeight: 600, transform: 'rotate(-2deg)', color: '#cc2936' }}>Slop</span>
              <span className="text-lg font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>GPT</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[#666]">
              <a href="#features" className="hover:text-[#1a1a1a] transition-colors">Features</a>
              <a href="#examples" className="hover:text-[#1a1a1a] transition-colors">Examples</a>
              <a href="#chat" className="hover:text-[#1a1a1a] transition-colors">Chat</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#e5e5e5] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#999]">
            <p>A <a href="https://softworkstrading.com" className="text-[#666] hover:text-[#1a1a1a] transition-colors">Softworks Trading Company</a> project</p>
            <p className="text-[#bbb]">"The Slop Will Be Televised" © 2026</p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default App
