import FadeIn from "./FadeIn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading = ({ title, subtitle, centered = true, className = "" }: SectionHeadingProps) => {
  return (
    <FadeIn className={`mb-12 md:mb-16 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-wide text-foreground">
        {title}
      </h2>
      <div className={`mt-4 h-0.5 w-16 gold-gradient ${centered ? "mx-auto" : ""}`} />
      {subtitle && (
        <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </FadeIn>
  );
};

export default SectionHeading;
