import { ADDRESS_LINE_1, OPENING_HOURS_SPEC, ORDER_ONLINE_URL } from "./siteInfo";

// SINGLE SOURCE OF TRUTH for SEO / GEO metadata and structured data.
//
// Consumed by:
//  - scripts/prerender.mjs (build time) → injects <head> tags + JSON-LD into
//    the pre-rendered HTML for every route, so crawlers that don't run JS see
//    unique titles, descriptions, canonicals and schema.
//  - <Seo /> (runtime) → keeps the same tags in sync during client-side
//    navigation.
//  - scripts/prerender.mjs → sitemap.xml with <lastmod> from PAGES.
//
// Rule from the GEO standard: schema must match visible page content. Every
// fact below (hours, address, phone, FAQs) is also rendered on the page.

export const SITE = {
  domain: "https://elementsccl.com",
  name: "Elements by 456",
  legalName: "Elements by 456",
  city: "Gun Barrel City",
  region: "TX",
  postalCode: "75156",
  phoneDisplay: "(903) 910-7666",
  phoneE164: "+1-903-910-7666",
  facebook: "https://www.facebook.com/ElementsBy456",
  ogImage: "https://elementsccl.com/og-image.jpg",
  logo: "https://elementsccl.com/apple-touch-icon.png",
  description:
    "Elements by 456 is a lakefront restaurant and patio bar in Gun Barrel City, Texas, on Cedar Creek Lake. It serves elevated comfort food for brunch, midday and dinner, handcrafted cocktails at the largest bar on the lake, and hosts live music, karaoke and comedy nights on the patio. Reservations and online ordering are available through Toast.",
} as const;

export const abs = (path: string) => `${SITE.domain}${path === "/" ? "" : path}`;

export interface FaqItem {
  q: string;
  a: string;
}

// Visible on the homepage FAQ section AND emitted as FAQPage schema. Only facts
// already stated elsewhere on the site.
export const HOME_FAQS: FaqItem[] = [
  {
    q: "Where is Elements by 456 located?",
    a: `Elements by 456 is at ${ADDRESS_LINE_1}, Gun Barrel City, TX 75156, on Cedar Creek Lake. We are a lakefront restaurant and patio bar about an hour southeast of Dallas. Call ${SITE.phoneDisplay} with any questions.`,
  },
  {
    q: "What are the hours at Elements by 456?",
    a: "We are open Monday and Thursday 11am–10pm, Friday and Saturday 11am–11pm, and Sunday 11am–8pm. We are closed on Tuesday and Wednesday. Brunch is served Saturday and Sunday from 11am–2pm, and dinner service starts at 4pm.",
  },
  {
    q: "Does Elements by 456 take reservations?",
    a: "Yes. Reservations can be made online through our Toast reservations page, and walk-ins are always welcome. Reservations guarantee your table on busy nights such as live music, karaoke, and comedy shows.",
  },
  {
    q: "Can I order food online from Elements by 456?",
    a: "Yes. Online ordering for pickup is available through Toast at any time from the Order Online button on this site. Our full menu, including brunch, midday, and dinner items, is available to browse on the Menu page.",
  },
  {
    q: "What kind of entertainment does Elements by 456 have?",
    a: "Elements hosts live music with local and touring acts on the patio stage, weekly karaoke nights, and comedy shows. All upcoming dates are posted on our Events calendar, which is updated as new performers are booked.",
  },
  {
    q: "Can I host a private event or party at Elements by 456?",
    a: "Yes. We host birthdays, anniversaries, corporate events, and lake celebrations with full bar and kitchen service. Submit the catering and private event form and our team will respond within 24 hours.",
  },
];

export const CATERING_FAQS: FaqItem[] = [
  {
    q: "What kinds of events can Elements by 456 host?",
    a: "We host private parties such as birthdays and anniversaries, corporate events including team dinners and client entertainment, and lake celebrations on Cedar Creek Lake. Full bar and kitchen service are available for every event.",
  },
  {
    q: "How do I request a private event or catering booking?",
    a: "Fill out the Request a Booking form on this page with your event date, guest count, and details. Our team reviews every request and responds within 24 hours. You can also call (903) 910-7666 to talk it through.",
  },
  {
    q: "Where are private events held?",
    a: "Private events are held at Elements by 456 in Gun Barrel City, Texas, with indoor dining space and the Oasis Patio Bar, the largest outdoor bar on Cedar Creek Lake, available depending on your group size and the occasion.",
  },
];

