import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Phone } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Reservations = () => {
  return (
    <Layout>
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 overlay-dark-heavy" />
        <div className="relative z-10 text-center container-site pt-20">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              Lock In Your <span className="gold-gradient-text">Table</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">Walk-ins welcome. Reservations guaranteed.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-site max-w-2xl">
          <FadeIn>
            <div className="bg-card rounded-xl p-8 border border-border text-center">
              <h2 className="text-2xl font-display font-bold mb-4">Reservation Platform Coming Soon</h2>
              <p className="text-muted-foreground mb-6">
                Our online reservation system is being set up. In the meantime, give us a call to reserve your spot.
              </p>
              <a
                href="tel:9039107666"
                className="inline-flex items-center gap-2 px-8 py-4 gold-gradient text-primary-foreground text-sm font-bold uppercase tracking-widest rounded-lg gold-glow-hover hover:scale-105 transition-all"
              >
                <Phone size={18} />
                (903) 910-7666
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-10 text-center">
              <h3 className="text-xl font-display font-bold mb-3">Special Occasions?</h3>
              <p className="text-muted-foreground mb-4">Birthdays, anniversaries, celebrations — we'll make it unforgettable.</p>
              <Link to="/catering" className="text-primary font-semibold hover:underline">
                Explore Private Events →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Reservations;
