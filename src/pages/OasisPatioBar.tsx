import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { Sun, GlassWater, Wind } from "lucide-react";
import patio from "@/assets/patio.jpg";
import cocktails from "@/assets/cocktails.jpg";

const highlights = [
  { icon: Sun, title: "Largest Bar on Cedar Creek Lake", desc: "Sprawling outdoor space with panoramic lake views and seating for hundreds." },
  { icon: GlassWater, title: "Signature Cocktails", desc: "Hand-crafted drinks made by our mixologists — from classics to house originals." },
  { icon: Wind, title: "Unmatched Atmosphere", desc: "Live music, string lights, lakeside breezes, and the best sunsets in East Texas." },
];

const OasisPatioBar = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${patio})` }} />
        <div className="absolute inset-0 overlay-dark-heavy" />
        <div className="container-site text-center relative z-10">
          <FadeIn>
            <Sun size={40} className="text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              The Oasis <span className="gold-gradient-text">Patio Bar</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              The largest and most beautiful bar on Cedar Creek Lake. The Oasis Patio Bar at Elements by 456 in Gun
              Barrel City, TX pairs panoramic lake views with signature cocktails and live music.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Highlights */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((h, i) => (
              <FadeIn key={h.title} delay={i * 0.15}>
                <div className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 text-center h-full">
                  <h.icon size={32} className="text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-display font-bold">{h.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{h.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Patio Atmosphere */}
      <section className="section-padding bg-secondary">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <FadeIn direction="left">
              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <img src={patio} alt="Oasis Patio Bar" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold uppercase">
                  Your Lakeside <span className="gold-gradient-text">Escape</span>
                </h2>
                <div className="mt-4 h-0.5 w-16 gold-gradient" />
                <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                  Step outside and into the energy. The Oasis Patio Bar wraps you in lakeside breezes, live music on
                  weekends, and a drink menu that goes way beyond beer and wine. It's the kind of place where one drink
                  turns into a whole evening — and you wouldn't have it any other way.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Cocktails */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <FadeIn direction="right">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold uppercase">
                  Crafted <span className="gold-gradient-text">Cocktails</span>
                </h2>
                <div className="mt-4 h-0.5 w-16 gold-gradient" />
                <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                  Our mixologists don't pour drinks — they create moments. From smoked old fashioneds to tropical
                  frozen concoctions, every sip is an experience. Pair it with the sunset and you've got the perfect evening.
                </p>
                <Link
                  to="/menu"
                  className="mt-8 inline-block px-8 py-4 text-sm font-bold uppercase tracking-widest gold-gradient text-primary-foreground rounded-lg gold-glow-hover hover:scale-105 transition-all duration-300"
                >
                  View Drink Menu
                </Link>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <img src={cocktails} alt="Signature cocktails" className="w-full h-full object-cover" loading="lazy" />
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
              Come See It for Yourself
            </h2>
            <p className="mt-3 text-primary-foreground/80">The patio is calling. Answer it.</p>
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

export default OasisPatioBar;
