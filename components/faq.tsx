"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";

export function Faq() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} align="left" />

        <div className="mt-10 divide-y divide-mist border-y border-mist">
          {t.faq.items.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold text-ink sm:text-lg">
                    {faq.question}
                  </span>
                  <Plus
                    className={cn(
                      "h-5 w-5 shrink-0 text-cusp transition-transform duration-300",
                      open && "rotate-45",
                    )}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 leading-relaxed text-ink-soft">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
