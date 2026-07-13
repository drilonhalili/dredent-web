// ---------------------------------------------------------------------------
// SITE CONTENT — everything business-specific lives in this one file.
// Swap the placeholder copy, numbers, and image seeds below for the real
// practice's details. Nothing else in the codebase needs to change.
// ---------------------------------------------------------------------------

export const business = {
  name: "Dredent Dental Clinic",
  shortName: "Dredent",
  tagline: "Excellent care, personal attention.",
  descriptionShort:
    "A family dental clinic in Tetovo, North Macedonia — general and cosmetic dentistry built on compassionate care and long-lasting, trusting relationships.",
  phone: "+389 70 376 959",
  phoneHref: "tel:+38970376959",
  // TODO: replace with the clinic's real email before launch.
  email: "info@dredent.example",
  address: {
    line1: "Strasho Pindjur Rd 121",
    line2: "1200 Tetovo, North Macedonia",
  },
  mapQuery: "Dredent+Dental+Clinic+Strasho+Pindjur+121+Tetovo",
  // APPROXIMATE Tetovo city-center coordinates. For best local-SEO results, replace
  // with the exact pin: right-click the clinic pin in Google Maps → copy coordinates.
  geo: { lat: 42.0106, lng: 20.9714 },
  // Google confirms only "Closes 6 PM". Opening time and weekend hours below are
  // ASSUMED — verify against the real schedule (and keep components/json-ld.tsx in sync).
  hours: [
    { days: "Mon – Fri", time: "08:00 – 18:00" },
    { days: "Sat – Sun", time: "Closed" },
  ],
  social: {
    instagram: "https://www.instagram.com/dredentclinicandlab/",
    instagramHandle: "@dredentclinicandlab",
    facebook: "https://www.facebook.com/dredentclinic/",
  },
  bookingHref: "#contact",
} as const;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Transformations", href: "#transformations" },
  { label: "Stories", href: "#stories" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

// The 5.0 is real but currently based on a single Google review — consider swapping this
// line for something else (e.g. years in practice, once confirmed) until more reviews land.
export const trustLine = "5.0 ★ on Google · Tetovo, North Macedonia";

// Services — deliberately not numbered 01/02/03: there's no real sequence to them,
// a patient picks whichever one applies to them.
export type Service = {
  icon: "scan" | "gem" | "sparkles" | "layers" | "anchor" | "stethoscope";
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    icon: "scan",
    title: "Digital Smile Design",
    description:
      "An intraoral scan and a same-visit preview of your new smile, so you approve the shape before any tooth is touched.",
  },
  {
    icon: "gem",
    title: "Porcelain Veneers",
    description:
      "Hand-layered ceramic, matched to a precise shade and light translucency rather than a generic 'white.'",
  },
  {
    icon: "sparkles",
    title: "Teeth Whitening",
    description:
      "In-studio and take-home systems calibrated to lift shade without the sensitivity that comes with over-the-counter kits.",
  },
  {
    icon: "layers",
    title: "Invisible Aligners",
    description:
      "Clear, removable trays with a digital treatment plan you can scrub through step by step before you commit.",
  },
  {
    icon: "anchor",
    title: "Dental Implants",
    description:
      "Guided placement planned from a CBCT scan, restoring a single tooth or a full arch with a fixed, permanent result.",
  },
  {
    icon: "stethoscope",
    title: "General & Preventive Care",
    description:
      "Cleanings, exams, and early diagnostics — the unglamorous groundwork that keeps the rest of this list unnecessary.",
  },
];

// Before / after pairs for the signature "Smile Reveal" compare slider.
// Shade codes follow the VITA Classical scale (lighter letter/number = brighter).
export type ComparePair = {
  id: string;
  title: string;
  beforeSeed: string;
  afterSeed: string;
  beforeShade: string;
  afterShade: string;
  procedure: string;
};

