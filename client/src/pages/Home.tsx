import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProjectIntakeForm } from "@/components/ProjectIntakeForm";
import { blogPosts } from "@/data/blogPosts";
import { Link } from "wouter";
import {
  Check,
  MinusCircle,
  ShieldCheck,
  Users,
  Handshake,
  ClipboardCheck,
  ArrowRight,
  Sparkles,
  HomeIcon,
  Ruler,
} from "lucide-react";

const advisoryStatement =
  "Oklahoma Remodel Consulting is an advisor, not a contractor. We help homeowners plan projects, set realistic budgets, and match with vetted contractors from our network. Your construction contract, when you're ready, will be directly between you and the contractor. We're the advisor that gets you there.";

const steps = [
  { title: "Intake call", text: "Start with Grace or the project form so we can collect the basics." },
  { title: "We'll call you back", text: "After you submit your project details, we'll call you back within one business day to schedule your free 15-minute consultation." },
  { title: "Home visit", text: "If the project is a fit, the next step is a planning visit and preliminary scope discussion." },
  { title: "Decision and deposit", text: "You decide whether to move forward with advisory support and a refundable deposit." },
  { title: "Contractor matching and bid review", text: "Your scope is matched with vetted contractors and reviewed before you choose." },
  { title: "Project advocacy", text: "We stay on the project as your advocate through completion." },
];

const weDo = [
  "Listen to your goals, constraints, and timeline",
  "Help define realistic project scope and identify trade-offs",
  "Visit the home and develop a preliminary scope of work",
  "Build a realistic budget range based on similar projects typically cost in our area",
  "Recommend a sequencing plan for phased projects",
  "Match you with two or three vetted local contractors",
  "Provide independent review of contractor bids",
  "Coach you on which contractor to choose and why",
  "Stay on the project as your advocate through completion",
];

const weDont = [
  "Quote firm prices — those come from contractors after they review actual scope",
  "Guarantee timelines — those depend on contractor, permits, weather, and materials",
  "Guarantee specific contractor availability — contractors are independent businesses",
  "Diagnose structural, electrical, plumbing, heating and cooling, or any other technical problem",
  "Make warranty commitments — contractors warranty their own work",
  "Discuss legal or insurance matters — we're not attorneys or insurance professionals",
  "Negotiate discounts — we're not a price-pressure service",
  "Perform construction work, supervise jobsite labor, or manage subcontractors",
  "We are NOT the contractor",
];

const trustSignals = [
  { title: "Veteran-owned", text: "Founded by Toby Miller, U.S. Army veteran.", icon: ShieldCheck },
  { title: "Free planning", text: "Planning help is free to homeowners, with a refundable deposit if you move forward.", icon: Handshake },
  { title: "Vetted network", text: "Your scope is matched with two or three vetted local contractors.", icon: Users },
  { title: "Independent advocacy", text: "We stay with you through final walkthrough as your advisor.", icon: ClipboardCheck },
];

