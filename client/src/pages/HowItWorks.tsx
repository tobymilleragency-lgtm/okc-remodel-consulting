import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, ClipboardCheck, DoorOpen, FileSearch, HandCoins, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { Header, Footer, advisoryStatement } from "./Home";

const detailedSteps = [
  {
    title: "Initial call with Grace",
    text: "Grace, our AI intake assistant, gathers basic information in under 5 minutes so the callback starts with the right project context.",
    icon: PhoneCall,
  },
  {
    title: "We'll call you back",
    text: "You'll get a call back to schedule your free consultation and make sure we understand your goals, constraints, and timing.",
    icon: DoorOpen,
  },
  {
    title: "Home visit, estimate, and scope development",
    text: "The planning visit is free and in person. Toby walks through the project with you verbally, helps define the preliminary scope of work, and gives a realistic budget range based on similar projects in our service area.",
    icon: FileSearch,
  },
  {
    title: "Decision and commitment",
    text: "If you move forward, you sign a simple advisory contract and pay a refundable $99 deposit. You then receive the written scope of work.",
    icon: HandCoins,
  },
  {
    title: "Contractor matching and bid review",
    text: "We take the scope of work to two or three vetted local contractors, collect bids, review them with you side by side, and recommend which contractor to choose based on our vetting.",
    icon: ClipboardCheck,
  },
  {
    title: "Project advocacy through completion",
    text: "You sign a construction contract directly with the chosen contractor. When the contractor receives their first payment from you, your $99 deposit is refunded. We stay on the project as your advocate through final walkthrough.",
    icon: ShieldCheck,
  },
];

const faqs = [
  {
    q: "Are you a contractor?",
    a: "No. Oklahoma Remodel Consulting is an independent advisor. We help homeowners plan projects, set realistic budgets, and match with vetted contractors. Your construction contract is directly with the contractor you choose.",
  },
  {
    q: "How much does this cost?",
    a: "Our planning help is free to homeowners. If you move forward after the home visit, there is a refundable $99 deposit. The contractor pays our commission.",
  },
  {
    q: "What kinds of projects do you handle?",
    a: "Kitchens, bathrooms, basements, additions, whole-house renovations, exterior work, ground-up new construction, roofs, flooring, drywall, and most interior and exterior work. We are not currently handling projects that are primarily electrical, plumbing, or heating and cooling.",
  },
  {
    q: "Where are you located and what areas do you serve?",
    a: "We are based in Oklahoma City, Oklahoma. We serve Oklahoma City and communities within about 60 miles, approximately 60 to 70 miles from Oklahoma City.",
  },
  {
    q: "Can you give me a price for my project?",
    a: "No. Firm prices come from contractors after they see the actual scope. We give realistic budget ranges based on similar projects in our area during the planning visit.",
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <main>
        <section className="relative overflow-hidden navy-panel">
          <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_center,rgba(212,168,94,.22)_1px,transparent_1px)] [background-size:26px_26px]" />
          <div className="absolute -right-24 top-12 h-72 w-72 rounded-full border border-[#D4A85E]/30" />
          <div className="container relative grid gap-12 py-20 md:py-28 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <p className="eyebrow bg-white/10 text-[#D4A85E]">Six-step advisor process</p>
              <h1 className="mt-7 max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight text-[#FFFDF8] md:text-7xl">
                From remodel anxiety to a clear, contractor-ready plan.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#F7F3EA]/82">
                We slow the chaos down, define the scope, pressure-test the budget, and help homeowners in Oklahoma City, Oklahoma City and communities within about 60 miles choose the right contractor before the project becomes expensive.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="rounded-full bg-[#C79440] px-8 text-[#10243A] shadow-xl hover:bg-[#D4A85E]">
                  <Link href="/contact">Start with Grace <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <span className="text-sm font-medium text-[#F7F3EA]/75">Free planning call · Refundable deposit only if you move forward</span>
              </div>
            </div>
            <Card className="luxury-card border-[#D4A85E]/25 bg-[#FFFDF8]/95">
              <CardContent className="p-8 md:p-10">
                <Sparkles className="h-9 w-9 text-[#C79440]" />
                <h2 className="mt-6 font-serif text-4xl text-[#10243A]">The expensive part should not be guessing.</h2>
                <p className="mt-5 leading-8 text-muted-foreground">Before contractors bid, you get a planning advocate who can spot fuzzy scope, unrealistic expectations, and budget blind spots.</p>
                <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                  {['Scope', 'Budget', 'Bids'].map((item) => (
                    <div key={item} className="rounded-2xl border border-[#D7D0C2] bg-[#F7F3EA] p-4 font-serif text-xl text-[#10243A]">{item}</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container py-18 md:py-24">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Concierge workflow</p>
              <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-tight text-[#10243A]">Every step has a purpose.</h2>
            </div>
            <Badge className="w-fit rounded-full bg-[#10243A] px-5 py-2 text-[#FFFDF8]">Advisor-led, homeowner-controlled</Badge>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {detailedSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={step.title} className="luxury-card group overflow-hidden">
                  <CardContent className="relative min-h-full p-7">
                    <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-[#C79440]/10 transition-transform duration-300 group-hover:scale-110" />
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10243A] text-[#D4A85E] shadow-xl"><Icon className="h-7 w-7" /></div>
                      <span className="font-serif text-5xl text-[#10243A]/12">0{index + 1}</span>
                    </div>
                    <h3 className="mt-7 font-serif text-3xl leading-tight text-[#10243A]">{step.title}</h3>
                    <p className="mt-4 leading-7 text-muted-foreground">{step.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="border-y border-border/70 bg-[#FFFDF8]/70 py-18 md:py-24">
          <div className="container grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-6 font-serif text-5xl leading-tight text-[#10243A]">The fine print, made plain.</h2>
              <p className="mt-5 leading-8 text-muted-foreground">The short version is simple: we advise, contractors build, and you choose the contractor you want to hire. Oklahoma Remodel Consulting is based in Oklahoma City, OK 73102 and serves Oklahoma City and communities within about 60 miles.</p>
            </div>
            <Accordion type="single" collapsible className="grid gap-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`item-${index}`} className="luxury-card rounded-3xl border px-6">
                  <AccordionTrigger className="text-left font-serif text-xl text-[#10243A] hover:text-[#C79440]">{faq.q}</AccordionTrigger>
                  <AccordionContent className="leading-7 text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="container py-18 md:py-24">
          <Card className="overflow-hidden border-0 bg-[#10243A] text-[#F7F3EA] shadow-[0_30px_100px_rgba(16,36,58,.28)]">
            <CardContent className="grid gap-8 p-8 md:p-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D4A85E]/40 bg-[#D4A85E]/10 text-[#D4A85E]"><CheckCircle2 className="h-7 w-7" /></div>
                <h2 className="mt-6 font-serif text-4xl">Clear roles create calmer projects.</h2>
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
