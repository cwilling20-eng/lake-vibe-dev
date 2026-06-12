# Editing the Menu (Elements by 456)

The website menu is driven by **one Google Sheet** with three tabs. Edit the
Sheet and the site updates itself — no code changes, no developer needed.

---

## The Sheet

- One spreadsheet, **three tabs named exactly**: `Brunch`, `Midday`, `Dinner`.
- Each tab has the **same six columns** in row 1 (the header row — don't rename or
  reorder them):

| Column | Required | What it is | Example |
|---|---|---|---|
| **Section** | Yes | The heading an item appears under. Items are grouped by this, **in the order they appear top-to-bottom** in the sheet. | `Handhelds` |
| **Item** | Yes | The dish name. | `Mother Clucker` |
| **Description** | No | One sentence under the name. Commas are fine. | `Crispy fried chicken with pickles and garlic aioli.` |
| **Price** | Yes | Just the number (no `$`). Decimals OK. Non-numeric values (e.g. `Market`) show as-is. | `13` or `9.5` or `Market` |
| **Tags** | No | Comma-separated. See the two special tags below. | `GF, House Favorite` |
| **Modifiers** | No | Add-on line shown under the item. Separate multiple with `;`. | `Nashville Hot or Buffalo +$1` |

### The two tags that do something special
Type these **exactly** (capitalization matters):

- **`House Favorite`** → shows the gold ★ star next to the item.
- **`GF`** → shows the small italic *GF* (gluten-free) marker.

Any other tag you add (e.g. `Spicy`, `Vegetarian`) shows as a small text badge —
it won't break anything.

### Ordering
- **Section order** = the order each Section first appears as you read down the tab.
- **Item order within a section** = top-to-bottom order in the tab.
- Don't sort alphabetically expecting the site to match — the site uses *your*
  row order.

---

## Making the Sheet readable by the site (one-time setup)

The site reads the Sheet over the public link. Do **both**:

1. **Share → General access → “Anyone with the link” → Viewer.**
2. **File → Share → Publish to web → Publish** (whole document).

The Sheet only ever holds the menu (prices, names, descriptions) — nothing
private. There is no password or API key involved.

### Pointing the site at your Sheet (developer, one line)
In `src/lib/menuSource.ts`, set:

```ts
export const SHEET_ID = "<the long ID from your Sheet URL>";
```

The ID is the part between `/d/` and `/edit` in the URL:
`https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`

Until that ID is set, the site safely shows the built-in snapshot
(`src/data/menu.json`).

---

## How fast do edits show up?

**Allow about 5 minutes.** Google caches the published Sheet, so a change you
make won't appear on the website instantly — give it ~5 minutes and refresh.

## If the Sheet is ever unreachable

The site **never shows an empty menu**. If Google is down, the link is wrong, or
a tab was renamed, the page falls back to the last built-in snapshot so customers
always see a full menu. (To refresh that snapshot, a developer regenerates
`src/data/menu.json`.)

---

## Quick do / don't

- ✅ Change prices, names, descriptions, add/remove rows, add new Sections.
- ✅ Use commas in Description and Modifiers — they're handled correctly.
- ❌ Don't rename the three tabs (`Brunch`, `Midday`, `Dinner`).
- ❌ Don't rename or reorder the six header columns.
- ❌ Don't put a `$` in the Price column.
