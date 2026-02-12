import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { Mic, Users, Calendar } from "lucide-react";
import karaokeImg from "@/assets/karaoke.jpg";

const upcomingThemes = [
  { theme: "90s Night", date: "This Thursday", desc: "Backstreet Boys, TLC, Nirvana — bring your best 90s energy." },
  { theme: "Country Classics", date: "Next Thursday", desc: "Dolly, Johnny, and Willie. Boots optional, twang required." },
  { theme: "Rock Legends", date: "Feb 27", desc: "Channel your inner Freddie, Axl, or Bon Jovi." },
  { theme: "Hip-Hop Throwback", date: "Mar 6", desc: "Biggie, Tupac, Missy — the mic is yours." },
];

const KaraokeNight = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${karaokeImg})` }} />
        <div className="absolute inset-0 overlay-dark-heavy" />
        <div className="container-site text-center relative z-10">
          <FadeIn>
            <Mic size={40} className="text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              Themed Night <span className="gold-gradient-text">Karaoke</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">Every Thursday — take the mic, own the room.</p>
          </FadeIn>
        </div>
      </section>

      {/* Upcoming Themes */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <SectionHeading title="Upcoming Themes" subtitle="Each week brings a new vibe." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {upcomingThemes.map((t, i) => (
              <FadeIn key={t.theme} delay={i * 0.1}>
                <div className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={16} className="text-primary" />
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider">{t.date}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold">{t.theme}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
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
                <div className="flex items-center gap-3 mb-4">
                  <Users size={24} className="text-primary" />
                  <h2 className="text-3xl md:text-4xl font-display font-bold uppercase">
                    Bring the <span className="gold-gradient-text">Crew</span>
                  </h2>
                </div>
                <div className="mt-2 h-0.5 w-16 gold-gradient" />
                <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                  Karaoke is better with friends. Reserve a group table and make it a night to remember.
                  Birthday celebrations, team outings, or just a Thursday tradition — we've got the space and the sound system.
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
      <section className="py-16 gold-gradient">
        <div className="container-site text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase text-primary-foreground">
              Your Stage Awaits
            </h2>
            <p className="mt-3 text-primary-foreground/80">Every Thursday. No cover. Just courage.</p>
            <Link
              to="/reservations"
              className="mt-6 inline-block px-8 py-4 bg-background text-foreground text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-background/90 transition-all"
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
