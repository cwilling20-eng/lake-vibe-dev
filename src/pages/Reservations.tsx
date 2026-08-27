import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Phone } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const TOAST_RESERVE_SCRIPT = "https://toast.app/scripts/widgets/reserve.js";
const TOAST_RESTAURANT_GUID = "705f52d9-b5cb-499f-9046-a75d820a8c85";

const Reservations = () => {
  // Load the Toast reservations widget. The script reads data-restaurant-guid
  // and renders into #toast-booking-widget.
  useEffect(() => {
    const script = document.createElement("script");
    script.src = TOAST_RESERVE_SCRIPT;
    script.async = true;
    script.setAttribute("data-restaurant-guid", TOAST_RESTAURANT_GUID);
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

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
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Walk-ins welcome. Reservations guaranteed. Book a table online at Elements by 456 in Gun Barrel City, TX
              — the fastest way to lock in your spot on live music, karaoke and comedy nights.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-site max-w-2xl">
          <FadeIn>
            <div className="bg-card rounded-xl p-6 md:p-8 border border-border">
              <div id="toast-booking-widget" />
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Trouble booking online?{" "}
                <a
                  href="tel:9039107666"
                  className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
                >
                  <Phone size={14} /> (903) 910-7666
                </a>
              </p>
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
