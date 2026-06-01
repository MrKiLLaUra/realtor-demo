import { Suspense } from 'react'
import { getProperties, getAreas } from '@/lib/data'
import PropertyCard from '@/components/properties/PropertyCard'
import PropertyFilters from '@/components/properties/PropertyFilters'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Properties',
  description: 'Browse Dublin\'s finest residential properties. Filter by area, price, bedrooms and more.',
}

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function PropertiesPage({ searchParams }: Props) {
  const params = await searchParams
  const areas = await getAreas()

  const filters = {
    search: params.search,
    status: params.status,
    type: params.type,
    area: params.area,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    minBeds: params.minBeds ? Number(params.minBeds) : undefined,
  }

  const page = Number(params.page || 1)
  const perPage = 9
  const { properties, count } = await getProperties({ ...filters, limit: perPage, offset: (page - 1) * perPage })
  const totalPages = Math.ceil(count / perPage)

  return (
    <div className="pt-[102px] min-h-screen bg-[var(--bg)]">
      {/* Page header */}
      <div className="bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--green)] mb-3">Listings</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--ink)]">Properties</h1>
          <p className="text-[var(--ink-3)] mt-2">{count} propert{count === 1 ? 'y' : 'ies'} found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters sidebar */}
          <aside className="lg:w-64 shrink-0">
            <Suspense>
              <PropertyFilters areas={areas} currentFilters={filters} />
            </Suspense>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {properties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-2xl font-bold text-[var(--ink)] mb-2">No properties found</p>
                <p className="text-[var(--ink-3)] text-sm">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
                {properties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
                  const p = new URLSearchParams({ ...params, page: String(n) })
                  return (
                    <a
                      key={n}
                      href={`/properties?${p.toString()}`}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        n === page
                          ? 'bg-[var(--ink)] text-white'
                          : 'border border-[var(--border)] text-[var(--ink-2)] hover:bg-[var(--bg-soft)]'
                      }`}
                    >
                      {n}
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
