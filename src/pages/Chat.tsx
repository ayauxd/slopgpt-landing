import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

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
  content: "Hey there! I'm here to help you create something amazing for your event. Whether it's a dinosaur-themed birthday bash, a 90s nostalgia corporate party, or something totally custom - I'd love to hear what you're dreaming up. What kind of event are you planning?",
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
          content: "I'm having a bit of trouble connecting right now. You can also reach us directly at hello@slopgpt.com - we'd love to hear from you!",
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
            content: `Thanks ${leadData.name}! 🎉 Our event specialists will be in touch at ${leadData.email} within 24 hours. We're excited to help bring your vision to life!`,
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
    <div className="min-h-screen bg-[#fafaf8] flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf8]/80 backdrop-blur-md border-b border-[#e5e5e5]">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center min-h-[44px] py-2 group">
            <span
              className="text-3xl transition-transform duration-200 group-hover:scale-105"
              style={{
                fontFamily: 'Caveat, cursive',
                fontWeight: 600,
                transform: 'rotate(-2deg)',
                color: '#cc2936',
              }}
            >
              Slop
            </span>
            <span className="text-2xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
              GPT
            </span>
          </Link>
          <Link
            to="/"
            className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors min-h-[44px] flex items-center"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-1 pt-16 pb-24 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 h-full flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4">
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
                        ? 'bg-[#1a1a1a] text-white rounded-br-md'
                        : 'bg-white border border-[#e5e5e5] rounded-bl-md shadow-sm'
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
                <div className="bg-white border border-[#e5e5e5] px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                  <div className="flex gap-1.5">
                    <span
                      className="w-2 h-2 bg-[#999] rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="w-2 h-2 bg-[#999] rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-2 h-2 bg-[#999] rounded-full animate-bounce"
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
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-2 text-[#1a1a1a]">Almost there!</h2>
              <p className="text-[#666] mb-6">
                Share your details and we'll have an event specialist reach out within 24 hours.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#333] mb-1">
                    Name <span className="text-[#cc2936]">*</span>
                  </label>
                  <input
                    type="text"
                    value={leadData.name}
                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#cc2936] focus:ring-2 focus:ring-[#cc2936]/20 transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333] mb-1">
                    Email <span className="text-[#cc2936]">*</span>
                  </label>
                  <input
                    type="email"
                    value={leadData.email}
                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#cc2936] focus:ring-2 focus:ring-[#cc2936]/20 transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333] mb-1">
                    Phone <span className="text-[#999]">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={leadData.phone}
                    onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#cc2936] focus:ring-2 focus:ring-[#cc2936]/20 transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <motion.button
                  onClick={submitLead}
                  disabled={!leadData.name || !leadData.email}
                  className="w-full py-4 bg-[#cc2936] text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get My Custom Quote
                </motion.button>

                <button
                  onClick={() => setShowLeadForm(false)}
                  className="w-full py-2 text-[#666] text-sm hover:text-[#1a1a1a] transition-colors"
                >
                  I'll continue chatting first
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#fafaf8]/80 backdrop-blur-md border-t border-[#e5e5e5]">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 bg-white border border-[#e5e5e5] rounded-xl px-4 py-2 shadow-sm focus-within:border-[#cc2936] focus-within:ring-2 focus-within:ring-[#cc2936]/20 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={leadSubmitted ? "Thanks! We'll be in touch soon." : 'Tell me about your event...'}
              disabled={leadSubmitted}
              className="flex-1 bg-transparent outline-none text-[15px] placeholder-[#999] min-h-[44px] disabled:cursor-not-allowed"
            />
            <motion.button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading || leadSubmitted}
              className="w-11 h-11 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
          <p className="text-center text-xs text-[#999] mt-2">
            Powered by Claude AI • Your data is handled securely
          </p>
        </div>
      </div>
    </div>
  )
}
