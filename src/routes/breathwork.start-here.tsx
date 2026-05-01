import { createFileRoute } from "@tanstack/react-router";
import { BreathPacer } from "@/components/breathwork/BreathPacer";

export const Route = createFileRoute("/breathwork/start-here")({
  head: () => ({
    meta: [
      { title: "Start Here — Breathwork | Ascend" },
      {
        name: "description",
        content:
          "A friendly first step into breathwork: what it is, why it matters, and a 5-minute guided session.",
      },
      { property: "og:title", content: "Start Here — Breathwork | Ascend" },
      {
        property: "og:description",
        content: "Your gateway into breathwork — fundamentals, benefits, and your first guided breath.",
      },
    ],
  }),
  component: StartHere,
});

const sections = [
  { id: "what", label: "What is Breathwork?" },
  { id: "why", label: "Why Breathe?" },
  { id: "first", label: "Your First Breath" },
  { id: "fundamentals", label: "Fundamentals" },
  { id: "safety", label: "Is it Safe?" },
];

function StartHere() {
  return (
    <article className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Start Here</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          A grounded introduction to the most underrated practice of all — the one you have been
          doing your whole life.
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

      <section id="what" className="quest-panel-air rounded-3xl p-6 sm:p-8 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground">What is Breathwork?</h2>
        <p className="mt-3 text-muted-foreground">
          Your body breathes about 20,000 times a day on autopilot. Breathwork is what happens when
          you take the wheel — deliberately shaping the rhythm, depth, and pathway of breath to
          influence your nervous system, energy, and emotional state. It is one of the few biological
          systems that runs both automatically <em>and</em> under voluntary control, which makes it
          the most accessible bridge into the autonomic nervous system.
        </p>
        <p className="mt-3 text-muted-foreground">
          The practice is ancient. Yogic pranayama, Tibetan tummo, and Daoist qigong all centre the
          breath. The modern wave — Buteyko, Conscious Connected Breathwork, the Wim Hof Method,
          coherent breathing — translates these traditions through the lens of physiology.
        </p>
      </section>

      <section id="why" className="quest-panel-air rounded-3xl p-6 sm:p-8 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground">Why Breathe?</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            ["Stress reduction", "Long exhales activate the vagus nerve, switching on the rest-and-digest branch of the nervous system."],
            ["Better sleep", "Slow nasal breathing in the evening lowers heart rate and shortens sleep onset."],
            ["Sharper focus", "Coherent and box breathing entrain heart rate variability with attention networks."],
            ["Performance", "Higher CO₂ tolerance improves oxygen delivery to working tissues."],
            ["Emotional regulation", "Conscious connected breathing increases interoception and helps process stuck activation."],
            ["Energy on demand", "Active techniques like kapalabhati and bhastrika raise alertness without caffeine."],
          ].map(([t, d]) => (
            <li key={t} className="rounded-xl border border-border/50 bg-background/40 p-4">
              <p className="font-semibold text-foreground">{t}</p>
              <p className="text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="first" className="scroll-mt-24">
        <h2 className="mb-4 text-2xl font-bold text-foreground">Your First Breath: 5 Minutes</h2>
        <p className="mb-4 max-w-prose text-muted-foreground">
          A coherent 5-5-5 breath. Inhale for 5 seconds, hold for 5, exhale for 5. Twenty cycles is
          roughly five minutes. Press Begin when ready.
        </p>
        <BreathPacer
          preset={{ inhale: 5, holdIn: 5, exhale: 5, holdOut: 0, cycles: 20 }}
          title="5-5-5 Coherency Breath"
        />
      </section>

      <section id="fundamentals" className="quest-panel-air rounded-3xl p-6 sm:p-8 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground">Breathe Like a Pro: Fundamentals</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Fundamental title="Diaphragmatic Breathing">
            Hand on belly, hand on chest. The belly hand should rise first. The diaphragm — not the
            shoulders — should drive each breath.
          </Fundamental>
          <Fundamental title="Nasal vs Mouth">
            Default to the nose. The nose filters, warms, humidifies, and produces nitric oxide.
            Mouth breathing is reserved for specific modalities like CCB or holotropic.
          </Fundamental>
          <Fundamental title="Posture">
            A long spine, soft shoulders, and a relaxed jaw create the most room for the diaphragm
            to descend. Sit, stand, or lie — but stay tall.
          </Fundamental>
          <Fundamental title="Trauma-Sensitive Note">
            If breathwork ever feels overwhelming, stop and return to natural breathing. Choice and
            titration are part of the practice. Work with a trained facilitator for intense
            modalities.
          </Fundamental>
        </div>
      </section>

      <section id="safety" className="quest-panel-air rounded-3xl p-6 sm:p-8 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground">Is Breathwork Safe?</h2>
        <p className="mt-3 text-muted-foreground">
          For most people, gentle breathwork is very safe. Active or sustained techniques can be
          contraindicated in certain conditions. Always consult a qualified clinician if you have:
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            "Pregnancy",
            "Cardiovascular disease",
            "Uncontrolled hypertension",
            "Epilepsy or seizure history",
            "Glaucoma or retinal detachment",
            "Severe asthma or COPD",
            "Active psychiatric crisis",
            "Recent major surgery",
          ].map((c) => (
            <li
              key={c}
              className="rounded-lg border border-coral-glow/40 bg-background/40 px-3 py-2 text-sm text-foreground"
            >
              {c}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function Fundamental({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/50 bg-background/40 p-4">
      <p className="font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}
