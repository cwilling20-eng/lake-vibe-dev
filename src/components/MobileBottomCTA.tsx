import { ORDER_ONLINE_URL } from "@/lib/siteInfo";
import { useMobileNav } from "@/components/MobileNavContext";

const MobileBottomCTA = () => {
  const { open } = useMobileNav();
  // The open mobile menu already contains Order Online — don't double up.
  if (open) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <a
        href={ORDER_ONLINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-4 text-center text-sm font-bold uppercase tracking-widest gold-gradient text-primary-foreground gold-glow"
      >
        Order Online
      </a>
    </div>
  );
};

export default MobileBottomCTA;
