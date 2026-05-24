import { Card, CardContent } from "@/components/ui/card";
import { ProjectIntakeForm } from "@/components/ProjectIntakeForm";
import { CalendarCheck, CheckCircle2, Mail, MapPin, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";
import { Header, Footer, advisoryStatement } from "./Home";

const expectations = [
  "Your notes are reviewed before the callback",
  "No pressure, no contractor commitment",
  "Clear next step if your project is a fit",
];

const contactCards = [
  { icon: Mail, label: "Email", value: "toby@okcremodelconsulting.com" },
  { icon: PhoneCall, label: "Response", value: "Callback to schedule your consultation" },
  { icon: MapPin, label: "Base", value: "Oklahoma City, OK 73102" },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <main>
        <section className="relative overflow-hidden navy-panel">
          <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_20%,rgba(212,168,94,.45),transparent_18rem),linear-gradient(rgba(255,253,248,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,253,248,.08)_1px,transparent_1px)] [background-size:auto,74px_74px,74px_74px]" />
          <div className="container relative grid gap-12 py-20 md:py-28 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
            <div>
              <p className="eyebrow bg-white/10 text-[#D4A85E]">Start with clarity</p>
              <h1 className="mt-7 max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight text-[#FFFDF8] md:text-7xl">
                Tell us about your project. We'll call you back within one business day.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#F7F3EA]/82">
                Share the basics and our team will reach out within one business day to schedule your consultation. You get a calmer path into scope, budget, contractor selection, and the decisions that usually overwhelm homeowners across Oklahoma City and communities within about 60 miles.
              </p>
              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                {expectations.map((item) => (
                  <div key={item} className="rounded-2xl border border-[#D4A85E]/25 bg-white/10 p-4 text-sm font-medium leading-6 text-[#F7F3EA] backdrop-blur-xl">
                    <CheckCircle2 className="mb-3 h-5 w-5 text-[#D4A85E]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <ProjectIntakeForm sourceLabel="contact-page" />
          </div>
        </section>

        <section className="container py-18 md:py-24">
          <div className="grid gap-6 lg:grid-cols-3">
            {contactCards.map(({ icon: Icon, label, value }) => (
              <Card key={label} className="luxury-card overflow-hidden">
                <CardContent className="relative p-7">
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#C79440]/10" />
                  <Icon className="h-7 w-7 text-[#C79440]" />
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
                  <p className="mt-2 font-serif text-2xl text-[#10243A]">{value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y border-border/70 bg-[#FFFDF8]/70 py-18 md:py-24">
          <div className="container grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">What happens next</p>
              <h2 className="mt-6 font-serif text-5xl leading-tight text-[#10243A]">A polished intake, then a real conversation.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { icon: CalendarCheck, title: "1. Review", text: "Your notes are reviewed so the call starts informed." },
                { icon: PhoneCall, title: "2. Call", text: "You will be called back to schedule your consultation and clarify the goals and constraints." },
                { icon: ShieldCheck, title: "3. Advise", text: "If it fits, we define the next planning step clearly." },
              ].map(({ icon: Icon, title, text }) => (
                <Card key={title} className="luxury-card">
                  <CardContent className="p-6">
                    <Icon className="h-7 w-7 text-[#C79440]" />
                    <h3 className="mt-5 font-serif text-2xl text-[#10243A]">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-18 md:py-24">
          <Card className="overflow-hidden border-0 bg-[#10243A] text-[#F7F3EA] shadow-[0_30px_100px_rgba(16,36,58,.28)]">
            <CardContent className="grid gap-8 p-8 md:p-12 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D4A85E]/40 bg-[#D4A85E]/10 text-[#D4A85E]"><Sparkles className="h-7 w-7" /></div>
                <h2 className="mt-6 font-serif text-4xl">Elegant guidance. Clear boundaries.</h2>
              </div>
              <p className="text-lg leading-8 text-[#F7F3EA]/82">{advisoryStatement}</p>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
