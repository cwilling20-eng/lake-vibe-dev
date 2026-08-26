import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchCalendarEvents } from "../src/lib/events/calendar.js";
import type { EventsResponse, SiteEvent } from "../src/lib/events/types.js";

// GET /api/events
//
// Google Calendar (public ICS) -> normalized SiteEvent JSON for the React app.
// Runs as a Vercel serverless function. No credentials involved: the calendar
// is public, and the frontend never talks to Google directly.
//
// Caching, two layers:
//  1. Vercel's edge cache via Cache-Control: fresh for 5 min, then served stale
//     for up to an hour while a background revalidation refetches Google.
//  2. A per-instance in-memory copy so a warm function doesn't refetch within
//     the same window, and so a Google hiccup serves the last-good data instead
//     of an empty page.

const FRESH_SECONDS = 300; // 5 min — matches the menu's Sheet cache window
const STALE_SECONDS = 3600;

let cache: { at: number; events: SiteEvent[]; updatedAt: string } | null = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const now = Date.now();
  const cacheIsFresh = cache && now - cache.at < FRESH_SECONDS * 1000;

  if (!cacheIsFresh) {
    try {
      const events = await fetchCalendarEvents(new Date(now));
      cache = { at: now, events, updatedAt: new Date(now).toISOString() };
    } catch (err) {
      if (!cache) {
        res.setHeader("Cache-Control", "no-store");
        return res.status(502).json({
          error: "Calendar feed unavailable",
          detail: err instanceof Error ? err.message : String(err),
        });
      }
      // Stale-but-real beats nothing. Fall through and serve the last-good copy.
    }
  }

  const body: EventsResponse = {
    events: cache!.events,
    updatedAt: cache!.updatedAt,
    source: "google-calendar",
  };

  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${FRESH_SECONDS}, stale-while-revalidate=${STALE_SECONDS}`,
  );
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  return res.status(200).json(body);
}
