import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { ORDER_ONLINE_URL } from "@/lib/siteInfo";
import { useMobileNav } from "@/components/MobileNavContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Menu", path: "/menu" },
  { name: "Specials", path: "/specials" },
  { name: "Events", path: "/events" },
  { name: "Catering", path: "/catering" },
  { name: "Contact", path: "/contact" },
];

const MOBILE_MENU_ID = "mobile-nav";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { open: mobileOpen, setOpen: setMobileOpen } = useMobileNav();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change (covers link taps too).
  useEffect(() => {
    setMobileOpen(false);
  }, [location, setMobileOpen]);

  // Escape closes the menu.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, setMobileOpen]);

  // The open menu always wins over the scroll-position header treatment. When
  // closed, the header keeps its transparent-at-top / solid-when-scrolled look.
  const headerSurface = mobileOpen
    ? "bg-background shadow-none"
    : scrolled
      ? "bg-background/95 backdrop-blur-md shadow-lg"
      : "bg-transparent";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${headerSurface}`}
      >
        <div className="container-site flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" aria-label="Elements by 456 — home">
            <img src={logo} alt="Elements by 456" className="h-16 md:h-20 w-auto mix-blend-lighten" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
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
              href={ORDER_ONLINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm font-semibold uppercase tracking-wider gold-gradient text-primary-foreground rounded-lg hover:opacity-90 transition-all gold-glow-hover"
            >
              Order Online
            </a>
          </div>

          {/* Mobile Hamburger / Close */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-foreground p-2 -mr-2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls={MOBILE_MENU_ID}
          >
            {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu — a full-screen, fully opaque panel that sits BELOW the
          header bar in z-order (so the logo + X stay tappable) and covers the
          entire viewport, independent of the header's scroll-state styling.
          The backdrop is solid from the first frame; only the inner content
          fades in. */}
      {mobileOpen && (
        <div
          id={MOBILE_MENU_ID}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="lg:hidden fixed inset-0 z-40 bg-background flex flex-col"
          style={{ height: "100dvh" }}
        >
          {/* Spacer under the (now solid) header bar so the surfaces read as one */}
          <div className="h-16 md:h-20 flex-shrink-0" aria-hidden="true" />
          <nav
            aria-label="Mobile"
            className="flex-1 overflow-y-auto overscroll-contain container-site py-6 flex flex-col gap-2 animate-fade-in motion-reduce:animate-none"
            style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium uppercase tracking-wider py-3 min-h-[44px] flex items-center transition-colors ${
                  location.pathname === link.path ? "text-primary" : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-5 mt-2 border-t border-border">
              <Link
                to="/reservations"
                className="text-center px-5 py-3.5 min-h-[48px] text-sm font-semibold uppercase tracking-wider border border-primary text-primary rounded-lg"
              >
                Reserve a Table
              </Link>
              <a
                href={ORDER_ONLINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center px-5 py-3.5 min-h-[48px] text-sm font-semibold uppercase tracking-wider gold-gradient text-primary-foreground rounded-lg"
              >
                Order Online
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
