import { describe, it, expect, beforeAll } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MenuPage from "./MenuPage";

// framer-motion's whileInView needs IntersectionObserver, which jsdom lacks.
beforeAll(() => {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  // @ts-expect-error minimal mock
  global.IntersectionObserver = IO;
  // @ts-expect-error minimal mock
  window.IntersectionObserver = IO;
});

let lastSearch = "";
function LocationProbe() {
  lastSearch = useLocation().search;
  return null;
}

function renderMenu(entry = "/menu") {
  // Fresh client per test; SHEET_ID is the placeholder so the live fetch is
  // skipped and the committed seed (initialData) is what renders.
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={[entry]}>
        <Routes>
          <Route
            path="/menu"
            element={
              <>
                <MenuPage />
                <LocationProbe />
              </>
            }
          />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("MenuPage", () => {
  it("renders all three tabs, with Dinner active and its seed items painted instantly", () => {
    renderMenu();
    // All three tabs present.
    expect(screen.getByRole("tab", { name: "Brunch" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Midday" })).toBeInTheDocument();
    const dinner = screen.getByRole("tab", { name: "Dinner" });
    expect(dinner).toHaveAttribute("aria-selected", "true");
    // Seed content is present synchronously (no awaiting) => instant render.
    expect(screen.getByText("Queso Gone Wild")).toBeInTheDocument();
    expect(screen.getByText("Brisket Jam Burger")).toBeInTheDocument();
    // Numeric price gets a "$" prefix.
    expect(screen.getByText("$18")).toBeInTheDocument();
  });

  it("applies the desc-driven grid rule per section", () => {
    renderMenu();
    const described = screen.getByText("Warm-Up").closest("section")!;
    expect(described.querySelector(".grid")!.className).toMatch(/grid-cols-1/);
    const dense = screen.getByText("The Side Pieces").closest("section")!;
    expect(dense.querySelector(".grid")!.className).toMatch(/grid-cols-2/);
  });

  it("selecting a tab updates the ?meal= URL param (shareable link)", () => {
    renderMenu();
    // Radix Tabs uses automatic activation on real focus (focusin).
    act(() => {
      (screen.getByRole("tab", { name: "Midday" }) as HTMLElement).focus();
    });
    expect(lastSearch).toBe("?meal=midday");
  });

  it("renders meal-keyed content read from the ?meal= URL", () => {
    // Midday content present + static midday copy...
    renderMenu("/menu?meal=midday");
    expect(screen.getByRole("tab", { name: "Midday" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Mother Clucker & Fries")).toBeInTheDocument();
    expect(screen.getByText("The Elements Difference")).toBeInTheDocument();
    // ...and the Dinner-only content is not on the Midday view.
    expect(screen.queryByText("Queso Gone Wild")).toBeNull();
  });

  it("reads ?meal= from the URL on load (Brunch)", () => {
    renderMenu("/menu?meal=brunch");
    expect(screen.getByRole("tab", { name: "Brunch" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Blueberry Beignets & Lemon Icing")).toBeInTheDocument();
  });
});
