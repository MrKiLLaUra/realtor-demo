import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { DEMO } from '@/lib/demo'

const nav = [
  { label: 'Properties', href: '/properties' },
  { label: 'Compare', href: '/compare' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0f1a12', color: 'rgba(255,255,255,0.65)' }}>
      <div className="max-w-7xl mx-auto px-8 sm:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 pb-14" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--green-light)' }} />
              <span className="font-bold text-white text-[17px] tracking-tight">{DEMO.brand}</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Dublin&apos;s boutique estate agency. Discreet representation, off-market access, and a process built around the lives our clients actually lead.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-[10px] font-bold uppercase mb-5"
              style={{ letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)' }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-[10px] font-bold uppercase mb-5"
              style={{ letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)' }}
            >
              Contact
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { Icon: Phone, text: DEMO.phone, href: `tel:${DEMO.phone.replace(/\s/g, '')}` },
                { Icon: Mail, text: DEMO.email, href: `mailto:${DEMO.email}` },
                { Icon: MapPin, text: DEMO.location, href: '#' },
              ].map(({ Icon, text, href }) => (
                <li key={text}>
                  <a
                    href={href}
                    className="flex items-start gap-3 text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    <Icon size={14} className="mt-0.5 shrink-0" />
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="pt-10 text-xs leading-relaxed max-w-3xl" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {DEMO.disclaimer}
        </p>

        <div className="flex flex-col sm:flex-row justify-between gap-3 pt-8 mt-8 text-xs" style={{ color: 'rgba(255,255,255,0.3)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <span>© {new Date().getFullYear()} {DEMO.brand} — a fictional demo.</span>
          <span className="flex items-center gap-4">
            <Link href="/legal" className="hover:text-white transition-colors">Legal &amp; Privacy</Link>
            <a
              href={DEMO.studioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              A demo by {DEMO.studioName} ↗
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
