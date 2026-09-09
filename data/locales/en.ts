import type { Dictionary } from "./types";

export const en: Dictionary = {
  langName: "English",
  seo: {
    title: "Dredent Dental Clinic — Dentist in Tetovo, North Macedonia",
    description:
      "General and cosmetic dentistry in Tetovo, North Macedonia. Dredent Dental Clinic — excellent care and personal attention at Strasho Pindjur 121. Book a consultation.",
    keywords: [
      "dentist Tetovo",
      "dental clinic Tetovo",
      "dentist Tetovë",
      "stomatolog Tetovo",
      "cosmetic dentistry Tetovo",
      "teeth whitening Tetovo",
      "dental implants Tetovo",
      "dental check-up Tetovo",
      "tooth extraction Tetovo",
      "pediatric dentist Tetovo",
      "dentist North Macedonia",
    ],
  },
  tagline: "Excellent care, personal attention.",
  descriptionShort:
    "A family dental clinic in Tetovo, North Macedonia — general and cosmetic dentistry built on compassionate care and long-lasting, trusting relationships.",
  // The 5.0 is real but currently based on a single Google review — consider swapping this
  // line for something else (e.g. years in practice, once confirmed) until more reviews land.
  trustLine: "5.0 ★ on Google · Tetovo, North Macedonia",
  address: { line1: "Strasho Pindjur Rd 121", line2: "1200 Tetovo, North Macedonia" },
  hours: { weekdays: "Mon – Fri", saturday: "Sat", sunday: "Sun", closed: "Closed" },
  nav: {
    about: "About",
    services: "Services",
    transformations: "Transformations",
    stories: "Stories",
    faq: "FAQ",
    contact: "Contact",
  },
  a11y: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryNav: "Primary",
    language: "Language",
    mapTitle: "Map showing the location of {name}",
    dragToCompare: "Drag to compare: {before} versus {after}",
    beforeAlt: "Before: {title}",
    afterAlt: "After: {title}",
    before: "Before",
    after: "After",
  },
  hero: {
    eyebrow: "General & Cosmetic Dentistry — Tetovo",
    titleStart: "See your smile",
    titleEmphasis: "before it exists.",
    lede: "A digital scan, a precise porcelain match, and a preview you sign off on before we touch a single tooth.",
    bookCta: "Book a consultation",
    resultsCta: "See real transformations",
    shade: "Shade",
    tapHint: "Tap to re-run the scan",
  },
  about: {
    eyebrow: "About the studio",
    title: "Dentistry that shows its work",
    body: "Every plan starts on a screen, not a hunch. We scan, model, and preview before we commit to anything permanent, so the version of your smile you approve on-screen is the one you actually get in the chair.",
    quote:
      "We strive to ensure that our patients receive excellent care and personal attention, served with compassion and kindness.",
    quoteAttribution: "— our promise to every patient",
    tags: ["Tetovo, North Macedonia", "General & cosmetic", "Clinic & lab"],
    imageAlt: "Gold-toned cast of upper and lower rows of teeth, facing each other",
  },
  services: {
    eyebrow: "What we treat",
    title: "Six ways into a better bite",
    subtitle:
      "Pick whichever applies — there's no order to work through, just the thing that's actually bothering you.",
    items: {
      "smile-design": {
        title: "Digital Smile Design",
        description:
          "An intraoral scan and a same-visit preview of your new smile, so you approve the shape before any tooth is touched.",
      },
      veneers: {
        title: "Porcelain Veneers",
        description:
          "Hand-layered ceramic, matched to a precise shade and light translucency rather than a generic 'white.'",
      },
      whitening: {
        title: "Teeth Whitening",
        description:
          "In-studio and take-home systems calibrated to lift shade without the sensitivity that comes with over-the-counter kits.",
      },
      aligners: {
        title: "Invisible Aligners",
        description:
          "Clear, removable trays with a digital treatment plan you can scrub through step by step before you commit.",
      },
      implants: {
        title: "Dental Implants",
        description:
          "Guided placement planned from a CBCT scan, restoring a single tooth or a full arch with a fixed, permanent result.",
      },
      general: {
        title: "General & Preventive Care",
        description:
          "Cleanings, exams, and early diagnostics — the unglamorous groundwork that keeps the rest of this list unnecessary.",
      },
    },
  },
  gallery: {
    eyebrow: "Real results",
    title: "Drag to see the reveal",
    subtitle:
      "Real treatment plans from our clinic, shown as our patients experienced them — drag to compare the before with the result.",
    // ⚠️ Written from what the photos show, not from the clinic's records — confirm before launch.
    cases: {
      "case-01": { title: "Full-arch ceramic makeover", procedure: "Full-mouth ceramic restorations" },
      "case-02": { title: "Closing gaps, natural shade", procedure: "Ceramic veneers" },
      "case-03": { title: "A smile rebuilt", procedure: "Ceramic crowns & veneers" },
      "case-04": { title: "Refreshed and brightened", procedure: "Ceramic veneers" },
      "case-05": { title: "Upper-arch transformation", procedure: "Ceramic veneers, upper arch" },
      "case-06": { title: "A complete new start", procedure: "Full-mouth ceramic restorations" },
      "case-07": { title: "Worn teeth, restored", procedure: "Ceramic crowns, both arches" },
      "case-08": { title: "Gaps closed, line straightened", procedure: "Ceramic veneers & crowns" },
    },
  },
  instagram: {
    eyebrow: "Follow along",
    title: "The everyday, on Instagram",
    subtitle: "Scans, shade matches, and studio life — {handle}.",
    follow: "Follow us",
    captions: {
      "ig-1": "Same-day whitening touch-up",
      "ig-2": "New scanner day",
      "ig-3": "Shade matching in progress",
      "ig-4": "Studio, Friday morning light",
      "ig-5": "Veneer try-in before cementation",
      "ig-6": "Team coffee before opening",
      "ig-7": "Aligner case, week 1 vs week 12",
      "ig-8": "New patient welcome kit",
    },
  },
  // ⚠️ SAMPLE CONTENT — these quotes are fictional and illustrative, NOT real Dredent
  // patients. Replace them with genuine reviews (with each patient's written consent)
  // before launch, or remove the <Testimonials /> section from app/[locale]/page.tsx.
  // Publishing invented testimonials for a real clinic is misleading advertising.
  testimonials: {
    eyebrow: "Patient stories",
    title: "Told in their own words",
    items: [
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
    ],
  },
  faq: {
    eyebrow: "Questions",
    title: "Everything worth asking first",
    items: [
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
    ],
  },
  contact: {
    eyebrow: "Visit or write",
    title: "Book a consultation",
    subtitle: "Call or email us to book a visit — we'll get back to you within one business day.",
    directions: "Get directions",
    openInMaps: "Open in Google Maps",
  },
  footer: {
    explore: "Explore",
    services: "Services",
    visit: "Visit",
    rights: "© {year} {name}. All rights reserved.",
    developedBy: "Developed by Coonwerks",
  },
};
