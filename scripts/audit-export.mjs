// Quick audit of the static export: fetches every route from a local static server
// (default http://localhost:4173, i.e. `npx serve out -l 4173`) and prints status, <title>,
// description, canonical, Open Graph image, H1s, images without alt, external links
// without rel="noopener" and the JSON-LD types found.
//   npx serve out -l 4173   (in another terminal)
//   node scripts/audit-export.mjs [baseUrl]

const base = process.argv[2] ?? "http://localhost:4173";
const pages = ["/", "/sq/", "/en/", "/mk/", "/sq/terms/", "/sq/privacy/", "/sq/cookies/", "/en/terms/", "/mk/privacy/", "/sitemap.xml", "/robots.txt", "/manifest.webmanifest", "/sq/opengraph-image", "/apple-icon.png", "/favicon.ico", "/en/does-not-exist/", "/map/tetovo.pmtiles", "/map/vendor/maplibre-gl-worker.js"];
const grab = (html, re) => [...html.matchAll(re)].map((m) => m[1]);
const attr = (tag, name) => (tag.match(new RegExp(`${name}=["']([^"']*)["']`)) || [])[1];
for (const p of pages) {
  const r = await fetch(base + p, { redirect: "manual", headers: { Range: p.endsWith(".pmtiles") ? "bytes=0-0" : "" } });
  const type = r.headers.get("content-type") || "";
  if (!type.includes("text/html")) { console.log(`${r.status} ${p}  [${type.split(";")[0]}] ${r.headers.get("content-length") ?? ""}`); continue; }
  const html = await r.text();
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  const tags = [...html.matchAll(/<(meta|link)\s[^>]*>/g)].map((m) => m[0]);
  const meta = (n) => tags.filter((t) => attr(t, "name") === n || attr(t, "property") === n).map((t) => attr(t, "content"));
  const links = (rel) => tags.filter((t) => attr(t, "rel") === rel);
  const desc = meta("description")[0];
  const h1 = grab(html, /<h1[^>]*>([\s\S]*?)<\/h1>/g).map((s) => s.replace(/<[^>]+>/g, "").trim());
  const imgs = [...html.matchAll(/<img\s[^>]*>/g)].map((m) => m[0]);
  const noAlt = imgs.filter((t) => !/\salt=/.test(t)).length;
  const ext = [...html.matchAll(/<a\s[^>]*href=["']https?:\/\/[^"']*["'][^>]*>/g)].map((m) => m[0]);
  const extNoRel = ext.filter((t) => !/rel=["'][^"']*noopener/.test(t)).length;
  const ld = grab(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  let ldTypes = [];
  for (const s of ld) { try { const j = JSON.parse(s); ldTypes.push(j["@type"] ?? (j["@graph"] || []).map((x) => x["@type"]).join("+")); } catch { ldTypes.push("INVALID"); } }
  const lang = (html.match(/<html[^>]*\slang=["']([^"']*)["']/) || [])[1];
  const refresh = tags.find((t) => /http-equiv=["']refresh/i.test(t));
  console.log(`${r.status} ${p}`);
  console.log(`   lang=${lang} title(${title?.length})="${title}"`);
  console.log(`   desc(${desc?.length ?? 0})="${desc ?? "MISSING"}"`);
  console.log(`   canonical=${links("canonical").map((t) => attr(t, "href"))} hreflang=${links("alternate").filter((t) => attr(t, "hreflang")).map((t) => attr(t, "hreflang")).join(",")}`);
  console.log(`   og:title=${!!meta("og:title")[0]} og:image=${meta("og:image")[0] ?? "MISSING"} og:locale=${meta("og:locale")[0] ?? "-"} twitter:card=${meta("twitter:card")[0] ?? "-"}`);
  console.log(`   robots=${meta("robots")[0] ?? "-"} theme-color=${meta("theme-color")[0] ?? "-"} manifest=${links("manifest").length} icon=${links("icon").length + links("apple-touch-icon").length}`);
  console.log(`   h1=${JSON.stringify(h1)} imgs=${imgs.length} noAlt=${noAlt} extLinks=${ext.length} extNoNoopener=${extNoRel} jsonld=${ldTypes.join(",") || "none"}${refresh ? " refresh=" + attr(refresh, "content") : ""}`);
}
