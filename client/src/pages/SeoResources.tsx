import { LocalSeoHead } from "@/components/LocalSeoHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSeoResource, resourceIndexPath, resourceKindLabel, resourcesByKind, seoResources, type SeoResourceKind } from "@/data/seoResources";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ClipboardList, GitCompareArrows, HelpCircle } from "lucide-react";
import { Link, useRoute } from "wouter";
import { Footer, Header } from "./Home";
import NotFound from "./NotFound";


function VisibleBreadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav aria-label="Breadcrumb" data-visible-breadcrumbs="true" className="border-b border-border/70 bg-[rgba(255,253,248,0.72)]"><ol className="container flex flex-wrap items-center gap-2 py-3 text-sm font-semibold text-muted-foreground">{items.map((item, index) => <li key={`${item.label}-${index}`} className="flex items-center gap-2">{index > 0 ? <span aria-hidden="true" className="text-[#C79440]">/</span> : null}{item.href ? <Link href={item.href} className="text-[#10243A] hover:text-[#C79440]">{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav>;
}

const kindMeta: Record<SeoResourceKind, { eyebrow: string; title: string; description: string; icon: typeof ClipboardList }> = {
  guide: {
    eyebrow: "Remodel planning guides",
    title: "Remodel planning answers before contractor commitments.",
    description: "Detailed homeowner guides for remodel budgets, bid review, allowances, scope development, and contractor questions across Oklahoma City and communities within about 60 miles.",
    icon: BookOpen,
  },
  comparison: {
    eyebrow: "Comparison guides",
    title: "Understand the remodel roles before you choose a path.",
    description: "Plain-English comparison pages explaining remodel consultants, contractors, bid review, design-build, project management, and contractor vetting.",
    icon: GitCompareArrows,
  },
  checklist: {
    eyebrow: "Remodel checklists",
    title: "Download-style remodel checklists without the fluff.",
    description: "Practical planning checklists for kitchen remodels, bathroom bid review, contractor comparison, scope writing, and deposit readiness.",
    icon: ClipboardList,
  },
};

function schemaForIndex(kind: SeoResourceKind) {
  const path = resourceIndexPath(kind);
  const meta = kindMeta[kind];
  const resources = resourcesByKind(kind);
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": `https://www.okcremodelconsulting.com${path}#webpage`, url: `https://www.okcremodelconsulting.com${path}`, name: meta.title, description: meta.description },
      { "@type": "ItemList", name: resourceKindLabel(kind), itemListElement: resources.map((resource, index) => ({ "@type": "ListItem", position: index + 1, name: resource.shortTitle, url: `https://www.okcremodelconsulting.com${resource.path}` })) },
    ],
  };
}

function schemaForResource(resource: ReturnType<typeof getSeoResource> extends infer T ? NonNullable<T> : never) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `https://www.okcremodelconsulting.com${resource.path}#webpage`, url: `https://www.okcremodelconsulting.com${resource.path}`, name: resource.title, description: resource.description },
      { "@type": ["Article", "BlogPosting"], "@id": `https://www.okcremodelconsulting.com${resource.path}#article`, headline: resource.shortTitle, description: resource.description, articleSection: resource.category, publisher: { "@id": "https://www.okcremodelconsulting.com/#business" }, author: { "@id": "https://www.okcremodelconsulting.com/about#toby-miller" } },
      { "@type": "FAQPage", mainEntity: resource.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.okcremodelconsulting.com" },
        { "@type": "ListItem", position: 2, name: resourceKindLabel(resource.kind), item: `https://www.okcremodelconsulting.com${resourceIndexPath(resource.kind)}` },
        { "@type": "ListItem", position: 3, name: resource.shortTitle, item: `https://www.okcremodelconsulting.com${resource.path}` },
      ] },
    ],
  };
}