export const comparePairs: ComparePair[] = [
  {
    id: "case-01",
    title: "Porcelain veneers, 6 units",
    beforeSeed: "cusp-case-01-before",
    afterSeed: "cusp-case-01-after",
    beforeShade: "C2",
    afterShade: "A1",
    procedure: "Digital smile design → 6 porcelain veneers",
  },
  {
    id: "case-02",
    title: "Whitening + composite edge repair",
    beforeSeed: "cusp-case-02-before",
    afterSeed: "cusp-case-02-after",
    beforeShade: "A3.5",
    afterShade: "B1",
    procedure: "In-studio whitening → composite bonding",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  context: string;
};

// ⚠️ SAMPLE CONTENT — these quotes are fictional and illustrative, NOT real Dredent
// patients. Replace them with genuine reviews (with each patient's written consent)
// before launch, or remove the <Testimonials /> section from app/page.tsx. Publishing
// invented testimonials for a real clinic is misleading advertising.
export const testimonials: Testimonial[] = [
  {
    quote:
      "They showed me the digital preview before touching anything, so there were no surprises at the reveal appointment. That alone was worth it.",
    name: "L. Ivanova",
    context: "Porcelain veneers, 2025",
  },
  {
    quote:
      "I'd put off a chipped front tooth for two years out of nerves. The whole visit was calmer than a dentist has any right to be.",
    name: "M. Petrovski",
    context: "Composite bonding, 2026",
  },
  {
    quote:
      "Clear treatment plan, honest timeline, and my aligners actually finished a week ahead of schedule.",
    name: "D. Kostova",
    context: "Invisible aligners, 2025",
  },
];

export type FaqItem = { question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    question: "How many visits does a smile makeover usually take?",
    answer:
      "A digital design and shade match happen in the first visit. Most veneer or bonding cases finish in two to three appointments after that, spaced about a week apart for the lab work.",
  },
  {
    question: "Do you show me the result before it's permanent?",
    answer:
      "Yes — every cosmetic case starts with an intraoral scan and a rendered preview. Nothing is bonded or cemented until you've approved the shape and shade on screen.",
  },
  {
    question: "Is whitening safe on crowns or old fillings?",
    answer:
      "Whitening gel only lightens natural enamel, not existing ceramic or composite work. We'll flag any restorations that might need replacing afterward to match the new shade.",
  },
  {
    question: "Do you treat patients visiting from abroad?",
    answer:
      "Regularly. Tell us your available dates and we'll sequence scans, prep, and delivery into as few trips as possible, with everything documented digitally for your home dentist.",
  },
  {
    question: "What financing or payment options are available?",
    answer:
      "Card, bank transfer, and staged payments across treatment milestones. Implant and full-arch cases can be split across the treatment timeline rather than paid upfront.",
  },
];

export type InstagramPost = {
  id: string;
  seed: string;
  caption: string;
  likes: number;
  big?: boolean;
};

// Placeholder tiles for the Instagram-style mosaic. Swap `seed` values for real photo
// assets, and see components/instagram-mosaic.tsx for how to wire this to a live feed.
export const instagramPosts: InstagramPost[] = [
  { id: "ig-1", seed: "cusp-ig-1", caption: "Same-day whitening touch-up", likes: 214, big: true },
  { id: "ig-2", seed: "cusp-ig-2", caption: "New scanner day", likes: 98 },
  { id: "ig-3", seed: "cusp-ig-3", caption: "Shade matching in progress", likes: 143 },
  { id: "ig-4", seed: "cusp-ig-4", caption: "Studio, Friday morning light", likes: 176 },
  { id: "ig-5", seed: "cusp-ig-5", caption: "Veneer try-in before cementation", likes: 231, big: true },
  { id: "ig-6", seed: "cusp-ig-6", caption: "Team coffee before opening", likes: 87 },
  { id: "ig-7", seed: "cusp-ig-7", caption: "Aligner case, week 1 vs week 12", likes: 165 },
  { id: "ig-8", seed: "cusp-ig-8", caption: "New patient welcome kit", likes: 72 },
];

export const seo = {
  title: "Dredent Dental Clinic — Dentist in Tetovo, North Macedonia",
  description:
    "General and cosmetic dentistry in Tetovo, North Macedonia. Dredent Dental Clinic — excellent care and personal attention at Strasho Pindjur 121. Book a consultation.",
  // TODO: replace with the real domain before launch — canonical URL, sitemap.xml,
  // robots.txt, and Open Graph tags are all generated from this value.
  siteUrl: "https://www.dredent.example",
  keywords: [
    "dentist Tetovo",
    "dental clinic Tetovo",
    "dentist Tetovë",
    "stomatolog Tetovo",
    "cosmetic dentistry Tetovo",
    "teeth whitening Tetovo",
    "dental implants Tetovo",
    "dentist North Macedonia",
  ],
} as const;
