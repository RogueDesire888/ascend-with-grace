import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export const Route = createFileRoute("/alchemists-path/start-here")({
  head: () => ({
    meta: [
      { title: "Start Here — The Alchemist's Path | Ascend" },
      {
        name: "description",
        content:
          "Your gateway into herbalism: what it is, why it matters, the herbalist's code, and your first cup of nettle infusion.",
      },
    ],
  }),
  component: StartHere,
});

const sections = [
  { id: "what", label: "What is Herbalism?" },
  { id: "why", label: "Why Plants?" },
  { id: "code", label: "The Herbalist's Code" },
  { id: "first", label: "Your First Brew" },
  { id: "fundamentals", label: "Fundamentals" },
  { id: "safety", label: "Is it Safe?" },
];

function StartHere() {
  return (
    <article className="space-y-12">
      <header>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-leaf-glow">
          <Leaf className="h-3.5 w-3.5" />
          Welcome
        </div>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Start Here</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          A grounded entry to the most ancient pharmacy on Earth — the green one outside your
          window. No mysticism required, all welcome.
        </p>
        <nav className="mt-5 flex flex-wrap gap-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs text-muted-foreground hover:bg-secondary"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </header>

      <section id="what" className="rounded-3xl border border-border/50 bg-card/40 p-6 sm:p-8 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground">What is Herbalism?</h2>
        <p className="mt-3 text-muted-foreground">
          Herbalism is the practice of using whole plants — leaves, roots, flowers, bark, berries —
          to support the body&apos;s capacity to heal itself. It is humanity&apos;s oldest medicine
          and the parent of modern pharmacology: aspirin from willow, digoxin from foxglove,
          metformin&apos;s ancestor in goat&apos;s rue. Where pharmacology isolates a single
          molecule, herbalism works with the whole plant matrix and the person standing in front
          of it.
        </p>
        <p className="mt-3 text-muted-foreground">
          Every living tradition — Western Wise Woman, Eclectic, Greek Galenic, Traditional Chinese
          Medicine, Ayurveda, Unani — answers the same questions in its own grammar: what does the
          plant do, what is the person&apos;s terrain, and how do we match them?
        </p>
      </section>

      <section id="why" className="rounded-3xl border border-border/50 bg-card/40 p-6 sm:p-8 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground">Why Plants?</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            ["Nutritive density", "Nettle, oatstraw, and dandelion deliver minerals food alone often misses."],
            ["Adaptogenic ballast", "Ashwagandha, tulsi, and reishi modulate the stress response over weeks."],
            ["Targeted action", "Vitex for HPO axis, hawthorn for the heart, ginger for the gut — specific tools for specific jobs."],
            ["Energetic precision", "Warming, cooling, drying, moistening — language for matching herb to terrain."],
            ["Sustainable autonomy", "A garden, a hedgerow, and a quart jar can replace half a bathroom cabinet."],
            ["Sensory medicine", "Taste, smell, and ritual are part of how the plant works on the nervous system."],
          ].map(([t, d]) => (
            <li key={t} className="rounded-xl border border-border/50 bg-background/40 p-4">
              <p className="font-semibold text-foreground">{t}</p>
              <p className="text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="code" className="rounded-3xl border border-border/50 bg-card/40 p-6 sm:p-8 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground">The Herbalist&apos;s Code</h2>
        <ol className="mt-3 space-y-2 text-muted-foreground">
          <li><span className="font-semibold text-foreground">1. First, do no harm.</span> Know your plant, your dose, and your person before you act.</li>
          <li><span className="font-semibold text-foreground">2. Positive identification.</span> If you cannot name it three ways (common, Latin, family), you do not pick it.</li>
          <li><span className="font-semibold text-foreground">3. Make medicine that tastes good.</span> A tea you do not drink does nothing.</li>
          <li><span className="font-semibold text-foreground">4. Honour the source.</span> Sustainable harvest, fair trade, and the land&apos;s consent.</li>
          <li><span className="font-semibold text-foreground">5. Stay humble.</span> Plants have been here longer than us. Listen first.</li>
        </ol>
      </section>

      <section id="first" className="scroll-mt-24">
        <h2 className="mb-4 text-2xl font-bold text-foreground">Your First Brew: Nourishing Nettle Infusion</h2>
        <div className="rounded-3xl border border-leaf-glow/40 bg-card/40 p-6">
          <p className="text-muted-foreground">
            One quart jar, 1 oz dried stinging nettle leaf, boiling water to fill. Cover and steep
            4–8 hours (overnight is perfect). Strain. Drink throughout the day, plain or with a
            squeeze of lemon. After seven days, notice your hair, your nails, your energy in the
            afternoon. This is the gateway brew.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Why nettle? It is among the most mineral-dense plants in the temperate world — calcium,
            magnesium, iron, potassium, vitamin K, chlorophyll. It is safe, abundant, and works on
            time-scales of weeks, not minutes.
          </p>
        </div>
      </section>

      <section id="fundamentals" className="rounded-3xl border border-border/50 bg-card/40 p-6 sm:p-8 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground">Fundamentals</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card title="Tea vs Infusion vs Decoction">
            Tea = short steep, light leafy parts. Infusion = long steep (4–8 h) for minerals.
            Decoction = simmer for woody roots, barks, mushrooms.
          </Card>
          <Card title="Energetics">
            Every herb has a temperature (warming/cooling), moisture (drying/moistening), and tone
            (relaxing/stimulating). Match the herb&apos;s pattern to the person&apos;s pattern.
          </Card>
          <Card title="Dose & Duration">
            Tonic herbs work over weeks. Acute herbs work in hours. Know which you&apos;re using and
            measure success on the right time-scale.
          </Card>
          <Card title="One Plant at a Time">
            New to an herb? Take it solo for two weeks. Then you know what it does, and what
            the next blend changes.
          </Card>
        </div>
      </section>

      <section id="safety" className="rounded-3xl border border-coral-glow/40 bg-card/40 p-6 sm:p-8 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground">Is Herbalism Safe?</h2>
        <p className="mt-3 text-muted-foreground">
          For most people, gentle nutritive and culinary herbs are very safe. Stronger acting herbs
          deserve more care. Consult a clinician or qualified herbalist if you:
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            "Are pregnant or nursing",
            "Take prescription medication",
            "Have liver or kidney disease",
            "Have a serious chronic condition",
            "Are giving herbs to children under 2",
            "Are about to have surgery",
          ].map((c) => (
            <li
              key={c}
              className="rounded-lg border border-coral-glow/40 bg-background/40 px-3 py-2 text-sm text-foreground"
            >
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          Read the full{" "}
          <Link to="/alchemists-path/safety" className="text-leaf-glow underline">
            Safety &amp; Sustainability
          </Link>{" "}
          section before working with any new plant.
        </p>
      </section>
    </article>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/50 bg-background/40 p-4">
      <p className="font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}
