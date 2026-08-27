import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { headTagsFor } from "@/lib/seo";

const MARK = "data-seo";

// Runtime companion to the build-time prerender. On every client-side route
// change it replaces the SEO-managed <head> tags (title, description,
// canonical, OG/Twitter, JSON-LD) with the ones for the new route, so SPA
// navigation never leaves stale metadata behind. Tags it manages are marked
// with data-seo; anything else in <head> (fonts, icons, viewport) is untouched.
const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const head = document.head;
    // Remove previous managed tags (both prerendered and runtime-injected).
    head.querySelectorAll(`[${MARK}]`).forEach((el) => el.remove());
    // Also drop any unmanaged duplicates left from the original index.html shell.
    head
      .querySelectorAll(
        'meta[name="description"], meta[name="robots"], link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"], meta[property^="article:"], script[type="application/ld+json"]',
      )
      .forEach((el) => el.remove());

    for (const t of headTagsFor(pathname)) {
      if (t.tag === "title") {
        document.title = t.text ?? "";
        continue;
      }
      const el = document.createElement(t.tag);
      for (const [k, v] of Object.entries(t.attrs ?? {})) el.setAttribute(k, v);
      if (t.text) el.textContent = t.text;
      el.setAttribute(MARK, "");
      head.appendChild(el);
    }
  }, [pathname]);

  return null;
};

export default Seo;
