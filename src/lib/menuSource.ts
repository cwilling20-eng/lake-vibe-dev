import Papa from "papaparse";

// Canonical menu shape. Tags replace the old fav/gf booleans; price is a STRING
// so the Sheet can hold "14", "9.5", or "Market" and the UI decides formatting.
export interface MenuItem {
  name: string;
  desc: string;
  price: string;
  tags: string[];
  extras: string;
}
export interface MenuCategory {
  title: string;
  items: MenuItem[];
}
export type MealKey = "brunch" | "midday" | "dinner";
export type Menus = Record<MealKey, MenuCategory[]>;

// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH for the live menu data source.
//
// The menu lives in a PUBLIC Google Sheet (it is owner-editable content, not a
// secret — so it lives in code, not in an env var). To point the live site at
// the owner's Sheet, set SHEET_ID to the ID from its URL:
//   https://docs.google.com/spreadsheets/d/<THIS_PART>/edit
//
// Until a real ID is set, fetchMenus() throws and the app keeps rendering the
// committed seed (src/data/menu.json). See MENU-EDITING.md.
// ---------------------------------------------------------------------------
export const SHEET_ID = "REPLACE_WITH_SHEET_ID";

const SHEET_ID_PLACEHOLDER = "REPLACE_WITH_SHEET_ID";

// Display order of the switcher AND the tab name to read for each meal.
// The `sheet` value must match the Sheet tab name exactly.
export const MEALS: { key: MealKey; sheet: string }[] = [
  { key: "brunch", sheet: "Brunch" },
  { key: "midday", sheet: "Midday" },
  { key: "dinner", sheet: "Dinner" },
];

export const isSheetConfigured = (): boolean =>
  SHEET_ID.length > 0 && SHEET_ID !== SHEET_ID_PLACEHOLDER;

// gviz CSV endpoint — reads a single tab BY NAME (resilient to gid changes).
export const gvizCsvUrl = (sheet: string): string =>
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
    sheet,
  )}`;

// One Sheet row, keyed by the header columns (Section, Item, ...).
type SheetRow = Record<string, string>;

const cell = (row: SheetRow, key: string): string => (row[key] ?? "").trim();

// Group rows by Section in SHEET ORDER (no alphabetizing). Tags -> string[];
// Price passes through as a string; Modifiers -> extras.
export function rowsToCategories(rows: SheetRow[]): MenuCategory[] {
  const bySection = new Map<string, MenuItem[]>();
  for (const row of rows) {
    const title = cell(row, "Section");
    if (!title) continue; // skip blank/trailing rows
    const item: MenuItem = {
      name: cell(row, "Item"),
      desc: cell(row, "Description"),
      price: cell(row, "Price"),
      tags: cell(row, "Tags")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      extras: cell(row, "Modifiers"),
    };
    if (!bySection.has(title)) bySection.set(title, []);
    bySection.get(title)!.push(item);
  }
  return Array.from(bySection, ([title, items]) => ({ title, items }));
}

// PapaParse handles quoted fields, embedded commas, quotes and newlines — which
// the Description and Modifiers columns contain. Never hand-roll this.
async function fetchTab(sheet: string): Promise<MenuCategory[]> {
  const res = await fetch(gvizCsvUrl(sheet));
  if (!res.ok) throw new Error(`Menu tab "${sheet}" returned HTTP ${res.status}`);
  const csv = await res.text();
  const parsed = Papa.parse<SheetRow>(csv, { header: true, skipEmptyLines: true });
  return rowsToCategories(parsed.data);
}

// Fetch all three tabs. If the Sheet isn't configured (or any tab fails), this
// throws so react-query keeps showing the last-good / seed data.
export async function fetchMenus(): Promise<Menus> {
  if (!isSheetConfigured()) {
    throw new Error("Menu Sheet not configured — serving committed seed.");
  }
  const entries = await Promise.all(
    MEALS.map(async (m) => [m.key, await fetchTab(m.sheet)] as const),
  );
  return Object.fromEntries(entries) as Menus;
}
