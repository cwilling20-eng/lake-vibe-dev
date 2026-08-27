import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import EventsExplorer from "@/components/events/EventsExplorer";
import { CALENDAR_PUBLIC_URL } from "@/lib/events/calendar";
import elementsLiveMusic from "@/assets/Elements Live Music.webp";

// Every event on this page comes from the client's Google Calendar via
// /api/events. Nothing event-related is hardcoded here.
const Events = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${elementsLiveMusic})` }} />
        <div className="absolute inset-0 overlay-dark-heavy" />
        <div className="relative z-10 text-center container-site pt-20">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              There’s Always Something <span className="gold-gradient-text">Happening</span>
            </h1>
            <div className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto flex flex-col gap-3">
              <p>
                Live music, karaoke, comedy, themed nights, and special events—boring evenings don’t get much attention
                around here.
              </p>
              <p>
                Explore the upcoming lineup at Elements By 456 in Gun Barrel City and make plans before somebody else
                gets your favorite table. Our calendar is updated regularly with the latest dates, times, and event
                details.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <SectionHeading
            title="What's Happening at Elements"
            subtitle="All times are local to Gun Barrel City."
          />
          <EventsExplorer />
          <FadeIn>
            <p className="mt-10 text-center text-sm text-muted-foreground">
              <CalendarDays size={14} className="inline-block text-primary mr-1.5 -mt-0.5" aria-hidden="true" />
              <a
                href={CALENDAR_PUBLIC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                Open the full calendar
              </a>{" "}
              to add any event to your own Google Calendar.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Explore by type */}
      <section className="section-padding bg-secondary">
        <div className="container-site">
          <SectionHeading title="Find Your Night" subtitle="Every kind of good time, all in one place." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Live Music", desc: "Local and touring acts on the patio stage.", link: "/live-music" },
              { title: "Karaoke Nights", desc: "Take the mic. Own the room.", link: "/karaoke-night" },
              { title: "Private Events & Parties", desc: "Birthdays, corporate events, lake celebrations — we handle the rest.", link: "/catering" },
              { title: "Perform at Elements", desc: "Musicians, DJs, comedians — bring your act to the lake.", link: "/entertainment-inquiry" },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.1}>
                <Link
                  to={card.link}
                  className="group block bg-card rounded-xl p-6 border border-border hover:border-primary/40 transition-all h-full"
                >
                  <h3 className="text-xl font-display font-bold text-primary">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{card.desc}</p>
                  <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-primary group-hover:underline">
                    Learn more →
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 gold-gradient">
        <div className="container-site text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase text-primary-foreground">
              Want to Host Your Event Here?
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/catering"
                className="px-8 py-4 text-sm font-bold uppercase tracking-widest bg-background text-foreground rounded-lg hover:bg-background/90 transition-all"
              >
                Book a Private Event
              </Link>
              <Link
                to="/entertainment-inquiry"
                className="px-8 py-4 text-sm font-bold uppercase tracking-widest border-2 border-primary-foreground text-primary-foreground rounded-lg hover:bg-primary-foreground hover:text-primary transition-all"
              >
                Interested in Performing?
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
