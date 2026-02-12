import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { Clock, CalendarDays, Flame } from "lucide-react";

const dailySpecials = [
  { day: "Monday", title: "Half-Price Appetizers", desc: "Kick off the week with all appetizers at half price." },
  { day: "Wednesday", title: "Wing Wednesday", desc: "50¢ wings all night. Toss 'em in any sauce." },
  { day: "Thursday", title: "Karaoke Night Drink Deals", desc: "Discounted wells and drafts while you own the mic." },
  { day: "Friday", title: "Live Music Happy Hour", desc: "Extended happy hour pricing from 5–7pm with live music." },
];

const weeklySpecials = [
  { title: "Brisket Jam Burger Combo", desc: "Our signature burger with fries and a draft beer.", price: "$22" },
  { title: "Date Night Package", desc: "Two entrees, a shared appetizer, and a bottle of wine.", price: "$65" },
];

const limitedOffers = [
  { title: "Crawfish Boil Weekend", desc: "Seasonal crawfish done right — Cajun spiced with all the fixings. Available while supplies last.", tag: "Limited Run" },
  { title: "Summer Sangria Pitcher", desc: "Refreshing house-made sangria perfect for the patio. Grab it before it's gone.", tag: "Seasonal" },
];

const Specials = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 pb-8 bg-background">
        <div className="container-site text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              What's On Special <span className="gold-gradient-text">This Week</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">Deals, steals, and flavors you won't want to miss.</p>
          </FadeIn>
        </div>
      </section>

      {/* Daily Specials */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <SectionHeading title="Daily Specials" subtitle="Something special every day of the week." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dailySpecials.map((s, i) => (
              <FadeIn key={s.day} delay={i * 0.1}>
                <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={16} className="text-primary" />
                    <span className="text-primary font-display text-sm font-bold uppercase tracking-wider">{s.day}</span>
                  </div>
                  <h3 className="text-lg font-display font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Specials */}
      <section className="section-padding bg-secondary">
        <div className="container-site">
          <SectionHeading title="Weekly Specials" subtitle="Available all week long." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weeklySpecials.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarDays size={18} className="text-primary" />
                    <span className="text-primary font-display text-2xl font-bold">{s.price}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Limited-Time Offers */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <SectionHeading title="Limited-Time Offers" subtitle="Get 'em before they're gone." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {limitedOffers.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div className="bg-card rounded-xl p-8 border border-primary/20 hover:border-primary/40 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary border border-primary px-3 py-1.5 rounded-md">
                      <Flame size={12} />
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold mt-2">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
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
            <p className="mt-3 text-primary-foreground/80">Specials change weekly. Follow us or just show up.</p>
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