export interface PageSeo {
  path: string;
  /** Shown in the tab and as og:title. Business + city are appended automatically. */
  title: string;
  /** 150–160 chars, written as a direct micro-answer (GEO standard). */
  description: string;
  breadcrumb: string;
  datePublished: string;
  dateModified: string;
  /** Extra JSON-LD blocks for this page (FAQPage etc.). */
  faqs?: FaqItem[];
  /** Parent breadcrumb for nested pages. */
  parent?: { name: string; path: string };
}

const EVENTS_PARENT = { name: "Events", path: "/events" };

export const PAGES: PageSeo[] = [
  {
    path: "/",
    title: "Lakefront Restaurant & Patio Bar",
    description:
      "Elements by 456 is a lakefront restaurant and patio bar in Gun Barrel City, TX on Cedar Creek Lake, serving brunch, lunch and dinner with live music, karaoke and comedy nights.",
    breadcrumb: "Home",
    datePublished: "2026-06-12",
    dateModified: "2026-08-26",
    faqs: HOME_FAQS,
  },
  {
    path: "/about",
    title: "About Us",
    description:
      "Elements by 456 is a Gun Barrel City, TX restaurant and bar on Cedar Creek Lake with indoor dining, the Oasis Patio Bar, the Patriot Bar, live music, karaoke and comedy.",
    breadcrumb: "About",
    datePublished: "2026-06-12",
    dateModified: "2026-08-26",
  },
  {
    path: "/menu",
    title: "Menu — Brunch, Midday & Dinner",
    description:
      "Elements by 456 menu in Gun Barrel City, TX: weekend brunch, midday lunch and dinner with elevated comfort food, burgers, steaks, seafood and desserts, all fried in beef tallow.",
    breadcrumb: "Menu",
    datePublished: "2026-06-12",
    dateModified: "2026-08-26",
  },
  {
    path: "/specials",
    title: "Specials & Happy Hour",
    description:
      "Specials at Elements by 456 in Gun Barrel City, TX: happy hour 5–7pm every open day, Burger Monday deals, karaoke night tacos and margaritas, plus rotating chef features.",
    breadcrumb: "Specials",
    datePublished: "2026-06-12",
    dateModified: "2026-08-26",
  },
  {
    path: "/events",
    title: "Events Calendar — Live Music, Karaoke & Comedy",
    description:
      "Upcoming events at Elements by 456 in Gun Barrel City, TX: live music on the patio stage, weekly karaoke nights and comedy shows on Cedar Creek Lake, updated from our calendar.",
    breadcrumb: "Events",
    datePublished: "2026-06-12",
    dateModified: "2026-08-26",
  },
  {
    path: "/live-music",
    title: "Live Music on Cedar Creek Lake",
    description:
      "Live music at Elements by 456 in Gun Barrel City, TX: local and touring bands and musicians on the lakefront patio stage most weekends. See who is playing next and reserve a table.",
    breadcrumb: "Live Music",
    datePublished: "2026-06-12",
    dateModified: "2026-08-26",
    parent: EVENTS_PARENT,
  },
  {
    path: "/karaoke-night",
    title: "Karaoke Night",
    description:
      "Karaoke night at Elements by 456 in Gun Barrel City, TX: weekly karaoke on Cedar Creek Lake with street taco and margarita specials, group tables and no cover. Check upcoming dates.",
    breadcrumb: "Karaoke Night",
    datePublished: "2026-06-12",
    dateModified: "2026-08-26",
    parent: EVENTS_PARENT,
  },
  {
    path: "/oasis-patio-bar",
    title: "Oasis Patio Bar",
    description:
      "The Oasis Patio Bar at Elements by 456 is the largest outdoor bar on Cedar Creek Lake in Gun Barrel City, TX, with lake views, signature cocktails, live music and sunset seating.",
    breadcrumb: "Oasis Patio Bar",
    datePublished: "2026-06-12",
    dateModified: "2026-08-26",
  },
  {
    path: "/patriot-bar",
    title: "Patriot Bar",
    description:
      "The Patriot Bar at Elements by 456 in Gun Barrel City, TX honors military, veterans and first responders with a welcoming indoor bar built on respect, community and great drinks.",
    breadcrumb: "Patriot Bar",
    datePublished: "2026-06-12",
    dateModified: "2026-08-26",
  },
  {
    path: "/reservations",
    title: "Reservations",
    description:
      "Reserve a table at Elements by 456 in Gun Barrel City, TX online through Toast. Walk-ins welcome; reservations guarantee your table on live music, karaoke and comedy nights.",
    breadcrumb: "Reservations",
    datePublished: "2026-06-12",
    dateModified: "2026-08-26",
  },
  {
    path: "/catering",
    title: "Catering & Private Events",
    description:
      "Book a private party, corporate event or lake celebration at Elements by 456 in Gun Barrel City, TX with full bar and kitchen service. Submit the form and hear back within 24 hours.",
    breadcrumb: "Catering & Private Events",
    datePublished: "2026-06-12",
    dateModified: "2026-08-26",
    faqs: CATERING_FAQS,
  },
  {
    path: "/contact",
    title: "Contact & Hours",
    description:
      "Contact Elements by 456 at (903) 910-7666 or visit 456 S. Gun Barrel Ln, Gun Barrel City, TX 75156 on Cedar Creek Lake. See weekly hours, map directions and send us a message.",
    breadcrumb: "Contact",
    datePublished: "2026-06-12",
    dateModified: "2026-08-26",
  },
  {
    path: "/entertainment-inquiry",
    title: "Perform at Elements — Entertainment Inquiry",
    description:
      "Musicians, bands, DJs, comedians and promoters can apply to perform at Elements by 456 in Gun Barrel City, TX. Submit the entertainment inquiry form and our team will reach out.",
    breadcrumb: "Perform at Elements",
    datePublished: "2026-08-26",
    dateModified: "2026-08-26",
    parent: EVENTS_PARENT,
  },
  {
    path: "/careers",
    title: "Join Our Team — Careers",
    description:
      "Apply to work at Elements by 456, a lakefront restaurant and patio bar in Gun Barrel City, TX hiring servers, bartenders, cooks and hosts. Submit the short application online.",
    breadcrumb: "Join Our Team",
    datePublished: "2026-08-26",
    dateModified: "2026-08-26",
  },
];

