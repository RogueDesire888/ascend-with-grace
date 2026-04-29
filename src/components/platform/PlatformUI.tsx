import { Link } from "@tanstack/react-router";
import { CheckCircle2, Circle, LockKeyhole, Search, Sparkles, Star, Zap } from "lucide-react";
import {
  communityPosts,
  dailyQuests,
  elements,
  mainQuests,
  resources,
  skillTrees,
  stats,
  weeklyQuests,
  type SkillTree,
} from "./data";

export function PageFrame({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-spirit">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>
      </div>
      {children}
    </section>
  );
}

export function AvatarOrb({ size = "large" }: { size?: "large" | "small" }) {
  const large = size === "large";
  return (
    <div
      className={`relative mx-auto grid place-items-center ${large ? "h-72 w-72" : "h-36 w-36"}`}
    >
      <div className="absolute inset-0 rounded-full bg-[var(--gradient-avatar)] opacity-80 blur-2xl" />
      <div className="absolute inset-5 rounded-full border border-primary/35 bg-card/35 shadow-[var(--shadow-glow)]" />
      <div className="absolute h-[84%] w-[84%] animate-[spin_34s_linear_infinite] rounded-full border border-dashed border-earth/45" />
      <div className="absolute h-[68%] w-[68%] rotate-45 rounded-[42%] border border-water/25 bg-primary/10" />
      <div className="absolute h-[52%] w-[52%] animate-[pulse_5s_ease-in-out_infinite] rounded-[38%] bg-earth/15" />
      <div className="relative grid h-[44%] w-[44%] place-items-center rounded-[40%] border border-primary/45 bg-background/80 shadow-[var(--shadow-aura)]">
        <Sparkles className={large ? "h-14 w-14 text-primary" : "h-8 w-8 text-primary"} />
      </div>
      <span className="absolute bottom-7 rounded-full border border-primary/30 bg-card/80 px-4 py-1 text-xs font-semibold text-foreground shadow-[var(--shadow-soft)]">
        Level 24
      </span>
    </div>
  );
}

export function SkillWheel() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[28rem] rounded-full border border-border/60 bg-card/45 p-8 shadow-[var(--shadow-soft)]">
      <div className="garden-grid absolute inset-6 rounded-full opacity-40" />
      <div className="absolute inset-12 rounded-full border border-dashed border-primary/35" />
      <div className="absolute inset-24 rounded-full border border-water/20 bg-background/35" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid h-24 w-24 place-items-center rounded-[40%] bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
          <Star className="h-9 w-9" />
        </div>
      </div>
      {skillTrees.map((tree, index) => {
        const angle = index * 72 - 90;
        const radius = 38;
        const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
        const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
        return (
          <div
            key={tree.name}
            className={`absolute grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[35%] border bg-card/90 shadow-[var(--shadow-soft)] ${tree.className}`}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <tree.Icon className="h-7 w-7" />
            <span className="text-[0.65rem] font-semibold">{tree.short}</span>
          </div>
        );
      })}
    </div>
  );
}

export function StatsStrip() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[1.75rem] border border-border/60 bg-card/65 p-5 shadow-[var(--shadow-soft)]"
        >
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className="mt-2 text-4xl font-bold text-foreground">{stat.value}</p>
          <p className="mt-1 text-sm text-muted-foreground">{stat.helper}</p>
        </div>
      ))}
    </div>
  );
}

export function QuestCard({
  quest,
  variant = "daily",
}: {
  quest: { title: string; tree: string; xp: number; status: string };
  variant?: "daily" | "weekly" | "main";
}) {
  const Icon = variant === "main" ? LockKeyhole : variant === "weekly" ? Circle : CheckCircle2;
  return (
    <article className="group rounded-[1.75rem] border border-border/60 bg-card/70 p-5 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[40%] bg-accent text-accent-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {quest.xp} XP
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-foreground">{quest.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{quest.tree}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-spirit">
          {quest.status}
        </span>
        <button className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          Open
        </button>
      </div>
    </article>
  );
}

export function SkillProgressCard({ tree }: { tree: SkillTree }) {
  return (
    <article className="rounded-[1.75rem] border border-border/60 bg-card/70 p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-start gap-4">
        <div className={`grid h-14 w-14 place-items-center rounded-[38%] border ${tree.className}`}>
          <tree.Icon className="h-7 w-7" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-semibold text-foreground">{tree.name}</h3>
            <span className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
              Lv {tree.level}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{tree.description}</p>
        </div>
      </div>
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary via-water to-spirit shadow-[var(--shadow-glow)]"
          style={{ width: `${tree.progress}%` }}
        />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Next: <span className="text-foreground">{tree.nextQuest}</span>
      </p>
    </article>
  );
}

export function ElementCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {elements.map((element) => (
        <article
          key={element.name}
          className={`rounded-[1.75rem] border border-border/60 bg-gradient-to-br p-5 shadow-[var(--shadow-soft)] ${element.className}`}
        >
          <element.Icon className="h-8 w-8" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">{element.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{element.tone}</p>
          <p className="mt-3 text-sm text-foreground/85">{element.gift}</p>
        </article>
      ))}
    </div>
  );
}

export function ResourceGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {resources.map((resource) => (
        <article
          key={resource.title}
          className="rounded-[1.75rem] border border-border/60 bg-card/70 p-5 shadow-[var(--shadow-soft)]"
        >
          <div className="grid h-12 w-12 place-items-center rounded-[40%] bg-accent text-accent-foreground">
            <resource.Icon className="h-5 w-5" />
          </div>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-spirit">
            {resource.type}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-foreground">{resource.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{resource.duration}</p>
        </article>
      ))}
    </div>
  );
}

export function SearchBarMock() {
  return (
    <div className="flex min-h-14 items-center gap-3 rounded-full border border-border/60 bg-card/70 px-5 shadow-[var(--shadow-soft)]">
      <Search className="h-5 w-5 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">
        Search herbs, breathwork, audio tracks, shadow prompts...
      </span>
    </div>
  );
}

export function CommunityFeed() {
  return (
    <div className="grid gap-4">
      {communityPosts.map((post) => (
        <article
          key={post.name}
          className="rounded-[1.75rem] border border-border/60 bg-card/70 p-6 shadow-[var(--shadow-soft)]"
        >
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-[40%] bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{post.name}</h3>
              <p className="text-sm text-muted-foreground">{post.element}</p>
            </div>
            <span className="ml-auto rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
              {post.glow}
            </span>
          </div>
          <p className="mt-5 text-foreground/90">{post.message}</p>
        </article>
      ))}
    </div>
  );
}

export function MembershipCTA() {
  return (
    <section className="rounded-[2rem] border border-primary/30 bg-[var(--gradient-panel)] p-8 shadow-[var(--shadow-aura)] lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            Membership
          </p>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            A full healing garden game for $5 a month.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Weekly guided sessions, daily five-minute practices, a growing resource vault,
            supportive community challenges, and a character that reflects your real progress.
          </p>
        </div>
        <Link
          to="/sanctuary"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-[var(--shadow-glow)]"
        >
          Start Your Journey <Zap className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}

export const questGroups = { dailyQuests, weeklyQuests, mainQuests };
