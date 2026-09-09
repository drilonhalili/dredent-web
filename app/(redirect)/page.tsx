import type { Metadata } from "next";
import { business } from "@/data/site-config";
import { defaultLocale, localePath } from "@/lib/i18n";

// `/` → `/<defaultLocale>/`. A static export has no server to send a 301, and Next's
// redirect() only fires after client-side JS loads, so this page carries an explicit
// <meta http-equiv="refresh"> (React hoists it into <head>) plus a plain link as the
// no-JS fallback. If your host supports redirect rules (Netlify _redirects,
// vercel.json, nginx), add a real 301 for `/` there too — see README.
export const dynamic = "force-static";

const target = localePath(defaultLocale);

export const metadata: Metadata = {
  title: business.name,
  alternates: { canonical: target },
};

export default function RootRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <p style={{ fontFamily: "system-ui, sans-serif", margin: "2rem" }}>
        <a href={target} lang={defaultLocale}>
          {business.name} →
        </a>
      </p>
    </>
  );
}
