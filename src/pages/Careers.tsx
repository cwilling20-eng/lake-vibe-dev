import { Link } from "react-router-dom";
import { Sun, Users, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import GoogleFormEmbed from "@/components/GoogleFormEmbed";
import barPatio from "@/assets/Bar Patio.webp";

// Client-managed Google Form. Questions and applications live in Google Forms.
const CAREERS_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeDxbOl6MWfKnNwOU8xbq-IK3FP-cRMXLQPhr97xBpliajsYA/viewform?embedded=true";
const CAREERS_FORM_HEIGHT = 985;

const perks = [
  { icon: Sun, title: "Work on the Lake", desc: "Your office is the largest patio bar on Cedar Creek Lake." },
  { icon: Users, title: "A Real Team", desc: "Front of house, back of house, bar — we show up for each other." },
  { icon: TrendingUp, title: "Room to Grow", desc: "Busy nights, big events, and plenty of chances to step up." },
];

const Careers = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${barPatio})` }} />
        <div className="absolute inset-0 overlay-dark-heavy" />
        <div className="relative z-10 text-center container-site pt-20">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              Join Our <span className="gold-gradient-text">Team</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Servers, bartenders, cooks, hosts — if you bring the energy, we'll bring the lake.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {perks.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="bg-card p-6 rounded-xl border border-border text-center h-full">
                  <item.icon size={28} className="mx-auto text-primary mb-3" aria-hidden="true" />
                  <h2 className="text-lg font-display font-bold text-primary">{item.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold uppercase">Apply Now</h2>
              <div className="mt-4 h-0.5 w-16 gold-gradient mx-auto" />
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Fill out the short application below and we'll be in touch.
              </p>
            </div>
            <GoogleFormEmbed src={CAREERS_FORM_URL} title="Employment application form" height={CAREERS_FORM_HEIGHT} />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Questions?{" "}
              <Link to="/contact" className="text-primary font-semibold hover:underline">
                Contact us →
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
