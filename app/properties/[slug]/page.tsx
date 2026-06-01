import { notFound } from 'next/navigation'
import { getPropertyBySlug, getProperties, PROPERTIES } from '@/lib/data'
import { DEMO } from '@/lib/demo'
import PropertyGallery from '@/components/properties/PropertyGallery'
import InquiryForm from '@/components/properties/InquiryForm'
import MortgageCalculator from '@/components/properties/MortgageCalculator'
import PropertyCard from '@/components/properties/PropertyCard'
import { formatPrice, STATUS_LABELS, STATUS_COLORS, TYPE_LABELS } from '@/lib/utils'
import { Bed, Bath, Square, MapPin, Phone, Mail, ExternalLink, QrCode } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

// Prerender every (static) listing at build time.
export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)
  if (!property) return { title: 'Property Not Found' }

  return {
    title: property.title,
    description: property.description || `${property.beds} bed ${TYPE_LABELS[property.type]} in ${property.area}. ${formatPrice(property.price, property.price_type)}.`,
    openGraph: {
      title: `${property.title} — Limen Properties`,
      description: property.description || '',
      images: property.images[0] ? [{ url: property.images[0], width: 1200, height: 630 }] : [],
      type: 'website',
    },
  }
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)
  if (!property) notFound()

  const { properties: related } = await getProperties({
    area: property.area,
    status: 'for_sale',
    limit: 3,
  })
  const relatedFiltered = related.filter((p) => p.id !== property.id).slice(0, 3)

  const waMessage = encodeURIComponent(
    `Hi, I'm interested in ${property.title} (Ref: ${property.ref_number || property.slug}). Could you provide more information?`
  )

  // Area-level map query — the demo never pinpoints a specific real address.
  const mapQuery = encodeURIComponent(`${property.area}, Dublin, Ireland`)

  // Initials for the (fictional) agent avatar.
  const initials = property.agent_name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <>
      <div className="pt-[102px] bg-[var(--bg)] min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex items-center gap-2 text-sm text-[var(--ink-3)]">
            <a href="/" className="hover:text-[var(--ink)] transition-colors">Home</a>
            <span>/</span>
            <a href="/properties" className="hover:text-[var(--ink)] transition-colors">Properties</a>
            <span>/</span>
            <span className="text-[var(--ink)] truncate">{property.title}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
            {/* Left column */}
            <div className="flex flex-col gap-8">
              {/* Gallery */}
              <PropertyGallery images={property.images} title={property.title} />

              {/* Header */}
              <div className="bg-white border border-[var(--border)] rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md ${STATUS_COLORS[property.status]}`}>
                        {STATUS_LABELS[property.status]}
                      </span>
                      {property.is_featured && (
                        <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-400 text-amber-900">
                          Featured
                        </span>
                      )}
                      <span className="text-[11px] px-2.5 py-1 rounded-md bg-[var(--bg-soft)] text-[var(--ink-2)]">
                        {TYPE_LABELS[property.type]}
                      </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] mb-1">{property.title}</h1>
                    <p className="flex items-center gap-1.5 text-sm text-[var(--ink-3)]">
                      <MapPin size={14} /> {property.address}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[var(--ink)]">{formatPrice(property.price, property.price_type)}</div>
                    {property.ref_number && (
                      <div className="text-xs text-[var(--ink-3)] mt-1">Ref: {property.ref_number}</div>
                    )}
                  </div>
                </div>

                {/* Key stats */}
                <div className="flex flex-wrap gap-6 py-4 border-y border-[var(--border)]">
                  <div className="flex items-center gap-2 text-sm text-[var(--ink-2)]"><Bed size={15} /> <span><strong>{property.beds}</strong> Bedrooms</span></div>
                  <div className="flex items-center gap-2 text-sm text-[var(--ink-2)]"><Bath size={15} /> <span><strong>{property.baths}</strong> Bathrooms</span></div>
                  <div className="flex items-center gap-2 text-sm text-[var(--ink-2)]"><Square size={15} /> <span><strong>{property.sqm}</strong> m²</span></div>
                </div>

                {/* Description */}
                {property.description && (
                  <div className="pt-4">
                    <h2 className="font-semibold text-[var(--ink)] mb-2">About this property</h2>
                    <p className="text-sm text-[var(--ink-2)] leading-relaxed">{property.description}</p>
                  </div>
                )}
              </div>

              {/* Features */}
              {property.features.length > 0 && (
                <div className="bg-white border border-[var(--border)] rounded-2xl p-6">
                  <h2 className="font-semibold text-[var(--ink)] mb-4">Key Features</h2>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {property.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[var(--ink-2)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Video embed */}
              {property.video_url && (
                <div className="bg-white border border-[var(--border)] rounded-2xl p-6">
                  <h2 className="font-semibold text-[var(--ink)] mb-4">Video Tour</h2>
                  <div className="relative aspect-video rounded-xl overflow-hidden">
                    <iframe
                      src={property.video_url.replace('watch?v=', 'embed/')}
                      className="w-full h-full"
                      allowFullScreen
                      title="Property video"
                    />
                  </div>
                </div>
              )}

              {/* Mortgage calculator */}
              {property.status === 'for_sale' && (
                <MortgageCalculator price={property.price} />
              )}

              {/* Map */}
              <div className="bg-white border border-[var(--border)] rounded-2xl p-6">
                <h2 className="font-semibold text-[var(--ink)] mb-4">Location</h2>
                <div className="bg-[var(--bg-soft)] rounded-xl overflow-hidden aspect-[16/7] flex items-center justify-center text-sm text-[var(--ink-3)]">
                  <iframe
                    src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    title="Map"
                  />
                </div>
                <p className="mt-3 text-xs text-[var(--ink-3)]">
                  Approximate area only — this is an illustrative listing, not a real address.
                </p>
              </div>

              {/* QR Code section */}
              <div className="bg-[var(--bg-soft)] border border-[var(--border)] rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5">
                <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center border border-[var(--border)] shrink-0">
                  <QrCode size={48} className="text-[var(--ink-3)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--ink)] mb-1">QR Code for this listing</h3>
                  <p className="text-sm text-[var(--ink-3)] mb-3">Scan to share this listing or print and attach to the property.</p>
                  <a
                    href={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/properties/${property.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="text-sm font-medium text-[var(--green)] hover:underline inline-flex items-center gap-1.5"
                  >
                    <ExternalLink size={13} /> Download QR Code
                  </a>
                </div>
              </div>
            </div>

            {/* Right column — sticky sidebar */}
            <div className="flex flex-col gap-5">
              {/* Agent card */}
              <div className="bg-white border border-[var(--border)] rounded-2xl p-5 sticky top-[116px]">
                <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[var(--border)]">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm"
                    style={{ background: 'var(--green)' }}
                    aria-hidden="true"
                  >
                    {initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[var(--ink)]">{property.agent_name}</div>
                    <div className="text-xs text-[var(--ink-3)]">Lead Agent</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-5">
                  <a
                    href={`tel:${property.agent_phone}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-[var(--ink)] text-white text-sm font-medium rounded-lg hover:bg-black transition-colors"
                  >
                    <Phone size={14} /> Call Agent
                  </a>
                  <a
                    href={`https://wa.me/${DEMO.phone.replace(/\D/g, '')}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25d366] text-white text-sm font-medium rounded-lg hover:bg-[#1ebe5d] transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${property.agent_email}?subject=${encodeURIComponent(`Inquiry: ${property.title}`)}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 border border-[var(--border)] text-sm font-medium rounded-lg text-[var(--ink-2)] hover:bg-[var(--bg-soft)] transition-colors"
                  >
                    <Mail size={14} /> Email Agent
                  </a>
                </div>

                {/* Inquiry Form */}
                <InquiryForm
                  propertyId={property.id}
                  propertyTitle={property.title}
                  propertyStatus={property.status}
                  agentPhone={property.agent_phone}
                />
              </div>
            </div>
          </div>

          {/* Related listings */}
          {relatedFiltered.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-[var(--ink)] mb-6">More in {property.area}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedFiltered.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
