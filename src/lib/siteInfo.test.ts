import { describe, expect, it } from "vitest";
import { HOURS, OPENING_HOURS_SPEC } from "./siteInfo";
import { HOME_FAQS, PAGES, restaurantSchema } from "./seo";

describe("restaurant hours", () => {
  it("shows the client-approved weekly schedule", () => {
    expect(HOURS).toEqual([
      ["Monday", "3pm – 10pm"],
      ["Tuesday", "Closed"],
      ["Wednesday", "Closed"],
      ["Thursday", "3pm – 10pm"],
      ["Friday", "3pm – 10pm"],
      ["Saturday", "11am – 10pm"],
      ["Sunday Brunch", "9am – 3pm"],
    ]);
  });

  it("emits schema hours for open days only (no fake periods for closed days)", () => {
    expect(OPENING_HOURS_SPEC).toEqual([
      { dayOfWeek: "Monday", opens: "15:00", closes: "22:00" },
      { dayOfWeek: "Thursday", opens: "15:00", closes: "22:00" },
      { dayOfWeek: "Friday", opens: "15:00", closes: "22:00" },
      { dayOfWeek: "Saturday", opens: "11:00", closes: "22:00" },
      { dayOfWeek: "Sunday", opens: "09:00", closes: "15:00" },
    ]);
    const days = restaurantSchema().openingHoursSpecification.map((h) => h.dayOfWeek);
    expect(days).not.toContain("Tuesday");
    expect(days).not.toContain("Wednesday");
  });
});

describe("Happy Hour copy", () => {
  const hoursFaq = HOME_FAQS.find((f) => f.q.toLowerCase().includes("hours"))!;

  it("states Mon + Thu-Sat 3-6pm with no Sunday Happy Hour in the hours FAQ", () => {
    expect(hoursFaq.a).toContain("3–6pm Monday and Thursday through Saturday");
    expect(hoursFaq.a).toContain("no Happy Hour on Sunday");
  });

  it("never claims Happy Hour runs every day", () => {
    const specials = PAGES.find((p) => p.path === "/specials")!;
    for (const text of [hoursFaq.a, specials.description]) {
      expect(text).not.toMatch(/every ?day|daily|every open day|every day we/i);
    }
  });
});
