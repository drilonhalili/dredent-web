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
- **Email** (`info@dredent.example`) and **domain** (`seo.siteUrl`) — the site URL drives
  the canonical tag, sitemap.xml, robots.txt, and Open Graph URLs.
- **Geo coordinates** — approximate Tetovo center; replace with the exact map pin
  (right-click the pin in Google Maps → copy coordinates).
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

`components/contact.tsx` pairs the clinic's contact details with an interactive Google
Maps embed instead of a form (a static export has no backend to POST a form to anyway).
The embed uses Google's official "Embed a map" iframe (Share → Embed a map on the
clinic's listing) — keyless, no API key to manage — pinned to the Dredent place
listing at street-level zoom, with `loading="lazy"` so it doesn't block first paint.
Below the map, "Open in Google Maps" uses the listing's official share link, and
"Get directions" uses the Maps URLs API: both open the native app on mobile, and for
directions Google asks the visitor for their start point, so the site never touches
their location. All three URLs live in `mapLinks` in `data/site-config.ts`. Note the iframe
loads Google's scripts/cookies on page view; if you later add a consent banner, gate
the iframe behind it (a click-to-load facade is the usual pattern).

## Languages

The site is trilingual — Albanian (`sq`, the default), English (`en`) and Macedonian
(`mk`) — and every language is a fully static page at `/<locale>/`. The bare `/` is a
tiny page that redirects to the default locale with a `<meta http-equiv="refresh">`,
because a static export has no server to send a 301; if your host has redirect rules
(Netlify `_redirects`, `vercel.json`, nginx), add a real 301 for `/` → `/sq/` there too.

- `lib/i18n.ts` — the list of locales and **`defaultLocale`**. Change that one constant to
  make another language the default; no URL changes, since every locale is always
  served under its own prefix.
- `data/locales/{sq,en,mk}.ts` — one dictionary per language, all typed against
  `data/locales/types.ts`, so a missing string is a build error rather than English
  leaking through. Business facts that don't change with language (phone, links, image
  paths, and the ids the dictionaries key on) stay in `data/site-config.ts`.
- `app/[locale]/layout.tsx` — sets `<html lang>`, the per-language title, description and
  keywords, `hreflang` alternates (`x-default` → the default locale), `og:locale`, and the
  JSON-LD in that language. `app/[locale]/opengraph-image.tsx` renders a per-language share
  card and `app/sitemap.ts` lists all three URLs with their alternates.
- Client components read copy with `useI18n()` from `components/i18n-provider.tsx`; server
  components take the dictionary as a prop (`Footer`) or call `getDictionary(locale)`.
- `components/language-switcher.tsx` is the dropdown in the navbar (a globe + current
  language; expands in place inside the mobile menu). It keeps the visitor on the section
  they were reading (`#faq` etc.) when they switch language.

To add a language: append its code to `locales` in `lib/i18n.ts` and add its name and
`og:locale` to the two maps there, create `data/locales/<code>.ts` (copy `en.ts`), and
register it in `data/locales/index.ts`. The build fails until every string is present.

Fonts: Fraunces and Work Sans are Latin-only, so Cyrillic on the `/mk/` pages falls back to
a system serif/sans through the `unicode-range` faces at the top of `app/globals.css`
(zero extra bytes; Latin text never touches them). Self-hosting a Cyrillic-capable pair and
pointing those two `@font-face` rules at it is the polish step if you want the brand look in
Macedonian too. The Macedonian Open Graph card already uses IBM Plex Mono, the one
self-hosted face that has Cyrillic.

## A few deliberate follow-ups, not done here

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
