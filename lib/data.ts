// ─────────────────────────────────────────────────────────────────────────
//  STATIC DEMO DATA
//
//  This file replaces the live database. Everything here is FICTIONAL and
//  exists purely to demonstrate the look and feel of a property website built
//  by Limen Studios. No real listings, people, prices, or addresses are
//  represented. See /legal for the full disclaimer.
//
//  Because the data is static, the demo never depends on an external service
//  — it always loads instantly and can never appear empty in front of a
//  prospective client.
// ─────────────────────────────────────────────────────────────────────────

import type { Property } from './types'
import { DEMO } from './demo'

// A small, reliable pool of Unsplash architecture / interior photos.
// None of these contain identifiable people.
const IMG = [
  'photo-1600585154340-be6161a56a0c', // exterior
  'photo-1600596542815-ffad4c1539a9', // exterior
  'photo-1600607687939-ce8a6c25118c', // interior
  'photo-1600566753086-00f18fb6b3ea', // interior
  'photo-1600210492486-724fe5c67fb0', // interior
  'photo-1568605114967-8130f3a36994', // exterior
  'photo-1512917774080-9991f1c4c750', // exterior
  'photo-1493809842364-78817add7ffb', // living room
  'photo-1502672260266-1c1ef2d93688', // interior
  'photo-1522708323590-d24dbb6b0267', // living room
  'photo-1600573472550-8090b5e0745e', // interior
  'photo-1600047509807-ba8f99d2cdde', // interior
]

const img = (i: number, w = 1200) =>
  `https://images.unsplash.com/${IMG[i % IMG.length]}?w=${w}&q=80&auto=format&fit=crop`

// Build a 4-photo set starting at a rotating offset.
const gallery = (offset: number) => [
  img(offset),
  img(offset + 1),
  img(offset + 2),
  img(offset + 3),
]

const NOW = Date.parse('2026-05-30T12:00:00Z')
const day = 24 * 60 * 60 * 1000

interface Seed {
  slug: string
  title: string
  address: string
  area: string
  price: number
  price_type: 'sale' | 'rent'
  beds: number
  baths: number
  sqm: number
  type: Property['type']
  status: Property['status']
  description: string
  features: string[]
  is_featured?: boolean
}

