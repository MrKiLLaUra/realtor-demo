'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { DEMO } from '@/lib/demo'

const links = [
  { href: '/', label: 'Home' },
  { href: '/properties', label: 'Properties' },
  { href: '/compare', label: 'Compare' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', h, { passive: true })
    h()
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200"
      style={{
        borderBottom: '1px solid var(--border)',
        boxShadow: scrolled ? '0 1px 12px rgba(17,23,20,0.08)' : 'none',
      }}
    >
      {/* Demo ribbon */}
      <a
        href={DEMO.studioUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 h-[var(--banner-h)] px-4 text-center text-white transition-opacity hover:opacity-90"
        style={{ background: 'var(--ink)' }}
      >
        <span className="text-[11px] sm:text-xs font-medium tracking-tight">
          <span className="opacity-60">Live demo</span> · Like it? Get a site like this from {DEMO.studioName}
        </span>
        <ArrowUpRight size={13} className="shrink-0 opacity-80" />
      </a>

      <div className="max-w-7xl mx-auto px-8 sm:px-12 flex items-center justify-between h-[68px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--green)' }} />
          <span className="font-bold text-[15px] tracking-tight" style={{ color: 'var(--ink)' }}>
            {DEMO.brand}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: pathname === l.href ? 'var(--ink)' : 'transparent',
                color: pathname === l.href ? 'white' : 'var(--ink-2)',
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={`tel:${DEMO.phone.replace(/\s/g, '')}`}
            className="text-sm font-medium"
            style={{ color: 'var(--ink-3)' }}
          >
            {DEMO.phone}
          </a>
          <Link
            href="/contact"
            className="px-5 py-2.5 text-sm font-bold text-white rounded-xl transition-opacity hover:opacity-90"
            style={{ background: 'var(--green)' }}
          >
            Book a Viewing
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors"
          style={{ color: 'var(--ink-2)' }}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 py-5 flex flex-col gap-1"
          style={{ borderTop: '1px solid var(--border)', background: 'white' }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              style={{
                background: pathname === l.href ? 'var(--ink)' : 'transparent',
                color: pathname === l.href ? 'white' : 'var(--ink-2)',
              }}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-4 pt-4 flex flex-col gap-3" style={{ borderTop: '1px solid var(--border)' }}>
            <a href={`tel:${DEMO.phone.replace(/\s/g, '')}`} className="text-sm px-4 py-2" style={{ color: 'var(--ink-3)' }}>
              {DEMO.phone}
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-sm font-bold text-white text-center rounded-xl"
              style={{ background: 'var(--green)' }}
            >
              Book a Viewing
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
