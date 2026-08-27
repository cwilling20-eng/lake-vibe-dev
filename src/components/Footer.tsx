import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";
import { HOURS, ADDRESS_LINE_1, CITY_STATE_ZIP, SOCIAL_LINKS } from "@/lib/siteInfo";

// lucide has no TikTok glyph; a minimal inline mark keeps the icon set consistent.
const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.5 2h-3.1v13.2a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.2a6.1 6.1 0 1 0 5.1 6V8.6a7.2 7.2 0 0 0 4.3 1.4V6.9A4.4 4.4 0 0 1 16.5 2z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container-site section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img src={logo} alt="Elements by 456" className="h-20 w-auto mb-4 mix-blend-lighten" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Cedar Creek Lake's go-to spot for elevated comfort food, handcrafted cocktails, and unforgettable nights.
            </p>
            <div className="mt-4 flex items-center gap-3">
              {[
                { name: "Facebook", href: SOCIAL_LINKS.facebook, Icon: Facebook },
                { name: "Instagram", href: SOCIAL_LINKS.instagram, Icon: Instagram },
                { name: "TikTok", href: SOCIAL_LINKS.tiktok, Icon: TikTokIcon },
              ].map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Elements by 456 on ${name}`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary font-display text-lg mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { name: "Menu", path: "/menu" },
                { name: "Reservations", path: "/reservations" },
                { name: "Events", path: "/events" },
                { name: "Catering & Private Events", path: "/catering" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Perform at Elements", path: "/entertainment-inquiry" },
                { name: "Join Our Team", path: "/careers" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-primary font-display text-lg mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span>{ADDRESS_LINE_1}<br />{CITY_STATE_ZIP}</span>
              </div>
              <a href="tel:9039107666" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone size={16} className="text-primary flex-shrink-0" />
                (903) 910-7666
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-primary font-display text-lg mb-4">Hours</h4>
            <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={16} className="text-primary flex-shrink-0" />
                <span className="font-medium text-foreground">Weekly Schedule</span>
              </div>
              {HOURS.map(([day, time]) => (
                <div key={day} className="flex justify-between">
                  <span>{day}</span>
                  <span className={time === "Closed" ? "text-destructive" : ""}>{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Elements by 456. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
