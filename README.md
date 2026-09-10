# Dredent Dental Clinic

A static, animated marketing site for **Dredent Dental Clinic** (Strasho Pindjur Rd 121,
Tetovo, North Macedonia) — Next.js (App Router, static export), Tailwind v4, Framer
Motion, and a Three.js hero scene. The clinic's real name, address, phone, socials, and
Google-profile description are wired in; images and some copy remain placeholders — see
the launch checklist below.

## ⚠️ Launch checklist — real vs. placeholder

Confirmed real data (from the Google Business Profile):
name, address (Strasho Pindjur Rd 121, 1200 Tetovo), phone (+389 70 376 959),
Facebook (`/dredentclinic`), Instagram (`/dredentclinicandlab`), the 5.0 Google rating,
and the "excellent care and personal attention" promise quoted in the About section.

Still placeholder / assumed — fix in `data/site-config.ts` before going live:

- **Hours** — Google confirms only "Closes 6 PM." The Mon–Fri 08:00 opening and the
  weekend "Closed" are assumptions. Also sync `components/json-ld.tsx`.
- **Domain** (`seo.siteUrl`, still a placeholder) — the site URL drives
  the canonical tag, sitemap.xml, robots.txt, and Open Graph URLs.
- **Testimonials** — fictional samples. Replace with real, consented patient reviews or
  remove the section from `app/page.tsx`. Never ship invented reviews for a real clinic.
- **Trust line** — "5.0 ★ on Google" is true but currently rests on a single review;
  consider whether to feature it yet.
- **All photography** — placeholder images from picsum.photos, seeded per slot.
- **Services & about copy** — template positioning (digital smile design, veneers,
  aligners…). Confirm it matches what Dredent actually offers and edit freely.

## What's in it

- **Framer Motion** throughout — a staged hero entrance, scroll-reveals on every section,
  an animated mobile menu, an accordion FAQ.
- **A Three.js hero scene** (`@react-three/fiber` + `drei`) — ambient distorted blobs with
  mouse parallax, lazy-loaded client-side only, and skipped/stilled under
  `prefers-reduced-motion`.
