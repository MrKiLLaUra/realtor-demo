'use client'

import { useState } from 'react'
import { submitInquiry } from '@/lib/data'
import { CheckCircle, Loader2 } from 'lucide-react'

interface Props {
  propertyId: string
  propertyTitle: string
  propertyStatus: string
  agentPhone: string
}

const INQUIRY_TYPES = [
  { value: 'general', label: 'General Enquiry' },
  { value: 'viewing', label: 'Book a Viewing' },
  { value: 'callback', label: 'Request Callback' },
  { value: 'valuation', label: 'Free Valuation' },
]

const TIMES = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

export default function InquiryForm({ propertyId, propertyTitle, propertyStatus, agentPhone }: Props) {
  const [type, setType] = useState('viewing')
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', date: '', time: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) { setError('Name and phone are required'); return }
    setLoading(true); setError('')

    try {
      await submitInquiry({
        property_id: propertyId,
        property_title: propertyTitle,
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        message: form.message || undefined,
        type,
        preferred_date: form.date || undefined,
        preferred_time: form.time || undefined,
      })
      setDone(true)
    } catch {
      setError('Something went wrong. Please try calling or WhatsApp instead.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <CheckCircle size={32} className="text-[var(--green)]" />
        <div>
          <p className="font-semibold text-[var(--ink)]">That&apos;s the flow!</p>
          <p className="text-sm text-[var(--ink-3)] mt-1">
            On a live site this enquiry would reach the agency. This is a demo — nothing was sent or stored.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h3 className="font-semibold text-sm text-[var(--ink)]">Send an Enquiry</h3>

      {/* Type selector */}
      <div className="grid grid-cols-2 gap-1.5">
        {INQUIRY_TYPES.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setType(t.value)}
            className={`text-xs py-2 px-2 rounded-lg font-medium border transition-colors ${
              type === t.value ? 'bg-[var(--ink)] text-white border-[var(--ink)]' : 'border-[var(--border)] text-[var(--ink-2)] hover:bg-[var(--bg-soft)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <input
        required
        type="text"
        placeholder="Your name"
        value={form.name}
        onChange={(e) => set('name', e.target.value)}
        className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--green)] bg-white"
      />
      <input
        required
        type="tel"
        placeholder="Your phone number"
        value={form.phone}
        onChange={(e) => set('phone', e.target.value)}
        className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--green)] bg-white"
      />
      <input
        type="email"
        placeholder="Email (optional)"
        value={form.email}
        onChange={(e) => set('email', e.target.value)}
        className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--green)] bg-white"
      />

      {/* Date/time picker for viewing */}
      {type === 'viewing' && (
        <div className="flex gap-2">
          <input
            type="date"
            value={form.date}
            onChange={(e) => set('date', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="flex-1 text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--green)] bg-white"
          />
          <select
            value={form.time}
            onChange={(e) => set('time', e.target.value)}
            className="flex-1 text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--green)] bg-white"
          >
            <option value="">Time...</option>
            {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      )}

      <textarea
        placeholder="Message (optional)"
        value={form.message}
        onChange={(e) => set('message', e.target.value)}
        rows={3}
        className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--green)] bg-white resize-none"
      />

      {error && <p className="text-xs text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-[var(--green)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--green-dark)] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {loading ? <><Loader2 size={14} className="animate-spin" /> Sending...</> : 'Send Enquiry'}
      </button>
    </form>
  )
}
