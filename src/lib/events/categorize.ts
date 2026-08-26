import type { EventCategory } from "./types";

// Centralized keyword categorization. The client's Google Calendar has no
// category field, so we infer one from title + description. Order matters:
// the first matching rule wins, so more specific event types come first.
//
// An event that matches nothing is "Other" — it is still shown on /events.
// Only Live Music / Karaoke / DJ pages filter by category.
const RULES: { category: EventCategory; patterns: RegExp[] }[] = [
  { category: "Karaoke", patterns: [/\bkaraoke\b/i] },
  { category: "Comedy", patterns: [/\bcomed(y|ian|ians)\b/i, /\bstand[- ]?up\b/i, /😂/] },
  { category: "DJ", patterns: [/\bdj\b/i, /\bdance party\b/i] },
  {
    category: "Live Music",
    patterns: [
      /\blive music\b/i,
      /\bband\b/i,
      /\bacoustic\b/i,
      /\bmusician(s)?\b/i,
      /\bconcert\b/i,
      /\bsinger[- ]songwriter\b/i,
      /\bmusic\b/i,
      /\blive at elements\b/i,
      /\blive on the patio\b/i,
      /🎸|🎶|🎵/,
    ],
  },
  {
    category: "Special Event",
    patterns: [
      /\bbrunch\b/i,
      /\bdinner\b/i,
      /\btasting\b/i,
      /\bparty\b/i,
      /\bcelebration\b/i,
      /\bwatch party\b/i,
      /\bholiday\b/i,
      /\bspecial\b/i,
      /\bfundraiser\b/i,
      /\btrivia\b/i,
      /\bbingo\b/i,
    ],
  },
];

export function categorizeEvent(title: string, description = ""): EventCategory {
  // Title is the strongest signal; only fall back to the description if the
  // title alone doesn't match, so a music event that *mentions* karaoke in its
  // blurb isn't misfiled.
  for (const text of [title, `${title} ${description}`]) {
    for (const rule of RULES) {
      if (rule.patterns.some((p) => p.test(text))) return rule.category;
    }
  }
  return "Other";
}
