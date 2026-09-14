# Dredent Dental Clinic

A static, animated marketing site for **Dredent Dental Clinic** (Strasho Pindjur Rd 121,
Tetovo, North Macedonia) — Next.js (App Router, static export), Tailwind v4, Framer
Motion, and a Three.js hero scene. The clinic's real name, address, phone, socials, and
Google-profile description and photos are wired in; some copy is still template text — see
the launch checklist below.

## ⚠️ Launch checklist — real vs. placeholder

Confirmed real data (from the Google Business Profile):
name, address (Strasho Pindjur Rd 121, 1200 Tetovo), phone (+389 70 376 959),
Facebook (`/dredentclinic`), Instagram (`/dredentclinicandlab`), the 5.0 Google rating,
and the "excellent care and personal attention" promise quoted in the About section.

Still placeholder / assumed — fix in `data/site-config.ts` before going live:

- **Hours** — confirmed with the clinic (Mon–Fri 10:00–18:00, Sat 10:00–15:00, Sun closed).
  If they change, edit `business.hours` and sync `components/json-ld.tsx`.
- **Domain** — `seo.siteUrl` is `https://dredent.com` (bought 14 Sep 2026, Cloudflare Registrar,
  renews Sep 2028). See "Deployment" for hosting, DNS and the .mk redirect.
- **Analytics token** — once the domain exists, add it as a site in Cloudflare Web Analytics
  and put the snippet's token in `.env.local` as `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` (see
  "Analytics" below). Until then no analytics script is rendered.
- **Footer credit link** — set `credits.href` in `data/site-config.ts` once the agency site
  has a URL; until then the credit renders as plain text.
- **Reviews** — the "Reviews" section links to the Google listing instead of quoting anyone.
  Paste the profile's "Ask for reviews" short link into `googleReviews.write` in
  `data/site-config.ts` so the "Write a review" button appears, and keep `googleReviews.rating`
  in step with the profile. `docs/google-business-profile.md` has paste-ready content for the
  profile itself (description, services, Q&A, review request, posts).
- **Trust line** — "5.0 ★ on Google" is true but currently rests on a single review;
  consider whether to feature it yet.
- **Photography** — the before/after pairs, the about photo and the Instagram tiles are the
  clinic's own; make sure written patient consent for web use is on file for every face shown.
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
  (`app/[locale]/og.png/route.tsx`, one PNG per language rendered at build time — a route
  handler rather than the `opengraph-image` file convention, so the exported file has a
  `.png` extension and static hosts serve it as `image/png` instead of `application/octet-stream`), `sitemap.xml` and
  `robots.txt` (`app/sitemap.ts` / `app/robots.ts`), and JSON-LD (`components/json-ld.tsx`): `Dentist` (local
  business/NAP/hours) on every page, `FAQPage` only on the home page where the questions
  are, `BreadcrumbList` on the legal pages.
- **Icons** — `app/icon.svg` for modern browsers, `app/favicon.ico` for Safari and for
  anything that requests `/favicon.ico` blindly (regenerate from `public/icons/icon-512.png`
  with `node scripts/make-favicon.mjs`, needs `npm i --no-save sharp`), `app/apple-icon.png`,
  and the manifest icons in `public/icons/`.
- **404 page** — `app/global-not-found.tsx` is exported as `out/404.html`, which static hosts
  serve for unknown URLs. It uses Next's experimental `globalNotFound` flag because the app has
  two root layouts, which rules out the regular `app/not-found.tsx`. Default language first,
  links to the other two; copy in dictionary `notFound`.
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

On Apple Silicon, use an **arm64** build of Node (`node -p process.arch` must print
`arm64`). An Intel build running under Rosetta cannot load the native lightningcss,
Tailwind and SWC binaries that an arm64 `npm install` puts in `node_modules`, and
`next dev` fails with `Cannot find module ...lightningcss.darwin-x64.node`. `.nvmrc`
pins a version known to be installed as arm64 on the team machine; `nvm use` picks it up.

```bash
nvm use          # reads .nvmrc
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

Photos live under `public/` and are generated from the untouched originals in
`assets-src/` by the scripts in `scripts/` (`align-results.mjs` for the before/after pairs,
`build-instagram-tiles.mjs` for the Instagram tiles); edit the originals or the scripts, never
the generated files. `placeholderImage` in `lib/utils.ts` is only the fallback for a missing
before/after photo.

## The Instagram section

By default the mosaic shows ten of the clinic's own recent posts, each tile linking to the
post on Instagram. The originals are kept in `assets-src/instagram/<shortcode>.jpg`
(Instagram's image URLs expire, so they cannot be referenced directly);
`scripts/build-instagram-tiles.mjs` turns them into the 900x600 WebP tiles in
`public/instagram/`, and `instagramPosts` in `data/site-config.ts` decides which are shown,
which two are `big`, and which is a reel. Captions (also the alt text) are in each dictionary
under `instagram.captions`. To refresh: save the new post images under their shortcodes, run
the script, update the list and captions. No third-party request is involved, so the section
needs no cookie consent.

The live **Curator.io** feed (Mosaic template — https://curator.io/templates/mosaic) is
still wired in behind `curatorFeed.enabled` (off). Connecting it requires logging in to the
clinic's Instagram account, which is why it is parked. To go live:

1. Create a Curator.io feed with the Mosaic template and connect the clinic's
   Instagram account.
2. Publish the feed and copy the feed id from the embed script URL
   (`https://cdn.curator.io/published/<FEED_ID>.js`).
