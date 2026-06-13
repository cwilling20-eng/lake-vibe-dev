import { useState } from "react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { MapPin, Phone, Clock } from "lucide-react";
import { HOURS, ADDRESS_LINE_1, CITY_STATE_ZIP, MAPS_EMBED_URL } from "@/lib/siteInfo";
import { submitWeb3Form } from "@/lib/web3forms";

type Status = "idle" | "submitting" | "success" | "error";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const ok = await submitWeb3Form(
        { name: form.name, email: form.email, message: form.message },
        "New message from the Elements by 456 website",
      );
      setStatus(ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Layout>
      <section className="pt-28 pb-8 bg-background">
        <div className="container-site text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase">
              Get In <span className="gold-gradient-text">Touch</span>
            </h1>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <FadeIn direction="left">
              {status === "success" ? (
                <div className="p-8 bg-card rounded-xl border border-primary/30 text-center">
                  <h3 className="text-xl font-display font-bold text-primary">Message Sent!</h3>
                  <p className="mt-2 text-muted-foreground">Thanks for reaching out — we'll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <h2 className="text-2xl font-display font-bold mb-2">Send Us a Message</h2>
                  {[
                    { key: "name", label: "Name", type: "text" },
                    { key: "email", label: "Email", type: "email" },
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
                      rows={5}
                      required
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
                    {status === "submitting" ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </FadeIn>

            <FadeIn direction="right">
              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={18} className="text-primary" />
                    <h3 className="font-display text-lg font-bold">Address</h3>
                  </div>
                  <p className="text-muted-foreground ml-7">{ADDRESS_LINE_1}<br />{CITY_STATE_ZIP}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Phone size={18} className="text-primary" />
                    <h3 className="font-display text-lg font-bold">Phone</h3>
                  </div>
                  <a href="tel:9039107666" className="text-primary font-semibold ml-7 hover:underline">(903) 910-7666</a>
                </div>
                <div className="p-6 gold-gradient rounded-xl">
                  <p className="text-primary-foreground font-display text-lg font-bold">Prefer to talk?</p>
                  <a href="tel:9039107666" className="text-primary-foreground/90 text-2xl font-display font-bold">(903) 910-7666</a>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={18} className="text-primary" />
                    <h3 className="font-display text-lg font-bold">Hours</h3>
                  </div>
                  <div className="flex flex-col gap-2 ml-7 text-sm text-muted-foreground">
                    {HOURS.map(([day, time]) => (
                      <div key={day} className="flex justify-between">
                        <span>{day}</span>
                        <span className={time === "Closed" ? "text-destructive" : ""}>{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden aspect-video bg-card border border-border">
                  <iframe
                    src={MAPS_EMBED_URL}
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Elements by 456 Location"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
