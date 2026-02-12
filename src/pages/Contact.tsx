import { useState } from "react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { MapPin, Phone, Clock } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
              {submitted ? (
                <div className="p-8 bg-card rounded-xl border border-primary/30 text-center">
                  <h3 className="text-xl font-display font-bold text-primary">Message Sent!</h3>
                  <p className="mt-2 text-muted-foreground">We'll be in touch soon.</p>
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
                  <button
                    type="submit"
                    className="mt-2 px-8 py-4 gold-gradient text-primary-foreground text-sm font-bold uppercase tracking-widest rounded-lg gold-glow-hover hover:scale-105 transition-all"
                  >
                    Send Message
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
                  <p className="text-muted-foreground ml-7">456 Gun Barrel Ln<br />Gun Barrel City, TX 75156</p>
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
                    {[
                      ["Monday", "5pm – 9pm"], ["Tuesday", "Closed"], ["Wednesday", "5pm – 9pm"],
                      ["Thursday", "5pm – 9pm"], ["Friday", "5pm – 10pm"], ["Saturday", "11am – 10pm"], ["Sunday", "11am – 8pm"],
                    ].map(([day, time]) => (
                      <div key={day} className="flex justify-between">
                        <span>{day}</span>
                        <span className={time === "Closed" ? "text-destructive" : ""}>{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden aspect-video bg-card border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3370.8!2d-96.1!3d32.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDE4JzAwLjAiTiA5NsKwMDYnMDAuMCJX!5e0!3m2!1sen!2sus!4v1"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Map"
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
