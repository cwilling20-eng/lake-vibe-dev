import { useState } from "react";

interface GoogleFormEmbedProps {
  /** The `?embedded=true` viewform URL from Google Forms' "Send -> <>" dialog. */
  src: string;
  /** Accessible name for the iframe, e.g. "Catering inquiry form". */
  title: string;
  /**
   * The height Google reports in its embed snippet. The iframe is rendered at
   * this height so the form has no internal scrollbar; the page scrolls instead.
   * Google trims/extends this slightly per section, so a small buffer is added.
   */
  height: number;
  /** Optional shown while the iframe loads. */
  className?: string;
}

// Responsive wrapper for the client-managed Google Forms (Catering,
// Entertainment Inquiry, Careers). The client edits questions and reads
// responses in Google Forms; the site just hosts the form in Elements' skin.
//
// Google's own snippet is a fixed 640px iframe. Here the frame is 100% wide
// inside the page container and capped by max-w so it never overflows a phone
// screen; Google's form is itself responsive inside the frame.
const GoogleFormEmbed = ({ src, title, height, className = "" }: GoogleFormEmbedProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className}`}>
      {!loaded && (
        <div
          className="absolute inset-x-0 top-0 flex items-center justify-center py-16 text-muted-foreground text-sm"
          aria-hidden="true"
        >
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-3" />
          Loading form…
        </div>
      )}
      <div className="rounded-xl overflow-hidden bg-card border border-border">
        <iframe
          src={src}
          title={title}
          width="100%"
          height={height + 60}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="block w-full border-0"
          style={{ minHeight: 480 }}
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
};

export default GoogleFormEmbed;
