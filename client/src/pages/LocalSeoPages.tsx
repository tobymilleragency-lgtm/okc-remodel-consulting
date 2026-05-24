import { LocalSeoHead } from "@/components/LocalSeoHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cities, getCityBySlug } from "@/data/cities";
import { getServiceBySlug, services } from "@/data/services";
import { cityHubSchema, isServiceCityEnabled, serviceCityDescription, serviceCityPath, serviceCitySchema, serviceHubSchema } from "@/lib/localSeo";
import { ArrowRight, CheckCircle, MapPin, ShieldCheck } from "lucide-react";
import { Link, useRoute } from "wouter";
import { Footer, Header } from "./Home";
import NotFound from "./NotFound";

const callbackCopy = "Tell us about your project and we’ll call you back within one business day.";
const servicesIntro = "Independent remodel planning, scope development, budget guidance, bid review, and contractor matching for homeowners across Oklahoma City and communities within about 60 miles.";
const servingIntro = "Oklahoma Remodel Consulting serves homeowners near Oklahoma City and across the tri-state region with advisor-led remodel planning before contractor commitments are made.";

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background font-sans text-foreground"><Header />{children}<Footer /></div>;
}


function VisibleBreadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav aria-label="Breadcrumb" data-visible-breadcrumbs="true" className="border-b border-border/70 bg-[rgba(255,253,248,0.72)]"><ol className="container flex flex-wrap items-center gap-2 py-3 text-sm font-semibold text-muted-foreground">{items.map((item, index) => <li key={`${item.label}-${index}`} className="flex items-center gap-2">{index > 0 ? <span aria-hidden="true" className="text-[var(--relax-gold)]">/</span> : null}{item.href ? <Link href={item.href} className="text-[var(--relax-navy)] hover:text-[var(--relax-gold)]">{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav>;
}

function Hero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="relative overflow-hidden navy-panel"><div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(247,243,234,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(247,243,234,0.08)_1px,transparent_1px)] [background-size:64px_64px]" /><div className="container relative py-20 md:py-28"><p className="eyebrow bg-[rgba(255,253,248,0.08)] text-[var(--relax-gold-light)]">{eyebrow}</p><h1 className="mt-7 max-w-5xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-[var(--relax-white)] md:text-7xl">{title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-[rgba(247,243,234,0.82)]">{text}</p><Button asChild className="mt-8 rounded-full bg-[var(--relax-gold)] text-[var(--relax-navy)] hover:bg-[var(--relax-gold-light)]"><Link href="/contact">Start with clarity <ArrowRight className="h-4 w-4" /></Link></Button><p className="mt-4 text-sm font-semibold text-[rgba(247,243,234,0.75)]">{callbackCopy}</p></div></section>;
}

function Paragraphs({ items }: { items: string[] }) {
  return <div className="mt-5 space-y-4">{items.map((item) => <p key={item} className="leading-7 text-muted-foreground">{item}</p>)}</div>;
}

function BulletList({ items }: { items: string[] }) {
  return <ul className="mt-5 grid gap-3">{items.map((item) => <li key={item} className="flex gap-3 rounded-2xl border border-border bg-card p-4 text-muted-foreground"><CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--relax-gold)]" /><span>{item}</span></li>)}</ul>;
}

function NumberedSteps({ items }: { items: string[] }) {
  return <ol className="mt-5 grid gap-4 md:grid-cols-2">{items.map((item, index) => <li key={item} className="rounded-2xl border border-border bg-card p-5"><span className="text-sm font-bold text-[var(--relax-gold)]">Step {index + 1}</span><p className="mt-2 leading-7 text-muted-foreground">{item}</p></li>)}</ol>;
}

function PageSection({ eyebrow, title, children, muted = false }: { eyebrow?: string; title: string; children: React.ReactNode; muted?: boolean }) {
  return <section className={muted ? "bg-[rgba(255,253,248,0.58)] py-20" : "py-20"}><div className="container">{eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}<h2 className="mt-4 max-w-3xl font-serif text-4xl text-[var(--relax-navy)] md:text-5xl">{title}</h2>{children}</div></section>;
}

function AdvisoryCallout({ children }: { children: React.ReactNode }) {
  return <aside className="mt-8 rounded-3xl border border-[var(--relax-gold)]/35 bg-[rgba(199,168,103,0.12)] p-6"><h3 className="font-serif text-2xl text-[var(--relax-navy)]">Independent advisory role</h3><p className="mt-3 leading-7 text-muted-foreground">{children}</p></aside>;
}

type GuidanceSection = {
  title: string;
  paragraphs: string[];
};

function pairParagraphs(paragraphs: string[], titles: string[]): GuidanceSection[] {
  const sections: GuidanceSection[] = [];
  for (let index = 0; index < paragraphs.length; index += 2) {
    sections.push({
      title: titles[Math.floor(index / 2)] ?? "Planning detail",
      paragraphs: paragraphs.slice(index, index + 2),
    });
  }
  return sections;
}

function serviceGuidanceSections(service: (typeof services)[number]) {
  return pairParagraphs(serviceSeoParagraphs(service), [
    "Start with scope clarity",
    "Protect the homeowner role",
    "Separate ranges from real prices",
    "Compare more than the number",
  ]);
}

function cityGuidanceSections(city: (typeof cities)[number]) {
  return pairParagraphs(citySeoParagraphs(city), [
    "Local planning context",
    "Budget and bid assumptions",
    "Nearby market realities",
    "Questions before commitment",
  ]);
}

function serviceCityGuidanceSections(service: (typeof services)[number], city: (typeof cities)[number]) {
  return pairParagraphs(serviceCitySeoParagraphs(service, city), [
    "Local service planning",
    "Advisor-led scope review",
    "Market-specific bid questions",
    "How proposals get compared",
  ]);
}

function serviceSeoParagraphs(service: (typeof services)[number]) {
  const serviceLower = service.name.toLowerCase();
  return [
    `${service.name} is for homeowners who want a stronger plan before they ask contractors for firm pricing. A remodel estimate is only useful when the request is clear, the finish level is understood, and each contractor is responding to the same expectations. Oklahoma Remodel Consulting helps turn early ideas into an organized scope so the homeowner can compare options with less guesswork.`,
    `Many ${serviceLower} conversations start with a broad question like what should this cost. The better question is what exactly is being priced, what assumptions are included, and what decisions still need to be made before a reliable number is possible. We help identify those details before deposits, allowances, or change orders create confusion.`,
    `The goal is not to replace the contractor. The goal is to prepare the homeowner before contractor selection begins. We stay in the advisory role, help clarify priorities, and point out scope gaps that can make bids look similar while actually describing different levels of work.`,
    `For homeowners in Oklahoma City and communities within about 60 miles, local conditions can affect schedule, access, material choices, and contractor availability. A clear planning process gives contractors better information and gives the homeowner a calmer way to decide who is the right fit.`,
    `${service.name} also helps homeowners understand the difference between a planning range and a construction price. A planning range can guide priorities, but a contractor price should be tied to a defined scope, site conditions, material choices, and labor assumptions. We help the homeowner keep those categories separate so an early number is not mistaken for a complete commitment.`,
    `A good ${serviceLower} page should answer the search intent behind remodel planning, contractor vetting, bid review, scope development, and budget guidance. Homeowners are often looking for a way to slow down the decision, understand what should be written down, and avoid comparing bids that use different assumptions. This service is built around that need for clarity.`,
    `The consulting conversation also looks at communication fit. A contractor may have the right skills but still be a poor match if the proposal is vague, the schedule is unclear, or the payment expectations are not explained. We help homeowners evaluate more than price, including responsiveness, detail, exclusions, allowances, cleanup, warranty language, and project boundaries.`,
    `By the end of the planning step, the homeowner should have a better sense of what matters most, what questions remain open, and what a contractor should verify before work begins. That preparation supports stronger local SEO content because it reflects real homeowner concerns instead of generic remodeling claims.`,
  ];
}

function citySeoParagraphs(city: (typeof cities)[number]) {
  const nearby = city.nearbyAreas.slice(0, 4).join(", ");
  return [
    `Remodel consulting in ${city.name}, ${city.state} is most useful before the project becomes a signed construction agreement. Homeowners often know what they want to improve, but they may not know which details should be decided before bids are compared. Oklahoma Remodel Consulting helps organize those decisions into a practical planning path.`,
    `${city.name} projects can involve older homes, prior remodel work, rural access, weather exposure, uneven floors, utility questions, and different expectations from one contractor to another. Those issues do not always appear in a short estimate. We help homeowners ask better questions before assuming every bid includes the same work.`,
    `The consulting process is designed to protect clarity. We help define the work, discuss budget ranges, identify unknowns, and review contractor proposals from the homeowner side of the conversation. Contractors still provide firm construction pricing, manage crews, and contract directly with the homeowner.`,
    `For homes around ${city.zipCodes.join(" and ")}, the best remodel decisions usually come from better preparation, not pressure. A written scope, plain-language bid comparison, and early discussion of risk can reduce confusion when it is time to choose a contractor.`,
    `Local searchers in ${city.name} are often looking for remodel planning, contractor vetting, bid review, kitchen remodel guidance, bathroom remodel guidance, basement planning, exterior project advice, or help comparing bids. This page is written to answer those practical questions while keeping the content readable for homeowners, not just search engines.`,
    `Nearby areas such as ${nearby} can affect contractor availability, travel expectations, supplier access, and scheduling. Those details may not change the homeowner's goal, but they can change how a project should be discussed before bids are trusted. We help turn location-specific concerns into questions that belong in the planning conversation.`,
    `A city service-area page should not promise code, engineering, insurance, or legal answers. Instead, it should help homeowners know what to ask about permits, inspections, trade responsibilities, payment timing, cleanup, warranties, and change orders. That kind of preparation gives the homeowner a clearer role before construction begins.`,
    `Oklahoma Remodel Consulting keeps the focus on scope clarity and contractor fit. The homeowner remains in control of the contractor choice, and the construction contract stays directly between the homeowner and the contractor. Our role is to make the decision better informed before money, schedule, and expectations are locked in.`,
  ];
}

function serviceCitySeoParagraphs(service: (typeof services)[number], city: (typeof cities)[number]) {
  const serviceLower = service.name.toLowerCase();
  return [
    `${service.name} in ${city.name}, ${city.state} gives homeowners a local planning step before bids and deposits become serious commitments. The service is built for people who want to understand scope, budget assumptions, contractor fit, and risk before they sign a construction agreement.`,
    `A ${serviceLower} project in ${city.name} can look simple at the idea stage, but the price depends on details that need to be named early. Finish expectations, access, sequencing, materials, prep work, cleanup, and local requirements can all affect what a contractor includes. We help put those questions on the table before bids are treated as final.`,
    `Oklahoma Remodel Consulting is advisor-led. That means we do not sell the construction work or push a homeowner toward a fast signature. We help shape a clearer scope, compare contractor responses, and explain differences so the homeowner can choose with more confidence.`,
    `For homeowners near ${city.nearbyAreas.slice(0, 3).join(", ")} and the broader tri-state region, this approach creates a more useful path from first idea to contractor selection. The construction contract stays directly between the homeowner and the contractor, while the planning support stays focused on homeowner clarity.`,
    `Search intent matters on a local service page. Someone looking for ${serviceLower} in ${city.name} is usually trying to understand cost, timing, contractor reliability, scope detail, and whether a project is ready for bids. The page should answer those concerns with specific planning guidance instead of thin local copy.`,
    `The strongest local remodel pages combine the project type with the local market. In ${city.name}, that means discussing property conditions, nearby service areas, contractor availability, access, budget expectations, and the questions that protect the homeowner before a deposit is paid.`,
    `This consulting process helps homeowners compare proposals with a better framework. A lower bid may omit prep work, use lighter allowances, skip cleanup details, or leave responsibility unclear. A higher bid may include more complete work. We help identify the difference before the homeowner chooses a contractor.`,
    `The final decision remains with the homeowner. Our job is to help make that decision more informed by organizing scope, clarifying assumptions, reviewing bid language, and pointing out questions that should be answered before construction starts.`,
  ];
}

function GuidanceSectionGrid({ sections }: { sections: GuidanceSection[] }) {
  return <div className="mt-8 grid gap-5 md:grid-cols-2">{sections.map((section) => <Card key={section.title} className="luxury-card"><CardContent className="p-6"><h3 className="font-serif text-2xl text-[var(--relax-navy)]">{section.title}</h3><Paragraphs items={section.paragraphs} /></CardContent></Card>)}</div>;
}

function SeoDepthSection({ sections }: { sections: GuidanceSection[] }) {
  return <PageSection eyebrow="Planning guide" title="Readable guidance by decision point"><div className="grid gap-8 lg:grid-cols-[1fr_0.38fr]"><GuidanceSectionGrid sections={sections} /><Card className="luxury-card h-fit"><CardContent className="p-7"><h3 className="font-serif text-3xl text-[var(--relax-navy)]">What this protects</h3><ul className="mt-5 space-y-3 text-muted-foreground"><li>Comparable contractor bids</li><li>Clearer budget expectations</li><li>Better scope documentation</li><li>Fewer rushed decisions</li><li>More confident contractor selection</li></ul></CardContent></Card></div></PageSection>;
}

function FaqSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return <PageSection eyebrow="FAQ" title="Questions homeowners ask" muted><div className="mt-8 grid gap-4 md:grid-cols-2">{faqs.map((faq) => <Card key={faq.question} className="luxury-card"><CardContent className="p-6"><h3 className="font-semibold text-[var(--relax-navy)]">{faq.question}</h3><p className="mt-3 leading-7 text-muted-foreground">{faq.answer}</p></CardContent></Card>)}</div></PageSection>;
}

