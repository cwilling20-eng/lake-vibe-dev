import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { Music, Calendar } from "lucide-react";
import eventsMusic from "@/assets/events-music.jpg";
import patio from "@/assets/patio.jpg";

const thisWeek = [
  { artist: "The Lakeside Band", date: "Friday, 7pm–10pm", genre: "Country & Southern Rock" },
  { artist: "Soul Fire Duo", date: "Saturday, 7pm–10pm", genre: "Blues & Soul" },
];

const upcomingArtists = [
  { name: "Texas Twang", genre: "Country", date: "Next Friday" },
  { name: "Bayou Brothers", genre: "Zydeco & Blues", date: "Next Saturday" },
  { name: "Cedar Creek Collective", genre: "Americana", date: "Feb 28" },
  { name: "The Patio Players", genre: "Classic Rock", date: "Mar 1" },
];

const LiveMusic = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${eventsMusic})` }} />
        <div className="absolute inset-0 overlay-dark-heavy" />
        <div className="container-site text-center relative z-10">
          <FadeIn>
            <Music size={40} className="text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              Live Music at <span className="gold-gradient-text">Elements</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">Every Friday & Saturday night — the lake comes alive.</p>
          </FadeIn>
        </div>
      </section>

      {/* This Week's Lineup */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <SectionHeading title="This Week's Lineup" subtitle="Who's playing this weekend." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {thisWeek.map((show, i) => (
              <FadeIn key={show.artist} delay={i * 0.1}>
                <div className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={16} className="text-primary" />
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider">{show.date}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold">{show.artist}</h3>
                  <p className="mt-2 text-muted-foreground">{show.genre}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Artists */}
      <section className="section-padding bg-secondary">
        <div className="container-site">
          <SectionHeading title="Upcoming Artists" subtitle="Mark your calendar." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingArtists.map((a, i) => (
              <FadeIn key={a.name} delay={i * 0.1}>
                <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:scale-[1.02] transition-all duration-300">
                  <span className="text-primary font-display text-sm font-bold uppercase tracking-wider">{a.date}</span>
                  <h3 className="text-lg font-display font-bold mt-2">{a.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{a.genre}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Patio Energy */}
      <section className="section-padding bg-background">
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
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gold-gradient">
        <div className="container-site text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase text-primary-foreground">
              Grab Your Spot
            </h2>
            <p className="mt-3 text-primary-foreground/80">Tables fill up fast on music nights. Reserve yours now.</p>
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

export default LiveMusic;
