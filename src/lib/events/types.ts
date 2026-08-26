// The site's internal event model. This is the ONLY shape the React app ever
// sees — Google Calendar specifics (UIDs, RRULEs, VTIMEZONE, HTML) are dealt
// with server-side in ics.ts and never leak to the frontend.

export type EventCategory =
  | "Live Music"
  | "Karaoke"
  | "DJ"
  | "Comedy"
  | "Special Event"
  | "Other";

export interface SiteEvent {
  /** Stable per-occurrence id: `${uid}__${startISO}`. */
  id: string;
  title: string;
  /** Plain text (HTML from Google stripped, paragraphs -> newlines). Empty string if none. */
  description: string;
  /**
   * Timed events: full ISO-8601 instant (UTC, e.g. "2026-08-29T00:00:00.000Z").
   * All-day events: calendar date only, "YYYY-MM-DD" (Google all-day events
   * have no instant; the frontend renders the date without a time).
   */
  start: string;
  /** Same convention as `start`. For all-day events this is the EXCLUSIVE end date. */
  end: string;
  location: string;
  category: EventCategory;
  allDay: boolean;
}

export interface EventsResponse {
  events: SiteEvent[];
  /** ISO timestamp of when the feed was last fetched from Google. */
  updatedAt: string;
  source: "google-calendar";
}