function WordCountNote() {
  return <p className="mt-4 text-sm font-semibold text-muted-foreground">Each service and city page is organized into short sections, practical checklists, FAQs, and related local links so homeowners can scan the guidance without reading a wall of text.</p>;
}

function CtaSection({ title = "Start with clarity before you commit" }: { title?: string }) {
  return <section className="navy-panel py-16"><div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div><h2 className="font-serif text-4xl text-[var(--relax-white)]">{title}</h2><p className="mt-3 text-[rgba(247,243,234,0.8)]">{callbackCopy}</p></div><Button asChild className="rounded-full bg-[var(--relax-gold)] text-[var(--relax-navy)] hover:bg-[var(--relax-gold-light)]"><Link href="/contact">Request a callback <ArrowRight className="h-4 w-4" /></Link></Button></div></section>;
}

export function ServicesIndexPage() {
  return <PageShell><LocalSeoHead title="Remodel Consulting Services | Oklahoma Remodel Consulting" description={servicesIntro} canonicalPath="/services" /><main><Hero eyebrow="Services" title="Remodel consulting services" text={servicesIntro} /><section className="container py-20"><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--relax-gold)] focus-visible:ring-offset-4"><Card className="luxury-card h-full transition-transform duration-200 group-hover:-translate-y-1 group-hover:border-[var(--relax-gold)]/50"><CardContent className="p-7"><ShieldCheck className="h-7 w-7 text-[var(--relax-gold)]" /><h2 className="mt-5 font-serif text-3xl text-[var(--relax-navy)] group-hover:text-[var(--relax-gold)]">{service.name}</h2><p className="mt-3 text-muted-foreground">{service.shortDescription}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--relax-navy)] group-hover:text-[var(--relax-gold)]">View service <ArrowRight className="h-4 w-4" /></span></CardContent></Card></Link>)}</div><p className="mt-10 text-center text-sm font-semibold text-muted-foreground">{callbackCopy}</p></section></main></PageShell>;
}

