import { CalendarDays, Clock, MapPin, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CATEGORY_ICONS } from "@/components/events/categoryIcons";
import { CALENDAR_PUBLIC_URL } from "@/lib/events/calendar";
import { formatEventDate, formatEventTime, isOffsiteLocation } from "@/lib/events/format";
import type { SiteEvent } from "@/lib/events/types";

interface EventDetailDialogProps {
  event: SiteEvent | null;
  onClose: () => void;
}

// Full event detail in an accessible Radix dialog (focus trap, Esc, overlay
// click, aria-labelledby wired by shadcn). Works for desktop and mobile.
const EventDetailDialog = ({ event, onClose }: EventDetailDialogProps) => {
  const Icon = event ? CATEGORY_ICONS[event.category] : CalendarDays;
  return (
    <Dialog open={event !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg bg-card border-border rounded-xl p-6 md:p-8">
        {event && (
          <>
            <DialogHeader className="text-left">
              <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
                <Icon size={14} aria-hidden="true" />
                <span>{event.category}</span>
              </div>
              <DialogTitle className="text-2xl md:text-3xl font-display font-bold leading-tight pr-6">
                {event.title}
              </DialogTitle>
              <DialogDescription className="sr-only">Event details</DialogDescription>
            </DialogHeader>

            <dl className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <dt className="sr-only">Date</dt>
                <CalendarDays size={15} className="text-primary flex-shrink-0" aria-hidden="true" />
                <dd className="text-foreground/90 font-medium">{formatEventDate(event)}</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="sr-only">Time</dt>
                <Clock size={15} className="text-primary flex-shrink-0" aria-hidden="true" />
                <dd className="text-foreground/90">{formatEventTime(event)}</dd>
              </div>
              {isOffsiteLocation(event.location) && (
                <div className="flex items-start gap-2">
                  <dt className="sr-only">Location</dt>
                  <MapPin size={15} className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <dd className="text-foreground/90">{event.location}</dd>
                </div>
              )}
            </dl>

            {event.description && (
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line max-h-64 overflow-y-auto">
                {event.description}
              </p>
            )}

            <a
              href={CALENDAR_PUBLIC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 self-start text-sm text-primary font-semibold hover:underline"
            >
              Open in Google Calendar <ExternalLink size={13} aria-hidden="true" />
            </a>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailDialog;