export const getPageSeo = (path: string): PageSeo =>
  PAGES.find((p) => p.path === path) ?? {
    ...PAGES[0],
    path,
    title: "Page Not Found",
    description: SITE.description.slice(0, 158),
    breadcrumb: "Not Found",
  };

export const fullTitle = (p: PageSeo) =>
  p.path === "/" ? `${SITE.name} | ${p.title} — ${SITE.city}, ${SITE.region}` : `${p.title} | ${SITE.name} — ${SITE.city}, ${SITE.region}`;

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

const BUSINESS_ID = `${SITE.domain}/#business`;
const WEBSITE_ID = `${SITE.domain}/#website`;

export const restaurantSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["Restaurant", "BarOrPub"],
  "@id": BUSINESS_ID,
  name: SITE.name,
  description: SITE.description,
  url: SITE.domain,
  logo: { "@type": "ImageObject", url: SITE.logo, width: 180, height: 180 },
  image: SITE.ogImage,
  telephone: SITE.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS_LINE_1,
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    postalCode: SITE.postalCode,
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Gun Barrel City", sameAs: "https://en.wikipedia.org/wiki/Gun_Barrel_City,_Texas" },
    { "@type": "Place", name: "Cedar Creek Lake", sameAs: "https://en.wikipedia.org/wiki/Cedar_Creek_Reservoir_(Texas)" },
    { "@type": "City", name: "Mabank" },
    { "@type": "City", name: "Kemp" },
    { "@type": "City", name: "Seven Points" },
  ],
  servesCuisine: ["American", "Comfort food", "Southern"],
  priceRange: "$$",
  openingHoursSpecification: OPENING_HOURS_SPEC.map((h) => ({ "@type": "OpeningHoursSpecification", ...h })),
  hasMenu: abs("/menu"),
  acceptsReservations: abs("/reservations"),
  potentialAction: { "@type": "OrderAction", target: ORDER_ONLINE_URL },
  sameAs: [SITE.facebook, ORDER_ONLINE_URL],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Outdoor patio bar", value: true },
    { "@type": "LocationFeatureSpecification", name: "Live music", value: true },
    { "@type": "LocationFeatureSpecification", name: "Karaoke", value: true },
    { "@type": "LocationFeatureSpecification", name: "Private events", value: true },
  ],
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE.domain,
  name: SITE.name,
  description: SITE.description,
  publisher: { "@id": BUSINESS_ID },
  inLanguage: "en-US",
});

