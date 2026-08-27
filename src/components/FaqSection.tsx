import { ChevronDown } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import type { FaqItem } from "@/lib/seo";

interface FaqSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FaqItem[];
  className?: string;
}

// Visible FAQ (native <details>, keyboard-accessible, no JS needed). The same
// FaqItem[] is emitted as FAQPage JSON-LD by src/lib/seo.ts so schema and
// on-page content always match.
const FaqSection = ({ title = "Frequently Asked Questions", subtitle, faqs, className = "bg-background" }: FaqSectionProps) => (
  <section className={`section-padding ${className}`} aria-labelledby="faq-heading">
    <div className="container-site max-w-3xl">
      <SectionHeading title={title} subtitle={subtitle} />
      <div className="flex flex-col gap-3">
        {faqs.map((f, i) => (
          <FadeIn key={f.q} delay={i * 0.05}>
            <details className="group bg-card rounded-xl border border-border open:border-primary/40 transition-colors">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 md:px-6 md:py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
                <h3 className="text-base md:text-lg font-display font-bold">{f.q}</h3>
                <ChevronDown size={18} className="flex-shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="px-5 pb-5 md:px-6 md:pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default FaqSection;
