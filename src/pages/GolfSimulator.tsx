import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { Target, Users, DollarSign } from "lucide-react";
import golfSim from "@/assets/golf-sim.jpg";

const pricingTiers = [
  { title: "Casual Play", duration: "1 Hour", price: "$40/hr", desc: "Drop in and play. Up to 4 players per session." },
  { title: "Party Package", duration: "2 Hours", price: "$150", desc: "Includes sim time, appetizer platter, and a pitcher. Perfect for groups of 6–8." },
  { title: "Private Event", duration: "3+ Hours", price: "Custom", desc: "Full room buyout with custom food & drink packages. Contact us to build your event." },
];

const GolfSimulator = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${golfSim})` }} />
        <div className="absolute inset-0 overlay-dark-heavy" />
        <div className="container-site text-center relative z-10">
          <FadeIn>
            <Target size={40} className="text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              Private Golf <span className="gold-gradient-text">Simulator Room</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">Tee off without leaving the bar.</p>
          </FadeIn>
        </div>
      </section>

      {/* Ideal For */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <FadeIn direction="left">
              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <img src={golfSim} alt="Golf simulator room" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Users size={24} className="text-primary" />
                  <h2 className="text-3xl md:text-4xl font-display font-bold uppercase">
                    Perfect for <span className="gold-gradient-text">Any Group</span>
                  </h2>
                </div>
                <div className="mt-2 h-0.5 w-16 gold-gradient" />
                <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                  Whether it's a birthday party, bachelor bash, corporate team-building, or just a round with friends —
                  our private golf simulator room delivers the full experience. Play world-famous courses, run closest-to-the-pin
                  contests, and enjoy food & drinks right in the room.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-secondary">
        <div className="container-site">
          <SectionHeading title="Pricing & Packages" subtitle="Flexible options for every occasion." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, i) => (
              <FadeIn key={tier.title} delay={i * 0.1}>
                <div className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign size={16} className="text-primary" />
                    <span className="text-primary font-display text-2xl font-bold">{tier.price}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold">{tier.title}</h3>
                  <p className="text-sm text-primary/80 uppercase tracking-wider mt-1">{tier.duration}</p>
                  <p className="mt-3 text-muted-foreground leading-relaxed flex-1">{tier.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Inquiry */}
      <section className="section-padding bg-background">
        <div className="container-site max-w-2xl">
          <SectionHeading title="Book the Room" subtitle="Fill out the form and we'll get back to you." />
          <FadeIn>
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Name" className="bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
              <input type="email" placeholder="Email Address" className="bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
              <input type="tel" placeholder="Phone Number" className="bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
              <input type="text" placeholder="Preferred Date & Time" className="bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
              <input type="number" placeholder="Group Size" className="bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
              <textarea placeholder="Any special requests?" rows={4} className="bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none" />
              <button type="submit" className="px-8 py-4 text-sm font-bold uppercase tracking-widest gold-gradient text-primary-foreground rounded-lg gold-glow-hover hover:scale-105 transition-all duration-300">
                Submit Inquiry
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gold-gradient">
        <div className="container-site text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase text-primary-foreground">
              Ready to Tee Off?
            </h2>
            <p className="mt-3 text-primary-foreground/80">Book the room. Bring the crew. We'll handle the rest.</p>
            <Link
              to="/contact"
              className="mt-6 inline-block px-8 py-4 bg-background text-foreground text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-background/90 transition-all"
            >
              Contact Us
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default GolfSimulator;
