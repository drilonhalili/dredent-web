"use client";

import { motion } from "framer-motion";
import { Clock, ExternalLink, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { business, mapLinks } from "@/data/site-config";

export function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="Visit or write"
            title="Book a consultation"
            subtitle="Call or email us to book a visit — we'll get back to you within one business day."
          />

          <ul className="mt-8 space-y-5">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cusp" aria-hidden="true" />
              <div>
                <p className="text-ink">{business.address.line1}</p>
                <p className="text-ink-soft">{business.address.line2}</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-cusp" aria-hidden="true" />
              <a href={business.phoneHref} className="text-ink hover:text-cusp">
                {business.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-cusp" aria-hidden="true" />
              <a href={`mailto:${business.email}`} className="text-ink hover:text-cusp">
                {business.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-cusp" aria-hidden="true" />
              <div className="space-y-0.5">
                {business.hours.map((h) => (
                  <p key={h.days} className="text-ink-soft">
                    <span className="text-ink">{h.days}</span> — {h.time}
                  </p>
                ))}
              </div>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col overflow-hidden rounded-3xl border border-mist bg-porcelain-2"
        >
          <iframe
            src={mapLinks.embed}
            title={`Map showing the location of ${business.name}`}
            className="min-h-[360px] w-full flex-1 border-0 sm:min-h-[420px]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:px-6">
            <a
              href={mapLinks.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cusp px-6 py-3 text-sm font-semibold text-porcelain transition-colors duration-200 hover:bg-cusp-deep"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Get directions
            </a>
            <a
              href={mapLinks.view}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-cusp hover:text-cusp-deep"
            >
              Open in Google Maps
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