// All addresses use realistic Dublin district names but generic, illustrative
// street references — they do not point to any real, identifiable property.
const SEEDS: Seed[] = [
  {
    slug: '4-bed-victorian-townhouse-ballsbridge',
    title: '4-Bed Victorian Townhouse',
    address: 'Elmwood Terrace, Ballsbridge',
    area: 'Ballsbridge',
    price: 1250000,
    price_type: 'sale',
    beds: 4, baths: 3, sqm: 232,
    type: 'house',
    status: 'for_sale',
    description:
      'A beautifully proportioned red-brick Victorian arranged over three floors, retaining original cornicing, sash windows and marble fireplaces while offering a fully modernised kitchen and a landscaped south-facing garden. A rare opportunity on one of the area’s most desirable terraces.',
    features: ['South-facing garden', 'Original features', 'Off-street parking', 'Gas central heating', 'Period fireplaces', 'Cellar'],
    is_featured: true,
  },
  {
    slug: 'modern-2-bed-apartment-docklands',
    title: 'Modern 2-Bed Apartment',
    address: 'Hanover Wharf, Docklands',
    area: 'Docklands',
    price: 565000,
    price_type: 'sale',
    beds: 2, baths: 2, sqm: 84,
    type: 'apartment',
    status: 'for_sale',
    description:
      'A bright, contemporary apartment in a managed waterside development, with floor-to-ceiling glazing, a private balcony and secure underground parking. Walking distance to the IFSC and the city centre.',
    features: ['Private balcony', 'Underground parking', 'Concierge', 'Floor-to-ceiling glazing', 'Lift access'],
    is_featured: true,
  },
  {
    slug: '3-bed-semi-detached-ranelagh',
    title: '3-Bed Semi-Detached',
    address: 'Cherry Grove, Ranelagh',
    area: 'Ranelagh',
    price: 785000,
    price_type: 'sale',
    beds: 3, baths: 2, sqm: 121,
    type: 'house',
    status: 'for_sale',
    description:
      'A fully renovated family home moments from the village, combining a smart open-plan living space with a separate reception room and a low-maintenance rear garden. Bright, warm and ready to move into.',
    features: ['Renovated throughout', 'Open-plan kitchen', 'Rear garden', 'A-rated boiler', 'Attic conversion'],
    is_featured: true,
  },
  {
    slug: 'penthouse-with-liffey-views-docklands',
    title: 'Penthouse with Liffey Views',
    address: 'Mariner’s Court, Docklands',
    area: 'Docklands',
    price: 1850000,
    price_type: 'sale',
    beds: 3, baths: 3, sqm: 168,
    type: 'penthouse',
    status: 'for_sale',
    description:
      'A statement penthouse occupying the top floor of a landmark riverside building, with a wraparound terrace, dual-aspect living areas and uninterrupted views across the water. The finish throughout is exceptional.',
    features: ['Wraparound terrace', 'River views', 'Two parking spaces', 'Smart-home system', 'Concierge', 'Underfloor heating'],
    is_featured: true,
  },
  {
    slug: 'sandymount-coastal-cottage',
    title: 'Sandymount Coastal Cottage',
    address: 'Strand Cottages, Sandymount',
    area: 'Sandymount',
    price: 3200,
    price_type: 'rent',
    beds: 2, baths: 1, sqm: 78,
    type: 'house',
    status: 'for_rent',
    description:
      'A charming period cottage a short stroll from the strand, freshly redecorated and offered furnished. A cosy sitting room, galley kitchen and a sunny courtyard make this an ideal coastal base.',
    features: ['Furnished', 'Courtyard', 'Close to strand', 'Recently redecorated', 'Pet-friendly'],
  },
  {
    slug: 'new-build-4-bed-detached-blackrock',
    title: 'New-Build 4-Bed Detached',
    address: 'Oakfield Green, Blackrock',
    area: 'Blackrock',
    price: 1095000,
    price_type: 'sale',
    beds: 4, baths: 4, sqm: 198,
    type: 'house',
    status: 'for_sale',
    description:
      'A superb A-rated detached home in a quiet cul-de-sac, finished to the highest specification with a triple-glazed envelope, heat-recovery ventilation and a generous landscaped garden. Energy-efficient family living.',
    features: ['A-rated', 'Heat-recovery ventilation', 'Triple glazing', 'Double garage', 'Underfloor heating', 'Solar panels'],
    is_featured: true,
  },
  {
    slug: '5-bed-detached-residence-dalkey',
    title: '5-Bed Detached Residence',
    address: 'Sorrento Heights, Dalkey',
    area: 'Dalkey',
    price: 2950000,
    price_type: 'sale',
    beds: 5, baths: 4, sqm: 312,
    type: 'house',
    status: 'for_sale',
    description:
      'An imposing detached residence set on mature grounds with sea glimpses, offering grand reception rooms, a family kitchen opening to a south-west terrace, and a self-contained studio. A truly special home.',
    features: ['Sea glimpses', 'Mature grounds', 'Studio annexe', 'Wine cellar', 'Gated entrance', 'Home cinema'],
  },
  {
    slug: '3-bed-victorian-terrace-portobello',
    title: '3-Bed Victorian Terrace',
    address: 'Canal View, Portobello',
    area: 'Portobello',
    price: 695000,
    price_type: 'sale',
    beds: 3, baths: 1, sqm: 104,
    type: 'house',
    status: 'for_sale',
    description:
      'A characterful canal-side terrace blending period charm with tasteful contemporary updates. The bright kitchen-diner opens onto a private patio, and the village is moments away.',
    features: ['Canal-side', 'Period features', 'Private patio', 'Walk to village'],
  },
  {
    slug: '2-bed-canal-side-apartment-portobello',
    title: '2-Bed Canal-Side Apartment',
    address: 'Lockkeeper’s Quay, Portobello',
    area: 'Portobello',
    price: 540000,
    price_type: 'sale',
    beds: 2, baths: 2, sqm: 76,
    type: 'apartment',
    status: 'sold',
    description:
      'A stylish apartment overlooking the canal, sold within days of launch. Bright interiors, a private balcony and an enviable location made this an exceptional offering.',
    features: ['Canal views', 'Balcony', 'Allocated parking', 'Lift access'],
  },
  {
    slug: 'manor-house-on-grounds-howth',
    title: 'Manor House on 0.8 Acres',
    address: 'Cliff Road, Howth',
    area: 'Howth',
    price: 3450000,
    price_type: 'sale',
    beds: 6, baths: 5, sqm: 386,
    type: 'house',
    status: 'for_sale',
    description:
      'A landmark manor house commanding panoramic views over the bay, set on approximately 0.8 acres of established gardens. Elegant, expansive and full of original character, with extensive scope to make it your own.',
    features: ['0.8 acres', 'Panoramic bay views', 'Original features', 'Coach house', 'Walled garden', 'Tennis court'],
    is_featured: true,
  },
  {
    slug: 'period-apartment-merrion-quarter',
    title: 'Period Apartment, Merrion Quarter',
    address: 'Georgian Row, Dublin 2',
    area: 'Dublin 2',
    price: 2750,
    price_type: 'rent',
    beds: 1, baths: 1, sqm: 58,
    type: 'apartment',
    status: 'for_rent',
    description:
      'An elegant one-bedroom apartment within a restored Georgian building, retaining high ceilings and tall windows while offering a smart modern kitchen and bathroom. A refined city-centre base.',
    features: ['High ceilings', 'Georgian building', 'Furnished', 'City-centre'],
  },
  {
    slug: 'georgian-mews-house-ballsbridge',
    title: 'Georgian Mews House',
    address: 'Pembroke Mews, Ballsbridge',
    area: 'Ballsbridge',
    price: 1150000,
    price_type: 'sale',
    beds: 3, baths: 2, sqm: 142,
    type: 'house',
    status: 'reserved',
    description:
      'A discreet mews tucked behind a leafy avenue, cleverly reconfigured to provide bright, flexible living over two floors with a private courtyard and integral garage. Currently reserved.',
    features: ['Integral garage', 'Private courtyard', 'Quiet mews', 'Skylights'],
  },
  {
    slug: 'contemporary-3-bed-duplex-rathmines',
    title: 'Contemporary 3-Bed Duplex',
    address: 'Maple Court, Rathmines',
    area: 'Rathmines',
    price: 625000,
    price_type: 'sale',
    beds: 3, baths: 2, sqm: 112,
    type: 'duplex',
    status: 'for_sale',
    description:
      'A spacious duplex with its own street entrance, offering generous open-plan living below and three double bedrooms above. Bright, well-presented and superbly located close to the village.',
    features: ['Own-door entrance', 'Open-plan living', 'Two balconies', 'Walk to village'],
  },
  {
    slug: 'seafront-2-bed-apartment-dun-laoghaire',
    title: 'Seafront 2-Bed Apartment',
    address: 'Harbour View, Dún Laoghaire',
    area: 'Dún Laoghaire',
    price: 720000,
    price_type: 'sale',
    beds: 2, baths: 2, sqm: 92,
    type: 'apartment',
    status: 'for_sale',
    description:
      'A bright, beautifully maintained apartment directly facing the harbour, with a sunny balcony positioned to capture the morning light and the comings and goings of the marina.',
    features: ['Sea views', 'Balcony', 'Allocated parking', 'Lift access', 'Walk to DART'],
  },
  {
    slug: 'red-brick-4-bed-clontarf',
    title: 'Red-Brick 4-Bed Family Home',
    address: 'Seapark Drive, Clontarf',
    area: 'Clontarf',
    price: 985000,
    price_type: 'sale',
    beds: 4, baths: 3, sqm: 176,
    type: 'house',
    status: 'for_sale',
    description:
      'A handsome red-brick family home on a mature road close to the seafront promenade, with bright, generous rooms, a large rear garden and excellent potential to extend (subject to planning).',
    features: ['Large rear garden', 'Close to seafront', 'Scope to extend', 'Off-street parking'],
  },
  {
    slug: 'studio-apartment-dublin-2',
    title: 'City Studio Apartment',
    address: 'Stephen’s Lane, Dublin 2',
    area: 'Dublin 2',
    price: 1850,
    price_type: 'rent',
    beds: 0, baths: 1, sqm: 36,
    type: 'studio',
    status: 'for_rent',
    description:
      'A neatly designed studio in the heart of the city, offered furnished with a clever fold-away layout that maximises every square metre. Ideal for professionals seeking a low-maintenance base.',
    features: ['Furnished', 'City-centre', 'Bike storage', 'Energy efficient'],
  },
  {
    slug: 'garden-apartment-ranelagh',
    title: 'Garden Apartment',
    address: 'Sallymount Gardens, Ranelagh',
    area: 'Ranelagh',
    price: 495000,
    price_type: 'sale',
    beds: 2, baths: 1, sqm: 71,
    type: 'apartment',
    status: 'for_sale',
    description:
      'A rarely available ground-floor apartment with direct access to a private south-facing garden — a real sense of house-like living in a sought-after village setting.',
    features: ['Private garden', 'Ground floor', 'South-facing', 'Period conversion'],
  },
  {
    slug: 'detached-bungalow-howth',
    title: 'Detached Coastal Bungalow',
    address: 'Balscadden Road, Howth',
    area: 'Howth',
    price: 1395000,
    price_type: 'sale',
    beds: 3, baths: 2, sqm: 148,
    type: 'house',
    status: 'sold',
    description:
      'A single-storey home perched above the harbour with sweeping sea views, sold following a competitive bidding process. A wonderful example of the demand for coastal living.',
    features: ['Sea views', 'Single storey', 'Mature garden', 'Off-street parking'],
  },
  {
    slug: 'townhouse-with-roof-terrace-docklands',
    title: 'Townhouse with Roof Terrace',
    address: 'Gallery Quay, Docklands',
    area: 'Docklands',
    price: 875000,
    price_type: 'sale',
    beds: 3, baths: 3, sqm: 138,
    type: 'house',
    status: 'for_sale',
    description:
      'A modern mid-terrace townhouse arranged over three floors, finishing with a private roof terrace that enjoys afternoon sun and city skyline views. Secure parking included.',
    features: ['Roof terrace', 'Three floors', 'Secure parking', 'City views', 'Guest WC'],
  },
  {
    slug: 'period-3-bed-rathmines',
    title: 'Period 3-Bed Over Garden',
    address: 'Leinster Square, Rathmines',
    area: 'Rathmines',
    price: 3450,
    price_type: 'rent',
    beds: 3, baths: 2, sqm: 118,
    type: 'apartment',
    status: 'for_rent',
    description:
      'A spacious period apartment occupying the upper floors of a fine Victorian, with elegant high-ceilinged rooms, a modern kitchen and shared use of a beautiful communal garden.',
    features: ['High ceilings', 'Communal garden', 'Furnished', 'Period building', 'Walk to village'],
  },
]

