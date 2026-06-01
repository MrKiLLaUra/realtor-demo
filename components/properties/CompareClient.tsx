'use client'

import { useState } from 'react'
import { Property } from '@/lib/types'
import { formatPrice, STATUS_LABELS, TYPE_LABELS } from '@/lib/utils'
import { Bed, Bath, Square, X, Plus } from 'lucide-react'
import Link from 'next/link'

const ROWS = [
  { label: 'Price', render: (p: Property) => formatPrice(p.price, p.price_type) },
  { label: 'Status', render: (p: Property) => STATUS_LABELS[p.status] },
  { label: 'Type', render: (p: Property) => TYPE_LABELS[p.type] },
  { label: 'Area', render: (p: Property) => p.area },
  { label: 'Bedrooms', render: (p: Property) => String(p.beds) },
  { label: 'Bathrooms', render: (p: Property) => String(p.baths) },
  { label: 'Size', render: (p: Property) => `${p.sqm} m²` },
  { label: 'Reference', render: (p: Property) => p.ref_number || '—' },
]

export default function CompareClient({ properties }: { properties: Property[] }) {
  const [selected, setSelected] = useState<Property[]>([])
  const [search, setSearch] = useState('')

  const filtered = properties.filter(
    (p) =>
      !selected.find((s) => s.id === p.id) &&
      (p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.area.toLowerCase().includes(search.toLowerCase()))
  )

  const add = (p: Property) => { if (selected.length < 3) setSelected((s) => [...s, p]) }
  const remove = (id: string) => setSelected((s) => s.filter((p) => p.id !== id))

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8">
      {/* Picker */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-5">
        <p className="text-sm font-semibold text-[var(--ink)] mb-3">Add properties to compare</p>
        <input
          type="text"
          placeholder="Search by name or area..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--green)] mb-4"
        />
        <div className="flex flex-wrap gap-2">
          {filtered.slice(0, 20).map((p) => (
            <button
              key={p.id}
              onClick={() => add(p)}
              disabled={selected.length >= 3}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] text-sm text-[var(--ink-2)] hover:bg-[var(--bg-soft)] disabled:opacity-40 transition-colors"
            >
              <Plus size={13} /> {p.title}
            </button>
          ))}
        </div>
      </div>

      {selected.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-xl font-bold text-[var(--ink)] mb-2">Select properties above to compare</p>
          <p className="text-sm text-[var(--ink-3)]">Add up to 3 listings to compare them side by side.</p>
        </div>
      )}

      {selected.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-36 text-left text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] pb-4" />
                {selected.map((p) => (
                  <th key={p.id} className="text-left pb-4 px-4 min-w-[220px]">
                    <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden">
                      {p.images[0] && (
                        <div
                          className="aspect-video bg-cover bg-center"
                          style={{ backgroundImage: `url("${p.images[0]}")` }}
                        />
                      )}
                      <div className="p-3">
                        <div className="font-semibold text-[var(--ink)] text-sm leading-snug mb-0.5">{p.title}</div>
                        <div className="text-xs text-[var(--ink-3)]">{p.area}</div>
                        <div className="mt-2 flex items-center justify-between">
                          <Link href={`/properties/${p.slug}`} className="text-xs text-[var(--green)] hover:underline">View →</Link>
                          <button onClick={() => remove(p.id)} className="text-[var(--ink-3)] hover:text-red-500 transition-colors"><X size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-[var(--bg-soft)]'}>
                  <td className="py-3 pr-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] rounded-l-xl pl-3">
                    {row.label}
                  </td>
                  {selected.map((p) => (
                    <td key={p.id} className="py-3 px-4 text-sm text-[var(--ink)] font-medium">
                      {row.render(p)}
                    </td>
                  ))}
                </tr>
              ))}
              {/* Feature comparison */}
              <tr className="bg-white">
                <td className="py-3 pr-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] pl-3 rounded-l-xl">Features</td>
                {selected.map((p) => (
                  <td key={p.id} className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {p.features.slice(0, 5).map((f) => (
                        <span key={f} className="text-[10px] px-2 py-0.5 bg-[var(--bg-soft)] rounded-full text-[var(--ink-2)]">{f}</span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              {/* Actions row */}
              <tr>
                <td className="pt-4" />
                {selected.map((p) => (
                  <td key={p.id} className="pt-4 px-4">
                    <Link
                      href={`/properties/${p.slug}`}
                      className="block w-full py-2.5 bg-[var(--green)] text-white text-sm font-medium rounded-lg text-center hover:bg-[var(--green-dark)] transition-colors"
                    >
                      View Details
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
