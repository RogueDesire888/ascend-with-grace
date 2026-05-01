import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/yoga/pranayama")({
  head: () => ({
    meta: [
      { title: "Pranayama & Meditation — Yoga | Ascend" },
      { name: "description", content: "Yogic breath techniques and seated practice." },
    ],
  }),
  component: Pranayama,
});

const yogicPranayama = [
  { name: "Ujjayi", english: "Victorious Breath", desc: "A slight constriction at the back of the throat creates an audible ocean sound. The standard breath of vinyasa and ashtanga.", how: "Inhale and exhale through the nose with a soft 'haa' sensation at the throat. Audible to yourself, not to a partner across the room." },
  { name: "Nadi Shodhana", english: "Alternate Nostril", desc: "Cleansing of the energy channels. Balances the two hemispheres and the sympathetic/parasympathetic systems.", how: "Right thumb closes right nostril. Inhale left. Switch — ring finger closes left, exhale right. Inhale right. Switch, exhale left. That's one round. Practice 9–18 rounds." },
  { name: "Kapalabhati", english: "Skull Shining Breath", desc: "Sharp passive inhales, active exhales from the lower belly. Energizing and detoxifying.", how: "30 pumps per round, 3 rounds. Skip if pregnant, hypertensive, or with cardiac conditions." },
  { name: "Bhramari", english: "Bee Breath", desc: "A long humming exhale. Profoundly calming via vagal stimulation.", how: "Inhale through the nose. Exhale slowly while making a low 'hmmmm' sound. 9–12 rounds." },
  { name: "Bhastrika", english: "Bellows Breath", desc: "Vigorous active inhales and exhales. Builds heat and oxygenation.", how: "20–30 vigorous breaths, then a slow inhale and retention. 3 rounds maximum." },
  { name: "Sitali", english: "Cooling Breath", desc: "Curl the tongue, inhale through it. Cools the body and mind in summer or after intense practice.", how: "Curl tongue (or purse lips if you can't). Inhale through it. Exhale through the nose. 9 rounds." },
];

function Pranayama() {
  return (
    <article className="space-y-10">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Pranayama & Meditation</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Asana prepares the body to sit. Pranayama prepares the breath to be still. Meditation is
          what arises when both have done their work.
        </p>
        <Link
          to="/breathwork/start-here"
          className="mt-4 inline-block rounded-full border border-border/60 bg-card/50 px-4 py-2 text-sm text-foreground hover:bg-secondary"
        >
          For deeper breathwork science → Breathwork section
        </Link>
      </header>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">The Six Classical Pranayamas</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {yogicPranayama.map((p) => (
            <div key={p.name} className="quest-panel-air rounded-2xl p-5">
              <h3 className="text-lg font-bold text-foreground">{p.name}</h3>
              <p className="text-sm italic text-orchid-glow">{p.english}</p>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <p className="mt-2 text-xs text-muted-foreground"><span className="text-orchid-glow">How:</span> {p.how}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border/50 bg-card/40 p-6">
        <h2 className="text-2xl font-bold text-foreground">Seated meditation — the classical seat</h2>
        <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>1. Sit on a cushion so the knees are below the hips.</li>
          <li>2. Lengthen the spine from the base of the pelvis to the crown.</li>
          <li>3. Hands in jnana mudra (thumb and index fingertip touching) on the knees.</li>
          <li>4. Close the eyes or soften them at a downward angle.</li>
          <li>5. Watch the breath without changing it. When the mind wanders, return.</li>
          <li>6. Begin with 5 minutes. Build to 20 over weeks, not days.</li>
        </ol>
      </section>
    </article>
  );
}
