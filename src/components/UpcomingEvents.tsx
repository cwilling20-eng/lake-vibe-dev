import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import EventCard from "@/components/EventCard";
import { useEvents, type UseEventsOptions } from "@/hooks/useEvents";
import { CALENDAR_PUBLIC_URL } from "@/lib/events/calendar";

interface UpcomingEventsProps extends UseEventsOptions {
  variant?: "full" | "compact";
  /** Shown when the calendar has no matching upcoming events. */
  emptyTitle?: string;
  emptyBody?: string;
  /** Show a "See all events" link under the empty/error states. Default true. */
  linkToEvents?: boolean;
  /** Grid columns on md+ screens. */
  columns?: 1 | 2 | 3;
}

const SkeletonCard = () => (
  <div className="flex gap-5 bg-card rounded-xl p-6 border border-border animate-pulse" aria-hidden="true">
    <div className="w-16 h-20 rounded-lg bg-secondary flex-shrink-0" />
    <div className="flex-1 space-y-3">
      <div className="h-3 w-24 bg-secondary rounded" />
      <div className="h-5 w-3/4 bg-secondary rounded" />
      <div className="h-3 w-1/2 bg-secondary rounded" />
    </div>
  </div>
);

// Calendar-driven event list. Handles loading, empty, and feed-error states so
// every page shows real data or an honest evergreen message — never a
// placeholder event.
const UpcomingEvents = ({
  categories,
  limit,
  variant = "full",
  emptyTitle = "No upcoming events posted yet.",
  emptyBody = "Check back soon — new dates are added regularly.",
  linkToEvents = true,
  columns = 2,
}: UpcomingEventsProps) => {
  const { events, isLoading, isError } = useEvents({ categories, limit });
  const gridCols = columns === 3 ? "md:grid-cols-2 lg:grid-cols-3" : columns === 2 ? "md:grid-cols-2" : "";

  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 ${gridCols} gap-6`} aria-busy="true" aria-live="polite">
        {Array.from({ length: limit ?? 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <FadeIn>
        <div className="text-center bg-card rounded-xl p-8 border border-border">
          <CalendarDays size={28} className="mx-auto text-primary mb-3" aria-hidden="true" />
          <h3 className="text-xl font-display font-bold">Our event calendar is taking a breather.</h3>
          <p className="mt-2 text-muted-foreground">
            Please try again in a few minutes, or view the live calendar directly.
          </p>
          <a
            href={CALENDAR_PUBLIC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block px-6 py-3 text-sm font-bold uppercase tracking-wider border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Open Google Calendar
          </a>
        </div>
      </FadeIn>
    );
  }

  if (events.length === 0) {
    return (
      <FadeIn>
        <div className="text-center bg-card rounded-xl p-8 border border-border">
          <CalendarDays size={28} className="mx-auto text-primary mb-3" aria-hidden="true" />
          <h3 className="text-xl font-display font-bold">{emptyTitle}</h3>
          <p className="mt-2 text-muted-foreground">{emptyBody}</p>
          {linkToEvents && (
            <Link to="/events" className="mt-4 inline-block text-primary font-semibold hover:underline">
              See all upcoming events →
            </Link>
          )}
        </div>
      </FadeIn>
    );
  }

  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
      {events.map((event, i) => (
        <FadeIn key={event.id} delay={(i % 4) * 0.08}>
          <EventCard event={event} variant={variant} />
        </FadeIn>
      ))}
    </div>
  );
};

export default UpcomingEvents;
