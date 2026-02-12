import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileBottomCTA from "./MobileBottomCTA";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileBottomCTA />
      {/* Spacer for mobile bottom CTA */}
      <div className="h-14 lg:hidden" />
    </div>
  );
};

export default Layout;
