import { useState } from "react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { submitWeb3Form } from "@/lib/web3forms";
import privateEvents from "@/assets/private-events.jpg";

type Status = "idle" | "submitting" | "success" | "error";

const Catering = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", guests: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const ok = await submitWeb3Form(
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          event_date: form.date,
          guest_count: form.guests,
          message: form.message,
        },
        "Catering Inquiry – Elements by 456",
      );
      setStatus(ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Layout>
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${privateEvents})` }} />
        <div className="absolute inset-0 overlay-dark-heavy" />
        <div className="relative z-10 text-center container-site pt-20">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              Bring The Vibes To <span className="gold-gradient-text">Your Event</span>
            </h1>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-site">
          <SectionHeading title="What We Offer" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Private Parties", desc: "Birthdays, anniversaries, and celebrations with full bar and kitchen service." },
              { title: "Corporate Events", desc: "Team dinners, client entertainment, and business gatherings done right." },
              { title: "Lake Celebrations", desc: "Only on Cedar Creek Lake. Make it one for the books." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="bg-card p-6 rounded-xl border border-border text-center">
                  <h3 className="text-lg font-display font-bold text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="max-w-xl mx-auto">
              <h2 className="text-2xl font-display font-bold text-center mb-8">Request a Booking</h2>
              {status === "success" ? (
                <div className="text-center p-8 bg-card rounded-xl border border-primary/30">
                  <h3 className="text-xl font-display font-bold text-primary">Request Received!</h3>
                  <p className="mt-2 text-muted-foreground">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {[
                    { key: "name", label: "Name", type: "text" },
                    { key: "email", label: "Email", type: "email" },
                    { key: "phone", label: "Phone", type: "tel" },
                    { key: "date", label: "Event Date", type: "date" },
                    { key: "guests", label: "Guest Count", type: "number" },
                  ].map(({ key, label, type }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium mb-1">{label}</label>
                      <input
                        type={type}
                        required
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-sm text-destructive">
                      Something went wrong. Please try again, or call us at (903) 910-7666.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-2 px-8 py-4 gold-gradient text-primary-foreground text-sm font-bold uppercase tracking-widest rounded-lg gold-glow-hover hover:scale-105 transition-all disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {status === "submitting" ? "Sending…" : "Submit Request"}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Catering;