const homeBlogSnippets = blogPosts.slice(0, 3);

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(215,208,194,0.7)] bg-[rgba(255,253,248,0.86)] backdrop-blur-xl">
      <div className="container flex min-h-20 items-center justify-between gap-4 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--relax-navy)] text-[var(--relax-gold)] shadow-[0_12px_30px_rgba(16,36,58,0.25)]">
            <HomeIcon className="h-5 w-5" />
          </span>
          <span className="font-serif text-xl tracking-tight text-[var(--relax-navy)] transition group-hover:text-[var(--relax-gold)]">
            OKC Remodel Consulting
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-[var(--relax-slate)] md:flex">
          {[
            { label: "Home", href: "/" },
            { label: "How It Works", href: "/how-it-works" },
            { label: "Services", href: "/services" },
            { label: "Service Area", href: "/serving" },
            { label: "About", href: "/about" },
            { label: "Blog", href: "/blog" },
            { label: "Guides", href: "/guides" },
            { label: "Checklists", href: "/checklists" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition hover:text-[var(--relax-gold)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full bg-[var(--relax-navy)] px-5 text-[var(--relax-white)] shadow-lg shadow-[rgba(16,36,58,0.22)] hover:bg-[var(--relax-gold)] hover:text-[var(--relax-navy)]">
              Start Your Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto border-[#D4A85E]/30 bg-[#FFFDF8] p-0 sm:max-w-3xl">
            <DialogHeader className="sr-only">
              <DialogTitle>Start your project</DialogTitle>
              <DialogDescription>Complete the project intake form to request a consultation callback.</DialogDescription>
            </DialogHeader>
            <ProjectIntakeForm compact sourceLabel="home-header-popup" />
          </DialogContent>
        </Dialog>
      </div>
      <div className="border-t border-[rgba(215,208,194,0.7)] bg-[var(--relax-navy)] px-4 py-2 text-center text-xs font-semibold tracking-wide text-[var(--relax-cream)]">
        Advisor, not a contractor. Your construction contract is directly with the contractor.
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="navy-panel border-t border-[rgba(199,148,64,0.28)]">
      <div className="container grid gap-10 py-14 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="font-serif text-3xl text-[var(--relax-white)]">Oklahoma Remodel Consulting</p>
          <div className="gold-rule mt-5 max-w-48" />
          <p className="mt-6 text-sm text-[rgba(247,243,234,0.78)]">Oklahoma Remodel Consulting LLC</p>
          <p className="mt-2 text-sm text-[rgba(247,243,234,0.78)]">Oklahoma City, OK 73102</p>
          <p className="mt-2 text-sm text-[rgba(247,243,234,0.78)]">Oklahoma City and communities within about 60 miles</p>
          <p className="mt-2 text-sm text-[rgba(247,243,234,0.78)]">toby@okcremodelconsulting.com</p>
        </div>
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="text-sm leading-7 text-[rgba(247,243,234,0.82)]">{advisoryStatement}</p>
            <p className="mt-8 text-sm text-[var(--relax-gold-light)]">© 2026 Oklahoma Remodel Consulting LLC</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--relax-gold-light)]">Services</p>
            <div className="mt-4 grid gap-2 text-sm text-[rgba(247,243,234,0.82)]">
              <Link href="/services/kitchen-remodel-consulting">Kitchen Remodel Consulting</Link>
              <Link href="/services/bathroom-remodel-consulting">Bathroom Remodel Consulting</Link>
              <Link href="/services/basement-finishing-consulting">Basement Finishing Consulting</Link>
              <Link href="/services/full-home-remodel-consulting">Full Home Remodel Consulting</Link>
              <Link href="/services/deck-and-fence-consulting">Deck and Fence Consulting</Link>
              <Link href="/services/siding-and-roofing-consulting">Siding and Roofing Consulting</Link>
              <Link href="/services/addition-and-framing-consulting">Addition and Framing Consulting</Link>
              <Link href="/services/drywall-and-painting-consulting">Drywall and Painting Consulting</Link>
              <Link href="/services/flooring-consulting">Flooring Consulting</Link>
              <Link href="/services/contractor-vetting">Contractor Vetting</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--relax-gold-light)]">Service Area</p>
            <Link href="/service-area" className="mt-4 inline-flex text-sm text-[rgba(247,243,234,0.82)] hover:text-[var(--relax-gold-light)]">View Full Service Area</Link>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--relax-gold-light)]">Resources</p>
            <div className="mt-4 grid gap-2 text-sm text-[rgba(247,243,234,0.82)]">
              <Link href="/guides">Planning Guides</Link>
              <Link href="/compare">Comparison Guides</Link>
              <Link href="/checklists">Remodel Checklists</Link>
              <Link href="/guides/why-remodel-bids-come-back-different">Why Bids Differ</Link>
              <Link href="/compare/remodel-consultant-vs-general-contractor">Consultant vs Contractor</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Header, Footer, advisoryStatement };

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <main>
        <section className="relative overflow-hidden navy-panel">
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(247,243,234,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(247,243,234,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />
          <div className="container relative grid gap-12 py-20 md:grid-cols-[1.08fr_0.92fr] md:py-28 lg:py-32">
            <div>
              <p className="eyebrow bg-[rgba(255,253,248,0.08)] text-[var(--relax-gold-light)]">Independent remodel advisor</p>
              <h1 className="mt-7 max-w-4xl font-serif text-6xl leading-[0.92] tracking-[-0.04em] text-[var(--relax-white)] md:text-8xl">
                Renovation, without the contractor roulette.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[rgba(247,243,234,0.82)] md:text-xl">
                High-touch remodel planning, realistic budgeting, and vetted contractor matching for homeowners in Oklahoma City, Oklahoma City and communities within about 60 miles who want clarity before signing anything.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="rounded-full bg-[var(--relax-gold)] px-7 text-[var(--relax-navy)] shadow-[0_18px_50px_rgba(199,148,64,0.24)] hover:bg-[var(--relax-gold-light)]">
                      Start Your Project <ArrowRight className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto border-[#D4A85E]/30 bg-[#FFFDF8] p-0 sm:max-w-3xl">
                    <DialogHeader className="sr-only">
                      <DialogTitle>Start your project</DialogTitle>
                      <DialogDescription>Complete the project intake form to request a consultation callback.</DialogDescription>
                    </DialogHeader>
                    <ProjectIntakeForm compact sourceLabel="home-hero-popup" />
                  </DialogContent>
                </Dialog>
                <p className="text-sm font-medium text-[rgba(247,243,234,0.72)]">Free planning. No pressure. No spam.</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-8 top-12 h-28 w-28 rounded-full border border-[rgba(199,148,64,0.5)]" />
              <Card className="luxury-card border-[rgba(247,243,234,0.24)] bg-[rgba(255,253,248,0.1)] text-[var(--relax-cream)] shadow-[0_30px_100px_rgba(0,0,0,0.18)]">
                <CardContent className="p-8 md:p-10">
                  <Sparkles className="h-7 w-7 text-[var(--relax-gold-light)]" />
                  <h2 className="mt-6 font-serif text-4xl leading-tight text-[var(--relax-white)]">A private advisor for the messy middle of remodeling.</h2>
                  <p className="mt-5 leading-7 text-[rgba(247,243,234,0.78)]">{advisoryStatement}</p>
                  <div className="gold-rule my-8" />
                  <div className="grid grid-cols-2 gap-5">
                    <div><p className="font-serif text-4xl text-[var(--relax-gold-light)]">$99</p><p className="mt-1 text-xs uppercase tracking-[0.2em] text-[rgba(247,243,234,0.68)]">Refundable deposit</p></div>
                    <div><p className="font-serif text-4xl text-[var(--relax-gold-light)]">2–3</p><p className="mt-1 text-xs uppercase tracking-[0.2em] text-[rgba(247,243,234,0.68)]">Vetted contractor bids</p></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-y border-border/70 bg-[rgba(255,253,248,0.58)] py-16">
          <div className="container">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">The path</p>
                <h2 className="mt-4 font-serif text-5xl tracking-tight text-[var(--relax-navy)]">How it works</h2>
              </div>
              <Link href="/process" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--relax-navy)] hover:text-[var(--relax-gold)]">See the full process <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
              {steps.map((step, index) => (
                <Card key={step.title} className="luxury-card overflow-hidden">
                  <CardContent className="p-5">
                    <span className="font-serif text-3xl text-[var(--relax-gold)]">0{index + 1}</span>
                    <p className="mt-4 text-sm font-semibold leading-6 text-[var(--relax-navy)]">{step.title}</p>
                    <p className="mt-3 text-xs leading-5 text-muted-foreground">{step.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Clear scope</p>
              <h2 className="mt-4 font-serif text-5xl tracking-tight text-[var(--relax-navy)]">Elegant planning. Firm boundaries.</h2>
              <p className="mt-5 leading-7 text-muted-foreground">The service feels premium because the process is disciplined: advice is advice, contractor work is contractor work, and homeowners know the line.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="luxury-card">
                <CardContent className="p-7">
                  <h3 className="font-serif text-3xl text-[var(--relax-navy)]">We do</h3>
                  <ul className="mt-6 space-y-4">
                    {weDo.map((item) => <li key={item} className="flex gap-3 text-sm leading-6"><Check className="mt-1 h-4 w-4 flex-none text-[var(--relax-gold)]" />{item}</li>)}
                  </ul>
                </CardContent>
              </Card>
              <Card className="luxury-card">
                <CardContent className="p-7">
                  <h3 className="font-serif text-3xl text-[var(--relax-navy)]">We don't</h3>
                  <ul className="mt-6 space-y-4">
                    {weDont.map((item) => <li key={item} className="flex gap-3 text-sm leading-6"><MinusCircle className="mt-1 h-4 w-4 flex-none text-[var(--relax-slate)]" />{item}</li>)}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="navy-panel py-20">
          <div className="container">
            <p className="eyebrow bg-[rgba(255,253,248,0.08)] text-[var(--relax-gold-light)]">Why homeowners trust us</p>
            <h2 className="mt-4 max-w-2xl font-serif text-5xl tracking-tight text-[var(--relax-white)]">Premium guidance without the premium runaround.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {trustSignals.map(({ title, text, icon: Icon }) => (
                <Card key={title} className="border-[rgba(247,243,234,0.16)] bg-[rgba(255,253,248,0.08)] text-[var(--relax-cream)] backdrop-blur-xl">
                  <CardContent className="p-6">
                    <Icon className="h-7 w-7 text-[var(--relax-gold-light)]" />
                    <h3 className="mt-5 font-serif text-2xl text-[var(--relax-white)]">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[rgba(247,243,234,0.76)]">{text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-20">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">From the remodel guide</p>
              <h2 className="mt-4 font-serif text-5xl tracking-tight text-[var(--relax-navy)]">A little more context before you call.</h2>
              <p className="mt-5 leading-7 text-muted-foreground">
                The home page should be precise, but remodeling decisions need context. These short takeaways pull from the blog so homeowners understand why scope, fit, and independent guidance matter before a deposit is paid.
              </p>
              <Link href="/blog" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--relax-navy)] hover:text-[var(--relax-gold)]">
                Read the full remodel guide <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5">
              {homeBlogSnippets.map((post, index) => (
                <Card key={post.slug} className="luxury-card overflow-hidden">
                  <CardContent className="grid gap-6 p-7 md:grid-cols-[auto_1fr]">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(199,148,64,0.14)] font-serif text-2xl text-[var(--relax-gold)]">
                      0{index + 1}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--relax-slate)]">
                        <span>{post.category}</span>
                        <span className="h-1 w-1 rounded-full bg-[var(--relax-gold)]" />
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="mt-3 font-serif text-3xl leading-tight text-[var(--relax-navy)]">{post.title}</h3>
                      <p className="mt-4 text-base leading-7 text-muted-foreground">{post.takeaway}</p>
                      <div className="mt-5 rounded-2xl border border-[rgba(199,148,64,0.28)] bg-[rgba(255,253,248,0.72)] p-5">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--relax-gold)]">Practical takeaway</p>
                        <p className="mt-3 text-sm leading-6 text-[var(--relax-slate)]">{post.highlights[0]}</p>
                      </div>
                      <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--relax-navy)] hover:text-[var(--relax-gold)]">
                        Read this article <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-20 text-center">
          <Ruler className="mx-auto h-9 w-9 text-[var(--relax-gold)]" />
          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-5xl tracking-tight text-[var(--relax-navy)]">Ready to turn the remodel into a plan?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">Tell us about your project. We'll call you back within one business day.</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="mt-9 rounded-full bg-[var(--relax-navy)] px-8 text-[var(--relax-white)] hover:bg-[var(--relax-gold)] hover:text-[var(--relax-navy)]">
                Start Your Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto border-[#D4A85E]/30 bg-[#FFFDF8] p-0 sm:max-w-3xl">
              <DialogHeader className="sr-only">
                <DialogTitle>Start your project</DialogTitle>
                <DialogDescription>Complete the project intake form to request a consultation callback.</DialogDescription>
              </DialogHeader>
              <ProjectIntakeForm compact sourceLabel="home-bottom-popup" />
            </DialogContent>
          </Dialog>
        </section>
      </main>
      <Footer />
    </div>
  );
}
