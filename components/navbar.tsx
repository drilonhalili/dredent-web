"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { business, nav } from "@/data/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  // Close the mobile menu on Escape, and lock body scroll while it's open.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-porcelain/85 shadow-[0_1px_0_0_var(--color-mist)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <a href="#top" className="flex items-center gap-2.5 font-display text-lg font-semibold text-ink">
          <svg width="26" height="26" viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="16" fill="#142F2A" />
            <path
              d="M32 13c11 0 14.5 11 14.5 19S43 51 32 51 17.5 40 17.5 32 21 13 32 13Z"
              fill="#F3F5F1"
            />
            <circle cx="37.5" cy="22.5" r="3.4" fill="#C89448" />
          </svg>
          {business.name}
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs font-medium uppercase tracking-wider text-ink-soft transition-colors hover:text-cusp"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={business.phoneHref}
            className="flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-cusp"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {business.phone}
          </a>
          <a
            href={business.bookingHref}
            className="cursor-pointer rounded-full bg-cusp px-5 py-2.5 text-sm font-semibold text-porcelain transition-colors duration-200 hover:bg-cusp-deep"
          >
            Book a visit
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="cursor-pointer p-2 text-ink lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-mist bg-porcelain lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 font-medium text-ink transition-colors hover:bg-cusp/5"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={business.bookingHref}
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-cusp px-5 py-3 text-center text-sm font-semibold text-porcelain"
              >
                Book a visit
              </a>
              <a
                href={business.phoneHref}
                className="mt-1 flex items-center justify-center gap-2 py-2 text-sm text-ink-soft"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {business.phone}
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
