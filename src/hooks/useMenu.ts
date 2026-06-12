import { useQuery } from "@tanstack/react-query";
import seed from "@/data/menu.json";
import { fetchMenus, type Menus } from "@/lib/menuSource";

// The committed snapshot. Renders instantly and is the permanent fallback if the
// live Sheet is unreachable or unconfigured.
const SEED = seed as Menus;

export function useMenu() {
  return useQuery<Menus>({
    queryKey: ["menu"],
    queryFn: fetchMenus,
    // Paint immediately from the seed...
    initialData: SEED,
    // ...but mark it as old so react-query always background-refetches the Sheet.
    initialDataUpdatedAt: 0,
    // Treat live data as fresh for ~5 min, matching the Sheet's publish cache.
    staleTime: 5 * 60 * 1000,
    // On failure, keep showing the last-good/seed data instead of retrying hard.
    retry: false,
    refetchOnWindowFocus: false,
  });
}
