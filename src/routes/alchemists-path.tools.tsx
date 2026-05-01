import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calculator, FlaskConical, Leaf } from "lucide-react";
import { herbs } from "@/lib/herbal-data";

export const Route = createFileRoute("/alchemists-path/tools")({
  head: () => ({
    meta: [
      { title: "Tools — The Alchemist's Path | Ascend" },
      {
        name: "description",
        content:
          "Working tools for the herbalist: dose calculator (Clark's & Young's rules), tincture ratio builder, and energetics matcher.",
      },
    ],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  return (
    <article className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Tools &amp; Calculators</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Working instruments for the bench: dose conversion for children, tincture ratios in your
          chosen menstruum, and an energetics matcher to surface allies for a pattern.
        </p>
      </header>

      <PaediatricDose />
      <TinctureRatio />
      <EnergeticsMatcher />
    </article>
  );
}

function PaediatricDose() {
  const [adultDose, setAdultDose] = useState(60);
  const [unit, setUnit] = useState<"drops" | "ml">("drops");
  const [childAge, setChildAge] = useState(6);
  const [childWeight, setChildWeight] = useState(20);
  const adultWeight = 70;

  const young = Math.round((childAge / (childAge + 12)) * adultDose);
  const clark = Math.round((childWeight / adultWeight) * adultDose);

  return (
    <section className="rounded-3xl border border-border/50 bg-card/40 p-6">
      <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <Calculator className="h-4 w-4 text-leaf-glow" /> Paediatric Dose Calculator
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Two conventional rules for converting an adult herbal dose for a child. Use the lower of
        the two as a starting point and titrate up only if needed.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Field label="Adult dose">
          <div className="flex gap-2">
            <input
              type="number"
              min={1}
              value={adultDose}
              onChange={(e) => setAdultDose(Number(e.target.value) || 0)}
              className="w-full rounded-md border border-border/60 bg-background/40 px-3 py-2 text-sm"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as "drops" | "ml")}
              className="rounded-md border border-border/60 bg-background/40 px-2 text-sm"
            >
              <option value="drops">drops</option>
              <option value="ml">mL</option>
            </select>
          </div>
        </Field>
        <Field label="Child age (years)">
          <input
            type="number"
            min={1}
            max={17}
            value={childAge}
            onChange={(e) => setChildAge(Number(e.target.value) || 0)}
            className="w-full rounded-md border border-border/60 bg-background/40 px-3 py-2 text-sm"
          />
        </Field>
        <Field label="Child weight (kg)">
          <input
            type="number"
            min={1}
            value={childWeight}
            onChange={(e) => setChildWeight(Number(e.target.value) || 0)}
            className="w-full rounded-md border border-border/60 bg-background/40 px-3 py-2 text-sm"
          />
        </Field>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Result label="Young's Rule (age-based)" value={`${young} ${unit}`} />
        <Result label="Clark's Rule (weight-based)" value={`${clark} ${unit}`} />
      </div>
      <p className="mt-3 text-xs italic text-muted-foreground">
        Always verify safety of the specific herb for the child&apos;s age. Some herbs are not
        appropriate for paediatric use at any dose.
      </p>
    </section>
  );
}

function TinctureRatio() {
  const [herbGrams, setHerbGrams] = useState(100);
  const [ratio, setRatio] = useState(5);
  const [proof, setProof] = useState(80);

  const menstruumMl = herbGrams * ratio;
  const alcoholPct = proof / 2;

  return (
    <section className="rounded-3xl border border-border/50 bg-card/40 p-6">
      <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <FlaskConical className="h-4 w-4 text-leaf-glow" /> Tincture Ratio Builder
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Weight-to-volume tinctures (1:X). Choose your herb weight, the ratio, and the proof of your
        spirit. The calculator returns total menstruum volume.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Field label="Herb weight (g)">
          <input
            type="number"
            min={1}
            value={herbGrams}
            onChange={(e) => setHerbGrams(Number(e.target.value) || 0)}
            className="w-full rounded-md border border-border/60 bg-background/40 px-3 py-2 text-sm"
          />
        </Field>
        <Field label="Ratio (1:X)">
          <input
            type="number"
            min={1}
            value={ratio}
            onChange={(e) => setRatio(Number(e.target.value) || 0)}
            className="w-full rounded-md border border-border/60 bg-background/40 px-3 py-2 text-sm"
          />
        </Field>
        <Field label="Proof">
          <input
            type="number"
            min={20}
            max={190}
            value={proof}
            onChange={(e) => setProof(Number(e.target.value) || 0)}
            className="w-full rounded-md border border-border/60 bg-background/40 px-3 py-2 text-sm"
          />
        </Field>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Result label="Menstruum volume" value={`${menstruumMl} mL`} />
        <Result label="Alcohol concentration" value={`${alcoholPct}% ABV`} />
      </div>
      <p className="mt-3 text-xs italic text-muted-foreground">
        Common starting points: 1:5 in 40% (dry herbs, Folk Method), 1:2 in 60–95% (fresh herbs,
        resinous plants).
      </p>
    </section>
  );
}

function EnergeticsMatcher() {
  const [temp, setTemp] = useState<string>("");
  const [moist, setMoist] = useState<string>("");
  const [tone, setTone] = useState<string>("");

  const matches = herbs
    .filter((h) => {
      if (temp && h.energetics.temperature !== temp) return false;
      if (moist && h.energetics.moisture !== moist) return false;
      if (tone && h.energetics.tone !== tone) return false;
      return true;
    })
    .slice(0, 12);

  return (
    <section className="rounded-3xl border border-border/50 bg-card/40 p-6">
      <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <Leaf className="h-4 w-4 text-leaf-glow" /> Energetics Matcher
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Describe the terrain you want to address — and find herbs that <em>oppose</em> the pattern.
        Hot &amp; dry person? Try cooling, moistening allies.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Field label="Temperature">
          <Select value={temp} onChange={setTemp} options={["", "warming", "cooling", "neutral"]} />
        </Field>
        <Field label="Moisture">
          <Select value={moist} onChange={setMoist} options={["", "drying", "moistening", "neutral"]} />
        </Field>
        <Field label="Tone">
          <Select value={tone} onChange={setTone} options={["", "relaxing", "stimulating", "neutral"]} />
        </Field>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        {matches.length} match{matches.length === 1 ? "" : "es"}.
      </p>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((h) => (
          <li
            key={h.slug}
            className="rounded-lg border border-border/50 bg-background/40 p-2 text-sm"
          >
            <p className="font-semibold text-foreground">{h.name}</p>
            <p className="text-xs italic text-muted-foreground">{h.latin}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-leaf-glow/40 bg-leaf-glow/10 p-3">
      <p className="text-xs uppercase tracking-widest text-leaf-glow">{label}</p>
      <p className="mt-1 text-lg font-bold text-foreground">{value}</p>
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border border-border/60 bg-background/40 px-3 py-2 text-sm capitalize"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o || "any"}
        </option>
      ))}
    </select>
  );
}
