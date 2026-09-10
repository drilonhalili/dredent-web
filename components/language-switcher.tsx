"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n-provider";
import { localeNames, locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  variant = "dropdown",
  className,
  onNavigate,
}: {
  // dropdown: compact trigger with a floating panel (desktop bar);
  // inline: full-width row whose list expands in place (mobile menu).
  variant?: "dropdown" | "inline";
  className?: string;
  onNavigate?: () => void;
}) {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  // Same page in the other language: swap only the locale segment (/sq/terms/ → /en/terms/).
  const rest = pathname.replace(/^\/[^/]+/, "") || "/";
  const hrefFor = (target: Locale) => `/${target}${rest}`;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const panelId = useId();
  const inline = variant === "inline";

  // Close on Escape or a pointer press anywhere outside the widget.
  useEffect(() => {
    if (!open) return;
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  // Keep the visitor on the section they were reading (#faq etc.) when switching.
  // Each locale is its own root layout instance, so Next does a full page load here
  // anyway (and drops the fragment on the way) — navigate directly instead, which
  // keeps the hash and lets the browser scroll to the anchor. Plain-click only, so
  // modifier-clicks still open the plain href in a new tab.
  function switchTo(e: MouseEvent<HTMLAnchorElement>, target: Locale) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setOpen(false);
    onNavigate?.();
    window.location.assign(`${hrefFor(target)}${window.location.hash}`);
  }

  function moveFocus(offset: 1 | -1) {
    const items = Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
    if (!items.length) return;
    const current = items.indexOf(document.activeElement as HTMLAnchorElement);
    const next =
      current === -1 ? (offset === 1 ? 0 : items.length - 1) : (current + offset + items.length) % items.length;
    items[next].focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const offset = e.key === "ArrowDown" ? 1 : -1;
    if (open) {
      moveFocus(offset);
    } else {
      setOpen(true);
      // The list mounts on the next render; focus an item once it exists.
      requestAnimationFrame(() => moveFocus(offset));
    }
  }

  // Tabbing out of the widget closes it. Only react to a real next target: some
  // browsers blur the trigger without focusing the clicked link, and closing there
  // would unmount the link before its click lands.
  function onBlur(e: FocusEvent<HTMLDivElement>) {
    if (e.relatedTarget && !rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
  }

  return (
    <div
      ref={rootRef}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      className={cn("relative", inline && "w-full", className)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={`${t.a11y.language}: ${localeNames[locale]}`}
        className={cn(
          "cursor-pointer items-center transition-colors",
          inline
            ? "flex w-full gap-3 rounded-lg px-3 py-3 font-medium text-ink hover:bg-cusp/5"
            : "inline-flex gap-1.5 rounded-full border border-mist px-3 py-1.5 font-mono text-[0.65rem] font-medium uppercase tracking-wider text-ink-soft hover:border-cusp/40 hover:text-cusp",
        )}
      >
        <Globe className={inline ? "h-5 w-5 text-cusp" : "h-3.5 w-3.5"} aria-hidden="true" />
        {inline ? localeNames[locale] : <span aria-hidden="true">{locale.toUpperCase()}</span>}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            inline && "ml-auto h-4 w-4 text-ink-soft",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            ref={listRef}
            id={panelId}
            role="list"
            aria-label={t.a11y.language}
            initial={inline ? { opacity: 0, height: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            animate={inline ? { opacity: 1, height: "auto" } : { opacity: 1, y: 0, scale: 1 }}
            exit={inline ? { opacity: 0, height: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={
              inline
                ? "overflow-hidden pl-8"
                : "absolute right-0 top-full z-50 mt-2 min-w-[11rem] origin-top-right rounded-xl border border-mist bg-porcelain p-1 shadow-[0_12px_40px_-12px_rgba(18,33,29,0.25)]"
            }
          >
            {locales.map((l) => {
              const active = l === locale;
              return (
                <li key={l}>
                  <a
                    href={hrefFor(l)}
                    hrefLang={l}
                    lang={l}
                    aria-current={active ? "page" : undefined}
                    onClick={(e) => switchTo(e, l)}
                    className={cn(
                      "flex items-center justify-between gap-6 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-cusp/5",
                      active ? "font-semibold text-cusp" : "text-ink",
                    )}
                  >
                    {localeNames[l]}
                    {active && <Check className="h-4 w-4" aria-hidden="true" />}
                  </a>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
