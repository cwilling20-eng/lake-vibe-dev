import { Link } from "react-router-dom";
import { MapPin, Phone, Clock } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container-site section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img src={logo} alt="Elements by 456" className="h-20 w-auto mb-4 mix-blend-lighten" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Gun Barrel City's ultimate lakefront social destination. Strong drinks. Bold food. Big vibes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary font-display text-lg mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { name: "Menu", path: "/menu" },
                { name: "Reservations", path: "/reservations" },
                { name: "Events", path: "/events" },
                { name: "Catering", path: "/catering" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
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
                <span>456 Gun Barrel Ln<br />Gun Barrel City, TX 75156</span>
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
              {[
                ["Monday", "5pm – 9pm"],
                ["Tuesday", "Closed"],
                ["Wednesday", "5pm – 9pm"],
                ["Thursday", "5pm – 9pm"],
                ["Friday", "5pm – 10pm"],
                ["Saturday", "11am – 10pm"],
                ["Sunday", "11am – 8pm"],
              ].map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span>{day}</span>
                  <span className={hours === "Closed" ? "text-destructive" : ""}>{hours}</span>
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