- **A signature "Smile Reveal" compare slider** (`components/compare-slider.tsx`) — built
  from scratch in the spirit of [Aceternity UI's `Compare`](https://ui.aceternity.com/components/compare)
  (drag or arrow-key to reveal), with a bespoke twist: the badge reads out a real VITA
  Classical shade code as you drag, since that's the actual unit cosmetic dentistry
  measures a whiter smile in.
- **An Instagram-style mosaic** (`components/instagram-mosaic.tsx`) — a varying-tile-size
  grid in the spirit of [curator.io's Mosaic template](https://curator.io/templates/mosaic).
  Ships with placeholder tiles; see "Going live with Instagram" below.
- **SEO**: per-page metadata, a dynamically generated Open Graph image
  (`app/opengraph-image.tsx`, renders to a real PNG at build time), `sitemap.xml` and
  `robots.txt` (`app/sitemap.ts` / `app/robots.ts`), and JSON-LD for both `Dentist`
  (local business/NAP/hours) and `FAQPage` (`components/json-ld.tsx`).
- **Fully responsive**, keyboard-accessible (visible focus rings, a skip-to-content link,
  the compare slider works with arrow keys, `role="slider"` + `aria-value*`), and respects
  `prefers-reduced-motion` globally.

## Design decisions (so nothing looks accidental)

Rather than default to the obvious "dental blue + Inter" look, the palette and type system
were deliberately chosen against a real baseline: I ran the `ui-ux-pro-max` design-system
generator you linked against a "dental clinic" brief, and it recommended exactly that —
sky blue `#0EA5E9` + Inter/Inter. That's a fine, safe choice, but it's also what nearly
every dental template already looks like. This site goes a different way:

| Token | Value | Role |
|---|---|---|
| `porcelain` | `#F3F5F1` | Base background — cool-neutral, not warm cream |
| `ink` | `#12211D` | Primary text — blackened forest, not pure black |
| `cusp` | `#1F4A43` | Primary brand color — deep pine-teal |
| `shade` | `#C89448` | Single accent — warm champagne-gold, used for CTAs/highlights only |
| `mist` | `#D8DED6` | Borders and dividers |

Type is a three-role system, not one font doing everything: **Fraunces** (display,
headlines only), **Work Sans** (body/UI), **IBM Plex Mono** (small caps labels, stats, and
the shade-code readout — a deliberate nod to lab/clinical data). All three are self-hosted
under `app/fonts/` (SIL Open Font License — see `app/fonts/OFL-LICENSE.txt`) rather than
loaded from Google's font CDN, so the site has zero runtime dependency on a third-party
font host.

Services aren't numbered 01/02/03 — there's no real sequence to them, so numbering would
just be decoration pretending to be information.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # outputs a fully static site to /out
npm run lint
```

`npm run build` produces `/out` — upload that folder as-is to any static host (Vercel,
Netlify, Cloudflare Pages, GitHub Pages, S3 + CloudFront, or your own nginx box). If you'd
rather deploy to Vercel with full server rendering and on-demand image optimization,
delete the `output: "export"` line in `next.config.mjs`.

## Where to edit content

Almost everything business-specific lives in **`data/site-config.ts`**: name, tagline,
address, phone, hours, services, before/after case data, testimonials, FAQ, and the
Instagram tile list. Swap that file and the whole site updates — you shouldn't need to
touch component code for a copy or contact-info change.

Images are placeholder photography from `picsum.photos`, seeded per slot (see
`lib/utils.ts` → `placeholderImage`). Replace the `seed` values in `site-config.ts` with
real photo paths once you have them (drop files in `/public` and swap the `<img src>` in
the relevant component, or point at your Cloudinary account — you're already set up for
that from other projects).

## Going live with Instagram

The mosaic is wired for **Curator.io** (Mosaic template —
https://curator.io/templates/mosaic) but ships rendering static placeholder tiles
until a feed id is configured. To go live:

1. Create a Curator.io feed with the Mosaic template and connect the clinic's
   Instagram account.
2. Publish the feed and copy the feed id from the embed script URL
   (`https://cdn.curator.io/published/<FEED_ID>.js`).
3. Copy `.env.example` to `.env.local`, set `NEXT_PUBLIC_CURATOR_FEED_ID`, and
   rebuild. While the id is empty, the placeholder mosaic from `instagramPosts`
   in `data/site-config.ts` keeps rendering instead.

Alternative if you outgrow the hosted widget: fetch posts server-side with the
Instagram Graph API at build time (never expose a long-lived token client-side)
and replace `instagramPosts` with the fetched data.

## The contact section map

`components/contact.tsx` pairs the clinic's contact details with an interactive map instead of
a form (a static export has no backend to POST a form to anyway). The map is served
**entirely from this site**, so it loads for every visitor without any consent question and
no request ever reaches a third party:

- `public/map/tetovo.pmtiles` — OpenStreetMap-derived vector tiles for the Tetovo area
  (zoom 10–15, a few MB), cut from a daily Protomaps planet build by
  `scripts/build-map-tiles.mjs` with HTTP range requests. Re-run it to refresh the map
  data or after changing the area; `mapArea` in `data/site-config.ts` must match its
  `BOUNDS`.
- `public/map/fonts/` and `public/map/sprites/` — the glyph ranges (Latin + Cyrillic) and
  icons the style needs, copied from Protomaps' basemaps-assets.
- `components/local-map.tsx` renders it with MapLibre GL and the Protomaps "light" style
  (`@protomaps/basemaps`), labels in the page language, marker on the clinic, zoom
  buttons, cooperative gestures (no scroll hijacking), panning limited to the extracted
  area. `components/map-embed.tsx` mounts it only when the section comes within ~800px
  of the viewport, so the ~250 KB library never loads for visitors who don't scroll down.
  It also draws the place card in the top-left corner (name, address, "Directions",
  "View larger map"), like Google.s embedded maps; both links open Google Maps in a new
  tab, so nothing from Google loads until the visitor clicks. Strings: dictionary `map`.
- `public/map/vendor/` — MapLibre's own web worker (+ the shared module it imports),
  copied from `node_modules` by `scripts/copy-maplibre-worker.mjs`, which runs before
  `npm run dev` and `npm run build` (`predev`/`prebuild`). MapLibre 6 locates its worker
  with `new URL(file, import.meta.url)`, which webpack cannot rewrite, so without this the
  map renders only its grey background colour. The component passes the URL via
  `setWorkerUrl()`. If you upgrade `maplibre-gl`, the copy refreshes on the next dev/build.
- Attribution "Protomaps © OpenStreetMap" on the map is a licence requirement (ODbL) —
  keep it.

Below the map, "Open in Google Maps" uses the listing's official share link and "Get
directions" the Maps URLs API: both open Google only when clicked, on mobile in the native
app, and for directions Google asks the visitor for their start point, so the site never
touches their location. Both URLs live in `mapLinks` in `data/site-config.ts`.
## Cookie consent and legal pages

The site itself sets no cookies — fonts, map tiles and everything else are self-hosted and
there is no analytics. The one thing that *can* set cookies is the optional Curator.io
Instagram feed, so consent is scoped to exactly that, and the banner only exists while
`NEXT_PUBLIC_CURATOR_FEED_ID` is set:

- `components/cookie-banner.tsx` asks once (state in `localStorage`, key
  `dredent-consent-v1`, re-asked after 12 months; store logic in `lib/consent.ts`).
  "Only necessary" is the site's default state; "Allow third-party content" unlocks the
  embeds. "Cookie settings" in the footer re-opens the banner.
- `components/instagram-mosaic.tsx` loads the live Curator.io feed only with consent and
  falls back to the built-in placeholder mosaic otherwise. The map needs no gating — see
  "The contact section map" above.
- Legal pages live at `/<locale>/terms/`, `/<locale>/privacy/` and `/<locale>/cookies/`
  (`app/[locale]/[legal]/page.tsx` + `components/legal-page.tsx`), with their copy in
  the dictionaries under `legal`. ⚠️ The texts were written from how the site actually
  works — have them reviewed by a lawyer before launch and update them whenever you add a
  tool (analytics, a form, a booking widget).

If you later want a hosted CMP (OneTrust CookiePro, Cookiebot…), replace the banner and
have `lib/consent.ts` read that vendor's consent state instead; the gating stays the same.

## A few deliberate follow-ups, not done here

- **Before launch (SEO)**: replace `seo.siteUrl` in `data/site-config.ts` with the real
  domain (canonical, hreflang, sitemap, robots, Open Graph and JSON-LD are all derived from
  it); add the Google Search Console verification token to `generateMetadata` in
  `app/[locale]/layout.tsx` (`verification.google`) and submit `/sitemap.xml`; link the
  Google Business Profile listing; add a real `twitter.site` handle if the clinic has one.
- **Font subsetting**: the three self-hosted fonts are full variable/static files
  (~1.9 MB total). `pyftsubset` or `glyphhanger` can trim this substantially once you know
  the final character set — Latin for `sq`/`en`; the `mk` pages need a Cyrillic-capable
  family, see "Languages" above.
- **Real photography**: the Transformations section is wired for five real before/after
  cases (`comparePairs` in `data/site-config.ts`). Run `bash scripts/fetch-results.sh`
  once to download the photos into `public/results/` (the source links expire —
  see the script header); until the files exist the sliders fall back to placeholders.
  Before launch: confirm written patient consent for each photo and correct the
  title/procedure lines (`gallery.cases` in each dictionary), which were written from
  what the photos show.

## Stack

Next.js 15 (App Router, static export) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion · Three.js + @react-three/fiber + @react-three/drei · lucide-react icons
