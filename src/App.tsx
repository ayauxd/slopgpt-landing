import { motion } from 'framer-motion'
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
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1d1d1f]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="text-xl font-semibold tracking-tight">
            SlopGPT
          </a>
          <div className="flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-[#86868b] hover:text-[#1d1d1f] transition-colors">
              How it works
            </a>
            <a href="#demo" className="text-sm text-[#86868b] hover:text-[#1d1d1f] transition-colors">
              Demo
            </a>
            <a
              href="https://kai.slopgpt.com"
              className="text-sm bg-[#1d1d1f] text-white px-4 py-2 rounded-full hover:bg-black transition-colors"
            >
              Try Kai
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.p
            className="text-sm font-medium text-[#6366f1] mb-4 tracking-wide uppercase"
            variants={fadeUp}
          >
            AI-Powered Photo Experiences
          </motion.p>
          <motion.h1
            className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-6"
            variants={fadeUp}
          >
            Create unforgettable
            <br />
            <span className="text-gradient">moments.</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-[#86868b] max-w-2xl mx-auto mb-10 leading-relaxed"
            variants={fadeUp}
          >
            Transform your events with AI-generated photos that put your guests
            in impossible adventures.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeUp}
          >
            <a
              href="https://kai.slopgpt.com"
              className="inline-flex items-center gap-2 bg-[#1d1d1f] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-black transition-colors"
            >
              See it in action
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-[#6366f1] px-8 py-4 text-lg font-medium hover:underline"
            >
              Learn more
            </a>
          </motion.div>
        </motion.div>

        {/* Hero Image/Video */}
        <motion.div
          className="max-w-5xl mx-auto mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] p-1">
            <div className="bg-[#1d1d1f] rounded-xl overflow-hidden aspect-video flex items-center justify-center">
              <div className="text-center text-white/60 p-12">
                <div className="text-6xl mb-4">🦖</div>
                <p className="text-lg">Kai's Jurassic Birthday</p>
                <p className="text-sm mt-2 text-white/40">Live demo at kai.slopgpt.com</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              How it works
            </h2>
            <p className="text-xl text-[#86868b]">
              Three simple steps to magic
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Upload',
                description: 'Guests snap a quick selfie or group photo at your event.',
                icon: '📸'
              },
              {
                step: '02',
                title: 'Choose',
                description: 'Pick from themed adventures designed for your celebration.',
                icon: '🎬'
              },
              {
                step: '03',
                title: 'Share',
                description: 'Download and share AI-generated memories on social.',
                icon: '✨'
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <div className="text-sm font-medium text-[#6366f1] mb-2">{item.step}</div>
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-[#86868b] leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-24 px-6 bg-[#1d1d1f] text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              See it live
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Kai's Jurassic Birthday is our first experience. Guests become dinosaur adventurers
              in seconds.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {['Birthday Chase', 'Raptor Party', 'Brachio-Gift'].map((scene, index) => (
              <div
                key={scene}
                className="bg-white/5 rounded-xl p-6 border border-white/10 hover-lift cursor-pointer"
              >
                <div className="aspect-[3/4] bg-white/10 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">{['🦖', '🦕', '🌿'][index]}</span>
                </div>
                <p className="font-medium">{scene}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a
              href="https://kai.slopgpt.com"
              className="inline-flex items-center gap-2 bg-white text-[#1d1d1f] px-8 py-4 rounded-full text-lg font-medium hover:bg-white/90 transition-colors"
            >
              Try the demo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              Perfect for every event
            </h2>
            <p className="text-xl text-[#86868b]">
              Custom themes for any celebration
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Birthdays', icon: '🎂', desc: 'Themed adventures for any age' },
              { name: 'Weddings', icon: '💒', desc: 'Romantic fantasy destinations' },
              { name: 'Corporate', icon: '🏢', desc: 'Team building experiences' },
              { name: 'Parties', icon: '🎉', desc: 'Any theme you can imagine' }
            ].map((item, index) => (
              <motion.div
                key={item.name}
                className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 hover-lift text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-sm text-[#86868b]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#667eea] to-[#764ba2]">
        <motion.div
          className="max-w-3xl mx-auto text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Ready to create magic?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Let's build a custom experience for your next event.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@slopgpt.com"
              className="inline-flex items-center gap-2 bg-white text-[#1d1d1f] px-8 py-4 rounded-full text-lg font-medium hover:bg-white/90 transition-colors"
            >
              Get in touch
            </a>
            <a
              href="https://kai.slopgpt.com"
              className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/30 transition-colors border border-white/30"
            >
              Try the demo
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#1d1d1f] text-white/60">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-xl font-semibold text-white">SlopGPT</div>
            <div className="flex items-center gap-8 text-sm">
              <a href="https://kai.slopgpt.com" className="hover:text-white transition-colors">Demo</a>
              <a href="mailto:hello@slopgpt.com" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm">
            © 2026 SlopGPT. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
