import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import UpcomingEvents from "@/components/UpcomingEvents";
import { Clock, Beef, Utensils } from "lucide-react";
import steakShrimp from "@/assets/Steak and Shrimp.webp";
import salmonSquared from "@/assets/salmon_squared.webp";
import grilledSalmon from "@/assets/Grilled Salmon.webp";
import steakSquared from "@/assets/steak_squared.webp";
import steakMedallions from "@/assets/Steak Medallions.webp";
import pancakes from "@/assets/Pancakes.webp";

// Evergreen restaurant promotions. These are NOT calendar events — they're
// standing food & drink specials. Entertainment (who's playing, which night)
// is pulled live from the Google Calendar further down.
//
// Flyers are client-supplied artwork (public/, optimized WebP). The flyer
// carries the detailed pricing; the copy stays to the verified core facts.
const promos = [
  {
    title: "Happy Hour",
    when: "3–6pm, every day we're open",
    desc: "Drink deals at the largest bar on Cedar Creek Lake.",
    icon: Clock,
    flyer: "/elements_happy_hour.webp",
    flyerAlt: "Elements Happy Hour flyer — every day 3pm to 6pm, with $3, $6 and $9 drink and appetizer specials",
  },
  {
    title: "Taco Thursday & $5 Margaritas",
    when: "Every Thursday",
    desc: "A weekly Elements social — tacos and $5 margaritas every Thursday.",
    icon: Utensils,
    flyer: "/taco_thursday.webp",
    flyerAlt: "Taco Thursday flyer — karaoke plus $12 tacos and $5 margaritas every Thursday at Elements, tortillas made in house",
  },
];

const burgerMonday = {
  title: "Burger Monday",
  when: "Mondays · Dinner only",
  desc: "$1 off any burger — and another $1 off when you add fries.",
  icon: Beef,
};

// Rotating chef features — different plates, name-only captions.
const featuredSpecials = [
  { name: "Steak & Shrimp", img: steakShrimp },
  { name: "Salmon", img: salmonSquared },
  { name: "Blackened Mahi Mahi", img: grilledSalmon },
  { name: "Filet Mignon", img: steakSquared },
  { name: "Steak Medallions", img: steakMedallions },
  { name: "Pancakes", img: pancakes },
];

const Specials = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 pb-8 bg-background">
        <div className="container-site text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              What's <span className="gold-gradient-text">Happening</span>
            </h1>
            <div className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto flex flex-col gap-3">
              <p>
                There’s always something worth ordering at Elements By 456. Enjoy Happy Hour from{" "}
                <strong className="text-foreground">3–6 PM every day we’re open</strong>, along with weekly food and
                drink deals and rotating chef-inspired specials.
              </p>
              <p>
                Looking for something a little more elevated? Our{" "}
                <strong className="text-foreground">Elements After 5</strong> menu features premium steaks, seafood,
                and distinctive evening dishes designed for dinner, date night, or simply treating yourself because
                cooking at home sounds awful.
              </p>
              <p>Specials and featured dishes change regularly, so check back often to see what we’re serving next.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Standing deals */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <SectionHeading title="Weekly Specials" subtitle="Here's what's going down when we're open." />

          {/* Promo + flyer pairs: side-by-side from sm, stacked on phones */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {promos.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <article className="h-full bg-card rounded-xl border border-border hover:border-primary/30 transition-colors overflow-hidden flex flex-col sm:flex-row">
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3 text-primary">
                      <p.icon size={18} aria-hidden="true" />
                      <span className="text-xs font-semibold uppercase tracking-wider">{p.when}</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="sm:w-56 md:w-64 flex-shrink-0 bg-background/40 p-4 sm:p-3 flex items-center justify-center">
                    <img
                      src={p.flyer}
                      alt={p.flyerAlt}
                      className="w-full max-w-[280px] sm:max-w-none h-auto rounded-lg shadow-lg"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          {/* Burger Monday — text-only promo */}
          <FadeIn delay={0.2}>
            <div className="mt-6 lg:mt-8 bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
              <div className="flex items-center gap-2 text-primary sm:w-56 flex-shrink-0">
                <burgerMonday.icon size={18} aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-wider">{burgerMonday.when}</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold">{burgerMonday.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{burgerMonday.desc}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* This week's entertainment — live from the calendar */}
      <section className="section-padding bg-secondary">
        <div className="container-site">
          <SectionHeading title="Coming Up" subtitle="Live music, karaoke, comedy — straight from our events calendar." />
          <UpcomingEvents limit={4} variant="compact" />
          <FadeIn>
            <p className="mt-8 text-center">
              <Link
                to="/events"
                className="inline-block px-8 py-4 text-sm font-bold uppercase tracking-widest border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
              >
                See All Events
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured Specials */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <SectionHeading
            title="Featured Specials"
            subtitle="Rotating chef features — ask your server what's on this week."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {featuredSpecials.map((item, i) => (
              <FadeIn key={item.name} delay={(i % 3) * 0.1}>
                <div className="group relative rounded-xl overflow-hidden aspect-square">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-base md:text-lg font-display font-bold text-primary">{item.name}</h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 gold-gradient">
        <div className="container-site text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase text-primary-foreground">
              Don't Miss Out
            </h2>
            <p className="mt-4 text-primary-foreground/80">Follow us or just show up.</p>
            <Link
              to="/reservations"
              className="mt-8 inline-block px-8 py-4 text-sm font-bold uppercase tracking-widest bg-background text-foreground rounded-lg hover:bg-background/90 transition-all"
            >
              Reserve a Table
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Specials;
