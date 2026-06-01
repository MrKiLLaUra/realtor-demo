import type { Metadata } from 'next'
import Link from 'next/link'
import { Award, Clock, TrendingUp, Users, CheckCircle } from 'lucide-react'
import { DEMO } from '@/lib/demo'

export const metadata: Metadata = {
  title: 'About',
  description: 'About the fictional boutique agency portrayed in this Limen Studios demo.',
}

export default function AboutPage() {
  return (
    <div className="pt-[102px] min-h-screen bg-[var(--bg)]">
      {/* Hero */}
      <div className="relative bg-[#111a14] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80")' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--green-light)] mb-3">About</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">A different kind of<br />estate agency</h1>
          <p className="text-white/65 max-w-xl text-lg leading-relaxed">
            We work with a small number of clients at any time so every instruction receives our full attention. Most of our vendors achieve above guide price.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { icon: TrendingUp, value: '340+', label: 'Homes Sold' },
            { icon: Clock, value: '12 days', label: 'Average Time to Sale' },
            { icon: Award, value: '98%', label: 'Client Satisfaction' },
            { icon: Users, value: '14 years', label: 'In Business' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-start gap-2">
              <Icon size={18} className="text-[var(--green)]" />
              <div className="text-2xl font-bold text-[var(--ink)]">{value}</div>
              <div className="text-xs text-[var(--ink-3)]">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Agency profile */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div
          className="aspect-[4/5] rounded-2xl bg-cover bg-center bg-[#1a2a1f]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80&auto=format&fit=crop")' }}
        />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--green)] mb-3">The Agency</p>
          <h2 className="text-3xl font-bold text-[var(--ink)] mb-1">{DEMO.brand}</h2>
          <p className="text-sm text-[var(--ink-3)] mb-5">A fictional boutique agency · {DEMO.location}</p>
          <p className="text-[var(--ink-2)] leading-relaxed mb-5">
            {DEMO.brand} is the imaginary estate agency at the centre of this demo. We use it to show how a modern, design-led property website can feel — from the first scroll of the homepage to booking a viewing.
          </p>
          <p className="text-[var(--ink-2)] leading-relaxed mb-8">
            The story is simple and deliberately understated: a small team, a short client list, and a focus on south Dublin&apos;s most characterful addresses — Ballsbridge, Ranelagh, Sandymount and the Docklands.
          </p>
          <ul className="flex flex-col gap-2 mb-8">
            {[
              'A boutique, design-first presentation',
              'Rich property pages with galleries and a mortgage calculator',
              'Smart search, filtering and side-by-side comparison',
              'Built end-to-end by ' + DEMO.studioName,
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--ink-2)]">
                <CheckCircle size={15} className="text-[var(--green)] mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex gap-3 flex-wrap">
            <Link href="/contact" className="px-5 py-2.5 bg-[var(--green)] text-white text-sm font-medium rounded-lg hover:bg-[var(--green-dark)] transition-colors">
              Try the contact form
            </Link>
            <a
              href={DEMO.studioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-[var(--border)] text-sm font-medium rounded-lg hover:bg-[var(--bg-soft)] transition-colors"
            >
              Visit {DEMO.studioName} ↗
            </a>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-[var(--bg-soft)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-20">
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-10">Our approach</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'Selective by design', body: 'We cap our active instructions. Not every property is right for us, and we only take on mandates we can give proper attention.' },
              { title: 'Off-market access', body: 'Many of our best transactions never appear on Daft or MyHome. If you\'re a serious buyer, being on our list is what matters.' },
              { title: 'Full representation', body: 'Whether selling or buying, you work with a senior agent throughout — not a junior. Every viewing, every negotiation, every document.' },
            ].map((v) => (
              <div key={v.title} className="bg-white border border-[var(--border)] rounded-2xl p-6">
                <h3 className="font-semibold text-[var(--ink)] mb-2">{v.title}</h3>
                <p className="text-sm text-[var(--ink-2)] leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
