import Link from 'next/link'
import { getProperties } from '@/lib/data'
import { DEMO } from '@/lib/demo'
import PropertyCard from '@/components/properties/PropertyCard'
import HeroSearch from '@/components/properties/HeroSearch'
import { Award, Clock, TrendingUp, Users } from 'lucide-react'

export default async function HomePage() {
  const { properties: featured } = await getProperties({ featured: true, limit: 6 })
  const { properties: recent } = await getProperties({ limit: 3, status: 'for_sale' })
  const { count: totalActive } = await getProperties({ status: 'for_sale' })
  const { count: totalSold } = await getProperties({ status: 'sold' })

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative flex flex-col justify-end" style={{ height: '100svh', minHeight: 600, maxHeight: 900, paddingTop: 102 }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2400&q=80")' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.05) 100%)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-14 sm:pb-20">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-6 h-[2px]" style={{ background: 'var(--green-light)' }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: 'rgba(255,255,255,0.55)' }}>Dublin&apos;s Boutique Estate Agency</span>
          </div>

          {/* Headline */}
          <h1
            className="font-bold text-white mb-5 leading-[1.05] tracking-[-0.025em]"
            style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
          >
            Find your next<br />
            <span style={{ color: 'var(--green-light)' }}>Dublin</span> home
          </h1>

          <p className="mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, maxWidth: 420 }}>
            Hand-selected residences across Dublin&apos;s finest addresses. Discreet representation, off-market access.
          </p>

          {/* Search */}
          <HeroSearch />

          {/* Stats */}
          <div className="flex gap-8 sm:gap-12 mt-10 flex-wrap">
            {[
              { value: String(totalActive), label: 'Active Listings' },
              { value: '340+', label: 'Homes Sold' },
              { value: '14 yrs', label: 'Experience' },
              { value: '98%', label: 'Satisfaction' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-white text-2xl sm:text-3xl font-bold tracking-tight">{s.value}</div>
                <div className="text-[10px] font-bold uppercase mt-1" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.14em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RECENTLY LISTED ──────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase mb-3" style={{ letterSpacing: '0.22em', color: 'var(--green)' }}>New Arrivals</p>
              <h2 className="font-bold text-[var(--ink)]" style={{ fontSize: 'clamp(28px, 4vw, 42px)', letterSpacing: '-0.025em' }}>Recently Listed</h2>
            </div>
            <Link
              href="/properties"
              className="text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              style={{ border: '1.5px solid var(--border)', color: 'var(--ink-2)' }}
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {recent.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* ─── FEATURED ──────────────────────────────────────────── */}
      <section className="py-20 sm:py-28" style={{ background: 'var(--bg-off)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase mb-3" style={{ letterSpacing: '0.22em', color: 'var(--green)' }}>Featured</p>
              <h2 className="font-bold text-[var(--ink)]" style={{ fontSize: 'clamp(28px, 4vw, 42px)', letterSpacing: '-0.025em' }}>Handpicked Residences</h2>
            </div>
            <Link
              href="/properties?status=for_sale"
              className="text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors bg-white"
              style={{ border: '1.5px solid var(--border)', color: 'var(--ink-2)' }}
            >
              Browse all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featured.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* ─── WHY LIMEN ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center">
            {/* Text col */}
            <div>
              <p className="text-[10px] font-bold uppercase mb-4" style={{ letterSpacing: '0.22em', color: 'var(--green)' }}>Why Limen</p>
              <h2
                className="font-bold text-[var(--ink)] mb-6 leading-[1.15]"
                style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', letterSpacing: '-0.025em' }}
              >
                A different kind of estate agency
              </h2>
              <p className="mb-8 leading-[1.75]" style={{ color: 'var(--ink-2)', fontSize: 15 }}>
                We don&apos;t chase volume. We work with a small number of clients at any time so every instruction gets our full attention. Most vendors achieve above guide price.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Award, label: 'Above guide price', sub: 'Most sales achieved' },
                  { icon: Clock, label: '12 days average', sub: 'Time to sale agreed' },
                  { icon: TrendingUp, label: '340+ homes sold', sub: 'Since 2010' },
                  { icon: Users, label: '98% satisfaction', sub: 'Client rating' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--bg-off)', border: '1px solid var(--border)' }}>
                      <Icon size={16} style={{ color: 'var(--green)' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{label}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--ink-3)' }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 flex-wrap">
                <Link href="/properties" className="px-6 py-3 text-sm font-bold text-white rounded-xl" style={{ background: 'var(--green)' }}>
                  Browse Listings
                </Link>
                <Link href="/contact" className="px-6 py-3 text-sm font-semibold rounded-xl" style={{ border: '1.5px solid var(--border)', color: 'var(--ink-2)' }}>
                  Book a Valuation
                </Link>
              </div>
            </div>

            {/* Interior feature image */}
            <div className="relative hidden lg:block">
              <div
                className="w-full rounded-2xl bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80&auto=format&fit=crop")',
                  aspectRatio: '4/5',
                }}
              />
              <div className="absolute bottom-5 left-5 right-5 bg-white rounded-xl p-4" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <p className="font-bold" style={{ color: 'var(--ink)', fontSize: 16 }}>{DEMO.agentName}</p>
                <p className="text-sm mt-0.5" style={{ color: 'var(--ink-3)' }}>Lead Agent</p>
                <a href={`tel:${DEMO.phone.replace(/\s/g, '')}`} className="mt-2.5 block text-sm font-bold" style={{ color: 'var(--green)' }}>
                  {DEMO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOLD STRIP ───────────────────────────────────────── */}
      {totalSold > 0 && (
        <section style={{ background: '#111714' }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase mb-2" style={{ letterSpacing: '0.22em', color: 'rgba(255,255,255,0.3)' }}>Archive</p>
              <h2 className="font-bold text-white" style={{ fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '-0.02em' }}>We move properties fast.</h2>
              <p className="mt-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{totalSold} recently sold — proof of results.</p>
            </div>
            <Link
              href="/properties?status=sold"
              className="shrink-0 px-6 py-3 text-sm font-semibold text-white rounded-xl"
              style={{ border: '1.5px solid rgba(255,255,255,0.2)' }}
            >
              View Sold →
            </Link>
          </div>
        </section>
      )}

      {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="mb-3">
            <p className="text-[10px] font-bold uppercase mb-3" style={{ letterSpacing: '0.22em', color: 'var(--green)' }}>Reviews</p>
            <h2 className="font-bold text-[var(--ink)]" style={{ fontSize: 'clamp(28px, 4vw, 42px)', letterSpacing: '-0.025em' }}>What clients say</h2>
          </div>
          <p className="text-xs mb-12" style={{ color: 'var(--ink-3)' }}>Illustrative reviews — written for this demo, not real testimonials.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Buyer, Ranelagh', detail: 'Illustrative review', quote: 'They found us a home we didn\'t even know to look for. The off-market access was decisive.', rating: 5 },
              { name: 'Vendor, Dublin 2', detail: 'Illustrative review', quote: 'Sold above asking in nine days. Every detail — photography, viewings, negotiation — felt considered.', rating: 5 },
              { name: 'Tenant, Sandymount', detail: 'Illustrative review', quote: 'Relocating with two weeks’ notice. They handled viewings by video, then keys on arrival. Faultless.', rating: 5 },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-7 flex flex-col gap-4" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ color: '#F59E0B', fontSize: 16 }}>{'★'.repeat(t.rating)}</div>
                <p className="serif italic flex-1" style={{ color: 'var(--ink)', fontSize: 17, lineHeight: 1.65 }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--ink-3)' }}>{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA STRIP ────────────────────────────────────────── */}
      <section style={{ background: 'var(--green)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-bold text-white" style={{ fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '-0.02em' }}>Ready to start?</h2>
            <p className="mt-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>Free, no-obligation valuation or property search consultation.</p>
          </div>
          <div className="flex gap-3 flex-wrap shrink-0">
            <Link href="/contact" className="px-6 py-3 text-sm font-bold rounded-xl whitespace-nowrap" style={{ background: 'white', color: 'var(--green)' }}>
              Book a Valuation
            </Link>
            <a
              href={`https://wa.me/${DEMO.phone.replace(/\D/g, '')}`}
              target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 text-sm font-semibold text-white rounded-xl whitespace-nowrap"
              style={{ border: '1.5px solid rgba(255,255,255,0.35)' }}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
