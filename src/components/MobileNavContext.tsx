import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

// Shared mobile-menu state so Header (owner of the toggle) and
// MobileBottomCTA (which must hide while the menu is open) stay in sync
// without DOM hacks. Also owns the body scroll lock.
interface MobileNavState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MobileNavContext = createContext<MobileNavState>({ open: false, setOpen: () => {} });

export const MobileNavProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const savedScrollY = useRef(0);

  // Scroll lock: freeze the document at its current position while the menu
  // is open (position:fixed + negative top is the approach that also holds on
  // iOS Safari and Android Chrome), then restore the exact position on close.
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    savedScrollY.current = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${savedScrollY.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      // Restore now, and once more after layout settles (the bottom CTA
      // re-mounts in the same commit and can briefly clamp the max scroll).
      const y = savedScrollY.current;
      // "instant" bypasses the document's scroll-behavior: smooth so the page
      // doesn't visibly glide back to where the user already was.
      window.scrollTo({ top: y, behavior: "instant" });
      requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "instant" }));
    };
  }, [open]);

  return <MobileNavContext.Provider value={{ open, setOpen }}>{children}</MobileNavContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components -- tiny hook co-located with its provider
export const useMobileNav = () => useContext(MobileNavContext);
