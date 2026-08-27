import { useMemo, useState } from "react";
import { CalendarDays, List } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import EventsCalendar from "@/components/events/EventsCalendar";
import EventListItem from "@/components/events/EventListItem";
import EventDetailDialog from "@/components/events/EventDetailDialog";
import { useEvents } from "@/hooks/useEvents";
import { CALENDAR_PUBLIC_URL } from "@/lib/events/calendar";
import {
  FILTERS,
  addMonths,
  compareYearMonth,
  eventDayKey,
  filterByCategory,
  groupUpcoming,
  parseYmd,
  ymdInZone,
  type EventFilter,
  type YearMonth,
} from "@/lib/events/grouping";
import type { SiteEvent } from "@/lib/events/types";

type View = "calendar" | "upcoming";

const PAGE_SIZE = 10; // Upcoming: initial count and Load More step
const MAX_MONTHS_AHEAD = 6;

// Mobile defaults to the list (a month grid is cramped at 390px); desktop to
// the calendar. Read once at mount — no persistence, per spec.
const initialView = (): View =>
  typeof window !== "undefined" && window.matchMedia?.("(max-width: 767px)").matches ? "upcoming" : "calendar";

const segBtn = (active: boolean) =>
  `inline-flex items-center gap-2 px-4 md:px-5 py-2.5 text-xs md:text-sm font-semibold uppercase tracking-wider rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
    active ? "gold-gradient text-primary-foreground shadow" : "text-foreground/70 hover:text-primary"
  }`;

const chip = (active: boolean) =>
  `px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
    active
      ? "border-primary bg-primary/15 text-primary"
      : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
  }`;

// The /events experience: view toggle + category filters over ONE loaded
// dataset (useEvents), rendered as either a month calendar or a sectioned,
// paginated Upcoming list. All month/filter changes are client-side.
const EventsExplorer = () => {
  const { events: allEvents, isLoading, isError } = useEvents();

  const today = useMemo(() => ymdInZone(new Date()), []);
  const thisMonth = useMemo<YearMonth>(() => {
    const { y, m } = parseYmd(today);
    return { y, m };
  }, [today]);

  const [view, setView] = useState<View>(initialView);
  const [filter, setFilter] = useState<EventFilter>("All");
  const [month, setMonth] = useState<YearMonth>(thisMonth);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [detail, setDetail] = useState<SiteEvent | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => filterByCategory(allEvents, filter), [allEvents, filter]);

  // Month navigation bounds: this month → the later of (+6 months, last event's month).
  const maxMonth = useMemo<YearMonth>(() => {
    const cap = addMonths(thisMonth, MAX_MONTHS_AHEAD);
    const last = allEvents[allEvents.length - 1];
    if (!last) return cap;
    const { y, m } = parseYmd(eventDayKey(last));
    return compareYearMonth({ y, m }, cap) > 0 ? { y, m } : cap;
  }, [allEvents, thisMonth]);

  const sections = useMemo(() => groupUpcoming(filtered, today), [filtered, today]);

  const changeFilter = (f: EventFilter) => {
    setFilter(f);
    setSelectedDay(null);
    setVisible(PAGE_SIZE);
  };

  const changeMonth = (m: YearMonth) => {
    setMonth(m);
    setSelectedDay(null);
  };

  // --- Upcoming list pagination (across sections) ---
  let remaining = visible;
  const shownSections = sections
    .map((s) => {
      const take = Math.max(0, Math.min(s.events.length, remaining));
      remaining -= take;
      return { label: s.label, events: s.events.slice(0, take) };
    })
    .filter((s) => s.events.length > 0);
  const hasMore = filtered.length > visible;

  const filterLabel = filter === "All" ? "" : ` in ${filter}`;

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div
          role="tablist"
          aria-label="Events view"
          className="inline-flex self-center md:self-auto p-1 rounded-xl bg-card border border-border"
        >
          <button
            type="button"
            role="tab"
            aria-selected={view === "calendar"}
            className={segBtn(view === "calendar")}
            onClick={() => setView("calendar")}
          >
            <CalendarDays size={15} aria-hidden="true" /> Calendar
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === "upcoming"}
            className={segBtn(view === "upcoming")}
            onClick={() => setView("upcoming")}
          >
            <List size={15} aria-hidden="true" /> Upcoming
          </button>
        </div>

        <div role="group" aria-label="Filter events by category" className="flex flex-wrap justify-center md:justify-end gap-2">
          {FILTERS.map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} className={chip(filter === f)} onClick={() => changeFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* States */}
      {isLoading && (
        <div className="rounded-xl border border-border bg-card/40 min-h-[24rem] animate-pulse" aria-busy="true" aria-live="polite" />
      )}

      {isError && !isLoading && (
        <FadeIn>
          <div className="text-center bg-card rounded-xl p-8 border border-border">
            <CalendarDays size={28} className="mx-auto text-primary mb-3" aria-hidden="true" />
            <h3 className="text-xl font-display font-bold">Our event calendar is taking a breather.</h3>
            <p className="mt-2 text-muted-foreground">Please try again in a few minutes, or view the live calendar directly.</p>
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
      )}

      {/* Calendar view */}
      {!isLoading && !isError && view === "calendar" && (
        <div role="tabpanel" aria-label="Calendar view">
          <EventsCalendar
            events={filtered}
            month={month}
            minMonth={thisMonth}
            maxMonth={maxMonth}
            today={today}
            selectedDay={selectedDay}
            onMonthChange={changeMonth}
            onSelectDay={setSelectedDay}
            onSelectEvent={setDetail}
            emptyMessage={filter === "All" ? "No events posted for this month yet." : "No events in this category for this month."}
          />
        </div>
      )}

      {/* Upcoming view */}
      {!isLoading && !isError && view === "upcoming" && (
        <div role="tabpanel" aria-label="Upcoming events list">
          {shownSections.length === 0 ? (
            <p className="text-center text-muted-foreground py-10" role="status">
              {filter === "All" ? "No upcoming events posted yet — check back soon." : `No upcoming events${filterLabel} right now.`}
            </p>
          ) : (
            <div className="flex flex-col gap-8">
              {shownSections.map((s) => (
                <section key={s.label} aria-labelledby={`sec-${s.label.replace(/\s+/g, "-")}`}>
                  <h3
                    id={`sec-${s.label.replace(/\s+/g, "-")}`}
                    className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3"
                  >
                    {s.label}
                    <span className="flex-1 h-px bg-border" aria-hidden="true" />
                  </h3>
                  <div className="flex flex-col gap-1">
                    {s.events.map((e) => (
                      <EventListItem key={e.id} event={e} onSelect={setDetail} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
          {hasMore && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="px-8 py-3.5 text-sm font-bold uppercase tracking-widest border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Load More Events
              </button>
              <p className="mt-2 text-xs text-muted-foreground">
                Showing {Math.min(visible, filtered.length)} of {filtered.length}
              </p>
            </div>
          )}
        </div>
      )}

      <EventDetailDialog event={detail} onClose={() => setDetail(null)} />
    </div>
  );
};

export default EventsExplorer;
