/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static export -> deployable to any static host (Vercel, Netlify, Cloudflare Pages,
  // GitHub Pages, S3, or your own nginx box). Remove this line if you deploy to Vercel and want
  // server rendering / on-demand image optimization instead.
  output: "export",
  images: {
    // Static export can't run the Next.js image optimization server, so images are served as-is.
    unoptimized: true,
  },
  trailingSlash: true,
  // app/global-not-found.tsx renders out/404.html. The site has two root layouts
  // (app/(redirect) and app/[locale]), so the regular app/not-found.tsx convention,
  // which needs a single root layout, is not available.
  experimental: { globalNotFound: true },
};

export default nextConfig;
