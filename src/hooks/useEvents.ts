import { useQuery } from "@tanstack/react-query";
import type { EventCategory, EventsResponse, SiteEvent } from "@/lib/events/types";

// Upcoming events from the client's Google Calendar, via /api/events.
// Mirrors useMenu(): react-query, ~5 min freshness, no hard retry loops.
// There is deliberately NO seed/fallback data — the site never shows an
// invented event. Callers render an evergreen message when `events` is empty.

async function fetchEvents(): Promise<EventsResponse> {
  const res = await fetch("/api/events", { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Events API returned HTTP ${res.status}`);
  return res.json();
}

export interface UseEventsOptions {
  /** Only return events in one of these categories. */
  categories?: EventCategory[];
  /** Cap the list (e.g. 3 for the homepage). */
  limit?: number;
}

export function useEvents(options: UseEventsOptions = {}) {
  const query = useQuery<EventsResponse>({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  let events: SiteEvent[] = query.data?.events ?? [];
  if (options.categories?.length) {
    const wanted = new Set(options.categories);
    events = events.filter((e) => wanted.has(e.category));
  }
  if (options.limit != null) events = events.slice(0, options.limit);

  return {
    events,
    isLoading: query.isLoading,
    isError: query.isError,
    updatedAt: query.data?.updatedAt,
  };
}
