import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileBottomCTA from "./MobileBottomCTA";
import { MobileNavProvider } from "./MobileNavContext";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <MobileNavProvider>
      <div className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:font-semibold"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileBottomCTA />
        {/* Spacer for mobile bottom CTA */}
        <div className="h-14 lg:hidden" />
      </div>
    </MobileNavProvider>
  );
};

export default Layout;