3. Copy `.env.example` to `.env.local`, set `NEXT_PUBLIC_CURATOR_FEED_ID`, set
   `enabled: true` on `curatorFeed` in `data/site-config.ts`, and rebuild. The cookie banner
   and the footer's cookie-settings button appear automatically, since the feed loads
   Curator/Instagram scripts.

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
  "View larger map"), like Google's embedded maps; both links open Google Maps in a new
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

## Analytics

Visitor statistics come from **Cloudflare Web Analytics** (`components/analytics.tsx`), chosen
because it is free and cookieless: the beacon stores nothing in the browser and does not
fingerprint visitors, so it runs without consent and is deliberately *not* part of the cookie
banner. It is Cloudflare's own snippet rendered as a plain deferred `<script>` on every page
(including the 404 page), so it is in the static HTML and works on any host. It renders
nothing while `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` is empty. To enable it: Cloudflare dashboard →
Web Analytics → Add a site → enter the domain → choose the manual JavaScript snippet → copy
the `token` value into `.env.local`, rebuild. The token ends up in the page HTML by design,
so it is not a secret. The privacy and cookie policies already describe the tool (aggregated
statistics, Cloudflare, Inc. as processor, legitimate interest); if you ever switch to a
cookie-based tool such as Google Analytics, it must move behind the consent banner and the
policies must change.

## Cookie consent and legal pages

The site itself sets no cookies — fonts, map tiles, photos and everything else are
self-hosted, and the analytics above is cookieless. The one thing that *can* set cookies is
the optional Curator.io Instagram feed, so consent is scoped to exactly that, and the banner
only exists while `curatorFeed.enabled` is true and `NEXT_PUBLIC_CURATOR_FEED_ID` is set:

- `components/cookie-banner.tsx` asks once (state in `localStorage`, key
  `dredent-consent-v1`, re-asked after 12 months; store logic in `lib/consent.ts`).
  "Only necessary" is the site's default state; "Allow third-party content" unlocks the
  embeds. "Cookie settings" in the footer re-opens the banner.
- `components/instagram-mosaic.tsx` loads the live Curator.io feed only with consent and
  shows the static mosaic of the clinic's own posts otherwise. The map needs no gating — see
  "The contact section map" above.
- Legal pages live at `/<locale>/terms/`, `/<locale>/privacy/` and `/<locale>/cookies/`
  (`app/[locale]/[legal]/page.tsx` + `components/legal-page.tsx`), with their copy in
  the dictionaries under `legal`. ⚠️ The texts were written from how the site actually
  works — have them reviewed by a lawyer before launch and update them whenever you add a
  tool (analytics, a form, a booking widget).

If you later want a hosted CMP (OneTrust CookiePro, Cookiebot…), replace the banner and
have `lib/consent.ts` read that vendor's consent state instead; the gating stays the same.

## Deployment (Cloudflare Workers, static assets)

The domain is registered at Cloudflare, so the site is hosted there too: a **Worker with
static assets** named `dredent-web` (free plan, global CDN, no commercial-use restriction),
built by Cloudflare's Git integration from the GitHub repo. `wrangler.jsonc` describes it:
no server code, just the `out/` directory as assets, trailing-slash HTML handling and
`out/404.html` for unknown URLs.

1. Dashboard → Workers & Pages → `dredent-web` → Settings → Builds: build command
   `npm run build`, deploy command `npx wrangler deploy`, root directory `/`, production
   branch `main`. Node version comes from `.nvmrc`. Build variables: `NEXT_PUBLIC_CF_ANALYTICS_TOKEN`
   = the Web Analytics token (build-time, inlined into the HTML).
2. `dredent-web` → Settings → Domains & Routes → add custom domains `dredent.com` and
   `www.dredent.com`. Cloudflare creates the DNS records itself because the zone is in the
   same account. Leave the `workers.dev` subdomain disabled so the site has one canonical host.
3. `public/_redirects` (copied into `out/`) sends `/` to `/sq/` with a real 301, and
   `public/_headers` adds the security headers and long cache lifetimes for hashed assets. Both
   are Cloudflare conventions (Pages and Workers assets); other hosts need their own equivalent.
   `www` → apex is a zone-level **Redirect Rule** (dashboard → dredent.com → Rules → template
   "Redirect from WWW to Root"), because the Workers `_redirects` file only accepts relative
   sources.
4. Every push to `main` builds and deploys; other branches get preview builds. `npx wrangler
   deploy` from a laptop also works after `npx wrangler login`, but the Git integration is the
   intended path so every deploy is traceable to a commit.

DNS hygiene for a domain that sends no email (the clinic uses Gmail): in the zone add
`MX @ 0 .` (null MX), `TXT @ "v=spf1 -all"` and `TXT _dmarc "v=DMARC1; p=reject;"`, so
nobody can spoof `.com`. Under SSL/TLS enable "Always Use HTTPS".

**dredent.mk** (once bought at a MARnet registrar such as Unet or MKhost): add it to
Cloudflare as a second free zone, switch its nameservers at the registrar to the two
Cloudflare gives, add a proxied placeholder record (`A @ 192.0.2.1`), and create a Redirect
Rule: all requests → `https://dredent.com/${path}` (301, preserve query). The .mk then
resolves with HTTPS and lands on the same page of the .com.

A Content-Security-Policy is deliberately not set yet: the map worker, the Three.js hero
and the analytics beacon each need an allowance, so add it to `public/_headers` only after
testing on a preview URL. A starting point:
`default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self' https://cloudflareinsights.com; worker-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`.

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
