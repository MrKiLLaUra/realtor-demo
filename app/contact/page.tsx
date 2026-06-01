'use client'

import { useState } from 'react'
import { submitInquiry } from '@/lib/data'
import { DEMO } from '@/lib/demo'
import { Phone, Mail, MapPin, CheckCircle, Loader2 } from 'lucide-react'

const TIMES = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

export default function ContactPage() {
  const [type, setType] = useState('valuation')
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
      await submitInquiry({ name: form.name, phone: form.phone, email: form.email, message: form.message, type, preferred_date: form.date, preferred_time: form.time })
      setDone(true)
    } catch { setError('Something went wrong. Please call or WhatsApp us directly.') }
    finally { setLoading(false) }
  }

  return (
    <div className="pt-[102px] min-h-screen bg-[var(--bg)]">
      <div className="bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--green)] mb-2">Get in touch</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--ink)]">Contact Us</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left – form */}
        <div className="bg-white border border-[var(--border)] rounded-2xl p-7">
          {done ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <CheckCircle size={40} className="text-[var(--green)]" />
              <div>
                <p className="text-xl font-bold text-[var(--ink)]">That&apos;s how it works!</p>
                <p className="text-sm text-[var(--ink-3)] mt-1">
                  On a live site, this enquiry would reach the agency. This is a demo, so nothing was sent or stored.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <h2 className="font-semibold text-lg text-[var(--ink)]">Send us a message</h2>
                <p className="text-xs text-[var(--ink-3)] mt-1">Demo form — nothing is sent or stored when you submit.</p>
              </div>

              {/* Enquiry type */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-2">Enquiry Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { value: 'valuation', label: 'Valuation' },
                    { value: 'viewing', label: 'Book Viewing' },
                    { value: 'general', label: 'General' },
                    { value: 'callback', label: 'Callback' },
                  ].map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setType(t.value)}
                      className={`py-2 px-2 rounded-lg text-sm font-medium border transition-colors ${
                        type === t.value ? 'bg-[var(--ink)] text-white border-[var(--ink)]' : 'border-[var(--border)] text-[var(--ink-2)] hover:bg-[var(--bg-soft)]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-1.5">Full Name *</label>
                  <input required type="text" value={form.name} onChange={(e) => set('name', e.target.value)}
                    className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--green)] bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-1.5">Phone *</label>
                  <input required type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)}
                    className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--green)] bg-white" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)}
                  className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--green)] bg-white" />
              </div>

              {type === 'viewing' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-1.5">Preferred Date</label>
                    <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--green)] bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-1.5">Preferred Time</label>
                    <select value={form.time} onChange={(e) => set('time', e.target.value)}
                      className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--green)] bg-white">
                      <option value="">Select time</option>
                      {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-1.5">Message</label>
                <textarea rows={4} value={form.message} onChange={(e) => set('message', e.target.value)}
                  placeholder="Tell us what you're looking for..."
                  className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--green)] bg-white resize-none" />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button type="submit" disabled={loading}
                className="w-full py-3 bg-[var(--green)] text-white font-semibold rounded-lg hover:bg-[var(--green-dark)] transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                {loading ? <><Loader2 size={15} className="animate-spin" /> Sending...</> : 'Send Message'}
              </button>
            </form>
          )}
        </div>

        {/* Right – info */}
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-[var(--border)] rounded-2xl p-6">
            <h2 className="font-semibold text-[var(--ink)] mb-5">Office</h2>
            <div className="flex flex-col gap-4">
              {[
                { icon: Phone, label: 'Phone', value: DEMO.phone, href: `tel:${DEMO.phone.replace(/\s/g, '')}` },
                { icon: Mail, label: 'Email', value: DEMO.email, href: `mailto:${DEMO.email}` },
                { icon: MapPin, label: 'Area', value: DEMO.location, href: '#' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} target={href.startsWith('https') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-[var(--bg-soft)] flex items-center justify-center shrink-0 group-hover:bg-[var(--green)] group-hover:text-white transition-colors">
                    <Icon size={15} className="text-[var(--green)] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--ink-3)] mb-0.5">{label}</div>
                    <div>{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=Dublin,+Ireland&z=11&output=embed"
              className="w-full h-72 border-0"
              loading="lazy"
              title="Dublin"
            />
          </div>

          {/* WhatsApp CTA (disabled in demo) */}
          <a
            href={`https://wa.me/${DEMO.phone.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#25d366] text-white rounded-2xl p-5 hover:bg-[#1ebe5d] transition-colors"
          >
            <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            <div>
              <div className="font-semibold">Chat on WhatsApp</div>
              <div className="text-sm text-white/80">Disabled in this demo</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
