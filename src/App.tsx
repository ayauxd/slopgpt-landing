import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { SlopLogo } from './components'

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
    <div className="min-h-screen bg-white text-neutral-900 transition-all duration-500">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-void focus:text-cream focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Navigation - Clean, minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200" role="navigation">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 min-h-[44px] py-2 group">
            <SlopLogo size="sm" animate={false} variant="light" />
          </a>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors hidden md:block min-h-[44px] flex items-center">
              Features
            </a>
            <a href="#examples" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors hidden md:block min-h-[44px] flex items-center">
              Examples
            </a>
            <MotionLink
              to="/chat"
              className="text-sm px-5 py-3 min-h-[44px] inline-flex items-center bg-rose-600 text-white rounded-lg font-semibold transition-all duration-200 hover:bg-rose-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Try it free
            </MotionLink>
          </div>
        </div>
      </nav>

      <main id="main-content">
        {/* Hero - Clean, conversion-focused */}
        <motion.section
          ref={heroRef}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-white"
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-sm font-medium"
                variants={shouldReduceMotion ? {} : fadeIn}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                Now in beta
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-neutral-900"
                variants={shouldReduceMotion ? {} : fadeIn}
              >
                AI that doesn't take itself{' '}
                <span className="text-rose-600">too seriously</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed"
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
                  className="px-8 py-4 bg-rose-600 text-white rounded-lg text-lg font-semibold shadow-lg shadow-rose-600/25 transition-all duration-200 inline-flex items-center gap-2 hover:bg-rose-700 hover:shadow-xl hover:shadow-rose-600/30"
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
                  className="px-8 py-4 border border-neutral-300 text-neutral-700 rounded-lg text-lg font-medium transition-all duration-200 inline-flex items-center hover:border-neutral-400 hover:bg-neutral-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  See examples
                </motion.a>
              </motion.div>

              <motion.p
                className="text-sm text-neutral-500"
                variants={shouldReduceMotion ? {} : fadeIn}
              >
                No sign-up required. Free to use.
              </motion.p>
            </motion.div>
          </div>
        </motion.section>

        {/* Value Proposition - Clean comparison */}
        <motion.section
          className="py-16 md:py-24 px-6 bg-neutral-50"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-neutral-900">
              What makes us different
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left side - Other AI */}
              <motion.div
                className="relative"
                initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-white border border-neutral-200 rounded-2xl p-8 h-full">
                  <h3 className="text-xl font-semibold mb-4 text-neutral-400">
                    Other AI assistants
                  </h3>
                  <ul className="space-y-3 text-neutral-500">
                    <li className="flex items-start gap-3">
                      <span className="text-neutral-300">—</span>
                      <span>Overly formal responses</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-neutral-300">—</span>
                      <span>Won't help with "weird" requests</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-neutral-300">—</span>
                      <span>No personality</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-neutral-300">—</span>
                      <span>Requires sign-up</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Right side - SlopGPT */}
              <motion.div
                className="relative"
                initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-white border-2 border-rose-200 rounded-2xl p-8 h-full shadow-lg shadow-rose-100">
                  <h3 className="text-xl font-semibold mb-4 text-rose-600">
                    SlopGPT
                  </h3>
                  <ul className="space-y-3 text-neutral-700">
                    <li className="flex items-start gap-3">
                      <span className="text-rose-500">✓</span>
                      <span>Helpful and actually fun</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-rose-500">✓</span>
                      <span>Embraces creative requests</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-rose-500">✓</span>
                      <span>Has a personality</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-rose-500">✓</span>
                      <span>No sign-up needed</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Gallery - Clean grid */}
        <motion.section
          id="gallery"
          className="py-16 md:py-24 px-6 bg-white"
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
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-neutral-900">
                What people create
              </h2>
              <p className="text-neutral-600 text-lg">
                From party planning to creative writing. Real examples from real users.
              </p>
            </motion.div>

            {/* Clean grid */}
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
                  <div className="relative rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 hover:border-rose-200 transition-colors">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <span className="inline-block px-2 py-1 bg-rose-600/90 rounded text-xs font-medium mb-2">
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

        {/* Demo Chat Preview */}
        <motion.section
          className="py-16 md:py-24 px-6 bg-neutral-50"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xl"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Chat header */}
              <div className="px-6 py-4 border-b border-neutral-200 flex items-center gap-3">
                <SlopLogo size="sm" animate={false} variant="light" />
                <div>
                  <p className="font-semibold text-sm text-neutral-900">SlopGPT</p>
                  <p className="text-xs text-neutral-500">Usually responds instantly</p>
                </div>
              </div>

              {/* Chat messages */}
              <div className="p-6 space-y-4 min-h-[320px] bg-neutral-50">
                {demoConversation.slice(0, visibleMessages).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={shouldReduceMotion ? {} : {
                      opacity: 0,
                      x: msg.role === 'user' ? 20 : -20
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-rose-600 text-white rounded-br-md'
                          : 'bg-white border border-neutral-200 text-neutral-700 rounded-bl-md'
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
                    <div className="bg-white border border-neutral-200 px-4 py-3 rounded-2xl rounded-bl-md">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat input preview */}
              <div className="px-6 pb-6 bg-neutral-50">
                <div className="flex items-center gap-3 bg-white border border-neutral-200 rounded-xl px-4 py-2 transition-all duration-200 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20">
                  <input
                    type="text"
                    placeholder="Ask me anything..."
                    aria-label="Chat message input"
                    className="flex-1 bg-transparent outline-none text-sm text-neutral-900 placeholder-neutral-400 min-h-[44px]"
                    disabled
                  />
                  <button
                    className="w-11 h-11 bg-rose-600 rounded-lg flex items-center justify-center text-white hover:bg-rose-700 active:scale-95 transition-all duration-200"
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

        {/* Features - Clean grid */}
        <motion.section
          id="features"
          className="py-16 md:py-24 px-6 bg-white"
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
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-neutral-900">
                Why people choose us
              </h2>
              <p className="text-neutral-600 text-lg max-w-xl mx-auto">
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
                  className="p-8 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-rose-200 transition-colors"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-3 text-neutral-900">{feature.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Examples / Use Cases */}
        <motion.section
          id="examples"
          className="py-16 md:py-24 px-6 bg-neutral-50"
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
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-neutral-900">
                What people ask us
              </h2>
              <p className="text-neutral-600 text-lg">
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
                  className="p-6 bg-white rounded-xl border border-neutral-200 hover:border-rose-200 cursor-pointer group transition-all duration-200"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">{item.category}</span>
                  <p className="mt-3 text-neutral-700 leading-relaxed text-lg group-hover:text-neutral-900 transition-colors">{item.q}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section - Clean and focused */}
        <motion.section
          id="chat"
          className="py-20 md:py-28 px-6 bg-rose-600"
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
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-rose-600 rounded-lg text-lg font-semibold transition-all duration-200 hover:bg-rose-50"
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

      {/* Footer - Clean and minimal */}
      <footer className="py-12 px-6 border-t border-neutral-200 bg-white" role="contentinfo">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <SlopLogo size="md" animate={false} variant="light" />
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <a href="#features" className="hover:text-neutral-900 transition-colors py-2">Features</a>
              <a href="#examples" className="hover:text-neutral-900 transition-colors py-2">Examples</a>
              <a href="mailto:hello@slopgpt.com" className="hover:text-neutral-900 transition-colors py-2">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
            <p>A <a href="https://softworkstrading.com" className="hover:text-neutral-600 transition-colors">Softworks Trading Company</a> project</p>
            <p>© 2025 SlopGPT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