export function ServiceHubPage() {
  const [, params] = useRoute("/services/:serviceSlug");
  const service = getServiceBySlug(params?.serviceSlug);
  if (!service) return <NotFound />;
  const enabledCities = cities.filter((city) => city.enabledCombinations.includes(service.slug));
  return <PageShell><LocalSeoHead title={service.metaTitle} description={service.metaDescription} canonicalPath={`/services/${service.slug}`} schema={serviceHubSchema(service.slug)} /><main><VisibleBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.name }]} /><Hero eyebrow="Service" title={service.name} text={service.shortDescription} /><PageSection eyebrow="Overview" title="A clearer plan before contractor conversations"><Paragraphs items={service.content.overview} /><AdvisoryCallout>{service.content.advisoryNote}</AdvisoryCallout></PageSection><PageSection eyebrow="Review" title="What we review" muted><BulletList items={service.content.reviewItems} /></PageSection><PageSection eyebrow="Risk review" title="Common risks and decision points"><BulletList items={service.content.riskPoints} /></PageSection><PageSection eyebrow="Process" title="How the consulting process works" muted><NumberedSteps items={service.content.processSteps} /></PageSection><PageSection eyebrow="Timing" title="When to call OKC Remodel"><BulletList items={service.content.whenToCall} /></PageSection><SeoDepthSection sections={serviceGuidanceSections(service)} /><FaqSection faqs={service.faqs} /><PageSection eyebrow="SEO service area" title="Service-area guidance for homeowners"><Paragraphs items={[`This ${service.name.toLowerCase()} page is written for homeowners comparing remodel planning, budget guidance, contractor vetting, bid review, and scope development across Oklahoma City and communities within about 60 miles. It explains how independent remodel consulting helps before contractor commitments are made.`, `If you are searching for ${service.name.toLowerCase()} near Oklahoma City, Pittsburg, Miami, Joplin, or surrounding communities, the most important first step is a clear written scope. Better scope language makes contractor pricing easier to compare and helps keep the homeowner in control of the decision.`]} /><WordCountNote /></PageSection><PageSection eyebrow="Cities" title="Cities we serve for this service"><div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{enabledCities.length ? enabledCities.map((city) => <Link key={city.slug} href={serviceCityPath(service.slug, city.slug)} className="rounded-2xl border border-border bg-card p-4 font-semibold text-[var(--relax-navy)] hover:text-[var(--relax-gold)]">{city.name}, {city.state}</Link>) : <p className="rounded-2xl border border-border bg-card p-4 text-muted-foreground">This service is available by consultation throughout the broader tri-state service area.</p>}</div></PageSection><CtaSection /></main></PageShell>;
}

