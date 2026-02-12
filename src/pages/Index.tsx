import { Link } from "react-router-dom";
import { ChevronDown, Music, Mic, Target, PartyPopper, Star, Utensils, Beer, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import heroBg from "@/assets/hero-bg.jpg";
import patio from "@/assets/patio.jpg";
import bar from "@/assets/bar.jpg";
import cocktails from "@/assets/cocktails.jpg";
import foodBurger from "@/assets/food-burger.jpg";
import foodSteak from "@/assets/food-steak.jpg";
import eventsMusic from "@/assets/events-music.jpg";
import karaoke from "@/assets/karaoke.jpg";
import golfSim from "@/assets/golf-sim.jpg";
import privateEvents from "@/assets/private-events.jpg";

const experienceBlocks = [
  { title: "Oasis Patio Bar", desc: "The largest and most beautiful bar on the lake.", img: patio, link: "/oasis-patio-bar" },
  { title: "Patriot Bar", desc: "Honoring our service men and women.", img: bar, link: "/patriot-bar" },
  { title: "Craft Cocktails", desc: "Our mixologists don't pour drinks. They create moments.", img: cocktails, link: "/menu" },
];

const eventCards = [
  { title: "Live Music", sub: "Friday & Saturday", img: eventsMusic, icon: Music, link: "/live-music" },
  { title: "Themed Night Karaoke", sub: "Thursday", img: karaoke, icon: Mic, link: "/karaoke-night" },
  { title: "Golf Simulator Room", sub: "Private bookings available", img: golfSim, icon: Target, link: "/golf-simulator" },
  { title: "Private Events", sub: "Parties & Celebrations", img: privateEvents, icon: PartyPopper, link: "/catering" },
];

const signatureDishes = [
  { name: "Mother Clucker", desc: "Crispy fried chicken or grilled topped with pickles and garlic aioli on a brioche bun.", price: "$13" },
  { name: "Brisket Jam Burger", desc: "Smoked brisket, rich bacon jam, melted cheddar, and roasted garlic aioli.", price: "$18" },
  { name: "Queso Gone Wild", desc: "Smoked brisket folded into creamy queso with pico de gallo and jalapeños.", price: "$14" },
  { name: "Cinnamon Crunch Cake", desc: "Our legendary dessert. Sweet, crunchy, and absolutely addictive.", price: "$10" },
];

const hours = [
  ["Monday", "5pm – 9pm"],
  ["Tuesday", "Closed"],
  ["Wednesday", "5pm – 9pm"],
  ["Thursday", "5pm – 9pm"],
  ["Friday", "5pm – 10pm"],
  ["Saturday", "11am – 10pm"],
  ["Sunday", "11am – 8pm"],
];

const Index = () => {
  return (
    <Layout>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            name: "Elements by 456",
            image: heroBg,
            address: {
              "@type": "PostalAddress",
              streetAddress: "456 Gun Barrel Ln",
              addressLocality: "Gun Barrel City",
              addressRegion: "TX",
              postalCode: "75156",
            },
            telephone: "+19039107666",
            servesCuisine: "American",
            priceRange: "$$",
            openingHoursSpecification: [
              { dayOfWeek: "Monday", opens: "17:00", closes: "21:00" },
              { dayOfWeek: "Wednesday", opens: "17:00", closes: "21:00" },
              { dayOfWeek: "Thursday", opens: "17:00", closes: "21:00" },
              { dayOfWeek: "Friday", opens: "17:00", closes: "22:00" },
              { dayOfWeek: "Saturday", opens: "11:00", closes: "22:00" },
              { dayOfWeek: "Sunday", opens: "11:00", closes: "20:00" },
            ],
          }),
        }}
      />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 overlay-dark-heavy" />
        <div className="relative z-10 text-center container-site">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold uppercase leading-tight"
          >
            Strong Drinks.<br />
            <span className="gold-gradient-text">Bold Flavor.</span><br />
            Big Vibes.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto"
          >
            Gun Barrel City's ultimate lakefront social destination.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/reservations"
              className="px-8 py-4 text-sm font-bold uppercase tracking-widest gold-gradient text-primary-foreground rounded-lg gold-glow-hover hover:scale-105 transition-all duration-300"
            >
              Reserve a Table
            </Link>
            <a
              href="#order"
              className="px-8 py-4 text-sm font-bold uppercase tracking-widest border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Order Online
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown size={28} className="text-primary animate-scroll-indicator" />
        </motion.div>
      </section>

      {/* FIRST TIME HERE? */}
      <section className="section-padding bg-secondary">
        <div className="container-site">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase">
                First Time <span className="gold-gradient-text">Here?</span>
              </h2>
              <div className="mt-4 h-0.5 w-16 gold-gradient mx-auto" />
              <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                Welcome to Elements by 456 — Gun Barrel City's premier lakefront destination for great food,
                craft cocktails, and unforgettable nights. Here's what you're in for:
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                {[
                  { icon: Utensils, text: "Indoor + Patio Dining" },
                  { icon: Beer, text: "Largest Bar on Cedar Creek Lake" },
                  { icon: Music, text: "Live Music Friday & Saturday" },
                  { icon: Mic, text: "Themed Night Karaoke Thursday" },
                  { icon: Target, text: "Private Golf Simulator Room" },
                  { icon: Sparkles, text: "Elevated Comfort Food + Crafted Cocktails" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3 py-2">
                    <item.icon size={18} className="text-primary flex-shrink-0" />
                    <span className="text-foreground/90 font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.3}>
              <a
                href="#events"
                className="mt-10 inline-block px-8 py-4 text-sm font-bold uppercase tracking-widest gold-gradient text-primary-foreground rounded-lg gold-glow-hover hover:scale-105 transition-all duration-300"
              >
                Explore What's Happening
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* THE EXPERIENCE */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <SectionHeading title="The Experience" subtitle="Three ways to feel the energy." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experienceBlocks.map((block, i) => (
              <FadeIn key={block.title} delay={i * 0.15}>
                <Link to={block.link} className="group relative rounded-xl overflow-hidden aspect-[4/5] cursor-pointer block">
                  <img
                    src={block.img}
                    alt={block.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-display font-bold text-primary">{block.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{block.desc}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FOOD SECTION */}
      <section className="section-padding bg-secondary">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <FadeIn direction="left">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <img src={foodBurger} alt="Signature burger" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase">
                  Food That Hits <span className="gold-gradient-text">Different</span>
                </h2>
                <div className="mt-4 h-0.5 w-16 gold-gradient" />
                <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                  Comfort food, elevated. From brunch to dinner, every dish is made with fresh, quality
                  ingredients and bold Texas flavor. We fry everything in beef tallow — you'll taste the difference.
                </p>
                <Link
                  to="/menu"
                  className="mt-8 inline-block px-8 py-4 text-sm font-bold uppercase tracking-widest gold-gradient text-primary-foreground rounded-lg gold-glow-hover hover:scale-105 transition-all duration-300"
                >
                  View Full Menu
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="section-padding bg-background">
        <div className="container-site">
          <SectionHeading title="Always Something Happening" subtitle="Live music. Karaoke. Golf. Good times." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {eventCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.1}>
                <Link to={card.link} className="group relative rounded-xl overflow-hidden aspect-[16/10] cursor-pointer block">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <card.icon size={18} className="text-primary" />
                        <h3 className="text-lg font-display font-bold">{card.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{card.sub}</p>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary border border-primary px-3 py-1.5 rounded-md group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      Learn More
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNATURE DISHES */}
      <section className="section-padding bg-secondary">
        <div className="container-site">
          <SectionHeading title="Signature Dishes" subtitle="Fan favorites that keep 'em coming back." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {signatureDishes.map((dish, i) => (
              <FadeIn key={dish.name} delay={i * 0.1}>
                <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <Star size={14} className="text-primary fill-primary" />
                    <span className="text-primary font-display text-2xl font-bold">{dish.price}</span>
                  </div>
                  <h3 className="text-lg font-display font-bold">{dish.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{dish.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION & HOURS */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <SectionHeading title="Find Us" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <FadeIn direction="left">
              <div>
                <div className="mb-6">
                  <h3 className="font-display text-xl font-bold mb-2">Address</h3>
                  <p className="text-muted-foreground">456 Gun Barrel Ln<br />Gun Barrel City, TX 75156</p>
                  <a href="tel:9039107666" className="inline-block mt-2 text-primary font-semibold hover:underline">
                    (903) 910-7666
                  </a>
                </div>
                <div className="rounded-xl overflow-hidden aspect-[16/10] bg-card border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3370.8!2d-96.1!3d32.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDE4JzAwLjAiTiA5NsKwMDYnMDAuMCJX!5e0!3m2!1sen!2sus!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Elements by 456 Location"
                  />
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div>
                <h3 className="font-display text-xl font-bold mb-4">Hours</h3>
                <div className="flex flex-col gap-3">
                  {hours.map(([day, time]) => (
                    <div
                      key={day}
                      className="flex justify-between items-center py-2 border-b border-border last:border-0"
                    >
                      <span className="font-medium">{day}</span>
                      <span className={`${time === "Closed" ? "text-destructive" : "text-muted-foreground"}`}>
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 rounded-xl gold-gradient">
                  <h4 className="font-display text-xl font-bold text-primary-foreground">Make a Reservation</h4>
                  <p className="mt-2 text-primary-foreground/80 text-sm">
                    Lock in your spot. Walk-ins welcome, but reservations guarantee your table.
                  </p>
                  <Link
                    to="/reservations"
                    className="mt-4 inline-block px-6 py-3 bg-background text-foreground text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-background/90 transition-all"
                  >
                    Reserve Now
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-20 gold-gradient relative overflow-hidden">
        <div className="container-site text-center relative z-10">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase text-primary-foreground">
              You're Table Is Waiting.
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/reservations"
                className="px-8 py-4 text-sm font-bold uppercase tracking-widest bg-background text-foreground rounded-lg hover:bg-background/90 transition-all"
              >
                Reserve Now
              </Link>
              <a
                href="#order"
                className="px-8 py-4 text-sm font-bold uppercase tracking-widest border-2 border-primary-foreground text-primary-foreground rounded-lg hover:bg-primary-foreground hover:text-primary transition-all"
              >
                Order Online
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
