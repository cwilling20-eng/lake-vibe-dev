import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { Clock, Beef, Mic, Music } from "lucide-react";
import karaokeFlyer from "@/assets/686541286_122145158900414446_7514774014079256357_n.webp";
import djToriFlyer from "@/assets/704427214_27222040184152194_368634848445025664_n.webp";
import steakShrimp from "@/assets/Steak and Shrimp.webp";
import salmonSquared from "@/assets/salmon_squared.webp";
import grilledSalmon from "@/assets/Grilled Salmon.webp";
import steakSquared from "@/assets/steak_squared.webp";
import steakMedallions from "@/assets/Steak Medallions.webp";
import pancakes from "@/assets/Pancakes.webp";

// Flyer nights (Thu / Fri) — promotional posters shown in full.
const flyerNights = [
  {
    day: "Thursday",
    title: "Karaoke · 6–9pm",
    desc: "$12 street tacos and $5 margaritas while you own the mic.",
    img: karaokeFlyer,
    icon: Mic,
  },
  {
    day: "Friday",
    title: "DJ Tori · 7–11pm",
    desc: "DJ Tori spins all night. Great music, good people, epic nights.",
    img: djToriFlyer,
    icon: Music,
  },
];

// Deal / spotlight days without a flyer.
const dealDays = [
  {
    day: "Monday",
    title: "Burger Monday",
    desc: "$1 off any burger — and another $1 off when you add fries. Dinner only.",
    icon: Beef,
  },
  {
    day: "Saturday",
    title: "Live Music · 7–11pm",
    desc: "Live music every Saturday night. Last Saturday of the month: Comedy Show.",
    icon: Music,
  },
];

// Rotating chef features — different plates, name-only captions.
const featuredSpecials = [
  { name: "Steak & Shrimp", img: steakShrimp },
  { name: "Salmon", img: salmonSquared },
  { name: "Salmon", img: grilledSalmon },
  { name: "Steak Medallions", img: steakSquared },
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
            <p className="mt-4 text-muted-foreground text-lg">Weekly nights out, drink deals, and rotating chef features.</p>
          </FadeIn>
        </div>
      </section>

      {/* Weekly Lineup */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <SectionHeading title="Weekly Lineup" subtitle="Here's what's going down when we're open." />

          {/* Happy Hour banner */}
          <FadeIn>
            <div className="bg-card border border-primary/30 rounded-xl p-6 md:p-8 flex items-center gap-5 mb-10">
              <div className="flex-shrink-0 w-12 h-12 rounded-full gold-gradient flex items-center justify-center">
                <Clock size={22} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-primary">Happy Hour</h3>
                <p className="text-muted-foreground">5–7pm, every day we're open.</p>
              </div>
            </div>
          </FadeIn>

          {/* Entertainment nights — flyers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {flyerNights.map((night, i) => (
              <FadeIn key={night.day} delay={i * 0.1}>
                <div className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-colors h-full">
                  <div className="h-80 flex items-center justify-center bg-background">
                    <img
                      src={night.img}
                      alt={`${night.title} — ${night.day}`}
                      className="max-h-full w-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-1">
                      <night.icon size={16} className="text-primary" />
                      <span className="text-primary text-sm font-bold uppercase tracking-wider">{night.day}</span>
                    </div>
                    <h3 className="text-lg font-display font-bold">{night.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{night.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Deal days */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dealDays.map((deal, i) => (
              <FadeIn key={deal.day} delay={i * 0.1}>
                <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <deal.icon size={18} className="text-primary" />
                    <span className="text-primary text-sm font-bold uppercase tracking-wider">{deal.day}</span>
                  </div>
                  <h3 className="text-lg font-display font-bold">{deal.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{deal.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Specials */}
      <section className="section-padding bg-secondary">
        <div className="container-site">
          <SectionHeading
            title="Featured Specials"
            subtitle="Rotating chef features — ask your server what's on this week."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {featuredSpecials.map((item, i) => (
              <FadeIn key={i} delay={(i % 3) * 0.1}>
                <div className="group relative rounded-xl overflow-hidden aspect-square border border-border">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display font-bold text-lg text-primary">{item.name}</h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gold-gradient">
        <div className="container-site text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase text-primary-foreground">
              Don't Miss Out
            </h2>
            <p className="mt-3 text-primary-foreground/80">The lineup runs weekly. Follow us or just show up.</p>
            <Link
              to="/reservations"
              className="mt-6 inline-block px-8 py-4 bg-background text-foreground text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-background/90 transition-all"
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
