import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Seo from "./components/Seo";
import Index from "./pages/Index";

const About = lazy(() => import("./pages/About"));
const MenuPage = lazy(() => import("./pages/MenuPage"));
const Specials = lazy(() => import("./pages/Specials"));
const Events = lazy(() => import("./pages/Events"));
const Reservations = lazy(() => import("./pages/Reservations"));
const Catering = lazy(() => import("./pages/Catering"));
const Contact = lazy(() => import("./pages/Contact"));
const LiveMusic = lazy(() => import("./pages/LiveMusic"));
const KaraokeNight = lazy(() => import("./pages/KaraokeNight"));
const OasisPatioBar = lazy(() => import("./pages/OasisPatioBar"));
const PatriotBar = lazy(() => import("./pages/PatriotBar"));
const EntertainmentInquiry = lazy(() => import("./pages/EntertainmentInquiry"));
const Careers = lazy(() => import("./pages/Careers"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Everything except the router, so the same tree can be rendered inside a
// BrowserRouter (client) or a StaticRouter (build-time prerender).
export const AppShell = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollToTop />
      <Seo />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/specials" element={<Specials />} />
          <Route path="/events" element={<Events />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/live-music" element={<LiveMusic />} />
          <Route path="/karaoke-night" element={<KaraokeNight />} />
          <Route path="/oasis-patio-bar" element={<OasisPatioBar />} />
          <Route path="/patriot-bar" element={<PatriotBar />} />
          <Route path="/entertainment-inquiry" element={<EntertainmentInquiry />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default App;
