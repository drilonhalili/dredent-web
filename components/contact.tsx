"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { business } from "@/data/site-config";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // NOTE: this is a client-side stand-in — static export has no backend to send to.
  // Wire it to a real endpoint before launch: a Supabase table + edge function
  // (a natural fit if the booking app already uses Supabase), a form service like
  // Formspree/Getform, or a serverless function on whatever host you deploy to.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  }

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
            subtitle="Tell us what's on your mind and we'll get back to you within one business day."
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
          className="rounded-3xl border border-mist bg-porcelain-2 p-6 sm:p-8"
        >
          {submitted ? (
            <div role="status" className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
              <p className="font-display text-2xl font-semibold text-ink">Request sent</p>
              <p className="mt-2 max-w-xs text-ink-soft">
                We&rsquo;ll reply at the email you gave us within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" name="name" type="text" autoComplete="name" required />
                <Field label="Email" name="email" type="email" autoComplete="email" required />
              </div>
              <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
                  What&rsquo;s on your mind?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full rounded-xl border border-mist bg-porcelain px-4 py-3 text-ink outline-none transition-colors focus:border-cusp"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full cursor-pointer rounded-full bg-cusp px-6 py-3.5 text-sm font-semibold text-porcelain transition-colors duration-200 hover:bg-cusp-deep disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Send request"}
              </button>
            </form>
          )}
        </motion.div>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-xl border border-mist bg-porcelain px-4 py-3 text-ink outline-none transition-colors focus:border-cusp"
      />
    </div>
  );
}
