import { ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORY_ICONS } from "@/components/events/categoryIcons";
import EventListItem from "@/components/events/EventListItem";
import { formatEventTime } from "@/lib/events/format";
import {
  addMonths,
  buildMonthGrid,
  compareYearMonth,
  groupByDay,
  monthLabel,
  parseYmd,
  type YearMonth,
} from "@/lib/events/grouping";
import type { SiteEvent } from "@/lib/events/types";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MAX_CHIPS = 2; // desktop chips per cell before "+N more"
const MAX_DOTS = 3; // mobile dots per cell

interface EventsCalendarProps {
  events: SiteEvent[]; // already category-filtered
  month: YearMonth;
  minMonth: YearMonth;
  maxMonth: YearMonth;
  today: string; // YYYY-MM-DD
  selectedDay: string | null;
  onMonthChange: (m: YearMonth) => void;
  onSelectDay: (day: string | null) => void;
  onSelectEvent: (e: SiteEvent) => void;
  emptyMessage: string;
}

const longDate = (ymd: string) => {
  const { y, m, d } = parseYmd(ymd);
  return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(
    new Date(y, m - 1, d, 12),
  );
};

// Month grid. Desktop cells show up to two compact chips (title · time) plus a
// "+N more" control; on narrow screens the same cells show dots only, and the
// selected day's events render in a panel under the grid (both breakpoints).
const EventsCalendar = ({
  events,
  month,
  minMonth,
  maxMonth,
  today,
  selectedDay,
  onMonthChange,
  onSelectDay,
  onSelectEvent,
  emptyMessage,
}: EventsCalendarProps) => {
  const grid = buildMonthGrid(month);
  const byDay = groupByDay(events);
  const canPrev = compareYearMonth(month, minMonth) > 0;
  const canNext = compareYearMonth(month, maxMonth) < 0;
  const monthHasEvents = grid.some((c) => c.inMonth && byDay.has(c.key));
  const selectedEvents = selectedDay ? byDay.get(selectedDay) ?? [] : [];

  const navBtn =
    "inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border text-foreground/80 hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  return (
    <div>
      {/* Month header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          className={navBtn}
          onClick={() => onMonthChange(addMonths(month, -1))}
          disabled={!canPrev}
          aria-label={`Previous month, ${monthLabel(addMonths(month, -1).y, addMonths(month, -1).m)}`}
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <h3 className="text-xl md:text-2xl font-display font-bold uppercase tracking-wide" aria-live="polite">
          {monthLabel(month.y, month.m)}
        </h3>
        <button
          type="button"
          className={navBtn}
          onClick={() => onMonthChange(addMonths(month, 1))}
          disabled={!canNext}
          aria-label={`Next month, ${monthLabel(addMonths(month, 1).y, addMonths(month, 1).m)}`}
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      {/* Grid */}
      <div role="grid" aria-label={`${monthLabel(month.y, month.m)} events calendar`} className="rounded-xl overflow-hidden border border-border bg-card/40">
        <div role="row" className="grid grid-cols-7 border-b border-border">
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              role="columnheader"
              className="py-2 text-center text-[11px] md:text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {grid.map((cell, i) => {
            const dayEvents = byDay.get(cell.key) ?? [];
            const isToday = cell.key === today;
            const isSelected = cell.key === selectedDay;
            const isPast = cell.key < today;
            const hasEvents = dayEvents.length > 0;
            const extra = dayEvents.length - MAX_CHIPS;
            const rowStart = i % 7 === 0;
            const dateAria = `${longDate(cell.key)}${hasEvents ? `, ${dayEvents.length} event${dayEvents.length > 1 ? "s" : ""}` : ", no events"}`;

            return (
              <div
                key={cell.key}
                role="gridcell"
                className={`relative min-h-[3.25rem] md:min-h-[7rem] p-1 md:p-1.5 border-border border-b ${rowStart ? "" : "border-l"} ${
                  !cell.inMonth ? "bg-background/60" : ""
                } ${isSelected ? "bg-primary/10" : ""}`}
              >
                {/* Date number — the tappable target for the whole cell on mobile */}
                <button
                  type="button"
                  onClick={() => onSelectDay(isSelected ? null : cell.key)}
                  disabled={!hasEvents}
                  aria-label={dateAria}
                  aria-pressed={isSelected}
                  className={`flex flex-col items-center md:items-start w-full md:w-auto rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    hasEvents ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 md:w-6 md:h-6 rounded-full text-sm md:text-xs font-semibold ${
                      isToday
                        ? "gold-gradient text-primary-foreground"
                        : !cell.inMonth || isPast
                          ? "text-muted-foreground/50"
                          : "text-foreground/90"
                    }`}
                  >
                    {cell.day}
                  </span>
                  {/* Mobile: dots */}
                  {hasEvents && (
                    <span className="md:hidden mt-1 flex items-center gap-0.5" aria-hidden="true">
                      {dayEvents.slice(0, MAX_DOTS).map((e) => (
                        <span key={e.id} className="w-1.5 h-1.5 rounded-full bg-primary" />
                      ))}
                      {dayEvents.length > MAX_DOTS && (
                        <span className="text-[9px] text-primary font-semibold leading-none">+</span>
                      )}
                    </span>
                  )}
                </button>

                {/* Desktop: chips */}
                {hasEvents && (
                  <ul className="hidden md:flex flex-col gap-1 mt-1">
                    {dayEvents.slice(0, MAX_CHIPS).map((e) => {
                      const Icon = CATEGORY_ICONS[e.category];
                      return (
                        <li key={e.id}>
                          <button
                            type="button"
                            onClick={() => onSelectEvent(e)}
                            title={`${e.title} · ${formatEventTime(e)}`}
                            className="w-full text-left rounded-md px-1.5 py-1 bg-card border border-border hover:border-primary/60 hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            <span className="flex items-center gap-1 text-[11px] font-medium leading-tight">
                              <Icon size={11} className="text-primary flex-shrink-0" aria-hidden="true" />
                              <span className="truncate">{e.title}</span>
                            </span>
                            <span className="block text-[10px] text-muted-foreground leading-tight pl-4">
                              {formatEventTime(e).split(" – ")[0]}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                    {extra > 0 && (
                      <li>
                        <button
                          type="button"
                          onClick={() => onSelectDay(cell.key)}
                          className="text-[11px] font-semibold text-primary hover:underline px-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                          aria-label={`Show all ${dayEvents.length} events on ${longDate(cell.key)}`}
                        >
                          +{extra} more
                        </button>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty month */}
      {!monthHasEvents && (
        <p className="mt-6 text-center text-muted-foreground" role="status">
          {emptyMessage}
        </p>
      )}

      {/* Selected day panel */}
      {selectedDay && (
        <div className="mt-6 rounded-xl border border-border bg-card/40 p-4 md:p-5" role="region" aria-label={`Events on ${longDate(selectedDay)}`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-display font-bold text-lg">{longDate(selectedDay)}</h4>
            <button
              type="button"
              onClick={() => onSelectDay(null)}
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1"
            >
              Close
            </button>
          </div>
          {selectedEvents.length > 0 ? (
            <div className="flex flex-col gap-1">
              {selectedEvents.map((e) => (
                <EventListItem key={e.id} event={e} onSelect={onSelectEvent} showDate={false} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No events on this day.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EventsCalendar;