export function ServingIndexPage() {
  return <PageShell><LocalSeoHead title="Service Area | Oklahoma Remodel Consulting" description={servingIntro} canonicalPath="/serving" /><main><Hero eyebrow="Service Area" title="Service area" text={servingIntro} /><section className="container py-20"><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{cities.map((city) => <Link key={city.slug} href={`/service-area/${city.slug}`} className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--relax-gold)] focus-visible:ring-offset-4"><Card className="luxury-card h-full transition-transform duration-200 group-hover:-translate-y-1 group-hover:border-[var(--relax-gold)]/50"><CardContent className="p-7"><MapPin className="h-7 w-7 text-[var(--relax-gold)]" /><h2 className="mt-5 font-serif text-3xl text-[var(--relax-navy)] group-hover:text-[var(--relax-gold)]">{city.name}, {city.state}</h2><p className="mt-3 text-muted-foreground">{city.content.hero[0]}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--relax-navy)] group-hover:text-[var(--relax-gold)]">View city <ArrowRight className="h-4 w-4" /></span></CardContent></Card></Link>)}</div><p className="mt-10 text-center text-sm font-semibold text-muted-foreground">{callbackCopy}</p></section></main></PageShell>;
}

export function CityHubPage() {
  const [, servingParams] = useRoute("/serving/:citySlug");
  const [, serviceAreaParams] = useRoute("/service-area/:slug");
  const city = getCityBySlug(servingParams?.citySlug ?? serviceAreaParams?.slug);
  if (!city) return <NotFound />;
  const enabledServices = services;
  const relatedServices = enabledServices.length ? enabledServices : services.slice(0, 6);
  return <PageShell><LocalSeoHead title={city.metaTitle} description={city.metaDescription} canonicalPath={`/service-area/${city.slug}`} schema={cityHubSchema(city.slug)} /><main><VisibleBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service Area", href: "/service-area" }, { label: `${city.name}, ${city.state}` }]} /><Hero eyebrow="Service Area" title={`Remodel consulting in ${city.name}, ${city.state}`} text={city.content.hero[0]} /><PageSection eyebrow="Local context" title={`Remodel planning in ${city.name}`}><Paragraphs items={city.content.localContext} /><AdvisoryCallout>{city.content.advisoryNote}</AdvisoryCallout></PageSection><PageSection eyebrow="Project types" title="Common project types in this area" muted><BulletList items={city.content.commonProjectTypes} /></PageSection><PageSection eyebrow="Planning risks" title="Planning and contractor-selection risks"><BulletList items={city.content.planningRisks} /></PageSection><PageSection eyebrow="Before money is committed" title="How OKC Remodel helps"><NumberedSteps items={city.content.howWeHelp} /></PageSection><PageSection eyebrow="SEO service area" title={`${city.name} remodel consulting guidance`}><Paragraphs items={[`This ${city.name}, ${city.state} service-area page is written for homeowners searching for remodel consulting, contractor vetting, bid review, budget guidance, and scope planning before construction starts.`, `Oklahoma Remodel Consulting helps ${city.name} homeowners prepare for kitchen, bathroom, basement, flooring, exterior, addition, drywall, painting, and contractor-selection conversations with a clearer planning framework.`, `The purpose is to make the page useful for real homeowners and search engines at the same time: specific local context, visible headings, short readable paragraphs, and service links that explain what kind of help is available.`]} /><WordCountNote /></PageSection><PageSection eyebrow="Related services" title="Useful advisory services for this market" muted><p className="mt-5 max-w-3xl leading-7 text-muted-foreground">{city.content.relatedServicesIntro}</p><div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{relatedServices.map((service) => <Link key={service.slug} href={serviceCityPath(service.slug, city.slug)} className="rounded-2xl border border-border bg-card p-4 font-semibold text-[var(--relax-navy)] hover:text-[var(--relax-gold)]">{service.name}</Link>)}</div><h3 className="mt-10 font-serif text-2xl text-[var(--relax-navy)]">Nearby areas we serve</h3><p className="mt-3 text-muted-foreground">{city.nearbyAreas.join(", ")}</p></PageSection><SeoDepthSection sections={cityGuidanceSections(city)} /><FaqSection faqs={city.content.faqs} /><CtaSection /></main></PageShell>;
}

