import { Music, Mic, Disc3, Laugh, Sparkles, CalendarDays, type LucideIcon } from "lucide-react";
import type { EventCategory } from "@/lib/events/types";

// Shared category → icon map for every event surface (cards, chips, dialog).
export const CATEGORY_ICONS: Record<EventCategory, LucideIcon> = {
  "Live Music": Music,
  Karaoke: Mic,
  DJ: Disc3,
  Comedy: Laugh,
  "Special Event": Sparkles,
  Other: CalendarDays,
};
