import type { CaseId, NavId, PostId, ServiceId } from "@/data/site-config";

export type LegalSection = {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

// One legal page (terms / privacy / cookies) in one language.
export type LegalDocument = {
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: readonly LegalSection[];
};

// Every user-visible string on the site, in one language. The three dictionaries
// (en.ts, sq.ts, mk.ts) must all satisfy this type, so a missing translation is a
// type error rather than an English string leaking into another language.
export type Dictionary = {
  langName: string;
  seo: { title: string; description: string; keywords: readonly string[] };
  tagline: string;
  descriptionShort: string;
  trustLine: string;
  address: { line1: string; line2: string };
  hours: { weekdays: string; saturday: string; sunday: string; closed: string };
  nav: Record<NavId, string>;
  a11y: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    primaryNav: string;
    language: string;
    dragToCompare: string;
    beforeAlt: string;
    afterAlt: string;
    before: string;
    after: string;
  };
  hero: {
    eyebrow: string;
    titleStart: string;
    titleEmphasis: string;
    lede: string;
    bookCta: string;
    resultsCta: string;
    shade: string;
    tapHint: string;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    quote: string;
    quoteAttribution: string;
    tags: readonly string[];
    imageAlt: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Record<ServiceId, { title: string; description: string }>;
  };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cases: Record<CaseId, { title: string; procedure: string }>;
  };
  instagram: {
    eyebrow: string;
    title: string;
    subtitle: string;
    follow: string;
    captions: Record<PostId, string>;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: readonly { quote: string; name: string; context: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: readonly { question: string; answer: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    directions: string;
    openInMaps: string;
  };
  footer: {
    explore: string;
    services: string;
    visit: string;
    rights: string;
    developedBy: string;
  };
  consent: {
    region: string;
    title: string;
    body: string;
    accept: string;
    reject: string;
    policy: string;
    settings: string;
  };
  map: {
    label: string;
    zoomIn: string;
    zoomOut: string;
    gestureMac: string;
    gestureWindows: string;
    gestureTouch: string;
    directions: string;
    viewLarger: string;
  };
  notFound: { title: string; body: string; home: string };
  legal: {
    eyebrow: string;
    updated: string;
    backHome: string;
    terms: LegalDocument;
    privacy: LegalDocument;
    cookies: LegalDocument;
  };
};
