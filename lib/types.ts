export type PropertyStatus = 'for_sale' | 'for_rent' | 'sold' | 'reserved'
export type PropertyType = 'apartment' | 'house' | 'penthouse' | 'duplex' | 'studio' | 'commercial'
export type PriceType = 'sale' | 'rent'

export interface Property {
  id: string
  slug: string
  title: string
  address: string
  area: string
  price: number
  price_type: PriceType
  beds: number
  baths: number
  sqm: number
  type: PropertyType
  status: PropertyStatus
  description: string | null
  images: string[]
  video_url: string | null
  features: string[]
  agent_name: string
  agent_phone: string
  agent_email: string
  is_featured: boolean
  ref_number: string | null
  created_at: string
  updated_at: string
}

export interface Inquiry {
  property_id?: string
  property_title?: string
  name: string
  phone: string
  email?: string
  message?: string
  type: 'general' | 'viewing' | 'callback' | 'valuation'
  preferred_date?: string
  preferred_time?: string
}

export interface FilterState {
  search: string
  status: string
  type: string
  area: string
  minPrice: number
  maxPrice: number
  minBeds: number
}
