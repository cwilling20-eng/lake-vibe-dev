// Single source of truth for the restaurant's core facts. Update here and every
// page reflects it. (Mirrors the src/lib/menuSource.ts "facts live in lib" pattern.)

export const ORDER_ONLINE_URL = "https://order.toasttab.com/online/elements-by-456";

// Official social profiles (verified by the client, 2026-08-27).
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/ElementsBy456",
  instagram: "https://www.instagram.com/elementsby456/",
  tiktok: "https://www.tiktok.com/@elements.by.456",
} as const;

export const ADDRESS_LINE_1 = "456 S. Gun Barrel Ln.";
export const CITY_STATE_ZIP = "Gun Barrel City, TX 75156";

// Google Maps link for the address (opens Maps / the Maps app).
export const MAPS_LINK_URL =
  "https://www.google.com/maps?q=456%20S.%20Gun%20Barrel%20Ln%2C%20Gun%20Barrel%20City%2C%20TX%2075156";

// Google Maps address-query embed (no API key required).
export const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=456%20S.%20Gun%20Barrel%20Ln%2C%20Gun%20Barrel%20City%2C%20TX%2075156&output=embed";

// ONE weekly schedule feeds both the visible hours (HOURS) and the schema.org
// openingHoursSpecification (OPENING_HOURS_SPEC), so they can never drift apart.
// A day with no opens/closes is closed. Times are 24h "HH:MM".
// Sunday is brunch service only (9am-3pm); there is no Sunday evening service.
const SCHEDULE: { day: string; label?: string; opens?: string; closes?: string }[] = [
  { day: "Monday", opens: "15:00", closes: "22:00" },
  { day: "Tuesday" },
  { day: "Wednesday" },
  { day: "Thursday", opens: "15:00", closes: "22:00" },
  { day: "Friday", opens: "15:00", closes: "22:00" },
  { day: "Saturday", opens: "11:00", closes: "22:00" },
  { day: "Sunday", label: "Sunday Brunch", opens: "09:00", closes: "15:00" },
];

// "15:00" -> "3pm", "09:30" -> "9:30am"
const to12h = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, "0")}` : ""}${h >= 12 ? "pm" : "am"}`;
};

// Display hours, shown across home/footer/contact. "Closed" renders in red.
export const HOURS: [string, string][] = SCHEDULE.map((d) => [
  d.label ?? d.day,
  d.opens && d.closes ? `${to12h(d.opens)} – ${to12h(d.closes)}` : "Closed",
]);

// schema.org openingHoursSpecification. Closed days are simply omitted.
export const OPENING_HOURS_SPEC = SCHEDULE.filter((d) => d.opens && d.closes).map((d) => ({
  dayOfWeek: d.day,
  opens: d.opens as string,
  closes: d.closes as string,
}));

// Happy Hour runs Mon and Thu-Sat only (NOT every open day, NOT Sunday).
export const HAPPY_HOUR_TIME = "3–6pm";
export const HAPPY_HOUR_DAYS = "Monday and Thursday through Saturday";
export const HAPPY_HOUR_DAYS_SHORT = "Mon & Thu–Sat";
