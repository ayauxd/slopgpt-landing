import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MICROCOPY, getRandomRotation } from '../constants/microcopy'

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

        // Check if the AI is asking for contact details (lead capture trigger)
        const lowerContent = data.message.toLowerCase()
        if (
          (lowerContent.includes('email') && lowerContent.includes('name')) ||
          lowerContent.includes('reach out') ||
          lowerContent.includes('get in touch') ||
          lowerContent.includes("i've got everything")
        ) {
          // Extract any event details mentioned in the conversation
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
    <div className="min-h-screen bg-void text-cream flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-void/80 backdrop-blur-md border-b border-void-lighter">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center min-h-[44px] py-2 group">
            <span
              className="text-3xl font-accent transition-transform duration-200 group-hover:scale-105"
              style={{
                fontWeight: 700,
                transform: 'rotate(-2deg)',
                color: '#FF6B35',
              }}
            >
              Slop
            </span>
            <span className="text-2xl font-bold text-cream">
              GPT
            </span>
          </Link>
          <Link
            to="/"
            className="text-sm text-cream-muted hover:text-cream transition-colors min-h-[44px] flex items-center"
          >
            ← {MICROCOPY.nav.home}
          </Link>
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-1 pt-16 pb-32 sm:pb-28 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4">
          {/* Messages */}
          <div className="py-6 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-slop text-void rounded-br-md'
                        : 'bg-void-light border border-void-lighter text-cream rounded-bl-md shadow-sm'
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-void-light border border-void-lighter px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                  <div className="flex gap-1.5">
                    <span
                      className="w-2 h-2 bg-slop rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="w-2 h-2 bg-slop rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-2 h-2 bg-slop rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLeadForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-void-lighter border border-void-lighter rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-2 text-cream font-display inline-block" style={{ transform: getRandomRotation('subtle') }}>almost there!</h2>
              <p className="text-cream/70 mb-6 inline-block" style={{ transform: getRandomRotation('subtle') }}>
                share your deets and we'll hit you up within 24 hours.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-cream mb-1">
                    {MICROCOPY.forms.name} <span className="text-slop">*</span>
                  </label>
                  <input
                    type="text"
                    value={leadData.name}
                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-void-light border border-void-lighter text-cream rounded-lg focus:outline-none focus:border-slop focus:ring-2 focus:ring-slop/20 transition-all placeholder-cream/50"
                    placeholder={MICROCOPY.placeholders.name}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cream mb-1">
                    {MICROCOPY.forms.email} <span className="text-slop">*</span>
                  </label>
                  <input
                    type="email"
                    value={leadData.email}
                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-void-light border border-void-lighter text-cream rounded-lg focus:outline-none focus:border-slop focus:ring-2 focus:ring-slop/20 transition-all placeholder-cream/50"
                    placeholder={MICROCOPY.placeholders.email}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cream mb-1">
                    {MICROCOPY.forms.phone} <span className="text-cream/50">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={leadData.phone}
                    onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-void-light border border-void-lighter text-cream rounded-lg focus:outline-none focus:border-slop focus:ring-2 focus:ring-slop/20 transition-all placeholder-cream/50"
                    placeholder={MICROCOPY.placeholders.phone}
                  />
                </div>

                <motion.button
                  onClick={submitLead}
                  disabled={!leadData.name || !leadData.email}
                  className="w-full py-4 bg-slop text-void rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {MICROCOPY.buttons.submit}
                </motion.button>

                <button
                  onClick={() => setShowLeadForm(false)}
                  className="w-full py-2 text-cream/70 text-sm hover:text-cream transition-colors inline-block"
                  style={{ transform: getRandomRotation('subtle') }}
                >
                  i'll keep chatting first
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area - with safe area padding for notch phones */}
      <div className="fixed bottom-0 left-0 right-0 bg-void/95 backdrop-blur-md border-t border-void-lighter pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-3xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3 bg-void-light border border-void-lighter rounded-xl px-3 sm:px-4 py-2 shadow-sm focus-within:border-slop focus-within:ring-2 focus-within:ring-slop/20 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={leadSubmitted ? MICROCOPY.success.sent : MICROCOPY.chat.inputPlaceholder}
              disabled={leadSubmitted}
              className="flex-1 bg-transparent outline-none text-[15px] text-cream placeholder-cream/50 min-h-[44px] disabled:cursor-not-allowed"
            />
            <motion.button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading || leadSubmitted}
              className="w-11 h-11 flex-shrink-0 bg-slop rounded-lg flex items-center justify-center text-void disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Send message"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </motion.button>
          </div>
          <p className="text-center text-xs text-cream/60 mt-2 hidden sm:block inline-block" style={{ transform: getRandomRotation('subtle') }}>
            Powered by Claude AI • Your data is handled securely
          </p>
        </div>
      </div>
    </div>
  )
}
