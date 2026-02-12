import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Menu", path: "/menu" },
  { name: "Events", path: "/events" },
  { name: "Catering", path: "/catering" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container-site flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Elements by 456" className="h-12 md:h-14 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-body font-medium uppercase tracking-wider transition-colors hover:text-primary ${
                location.pathname === link.path ? "text-primary" : "text-foreground/80"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/reservations"
            className="px-5 py-2.5 text-sm font-semibold uppercase tracking-wider border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Reserve Table
          </Link>
          <a
            href="#order"
            className="px-5 py-2.5 text-sm font-semibold uppercase tracking-wider gold-gradient text-primary-foreground rounded-lg hover:opacity-90 transition-all gold-glow-hover"
          >
            Order Online
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border animate-fade-in">
          <nav className="container-site py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium uppercase tracking-wider py-2 transition-colors ${
                  location.pathname === link.path ? "text-primary" : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <Link
                to="/reservations"
                className="text-center px-5 py-3 text-sm font-semibold uppercase tracking-wider border border-primary text-primary rounded-lg"
              >
                Reserve a Table
              </Link>
              <a
                href="#order"
                className="text-center px-5 py-3 text-sm font-semibold uppercase tracking-wider gold-gradient text-primary-foreground rounded-lg"
              >
                Order Online
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
