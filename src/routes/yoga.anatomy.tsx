import { createFileRoute } from "@tanstack/react-router";
import { studies } from "@/lib/yoga-data";

export const Route = createFileRoute("/yoga/anatomy")({
  head: () => ({
    meta: [
      { title: "Anatomy & Therapy — Yoga | Ascend" },
      { name: "description", content: "How yoga works in the body, with research." },
    ],
  }),
  component: Anatomy,
});

function Anatomy() {
  const muscleGroups = [
    { name: "Spine", note: "Cat–cow, twists, and gentle backbends mobilize all 24 vertebrae. Long sitting shortens the erector spinae — backbends restore length." },
    { name: "Hips", note: "External rotators (piriformis, deep six) become chronically tight from sitting. Pigeon, bound angle, and lunges restore range." },
    { name: "Hamstrings", note: "Most modern bodies are 30–50% short of healthy hamstring length. Forward folds with bent knees and consistent practice change this in weeks." },
    { name: "Shoulders", note: "Rotator cuff health depends on length AND strength. Down dog, dolphin, and arm balances train both." },
    { name: "Core", note: "Yoga's 'core' is not just abs — it includes pelvic floor, diaphragm, transverse abdominis, and multifidus. Boat, plank, and bandhas integrate them all." },
    { name: "Feet", note: "The foundation. 26 bones per foot. Spreading the toes in tadasana wakes up muscles most adults have never consciously used." },
  ];

  return (
    <article className="space-y-10">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Anatomy & Therapy</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          The body under the practice. Knowing what is moving turns asana from choreography into
          therapy.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Major Muscle Groups</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {muscleGroups.map((m) => (
            <div key={m.name} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <h3 className="font-bold text-foreground">{m.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{m.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Research Library</h2>
        <p className="mb-4 max-w-prose text-sm text-muted-foreground">
          {studies.length} peer-reviewed studies. The evidence base for yoga is strong for back
          pain, anxiety, sleep, hypertension, and HRV.
        </p>
        <div className="space-y-3">
          {studies.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <p className="font-semibold text-foreground">{s.title}</p>
              <p className="text-xs text-muted-foreground">{s.authors} · {s.journal} ({s.year})</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.findings}</p>
              <p className="mt-1 text-xs italic text-muted-foreground">
                {s.population}{s.effectSize ? ` · Effect: ${s.effectSize}` : ""}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