export function ServiceCityPage() {
  const [, params] = useRoute("/services/:serviceSlug/:citySlug");
  const service = getServiceBySlug(params?.serviceSlug);
  const city = getCityBySlug(params?.citySlug);
  if (!service || !city || !isServiceCityEnabled(service.slug, city.slug)) return <NotFound />;
  const description = serviceCityDescription(service.name, city.name, city.state);
  const relatedCities = cities.filter((item) => item.slug !== city.slug && item.enabledCombinations.includes(service.slug)).slice(0, 3);
  const relatedServices = city.enabledCombinations.filter((slug) => slug !== service.slug).map(getServiceBySlug).filter(Boolean).slice(0, 3) as typeof services;
  const localFaqs = [{ question: `How does ${service.name.toLowerCase()} help in ${city.name}?`, answer: `It helps define scope, risk questions, budget assumptions, and contractor fit before bids or deposits are treated as final.` }, ...service.faqs.slice(0, 2)];
  return <PageShell><LocalSeoHead title={`${service.name} in ${city.name}, ${city.state} | Oklahoma Remodel Consulting`} description={description} canonicalPath={serviceCityPath(service.slug, city.slug)} schema={serviceCitySchema(service.slug, city.slug)} /><main><VisibleBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.name, href: `/services/${service.slug}` }, { label: `${city.name}, ${city.state}` }]} /><Hero eyebrow="Local service" title={`${service.name} in ${city.name}, ${city.state}`} text={description} /><PageSection eyebrow="Overview" title={`Planning ${service.name.toLowerCase()} in ${city.name}`}><Paragraphs items={[...service.content.overview.slice(0, 2), ...city.content.localContext.slice(0, 1)]} /><AdvisoryCallout>{service.content.advisoryNote}</AdvisoryCallout></PageSection><PageSection eyebrow="What we review" title="Scope details to clarify before bids" muted><BulletList items={service.content.reviewItems} /></PageSection><PageSection eyebrow="Local concerns" title={`Common ${city.name} planning risks`}><BulletList items={[...service.content.riskPoints.slice(0, 2), ...city.content.planningRisks.slice(0, 2)]} /></PageSection><PageSection eyebrow="Process" title="How the consulting process works before money is committed" muted><NumberedSteps items={service.content.processSteps} /></PageSection><PageSection eyebrow="When to call" title="Good reasons to ask for help"><BulletList items={service.content.whenToCall} /></PageSection><SeoDepthSection sections={serviceCityGuidanceSections(service, city)} /><PageSection eyebrow="SEO local service guidance" title={`Why scope clarity matters for ${service.name.toLowerCase()} in ${city.name}`}><Paragraphs items={[`Homeowners searching for ${service.name.toLowerCase()} in ${city.name}, ${city.state} usually need more than a quick price. They need to know what is included, what is excluded, what assumptions affect the budget, and which contractor is most appropriate for the work.`, `This local service page is structured around remodel planning, independent bid review, contractor vetting, realistic budget guidance, and scope development because those are the decisions that make contractor conversations more productive.`, `The page intentionally uses readable sections, short paragraphs, bullets, FAQs, and related local links instead of one long block of copy. That structure supports local SEO while still being useful for homeowners who are trying to make a careful decision.`]} /><WordCountNote /></PageSection><PageSection eyebrow="Related" title="Related cities and services" muted><div className="grid gap-8 md:grid-cols-2"><Card className="luxury-card"><CardContent className="p-7"><h3 className="font-serif text-3xl text-[var(--relax-navy)]">Related cities</h3><div className="mt-5 grid gap-3">{relatedCities.map((item) => <Link key={item.slug} href={serviceCityPath(service.slug, item.slug)} className="font-semibold text-[var(--relax-navy)] hover:text-[var(--relax-gold)]">{item.name}, {item.state}</Link>)}</div></CardContent></Card><Card className="luxury-card"><CardContent className="p-7"><h3 className="font-serif text-3xl text-[var(--relax-navy)]">Related services</h3><div className="mt-5 grid gap-3">{relatedServices.map((item) => <Link key={item.slug} href={serviceCityPath(item.slug, city.slug)} className="font-semibold text-[var(--relax-navy)] hover:text-[var(--relax-gold)]">{item.name}</Link>)}</div></CardContent></Card></div></PageSection><FaqSection faqs={localFaqs} /><CtaSection title={`Talk through ${service.name.toLowerCase()} in ${city.name}`} /></main></PageShell>;
}
