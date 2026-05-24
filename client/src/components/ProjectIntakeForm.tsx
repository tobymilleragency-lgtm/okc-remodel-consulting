import { useState } from "react";
import { ArrowRight, ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const projectTypes = [
  "Bathroom",
  "Kitchen",
  "Flooring",
  "Addition",
  "Deck",
  "Whole Home",
  "Exterior",
  "Other",
  "Basement",
  "New Construction",
  "Roof",
];

const states = ["Oklahoma", "Oklahoma", "Missouri"];

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  projectType: "",
  projectDescription: "",
  bestTime: "",
  consent: false,
};

type FormState = typeof initialForm;

type ProjectIntakeFormProps = {
  compact?: boolean;
  sourceLabel?: string;
};

export function ProjectIntakeForm({ compact = false, sourceLabel = "contact-page" }: ProjectIntakeFormProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const update = (field: keyof FormState, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          sourceUrl: window.location.href,
          sourceLabel,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setForm(initialForm);
      setStatus("success");
      setMessage("Your project information was sent. You will be called back to schedule your consultation.");
    } catch (_error) {
      setStatus("error");
      setMessage("The form could not be sent. Please email toby@okcremodelconsulting.com.");
    }
  }

  return (
    <Card className="luxury-card border-[#D4A85E]/30 bg-[#FFFDF8]/95 shadow-[0_32px_100px_rgba(0,0,0,.22)]">
      <CardContent className={compact ? "p-5 md:p-6" : "p-6 md:p-8"}>
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <Badge className="rounded-full bg-[#C79440]/12 px-3 py-1 text-[#10243A]">Project intake</Badge>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#10243A]">Your first step</h2>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10243A] text-[#D4A85E]">
            <ClipboardList className="h-7 w-7" />
          </div>
        </div>

        <form className={compact ? "grid gap-4" : "grid gap-5"} onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor={`${sourceLabel}-firstName`}>First Name</Label>
              <Input id={`${sourceLabel}-firstName`} required value={form.firstName} onChange={(event) => update("firstName", event.target.value)} className="bg-white/80" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor={`${sourceLabel}-lastName`}>Last Name</Label>
              <Input id={`${sourceLabel}-lastName`} required value={form.lastName} onChange={(event) => update("lastName", event.target.value)} className="bg-white/80" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor={`${sourceLabel}-email`}>Email</Label>
              <Input id={`${sourceLabel}-email`} required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} className="bg-white/80" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor={`${sourceLabel}-phone`}>Phone</Label>
              <Input id={`${sourceLabel}-phone`} required type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} className="bg-white/80" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor={`${sourceLabel}-city`}>City</Label>
              <Input id={`${sourceLabel}-city`} required value={form.city} onChange={(event) => update("city", event.target.value)} className="bg-white/80" />
            </div>
            <div className="grid gap-2">
              <Label id={`${sourceLabel}-state-label`}>State</Label>
              <Select required value={form.state} onValueChange={(value) => update("state", value)}>
                <SelectTrigger aria-labelledby={`${sourceLabel}-state-label`} aria-label="State" className="w-full bg-white/80">
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label id={`${sourceLabel}-projectType-label`}>Project Type</Label>
            <Select required value={form.projectType} onValueChange={(value) => update("projectType", value)}>
              <SelectTrigger aria-labelledby={`${sourceLabel}-projectType-label`} aria-label="Project type" className="w-full bg-white/80">
                <SelectValue placeholder="Select a project type" />
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor={`${sourceLabel}-projectDescription`}>Project Description</Label>
            <Textarea id={`${sourceLabel}-projectDescription`} required className={compact ? "min-h-28 bg-white/80" : "min-h-36 bg-white/80"} value={form.projectDescription} onChange={(event) => update("projectDescription", event.target.value)} placeholder="Tell us what you want changed, what is frustrating today, and any timing or budget concerns." />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={`${sourceLabel}-bestTime`}>Best time to reach you <span className="text-muted-foreground">(optional)</span></Label>
            <Input id={`${sourceLabel}-bestTime`} value={form.bestTime} onChange={(event) => update("bestTime", event.target.value)} className="bg-white/80" />
          </div>

          <label className="flex items-start gap-3 rounded-2xl border border-[#C79440]/25 bg-[#F7F3EA]/70 p-4 text-sm leading-6 text-[#333333]">
            <Checkbox required checked={form.consent} onCheckedChange={(checked) => update("consent", checked === true)} />
            <span>I understand Oklahoma Remodel Consulting is an advisory service, not a contractor. My construction contract, when I'm ready, will be directly with the contractor.</span>
          </label>

          <Button type="submit" className="group w-full rounded-full bg-[#C79440] px-8 text-[#10243A] shadow-[0_18px_40px_rgba(199,148,64,.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D4A85E] sm:w-fit" disabled={status === "loading"}>
            {status === "loading" ? "Sending" : "Send project details"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          {message ? <p className={`text-sm font-medium ${status === "error" ? "text-destructive" : "text-[#10243A]"}`}>{message}</p> : null}
        </form>
      </CardContent>
    </Card>
  );
}
