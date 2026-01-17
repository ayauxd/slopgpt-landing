import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import './index.css'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

function App() {
  const [showContactForm, setShowContactForm] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const animationProps = shouldReduceMotion
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : fadeUp

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1d1d1f]">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#1d1d1f] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus-ring"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/80 backdrop-blur-xl border-b border-black/5" role="navigation" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="text-xl font-semibold tracking-tight focus-ring rounded-md" aria-label="SlopGPT Home">
            SlopGPT
          </a>
          <div className="flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-muted hover:text-[#1d1d1f] transition-colors focus-ring rounded-md hidden sm:block">
              How it works
            </a>
            <a href="#use-cases" className="text-sm text-muted hover:text-[#1d1d1f] transition-colors focus-ring rounded-md hidden sm:block">
              Use cases
            </a>
            <a href="#contact" className="text-sm text-muted hover:text-[#1d1d1f] transition-colors focus-ring rounded-md hidden sm:block">
              Contact
            </a>
            <a
              href="#"
              className="text-sm bg-[#1d1d1f] text-white px-4 py-2 rounded-full hover:bg-black transition-colors focus-ring min-h-[44px] flex items-center"
              aria-label="Sign in to your account"
            >
              Sign In
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main id="main-content">
        <section className="pt-32 pb-24 px-6" aria-labelledby="hero-title">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={shouldReduceMotion ? {} : stagger}
          >
            <motion.p
              className="text-sm font-medium text-[#6366f1] mb-4 tracking-wide uppercase"
              variants={animationProps}
            >
              Bespoke AI Photo Experiences
            </motion.p>
            <motion.h1
              id="hero-title"
              className="text-5xl md:text-7xl font-semibold tracking-tight leading-snug mb-6"
              variants={animationProps}
            >
              Transform your events
              <br />
              <span className="text-gradient">with AI magic.</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
              variants={animationProps}
            >
              We design custom AI photo experiences that put your guests
              in impossible adventures. White-glove service for memorable events.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={animationProps}
            >
              <button
                onClick={() => setShowContactForm(true)}
                className="inline-flex items-center gap-2 bg-[#1d1d1f] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-black transition-colors focus-ring min-h-[56px]"
                aria-label="Start a conversation about your event"
              >
                Start a conversation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-[#6366f1] px-8 py-4 text-lg font-medium hover:underline focus-ring rounded-lg min-h-[56px]"
              >
                Learn more
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            className="max-w-5xl mx-auto mt-16"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] p-1">
              <div className="bg-[#1d1d1f] rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                <div className="text-center text-white/60 p-12">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="aspect-[3/4] bg-white/10 rounded-lg flex items-center justify-center">
                      <span className="text-4xl" role="img" aria-label="Dinosaur">🦖</span>
                    </div>
                    <div className="aspect-[3/4] bg-white/10 rounded-lg flex items-center justify-center">
                      <span className="text-4xl" role="img" aria-label="Space rocket">🚀</span>
                    </div>
                    <div className="aspect-[3/4] bg-white/10 rounded-lg flex items-center justify-center">
                      <span className="text-4xl" role="img" aria-label="Castle">🏰</span>
                    </div>
                  </div>
                  <p className="text-lg font-medium text-white/80">Custom themes for any event</p>
                  <p className="text-sm mt-2 text-white/40">Birthdays • Weddings • Corporate • Product Launches</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 px-6 bg-white" aria-labelledby="how-it-works-title">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 id="how-it-works-title" className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                How it works
              </h2>
              <p className="text-xl text-muted">
                A human-in-the-loop service for bespoke experiences
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
              {[
                {
                  step: '01',
                  title: 'Consult',
                  description: 'We learn about your event and design a custom theme together.',
                  icon: '💬'
                },
                {
                  step: '02',
                  title: 'Create',
                  description: 'Our team builds your branded AI experience with bespoke scenes.',
                  icon: '🎨'
                },
                {
                  step: '03',
                  title: 'Deploy',
                  description: 'You receive a private link or QR code for your guests.',
                  icon: '🔗'
                },
                {
                  step: '04',
                  title: 'Delight',
                  description: 'Guests upload photos and download AI-generated memories.',
                  icon: '✨'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  className="text-center"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-5xl mb-6" role="img" aria-hidden="true">{item.icon}</div>
                  <div className="text-sm font-medium text-[#6366f1] mb-2">{item.step}</div>
                  <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section id="use-cases" className="py-24 px-6" aria-labelledby="use-cases-title">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 id="use-cases-title" className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                Perfect for every event
              </h2>
              <p className="text-xl text-muted">
                Custom themes designed for your celebration
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Birthdays', icon: '🎂', desc: 'Themed adventures for milestone celebrations' },
                { name: 'Weddings', icon: '💒', desc: 'Romantic fantasy destinations for couples' },
                { name: 'Corporate', icon: '🏢', desc: 'Team building and brand activations' },
                { name: 'Product Launches', icon: '🚀', desc: 'Immersive experiences for new products' }
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 hover-lift text-center"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-4" role="img" aria-hidden="true">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-sm text-muted">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-24 px-6 bg-gradient-to-br from-[#667eea] to-[#764ba2]" aria-labelledby="contact-title">
          <motion.div
            className="max-w-3xl mx-auto text-center text-white"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="contact-title" className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              Ready to create magic?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Let's design a custom experience for your next event.
            </p>
            <button
              onClick={() => setShowContactForm(true)}
              className="inline-flex items-center gap-2 bg-white text-[#1d1d1f] px-8 py-4 rounded-full text-lg font-medium hover:bg-white/90 transition-colors focus-ring min-h-[56px]"
              aria-label="Open contact form"
            >
              Get in touch
            </button>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#1d1d1f] text-white/60" role="contentinfo">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-xl font-semibold text-white">SlopGPT</div>
            <div className="flex items-center gap-8 text-sm">
              <a href="#how-it-works" className="hover:text-white transition-colors focus-ring rounded-md">How it works</a>
              <a href="#contact" className="hover:text-white transition-colors focus-ring rounded-md">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p>© 2026 SlopGPT. A <a href="https://softworkstrading.com" className="text-white/80 hover:text-white transition-colors focus-ring">Softworks Trading Company</a> service.</p>
            <p className="text-white/40">agents@softworkstrading.com</p>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-form-title"
          onClick={() => setShowContactForm(false)}
        >
          <motion.div
            className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl"
            initial={shouldReduceMotion ? {} : { scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 id="contact-form-title" className="text-2xl font-semibold">Tell us about your event</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-[#86868b] hover:text-[#1d1d1f] text-2xl p-2 focus-ring rounded-lg"
                aria-label="Close dialog"
                type="button"
              >
                ×
              </button>
            </div>

            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4" role="img" aria-label="Sparkles">✨</div>
                <h4 className="text-xl font-semibold mb-2">Thanks for reaching out!</h4>
                <p className="text-muted">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  // Form submission logic here - for now just show success
                  setFormSubmitted(true)
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#1d1d1f] mb-1">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus-ring text-[#1d1d1f]"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#1d1d1f] mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus-ring text-[#1d1d1f]"
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="event-type" className="block text-sm font-medium text-[#1d1d1f] mb-1">
                    Event type
                  </label>
                  <select
                    id="event-type"
                    name="event-type"
                    required
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus-ring text-[#1d1d1f] bg-white"
                  >
                    <option value="">Select event type</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="product-launch">Product Launch</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="guest-count" className="block text-sm font-medium text-[#1d1d1f] mb-1">
                    Estimated guest count
                  </label>
                  <select
                    id="guest-count"
                    name="guest-count"
                    required
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus-ring text-[#1d1d1f] bg-white"
                  >
                    <option value="">Select range</option>
                    <option value="1-25">1-25 guests</option>
                    <option value="26-50">26-50 guests</option>
                    <option value="51-100">51-100 guests</option>
                    <option value="100+">100+ guests</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#1d1d1f] mb-1">
                    Tell us about your vision
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg focus-ring text-[#1d1d1f] resize-none"
                    placeholder="Describe your event theme, date, or any special requests..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1d1d1f] text-white px-6 py-4 rounded-full text-lg font-medium hover:bg-black transition-colors focus-ring min-h-[56px]"
                >
                  Send inquiry
                </button>
                <p className="text-center text-sm text-muted">
                  Or email us directly at{' '}
                  <a href="mailto:agents@softworkstrading.com" className="text-[#6366f1] hover:underline focus-ring">
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
