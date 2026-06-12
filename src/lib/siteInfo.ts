// Single source of truth for the restaurant's core facts. Update here and every
// page reflects it. (Mirrors the src/lib/menuSource.ts "facts live in lib" pattern.)

export const ORDER_ONLINE_URL = "https://order.toasttab.com/online/elements-by-456";

export const ADDRESS_LINE_1 = "456 S. Gun Barrel Ln.";
export const CITY_STATE_ZIP = "Gun Barrel City, TX 75156";

// Google Maps address-query embed (no API key required).
export const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=456%20S.%20Gun%20Barrel%20Ln%2C%20Gun%20Barrel%20City%2C%20TX%2075156&output=embed";

// Display hours, shown across home/footer/contact. "Closed" renders in red.
export const HOURS: [string, string][] = [
  ["Monday", "11am – 10pm"],
  ["Tuesday", "Closed"],
  ["Wednesday", "Closed"],
  ["Thursday", "11am – 10pm"],
  ["Friday", "11am – 11pm"],
  ["Saturday", "11am – 11pm"],
  ["Sunday", "11am – 8pm"],
];

// schema.org openingHoursSpecification — the same facts in structured-data form.
export const OPENING_HOURS_SPEC = [
  { dayOfWeek: "Monday", opens: "11:00", closes: "22:00" },
  { dayOfWeek: "Thursday", opens: "11:00", closes: "22:00" },
  { dayOfWeek: "Friday", opens: "11:00", closes: "23:00" },
  { dayOfWeek: "Saturday", opens: "11:00", closes: "23:00" },
  { dayOfWeek: "Sunday", opens: "11:00", closes: "20:00" },
];
