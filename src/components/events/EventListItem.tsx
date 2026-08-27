import { CATEGORY_ICONS } from "@/components/events/categoryIcons";
import { formatDateBadge, formatEventTime } from "@/lib/events/format";
import { isRoutineEvent } from "@/lib/events/grouping";
import type { SiteEvent } from "@/lib/events/types";

interface EventListItemProps {
  event: SiteEvent;
  onSelect: (event: SiteEvent) => void;
  /** Hide the date badge when the list is already scoped to one day. */
  showDate?: boolean;
}

// Compact, scannable row for the Upcoming list and day panels. Routine weekly
// nights (karaoke) stay quiet; named performers / comedy / specials get a gold
// edge and a description preview. Whole row is a button → opens the detail dialog.
const EventListItem = ({ event, onSelect, showDate = true }: EventListItemProps) => {
  const Icon = CATEGORY_ICONS[event.category];
  const routine = isRoutineEvent(event);
  const badge = formatDateBadge(event);

  return (
    <button
      type="button"
      onClick={() => onSelect(event)}
      className={`group w-full text-left flex items-center gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        routine ? "border-l-2 border-border" : "bg-card/60 border-l-2 border-primary"
      }`}
    >
      {showDate && (
        <div className="flex-shrink-0 w-12 text-center leading-none">
          <div className="text-[10px] font-semibold tracking-widest text-primary">{badge.weekday}</div>
          <div className={`font-display font-bold ${routine ? "text-xl text-foreground/80" : "text-2xl"}`}>
            {badge.day}
          </div>
          <div className="text-[10px] font-semibold tracking-widest text-muted-foreground">{badge.month}</div>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <h4
          className={`font-display font-bold leading-snug truncate group-hover:text-primary transition-colors ${
            routine ? "text-base text-foreground/90" : "text-lg md:text-xl"
          }`}
        >
          {event.title}
        </h4>
        <div className="mt-0.5 flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
          <span>{formatEventTime(event)}</span>
          <span aria-hidden="true">·</span>
          <Icon size={12} className="text-primary" aria-hidden="true" />
          <span>{event.category}</span>
        </div>
        {!routine && event.description && (
          <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 hidden sm:block">{event.description}</p>
        )}
      </div>
      <span className="flex-shrink-0 text-primary text-lg opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" aria-hidden="true">
        →
      </span>
    </button>
  );
};

export default EventListItem;