export function ResourceIndexPage({ kind }: { kind: SeoResourceKind }) {
  const meta = kindMeta[kind];
  const Icon = meta.icon;
  const resources = resourcesByKind(kind);
  const path = resourceIndexPath(kind);
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <LocalSeoHead title={`${resourceKindLabel(kind)} | Oklahoma Remodel Consulting`} description={meta.description} canonicalPath={path} schema={schemaForIndex(kind)} />
      <Header />
      <main>
        <VisibleBreadcrumbs items={[{ label: "Home", href: "/" }, { label: resourceKindLabel(kind) }]} />
        <section className="relative overflow-hidden navy-panel">
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,253,248,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,253,248,.08)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="container relative py-20 md:py-28">
            <p className="eyebrow bg-white/10 text-[#D4A85E]">{meta.eyebrow}</p>
            <h1 className="mt-7 max-w-5xl font-serif text-5xl leading-[0.95] tracking-tight text-[#FFFDF8] md:text-7xl">{meta.title}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#F7F3EA]/82">{meta.description}</p>
          </div>
        </section>
        <section className="container py-18 md:py-24">
          <div className="grid gap-7 lg:grid-cols-2">
            {resources.map((resource) => (
              <Link key={resource.slug} href={resource.path} className="group block h-full rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C79440] focus-visible:ring-offset-4">
                <Card className="luxury-card h-full overflow-hidden border-[#C79440]/20 transition-transform duration-200 group-hover:-translate-y-1 group-hover:border-[#C79440]/50">
                  <CardContent className="flex h-full flex-col p-7 md:p-9">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge className="rounded-full bg-[#C79440]/12 px-4 py-2 text-[#10243A]">{resource.category}</Badge>
                      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground"><Icon className="h-4 w-4" /> {resource.readTime}</span>
                    </div>
                    <h2 className="mt-6 font-serif text-4xl leading-tight text-[#10243A] transition group-hover:text-[#C79440]">{resource.shortTitle}</h2>
                    <p className="mt-5 text-lg leading-8 text-[#17324F]">{resource.hero}</p>
                    <p className="mt-4 leading-7 text-muted-foreground">{resource.description}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-[#10243A] group-hover:text-[#C79440]">Open guide <ArrowRight className="h-4 w-4" /></span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ResourceBody({ resource }: { resource: NonNullable<ReturnType<typeof getSeoResource>> }) {
  const siblings = seoResources.filter((item) => item.slug !== resource.slug).slice(0, 4);
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <LocalSeoHead title={resource.title} description={resource.description} canonicalPath={resource.path} schema={schemaForResource(resource)} />
      <Header />
      <main>
        <VisibleBreadcrumbs items={[{ label: "Home", href: "/" }, { label: resourceKindLabel(resource.kind), href: resourceIndexPath(resource.kind) }, { label: resource.shortTitle }]} />
        <section className="relative overflow-hidden navy-panel">
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,253,248,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,253,248,.08)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="container relative py-18 md:py-24">
            <Button asChild variant="outline" className="rounded-full border-[#D4A85E]/40 bg-white/10 text-[#FFFDF8] hover:bg-[#D4A85E] hover:text-[#10243A]"><Link href={resourceIndexPath(resource.kind)}><ArrowLeft className="mr-2 h-4 w-4" /> {resourceKindLabel(resource.kind)}</Link></Button>
            <Badge className="mt-8 rounded-full border-[#C79440]/40 bg-[#C79440]/15 px-4 py-2 text-[#F7F3EA]">{resource.category}</Badge>
            <h1 className="mt-7 max-w-5xl font-serif text-5xl leading-tight tracking-tight text-[#FFFDF8] md:text-7xl">{resource.shortTitle}</h1>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-[#F7F3EA]/82">{resource.hero}</p>
          </div>
        </section>
        <section className="container py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
            <article className="luxury-card overflow-hidden rounded-[2rem] border border-[#C79440]/20 bg-[#FFFDF8] shadow-xl">
              <div className="border-b border-[#C79440]/15 bg-[#F7F3EA] p-7 md:p-10">
                <p className="eyebrow text-[#C79440]">Homeowner resource</p>
                <p className="mt-4 font-serif text-3xl leading-tight text-[#10243A] md:text-4xl">{resource.description}</p>
              </div>
              <div className="space-y-12 p-7 md:p-12">
                {resource.sections.map((section, index) => (
                  <section key={`${section.heading}-${index}`} className="scroll-mt-28 border-b border-[#C79440]/12 pb-10 last:border-b-0 last:pb-0">
                    {section.eyebrow ? <p className="eyebrow text-[#C79440]">{section.eyebrow}</p> : null}
                    <h2 className="mt-3 font-serif text-3xl leading-tight text-[#10243A] md:text-4xl">{section.heading}</h2>
                    <div className="mt-6 space-y-5 text-lg leading-8 text-muted-foreground">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                    {section.bullets?.length ? <div className="mt-7 grid gap-3 rounded-[1.5rem] border border-[#C79440]/20 bg-[#F7F3EA] p-5">{section.bullets.map((bullet) => <div key={bullet} className="flex gap-3 font-semibold leading-7 text-[#17324F]"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#C79440]" /><span>{bullet}</span></div>)}</div> : null}
                  </section>
                ))}
                <section className="rounded-[1.5rem] border border-[#C79440]/20 bg-[#F7F3EA] p-6">
                  <p className="eyebrow text-[#C79440]">FAQ</p>
                  <h2 className="mt-3 font-serif text-3xl text-[#10243A]">Common questions</h2>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">{resource.faqs.map((faq) => <div key={faq.question} className="rounded-2xl bg-white/70 p-5"><h3 className="font-semibold text-[#10243A]"><HelpCircle className="mr-2 inline h-4 w-4 text-[#C79440]" />{faq.question}</h3><p className="mt-3 leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div>
                </section>
              </div>
            </article>
            <aside className="sticky top-32 grid gap-5">
              <Card className="luxury-card border-[#C79440]/20"><CardContent className="p-6"><p className="eyebrow">Need remodel clarity?</p><h2 className="mt-4 font-serif text-3xl text-[#10243A]">Start before you sign.</h2><p className="mt-4 leading-7 text-muted-foreground">Get experienced guidance on scope, budget, contractor fit, and bid comparison before your remodel turns expensive.</p><Button asChild className="mt-6 rounded-full bg-[#10243A] px-6 text-[#FFFDF8] hover:bg-[#C79440] hover:text-[#10243A]"><Link href="/contact">Start your project</Link></Button></CardContent></Card>
              <Card className="luxury-card border-[#C79440]/20"><CardContent className="p-6"><p className="eyebrow">Related links</p><div className="mt-5 grid gap-3">{resource.relatedLinks.map((link) => <Link key={link.href} href={link.href} className="font-semibold text-[#10243A] hover:text-[#C79440]">{link.label}</Link>)}</div></CardContent></Card>
              <Card className="luxury-card border-[#C79440]/20"><CardContent className="p-6"><p className="eyebrow">More resources</p><div className="mt-5 grid gap-3">{siblings.map((item) => <Link key={item.path} href={item.path} className="font-semibold text-[#10243A] hover:text-[#C79440]">{item.shortTitle}</Link>)}</div></CardContent></Card>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export function GuideIndexPage() { return <ResourceIndexPage kind="guide" />; }
export function ComparisonIndexPage() { return <ResourceIndexPage kind="comparison" />; }
export function ChecklistIndexPage() { return <ResourceIndexPage kind="checklist" />; }

export function GuidePage() {
  const [, params] = useRoute("/guides/:slug");
  const resource = getSeoResource("guide", params?.slug);
  return resource ? <ResourceBody resource={resource} /> : <NotFound />;
}

export function ComparisonPage() {
  const [, params] = useRoute("/compare/:slug");
  const resource = getSeoResource("comparison", params?.slug);
  return resource ? <ResourceBody resource={resource} /> : <NotFound />;
}

export function ChecklistPage() {
  const [, params] = useRoute("/checklists/:slug");
  const resource = getSeoResource("checklist", params?.slug);
  return resource ? <ResourceBody resource={resource} /> : <NotFound />;
}
