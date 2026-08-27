import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import UpcomingEvents from "@/components/UpcomingEvents";
import karaokeImg from "@/assets/karaoke.jpg";

// Karaoke dates come from the client's Google Calendar (Karaoke category).
// No themes or dates are hardcoded on this page.
const KaraokeNight = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${karaokeImg})` }} />
        <div className="absolute inset-0 overlay-dark-heavy" />
        <div className="relative z-10 text-center container-site pt-20">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              Karaoke <span className="gold-gradient-text">Night</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Take the mic. Own the room. Weekly karaoke nights at Elements by 456 in Gun Barrel City, TX — group
              tables, taco and margarita specials, and no cover.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Upcoming karaoke nights */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <SectionHeading title="Upcoming Karaoke Nights" subtitle="Grab your crew and warm up those vocal cords." />
          <UpcomingEvents
            categories={["Karaoke"]}
            limit={8}
            emptyTitle="Check back soon for upcoming karaoke dates."
            emptyBody="Karaoke nights are posted on our events calendar as they're scheduled."
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

      {/* Group Reservations */}
      <section className="section-padding bg-secondary">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <FadeIn direction="left">
              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <img src={karaokeImg} alt="Karaoke night" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold uppercase">
                  Bring the <span className="gold-gradient-text">Crew</span>
                </h2>
                <div className="mt-4 h-0.5 w-16 gold-gradient" />
                <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                  Karaoke is better with friends. Reserve a group table and make it a night to remember.
                  Birthday celebrations, team outings, or just a weeknight tradition — we've got the space and the sound system.
                </p>
                <Link
                  to="/reservations"
                  className="mt-8 inline-block px-8 py-4 text-sm font-bold uppercase tracking-widest gold-gradient text-primary-foreground rounded-lg gold-glow-hover hover:scale-105 transition-all duration-300"
                >
                  Reserve for Karaoke Night
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
              Your Stage Awaits
            </h2>
            <p className="mt-4 text-primary-foreground/80">No cover. Just courage.</p>
            <Link
              to="/reservations"
              className="mt-8 inline-block px-8 py-4 text-sm font-bold uppercase tracking-widest bg-background text-foreground rounded-lg hover:bg-background/90 transition-all"
            >
              Reserve for Karaoke Night
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default KaraokeNight;
