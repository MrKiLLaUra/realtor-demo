import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, type: 'sale' | 'rent' = 'sale') {
  const formatted = new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price)
  return type === 'rent' ? `${formatted}/mo` : formatted
}

export function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export const STATUS_LABELS: Record<string, string> = {
  for_sale: 'For Sale',
  for_rent: 'For Rent',
  sold: 'Sold',
  reserved: 'Reserved',
}

export const STATUS_COLORS: Record<string, string> = {
  for_sale: 'bg-emerald-600 text-white',
  for_rent: 'bg-blue-600 text-white',
  sold: 'bg-zinc-800 text-white',
  reserved: 'bg-amber-500 text-white',
}

export const TYPE_LABELS: Record<string, string> = {
  apartment: 'Apartment',
  house: 'House',
  penthouse: 'Penthouse',
  duplex: 'Duplex',
  studio: 'Studio',
  commercial: 'Commercial',
}

export function getWhatsAppLink(phone: string, message: string) {
  const clean = phone.replace(/\D/g, '')
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`
}

export function calcMortgage(price: number, deposit: number, rate: number, years: number) {
  const principal = price - deposit
  const monthly = rate / 100 / 12
  const n = years * 12
  if (monthly === 0) return principal / n
  return (principal * monthly * Math.pow(1 + monthly, n)) / (Math.pow(1 + monthly, n) - 1)
}
