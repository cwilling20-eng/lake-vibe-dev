import { useSearchParams } from "react-router-dom";
import { Star } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useMenu } from "@/hooks/useMenu";
import { MEALS, type MealKey, type MenuCategory, type MenuItem } from "@/lib/menuSource";
import favBeignets from "@/assets/Blueberry Beignets & Lemon Icing.webp";
import favCheeseburger from "@/assets/456 Cheeseburger.webp";
import favJackd from "@/assets/Jack'd N Loaded.webp";
import favBrownie from "@/assets/Chocolate Fudge Brownie.webp";

// Fan Favorites photo strip — visual teaser at the top of the menu (no prices).
const FAN_FAVORITES = [
  { name: "Blueberry Beignets", img: favBeignets },
  { name: "456 Cheeseburger", img: favCheeseburger },
  { name: "Jack'd & Loaded", img: favJackd },
  { name: "Chocolate Fudge Brownie", img: favBrownie },
];

// --- Static marketing copy that is NOT in the Sheet -------------------------
const MEAL_META: Record<
  MealKey,
  {
    label: string;
    hours: string;
    tagline?: string;
    difference?: { title: string; subtitle: string };
  }
> = {
  brunch: { label: "Brunch", hours: "Sat & Sun · 11am–2pm" },
  midday: {
    label: "Midday",
    hours: "Mon · Thu · Fri · 11am–3pm",
    difference: { title: "The Elements Difference", subtitle: "Scratch-Made. Never Ordinary." },
  },
  dinner: {
    label: "Dinner",
    hours: "Served from 4pm",
    tagline: "We fry everything in beef tallow. You'll taste the difference.",
  },
};

// Upsell lines that don't live in the Sheet. Keyed by Section title; shown under
// that section wherever it appears. Edit freely (purely presentational).
const SECTION_UPSELLS: Record<string, string> = {
  Handhelds: "Make it a basket +$4 · Add a ¼ lb patty for $5",
};

const DEFAULT_MEAL: MealKey = "dinner";
const isMealKey = (v: string | null): v is MealKey => MEALS.some((m) => m.key === v);

// Prefix "$" only when the price is purely numeric ("14" -> "$14", "Market" -> "Market").
const formatPrice = (price: string): string =>
  /^\d+(\.\d+)?$/.test(price.trim()) ? `$${price.trim()}` : price;

// Tags -> badges. Drives both the per-item markers and the legend.
const TagBadges = ({ tags }: { tags: string[] }) => (
  <>
    {tags.map((tag) => {
      if (tag === "House Favorite")
        return (
          <Star key={tag} size={14} className="text-primary fill-primary" aria-label="House Favorite" />
        );
      if (tag === "GF")
        return (
          <span key={tag} className="text-xs text-muted-foreground italic">
            GF
          </span>
        );
      return (
        <span
          key={tag}
          className="rounded border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground"
        >
          {tag}
        </span>
      );
    })}
  </>
);

// Item card — markup preserved verbatim from the original menu, with the
// fav/gf booleans swapped for tag badges and string-aware price formatting.
const MenuCard = ({ item, index }: { item: MenuItem; index: number }) => (
  <FadeIn delay={index * 0.05}>
    <div className="bg-card rounded-lg p-5 border border-border hover:border-primary/20 transition-colors">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-bold text-lg">{item.name}</h3>
            <TagBadges tags={item.tags} />
          </div>
          {item.desc && <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>}
          {item.extras && <p className="mt-1 text-xs text-primary">+ {item.extras}</p>}
        </div>
        <span className="text-primary font-display font-bold text-xl">{formatPrice(item.price)}</span>
      </div>
    </div>
  </FadeIn>
);

