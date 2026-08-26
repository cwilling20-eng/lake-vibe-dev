import { describe, it, expect } from "vitest";
import { categorizeEvent } from "./categorize";
import { htmlToText, parseIcsToEvents } from "./ics";
import { formatEventTime, formatEventDate, isOffsiteLocation } from "./format";

// A trimmed, realistic slice of the client's Google Calendar export: the
// VTIMEZONE Google emits, one weekly recurring event with an EXDATE and a
// RECURRENCE-ID override, a cancelled event, a past event, and an all-day event.
const ICS = `BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Elements By 456 | Events
X-WR-TIMEZONE:America/Chicago
BEGIN:VTIMEZONE
TZID:America/Chicago
BEGIN:DAYLIGHT
TZOFFSETFROM:-0600
TZOFFSETTO:-0500
TZNAME:CDT
DTSTART:19700308T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:-0500
TZOFFSETTO:-0600
TZNAME:CST
DTSTART:19701101T020000
RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
DTSTART;TZID=America/Chicago:20260827T190000
DTEND;TZID=America/Chicago:20260827T220000
RRULE:FREQ=WEEKLY;BYDAY=TH
EXDATE;TZID=America/Chicago:20260910T190000
UID:karaoke@google.com
DESCRIPTION:<p>Thursday nights are for tacos\\, margaritas &amp\\; questionable song choices.</p>
LOCATION:Elements by 456\\, 456 Gun Barrel Ln\\, Gun Barrel City\\, TX 75156
STATUS:CONFIRMED
SUMMARY:Thursday Night Karaoke 🎤
END:VEVENT
BEGIN:VEVENT
DTSTART;TZID=America/Chicago:20260917T200000
DTEND;TZID=America/Chicago:20260917T230000
UID:karaoke@google.com
RECURRENCE-ID;TZID=America/Chicago:20260917T190000
STATUS:CONFIRMED
SUMMARY:Karaoke — LATE START 🎤
END:VEVENT
BEGIN:VEVENT
DTSTART:20260829T000000Z
DTEND:20260829T030000Z
UID:wade@google.com
DESCRIPTION:<p>Kick off the weekend with <strong>Wade Bailey</strong> live.</p><p>Second paragraph.</p>
LOCATION:Elements by 456\\, 456 Gun Barrel Ln\\, Gun Barrel City\\, TX 75156
STATUS:CONFIRMED
SUMMARY:Wade Bailey Live at Elements 🎶
END:VEVENT
BEGIN:VEVENT
DTSTART:20260905T000000Z
DTEND:20260905T030000Z
UID:cancelled@google.com
STATUS:CANCELLED
SUMMARY:Cancelled Show
END:VEVENT
BEGIN:VEVENT
DTSTART:20260801T000000Z
DTEND:20260801T030000Z
UID:past@google.com
STATUS:CONFIRMED
SUMMARY:Already Happened
END:VEVENT
BEGIN:VEVENT
DTSTART;VALUE=DATE:20260907
DTEND;VALUE=DATE:20260908
UID:allday@google.com
STATUS:CONFIRMED
SUMMARY:Labor Day Lake Party
END:VEVENT
END:VCALENDAR
`;

const NOW = new Date("2026-08-26T12:00:00Z");

describe("categorizeEvent", () => {
  it("maps known keywords to categories", () => {
    expect(categorizeEvent("Thursday Night Karaoke 🎤")).toBe("Karaoke");
    expect(categorizeEvent("Comedy Night at Elements 😂🎤")).toBe("Comedy");
    expect(categorizeEvent("DJ Tori Friday")).toBe("DJ");
    expect(categorizeEvent("Wade Bailey Live at Elements 🎶")).toBe("Live Music");
    expect(categorizeEvent("Jeffrey Scott Music")).toBe("Live Music");
    expect(categorizeEvent("Blue Louie", "bringing the full band to the patio")).toBe("Live Music");
    expect(categorizeEvent("Labor Day Lake Party")).toBe("Special Event");
  });

  it("does not hide unknown events — they become Other", () => {
    expect(categorizeEvent("Staff Meeting")).toBe("Other");
  });

  it("prefers the title over a passing mention in the description", () => {
    expect(categorizeEvent("Ryan Turner Live 🎸", "no karaoke tonight")).toBe("Live Music");
  });
});

describe("htmlToText", () => {
  it("strips Google's HTML and decodes entities", () => {
    expect(htmlToText("<p>Tacos &amp; margs</p><p>Line two</p>")).toBe("Tacos & margs\nLine two");
    expect(htmlToText("<ul><li>one</li><li>two</li></ul>")).toBe("• one\n• two");
  });
});

describe("parseIcsToEvents", () => {
  const events = parseIcsToEvents(ICS, { now: NOW, horizonDays: 30 });
  const titles = events.map((e) => e.title);

  it("drops past and cancelled events", () => {
    expect(titles).not.toContain("Already Happened");
    expect(titles).not.toContain("Cancelled Show");
  });

  it("expands weekly recurrence within the horizon and honors EXDATE", () => {
    const karaoke = events.filter((e) => e.id.startsWith("karaoke@google.com"));
    const dates = karaoke.map((e) => e.start.slice(0, 10));
    // Thursdays 7pm CDT == 00:00Z next day: Aug 27, Sep 3, (Sep 10 EXDATE'd), Sep 17 override, Sep 24
    expect(dates).toContain("2026-08-28");
    expect(dates).toContain("2026-09-04");
    expect(dates).not.toContain("2026-09-11");
    expect(dates).toContain("2026-09-25");
  });

  it("applies a RECURRENCE-ID override to a single occurrence", () => {
    const late = events.find((e) => e.title.includes("LATE START"));
    expect(late).toBeDefined();
    expect(late!.start).toBe("2026-09-18T01:00:00.000Z"); // 8pm CDT
    // and the original 7pm slot for that day is gone
    expect(events.filter((e) => e.start.startsWith("2026-09-18")).length).toBe(1);
  });

  it("converts TZID times across DST correctly", () => {
    const first = events.find((e) => e.id === "karaoke@google.com__2026-08-28T00:00:00.000Z");
    expect(first).toBeDefined();
    expect(formatEventTime(first!)).toBe("7pm – 10pm");
  });

  it("normalizes descriptions to plain text and categorizes", () => {
    const wade = events.find((e) => e.title.startsWith("Wade"));
    expect(wade!.description).toBe("Kick off the weekend with Wade Bailey live.\nSecond paragraph.");
    expect(wade!.category).toBe("Live Music");
    expect(wade!.allDay).toBe(false);
  });

  it("represents all-day events as date-only strings", () => {
    const party = events.find((e) => e.title === "Labor Day Lake Party")!;
    expect(party.allDay).toBe(true);
    expect(party.start).toBe("2026-09-07");
    expect(party.end).toBe("2026-09-08");
    expect(formatEventTime(party)).toBe("All day");
    expect(formatEventDate(party)).toBe("Mon, Sep 7");
  });

  it("sorts chronologically", () => {
    const keys = events.map((e) => new Date(e.allDay ? `${e.start}T00:00:00Z` : e.start).getTime());
    expect([...keys].sort((a, b) => a - b)).toEqual(keys);
  });
});

describe("isOffsiteLocation", () => {
  it("hides the venue's own address but shows other places", () => {
    expect(isOffsiteLocation("Elements by 456, 456 Gun Barrel Ln, Gun Barrel City, TX")).toBe(false);
    expect(isOffsiteLocation("")).toBe(false);
    expect(isOffsiteLocation("Cedar Creek Lake Marina")).toBe(true);
  });
});
