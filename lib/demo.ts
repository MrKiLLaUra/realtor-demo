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

  // ── Legal / privacy facts ─────────────────────────────────────────────
  // Real, accurate-to-this-demo values used by the /legal page. The studio
  // (Limen Studios) is the only real party; it is the operator and data
  // controller for this demonstration site.
  controller: 'Limen Studios',
  jurisdiction: 'Ireland',

  // Where to actually reach a human about this demo or its privacy practices.
  // `email` is an RFC-2606 `.example` address that cannot receive mail, so the
  // real contact route is the studio's website.
  privacyContact: 'https://www.limen-studios.com',

  // EU/Irish data-protection supervisory authority (for the right-to-complain
  // section). Relevant because the demo is presented in a Dublin/EU context.
  supervisoryAuthority: {
    name: 'Data Protection Commission (Ireland)',
    url: 'https://www.dataprotection.ie',
  },

  // Effective date shown as "Last updated" and referenced by the changes clause.
  legalLastUpdated: '2 June 2026',

  // The only data this site stores: two first-party, functional localStorage
  // keys. Documented here so the privacy notice provably matches the code.
  //   • lp_cookie_ack — components/CookieNotice.tsx
  //   • pp_favorites  — lib/useFavorites.ts
  storageKeys: [
    {
      key: 'lp_cookie_ack',
      purpose: 'Remembers that you dismissed the cookie / transparency notice.',
    },
    {
      key: 'pp_favorites',
      purpose: 'Remembers the listings you tap “save” on, so they persist between visits.',
    },
  ],
} as const
