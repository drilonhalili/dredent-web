"use client";

import { useEffect } from "react";

// The page ships with <html data-loading>, which keeps scrolling instant (see
// globals.css) so the browser's jump to a #fragment on load — e.g. landing on
// /en/#faq after switching language — can't be cut short by hydration, font swaps
// or the trailing-slash redirect. Once everything has loaded the attribute comes
// off and smooth scrolling applies to the visitor's own clicks. If the load-time
// jump was still lost, scroll to the fragment once, but only when nobody has
// scrolled yet.
export function ScrollBehavior() {
  useEffect(() => {
    const finish = () => {
      if (window.location.hash && window.scrollY < 10) {
        const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
        target?.scrollIntoView();
      }
      document.documentElement.removeAttribute("data-loading");
    };
    if (document.readyState === "complete") {
      finish();
      return;
    }
    window.addEventListener("load", finish, { once: true });
    return () => window.removeEventListener("load", finish);
  }, []);

  return null;
}
