import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MICROCOPY } from '../constants/microcopy'
import { SlopLogo, ThemeToggle } from '../components'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface LeadData {
  name: string
  email: string
  phone: string
  eventType: string
  theme: string
  date: string
  guestCount: string
  location: string
  budget: string
  conversationSummary: string
}

const INITIAL_MESSAGE: Message = {
  id: 'initial',
  role: 'assistant',
  content: MICROCOPY.chat.welcomeMessage,
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [leadData, setLeadData] = useState<LeadData>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    theme: '',
    date: '',
    guestCount: '',
    location: '',
    budget: '',
    conversationSummary: '',
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages.slice(1), userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await response.json()

      if (data.message) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message,
        }
        setMessages((prev) => [...prev, assistantMessage])

        const lowerContent = data.message.toLowerCase()
        if (
          (lowerContent.includes('email') && lowerContent.includes('name')) ||
          lowerContent.includes('reach out') ||
          lowerContent.includes('get in touch') ||
          lowerContent.includes("i've got everything")
        ) {
          extractLeadDataFromConversation([...messages, userMessage, assistantMessage])
          setTimeout(() => setShowLeadForm(true), 1000)
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `${MICROCOPY.error.network} you can also ${MICROCOPY.buttons.contactUs} at hello@slopgpt.com`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const extractLeadDataFromConversation = (msgs: Message[]) => {
    const fullConversation = msgs.map((m) => `${m.role}: ${m.content}`).join('\n')
    setLeadData((prev) => ({
      ...prev,
      conversationSummary: fullConversation,
    }))
  }

  const submitLead = async () => {
    if (!leadData.name || !leadData.email) return

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      })

      if (response.ok) {
        setLeadSubmitted(true)
        setShowLeadForm(false)
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: `${MICROCOPY.success.submitted} we'll hit up ${leadData.email} within 24 hours. ${leadData.name}, let's make something unhinged together.`,
          },
        ])
      }
    } catch (error) {
      console.error('Lead submission error:', error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col">
      {/* Header - Minimal, logo-focused */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur-xl border-b border-[var(--color-border-subtle)]">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center min-h-[44px]">
            <SlopLogo size="sm" />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/"
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors flex items-center gap-1.5 min-h-[44px]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-1 pt-14 pb-28 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4">
          {/* Messages */}
          <div className="py-6 space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Assistant avatar */}
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8A5B] flex items-center justify-center shadow-lg shadow-[#FF6B35]/20">
                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] sm:max-w-[70%] ${
                      message.role === 'user'
                        ? 'bg-[var(--color-accent)] text-white rounded-2xl rounded-br-md px-4 py-3'
                        : 'text-[var(--color-text)] py-1'
                    }`}
                  >
                    <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex-shrink-0 mr-3 mt-1">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8A5B] flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 py-3">
                  <motion.span
                    className="w-2 h-2 bg-[var(--color-accent)] rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-[var(--color-accent)] rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-[var(--color-accent)] rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                  />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Lead Capture Form Modal */}
      <AnimatePresence>
        {showLeadForm && !leadSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLeadForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-semibold mb-2 text-[var(--color-text)]">Almost there!</h2>
              <p className="text-[var(--color-text-muted)] text-sm mb-6">
                Share your details and we'll reach out within 24 hours.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                    Name <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <input
                    type="text"
                    value={leadData.name}
                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] rounded-xl focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[#FF6B35]/20 transition-all placeholder-[var(--color-text-muted)]"
                    placeholder={MICROCOPY.placeholders.name}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                    Email <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <input
                    type="email"
                    value={leadData.email}
                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] rounded-xl focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[#FF6B35]/20 transition-all placeholder-[var(--color-text-muted)]"
                    placeholder={MICROCOPY.placeholders.email}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                    Phone <span className="text-[var(--color-text-muted)]">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={leadData.phone}
                    onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] rounded-xl focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[#FF6B35]/20 transition-all placeholder-[var(--color-text-muted)]"
                    placeholder={MICROCOPY.placeholders.phone}
                  />
                </div>

                <motion.button
                  onClick={submitLead}
                  disabled={!leadData.name || !leadData.email}
                  className="w-full py-3.5 bg-[var(--color-accent)] text-white rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:bg-[var(--color-accent-hover)]"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {MICROCOPY.buttons.submit}
                </motion.button>

                <button
                  onClick={() => setShowLeadForm(false)}
                  className="w-full py-2 text-[var(--color-text-muted)] text-sm hover:text-[var(--color-text-muted)] transition-colors"
                >
                  I'll keep chatting first
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area - Clean, minimal */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)] to-transparent pt-6 pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-3xl mx-auto px-4 pb-4">
          <div className="relative">
            <div className="flex items-center gap-3 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl px-4 py-2 shadow-lg shadow-black/20 focus-within:border-[#FF6B35]/50 focus-within:ring-2 focus-within:ring-[#FF6B35]/10 transition-all">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={leadSubmitted ? MICROCOPY.success.sent : "Type something..."}
                disabled={leadSubmitted}
                className="flex-1 bg-transparent outline-none text-[15px] text-[var(--color-text)] placeholder-[var(--color-text-muted)] min-h-[44px] disabled:cursor-not-allowed"
              />
              <motion.button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading || leadSubmitted}
                className="w-10 h-10 flex-shrink-0 bg-[var(--color-accent)] rounded-xl flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:bg-[var(--color-accent-hover)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Send message"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
          <p className="text-center text-[10px] text-[var(--color-text-muted)] mt-3 tracking-wide">
            Powered by Claude AI
          </p>
        </div>
      </div>
    </div>
  )
}
