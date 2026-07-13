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

The mosaic ships with static placeholder tiles because a real feed needs Instagram
Business/Creator credentials I don't have. To wire it up:

1. Create a Meta developer app + Instagram Business or Creator account.
2. Fetch posts server-side with the **Instagram Graph API** and cache the result (a
   build-time fetch or a small scheduled job both work fine — this site doesn't need
   second-by-second freshness). Never expose a long-lived token client-side.
3. Replace `instagramPosts` in `data/site-config.ts` with the fetched data, or swap in a
   hosted widget (Curator, SnapWidget, Behold) if you'd rather not run the API glue.

## The contact section map

`components/contact.tsx` pairs the clinic's contact details with an interactive Google
Maps embed instead of a form (a static export has no backend to POST a form to anyway).
The embed uses the keyless `output=embed` iframe — no API key to manage or restrict —
zoomed to street level (`z=17`) on the clinic, with `loading="lazy"` so it doesn't
block first paint. Below the map, "Get directions" and "Open in Google Maps" use the
official Maps URLs API: they open the native app on mobile, and for directions Google
asks the visitor for their start point, so the site never touches their location.
All three URLs derive from `business.mapQuery` in `data/site-config.ts` — update that
one value (and the `geo` coordinates) once you have the exact pin. Note the iframe
loads Google's scripts/cookies on page view; if you later add a consent banner, gate
the iframe behind it (a click-to-load facade is the usual pattern).

## A few deliberate follow-ups, not done here

- **Font subsetting**: the three self-hosted fonts are full variable/static files
  (~1.9 MB total). `pyftsubset` or `glyphhanger` can trim this substantially once you know
  the final character set (Latin + Cyrillic, if you add Macedonian/Albanian copy).
- **i18n**: given the clinic is in Tetovo, Albanian and Macedonian locale passes
  (Next's built-in `i18n` routing, or a library like `next-intl`) would help local
  search more than almost anything else on this list — likely `sq` first for Tetovo.
- **Real photography**: cosmetic dentistry sites live or die on the before/after gallery —
  the compare slider is only as convincing as the two photos in it.

## Stack

Next.js 15 (App Router, static export) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion · Three.js + @react-three/fiber + @react-three/drei · lucide-react icons
