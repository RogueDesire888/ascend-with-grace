import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import sanctuaryImage from "@/assets/celestial-garden-sanctuary.png";
import {
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
      <section className="relative mx-auto min-h-[calc(100vh-5rem)] w-full max-w-[94rem] px-4 py-6 sm:px-6 lg:px-8">
        <div className="relative min-h-[calc(100vh-8rem)] overflow-hidden rounded-[2.4rem] border border-border/70 shadow-[var(--shadow-aura)]">
          <img
            src={sanctuaryImage}
            alt="A luminous marble garden sanctuary with roses, statues, a fountain, and sunlight from an open dome"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/88 via-background/42 to-background/18" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-secondary/12" />
          <div className="sun-rays absolute inset-x-0 top-0 h-[30rem] opacity-90" />
          <div className="relative z-10 flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-14">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-background/55 px-4 py-2 text-sm font-semibold text-primary shadow-[var(--shadow-soft)] backdrop-blur-xl">
              <Sparkles className="h-4 w-4" /> A celestial garden for playable healing
            </div>
            <h1 className="mt-7 text-5xl font-bold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
              Become your highest self inside a living sanctuary.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
              Create your elemental avatar, complete elegant daily rituals, unlock luminous healing
              paths, and watch your inner garden ascend with every practice.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/sanctuary"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
              >
                Enter the Sanctuary <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/skill-trees"
                className="inline-flex items-center justify-center rounded-full border border-border/70 bg-background/52 px-7 py-4 text-base font-semibold text-foreground backdrop-blur-xl transition-colors hover:bg-secondary hover:text-secondary-foreground"
              >
                View Skill Trees
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["$5/month", "Daily 5-min rituals", "Weekly guided sessions"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ElementCards />
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8">
        <div className="sanctuary-panel rounded-[2.25rem] border border-border/70 p-7 lg:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-spirit">
            Interconnected ascension
          </p>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Five luminous paths, one radiant soul level.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every ritual feeds the whole sanctuary. Balance earns more glow than intensity,
            turning healing into a calm and beautiful game you can return to daily.
          </p>
          <div className="mt-6 grid gap-3">
            {skillTrees.slice(0, 3).map((tree) => (
              <div
                key={tree.name}
                className="rounded-[1.75rem] border border-border/60 bg-background/38 p-4 backdrop-blur-xl"
              >
                <p className="font-semibold text-foreground">{tree.name}</p>
                <p className="text-sm text-muted-foreground">{tree.nextQuest}</p>
              </div>
            ))}
          </div>
        </div>
        <SkillWheel />
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-spirit">
              Today’s path
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">
              Tiny rituals, visible ascension.
            </h2>
          </div>
          <Link
            to="/quests"
            className="hidden rounded-full border border-border/70 bg-card/70 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground sm:inline-flex"
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
