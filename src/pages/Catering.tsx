import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import GoogleFormEmbed from "@/components/GoogleFormEmbed";
import FaqSection from "@/components/FaqSection";
import { CATERING_FAQS } from "@/lib/seo";
import privateEvents from "@/assets/private-events.jpg";

// Client-managed Google Form. Questions and responses live in Google Forms —
// the client edits the form there; nothing on the site needs to change.
const CATERING_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdJaf3b8aUJ1rVwZnZjpS8OjayH1ATxfXcpMyA1vnEL9OQi3g/viewform?embedded=true";
const CATERING_FORM_HEIGHT = 5373;

const Catering = () => {
  return (
    <Layout>
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${privateEvents})` }} />
        <div className="absolute inset-0 overlay-dark-heavy" />
        <div className="relative z-10 text-center container-site pt-20">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              Make Your Event An <span className="gold-gradient-text">Elements Event</span>
            </h1>
            <div className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto flex flex-col gap-3">
              <p>
                From birthdays, showers, and anniversary celebrations to corporate gatherings, luncheons, and holiday
                parties, Elements By 456 makes hosting easy.
              </p>
              <p>
                Celebrate with us in Gun Barrel City with private-event space, customized food options, and full bar
                service. Need us to bring the food to you? On-site and off-site catering options are also available.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-site">
          <SectionHeading title="What We Offer" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Private Parties", desc: "Birthdays, showers, and anniversary celebrations with full bar service." },
              { title: "Corporate & Business", desc: "Corporate gatherings, luncheons, and holiday parties done right." },
              { title: "On-Site & Off-Site Catering", desc: "Celebrate with us, or let us bring the food to you." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="bg-card p-6 rounded-xl border border-border text-center">
                  <h3 className="text-lg font-display font-bold text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold uppercase">Request a Booking</h2>
              <div className="mt-4 h-0.5 w-16 gold-gradient mx-auto" />
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Tell us about your event and we'll get back to you within 24 hours. Prefer to talk?{" "}
                <a href="tel:9039107666" className="text-primary font-semibold hover:underline">
                  (903) 910-7666
                </a>
              </p>
            </div>
            <GoogleFormEmbed
              src={CATERING_FORM_URL}
              title="Catering and private event inquiry form"
              height={CATERING_FORM_HEIGHT}
            />
          </FadeIn>
        </div>
      </section>

      <FaqSection title="Private Event FAQ" faqs={CATERING_FAQS} className="bg-secondary" />
    </Layout>
  );
};

export default Catering;
