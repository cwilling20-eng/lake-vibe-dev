import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import UpcomingEvents from "@/components/UpcomingEvents";
import { Clock, Beef, Mic } from "lucide-react";
import steakShrimp from "@/assets/Steak and Shrimp.webp";
import salmonSquared from "@/assets/salmon_squared.webp";
import grilledSalmon from "@/assets/Grilled Salmon.webp";
import steakSquared from "@/assets/steak_squared.webp";
import steakMedallions from "@/assets/Steak Medallions.webp";
import pancakes from "@/assets/Pancakes.webp";

// Evergreen restaurant deals. These are NOT calendar events — they're standing
// food & drink specials the restaurant runs. Entertainment (who's playing,
// which night) is pulled live from the Google Calendar further down.
const standingDeals = [
  {
    title: "Happy Hour",
    when: "5–7pm, every day we're open",
    desc: "Drink deals at the largest bar on Cedar Creek Lake.",
    icon: Clock,
  },
  {
    title: "Burger Monday",
    when: "Mondays · Dinner only",
    desc: "$1 off any burger — and another $1 off when you add fries.",
    icon: Beef,
  },
  {
    title: "Karaoke Night Deals",
    when: "On karaoke nights",
    desc: "$12 street tacos and $5 margaritas while you own the mic. See the calendar for dates.",
    icon: Mic,
  },
];

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
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Drink deals, standing specials, and rotating chef features at Elements by 456 in Gun Barrel City, TX.
              Happy hour runs 5–7pm every day we're open.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Standing deals */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <SectionHeading title="Standing Specials" subtitle="Here's what's going down when we're open." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {standingDeals.map((deal, i) => (
              <FadeIn key={deal.title} delay={i * 0.1}>
                <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors h-full">
                  <div className="flex items-center gap-2 mb-3 text-primary">
                    <deal.icon size={18} aria-hidden="true" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{deal.when}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold">{deal.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{deal.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
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
