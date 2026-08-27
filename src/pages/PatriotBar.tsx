import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { Shield, Heart, Flag } from "lucide-react";
import barImg from "@/assets/bar.jpg";

const PatriotBar = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${barImg})` }} />
        <div className="absolute inset-0 overlay-dark-heavy" />
        <div className="container-site text-center relative z-10">
          <FadeIn>
            <Shield size={40} className="text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              The Patriot <span className="gold-gradient-text">Bar</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Honoring those who serve. Built on respect, gratitude, and community. The Patriot Bar is the indoor bar
              at Elements by 456 in Gun Barrel City, TX dedicated to military, veterans and first responders.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <FadeIn direction="left">
              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <img src={barImg} alt="The Patriot Bar" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold uppercase">
                  More Than a <span className="gold-gradient-text">Bar</span>
                </h2>
                <div className="mt-4 h-0.5 w-16 gold-gradient" />
                <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                  The Patriot Bar is our tribute to the men and women who have served and continue to serve our country.
                  Every detail — from the décor to the atmosphere — reflects our deep respect for the military, first
                  responders, and their families. This isn't just a place to grab a drink. It's a place to feel at home.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary">
        <div className="container-site">
          <SectionHeading title="What We Stand For" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn delay={0}>
              <div className="bg-card rounded-xl p-8 border border-border text-center h-full">
                <Flag size={32} className="text-primary mx-auto mb-4" />
                <h3 className="text-lg font-display font-bold">Honoring Service</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  A space dedicated to recognizing the sacrifices of those who protect our freedom.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="bg-card rounded-xl p-8 border border-border text-center h-full">
                <Heart size={32} className="text-primary mx-auto mb-4" />
                <h3 className="text-lg font-display font-bold">Community First</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  We believe in bringing people together. Veterans, families, and neighbors — all welcome.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="bg-card rounded-xl p-8 border border-border text-center h-full">
                <Shield size={32} className="text-primary mx-auto mb-4" />
                <h3 className="text-lg font-display font-bold">Built with Respect</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Every corner of the Patriot Bar tells a story of courage, pride, and gratitude.
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
              Come Raise a Glass
            </h2>
            <p className="mt-3 text-primary-foreground/80">To those who serve. To those who served. To community.</p>
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

export default PatriotBar;
