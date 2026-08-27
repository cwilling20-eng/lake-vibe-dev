import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import UpcomingEvents from "@/components/UpcomingEvents";
import eventsMusic from "@/assets/events-music.jpg";
import patio from "@/assets/patio.jpg";

// Lineup comes from the client's Google Calendar (Live Music + DJ categories).
// No performer names or dates are hardcoded on this page.
const LiveMusic = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${eventsMusic})` }} />
        <div className="absolute inset-0 overlay-dark-heavy" />
        <div className="relative z-10 text-center container-site pt-20">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              Live Music at <span className="gold-gradient-text">Elements</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Weekend nights on the patio — the lake comes alive. Local and touring bands play the lakefront patio
              stage at Elements by 456 in Gun Barrel City, TX on Cedar Creek Lake.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Upcoming lineup */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <SectionHeading title="Upcoming Lineup" subtitle="Who's playing next on the patio stage." />
          <UpcomingEvents
            categories={["Live Music", "DJ"]}
            limit={12}
            emptyTitle="Check back soon for upcoming live music dates."
            emptyBody="New shows are added to our calendar regularly."
          />
          <FadeIn>
            <p className="mt-8 text-center">
              <Link to="/events" className="text-primary font-semibold hover:underline">
                See everything happening at Elements →
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Patio Energy */}
      <section className="section-padding bg-secondary">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <FadeIn direction="left">
              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <img src={patio} alt="Patio with live music" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold uppercase">
                  Feel the <span className="gold-gradient-text">Patio Energy</span>
                </h2>
                <div className="mt-4 h-0.5 w-16 gold-gradient" />
                <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                  There's nothing like live music under the open sky on Cedar Creek Lake. Our patio stage brings
                  local and touring acts right to your table. Cold drinks, warm nights, and good vibes every weekend.
                </p>
                <Link to="/entertainment-inquiry" className="mt-6 inline-block text-primary font-semibold hover:underline">
                  Interested in performing at Elements? →
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 gold-gradient">
        <div className="container-site text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase text-primary-foreground">
              Grab Your Spot
            </h2>
            <p className="mt-4 text-primary-foreground/80">Tables fill up fast on music nights. Reserve yours now.</p>
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

export default LiveMusic;
