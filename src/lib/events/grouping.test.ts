import { describe, it, expect } from "vitest";
import {
  addDays,
  addMonths,
  buildMonthGrid,
  dayOfWeek,
  eventDayKey,
  eventsInMonth,
  filterByCategory,
  groupByDay,
  groupUpcoming,
  isRoutineEvent,
  monthLabel,
} from "./grouping.js";
import type { SiteEvent } from "./types.js";

const ev = (id: string, start: string, category: SiteEvent["category"], allDay = false): SiteEvent => ({
  id,
  title: id,
  description: "",
  start,
  end: start,
  location: "",
  category,
  allDay,
});

// Thu Aug 27 2026 7pm CDT is 2026-08-28T00:00Z — the classic "crosses UTC midnight" case.
const karaoke1 = ev("karaoke-1", "2026-08-28T00:00:00.000Z", "Karaoke");
const wade = ev("wade", "2026-08-29T00:00:00.000Z", "Live Music"); // Fri Aug 28 7pm CDT
const sept5 = ev("sept-5", "2026-09-06T00:00:00.000Z", "Live Music"); // Sat Sep 5
const laborDay = ev("labor", "2026-09-07", "Special Event", true);
const comedy = ev("comedy", "2026-09-26T23:30:00.000Z", "Comedy"); // Sat Sep 26 6:30pm
const octShow = ev("oct", "2026-10-10T00:00:00.000Z", "Live Music"); // Fri Oct 9
const aug31 = ev("aug31", "2026-09-01T00:00:00.000Z", "Other"); // Mon Aug 31 7pm CDT

const ALL = [karaoke1, wade, aug31, sept5, laborDay, comedy, octShow];

describe("day math", () => {
  it("keys events by their Chicago calendar day, not UTC", () => {
    expect(eventDayKey(karaoke1)).toBe("2026-08-27");
    expect(eventDayKey(wade)).toBe("2026-08-28");
    expect(eventDayKey(laborDay)).toBe("2026-09-07");
  });
  it("adds days across month boundaries", () => {
    expect(addDays("2026-08-30", 3)).toBe("2026-09-02");
    expect(addDays("2026-09-01", -1)).toBe("2026-08-31");
  });
  it("knows weekdays", () => {
    expect(dayOfWeek("2026-08-27")).toBe(4); // Thursday
    expect(dayOfWeek("2026-08-30")).toBe(0); // Sunday
  });
  it("adds months with year rollover", () => {
    expect(addMonths({ y: 2026, m: 12 }, 1)).toEqual({ y: 2027, m: 1 });
    expect(addMonths({ y: 2026, m: 1 }, -1)).toEqual({ y: 2025, m: 12 });
    expect(monthLabel(2026, 9)).toBe("September 2026");
  });
});

describe("buildMonthGrid", () => {
  it("builds a Sunday-first grid padded to whole weeks", () => {
    const grid = buildMonthGrid({ y: 2026, m: 8 }); // Aug 1 2026 is a Saturday
    expect(grid.length % 7).toBe(0);
    expect(grid[0]).toEqual({ key: "2026-07-26", day: 26, inMonth: false });
    expect(grid[6]).toEqual({ key: "2026-08-01", day: 1, inMonth: true });
    expect(grid.filter((c) => c.inMonth).length).toBe(31);
    expect(grid[grid.length - 1].inMonth).toBe(false);
  });
});

describe("grouping & filtering", () => {
  it("groups by day and by month", () => {
    const byDay = groupByDay(ALL);
    expect(byDay.get("2026-08-27")).toEqual([karaoke1]);
    expect(eventsInMonth(ALL, { y: 2026, m: 9 }).map((e) => e.id)).toEqual(["sept-5", "labor", "comedy"]);
    expect(eventsInMonth(ALL, { y: 2026, m: 8 }).map((e) => e.id)).toEqual(["karaoke-1", "wade", "aug31"]);
  });

  it("filters by category and keeps Other under All", () => {
    expect(filterByCategory(ALL, "All")).toHaveLength(7);
    expect(filterByCategory(ALL, "Live Music").map((e) => e.id)).toEqual(["wade", "sept-5", "oct"]);
    expect(filterByCategory(ALL, "Comedy")).toEqual([comedy]);
    expect(filterByCategory(ALL, "DJ")).toEqual([]);
  });

  it("sections upcoming events: This Week / Next Week / Later This Month / months", () => {
    // Today = Wed Aug 26 2026 → This Week ends Sat Aug 29, Next Week = Aug 30–Sep 5
    const sections = groupUpcoming(ALL, "2026-08-26");
    expect(sections.map((s) => s.label)).toEqual(["This Week", "Next Week", "September 2026", "October 2026"]);
    expect(sections[0].events.map((e) => e.id)).toEqual(["karaoke-1", "wade"]);
    expect(sections[1].events.map((e) => e.id)).toEqual(["aug31", "sept-5"]);
    expect(sections[2].events.map((e) => e.id)).toEqual(["labor", "comedy"]);
  });

  it("uses Later This Month when the month still has room after next week", () => {
    const sections = groupUpcoming([karaoke1, wade, aug31], "2026-08-10");
    expect(sections.map((s) => s.label)).toEqual(["Later This Month"]);
  });

  it("flags routine nights for compact rendering", () => {
    expect(isRoutineEvent(karaoke1)).toBe(true);
    expect(isRoutineEvent(aug31)).toBe(true);
    expect(isRoutineEvent(wade)).toBe(false);
    expect(isRoutineEvent(comedy)).toBe(false);
  });
});
