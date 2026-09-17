"use client";

import { useEffect } from "react";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { useI18n } from "@/components/i18n-provider";
import {
  business,
  curatorFeed,
  curatorFeedActive,
  instagramPosts,
  instagramPostUrl,
  instagramTileSrc,
  instagramTileSrcSet,
  instagramTileSrcSetAvif,
} from "@/data/site-config";
import { useConsentState } from "@/lib/consent";
import { fill } from "@/lib/i18n";

/**
 * Instagram wall in the Curator.io "mosaic" style (https://curator.io/templates/mosaic).
 *
 * Two modes, switched by `curatorFeed.enabled` in data/site-config.ts:
 *   - off (current): a static mosaic of the clinic's own posts — `instagramPosts`,
 *     images in public/instagram/ — each tile linking to the post on Instagram.
 *     Nothing is requested from a third party, so no consent is involved.
 *   - on, with NEXT_PUBLIC_CURATOR_FEED_ID set: the live Curator.io feed, loaded only
 *     once the visitor has consented, because it pulls Curator/Instagram scripts.
 */
export function InstagramMosaic() {
  const { t } = useI18n();
  const { consent } = useConsentState();

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t.instagram.eyebrow}
            title={t.instagram.title}
            subtitle={fill(t.instagram.subtitle, { handle: business.social.instagramHandle })}
          />
          <ButtonLink href={business.social.instagram} variant="outline" className="shrink-0">
            {t.instagram.follow}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        {curatorFeedActive && consent?.media ? <CuratorMosaic /> : <StaticMosaic />}
      </Container>
    </section>
  );
}

function StaticMosaic() {
  const { t } = useI18n();

  return (
    <div className="mt-10 grid auto-rows-[130px] grid-cols-2 gap-3 sm:auto-rows-[170px] sm:grid-cols-4 sm:gap-4">
      {instagramPosts.map((post, i) => {
        const caption = t.instagram.captions[post.id];
        const big = "big" in post && post.big;
        return (
          <m.a
            key={post.id}
            href={instagramPostUrl(post)}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
            className={`group relative overflow-hidden rounded-xl bg-porcelain-2 ${
              big ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
            }`}
          >
            <picture>
              <source
                type="image/avif"
                srcSet={instagramTileSrcSetAvif(post)}
                sizes={big ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 25vw, 50vw"}
              />
              { }
              <img
              src={instagramTileSrc(post)}
              srcSet={instagramTileSrcSet(post)}
              sizes={big ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 25vw, 50vw"}
              alt={caption}
              width={900}
              height={600}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            </picture>
            {/* Repeats the alt text visually on hover, so it is hidden from assistive tech. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/80 via-ink/0 to-ink/0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              <p className="line-clamp-2 text-xs font-medium text-porcelain">{caption}</p>
            </div>
          </m.a>
        );
      })}
    </div>
  );
}

// Live Curator.io embed. The loader script populates the container div; the
// "Powered by Curator.io" link is required on Curator's free plan.
function CuratorMosaic() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.charset = "UTF-8";
    script.src = `https://cdn.curator.io/published/${curatorFeed.feedId}.js`;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <div id={curatorFeed.containerId} className="mt-10">
      <a
        href="https://curator.io"
        target="_blank"
        rel="noopener noreferrer"
        className="crt-logo crt-tag"
      >
        Powered by Curator.io
      </a>
    </div>
  );
}
