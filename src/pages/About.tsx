import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import patio from "@/assets/patio.jpg";
import bar from "@/assets/bar.jpg";
import eventsMusic from "@/assets/events-music.jpg";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${patio})` }} />
        <div className="absolute inset-0 overlay-dark-heavy" />
        <div className="relative z-10 text-center container-site pt-20">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              Where Lake Life Meets <span className="gold-gradient-text">Nightlife</span>
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="container-site max-w-3xl text-center">
          <FadeIn>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Elements by 456 isn't just a restaurant — it's a destination. We built this place for
              the lake lovers, the music fans, the foodies, and the people who know that the best nights
              start with great food and even better company. Fresh ingredients. Indoor and outdoor vibes.
              The largest bar on the lake. And an energy you won't find anywhere else on Cedar Creek.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Our Bars */}
      <section className="section-padding bg-secondary">
        <div className="container-site">
          <SectionHeading title="Our Bars" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn>
              <div className="rounded-xl overflow-hidden">
                <img src={patio} alt="Oasis Patio Bar" className="w-full aspect-[4/3] object-cover" loading="lazy" />
                <div className="p-6 bg-card">
                  <h3 className="text-xl font-display font-bold text-primary">Oasis Patio Bar</h3>
                  <p className="mt-2 text-muted-foreground">The crown jewel. The largest and most beautiful outdoor bar on Cedar Creek Lake. String lights, stone floors, tropical vibes, and cold drinks flowing all night long.</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-xl overflow-hidden">
                <img src={bar} alt="Patriot Bar" className="w-full aspect-[4/3] object-cover" loading="lazy" />
                <div className="p-6 bg-card">
                  <h3 className="text-xl font-display font-bold text-primary">Patriot Bar</h3>
                  <p className="mt-2 text-muted-foreground">Dedicated to the men and women who serve. A space of respect, community, and camaraderie — with killer drinks to match.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Our Energy */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <FadeIn direction="left">
              <img src={eventsMusic} alt="Live music" className="w-full rounded-xl aspect-[4/3] object-cover" loading="lazy" />
            </FadeIn>
            <FadeIn direction="right">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold uppercase">Our <span className="gold-gradient-text">Energy</span></h2>
                <div className="mt-4 h-0.5 w-16 gold-gradient" />
                <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                  Live music on the patio stage. Karaoke nights. Comedy shows. And an atmosphere that turns strangers into friends. This is what lake life is all about.
                </p>
                <Link to="/events" className="mt-6 inline-block text-primary font-semibold hover:underline">
                  See what's coming up →
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
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase text-primary-foreground">Come See For Yourself</h2>
            <Link to="/reservations" className="mt-6 inline-block px-8 py-4 bg-background text-foreground text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-background/90 transition-all">
              Reserve a Table
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default About;
