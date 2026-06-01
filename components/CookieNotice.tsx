'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Cookie } from 'lucide-react'

// Lightweight consent / transparency notice. This demo sets no tracking
// cookies and uses no analytics — it only stores your saved properties and
// this acknowledgement in your browser's local storage. The notice makes that
// explicit and is dismissed per-browser.
const KEY = 'lp_cookie_ack'

export default function CookieNotice() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true)
    } catch {
      /* storage unavailable — say nothing */
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      /* ignore */
    }
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-4 left-4 z-[150] w-[calc(100%-2rem)] max-w-sm">
      <div className="rounded-2xl bg-white border border-[var(--border)] shadow-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <Cookie size={16} className="text-[var(--green)]" />
          <span className="text-sm font-semibold text-[var(--ink)]">A quick note</span>
        </div>
        <p className="text-xs leading-relaxed text-[var(--ink-2)]">
          This demo uses no tracking cookies or analytics. We only use your
          browser&apos;s local storage to remember the listings you save and that
          you&apos;ve seen this message.{' '}
          <Link href="/legal" className="text-[var(--green)] font-medium underline underline-offset-2">
            Learn more
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="mt-4 w-full py-2.5 rounded-lg bg-[var(--green)] text-white text-sm font-semibold hover:bg-[var(--green-dark)] transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  )
}
