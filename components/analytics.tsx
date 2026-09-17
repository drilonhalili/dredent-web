import { analytics } from "@/data/site-config";

/**
 * Cloudflare Web Analytics beacon (https://developers.cloudflare.com/web-analytics/).
 * It stores nothing in the browser — no cookies, no localStorage — and does not
 * fingerprint visitors, so it needs no consent and stays outside the cookie banner;
 * the privacy and cookie policies (dictionary `legal`) describe it. This is Cloudflare's
 * own snippet rendered as a plain deferred script, so it is in the static HTML and works
 * on every page load without client-side JavaScript. Renders nothing until
 * NEXT_PUBLIC_CF_ANALYTICS_TOKEN is set.
 */
export function Analytics() {
  if (!analytics.cloudflareToken) return null;
  return (
    <>
      <link rel="preconnect" href="https://static.cloudflareinsights.com" />
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon={JSON.stringify({ token: analytics.cloudflareToken })}
      />
    </>
  );
}
