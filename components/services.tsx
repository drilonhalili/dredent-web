"use client";

import { motion } from "framer-motion";
import { Anchor, Gem, Layers, Scan, Sparkles, Stethoscope, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/components/i18n-provider";
import { services, type ServiceIcon } from "@/data/site-config";

const icons: Record<ServiceIcon, LucideIcon> = {
  scan: Scan,
  gem: Gem,
  sparkles: Sparkles,
  layers: Layers,
  anchor: Anchor,
  stethoscope: Stethoscope,
};

export function Services() {
  const { t } = useI18n();

  return (
    <section id="services" className="bg-porcelain-2 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            const copy = t.services.items[service.id];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group rounded-2xl border border-mist bg-porcelain p-7 transition-colors duration-200 hover:border-cusp/30"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cusp/10 text-cusp transition-colors duration-200 group-hover:bg-cusp group-hover:text-porcelain">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{copy.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">{copy.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
