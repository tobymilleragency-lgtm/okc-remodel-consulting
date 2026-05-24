import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation, Search } from "lucide-react";

const serviceCities = [
  { city: "Oklahoma City", state: "OK", anchor: true },
  { city: "Altamont", state: "OK" },
  { city: "Bartlett", state: "OK" },
  { city: "Baxter Springs", state: "OK" },
  { city: "Caney", state: "OK" },
  { city: "Chanute", state: "OK" },
  { city: "Chetopa", state: "OK" },
  { city: "Cherryvale", state: "OK" },
  { city: "Coffeyville", state: "OK" },
  { city: "Columbus", state: "OK" },
  { city: "Erie", state: "OK" },
  { city: "Fredonia", state: "OK" },
  { city: "Galena", state: "OK" },
  { city: "Girard", state: "OK" },
  { city: "Independence", state: "OK" },
  { city: "Iola", state: "OK" },
  { city: "Neodesha", state: "OK" },
  { city: "Parsons", state: "OK" },
  { city: "Pittsburg", state: "OK" },
  { city: "Yates Center", state: "OK" },
  { city: "Afton", state: "OK" },
  { city: "Bartlesville", state: "OK" },
  { city: "Bernice", state: "OK" },
  { city: "Big Cabin", state: "OK" },
  { city: "Commerce", state: "OK" },
  { city: "Copan", state: "OK" },
  { city: "Dewey", state: "OK" },
  { city: "Fairland", state: "OK" },
  { city: "Grove", state: "OK" },
  { city: "Miami", state: "OK" },
  { city: "Nowata", state: "OK" },
  { city: "Picher", state: "OK" },
  { city: "Quapaw", state: "OK" },
  { city: "South Coffeyville", state: "OK" },
  { city: "Vinita", state: "OK" },
  { city: "Welch", state: "OK" },
  { city: "Wyandotte", state: "OK" },
  { city: "Anderson", state: "MO" },
  { city: "Carl Junction", state: "MO" },
  { city: "Carthage", state: "MO" },
  { city: "Diamond", state: "MO" },
  { city: "Duquesne", state: "MO" },
  { city: "Goodman", state: "MO" },
  { city: "Granby", state: "MO" },
  { city: "Joplin", state: "MO" },
  { city: "Neosho", state: "MO" },
  { city: "Seneca", state: "MO" },
  { city: "Webb City", state: "MO" },
];

const cityPins = [
  { label: "Parsons", x: "36%", y: "37%" },
  { label: "Pittsburg", x: "62%", y: "42%" },
  { label: "Joplin", x: "73%", y: "55%" },
  { label: "Miami", x: "57%", y: "72%" },
  { label: "Coffeyville", x: "30%", y: "69%" },
  { label: "Grove", x: "69%", y: "80%" },
  { label: "Independence", x: "24%", y: "54%" },
];

export function ServiceAreaMap() {
  const [query, setQuery] = useState("");
  const filteredCities = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return serviceCities;
    return serviceCities.filter(({ city, state }) => `${city} ${state}`.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <div className="grid gap-6">
      <Card className="luxury-card overflow-hidden border-[#C79440]/20 bg-[#10243A] text-[#F7F3EA]">
        <CardContent className="p-0">
          <div className="relative min-h-[380px] overflow-hidden bg-[radial-gradient(circle_at_center,rgba(212,168,94,.22),transparent_17rem),linear-gradient(135deg,rgba(255,253,248,.08),rgba(255,253,248,.02))]">
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4A85E]/30 bg-[#D4A85E]/8" />
            <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4A85E]/30" />
            <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4A85E]/35" />
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-3xl border border-[#D4A85E]/40 bg-[#FFFDF8] px-5 py-4 text-center text-[#10243A] shadow-[0_20px_50px_rgba(0,0,0,.25)]">
              <MapPin className="h-7 w-7 text-[#C79440]" />
              <span className="mt-2 font-serif text-2xl">Oklahoma City, OK</span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B6258]">70 mile radius</span>
            </div>
            {cityPins.map((pin) => (
              <div key={pin.label} className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-[#D4A85E]/25 bg-[#FFFDF8]/92 px-3 py-1.5 text-xs font-semibold text-[#10243A] shadow-lg" style={{ left: pin.x, top: pin.y }}>
                <span className="h-2 w-2 rounded-full bg-[#C79440]" />
                {pin.label}
              </div>
            ))}
            <div className="absolute left-5 top-5 rounded-full border border-[#D4A85E]/30 bg-[#10243A]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A85E] backdrop-blur">
              Southeast OK · NE Oklahoma · SW Missouri
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-[#D4A85E]/25 bg-[#10243A]/82 p-4 text-sm leading-6 text-[#F7F3EA]/82 backdrop-blur">
              <Navigation className="mb-2 h-5 w-5 text-[#D4A85E]" />
              Service is centered on Oklahoma City, Oklahoma and generally covers communities within about 70 miles. If you are near the edge, reach out and we can confirm fit.
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="luxury-card border-[#C79440]/20">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Cities we serve</p>
              <h3 className="mt-3 font-serif text-3xl text-[#10243A]">Search the 70-mile service area</h3>
            </div>
            <Badge className="w-fit rounded-full bg-[#C79440]/12 px-4 py-2 text-[#10243A]">{serviceCities.length} listed communities</Badge>
          </div>
          <div className="mt-6 grid gap-2">
            <Label htmlFor="service-area-search" className="flex items-center gap-2 text-[#10243A]"><Search className="h-4 w-4 text-[#C79440]" /> Search by city or state</Label>
            <Input id="service-area-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Example: Joplin, Parsons, Miami, Coffeyville" className="bg-white/80" />
          </div>
          <div className="mt-6 max-h-72 overflow-y-auto rounded-3xl border border-[#D7D0C2] bg-[#FFFDF8]/70 p-4">
            {filteredCities.length ? (
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCities.map(({ city, state, anchor }) => (
                  <div key={`${city}-${state}`} className="flex items-center justify-between rounded-2xl border border-[#C79440]/15 bg-white/75 px-4 py-3 text-sm font-medium text-[#10243A]">
                    <span>{city}</span>
                    <span className={anchor ? "rounded-full bg-[#10243A] px-2 py-1 text-xs text-[#D4A85E]" : "text-xs text-muted-foreground"}>{state}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-2xl bg-white/75 p-4 text-sm text-muted-foreground">No listed city matched. If you are within about 70 miles of Oklahoma City, Oklahoma, ask anyway and we can confirm coverage.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
