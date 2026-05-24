import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { Compass, Medal, ShieldCheck, Sparkles, Target, Users } from "lucide-react";
import { Header, Footer, advisoryStatement } from "./Home";

const serviceAreas = [
  {
    state: "Oklahoma",
    text: "Oklahoma City, Parsons, Pittsburg, Independence, Coffeyville, and surrounding communities in Labette, Cherokee, Crawford, Neosho, Wilson, and Montgomery counties.",
  },
  {
    state: "Oklahoma",
    text: "Miami, Vinita, Grove, and surrounding communities in Ottawa, Craig, and Delaware counties.",
  },
  {
    state: "Missouri",
    text: "Joplin, Carthage, Webb City, and surrounding communities in Jasper and Newton counties.",
  },
];

const values = [
  { icon: ShieldCheck, title: "Homeowner-first", text: "We sit on your side of the table before bids, decisions, and contract signatures." },
  { icon: Target, title: "Scope clarity", text: "We turn vague renovation ideas into a grounded plan contractors can actually price." },
  { icon: Users, title: "Local network", text: "Your project is matched with vetted contractors who fit the work, budget, and timeline." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <main>
        <section className="relative overflow-hidden navy-panel">
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,253,248,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,253,248,.08)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="container relative grid gap-12 py-20 md:py-28 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <p className="eyebrow bg-white/10 text-[#D4A85E]">About the advisor</p>
              <h1 className="mt-7 max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight text-[#FFFDF8] md:text-7xl">
                Calm expertise before the first contractor walks in.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#F7F3EA]/82">
                Oklahoma Remodel Consulting gives homeowners the confidence of having an experienced construction mind in the room before scope, budget, bids, and contractor selection get expensive.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Badge className="rounded-full border-[#C79440]/40 bg-[#C79440]/15 px-4 py-2 text-[#F7F3EA]">Veteran-owned</Badge>
                <Badge className="rounded-full border-[#C79440]/40 bg-[#C79440]/15 px-4 py-2 text-[#F7F3EA]">Oklahoma City, Oklahoma</Badge>
                <Badge className="rounded-full border-[#C79440]/40 bg-[#C79440]/15 px-4 py-2 text-[#F7F3EA]">Advisor, not contractor</Badge>
              </div>
            </div>
            <Card className="luxury-card border-[#D4A85E]/25 bg-[#FFFDF8]/95">
              <CardContent className="p-8 md:p-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#10243A] text-[#D4A85E] shadow-2xl">
                  <Medal className="h-8 w-8" />
                </div>
                <h2 className="mt-7 font-serif text-4xl text-[#10243A]">Built on discipline, not guesswork.</h2>
                <p className="mt-5 leading-8 text-muted-foreground">
                  Toby Miller is a U.S. Army veteran of the 160th Special Operations Aviation Regiment, the Night Stalkers, a licensed general contractor with extensive residential construction experience, and is based in Oklahoma City, Oklahoma.
                </p>
                <div className="gold-rule mt-8" />
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-[#C79440]">Independent planning · Realistic budgets · Vetted matches</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container py-18 md:py-24">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <Card key={title} className="luxury-card overflow-hidden">
                <CardContent className="relative p-7">
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#C79440]/10" />
                  <Icon className="h-8 w-8 text-[#C79440]" />
                  <h3 className="mt-6 font-serif text-3xl text-[#10243A]">{title}</h3>
                  <p className="mt-4 leading-7 text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y border-border/70 bg-[#FFFDF8]/75 py-18 md:py-24">
          <div className="container">
            <Card className="luxury-card overflow-hidden border-[#C79440]/20">
              <CardContent className="grid gap-10 p-8 md:p-12 lg:grid-cols-[0.42fr_0.58fr] lg:p-14">
                <div>
                  <p className="eyebrow">Founder story</p>
                  <h2 className="mt-6 font-serif text-5xl leading-tight text-[#10243A]">Why Oklahoma Remodel Consulting exists</h2>
                  <div className="gold-rule mt-8" />
                  <p className="mt-8 font-serif text-2xl leading-9 text-[#17324F]">
                    “I got tired of being the second contractor on a job that should have gone right the first time.”
                  </p>
                </div>
                <div className="space-y-6 text-base leading-8 text-muted-foreground md:text-lg">
                  <p>
                    I spent years as a contractor and a general contractor. I built kitchens. I built bathrooms. I rebuilt other contractors&apos; bathrooms after they walked off the job.
                  </p>
                  <p>
                    I&apos;d get calls. A lot of calls. “I hired someone, they messed up my bathroom and ran off with my money.” “They took my money, dropped off materials, and never came back.” “They did a tile job and it was like they&apos;d never set a piece of tile in their life — and I&apos;m the one fixing it now.”
                  </p>
                  <p>
                    The story was the same almost every time. A homeowner with a real project and real money found a contractor who looked fine on the surface. By the time something was wrong, it was already too late — the deposit was gone, the scope wasn&apos;t clear, the timeline had collapsed, and there was no one on their side who knew enough to push back.
                  </p>
                  <p>
                    I got tired of being the second contractor on a job that should have gone right the first time.
                  </p>
                  <p>
                    Oklahoma Remodel Consulting is what I built to fix that. We sit on the homeowner&apos;s side of the table from the first phone call through the final walkthrough. We help define the scope before contractors are even in the conversation. We set a realistic budget so the numbers don&apos;t go sideways three weeks in. We match homeowners with vetted contractors we&apos;ve actually checked. And we stay on the project as the homeowner&apos;s advocate — not the contractor&apos;s middleman — until the job is done.
                  </p>
                  <p>
                    We&apos;re not the contractor. The construction contract is between the homeowner and the contractor we recommend. That separation is the point. It&apos;s how we stay independent. It&apos;s how we can push back when something looks wrong. It&apos;s why we can actually be on your side.
                  </p>
                  <p>
                    Here we are — where I can really help people before they get the sharp end of the stick.
                  </p>
                  <div className="rounded-3xl border border-[#C79440]/20 bg-[#10243A] p-6 text-[#F7F3EA]">
                    <p className="font-serif text-2xl text-[#D4A85E]">— Toby Miller</p>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#F7F3EA]/75">U.S. Army Disabled Combat Veteran</p>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#F7F3EA]/75">Owner and Founder, Oklahoma Remodel Consulting</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-y border-border/70 bg-[#FFFDF8]/70 py-18 md:py-24">
          <div className="container grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
            <div className="sticky top-32">
              <p className="eyebrow">Service area</p>
              <h2 className="mt-6 font-serif text-5xl leading-tight text-[#10243A]">Premium remodel guidance for the tri-state region.</h2>
              <p className="mt-5 leading-8 text-muted-foreground">We serve homeowners within a 70-mile radius of Oklahoma City, Oklahoma, including Oklahoma City and communities within about 60 miles.</p>
            </div>
            <ServiceAreaMap />
          </div>
        </section>

        <section className="container py-18 md:py-24">
          <Card className="overflow-hidden border-0 bg-[#10243A] text-[#F7F3EA] shadow-[0_30px_100px_rgba(16,36,58,.28)]">
            <CardContent className="grid gap-8 p-8 md:p-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D4A85E]/40 bg-[#D4A85E]/10 text-[#D4A85E]"><Compass className="h-7 w-7" /></div>
                <h2 className="mt-6 font-serif text-4xl">The boundary is the promise.</h2>
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
