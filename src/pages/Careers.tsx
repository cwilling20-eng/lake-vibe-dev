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

// Client-approved copy (authoritative).
const perks = [
  { icon: Sun, title: "Never a Dull Shift", desc: "From brunch and busy dinner services to live music, comedy, private parties, and special events, no two shifts are exactly alike." },
  { icon: Users, title: "One Team, One Goal", desc: "Front of house, kitchen, and bar work together to give every guest a reason to come back." },
  { icon: TrendingUp, title: "Opportunities to Grow", desc: "Build valuable hospitality experience, strengthen your skills, and take on more responsibility as opportunities become available." },
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
              Join the <span className="gold-gradient-text">Elements Team</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Good food, busy nights, live entertainment, and a team that knows how to work hard without making work
              miserable.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-site">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center text-lg text-muted-foreground leading-relaxed flex flex-col gap-5 mb-16">
              <p>
                Elements By 456 is a locally owned restaurant and entertainment destination serving the Cedar Creek Lake
                community in Gun Barrel City. We’re always interested in meeting dependable, hardworking people with a
                positive attitude and a heart for hospitality.
              </p>
              <p>
                Whether you’re experienced or ready to learn, if you can bring the energy, take care of our guests, and
                show up for your team, we’d love to hear from you.
              </p>
            </div>
          </FadeIn>
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
