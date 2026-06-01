// ─────────────────────────────────────────────────────────────────────────
//  DEMO CONFIGURATION
//
//  Central place for all the fictional, demo-safe values used across the site.
//  This is a demonstration website built by Limen Studios. It is not a real
//  estate agency. All names, contact details and figures below are invented
//  and intentionally non-functional:
//
//   • The phone number uses a clearly illustrative "555" style.
//   • The email uses the reserved `.example` TLD (RFC 2606) and cannot exist.
//   • Contact actions (call / email / WhatsApp) are disabled site-wide by the
//     <DemoGuard> component — clicking them shows a notice instead.
// ─────────────────────────────────────────────────────────────────────────

export const DEMO = {
  // The studio that built the demo — the only real link on the site.
  studioName: 'Limen Studios',
  studioUrl: process.env.NEXT_PUBLIC_STUDIO_URL || 'https://www.limen-studios.com',

  // The fictional agency this demo portrays.
  brand: 'Limen Properties',
  agentName: 'Aoife Brennan',
  agentRole: 'Lead Agent (illustrative)',

  // Demo-safe, non-functional contact details.
  phone: '+353 1 555 0123',
  email: 'hello@limen.example',
  // City/area only — deliberately not a real, identifiable address.
  location: 'Dublin, Ireland',

  // Short reusable disclaimer string.
  disclaimer:
    'This is a fictional demonstration website created by Limen Studios. All properties, prices, people, reviews and contact details are illustrative only and do not represent real listings, individuals, or a licensed estate agency.',
} as const
