import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/breathwork/about")({
  head: () => ({
    meta: [
      { title: "About & Contribute — Breathwork | Ascend" },
      { name: "description", content: "Our mission, our editorial process, and how to contribute." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <article className="space-y-10">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">About & Contribute</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          A living encyclopedia built by practitioners, for practitioners.
        </p>
      </header>
      <section className="quest-panel-air rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
        <p className="mt-2 text-muted-foreground">
          To make every meaningful breathwork tradition, technique, and study free, searchable, and
          beautifully presented — without diluting their depth or risk profile. We honour both the
          science and the lineage.
        </p>
      </section>
      <section className="quest-panel-air rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-foreground">Editorial Policy</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
          <li>Every technique is reviewed by two practitioners before publication.</li>
          <li>Every study is verified against the original DOI by the editorial board.</li>
          <li>Contraindications are reviewed quarterly with a clinical advisor.</li>
          <li>We disclose all affiliate relationships and sponsorships.</li>
        </ul>
      </section>
      <section className="quest-panel-air rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-foreground">Contribute or Suggest a Resource</h2>
        {submitted ? (
          <p className="mt-3 rounded-lg border border-leaf-glow/40 bg-background/40 p-3 text-sm text-foreground">
            ✓ Thank you. The editorial team will review your suggestion within 14 days.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mt-4 space-y-3"
          >
            <input
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
            />
            <select className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm">
              <option>Suggest a technique</option>
              <option>Suggest a study</option>
              <option>Suggest a practitioner</option>
              <option>Report an error</option>
              <option>Other</option>
            </select>
            <textarea
              required
              placeholder="Details…"
              className="h-32 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
            />
            <Button type="submit" className="rounded-full">
              Submit
            </Button>
          </form>
        )}
      </section>
    </article>
  );
}
