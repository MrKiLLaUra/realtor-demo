'use client'

import Link from 'next/link'
import { Bed, Bath, Square, Heart } from 'lucide-react'
import { Property } from '@/lib/types'
import { formatPrice, STATUS_LABELS, STATUS_COLORS } from '@/lib/utils'
import { useFavorites } from '@/lib/useFavorites'
import { DEMO } from '@/lib/demo'

export default function PropertyCard({ property: p }: { property: Property }) {
  const { isFav, toggle } = useFavorites()
  const fav = isFav(p.id)

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden flex flex-col group transition-all duration-200 hover:-translate-y-1"
      style={{ boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-md)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-sm)')}
    >
      {/* Photo */}
      <Link href={`/properties/${p.slug}`} className="relative block overflow-hidden">
        <div
          className="aspect-[16/10] bg-cover bg-center bg-[#1a2a1f] group-hover:scale-[1.03] transition-transform duration-500"
          style={{ backgroundImage: p.images[0] ? `url("${p.images[0]}")` : undefined }}
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg ${STATUS_COLORS[p.status]}`}>
            {STATUS_LABELS[p.status]}
          </span>
          {p.is_featured && (
            <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg bg-amber-400 text-amber-900">
              Featured
            </span>
          )}
        </div>

        {/* Heart */}
        <button
          onClick={(e) => { e.preventDefault(); toggle(p.id) }}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/90 rounded-full transition-transform hover:scale-110"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
          aria-label={fav ? 'Remove from favorites' : 'Save listing'}
        >
          <Heart size={15} className={fav ? 'fill-red-500 text-red-500' : 'text-[var(--ink-3)]'} />
        </button>

        {/* Sold stamp */}
        {p.status === 'sold' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-black text-3xl tracking-[0.2em] uppercase rotate-[-15deg] border-4 border-white px-5 py-2">
              Sold
            </span>
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Price + title */}
        <div className="flex flex-col gap-1">
          <p className="text-[28px] font-bold text-[var(--ink)] leading-none tracking-tight serif">
            {formatPrice(p.price, p.price_type)}
          </p>
          <h3 className="text-[15px] font-semibold text-[var(--ink)] leading-snug mt-1">
            {p.title}
          </h3>
          <p className="text-sm text-[var(--ink-3)]">{p.address}</p>
        </div>

        {/* Key stats */}
        <div
          className="flex items-center gap-5 py-4 text-sm text-[var(--ink-2)]"
          style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
        >
          <span className="flex items-center gap-1.5 font-medium">
            <Bed size={14} className="text-[var(--ink-3)]" /> {p.beds} bed{p.beds !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Bath size={14} className="text-[var(--ink-3)]" /> {p.baths} bath{p.baths !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Square size={14} className="text-[var(--ink-3)]" /> {p.sqm} m²
          </span>
        </div>

        {/* Tags */}
        {p.features.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {p.features.slice(0, 3).map((f) => (
              <span
                key={f}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full text-[var(--ink-2)]"
                style={{ background: 'var(--bg-off)', border: '1px solid var(--border)' }}
              >
                {f}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <Link
            href={`/properties/${p.slug}`}
            className="text-sm font-bold text-[var(--green)] hover:underline underline-offset-2"
          >
            View Details →
          </Link>
          <a
            href={`https://wa.me/${DEMO.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in ${p.title} (${p.ref_number || p.slug})`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold px-3 py-1.5 rounded-lg text-[var(--ink-2)] transition-colors"
            style={{ border: '1px solid var(--border)', background: 'var(--bg-off)' }}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  )
}
