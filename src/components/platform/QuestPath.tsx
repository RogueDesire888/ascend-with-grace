import { useEffect, useRef, useState } from "react";
import { CheckCircle2, type LucideIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useTreeProgress, type TreeKey } from "@/lib/progress-store";

export type QuestLevel = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  quote: string;
  Icon: LucideIcon;
  quests: string[];
};

export type QuestBadge = {
  id: string;
  name: string;
  level: number;
  Icon: LucideIcon;
};

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export function QuestPath({
  treeKey,
  treeLabel,
  classes,
  eyebrow,
  title,
  quote,
  levels,
  badges,
  panelClass = "quest-panel-air",
  accentClass = "text-primary",
}: {
  treeKey: TreeKey;
  treeLabel: string;
  classes: string[]; // class names by level
  eyebrow: string;
  title: string;
  quote: string;
  levels: QuestLevel[];
  badges: QuestBadge[];
  panelClass?: string;
  accentClass?: string;
}) {
  const { progress, toggleQuest, toggleLevel } = useTreeProgress(treeKey);
  const [openLevel, setOpenLevel] = useState<string | undefined>(undefined);

  const totalQuests = levels.reduce((acc, l) => acc + l.quests.length, 0);
  const completedQuests = Object.values(progress.quests).filter(
    (v) => v && true,
  ).length;
  // Restrict counting to this tree's quests by checking against this levels' keys:
  const treeQuestKeys = new Set(
    levels.flatMap((l) => l.quests.map((_, i) => `${l.id}-q-${i}`)),
  );
  const treeCompleted = Array.from(treeQuestKeys).filter(
    (k) => progress.quests[k],
  ).length;
  const completedLevels = levels.filter((l) => progress.levels[l.id]).length;
  const playerLevel = Math.min(levels.length, completedLevels + 1);
  const className = classes[Math.min(playerLevel - 1, classes.length - 1)] ?? treeLabel;
  const xp = treeCompleted * 25 + completedLevels * 100;
  const xpMax = totalQuests * 25 + levels.length * 100;
  const heroRef = useReveal<HTMLElement>();
  const sheetRef = useReveal<HTMLElement>();
  const roadRef = useReveal<HTMLElement>();
  const badgeRef = useReveal<HTMLElement>();

  const scrollTo = (id: string) => {
    if (typeof document === "undefined") return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpenLevel(id);
  };

  // suppress unused
  void completedQuests;

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section
        ref={heroRef}
        className={`reveal-on-view ${panelClass} relative overflow-hidden rounded-3xl p-8 text-center sm:p-12`}
      >
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-bold leading-tight text-foreground sm:text-5xl">
          {title}
        </h2>
        <p className="mt-5 text-base italic text-muted-foreground sm:text-lg">{quote}</p>
        <Button
          onClick={() => scrollTo(levels[0].id)}
          size="lg"
          className="mt-7 rounded-full px-8 shadow-[var(--shadow-glow)]"
        >
          Begin Your Practice
        </Button>
      </section>

      {/* Character sheet */}
      <section ref={sheetRef} className="reveal-on-view">
        <div className={`${panelClass} rounded-2xl p-6 sm:p-8`}>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>
                {treeLabel} · Movement Arts
              </p>
              <h3 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">{className}</h3>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <span className={`rounded-full border px-3 py-1 font-semibold ${accentClass} border-current/40 bg-background/40`}>
                  Level {playerLevel}
                </span>
                <span className="text-muted-foreground">
                  Quests: <span className="font-semibold text-foreground">{treeCompleted}/{totalQuests}</span>
                </span>
                <span className="text-muted-foreground">
                  Levels: <span className="font-semibold text-foreground">{completedLevels}/{levels.length}</span>
                </span>
              </div>
            </div>
            <div className="w-full max-w-md">
              <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                <span>XP</span>
                <span className="font-semibold text-foreground">{xp} / {xpMax}</span>
              </div>
              <Progress value={xpMax === 0 ? 0 : (xp / xpMax) * 100} className="h-3" />
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section ref={roadRef} className="reveal-on-view">
        <div className="mb-5 text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>
            The Path
          </p>
          <h3 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
            Five Milestones
          </h3>
        </div>
        <ol className="grid gap-3 md:grid-cols-5">
          {levels.map((step) => {
            const done = !!progress.levels[step.id];
            return (
              <li key={step.id}>
                <button
                  onClick={() => scrollTo(step.id)}
                  className={`${panelClass} group flex w-full flex-col items-center rounded-2xl p-4 text-center transition-transform hover:-translate-y-1`}
                >
                  <span
                    className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                      done
                        ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                        : `border-current/40 bg-background/40 ${accentClass}`
                    }`}
                  >
                    <step.Icon className="h-5 w-5" />
                  </span>
                  <span className={`text-[0.7rem] font-semibold uppercase tracking-widest ${accentClass}`}>
                    Level {step.number}
                  </span>
                  <span className="mt-0.5 text-base font-bold text-foreground">{step.title}</span>
                  <span className="mt-1 text-xs text-muted-foreground">{step.subtitle}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Levels */}
      <section>
        <Accordion
          type="single"
          collapsible
          value={openLevel}
          onValueChange={(v) => setOpenLevel(v || undefined)}
          className="space-y-4"
        >
          {levels.map((level) => {
            const done = !!progress.levels[level.id];
            return (
              <AccordionItem
                key={level.id}
                value={level.id}
                id={level.id}
                className={`${panelClass} scroll-mt-24 overflow-hidden rounded-2xl border-0 px-5 sm:px-7`}
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-1 flex-wrap items-center gap-3 text-left">
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border font-bold ${
                        done
                          ? "border-primary bg-primary text-primary-foreground"
                          : `border-current/50 bg-background/40 ${accentClass}`
                      }`}
                    >
                      {level.number}
                    </span>
                    <div>
                      <p className={`text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${accentClass}`}>
                        Level {level.number}
                      </p>
                      <h4 className="text-xl font-bold text-foreground sm:text-2xl">
                        {level.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{level.subtitle}</p>
                    </div>
                    {done && (
                      <span className={`ml-auto inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold ${accentClass} border-current/50 bg-primary/15`}>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Complete
                      </span>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="mb-5 text-base italic text-muted-foreground sm:text-lg">
                    {level.quote}
                  </p>
                  <h5 className={`mb-3 text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>
                    Quests & Skills
                  </h5>
                  <ul className="space-y-2.5">
                    {level.quests.map((q, i) => {
                      const key = `${level.id}-q-${i}`;
                      const checked = !!progress.quests[key];
                      return (
                        <li
                          key={key}
                          className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/40 p-3"
                        >
                          <Checkbox
                            id={key}
                            checked={checked}
                            onCheckedChange={() => toggleQuest(key)}
                            className="mt-0.5"
                          />
                          <label
                            htmlFor={key}
                            className={`cursor-pointer text-sm leading-relaxed ${
                              checked ? "text-muted-foreground line-through" : "text-foreground"
                            }`}
                          >
                            {q}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={() => toggleLevel(level.id)}
                      variant={done ? "secondary" : "default"}
                      className="rounded-full"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      {done ? "Mark Incomplete" : "Mark Level Complete"}
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>

      {/* Badges */}
      <section ref={badgeRef} className="reveal-on-view">
        <div className="mb-5 text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>
            Achievements
          </p>
          <h3 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">Sigils Earned</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {badges.map((b) => {
            const unlocked = !!progress.levels[`${treeKey === "movement-arts" ? "" : ""}level-${b.level}`] || !!progress.levels[`${b.id.split("-")[0]}-level-${b.level}`] || !!progress.levels[`${treeKey}-l${b.level}`];
            // simpler: unlock if user has completed at least b.level levels
            const unlockedFinal = completedLevels >= b.level;
            void unlocked;
            return (
              <div
                key={b.id}
                className={`${panelClass} flex flex-col items-center rounded-2xl p-4 text-center ${
                  unlockedFinal ? "" : "badge-locked"
                }`}
              >
                <span className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/50 bg-background/40 shadow-[var(--shadow-soft)]">
                  <b.Icon className={`h-5 w-5 ${accentClass}`} />
                </span>
                <p className="text-sm font-bold text-foreground">{b.name}</p>
                <p className={`mt-1 text-[0.65rem] uppercase tracking-widest ${accentClass}`}>
                  {unlockedFinal ? "Unlocked" : `Lv ${b.level}`}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