// Materialise the full Property records from the lightweight seeds.
export const PROPERTIES: Property[] = SEEDS.map((s, i) => ({
  id: `demo-${String(i + 1).padStart(3, '0')}`,
  slug: s.slug,
  title: s.title,
  address: s.address,
  area: s.area,
  price: s.price,
  price_type: s.price_type,
  beds: s.beds,
  baths: s.baths,
  sqm: s.sqm,
  type: s.type,
  status: s.status,
  description: s.description,
  images: gallery(i),
  video_url: null,
  features: s.features,
  agent_name: DEMO.agentName,
  agent_phone: DEMO.phone,
  agent_email: DEMO.email,
  is_featured: !!s.is_featured,
  ref_number: `LP-${1000 + i + 1}`,
  created_at: new Date(NOW - i * day).toISOString(),
  updated_at: new Date(NOW - i * day).toISOString(),
}))

// ─── Query helpers (same signatures the pages already use) ─────────────────
// Kept async so existing `await` call-sites need no changes.

export async function getProperties(filters?: {
  status?: string
  type?: string
  area?: string
  minPrice?: number
  maxPrice?: number
  minBeds?: number
  search?: string
  featured?: boolean
  limit?: number
  offset?: number
}): Promise<{ properties: Property[]; count: number }> {
  let list = [...PROPERTIES]

  if (filters?.featured) list = list.filter((p) => p.is_featured)
  if (filters?.status && filters.status !== 'all') list = list.filter((p) => p.status === filters.status)
  if (filters?.type && filters.type !== 'all') list = list.filter((p) => p.type === filters.type)
  if (filters?.area && filters.area !== 'all') list = list.filter((p) => p.area === filters.area)
  if (filters?.minPrice) list = list.filter((p) => p.price >= filters.minPrice!)
  if (filters?.maxPrice) list = list.filter((p) => p.price <= filters.maxPrice!)
  if (filters?.minBeds) list = list.filter((p) => p.beds >= filters.minBeds!)
  if (filters?.search) {
    const q = filters.search.toLowerCase()
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q)
    )
  }

  // Featured first, then newest.
  list.sort((a, b) => {
    if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1
    return b.created_at.localeCompare(a.created_at)
  })

  const count = list.length

  if (filters?.limit != null) {
    const start = filters.offset || 0
    list = list.slice(start, start + filters.limit)
  }

  return { properties: list, count }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  return PROPERTIES.find((p) => p.slug === slug) ?? null
}

export async function getPropertyById(id: string): Promise<Property | null> {
  return PROPERTIES.find((p) => p.id === id) ?? null
}

export async function getAreas(): Promise<string[]> {
  return [...new Set(PROPERTIES.map((p) => p.area))].sort()
}

// Demo enquiry handler. Intentionally stores nothing and contacts no one —
// it simply simulates a network round-trip so the UI can show its success
// state. See /legal.
export async function submitInquiry(_inquiry: Record<string, unknown>): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 600))
}
