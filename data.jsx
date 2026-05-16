// Sample data for Prestige Properties demo

const LISTINGS = [
  {
    id: 1,
    status: "For Sale",
    price: "€1,250,000",
    title: "4-bed Victorian Townhouse",
    address: "Pembroke Road, Ballsbridge, Dublin 4",
    beds: 4, baths: 3, sqm: 245,
    tags: ["Period", "Garden", "Garage"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    description: "An immaculately restored Victorian on one of Ballsbridge's most sought-after streets. South-facing rear garden, original cornice work, two reception rooms, and a kitchen extension by Niall McLaughlin.",
    agent: "Sophia Kavanagh",
  },
  {
    id: 2,
    status: "For Sale",
    price: "€495,000",
    title: "Modern 2-bed Apartment",
    address: "Grand Canal Dock, Dublin 2",
    beds: 2, baths: 2, sqm: 92,
    tags: ["New", "Balcony", "Concierge"],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    description: "Bright corner apartment with floor-to-ceiling glazing onto the Liffey. Underfloor heating, concierge, secure parking, and a private balcony with quay views.",
    agent: "Sophia Kavanagh",
  },
  {
    id: 3,
    status: "For Sale",
    price: "€785,000",
    title: "3-bed Semi-Detached",
    address: "Ranelagh, Dublin 6",
    beds: 3, baths: 2, sqm: 156,
    tags: ["Renovated", "South-facing"],
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    description: "A handsome semi in the heart of Ranelagh, freshly renovated with a Plain English kitchen, refinished pitch-pine floors, and a walled south-facing garden.",
    agent: "Sophia Kavanagh",
  },
  {
    id: 4,
    status: "For Sale",
    price: "€1,850,000",
    title: "Penthouse with Liffey Views",
    address: "Hanover Quay, Dublin 2",
    beds: 3, baths: 3, sqm: 210,
    tags: ["Penthouse", "Terrace", "Lift"],
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    description: "Top-floor duplex with a 60sqm wraparound terrace and direct lift access. Sweeping Liffey and Poolbeg views, double-height living, and a media room with custom joinery.",
    agent: "Sophia Kavanagh",
  },
  {
    id: 5,
    status: "For Rent",
    price: "€2,800/mo",
    title: "Sandymount Coastal Cottage",
    address: "Strand Road, Sandymount, Dublin 4",
    beds: 2, baths: 1, sqm: 88,
    tags: ["Furnished", "Sea Views"],
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    description: "A characterful coastal cottage moments from Sandymount Strand. Fully furnished to a high standard, with a south-facing courtyard and uninterrupted sea-facing aspect.",
    agent: "Sophia Kavanagh",
  },
  {
    id: 6,
    status: "For Sale",
    price: "€945,000",
    title: "New-build 4-bed Detached",
    address: "Dundrum, Dublin 14",
    beds: 4, baths: 3, sqm: 198,
    tags: ["A-Rated", "EV Charger", "Garden"],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    description: "Brand-new A-rated detached home in a quiet Dundrum cul-de-sac. Triple glazing, air-source heating, EV charger, fully landscaped garden, and a 10-year structural guarantee.",
    agent: "Sophia Kavanagh",
  },
];

const TESTIMONIALS = [
  {
    rating: 5,
    quote: "Sophia found us a home we didn't even know to look for. Her eye for what suits a family is uncanny — and the off-market access was decisive.",
    name: "Eoin & Maeve Doherty",
    detail: "Bought in Ranelagh · 2025",
  },
  {
    rating: 5,
    quote: "Sold above asking in nine days. The styling advice, the photography, the way viewings were curated — every detail felt considered.",
    name: "Aisling N.",
    detail: "Sold in Dublin 2 · 2025",
  },
  {
    rating: 5,
    quote: "We were relocating from London with two weeks' notice. Sophia handled viewings by video, then keys on arrival. Faultless.",
    name: "James Whitford",
    detail: "Rented in Sandymount · 2024",
  },
];

const STATS = [
  { value: 340, suffix: "+", label: "Homes Sold" },
  { value: 14, suffix: "", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 12, suffix: "", label: "Avg Days to Sell" },
];

const MARQUEE_ITEMS = [
  "340+ Homes Sold",
  "Dublin 2",
  "Dublin 4",
  "Free Valuations",
  "WhatsApp Support",
  "AI-Powered Search",
  "Luxury Residential",
];

const CHAT_SCRIPT = [
  { from: "agent", text: "Hi, I'm Sophia. Looking for a particular neighbourhood or budget?" },
  { from: "user", text: "Something in Dublin 4, around €1.2M, 3+ beds." },
  { from: "agent", text: "Perfect — I have two off-market in Ballsbridge that match. Want me to send details?" },
];

Object.assign(window, { LISTINGS, TESTIMONIALS, STATS, MARQUEE_ITEMS, CHAT_SCRIPT });
