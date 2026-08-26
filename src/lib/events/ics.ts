import ICAL from "ical.js";
import { categorizeEvent } from "./categorize";
import type { SiteEvent } from "./types";

// Google Calendar public ICS -> SiteEvent[].
//
// Why ical.js (Mozilla): it is the parser behind Thunderbird, runs unchanged
// in Node and the browser, ships TypeScript types, and — the important part —
// its Event.iterator()/getOccurrenceDetails() correctly expands RRULEs while
// honoring EXDATE (deleted single occurrences) and RECURRENCE-ID overrides
// (a single occurrence that was moved/edited/cancelled), and it registers the
// VTIMEZONE blocks Google includes so TZID=America/Chicago times resolve
// across DST. Hand-rolling any of that is a bug farm.

export interface ParseOptions {
  /** "Now" — occurrences that have already ended are dropped. */
  now?: Date;
  /** How far ahead to expand recurring events. */
  horizonDays?: number;
  /** Hard cap on total occurrences returned (safety for runaway RRULEs). */
  maxEvents?: number;
}

const DEFAULTS: Required<ParseOptions> = {
  now: new Date(),
  horizonDays: 180,
  maxEvents: 300,
};

// Google stores descriptions as HTML. Turn it into readable plain text.
export function htmlToText(html: string): string {
  return html
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\/\s*(p|div|li|h[1-6])\s*>/gi, "\n")
    .replace(/<\s*li[^>]*>/gi, "• ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const pad = (n: number) => String(n).padStart(2, "0");

// ICAL.Time -> our string convention (see types.ts).
function timeToString(t: ICAL.Time): string {
  if (t.isDate) return `${t.year}-${pad(t.month)}-${pad(t.day)}`;
  return t.toJSDate().toISOString();
}

// Occurrence still relevant? Timed: hasn't ended yet. All-day: exclusive end
// date is after today's date (in the calendar's own timezone).
function isUpcoming(end: ICAL.Time, now: Date, todayYmd: string): boolean {
  if (end.isDate) return timeToString(end) > todayYmd;
  return end.toJSDate().getTime() > now.getTime();
}

function ymdInZone(d: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function isCancelled(component: ICAL.Component): boolean {
  const status = component.getFirstPropertyValue("status");
  return typeof status === "string" && status.toUpperCase() === "CANCELLED";
}

function toSiteEvent(
  uid: string,
  item: ICAL.Event,
  start: ICAL.Time,
  end: ICAL.Time,
): SiteEvent {
  const title = (item.summary ?? "").trim() || "Event at Elements";
  const description = htmlToText(item.description ?? "");
  return {
    id: `${uid}__${timeToString(start)}`,
    title,
    description,
    start: timeToString(start),
    end: timeToString(end),
    location: (item.location ?? "").trim(),
    category: categorizeEvent(title, description),
    allDay: start.isDate,
  };
}

export function parseIcsToEvents(icsText: string, options: ParseOptions = {}): SiteEvent[] {
  const { now, horizonDays, maxEvents } = { ...DEFAULTS, ...options };

  const jcal = ICAL.parse(icsText);
  const root = new ICAL.Component(jcal);

  // Register VTIMEZONEs so TZID-qualified times convert correctly.
  for (const vtz of root.getAllSubcomponents("vtimezone")) {
    const tz = new ICAL.Timezone(vtz);
    if (!ICAL.TimezoneService.has(tz.tzid)) ICAL.TimezoneService.register(tz);
  }

  const calendarTz =
    (root.getFirstPropertyValue("x-wr-timezone") as string | null) ?? "America/Chicago";
  const todayYmd = ymdInZone(now, calendarTz);
  const horizon = new Date(now.getTime() + horizonDays * 86_400_000);
  const horizonTime = ICAL.Time.fromJSDate(horizon, true);

  // Group VEVENTs by UID: one master + zero or more RECURRENCE-ID exceptions.
  const masters = new Map<string, ICAL.Event>();
  const exceptions = new Map<string, ICAL.Event[]>();
  for (const vevent of root.getAllSubcomponents("vevent")) {
    const ev = new ICAL.Event(vevent);
    const uid = ev.uid ?? "";
    if (ev.isRecurrenceException()) {
      if (!exceptions.has(uid)) exceptions.set(uid, []);
      exceptions.get(uid)!.push(ev);
    } else {
      masters.set(uid, ev);
    }
  }

  const out: SiteEvent[] = [];

  for (const [uid, master] of masters) {
    for (const ex of exceptions.get(uid) ?? []) master.relateException(ex);

    if (!master.isRecurring()) {
      if (isCancelled(master.component)) continue;
      if (!isUpcoming(master.endDate, now, todayYmd)) continue;
      out.push(toSiteEvent(uid, master, master.startDate, master.endDate));
      continue;
    }

    // Recurring: expand occurrences up to the horizon. The iterator already
    // skips EXDATEs; getOccurrenceDetails swaps in any RECURRENCE-ID override.
    const iterator = master.iterator();
    let next: ICAL.Time | null;
    let guard = 0;
    while ((next = iterator.next()) && guard++ < 1000) {
      if (next.compare(horizonTime) > 0) break;
      const occ = master.getOccurrenceDetails(next);
      if (isCancelled(occ.item.component)) continue;
      if (!isUpcoming(occ.endDate, now, todayYmd)) continue;
      out.push(toSiteEvent(uid, occ.item, occ.startDate, occ.endDate));
      if (out.length >= maxEvents) break;
    }
  }

  // Exceptions whose master is missing (Google sometimes exports an edited
  // occurrence without the series) — treat as standalone events.
  for (const [uid, list] of exceptions) {
    if (masters.has(uid)) continue;
    for (const ex of list) {
      if (isCancelled(ex.component)) continue;
      if (!isUpcoming(ex.endDate, now, todayYmd)) continue;
      out.push(toSiteEvent(uid, ex, ex.startDate, ex.endDate));
    }
  }

  out.sort((a, b) => sortKey(a) - sortKey(b));
  return out.slice(0, maxEvents);
}

// Chronological sort key that works for both conventions: all-day dates sort
// at local midnight of that day (approximated as UTC midnight, which is fine
// for ordering against timed events on the same date).
function sortKey(e: SiteEvent): number {
  return new Date(e.allDay ? `${e.start}T00:00:00Z` : e.start).getTime();
}
