import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts, getBlogPost } from "@/data/blogPosts";
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { Link, useRoute } from "wouter";
import { Footer, Header } from "./Home";
import NotFound from "./NotFound";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const post = params?.slug ? getBlogPost(params.slug) : undefined;

  if (!post) return <NotFound />;

  const related = blogPosts.filter((item) => item.slug !== post.slug)[0];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <main>
        <section className="relative overflow-hidden navy-panel">
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,253,248,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,253,248,.08)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="container relative py-18 md:py-24">
            <Button asChild variant="outline" className="rounded-full border-[#D4A85E]/40 bg-white/10 text-[#FFFDF8] hover:bg-[#D4A85E] hover:text-[#10243A]">
              <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to blog</Link>
            </Button>
            <Badge className="mt-8 rounded-full border-[#C79440]/40 bg-[#C79440]/15 px-4 py-2 text-[#F7F3EA]">{post.category}</Badge>
            <h1 className="mt-7 max-w-5xl font-serif text-5xl leading-tight tracking-tight text-[#FFFDF8] md:text-7xl">{post.title}</h1>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-[#F7F3EA]/82">{post.hero}</p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#D4A85E]">
              <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" /> {post.date}</span>
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> {post.readTime}</span>
            </div>
          </div>
        </section>

        <section className="container py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
            <article className="luxury-card overflow-hidden rounded-[2rem] border border-[#C79440]/20 bg-[#FFFDF8] shadow-xl">
              <div className="border-b border-[#C79440]/15 bg-[#F7F3EA] p-7 md:p-10">
                <p className="eyebrow text-[#C79440]">Key takeaway</p>
                <p className="mt-4 font-serif text-3xl leading-tight text-[#10243A] md:text-4xl">{post.takeaway}</p>
                <div className="mt-7 grid gap-3 md:grid-cols-2">
                  {post.highlights.map((highlight) => (
                    <div key={highlight} className="flex gap-3 rounded-2xl border border-[#C79440]/15 bg-white/70 p-4 text-sm font-semibold leading-6 text-[#17324F]">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#C79440]" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-12 p-7 md:p-12">
                {post.sections.map((section, index) => (
                  <section key={`${section.heading}-${index}`} className="scroll-mt-28 border-b border-[#C79440]/12 pb-10 last:border-b-0 last:pb-0">
                    {section.eyebrow ? <p className="eyebrow text-[#C79440]">{section.eyebrow}</p> : null}
                    <h2 className="mt-3 font-serif text-3xl leading-tight text-[#10243A] md:text-4xl">{section.heading}</h2>
                    <div className="mt-6 space-y-5 text-lg leading-8 text-muted-foreground">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {section.bullets?.length ? (
                      <div className="mt-7 grid gap-3 rounded-[1.5rem] border border-[#C79440]/20 bg-[#F7F3EA] p-5">
                        {section.bullets.map((bullet) => (
                          <div key={bullet} className="flex gap-3 font-semibold leading-7 text-[#17324F]">
                            <Sparkles className="mt-1 h-4 w-4 shrink-0 text-[#C79440]" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {section.callout ? (
                      <blockquote className="mt-7 rounded-[1.5rem] border-l-4 border-[#C79440] bg-[#10243A] p-6 font-serif text-2xl leading-snug text-[#FFFDF8] shadow-lg">
                        {section.callout}
                      </blockquote>
                    ) : null}
                  </section>
                ))}
              </div>
            </article>

            <aside className="sticky top-32 grid gap-5">
              <Card className="luxury-card border-[#C79440]/20">
                <CardContent className="p-6">
                  <p className="eyebrow">Need remodel clarity?</p>
                  <h2 className="mt-4 font-serif text-3xl text-[#10243A]">Start before you sign.</h2>
                  <p className="mt-4 leading-7 text-muted-foreground">Get experienced guidance on scope, budget, contractor fit, and bid comparison before your remodel turns expensive.</p>
                  <Button asChild className="mt-6 rounded-full bg-[#10243A] px-6 text-[#FFFDF8] hover:bg-[#C79440] hover:text-[#10243A]">
                    <Link href="/contact">Start your project</Link>
                  </Button>
                </CardContent>
              </Card>
              {related ? (
                <Card className="luxury-card border-[#C79440]/20">
                  <CardContent className="p-6">
                    <p className="eyebrow">Read next</p>
                    <h3 className="mt-4 font-serif text-2xl text-[#10243A]">{related.title}</h3>
                    <Button asChild variant="link" className="mt-4 h-auto p-0 text-[#C79440]">
                      <Link href={`/blog/${related.slug}`}>Open article <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : null}
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
