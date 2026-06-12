import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { Music, Mic, PartyPopper } from "lucide-react";
import eventsMusic from "@/assets/events-music.jpg";
import karaoke from "@/assets/karaoke.jpg";
import privateEventsImg from "@/assets/private-events.jpg";

const events = [
  {
    title: "Live Music",
    when: "Every Friday & Saturday",
    desc: "Local bands and touring acts hit the stage under the stars. Grab a drink, grab a seat, and let the music move you.",
    img: eventsMusic,
    icon: Music,
    link: "/live-music",
  },
  {
    title: "Themed Night Karaoke",
    when: "Every Thursday",
    desc: "Take the mic. Own the room. From country classics to 90s hip-hop — it's your stage.",
    img: karaoke,
    icon: Mic,
    link: "/karaoke-night",
  },
  {
    title: "Private Events & Parties",
    when: "Book anytime",
    desc: "Birthdays, corporate events, lake celebrations — we'll handle the food, drinks, and vibes. You just show up.",
    img: privateEventsImg,
    icon: PartyPopper,
    link: "/catering",
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
            <p className="mt-4 text-muted-foreground text-lg">Live music. Karaoke. Good times.</p>
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
                    <img src={event.img} alt={event.title} className="w-full rounded-xl aspect-[16/10] object-cover group-hover:scale-[1.02] transition-transform duration-300" loading="lazy" />
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
