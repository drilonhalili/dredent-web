"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { business, curatorFeed, instagramPosts } from "@/data/site-config";
import { placeholderImage } from "@/lib/utils";

/**
 * Instagram wall in the Curator.io "mosaic" style (https://curator.io/templates/mosaic).
 *
 * Two modes, switched by `curatorFeed.feedId` (data/site-config.ts + .env.example):
 *   - feedId set: renders the live Curator.io feed. Create the feed with the Mosaic
 *     template in Curator, publish it, and put its id in NEXT_PUBLIC_CURATOR_FEED_ID.
 *   - feedId empty (default): the built-in placeholder mosaic below, tiles from
 *     `instagramPosts` in data/site-config.ts.
 */
export function InstagramMosaic() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Follow along"
            title="The everyday, on Instagram"
            subtitle={`Scans, shade matches, and studio life — ${business.social.instagramHandle}.`}
          />
          <ButtonLink href={business.social.instagram} variant="outline" className="shrink-0">
            Follow us
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        {curatorFeed.feedId ? (
          <CuratorMosaic />
        ) : (
        <div className="mt-10 grid auto-rows-[130px] grid-cols-2 gap-3 sm:auto-rows-[170px] sm:grid-cols-4 sm:gap-4">
          {instagramPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href={business.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
              className={`group relative overflow-hidden rounded-xl ${
                post.big ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={placeholderImage(post.seed, post.big ? 700 : 350, post.big ? 700 : 350)}
                alt={post.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/80 via-ink/0 to-ink/0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="line-clamp-2 text-xs font-medium text-porcelain">{post.caption}</p>
                <span className="mt-1 flex items-center gap-1 text-xs text-porcelain/80">
                  <Heart className="h-3 w-3 fill-current" aria-hidden="true" />
                  {post.likes}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
        )}
      </Container>
    </section>
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
