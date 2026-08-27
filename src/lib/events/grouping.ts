import { CALENDAR_TIMEZONE } from "./calendar.js";
import type { EventCategory, SiteEvent } from "./types.js";

// Presentation-only helpers for the /events page: calendar-day keys, month
// grids, chronological section grouping, and category filtering. Pure
// functions over the already-normalized SiteEvent model — no fetching here.
// All "what day is this" math happens in the venue's timezone.

// ---------------------------------------------------------------------------
// Day keys ("YYYY-MM-DD" in America/Chicago)
// ---------------------------------------------------------------------------

export function ymdInZone(d: Date, timeZone: string = CALENDAR_TIMEZONE): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/** The calendar day an event belongs on. */
export function eventDayKey(e: SiteEvent): string {
  return e.allDay ? e.start : ymdInZone(new Date(e.start));
}

export function parseYmd(ymd: string): { y: number; m: number; d: number } {
  const [y, m, d] = ymd.split("-").map(Number);
  return { y, m, d };
}

const pad = (n: number) => String(n).padStart(2, "0");
export const toYmd = (y: number, m: number, d: number) => `${y}-${pad(m)}-${pad(d)}`;

/** Add N days to a day key (calendar arithmetic, timezone-free). */
export function addDays(ymd: string, n: number): string {
  const { y, m, d } = parseYmd(ymd);
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return toYmd(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
}

/** 0 = Sunday … 6 = Saturday */
export function dayOfWeek(ymd: string): number {
  const { y, m, d } = parseYmd(ymd);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export const daysInMonth = (y: number, m: number): number => new Date(Date.UTC(y, m, 0)).getUTCDate();

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const monthLabel = (y: number, m: number) => `${MONTH_NAMES[m - 1]} ${y}`;

export interface YearMonth {
  y: number;
  m: number; // 1-12
}

export function addMonths({ y, m }: YearMonth, n: number): YearMonth {
  const idx = y * 12 + (m - 1) + n;
  return { y: Math.floor(idx / 12), m: (idx % 12) + 1 };
}

export const compareYearMonth = (a: YearMonth, b: YearMonth) => a.y * 12 + a.m - (b.y * 12 + b.m);

// ---------------------------------------------------------------------------
// Month grid
// ---------------------------------------------------------------------------

export interface GridCell {
  key: string; // YYYY-MM-DD
  day: number; // 1-31
  inMonth: boolean;
}

/** 7-column grid (Sunday first), padded with the neighbouring months' days. */
export function buildMonthGrid({ y, m }: YearMonth): GridCell[] {
  const first = toYmd(y, m, 1);
  const lead = dayOfWeek(first);
  const total = daysInMonth(y, m);
  const rows = Math.ceil((lead + total) / 7);
  const cells: GridCell[] = [];
  let cursor = addDays(first, -lead);
  for (let i = 0; i < rows * 7; i++) {
    const { m: cm, d } = parseYmd(cursor);
    cells.push({ key: cursor, day: d, inMonth: cm === m });
    cursor = addDays(cursor, 1);
  }
  return cells;
}

// ---------------------------------------------------------------------------
// Grouping & filtering
// ---------------------------------------------------------------------------

export function groupByDay(events: SiteEvent[]): Map<string, SiteEvent[]> {
  const map = new Map<string, SiteEvent[]>();
  for (const e of events) {
    const k = eventDayKey(e);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(e);
  }
  return map;
}

export function eventsInMonth(events: SiteEvent[], ym: YearMonth): SiteEvent[] {
  const prefix = `${ym.y}-${pad(ym.m)}-`;
  return events.filter((e) => eventDayKey(e).startsWith(prefix));
}

export const FILTERS = ["All", "Live Music", "Karaoke", "Comedy", "DJ"] as const;
export type EventFilter = (typeof FILTERS)[number];

export function filterByCategory(events: SiteEvent[], filter: EventFilter): SiteEvent[] {
  if (filter === "All") return events;
  return events.filter((e) => e.category === (filter as EventCategory));
}

export interface UpcomingSection {
  label: string;
  events: SiteEvent[];
}

/**
 * Chronological sections for the Upcoming list:
 *   This Week (today → Saturday) · Next Week (Sun → Sat) · Later This Month ·
 *   then one section per calendar month ("October 2026").
 * Empty sections are omitted. Input is assumed sorted (the API sorts).
 */
export function groupUpcoming(events: SiteEvent[], today: string): UpcomingSection[] {
  const endOfThisWeek = addDays(today, 6 - dayOfWeek(today));
  const endOfNextWeek = addDays(endOfThisWeek, 7);
  const { y: ty, m: tm } = parseYmd(today);

  const sections = new Map<string, UpcomingSection>();
  const push = (label: string, e: SiteEvent) => {
    if (!sections.has(label)) sections.set(label, { label, events: [] });
    sections.get(label)!.events.push(e);
  };

  for (const e of events) {
    const k = eventDayKey(e);
    const { y, m } = parseYmd(k);
    if (k <= endOfThisWeek) push("This Week", e);
    else if (k <= endOfNextWeek) push("Next Week", e);
    else if (y === ty && m === tm) push("Later This Month", e);
    else push(monthLabel(y, m), e);
  }
  return Array.from(sections.values());
}

/**
 * Visual-weight heuristic for the Upcoming list. Weekly routine nights
 * (karaoke, uncategorized) render compact; named performers, comedy, DJs and
 * specials get a touch more emphasis. Not a data flag — purely presentational.
 */
export function isRoutineEvent(e: SiteEvent): boolean {
  return e.category === "Karaoke" || e.category === "Other";
}
