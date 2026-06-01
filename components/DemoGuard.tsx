'use client'

import { useEffect, useState } from 'react'
import { Info } from 'lucide-react'

// Site-wide safety net. Because this is a public demo, no action may actually
// contact a real person. This component intercepts every click on a phone,
// email or WhatsApp link anywhere on the page, cancels it, and shows a brief
// notice instead. Server components can keep rendering ordinary <a> tags —
// they are neutralised here in one place.
const BLOCKED = ['tel:', 'mailto:', 'sms:', 'wa.me', 'api.whatsapp.com', 'whatsapp:']

export default function DemoGuard() {
  const [toast, setToast] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest('a') as HTMLAnchorElement | null
      if (!anchor) return

      const href = (anchor.getAttribute('href') || '').toLowerCase()
      if (!href) return

      if (BLOCKED.some((b) => href.startsWith(b) || href.includes(b))) {
        e.preventDefault()
        e.stopPropagation()
        setToast(true)
        clearTimeout(timer)
        timer = setTimeout(() => setToast(false), 3600)
      }
    }

    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      clearTimeout(timer)
    }
  }, [])

  if (!toast) return null

  return (
    <div
      role="status"
      className="fixed left-1/2 bottom-6 z-[200] -translate-x-1/2 px-2 w-[calc(100%-2rem)] max-w-md"
    >
      <div className="flex items-start gap-3 rounded-xl bg-[#111714] text-white shadow-2xl px-4 py-3">
        <Info size={18} className="mt-0.5 shrink-0 text-[var(--green-light)]" />
        <p className="text-sm leading-snug">
          This is a demo — calling, emailing and WhatsApp are disabled. No real
          person is contacted.
        </p>
      </div>
    </div>
  )
}
