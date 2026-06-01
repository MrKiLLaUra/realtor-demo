import { getProperties } from '@/lib/data'
import CompareClient from '@/components/properties/CompareClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Compare Properties' }

export default async function ComparePage() {
  const { properties } = await getProperties({ limit: 50 })
  return (
    <div className="pt-[102px] min-h-screen bg-[var(--bg)]">
      <div className="bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--green)] mb-2">Compare</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--ink)]">Side-by-Side Comparison</h1>
          <p className="text-[var(--ink-3)] mt-1 text-sm">Select up to 3 properties to compare.</p>
        </div>
      </div>
      <CompareClient properties={properties} />
    </div>
  )
}
