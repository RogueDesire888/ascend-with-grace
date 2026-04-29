import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import {
  AvatarOrb,
  ElementCards,
  MembershipCTA,
  QuestCard,
  SkillWheel,
  questGroups,
} from "@/components/platform/PlatformUI";
import { skillTrees } from "@/components/platform/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Begin Your Ascension — Ascend" },
      {
        name: "description",
        content:
          "A peaceful spiritual game where your avatar glows brighter as you complete holistic healing quests.",
      },
      { property: "og:title", content: "Begin Your Ascension — Ascend" },
      {
        property: "og:description",
        content:
          "Create an elemental avatar, follow healing skill trees, and grow for $5 per month.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-spirit/30 bg-card/70 px-4 py-2 text-sm font-semibold text-spirit shadow-[var(--shadow-soft)]">
            <Sparkles className="h-4 w-4" /> A galactic garden for playable healing
          </div>
          <h1 className="mt-7 text-5xl font-bold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            Enter Your Galactic Garden
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Create your elemental avatar, complete gentle daily quests, unlock living skill trees,
            and watch your inner oasis glow brighter as you become your highest self.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/sanctuary"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
            >
              Start Your Journey <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/skill-trees"
              className="inline-flex items-center justify-center rounded-full border border-border/70 bg-card/70 px-6 py-4 text-base font-semibold text-foreground transition-colors hover:bg-accent"
            >
              View Skill Trees
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["$5/month", "Daily 5-min practices", "Weekly guided sessions"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" /> {item}
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <AvatarOrb />
          <div className="mt-6 rounded-[2rem] border border-border/60 bg-card/70 p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Active garden path</p>
                <p className="text-xl font-semibold text-foreground">Spirit + Water oasis healer</p>
              </div>
              <span className="rounded-full bg-primary/15 px-4 py-2 text-sm font-bold text-primary">
                8.7k glow
              </span>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[78%] rounded-full bg-primary shadow-[var(--shadow-glow)]" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <ElementCards />
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-spirit">
            Interconnected growth
          </p>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Five luminous skill trees, one Ascension Level.
          </h2>
          <div className="mt-6 grid gap-3">
            {skillTrees.slice(0, 3).map((tree) => (
              <div key={tree.name} className="rounded-[1.75rem] border border-border/60 bg-card/65 p-4">
                <p className="font-semibold text-foreground">{tree.name}</p>
                <p className="text-sm text-muted-foreground">{tree.nextQuest}</p>
              </div>
            ))}
          </div>
        </div>
        <SkillWheel />
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-spirit">
              Today’s path
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">
              Tiny rituals, visible blooming.
            </h2>
          </div>
          <Link
            to="/quests"
            className="hidden rounded-full border border-border/70 bg-card/70 px-5 py-3 text-sm font-semibold text-foreground sm:inline-flex"
          >
            See all quests
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {questGroups.dailyQuests.map((quest) => (
            <QuestCard key={quest.title} quest={quest} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <MembershipCTA />
      </section>
    </>
  );
}
