import type { Metadata } from 'next'
import Link from 'next/link'
import { DEMO } from '@/lib/demo'

export const metadata: Metadata = {
  title: 'Legal & Privacy',
  description: 'Disclaimer, privacy notice and terms for this demonstration website.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-[var(--ink)] mb-3">{title}</h2>
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-[var(--ink-2)]">{children}</div>
    </section>
  )
}

export default function LegalPage() {
  return (
    <div className="pt-[102px] min-h-screen bg-[var(--bg)]">
      <div className="bg-white border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-14">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--green)] mb-2">Transparency</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--ink)]">Legal &amp; Privacy</h1>
          <p className="text-[var(--ink-3)] mt-2 text-sm">
            Please read this — it explains exactly what this website is, and isn&apos;t.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12">
        {/* Headline disclaimer */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-6 mb-12">
          <p className="text-sm leading-relaxed text-[var(--ink)]">
            <strong>This is a demonstration website.</strong> {DEMO.disclaimer}
          </p>
        </div>

        <Section title="Nature of this website">
          <p>
            This site, &ldquo;{DEMO.brand}&rdquo;, is a portfolio demonstration created by{' '}
            <a href={DEMO.studioUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--green)] underline underline-offset-2">
              {DEMO.studioName}
            </a>{' '}
            to illustrate the design and functionality of a property website. It is not a real estate
            agency, is not licensed or regulated as one, and does not provide property, financial,
            legal or any other professional services.
          </p>
        </Section>

        <Section title="Fictional content">
          <p>
            All listings, photographs, prices, descriptions, locations, reference numbers, people,
            names, reviews and contact details shown here are fictional or illustrative. Any
            resemblance to a real property, person, business or address is coincidental. Property
            imagery is licensed stock photography used for illustration only and does not depict the
            places described.
          </p>
          <p>
            The mortgage calculator and any figures, statistics or &ldquo;reviews&rdquo; are
            illustrative examples and must not be relied upon for any decision.
          </p>
        </Section>

        <Section title="Contact actions are disabled">
          <p>
            Calling, emailing, WhatsApp and the enquiry forms are intentionally non-functional. The
            phone number and email address are placeholders that do not connect to anyone, and
            submitting a form sends and stores nothing. No message you enter reaches any real person.
          </p>
        </Section>

        <Section title="Privacy & cookies">
          <p>
            This demo does not collect personal data, does not use tracking or advertising cookies,
            and runs no analytics that identify you. Anything you type into a form stays in your
            browser and is discarded.
          </p>
          <p>
            We use your browser&apos;s <strong>local storage</strong> for two small, purely functional
            things: remembering the listings you tap &ldquo;save&rdquo; on, and remembering that you
            dismissed the cookie notice. This data never leaves your device and you can clear it at any
            time from your browser settings.
          </p>
        </Section>

        <Section title="No warranty">
          <p>
            This website is provided &ldquo;as is&rdquo;, for demonstration purposes only, without
            warranties of any kind. {DEMO.studioName} accepts no liability for any action taken on the
            basis of its fictional content.
          </p>
        </Section>

        <Section title="Third-party content">
          <p>
            Map previews are embedded from Google Maps and show approximate areas only. Photography is
            served from Unsplash. These services are subject to their own terms.
          </p>
        </Section>

        <Section title="Contact about this demo">
          <p>
            Questions about this demonstration, or interested in a website like it? Get in touch with{' '}
            <a href={DEMO.studioUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--green)] underline underline-offset-2">
              {DEMO.studioName}
            </a>
            .
          </p>
        </Section>

        <div className="pt-6 border-t border-[var(--border)]">
          <Link href="/" className="text-sm font-medium text-[var(--green)] hover:underline">
            ← Back to the demo
          </Link>
        </div>
      </div>
    </div>
  )
}
