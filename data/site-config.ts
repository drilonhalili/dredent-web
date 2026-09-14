// ---------------------------------------------------------------------------
// SITE DATA — the business facts that don't change with language: contact
// details, links, image paths, and the ids the per-language dictionaries in
// data/locales/*.ts key their copy on. Every user-visible sentence lives there;
// the default language and the list of locales live in lib/i18n.ts.
// ---------------------------------------------------------------------------

export const business = {
  name: "Dredent Dental Clinic",
  phone: "+389 70 376 959",
  phoneHref: "tel:+38970376959",
  email: "dredentclinic@gmail.com",
  mapQuery: "Dredent+Dental+Clinic+Strasho+Pindjur+121+Tetovo",
  // Exact pin coordinates, copied from the clinic's Google Maps listing.
  geo: { lat: 42.013353, lng: 20.971293 },
  // Confirmed schedule. Day labels come from the dictionary (`hours`); `time: null`
  // renders as "closed". Keep components/json-ld.tsx openingHoursSpecification in sync.
  hours: [
    { id: "weekdays", time: "10:00 – 18:00" },
    { id: "saturday", time: "10:00 – 15:00" },
    { id: "sunday", time: null },
  ],
  social: {
    instagram: "https://www.instagram.com/dredentclinicandlab/",
    instagramHandle: "@dredentclinicandlab",
    facebook: "https://www.facebook.com/dredentclinic/",
  },
  bookingHref: "#contact",
} as const;

// Keyless Google Maps URLs — no API key to manage, and nothing loads from Google
// until the visitor clicks. `view` is the clinic's official share link (Google
// Maps → Share → "Send a link"); `directions` uses the Maps URLs API, so Google
// asks the visitor for their start point and the site never touches their location.
export const mapLinks = {
  view: "https://maps.app.goo.gl/eHsW9Q9bY4BZab189",
  directions: `https://www.google.com/maps/dir/?api=1&destination=${business.mapQuery}`,
} as const;

// Google reviews (components/testimonials.tsx). `read` opens the listing, where the reviews
// are shown; `write` is the short "Ask for reviews" link from the Business Profile
// (https://g.page/r/…/review). Leave `write` empty until the clinic copies it from
// Google — the "Write a review" button is hidden while it is. `rating` mirrors the
// profile; update it if the average changes.
export const googleReviews: { rating: string; read: string; write: string } = {
  rating: "5.0",
  read: mapLinks.view,
  write: "https://g.page/r/CfQFUYD0LIxAEBM/review",
};

// The interactive map in the contact section is served entirely from this site
// (components/local-map.tsx): vector tiles for this area live in
// public/map/tetovo.pmtiles, cut from a Protomaps/OpenStreetMap build by
// scripts/build-map-tiles.mjs — keep these bounds in sync with that script.
export const mapArea = {
  bounds: [20.93, 41.98, 21.02, 42.05] as [number, number, number, number],
  minZoom: 12,
  maxZoom: 18,
  initialZoom: 15.5,
} as const;

// Footer credit link. Leave `href` empty to render the credit as plain text.
export const credits = { href: "" } as const;

// Curator.io live feed for the Instagram section (mosaic template:
// https://curator.io/templates/mosaic). Off by default: connecting a feed needs the
// clinic's Instagram login, which is not available right now, so the section shows
// the downloaded posts in `instagramPosts` instead. To go live later: create and
// publish the feed in Curator, put its id in .env.local (see .env.example) and set
// `enabled: true`. The live feed loads Curator/Instagram scripts, which is why the
// cookie banner and the footer's cookie-settings button exist only while it is on.
export const curatorFeed: { enabled: boolean; feedId: string; containerId: string } = {
  enabled: false,
  feedId: process.env.NEXT_PUBLIC_CURATOR_FEED_ID ?? "",
  containerId: process.env.NEXT_PUBLIC_CURATOR_CONTAINER_ID ?? "curator-feed-default-feed-layout",
};
export const curatorFeedActive = curatorFeed.enabled && curatorFeed.feedId !== "";

// Cloudflare Web Analytics (components/analytics.tsx): cookieless and fingerprint-free,
// so it runs without consent and is not part of the cookie banner. Nothing loads while
// the token is empty. Get it in the Cloudflare dashboard: Web Analytics -> Add a site ->
// manual JavaScript snippet -> the "token" value. It ends up in the page HTML by design,
// so it is not a secret; still, set it in .env.local rather than here.
export const analytics = {
  cloudflareToken: process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN ?? "",
} as const;

// Section anchors (rendered as /<locale>/#hash so they also work from the legal pages). Labels: dictionary `nav`.
export const nav = [
  { id: "about", hash: "#about" },
  { id: "services", hash: "#services" },
  { id: "transformations", hash: "#transformations" },
  { id: "stories", hash: "#stories" },
  { id: "faq", hash: "#faq" },
  { id: "contact", hash: "#contact" },
] as const;
export type NavId = (typeof nav)[number]["id"];

