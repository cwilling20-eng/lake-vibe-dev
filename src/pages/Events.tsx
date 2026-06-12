import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Music, Mic, PartyPopper } from "lucide-react";
import eventsMusic from "@/assets/events-music.jpg";
import privateEventsImg from "@/assets/private-events.jpg";
import karaokeFlyer from "@/assets/686541286_122145158900414446_7514774014079256357_n.webp";
import djToriFlyer from "@/assets/704427214_27222040184152194_368634848445025664_n.webp";

const events = [
  {
    title: "Themed Night Karaoke",
    when: "Every Thursday · 6–9pm",
    desc: "Take the mic. Own the room. From country classics to 90s hip-hop — it's your stage. Plus $12 street tacos and $5 margaritas all night.",
    img: karaokeFlyer,
    icon: Mic,
    link: "/karaoke-night",
    flyer: true,
  },
  {
    title: "DJ Tori",
    when: "Every Friday · 7–11pm",
    desc: "DJ Tori takes over every Friday night — top hits, great vibes, and unforgettable nights on Cedar Creek Lake.",
    img: djToriFlyer,
    icon: Music,
    link: "/reservations",
    flyer: true,
  },
  {
    title: "Live Music",
    when: "Every Saturday · 7–11pm · Last Saturday of the month: Comedy Show Night",
    desc: "Local bands and touring acts hit the stage under the stars. Grab a drink, grab a seat, and let the music move you.",
    img: eventsMusic,
    icon: Music,
    link: "/live-music",
    flyer: false,
  },
  {
    title: "Private Events & Parties",
    when: "Book anytime",
    desc: "Birthdays, corporate events, lake celebrations — we'll handle the food, drinks, and vibes. You just show up.",
    img: privateEventsImg,
    icon: PartyPopper,
    link: "/catering",
    flyer: false,
  },
];

const Events = () => {
  return (
    <Layout>
      <section className="pt-28 pb-8 bg-background">
        <div className="container-site text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              Always Something <span className="gold-gradient-text">Happening</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">Karaoke. DJ nights. Live music. Good times.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-site flex flex-col gap-12">
          {events.map((event, i) => (
            <FadeIn key={event.title} delay={i * 0.1}>
              <Link to={event.link} className="block group">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    {event.flyer ? (
                      // Portrait poster — contain (don't stretch), centered on a card panel.
                      <div className="rounded-xl border border-border bg-card overflow-hidden flex items-center justify-center p-4">
                        <img
                          src={event.img}
                          alt={event.title}
                          className="max-h-[26rem] w-auto object-contain rounded-md transition-transform duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <img
                        src={event.img}
                        alt={event.title}
                        className="w-full rounded-xl aspect-[16/10] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="flex items-center gap-3 mb-3">
                      <event.icon size={24} className="text-primary" />
                      <h2 className="text-2xl md:text-3xl font-display font-bold group-hover:text-primary transition-colors">{event.title}</h2>
                    </div>
                    <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">{event.when}</p>
                    <p className="text-muted-foreground text-lg leading-relaxed">{event.desc}</p>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="py-16 gold-gradient">
        <div className="container-site text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase text-primary-foreground">Want to Host Your Event Here?</h2>
            <Link to="/catering" className="mt-6 inline-block px-8 py-4 bg-background text-foreground text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-background/90 transition-all">
              Book a Private Event
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
