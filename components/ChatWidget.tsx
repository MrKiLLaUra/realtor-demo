'use client'

import { useState, useRef, useEffect } from 'react'
import { X, MessageCircle, Send, Loader2 } from 'lucide-react'
import { DEMO } from '@/lib/demo'

interface Message {
  role: 'user' | 'assistant'
  text: string
}

const FAQ_RESPONSES: Record<string, string> = {
  'price': 'Our properties range from €465K for apartments to €3.1M+ for statement residences. Which area or budget range are you working with?',
  'viewing': 'I can arrange a viewing right away. What\'s your preferred date and time? You can also book directly through any property page.',
  'rent': 'We have rental properties from €2,800/month. Would you like me to show you what\'s available?',
  'ballsbridge': 'Ballsbridge is our most popular area. We currently have a Victorian townhouse at €1.25M and a Georgian Mews at €1.15M. Would you like details on either?',
  'ranelagh': 'We have a renovated 3-bed semi in Ranelagh at €785K. It\'s been very popular. Want me to send you details?',
  'available': 'We have 10 active listings right now across south Dublin. Shall I filter by your requirements?',
  'whatsapp': 'In a real build this is where a live WhatsApp hand-off would go. This is a demo, so messaging is switched off.',
}

function getResponse(input: string): string {
  const lower = input.toLowerCase()
  for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
    if (lower.includes(key)) return response
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return 'Hi there! I\'m the demo assistant. I can show you how a real chat would help visitors find properties, book viewings, or ask about listings. What are you looking for?'
  }
  if (lower.includes('contact') || lower.includes('call') || lower.includes('phone')) {
    return 'In a live site this is where I\'d connect you to the team. This is a demonstration, so calling and messaging are disabled — but the flow works exactly like this.'
  }
  return 'Good question! On a real site I\'d pull this from the agency\'s data. This is a scripted demo, so leave your details below and you\'ll see how a lead would be captured.'
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hi! I\'m a demo assistant. Looking to buy, rent, or get a valuation? Ask away — replies are scripted to show how this would work on a real site.' },
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [leadCapture, setLeadCapture] = useState(false)
  const [lead, setLead] = useState({ name: '', phone: '' })
  const [leadDone, setLeadDone] = useState(false)
  const messagesEnd = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', text }])
    setThinking(true)

    setTimeout(() => {
      const response = getResponse(text)
      setMessages((m) => [...m, { role: 'assistant', text: response }])
      setThinking(false)

      // After 2 messages from user, offer lead capture
      const userMsgs = messages.filter((m) => m.role === 'user').length
      if (userMsgs >= 1 && !leadCapture && !leadDone) {
        setTimeout(() => {
          setMessages((m) => [...m, {
            role: 'assistant',
            text: 'Here\'s where a real site would capture your details. Add a name and number to see the flow — nothing is actually sent.',
          }])
          setLeadCapture(true)
        }, 800)
      }
    }, 800)
  }

  const submitLead = () => {
    if (!lead.name || !lead.phone) return
    setLeadDone(true)
    setLeadCapture(false)
    setMessages((m) => [
      ...m,
      {
        role: 'assistant',
        text: `Thanks ${lead.name}! On a live site, your details would now reach the agency. This is a demo, so nothing was sent or stored.`,
      },
    ])
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[var(--green)] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[var(--green-dark)] transition-all hover:scale-105"
        aria-label="Chat with us"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl border border-[var(--border)] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[var(--ink)] text-white px-4 py-3 flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
              style={{ background: 'var(--green)' }}
              aria-hidden="true"
            >
              LP
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">{DEMO.brand}</div>
              <div className="text-xs text-white/60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Demo assistant
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 max-h-72 bg-[var(--bg)]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chat-message-enter max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                  m.role === 'assistant'
                    ? 'bg-white border border-[var(--border)] text-[var(--ink)] self-start'
                    : 'bg-[var(--green)] text-white self-end'
                }`}
              >
                {m.text}
              </div>
            ))}

            {thinking && (
              <div className="self-start bg-white border border-[var(--border)] px-3 py-2 rounded-xl text-sm text-[var(--ink-3)] flex items-center gap-1">
                <Loader2 size={12} className="animate-spin" /> Typing...
              </div>
            )}

            {/* Lead capture form */}
            {leadCapture && !leadDone && (
              <div className="self-start bg-white border border-[var(--border)] rounded-xl p-3 flex flex-col gap-2 w-full chat-message-enter">
                <input
                  type="text"
                  placeholder="Your name"
                  value={lead.name}
                  onChange={(e) => setLead((l) => ({ ...l, name: e.target.value }))}
                  className="text-sm px-3 py-2 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--green)]"
                />
                <input
                  type="tel"
                  placeholder="Your phone number"
                  value={lead.phone}
                  onChange={(e) => setLead((l) => ({ ...l, phone: e.target.value }))}
                  className="text-sm px-3 py-2 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--green)]"
                />
                <button
                  onClick={submitLead}
                  className="text-sm py-2 bg-[var(--green)] text-white rounded-lg font-medium hover:bg-[var(--green-dark)] transition-colors"
                >
                  Send my details →
                </button>
              </div>
            )}

            <div ref={messagesEnd} />
          </div>

          {/* Quick replies */}
          {!leadCapture && (
            <div className="px-3 py-2 flex gap-1.5 overflow-x-auto border-t border-[var(--border)] bg-white">
              {['Book a viewing', 'Properties for sale', 'Rental listings', 'Get valuation'].map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); }}
                  className="shrink-0 text-xs px-2.5 py-1.5 border border-[var(--border)] rounded-full text-[var(--ink-2)] hover:bg-[var(--bg-soft)] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t border-[var(--border)] bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') send() }}
              placeholder="Type a message..."
              className="flex-1 text-sm px-3 py-2 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--green)] bg-white"
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              className="w-8 h-8 flex items-center justify-center bg-[var(--green)] text-white rounded-lg disabled:opacity-40 hover:bg-[var(--green-dark)] transition-colors shrink-0"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
