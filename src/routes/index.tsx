import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  HeartPulse,
  Sparkles,
  Wand2,
  Repeat,
  Flower2,
} from "lucide-react";
import sanctuaryImage from "@/assets/celestial-garden-sanctuary.png";
import {
  ElementCards,
  MembershipCTA,
  QuestCard,
  SkillWheel,
  questGroups,
} from "@/components/platform/PlatformUI";
import { skillTrees } from "@/components/platform/data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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

const valueTabs = [
  {
    id: "movement",
    label: "Movement",
    title: "Movement labs",
    copy: "Deep yoga therapy and Tai Chi knowledge bases turn the Movement path into a real study library, not just a quest label.",
    to: "/yoga-therapy-lab" as const,
    cta: "Explore Movement",
    Icon: HeartPulse,
  },
  {
    id: "daily",
    label: "Daily loop",
    title: "Daily practice loop",
    copy: "Short rituals, XP, glow, and streaks give members a reason to return and make steady progress every day.",
    to: "/quests" as const,
    cta: "See Quests",
    Icon: CalendarDays,
  },
  {
    id: "mastery",
    label: "Mastery",
    title: "Mastery map",
    copy: "Skill trees organize herbs, energy, movement, touch, and spirit into a clear journey from beginner to advanced practice.",
    to: "/skill-trees" as const,
    cta: "View Skill Trees",
    Icon: Sparkles,
  },
  {
    id: "library",
    label: "Library",
    title: "Resource library",
    copy: "Guides, audio, and practice references give the platform a curriculum layer beyond the 3D sanctuary experience.",
    to: "/library" as const,
    cta: "Browse Library",
    Icon: BookOpen,
  },
];

const howItWorks = [
  {
    n: "1",
    Icon: Wand2,
    title: "Pick your element",
    copy: "Air, water, earth, fire, or spirit — your avatar's first glow.",
  },
  {
    n: "2",
    Icon: Repeat,
    title: "Practice daily",
    copy: "Five-minute rituals, gentle quests, real momentum.",
  },
  {
    n: "3",
    Icon: Flower2,
    title: "Watch it grow",
    copy: "Your sanctuary blooms as your skill trees ascend.",
  },
];

function Index() {
  return (
    <>
      <Hero />
      <HowItWorks />

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <ElementCards />
      </section>

      <DailyAndPaths />
      <ExploreTabs />

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <MembershipCTA />
      </section>
    </>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative mx-auto w-full max-w-[94rem] px-4 py-6 sm:px-6 lg:px-8">
      <div className="relative min-h-[78vh] overflow-hidden rounded-[2.4rem] border border-border/70 shadow-[var(--shadow-aura)]">
        <img
          src={sanctuaryImage}
          alt="A luminous marble garden sanctuary with roses, statues, a fountain, and sunlight from an open dome"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/35 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <div className="sun-rays absolute inset-x-0 top-0 h-[26rem] opacity-80" />

        <div className="relative z-10 flex min-h-[78vh] max-w-3xl flex-col justify-center px-6 py-12 sm:px-10 lg:px-14">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-background/55 px-4 py-2 text-sm font-semibold text-primary shadow-[var(--shadow-soft)] backdrop-blur-xl">
            <Sparkles className="h-4 w-4" /> A celestial garden for playable healing
          </div>
          <h1 className="mt-6 text-5xl font-bold leading-[1.04] text-foreground sm:text-6xl">
            Become your highest self inside a living sanctuary.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            Create your elemental avatar, complete elegant daily rituals, and watch your inner
            garden ascend with every practice.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
          <div className="mt-7 flex flex-wrap gap-2 text-xs">
            {["$5/month", "Daily 5-min rituals", "Weekly guided sessions"].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/55 px-3 py-1.5 backdrop-blur"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                <span className="font-medium text-foreground">{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How it works ───────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-6 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">How it works</p>
        <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
          Three small steps. One quiet ascension.
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {howItWorks.map((s) => {
          const Icon = s.Icon;
          return (
            <div
              key={s.n}
              className="rounded-2xl border border-border/60 bg-card/50 p-5"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                  {s.n}
                </div>
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="mt-3 text-base font-bold text-foreground">{s.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{s.copy}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Daily quests + Five paths (side-by-side on lg) ─────────────────────────
function DailyAndPaths() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        {/* Today's path */}
        <div>
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Today's path
              </p>
              <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                Tiny rituals, visible ascension.
              </h2>
            </div>
            <Link
              to="/quests"
              className="hidden rounded-full border border-border/70 bg-card/70 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground sm:inline-flex"
            >
              See all
            </Link>
          </div>
          <div className="grid gap-3">
            {questGroups.dailyQuests.map((quest) => (
              <QuestCard key={quest.title} quest={quest} />
            ))}
          </div>
        </div>

        {/* Five paths */}
        <div>
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Your five paths
            </p>
            <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
              One radiant soul level.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Every ritual feeds the whole sanctuary. Balance earns more glow than intensity.
            </p>
          </div>
          <SkillWheel />
          <div className="mt-5 grid gap-2">
            {skillTrees.slice(0, 3).map((tree) => (
              <div
                key={tree.name}
                className="rounded-xl border border-border/60 bg-card/50 px-4 py-3"
              >
                <p className="text-sm font-semibold text-foreground">{tree.name}</p>
                <p className="text-xs text-muted-foreground">{tree.nextQuest}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Explore (tabbed) ───────────────────────────────────────────────────────
function ExploreTabs() {
  const [tab, setTab] = useState("movement");
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mb-5 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Explore the platform
        </p>
        <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
          More than a beautiful world.
        </h2>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex w-full flex-wrap justify-start gap-1 bg-transparent p-0">
          {valueTabs.map((t) => {
            const TIcon = t.Icon;
            return (
              <TabsTrigger
                key={t.id}
                value={t.id}
                className="gap-1.5 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs data-[state=active]:border-primary/60 data-[state=active]:bg-primary/15 data-[state=active]:text-foreground"
              >
                <TIcon className="h-3.5 w-3.5" />
                {t.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {valueTabs.map((t) => {
          const TIcon = t.Icon;
          return (
            <TabsContent key={t.id} value={t.id} className="mt-5">
              <div className="rounded-2xl border border-border/60 bg-card/50 p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
                    <TIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground">{t.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                      {t.copy}
                    </p>
                    <Link
                      to={t.to}
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/45 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
                    >
                      {t.cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
