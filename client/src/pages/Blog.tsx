import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";
import { Header, Footer } from "./Home";
import { ArrowRight, BookOpen, CalendarDays } from "lucide-react";
import { Link } from "wouter";

export default function Blog() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <main>
        <section className="relative overflow-hidden navy-panel">
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,253,248,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,253,248,.08)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="container relative py-20 md:py-28">
            <p className="eyebrow bg-white/10 text-[#D4A85E]">Remodel planning blog</p>
            <h1 className="mt-7 max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight text-[#FFFDF8] md:text-7xl">
              Clear advice before the remodel gets expensive.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#F7F3EA]/82">
              Practical homeowner guidance on scope, budget, contractor selection, and why independent construction experience matters before you sign.
            </p>
          </div>
        </section>

        <section className="container py-18 md:py-24">
          <div className="grid gap-7 lg:grid-cols-2">
            {blogPosts.map((post) => (
              <Card key={post.slug} className="luxury-card group overflow-hidden border-[#C79440]/20">
                <CardContent className="flex h-full flex-col p-7 md:p-9">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className="rounded-full bg-[#C79440]/12 px-4 py-2 text-[#10243A]">{post.category}</Badge>
                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4" /> {post.date}</span>
                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground"><BookOpen className="h-4 w-4" /> {post.readTime}</span>
                  </div>
                  <h2 className="mt-6 font-serif text-4xl leading-tight text-[#10243A] transition group-hover:text-[#C79440]">{post.title}</h2>
                  <p className="mt-5 text-lg leading-8 text-[#17324F]">{post.hero}</p>
                  <p className="mt-4 leading-7 text-muted-foreground">{post.description}</p>
                  <div className="mt-auto pt-8">
                    <Button asChild className="rounded-full bg-[#10243A] px-7 text-[#FFFDF8] hover:bg-[#C79440] hover:text-[#10243A]">
                      <Link href={`/blog/${post.slug}`}>Read article <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
