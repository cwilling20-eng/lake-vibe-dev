import { CALENDAR_TIMEZONE } from "./calendar";
import type { SiteEvent } from "./types";

// Display helpers. Everything renders in the venue's timezone regardless of
// where the visitor is, so "7pm" always means 7pm in Gun Barrel City.

const parseAllDay = (ymd: string): Date => {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, m - 1, d, 12); // noon local avoids DST edge cases
};

const dateFmt = (opts: Intl.DateTimeFormatOptions, tz?: string) =>
  new Intl.DateTimeFormat("en-US", { ...opts, ...(tz ? { timeZone: tz } : {}) });

/** "Sat, Aug 29" */
export function formatEventDate(e: SiteEvent): string {
  if (e.allDay) {
    return dateFmt({ weekday: "short", month: "short", day: "numeric" }).format(parseAllDay(e.start));
  }
  return dateFmt(
    { weekday: "short", month: "short", day: "numeric" },
    CALENDAR_TIMEZONE,
  ).format(new Date(e.start));
}

/** Short pieces for the date badge: { weekday: "SAT", day: "29", month: "AUG" } */
export function formatDateBadge(e: SiteEvent): { weekday: string; day: string; month: string } {
  const d = e.allDay ? parseAllDay(e.start) : new Date(e.start);
  const tz = e.allDay ? undefined : CALENDAR_TIMEZONE;
  return {
    weekday: dateFmt({ weekday: "short" }, tz).format(d).toUpperCase(),
    day: dateFmt({ day: "numeric" }, tz).format(d),
    month: dateFmt({ month: "short" }, tz).format(d).toUpperCase(),
  };
}

const timeOf = (iso: string): string =>
  dateFmt({ hour: "numeric", minute: "2-digit" }, CALENDAR_TIMEZONE)
    .format(new Date(iso))
    .replace(":00", "")
    .replace(" AM", "am")
    .replace(" PM", "pm");

/** "7pm – 10pm", or "All day" */
export function formatEventTime(e: SiteEvent): string {
  if (e.allDay) return "All day";
  const start = timeOf(e.start);
  const end = timeOf(e.end);
  return start === end ? start : `${start} – ${end}`;
}

// The calendar's LOCATION is almost always the restaurant itself. Only surface
// it when it's somewhere else (e.g. an off-site lake event).
export function isOffsiteLocation(location: string): boolean {
  const l = location.toLowerCase();
  if (!l) return false;
  return !(l.includes("elements") || l.includes("456 gun barrel") || l.includes("456 s. gun barrel"));
}