const MenuCategorySection = ({ category }: { category: MenuCategory }) => {
  // desc-driven grid rule: sections whose items carry descriptions render two
  // columns; description-less sections (sides, drinks, extras) render denser.
  const dense = !category.items[0]?.desc;
  const upsell = SECTION_UPSELLS[category.title];
  return (
    <section className="py-10 bg-background border-t border-border">
      <div className="container-site">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-primary mb-8 text-center">
            {category.title}
          </h2>
        </FadeIn>
        <div className={`grid gap-4 ${dense ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
          {category.items.map((item, i) => (
            <MenuCard key={item.name} item={item} index={i} />
          ))}
        </div>
        {upsell && <p className="mt-6 text-center text-sm italic text-primary/80">{upsell}</p>}
      </div>
    </section>
  );
};

// Legend derived from the tags actually present in the active meal.
const MealLegend = ({ categories }: { categories: MenuCategory[] }) => {
  const tags = new Set<string>();
  categories.forEach((c) => c.items.forEach((i) => i.tags.forEach((t) => tags.add(t))));
  const hasFav = tags.has("House Favorite");
  const hasGF = tags.has("GF");
  if (!hasFav && !hasGF) return null;
  return (
    <div className="mt-4 flex items-center justify-center gap-6 text-sm text-muted-foreground">
      {hasFav && (
        <span className="flex items-center gap-1">
          <Star size={14} className="text-primary fill-primary" /> House Favorite
        </span>
      )}
      {hasGF && <span className="italic">GF = Gluten Free</span>}
    </div>
  );
};

// Layout-matched skeleton for the no-data edge (seed makes this rare in practice).
const MenuSkeleton = () => (
  <>
    {[0, 1].map((s) => (
      <section key={s} className="py-10 bg-background border-t border-border">
        <div className="container-site">
          <Skeleton className="h-8 w-48 mx-auto mb-8" />
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card rounded-lg p-5 border border-border">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                  <Skeleton className="h-6 w-10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    ))}
  </>
);

const MealView = ({ mealKey, categories }: { mealKey: MealKey; categories: MenuCategory[] }) => {
  const meta = MEAL_META[mealKey];
  if (categories.length === 0) return <MenuSkeleton />;
  return (
    <>
      <div className="container-site text-center mt-6">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">{meta.hours}</p>

        {meta.tagline && <p className="mt-3 text-muted-foreground text-lg">{meta.tagline}</p>}

        {meta.difference && (
          <div className="mt-4">
            <p className="font-display text-xl font-bold gold-gradient-text">{meta.difference.title}</p>
            <p className="mt-1 text-muted-foreground">{meta.difference.subtitle}</p>
          </div>
        )}

        <MealLegend categories={categories} />
      </div>

      {categories.map((category) => (
        <MenuCategorySection key={category.title} category={category} />
      ))}
    </>
  );
};

const MenuPage = () => {
  const { data: menus } = useMenu();
  const [searchParams, setSearchParams] = useSearchParams();

  const active: MealKey = isMealKey(searchParams.get("meal"))
    ? (searchParams.get("meal") as MealKey)
    : DEFAULT_MEAL;

  const handleChange = (value: string) => {
    const next = new URLSearchParams(searchParams);
    next.set("meal", value);
    setSearchParams(next, { replace: true });
  };

  return (
    <Layout>
      <section className="pt-28 pb-4 bg-background">
        <div className="container-site text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              Our <span className="gold-gradient-text">Menu</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Brunch, midday and dinner at Elements by 456 in Gun Barrel City, TX — elevated comfort food, fresh
              ingredients, and everything fried in beef tallow.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Fan Favorites strip — visual teaser, names only (no prices) */}
      <section className="pb-8 bg-background">
        <div className="container-site">
          <FadeIn>
            <p className="text-center text-sm font-bold uppercase tracking-widest text-primary mb-5">Fan Favorites</p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FAN_FAVORITES.map((fav, i) => (
              <FadeIn key={fav.name} delay={i * 0.08}>
                <div className="group relative rounded-xl overflow-hidden aspect-square border border-border">
                  <img
                    src={fav.img}
                    alt={fav.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="font-display font-bold text-sm md:text-base text-primary leading-tight">{fav.name}</h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Tabs value={active} onValueChange={handleChange} className="w-full">
        <div className="container-site flex justify-center">
          <TabsList className="inline-flex h-auto justify-center gap-2 md:gap-8 rounded-none border-b border-border bg-transparent p-0">
            {MEALS.map((m) => (
              <TabsTrigger
                key={m.key}
                value={m.key}
                className="rounded-none border-b-2 border-transparent bg-transparent px-4 py-3 font-display text-base md:text-lg font-bold uppercase tracking-widest text-muted-foreground shadow-none transition-all hover:text-foreground data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                {MEAL_META[m.key].label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {MEALS.map((m) => (
          <TabsContent key={m.key} value={m.key} className="mt-0">
            <MealView mealKey={m.key} categories={menus?.[m.key] ?? []} />
          </TabsContent>
        ))}
      </Tabs>
    </Layout>
  );
};

export default MenuPage;
