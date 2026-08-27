import { Link } from "react-router-dom";
import { Music, Mic, Users } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import GoogleFormEmbed from "@/components/GoogleFormEmbed";
import eventsMusic from "@/assets/events-music.jpg";

// Client-managed Google Form. Questions and responses live in Google Forms.
const ENTERTAINMENT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScCVrTkR7rG4HemYMCMkKVELobnOzIO6UHgd3HDMD5jTvic5g/viewform?embedded=true";
const ENTERTAINMENT_FORM_HEIGHT = 2038;

const whoWeBook = [
  { icon: Music, title: "Bands & Musicians", desc: "Country, rock, blues, acoustic — solo acts to full bands on the patio stage." },
  { icon: Mic, title: "DJs, Comedians & Hosts", desc: "DJ nights, comedy showcases, karaoke and trivia hosts." },
  { icon: Users, title: "Promoters & Event Partners", desc: "Have a show, showcase, or themed night in mind? Let's talk." },
];

const EntertainmentInquiry = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${eventsMusic})` }} />
        <div className="absolute inset-0 overlay-dark-heavy" />
        <div className="relative z-10 text-center container-site pt-20">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              Perform at <span className="gold-gradient-text">Elements</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Are you a musician, band, DJ, comedian, karaoke host, or entertainment provider looking for your next
              venue?
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Who we book */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {whoWeBook.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="bg-card p-6 rounded-xl border border-border text-center h-full">
                  <item.icon size={28} className="mx-auto text-primary mb-3" aria-hidden="true" />
                  <h2 className="text-lg font-display font-bold text-primary">{item.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Form */}
          <FadeIn>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold uppercase">
                Interested in Performing at Elements?
              </h2>
              <div className="mt-4 h-0.5 w-16 gold-gradient mx-auto" />
              <div className="mt-4 text-muted-foreground max-w-2xl mx-auto flex flex-col gap-3">
                <p>
                  Elements By 456 books a variety of live entertainment and special events at our indoor and outdoor
                  spaces in Gun Barrel City. Tell us about your act, experience, availability, and equipment by
                  completing the entertainment inquiry form below.
                </p>
                <p>
                  Submitting an inquiry does not guarantee a booking, but it puts your information directly in front
                  of our events team for consideration.
                </p>
              </div>
            </div>
            <GoogleFormEmbed
              src={ENTERTAINMENT_FORM_URL}
              title="Entertainment inquiry form"
              height={ENTERTAINMENT_FORM_HEIGHT}
            />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Want to see what's on the calendar first?{" "}
              <Link to="/events" className="text-primary font-semibold hover:underline">
                View upcoming events →
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default EntertainmentInquiry;
