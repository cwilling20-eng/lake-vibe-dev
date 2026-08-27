import { Clock, MapPin } from "lucide-react";
import { CATEGORY_ICONS } from "@/components/events/categoryIcons";
import type { SiteEvent } from "@/lib/events/types";
import { formatDateBadge, formatEventTime, isOffsiteLocation } from "@/lib/events/format";

interface EventCardProps {
  event: SiteEvent;
  /** "full" shows the description; "compact" is the homepage teaser. */
  variant?: "full" | "compact";
}

// One event from the client's Google Calendar, in the Elements card style
// (bg-card, border, gold accents) used by Signature Dishes / Specials.
const EventCard = ({ event, variant = "full" }: EventCardProps) => {
  const Icon = CATEGORY_ICONS[event.category];
  const badge = formatDateBadge(event);
  const showLocation = isOffsiteLocation(event.location);

  return (
    <article className="flex gap-5 bg-card rounded-xl p-5 md:p-6 border border-border hover:border-primary/30 transition-colors h-full">
      {/* Date badge */}
      <div className="flex-shrink-0 w-16 text-center rounded-lg gold-gradient text-primary-foreground py-2 self-start">
        <div className="text-[11px] font-semibold tracking-widest">{badge.weekday}</div>
        <div className="text-2xl font-display font-bold leading-none my-0.5">{badge.day}</div>
        <div className="text-[11px] font-semibold tracking-widest">{badge.month}</div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider mb-1">
          <Icon size={14} aria-hidden="true" />
          <span>{event.category}</span>
        </div>
        <h3 className="text-lg md:text-xl font-display font-bold leading-snug break-words">{event.title}</h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} className="text-primary" aria-hidden="true" />
            {formatEventTime(event)}
          </span>
          {showLocation && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-primary" aria-hidden="true" />
              {event.location}
            </span>
          )}
        </div>
        {variant === "full" && event.description && (
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {event.description}
          </p>
        )}
      </div>
    </article>
  );
};

export default EventCard;
