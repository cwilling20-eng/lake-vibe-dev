import { parseIcsToEvents } from "./ics.js";
import type { SiteEvent } from "./types.js";

// SINGLE SOURCE OF TRUTH for the events calendar. The client manages every
// public event in this Google Calendar; the website reads it. It is a PUBLIC
// calendar (Settings -> "Make available to public"), so the ICS feed needs no
// credential — nothing here is secret.
export const CALENDAR_ID =
  "c_a626d3f4db94864748fb96124cf22769de62fd01a04d7a97596991e4cd292ce9@group.calendar.google.com";

export const CALENDAR_TIMEZONE = "America/Chicago";

// Public ICS feed (read-only, no auth).
export const CALENDAR_ICS_URL = `https://calendar.google.com/calendar/ical/${encodeURIComponent(
  CALENDAR_ID,
)}/public/basic.ics`;

// Human-facing calendar page — used as a "View full calendar" link and as the
// runtime fallback if the feed is temporarily unreachable.
export const CALENDAR_PUBLIC_URL = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(
  CALENDAR_ID,
)}&ctz=${encodeURIComponent(CALENDAR_TIMEZONE)}`;

export const CALENDAR_EMBED_URL =
  `https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=${encodeURIComponent(
    CALENDAR_TIMEZONE,
  )}&showPrint=0&showCalendars=0&showTz=0&mode=AGENDA` +
  `&title=${encodeURIComponent("What’s Happening at Elements 🎶")}` +
  `&src=${encodeURIComponent(CALENDAR_ID)}&color=%23ad1457`;

// Server-side: download the feed and normalize it. Throws on network/HTTP
// failure so the caller can decide whether to serve a stale cache.
export async function fetchCalendarEvents(now: Date = new Date()): Promise<SiteEvent[]> {
  const res = await fetch(CALENDAR_ICS_URL, {
    headers: { Accept: "text/calendar" },
  });
  if (!res.ok) throw new Error(`Calendar feed returned HTTP ${res.status}`);
  const text = await res.text();
  return parseIcsToEvents(text, { now });
}