// Services — deliberately not numbered 01/02/03: there's no real sequence to them,
// a patient picks whichever one applies to them. Titles/descriptions: dictionary `services.items`.
export type ServiceIcon = "scan" | "gem" | "sparkles" | "layers" | "anchor" | "stethoscope";

export const services = [
  { id: "smile-design", icon: "scan" },
  { id: "veneers", icon: "gem" },
  { id: "whitening", icon: "sparkles" },
  { id: "aligners", icon: "layers" },
  { id: "implants", icon: "anchor" },
  { id: "general", icon: "stethoscope" },
] as const satisfies readonly { id: string; icon: ServiceIcon }[];
export type ServiceId = (typeof services)[number]["id"];

// Before / after pairs for the signature "Smile Reveal" compare slider. The files
// under public/results/ are aligned re-crops generated by scripts/align-results.mjs
// from the untouched originals in assets-src/results-original/.
//
// ⚠️ REAL PATIENT PHOTOS. Before launch: (1) confirm each patient's written
// consent to publish, (2) correct the title/procedure lines in the dictionaries
// (`gallery.cases`) — they are written from what the photos show, not from the
// clinic's records.
export const comparePairs = [
  { id: "case-01", beforeSrc: "/results/case-01-before.jpg", afterSrc: "/results/case-01-after.jpg" },
  { id: "case-02", beforeSrc: "/results/case-02-before.jpg", afterSrc: "/results/case-02-after.jpg" },
  { id: "case-03", beforeSrc: "/results/case-03-before.jpg", afterSrc: "/results/case-03-after.jpg" },
  { id: "case-04", beforeSrc: "/results/case-04-before.jpg", afterSrc: "/results/case-04-after.jpg" },
  { id: "case-05", beforeSrc: "/results/case-05-before.jpg", afterSrc: "/results/case-05-after.jpg" },
  { id: "case-06", beforeSrc: "/results/case-06-before.webp", afterSrc: "/results/case-06-after.webp" },
  { id: "case-07", beforeSrc: "/results/case-07-before.webp", afterSrc: "/results/case-07-after.webp" },
  { id: "case-08", beforeSrc: "/results/case-08-before.webp", afterSrc: "/results/case-08-after.webp" },
] as const;
export type CaseId = (typeof comparePairs)[number]["id"];

// Tiles for the Instagram section while the live Curator feed is off (`curatorFeed.enabled`).
// The clinic's own posts from instagram.com/dredentclinicandlab: originals are kept in
// assets-src/instagram/<shortcode>.jpg (Instagram's CDN links expire), the tiles in
// public/instagram/ are regenerated by scripts/build-instagram-tiles.mjs. `big` tiles
// span 2x2 cells; with 4 columns, 2 big + 8 small fill the grid exactly. To swap a post:
// save its image under the post's shortcode in assets-src/instagram/, run the script,
// list it here and add its caption to every dictionary (`instagram.captions`).
export const instagramPosts = [
  { id: "ig-1", shortcode: "DMiMaKki84a", big: true },
  { id: "ig-2", shortcode: "Dbn34bXinwi" },
  { id: "ig-3", shortcode: "Da7d0pUqtlL" },
  { id: "ig-4", shortcode: "Da5fq3WitgG" },
  { id: "ig-5", shortcode: "Daur6tfiuXv" },
  { id: "ig-6", shortcode: "Dbxx8UUimJN", big: true },
  { id: "ig-7", shortcode: "DY72ECFCjiY" },
  { id: "ig-8", shortcode: "DY5GbzSKiNI", reel: true },
  { id: "ig-9", shortcode: "DXxNNKCioH5" },
  { id: "ig-10", shortcode: "DVjAVbniij7" },
] as const satisfies readonly { id: string; shortcode: string; big?: boolean; reel?: boolean }[];
export type PostId = (typeof instagramPosts)[number]["id"];
export type InstagramPost = (typeof instagramPosts)[number];

export const instagramPostUrl = (post: InstagramPost) =>
  `https://www.instagram.com/${"reel" in post && post.reel ? "reel" : "p"}/${post.shortcode}/`;
export const instagramTileSrc = (post: InstagramPost) => `/instagram/${post.shortcode}.webp`;


export const seo = {
  // Canonical origin (no trailing slash): canonical URLs, hreflang alternates,
  // sitemap.xml, robots.txt, Open Graph tags and JSON-LD are all generated from it.
  // The apex domain is canonical; www redirects to it (public/_redirects).
  // Titles, descriptions and keywords: dictionary `seo`.
  siteUrl: "https://dredent.com",
} as const;
