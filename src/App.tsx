import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import './index.css'

// Tesla/Apple-inspired dark theme
// Minimal color palette: black, white, single accent

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
}

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
}

// Sample generated images (placeholders - replace with real examples)
const showcaseItems = [
  { id: 1, title: 'Jurassic Adventure', category: 'Birthday', emoji: '🦖' },
  { id: 2, title: 'Space Explorer', category: 'Corporate', emoji: '🚀' },
  { id: 3, title: 'Medieval Quest', category: 'Wedding', emoji: '🏰' },
  { id: 4, title: 'Safari Journey', category: 'Product Launch', emoji: '🦁' },
  { id: 5, title: 'Ocean Discovery', category: 'Birthday', emoji: '🐋' },
  { id: 6, title: 'Future City', category: 'Corporate', emoji: '🌆' },
]

function App() {
  const [showContactForm, setShowContactForm] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-sm"
      >
        Skip to main content
      </a>

      {/* Navigation - Tesla style: minimal, transparent */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md" role="navigation">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-medium tracking-tight">
            SlopGPT
          </a>
          <div className="flex items-center gap-8">
            <a href="#showcase" className="text-sm text-white/60 hover:text-white transition-colors hidden md:block">
              Showcase
            </a>
            <a href="#how-it-works" className="text-sm text-white/60 hover:text-white transition-colors hidden md:block">
              How It Works
            </a>
            <a href="#contact" className="text-sm text-white/60 hover:text-white transition-colors hidden md:block">
              Contact
            </a>
            <a
              href="#"
              className="text-sm px-4 py-2 bg-white text-black rounded-sm font-medium hover:bg-white/90 transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </nav>

      <main id="main-content">
        {/* Hero - Tesla style: large, cinematic, minimal text */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-16">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={shouldReduceMotion ? {} : stagger}
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] mb-8"
              variants={shouldReduceMotion ? {} : fadeIn}
            >
              AI Photo Experiences
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
              variants={shouldReduceMotion ? {} : fadeIn}
            >
              Transform your guests into the heroes of impossible adventures.
              Bespoke AI photo generation for memorable events.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={shouldReduceMotion ? {} : fadeIn}
            >
              <button
                onClick={() => setShowContactForm(true)}
                className="px-8 py-4 bg-white text-black rounded-sm text-lg font-medium hover:bg-white/90 transition-colors min-w-[200px]"
              >
                Get Started
              </button>
              <a
                href="#showcase"
                className="px-8 py-4 border border-white/20 rounded-sm text-lg font-medium hover:border-white/40 transition-colors min-w-[200px]"
              >
                View Showcase
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-2">
              <motion.div
                className="w-1 h-2 bg-white/60 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </section>

        {/* Showcase Grid - YouTube/Media style cards */}
        <section id="showcase" className="py-32 px-6 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
                Showcase
              </h2>
              <p className="text-white/50 text-lg">
                Custom themes designed for any event
              </p>
            </motion.div>

            {/* Media Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {showcaseItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="group relative aspect-video bg-[#141414] rounded-sm overflow-hidden cursor-pointer"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Placeholder for video/image - replace with real media */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]">
                    <span className="text-6xl">{item.emoji}</span>
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{item.category}</p>
                      <h3 className="text-lg font-medium">{item.title}</h3>
                    </div>
                  </div>

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-12"
              initial={shouldReduceMotion ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setShowContactForm(true)}
                className="px-8 py-3 border border-white/20 rounded-sm font-medium hover:border-white/40 transition-colors"
              >
                Request Custom Theme
              </button>
            </motion.div>
          </div>
        </section>

        {/* How It Works - Clean, minimal steps */}
        <section id="how-it-works" className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
                How It Works
              </h2>
              <p className="text-white/50 text-lg">
                A premium, human-in-the-loop service
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8 lg:gap-16">
              {[
                { step: '01', title: 'Consult', desc: 'We design your custom theme together based on your event vision.' },
                { step: '02', title: 'Create', desc: 'Our team builds a bespoke AI experience with unique scenes.' },
                { step: '03', title: 'Deploy', desc: 'You receive a private link or QR code for your guests.' },
                { step: '04', title: 'Delight', desc: 'Guests upload photos and download AI-generated memories.' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  className="text-center md:text-left"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-white/20 text-6xl font-light mb-4">{item.step}</div>
                  <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats/Social Proof */}
        <section className="py-20 px-6 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '500+', label: 'Events Powered' },
                { value: '10K+', label: 'Photos Generated' },
                { value: '98%', label: 'Guest Satisfaction' },
                { value: '24hr', label: 'Turnaround' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-medium mb-2">{stat.value}</div>
                  <div className="text-white/40 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
                Perfect For
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Birthdays', desc: 'Themed adventures for milestone celebrations' },
                { name: 'Weddings', desc: 'Romantic fantasy destinations for couples' },
                { name: 'Corporate', desc: 'Team building and brand activations' },
                { name: 'Product Launches', desc: 'Immersive experiences for new products' },
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  className="p-8 bg-[#0a0a0a] rounded-sm border border-white/5 hover:border-white/10 transition-colors"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-medium mb-2">{item.name}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-32 px-6 bg-[#0a0a0a]">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
              Ready to create magic?
            </h2>
            <p className="text-white/50 text-lg mb-10">
              Let's design a custom experience for your next event.
            </p>
            <button
              onClick={() => setShowContactForm(true)}
              className="px-10 py-4 bg-white text-black rounded-sm text-lg font-medium hover:bg-white/90 transition-colors"
            >
              Get Started
            </button>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5" role="contentinfo">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-xl font-medium">SlopGPT</div>
            <div className="flex items-center gap-8 text-sm text-white/40">
              <a href="#showcase" className="hover:text-white transition-colors">Showcase</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
            <p>A <a href="https://softworkstrading.com" className="text-white/50 hover:text-white transition-colors">Softworks Trading Company</a> service</p>
            <p>agents@softworkstrading.com</p>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowContactForm(false)}
        >
          <motion.div
            className="bg-[#0a0a0a] border border-white/10 rounded-sm w-full max-w-lg p-8"
            initial={shouldReduceMotion ? {} : { scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-medium">Get Started</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-white/40 hover:text-white text-2xl p-2"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            {formSubmitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✓</div>
                <h4 className="text-xl font-medium mb-2">Thanks for reaching out</h4>
                <p className="text-white/50">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setFormSubmitted(true)
                }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm text-white/60 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-white placeholder-white/30 focus:border-white/30 focus:outline-none"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-white/60 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-white placeholder-white/30 focus:border-white/30 focus:outline-none"
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="event-type" className="block text-sm text-white/60 mb-2">
                    Event Type
                  </label>
                  <select
                    id="event-type"
                    name="event-type"
                    required
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-white focus:border-white/30 focus:outline-none"
                  >
                    <option value="">Select type</option>
                    <option value="birthday">Birthday</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="product-launch">Product Launch</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-white/60 mb-2">
                    Tell us about your event
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-white placeholder-white/30 focus:border-white/30 focus:outline-none resize-none"
                    placeholder="Date, theme ideas, guest count..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-white text-black rounded-sm font-medium hover:bg-white/90 transition-colors"
                >
                  Send Inquiry
                </button>
                <p className="text-center text-sm text-white/40">
                  Or email directly at{' '}
                  <a href="mailto:agents@softworkstrading.com" className="text-white/60 hover:text-white">
                    agents@softworkstrading.com
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default App