export const breadcrumbSchema = (p: PageSeo) => {
  const items = [{ name: "Home", path: "/" }];
  if (p.parent) items.push(p.parent);
  if (p.path !== "/") items.push({ name: p.breadcrumb, path: p.path });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${abs(p.path)}/#breadcrumb`,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
};

export const webPageSchema = (p: PageSeo) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${abs(p.path)}/#webpage`,
  url: abs(p.path),
  name: fullTitle(p),
  description: p.description,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": BUSINESS_ID },
  datePublished: p.datePublished,
  dateModified: p.dateModified,
  breadcrumb: { "@id": `${abs(p.path)}/#breadcrumb` },
  inLanguage: "en-US",
  primaryImageOfPage: SITE.ogImage,
});

export const faqSchema = (faqs: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

/** All JSON-LD blocks for a route, in order. */
export function jsonLdFor(path: string): object[] {
  const p = getPageSeo(path);
  const blocks: object[] = [];
  if (p.path === "/") blocks.push(restaurantSchema(), websiteSchema());
  blocks.push(webPageSchema(p), breadcrumbSchema(p));
  if (p.faqs?.length) blocks.push(faqSchema(p.faqs));
  return blocks;
}

// ---------------------------------------------------------------------------
// <head> tags (shared shape for prerender + runtime)
// ---------------------------------------------------------------------------

export interface HeadTag {
  tag: "title" | "meta" | "link" | "script";
  attrs?: Record<string, string>;
  text?: string;
}

export function headTagsFor(path: string): HeadTag[] {
  const p = getPageSeo(path);
  const title = fullTitle(p);
  const url = abs(p.path);
  const tags: HeadTag[] = [
    { tag: "title", text: title },
    { tag: "meta", attrs: { name: "description", content: p.description } },
    { tag: "meta", attrs: { name: "robots", content: p.breadcrumb === "Not Found" ? "noindex, follow" : "index, follow" } },
    { tag: "link", attrs: { rel: "canonical", href: url } },
    { tag: "meta", attrs: { property: "og:title", content: title } },
    { tag: "meta", attrs: { property: "og:description", content: p.description } },
    { tag: "meta", attrs: { property: "og:type", content: p.path === "/" ? "restaurant.restaurant" : "website" } },
    { tag: "meta", attrs: { property: "og:url", content: url } },
    { tag: "meta", attrs: { property: "og:image", content: SITE.ogImage } },
    { tag: "meta", attrs: { property: "og:image:width", content: "1200" } },
    { tag: "meta", attrs: { property: "og:image:height", content: "630" } },
    { tag: "meta", attrs: { property: "og:site_name", content: SITE.name } },
    { tag: "meta", attrs: { property: "og:locale", content: "en_US" } },
    { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
    { tag: "meta", attrs: { name: "twitter:title", content: title } },
    { tag: "meta", attrs: { name: "twitter:description", content: p.description } },
    { tag: "meta", attrs: { name: "twitter:image", content: SITE.ogImage } },
    { tag: "meta", attrs: { property: "article:published_time", content: p.datePublished } },
    { tag: "meta", attrs: { property: "article:modified_time", content: p.dateModified } },
    { tag: "meta", attrs: { name: "geo.region", content: "US-TX" } },
    { tag: "meta", attrs: { name: "geo.placename", content: SITE.city } },
  ];
  for (const block of jsonLdFor(path)) {
    tags.push({ tag: "script", attrs: { type: "application/ld+json" }, text: JSON.stringify(block) });
  }
  return tags;
}

const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Serialize head tags to HTML (build-time prerender). */
export function renderHeadTags(path: string): string {
  return headTagsFor(path)
    .map((t) => {
      const attrs = Object.entries(t.attrs ?? {})
        .map(([k, v]) => ` ${k}="${escapeAttr(v)}"`)
        .join("");
      if (t.tag === "title") return `<title>${escapeAttr(t.text ?? "")}</title>`;
      if (t.tag === "script") return `<script${attrs}>${(t.text ?? "").replace(/</g, "\\u003c")}</script>`;
      return `<${t.tag}${attrs} />`;
    })
    .map((line) => `    ${line}`)
    .join("\n");
}
