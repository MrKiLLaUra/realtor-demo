'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { RotateCcw } from 'lucide-react'

interface Props {
  areas: string[]
  currentFilters: {
    search?: string
    status?: string
    type?: string
    area?: string
    minPrice?: number
    maxPrice?: number
    minBeds?: number
  }
}

const STATUSES = [
  { value: 'all', label: 'All' },
  { value: 'for_sale', label: 'For Sale' },
  { value: 'for_rent', label: 'For Rent' },
  { value: 'sold', label: 'Sold' },
  { value: 'reserved', label: 'Reserved' },
]

const TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'duplex', label: 'Duplex' },
  { value: 'studio', label: 'Studio' },
]

const BEDS = [
  { value: '0', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
]

export default function PropertyFilters({ areas, currentFilters }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === '' || value === 'all' || value === '0') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
      params.delete('page')
      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams]
  )

  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl p-6 flex flex-col gap-8 sticky top-[122px]">
      {/* Search */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--ink-3)] mb-2.5">Search</label>
        <input
          type="text"
          defaultValue={currentFilters.search || ''}
          placeholder="Area, address..."
          className="w-full text-sm px-4 py-3 border border-[var(--border)] rounded-xl outline-none focus:border-[var(--green)] bg-white text-[var(--ink)] placeholder:text-[var(--ink-3)]"
          onKeyDown={(e) => {
            if (e.key === 'Enter') update('search', (e.target as HTMLInputElement).value)
          }}
          onBlur={(e) => update('search', e.target.value)}
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--ink-3)] mb-2.5">Status</label>
        <div className="flex flex-col gap-1">
          {STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => update('status', s.value)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${
                (currentFilters.status || 'all') === s.value
                  ? 'bg-[var(--ink)] text-white font-semibold'
                  : 'text-[var(--ink-2)] hover:bg-[var(--bg-soft)]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--ink-3)] mb-2.5">Property Type</label>
        <select
          value={currentFilters.type || 'all'}
          onChange={(e) => update('type', e.target.value)}
          className="w-full text-sm px-4 py-3 border border-[var(--border)] rounded-xl outline-none focus:border-[var(--green)] bg-white text-[var(--ink)]"
        >
          {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      {/* Area */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--ink-3)] mb-2.5">Area</label>
        <select
          value={currentFilters.area || 'all'}
          onChange={(e) => update('area', e.target.value)}
          className="w-full text-sm px-4 py-3 border border-[var(--border)] rounded-xl outline-none focus:border-[var(--green)] bg-white text-[var(--ink)]"
        >
          <option value="all">All Areas</option>
          {areas.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--ink-3)] mb-2.5">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            defaultValue={currentFilters.minPrice || ''}
            className="w-full text-sm px-3 py-3 border border-[var(--border)] rounded-xl outline-none focus:border-[var(--green)] bg-white"
            onBlur={(e) => update('minPrice', e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') update('minPrice', (e.target as HTMLInputElement).value) }}
          />
          <input
            type="number"
            placeholder="Max"
            defaultValue={currentFilters.maxPrice || ''}
            className="w-full text-sm px-3 py-3 border border-[var(--border)] rounded-xl outline-none focus:border-[var(--green)] bg-white"
            onBlur={(e) => update('maxPrice', e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') update('maxPrice', (e.target as HTMLInputElement).value) }}
          />
        </div>
      </div>

      {/* Beds */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--ink-3)] mb-2.5">Min Bedrooms</label>
        <div className="flex gap-2 flex-wrap">
          {BEDS.map((b) => (
            <button
              key={b.value}
              onClick={() => update('minBeds', b.value)}
              className={`px-4 py-2 rounded-xl text-sm border transition-colors font-medium ${
                (currentFilters.minBeds?.toString() || '0') === b.value
                  ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                  : 'border-[var(--border)] text-[var(--ink-2)] hover:bg-[var(--bg-soft)]'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => router.push(pathname)}
        className="flex items-center justify-center gap-2 w-full py-3 border border-[var(--border)] rounded-xl text-sm text-[var(--ink-2)] hover:bg-[var(--bg-soft)] transition-colors font-medium"
      >
        <RotateCcw size={13} /> Reset Filters
      </button>
    </div>
  )
}
