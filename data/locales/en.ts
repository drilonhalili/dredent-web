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

  consent: {
    region: "Cookie consent",
    title: "Cookies on this website",
    body: "The site itself only remembers your choice. The Instagram feed loads from a third party that may set cookies — it stays off until you allow it.",
    accept: "Allow third-party content",
    reject: "Only necessary",
    policy: "Cookie policy",
    settings: "Cookie settings",
  },
  map: {
    label: "Map of Tetovo around Dredent Dental Clinic, Strasho Pindjur 121",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    gestureMac: "Use ⌘ + scroll to zoom the map",
    gestureWindows: "Use Ctrl + scroll to zoom the map",
    gestureTouch: "Use two fingers to move the map",
  },
  // ⚠️ Template texts written from how the site actually works (no forms, no analytics,
  // consent-gated embeds). Have them reviewed by a lawyer before launch and keep them in
  // step with any tool you add later.
  legal: {
    eyebrow: "Legal",
    updated: "Last updated",
    backHome: "Back to the homepage",
    privacy: {
      title: "Privacy Policy",
      description:
        "How Dredent Dental Clinic handles personal data on this website: what we collect, why, how long we keep it and your rights.",
      updated: "10 September 2026",
      intro:
        "This policy explains what personal data Dredent Dental Clinic processes when you use this website or contact us through it, and what rights you have. It covers the website only — the handling of patient records at the clinic is governed by separate rules and professional confidentiality.",
      sections: [
        {
          heading: "Who is responsible",
          paragraphs: [
            "Dredent Dental Clinic, Strasho Pindjur 121, 1200 Tetovo, Republic of North Macedonia, is the controller of the personal data described here. You can reach us at dredentclinic@gmail.com or +389 70 376 959.",
          ],
        },
        {
          heading: "What data we process and why",
          paragraphs: ["We keep the amount of data to a minimum."],
          bullets: [
            "Enquiries: when you call, email or message us, we process the details you give us — typically your name, phone number, email address and the content of your message — to answer you and to arrange an appointment. Legal basis: taking steps at your request before entering into a contract, and our legitimate interest in responding to enquiries.",
            "Technical data: this is a static website with no accounts or forms. Our hosting provider records standard server logs (IP address, browser type, requested page, time) to deliver the site and protect it against abuse. Legal basis: our legitimate interest in running a secure website.",
            "The map: the interactive map in the contact section is served entirely from our own server (map data © OpenStreetMap contributors) and involves no third party. The links to Google Maps open Google's site only when you click them.",
            "Third-party content: the Instagram section may load a feed from Curator.io. It loads only after you allow it in the cookie banner, which appears only when that feed is enabled; the providers then process data under their own privacy policies. Legal basis: your consent, which you can withdraw at any time via “Cookie settings” in the footer.",
            "We use no analytics, advertising or tracking cookies on this website.",
          ],
        },
        {
          heading: "Health data",
          paragraphs: [
            "The website does not ask for or collect health information. If you include medical details in an enquiry, we use them only to prepare for your visit and treat them with the same confidentiality as clinical records. Please do not send sensitive information through channels you do not consider secure.",
          ],
        },
        {
          heading: "How long we keep data",
          paragraphs: [
            "Enquiries are kept for as long as needed to handle them and to follow up on an appointment, and afterwards only where a legal obligation requires it. Server logs are kept by our hosting provider for a short, fixed period. Your cookie choice is stored in your browser for 12 months.",
          ],
        },
        {
          heading: "Who we share data with",
          paragraphs: [
            "We do not sell personal data. It is shared only with service providers who act on our instructions (such as our hosting provider) and, when you allow third-party content, with Curator.io/Meta (Instagram feed). Some of these providers are established outside North Macedonia and the EU; transfers rely on their standard contractual safeguards.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "Under the Law on Personal Data Protection of the Republic of North Macedonia and, where it applies, the EU General Data Protection Regulation, you have the right to access your data, to have it corrected or deleted, to restrict or object to processing, to data portability, and to withdraw consent at any time without affecting past processing. To exercise these rights, write to dredentclinic@gmail.com.",
            "You also have the right to lodge a complaint with the Personal Data Protection Agency of the Republic of North Macedonia (azlp.mk) or with the supervisory authority in your EU country of residence.",
          ],
        },
        {
          heading: "Cookies",
          paragraphs: ["Details of the storage this website uses are in our Cookie Policy."],
        },
        {
          heading: "Changes to this policy",
          paragraphs: [
            "We may update this policy when the website or the law changes. The date at the top shows the latest version.",
          ],
        },
      ],
    },
    terms: {
      title: "Terms of Use",
      description:
        "The terms that apply to using the Dredent Dental Clinic website, including the status of the information and before/after photos shown.",
      updated: "10 September 2026",
      intro:
        "These terms apply to your use of this website, operated by Dredent Dental Clinic, Strasho Pindjur 121, 1200 Tetovo, Republic of North Macedonia. By using the site you agree to them.",
      sections: [
        {
          heading: "Information, not medical advice",
          paragraphs: [
            "The content of this website is general information about our clinic and the treatments we offer. It is not medical advice and does not replace an examination. Whether a treatment is suitable for you can only be decided in a consultation. If you have a dental emergency, call us or your local emergency service.",
          ],
        },
        {
          heading: "Before-and-after photos",
          paragraphs: [
            "The photos in the Transformations section show real patients of our clinic, published with their written consent. They illustrate what a treatment can look like; results depend on the individual case and are not guaranteed.",
          ],
        },
        {
          heading: "Appointments and prices",
          paragraphs: [
            "A request made by phone or email is not a confirmed appointment until we confirm it. Any prices or payment options mentioned on the website are indicative; the cost of your treatment is agreed after examination.",
          ],
        },
        {
          heading: "Using the website",
          paragraphs: [
            "You may use the site for personal, non-commercial purposes. You must not attempt to disrupt it, gain unauthorised access to it, or use it for unlawful purposes.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "Texts, images, the logo and the design of this website belong to Dredent Dental Clinic or its licensors. You may not reproduce or distribute them without our written permission, other than for private viewing.",
          ],
        },
        {
          heading: "Third-party content and links",
          paragraphs: [
            "The site may embed content from third parties (an Instagram feed via Curator.io) and links to external websites such as Google Maps. We do not control those services and are not responsible for their content or for how they process your data; their own terms apply.",
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "We take care to keep the website accurate and available, but provide it “as is”, without warranties. To the extent permitted by law, we are not liable for losses arising from your use of, or inability to use, the website. Nothing in these terms limits liability for treatment provided at the clinic, which is governed by the agreement you make with us as a patient.",
          ],
        },
        {
          heading: "Governing law",
          paragraphs: [
            "These terms are governed by the law of the Republic of North Macedonia. Disputes are subject to the competent courts in North Macedonia, unless mandatory consumer law in your country of residence gives you additional protection.",
          ],
        },
        {
          heading: "Changes and contact",
          paragraphs: [
            "We may update these terms; the date at the top shows the latest version. Questions: dredentclinic@gmail.com.",
          ],
        },
      ],
    },
    cookies: {
      title: "Cookie Policy",
      description:
        "Which cookies and similar storage the Dredent Dental Clinic website uses, what they do, and how to change your choice.",
      updated: "10 September 2026",
      intro:
        "This page explains the cookies and similar browser storage used on this website. We keep it deliberately short: the site itself sets no tracking cookies, and third-party content that could set them loads only with your consent.",
      sections: [
        {
          heading: "What cookies are",
          paragraphs: [
            "Cookies are small files a website stores in your browser; local storage is a similar mechanism. They can be strictly necessary for a site to work, or used by third parties to recognise you across websites.",
          ],
        },
        {
          heading: "What this website stores",
          paragraphs: [],
          bullets: [
            "Your cookie choice (strictly necessary): when you use the cookie banner, we save your decision in your browser's local storage under the key “dredent-consent-v1”, together with the date. It is not a tracking cookie, is never sent to us or anyone else, and expires after 12 months, after which we ask again.",
            "The map (no cookies): the interactive map in the contact section is served entirely from our own server — map tiles, fonts and icons — and loads nothing from third parties. The links to Google Maps open Google's website only when you click them.",
            "Instagram feed via Curator.io (only with your consent, and only when the live feed is enabled): loading the feed sends requests to Curator.io and Instagram (Meta), which may set their own cookies.",
            "Nothing else: we use no analytics, advertising or social-media tracking cookies. Fonts are hosted on our own server.",
          ],
        },
        {
          heading: "How to change your choice",
          paragraphs: [
            "Use “Cookie settings” in the footer at any time to allow or refuse third-party content. You can also delete stored data through your browser settings; the banner will then appear again.",
          ],
        },
        {
          heading: "Changes",
          paragraphs: [
            "We update this page when the website changes. The date at the top shows the latest version.",
          ],
        },
      ],
    },
  },
};
