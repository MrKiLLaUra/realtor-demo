'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function HeroSearch() {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('for_sale')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q) params.set('search', q)
    if (status) params.set('status', status)
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-[600px] rounded-xl overflow-hidden"
      style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.3)', background: 'white' }}
    >
      {/* Top row — toggle + input */}
      <div className="flex items-stretch" style={{ borderBottom: '1px solid #e8edea' }}>
        <div className="flex shrink-0" style={{ borderRight: '1px solid #e8edea' }}>
          <button
            type="button"
            onClick={() => setStatus('for_sale')}
            className="px-5 py-3.5 text-sm font-bold transition-colors whitespace-nowrap"
            style={{ background: status === 'for_sale' ? 'var(--green)' : 'white', color: status === 'for_sale' ? 'white' : 'var(--ink-3)' }}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => setStatus('for_rent')}
            className="px-5 py-3.5 text-sm font-bold transition-colors whitespace-nowrap"
            style={{ background: status === 'for_rent' ? 'var(--green)' : 'white', color: status === 'for_rent' ? 'white' : 'var(--ink-3)', borderLeft: '1px solid #e8edea' }}
          >
            Rent
          </button>
        </div>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Area, address or type..."
          className="flex-1 px-4 py-3.5 text-sm outline-none bg-white min-w-0"
          style={{ color: 'var(--ink)' }}
        />
      </div>

      {/* Bottom row — search button */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-white"
        style={{ background: 'var(--ink)' }}
      >
        <Search size={14} />
        Search Properties
      </button>
    </form>
  )
}
