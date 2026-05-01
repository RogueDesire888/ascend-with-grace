import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { challenges, getTechniqueName, phases } from "@/lib/breathwork-data";
import {
  currentBelt,
  useBreathProgress,
} from "@/lib/breathwork-progress";

export const Route = createFileRoute("/breathwork/mastery")({
  head: () => ({
    meta: [
      { title: "The Path to Mastery — Breathwork | Ascend" },
      { name: "description", content: "Phased curriculum, belt system, and 7- and 21-day breath challenges." },
    ],
  }),
  component: MasteryPage,
});

function MasteryPage() {
  const { progress, togglePhase, toggleChallengeDay, setChallengeSignup } = useBreathProgress();
  const belt = currentBelt(progress);

  return (
    <article className="space-y-10">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">The Path to Mastery</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          A four-phase curriculum and a six-belt path. Click any phase to mark it complete.
        </p>
      </header>

      <section className="quest-panel-air rounded-3xl p-6">
        <p className="text-xs uppercase tracking-widest text-cyan-glow">Current Belt</p>
        <div className="mt-2 flex items-center gap-3">
          <span
            className="inline-block h-5 w-5 rounded-full"
            style={{ background: belt.current.color, boxShadow: `0 0 18px ${belt.current.color}` }}
          />
          <h2 className="text-2xl font-bold text-foreground">{belt.current.name}</h2>
        </div>
        <p className="mt-2 text-muted-foreground">{belt.current.description}</p>
        {belt.next && (
          <p className="mt-3 text-sm text-muted-foreground">
            Next: <strong className="text-foreground">{belt.next.name}</strong> — needs{" "}
            {belt.next.required.phases} phases &amp; {belt.next.required.techniques} techniques.
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Phases</h2>
        <ol className="grid gap-4 md:grid-cols-2">
          {phases.map((p) => {
            const done = !!progress.phases[p.id];
            return (
              <li key={p.id} className="quest-panel-air rounded-3xl p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-widest text-cyan-glow">
                    Phase {p.number} · {p.duration}
                  </p>
                  <button
                    onClick={() => togglePhase(p.id)}
                    className={`rounded-full px-3 py-1 text-xs ${
                      done ? "bg-primary text-primary-foreground" : "border border-border/60 text-muted-foreground"
                    }`}
                  >
                    {done ? "✓ Complete" : "Mark complete"}
                  </button>
                </div>
                <h3 className="mt-1 text-xl font-bold text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.focus}</p>
                <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Techniques</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {p.techniques.map((slug) => (
                    <Link
                      key={slug}
                      to="/breathwork/techniques/$slug"
                      params={{ slug }}
                      className="rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs hover:bg-secondary"
                    >
                      {getTechniqueName(slug)}
                    </Link>
                  ))}
                </div>
                <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Milestones</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-foreground/90">
                  {p.milestones.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Challenges</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {challenges.map((c) => {
            const signedUp = !!progress.challengeSignups[c.id];
            const completedDays = Object.values(progress.challenges[c.id] ?? {}).filter(Boolean).length;
            return (
              <AccordionItem
                key={c.id}
                value={c.id}
                className="quest-panel-air rounded-2xl border-0 px-5"
              >
                <AccordionTrigger>
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-widest text-cyan-glow">
                      {c.durationDays} days
                    </p>
                    <p className="text-lg font-bold text-foreground">{c.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {completedDays}/{c.durationDays} days · {signedUp ? "Signed up" : "Not started"}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <p className="mb-4 text-muted-foreground">{c.blurb}</p>
                  <SignupForm
                    signedUp={signedUp}
                    onSignup={() => setChallengeSignup(c.id, true)}
                  />
                  <ol className="mt-4 grid gap-2 sm:grid-cols-2">
                    {c.days.map((d) => {
                      const checked = !!(progress.challenges[c.id]?.[d.day]);
                      return (
                        <li
                          key={d.day}
                          className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/40 p-3"
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={() => toggleChallengeDay(c.id, d.day)}
                            className="mt-0.5"
                          />
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              Day {d.day}: {d.title}
                            </p>
                            <p className="text-xs text-muted-foreground">{d.prompt}</p>
                            {d.technique && (
                              <Link
                                to="/breathwork/techniques/$slug"
                                params={{ slug: d.technique }}
                                className="mt-1 inline-block text-xs text-cyan-glow"
                              >
                                {getTechniqueName(d.technique)} →
                              </Link>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>
    </article>
  );
}

function SignupForm({ signedUp, onSignup }: { signedUp: boolean; onSignup: () => void }) {
  const [email, setEmail] = useState("");
  if (signedUp)
    return (
      <p className="rounded-lg border border-leaf-glow/40 bg-background/40 px-3 py-2 text-sm text-foreground">
        ✓ Signed up. Check your inbox (simulated) for daily prompts.
      </p>
    );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSignup();
      }}
      className="flex flex-wrap items-center gap-2"
    >
      <input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
      />
      <Button type="submit" size="sm" className="rounded-full">
        Sign up
      </Button>
    </form>
  );
}
