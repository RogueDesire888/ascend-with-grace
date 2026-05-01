import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Compass,
  Eye,
  FlaskConical,
  Hourglass,
  Leaf,
  Moon,
  Mountain,
  NotebookPen,
  Scale,
  Sparkles,
  Sprout,
  Stars,
  Target,
  Wand2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useTreeProgress, type LevelDef } from "@/lib/progress-store";

export const Route = createFileRoute("/alchemists-path")({
  head: () => ({
    meta: [
      { title: "The Alchemist's Path — A Game of Herbal Mastery | Ascend" },
      {
        name: "description",
        content:
          "An interactive 5-level herbalism journey from Novice Herbalist to Grand Alchemist. Quests, herbs, recipes, and progress tracking.",
      },
      { property: "og:title", content: "The Alchemist's Path — A Game of Herbal Mastery" },
      {
        property: "og:description",
        content:
          "Walk a wizard's path through 5 levels of herbal mastery — quests, recipes, and the Philosopher's Stone await.",
      },
    ],
  }),
  component: AlchemistsPathPage,
});

const STORAGE_KEY = "alchemists-path-progress-v1";

type Progress = {
  quests: Record<string, boolean>;
  levels: Record<string, boolean>;
};

const defaultProgress: Progress = { quests: {}, levels: {} };

// ---------- Content ----------

const roadmap = [
  { id: "level-1", name: "Novice Herbalist", focus: "Safe foundations", unlock: "5 ally herbs", Icon: Sprout },
  { id: "level-2", name: "Apprentice", focus: "First potions", unlock: "Tea, infusion, decoction", Icon: Leaf },
  { id: "level-3", name: "Journeyman", focus: "Crafting", unlock: "Tinctures, oils, salves, syrups", Icon: FlaskConical },
  { id: "level-4", name: "Adept", focus: "Energetics & synergy", unlock: "Four humors, dual extraction", Icon: Scale },
  { id: "level-5", name: "Grand Alchemist", focus: "Spirit of the plant", unlock: "Spagyric & fermentation", Icon: Wand2 },
];

type Herb = { name: string; latin: string; benefits: string; nutrients: string };

type Level = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  quote: string;
  quests: string[];
  herbsTitle: string;
  herbs: Herb[];
};

const levels: Level[] = [
  {
    id: "level-1",
    number: 1,
    title: "Novice Herbalist",
    subtitle: "First steps on the green path",
    quote: "“Before you brew, learn to look. Before you look, learn to listen.”",
    quests: [
      "Read & internalize the Herbalist's Code: do no harm, know your plant, make medicine that tastes good.",
      "Memorize the 5 ally herbs by sight, smell, and touch.",
      "Learn safety rules: positive ID, allergy patch test, pregnancy/medication interactions, sustainable harvest.",
      "Identification Quest: photograph or sketch each ally herb in the wild (or at the market) with notes.",
      "Prepare your first cup of nettle infusion and journal the experience.",
    ],
    herbsTitle: "The 5 Ally Herbs",
    herbs: [
      {
        name: "Stinging Nettle",
        latin: "Urtica dioica",
        benefits: "Mineral-rich nourisher; supports blood, hair, joints, and seasonal allergies.",
        nutrients: "Iron, calcium, magnesium, potassium, vitamins A, C, K, chlorophyll.",
      },
      {
        name: "Chamomile",
        latin: "Matricaria chamomilla",
        benefits: "Gentle nervine; eases tension, digestive upset, and restless sleep.",
        nutrients: "Apigenin, bisabolol, calcium, magnesium.",
      },
      {
        name: "Peppermint",
        latin: "Mentha × piperita",
        benefits: "Cooling carminative; relieves bloating, headaches, and mental fog.",
        nutrients: "Menthol, rosmarinic acid, vitamin A, manganese.",
      },
      {
        name: "Calendula",
        latin: "Calendula officinalis",
        benefits: "Skin and lymph ally; soothes irritation, supports wound healing.",
        nutrients: "Carotenoids, flavonoids, saponins.",
      },
      {
        name: "Dandelion",
        latin: "Taraxacum officinale",
        benefits: "Liver and digestion tonic; gentle diuretic; whole plant is food and medicine.",
        nutrients: "Vitamins A, C, K, iron, potassium, inulin (root).",
      },
    ],
  },
  {
    id: "level-2",
    number: 2,
    title: "Apprentice",
    subtitle: "Brewing the first potions",
    quote: "“Water is the first solvent, patience is the second.”",
    quests: [
      "Learn the difference between tea, infusion, and decoction.",
      "Brew each of the four foundational potions at least twice.",
      "Mineral Electrolyte Challenge: craft a daily nettle + oatstraw + mineral salt infusion for 7 days and journal energy & sleep.",
      "Host a tea ceremony for one friend or family member.",
    ],
    herbsTitle: "Four Foundational Potions",
    herbs: [
      {
        name: "Nourishment Infusion",
        latin: "Long-steep nettle + oatstraw",
        benefits: "Deep mineralization; daily tonic for energy, hair, nails, and resilience.",
        nutrients: "1 oz dried herb + 1 qt boiling water, steep 4–8 hours, strain & sip.",
      },
      {
        name: "Sleepy Blend",
        latin: "Chamomile + lemon balm + lavender",
        benefits: "Wind-down for restless minds; gentle enough for evenings and children (adjusted dose).",
        nutrients: "1 tbsp blend + 8 oz hot water, steep 10 min covered.",
      },
      {
        name: "Digestive Decoction",
        latin: "Ginger + fennel + dandelion root",
        benefits: "Warms digestion, eases bloating, supports liver and bile flow.",
        nutrients: "1 tbsp herbs + 2 cups water, simmer 20 min, strain.",
      },
      {
        name: "Calendula Steam",
        latin: "Calendula flower steam",
        benefits: "Opens pores, soothes congested skin, gentle facial ritual.",
        nutrients: "Handful of flowers + bowl of hot water; tent with towel 5–10 min.",
      },
    ],
  },
  {
    id: "level-3",
    number: 3,
    title: "Journeyman",
    subtitle: "The craft of preservation",
    quote: "“Every preparation is a question asked of the plant. Listen to its answer.”",
    quests: [
      "Master the Folk Method for tinctures: fill jar with herb, cover with 80–100 proof spirits, shake daily for 4–6 weeks, strain.",
      "Infuse a calendula oil (low heat or solar method, 2–4 weeks), then thicken with beeswax to make a salve.",
      "Brew an elderberry or thyme honey syrup for the cold season.",
      "Crafting Quest: assemble a 6-jar herbal first-aid kit (salve, tincture, syrup, tea blend, oil, balm) and label each.",
    ],
    herbsTitle: "First-Aid Kit Recipes",
    herbs: [
      {
        name: "All-Purpose Salve",
        latin: "Calendula + plantain oil + beeswax",
        benefits: "Cuts, scrapes, dry skin, diaper rash.",
        nutrients: "1 cup infused oil : 1 oz beeswax, melt & pour into tins.",
      },
      {
        name: "Echinacea Tincture",
        latin: "Echinacea purpurea",
        benefits: "Immune ally at first sign of illness.",
        nutrients: "Folk Method, 1:2 ratio if weighing; 30–60 drops up to 3×/day acute use.",
      },
      {
        name: "Elderberry Syrup",
        latin: "Sambucus nigra",
        benefits: "Antiviral support, kid-friendly winter staple.",
        nutrients: "1 cup berries + 4 cups water, simmer to halve; strain, cool, add 1 cup honey.",
      },
      {
        name: "Throat Honey",
        latin: "Thyme + sage in raw honey",
        benefits: "Sore throats, lingering coughs.",
        nutrients: "Pack jar with fresh herbs, cover in honey, infuse 2 weeks.",
      },
      {
        name: "Arnica Oil",
        latin: "Arnica montana",
        benefits: "Bruises, sore muscles. External use only.",
        nutrients: "Solar infuse 4 weeks; do not use on broken skin.",
      },
      {
        name: "Bitters Blend",
        latin: "Dandelion + orange peel + ginger",
        benefits: "Pre-meal tincture for sluggish digestion.",
        nutrients: "Folk Method in brandy; 5–10 drops 15 min before meals.",
      },
    ],
  },
  {
    id: "level-4",
    number: 4,
    title: "Adept",
    subtitle: "Energetics & the four humors",
    quote: "“The right herb in the wrong terrain is still the wrong herb.”",
    quests: [
      "Learn the energetic axes: hot/cold, dry/damp, tense/lax. Map each ally herb onto them.",
      "Study the four humors (sanguine, choleric, melancholic, phlegmatic) as terrain language.",
      "Practice Dual Extraction on a mushroom (e.g., reishi or chaga): alcohol tincture + water decoction, then combine.",
      "Design a personal Vitamin–Herb Synergy Protocol (e.g., vitamin C + nettle for iron, vitamin D + calendula for skin).",
      "7-Day Wellness Challenge: choose one imbalance, build a daily protocol around energetics, and journal results.",
    ],
    herbsTitle: "Adept's Toolkit",
    herbs: [
      {
        name: "Reishi Dual Extract",
        latin: "Ganoderma lucidum",
        benefits: "Adaptogen for sleep, immunity, and nervous system tone.",
        nutrients: "Triterpenes (alcohol-soluble) + beta-glucans (water-soluble).",
      },
      {
        name: "Tulsi (Holy Basil)",
        latin: "Ocimum sanctum",
        benefits: "Warming adaptogen; lifts mood, steadies stress response.",
        nutrients: "Eugenol, ursolic acid, vitamin K.",
      },
      {
        name: "Ashwagandha",
        latin: "Withania somnifera",
        benefits: "Grounding adaptogen for depleted, anxious, sleep-poor states.",
        nutrients: "Withanolides, iron.",
      },
      {
        name: "Hawthorn",
        latin: "Crataegus spp.",
        benefits: "Heart tonic — physical and emotional; gentle and long-game.",
        nutrients: "Flavonoids, OPCs, vitamin C.",
      },
    ],
  },
  {
    id: "level-5",
    number: 5,
    title: "Grand Alchemist",
    subtitle: "The spirit of the plant",
    quote: "“The plant teaches the alchemist. The alchemist remembers.”",
    quests: [
      "Study the Spagyric process: separation, purification, recombination of body, soul, and spirit of the plant.",
      "Ferment a wild soda, kvass, or herbal vinegar — befriend the microbial world.",
      "Cultivate a Plant Spirit Connection: sit with one plant daily for 30 days; journal dreams and impressions.",
      "Final Quest — The Philosopher's Stone: choose one chronic question in your life, design and complete a 90-day spagyric ritual response with one plant ally.",
    ],
    herbsTitle: "Master Workings",
    herbs: [
      {
        name: "Spagyric Tincture",
        latin: "Plant body, soul, spirit reunited",
        benefits: "Calcine the marc, dissolve the salts, return to the tincture — a complete plant essence.",
        nutrients: "Requires careful, ventilated workspace and reverence.",
      },
      {
        name: "Fire Cider",
        latin: "Folk fermented vinegar",
        benefits: "Horseradish, ginger, garlic, onion, citrus, hot pepper in raw apple cider vinegar.",
        nutrients: "Steep 4–6 weeks; strain, sweeten with honey.",
      },
      {
        name: "Plant Spirit Journal",
        latin: "Daily 30-day sit",
        benefits: "Develops intuitive relationship with one ally; the longest-lasting tool of the path.",
        nutrients: "Notebook, quiet, the same plant, the same time.",
      },
    ],
  },
];

const badges = [
  { id: "first-harvest", name: "First Harvest", level: 1, Icon: Sprout },
  { id: "wild-forager", name: "The Wild Forager", level: 1, Icon: Leaf },
  { id: "apothecary", name: "The Apothecary", level: 3, Icon: FlaskConical },
  { id: "vitalist", name: "The Vitalist", level: 4, Icon: Scale },
  { id: "plant-whisperer", name: "The Plant Whisperer", level: 5, Icon: Stars },
  { id: "grand-alchemist", name: "The Grand Alchemist", level: 5, Icon: Wand2 },
];

const inventory = [
  { name: "Clean glass jar", Icon: FlaskConical },
  { name: "Field notebook", Icon: NotebookPen },
  { name: "Teapot & strainer", Icon: Moon },
  { name: "Hand lens", Icon: Eye },
  { name: "Pestle & mortar", Icon: Mountain },
];

const stats = [
  { name: "Observation", value: 35, Icon: Eye },
  { name: "Intuition", value: 28, Icon: Compass },
  { name: "Patience", value: 42, Icon: Hourglass },
  { name: "Precision", value: 31, Icon: Target },
];

// ---------- Hooks ----------

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

// ---------- Page ----------

function AlchemistsPathPage() {
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [openLevel, setOpenLevel] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Progress;
        setProgress({ quests: parsed.quests ?? {}, levels: parsed.levels ?? {} });
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const totalQuests = useMemo(
    () => levels.reduce((acc, l) => acc + l.quests.length, 0),
    [],
  );
  const completedQuests = Object.values(progress.quests).filter(Boolean).length;
  const xp = completedQuests * 25;
  const xpMax = totalQuests * 25;

  const toggleQuest = (key: string) =>
    setProgress((p) => ({ ...p, quests: { ...p.quests, [key]: !p.quests[key] } }));

  const toggleLevel = (levelId: string) =>
    setProgress((p) => ({ ...p, levels: { ...p.levels, [levelId]: !p.levels[levelId] } }));

  const scrollTo = (id: string) => {
    if (typeof document === "undefined") return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpenLevel(id);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <HeroSection onBegin={() => scrollTo("level-1")} />

      {/* Character Sheet */}
      <CharacterSheet
        xp={xp}
        xpMax={xpMax}
        completedQuests={completedQuests}
        totalQuests={totalQuests}
        completedLevels={Object.values(progress.levels).filter(Boolean).length}
      />

      {/* Roadmap */}
      <Roadmap
        completedLevels={progress.levels}
        onJump={scrollTo}
      />

      {/* Levels */}
      <LevelsAccordion
        progress={progress}
        openLevel={openLevel}
        setOpenLevel={setOpenLevel}
        onToggleQuest={toggleQuest}
        onToggleLevel={toggleLevel}
      />

      {/* Badges */}
      <BadgesGrid completedLevels={progress.levels} />

      {/* Closing */}
      <ClosingQuote />
    </div>
  );
}

// ---------- Sections ----------

function HeroSection({ onBegin }: { onBegin: () => void }) {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className="reveal-on-view parchment-card relative mb-12 overflow-hidden rounded-3xl p-8 text-center sm:p-12"
    >
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] gold-accent">
        <Sparkles className="h-3.5 w-3.5" />
        A Game of Herbal Mastery
      </div>
      <h1 className="grimoire-heading text-4xl font-bold leading-tight text-foreground sm:text-6xl">
        🌿 The Alchemist's Path
      </h1>
      <p className="font-grimoire mt-6 text-lg italic text-muted-foreground sm:text-xl">
        “First, do no harm. Second, know your plant. Third, let the medicine taste good.”
      </p>
      <Button
        onClick={onBegin}
        size="lg"
        className="mt-8 rounded-full px-8 shadow-[var(--shadow-glow)]"
      >
        <BookOpen className="mr-2 h-4 w-4" />
        Begin Your Journey
      </Button>
    </section>
  );
}

function CharacterSheet({
  xp,
  xpMax,
  completedQuests,
  totalQuests,
  completedLevels,
}: {
  xp: number;
  xpMax: number;
  completedQuests: number;
  totalQuests: number;
  completedLevels: number;
}) {
  const ref = useReveal<HTMLElement>();
  const currentLevel = Math.min(5, completedLevels + 1);
  const currentClass =
    currentLevel >= 5
      ? "Grand Alchemist"
      : currentLevel >= 4
        ? "Adept"
        : currentLevel >= 3
          ? "Journeyman"
          : currentLevel >= 2
            ? "Apprentice"
            : "Novice Herbalist";

  return (
    <section ref={ref} className="reveal-on-view mb-12">
      <div className="parchment-card rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="font-grimoire text-xs uppercase tracking-[0.22em] gold-accent">
              Character Sheet
            </p>
            <h2 className="grimoire-heading mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              {currentClass}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
              <span className="rounded-full border border-primary/40 bg-background/40 px-3 py-1 font-semibold gold-accent">
                Level {currentLevel}
              </span>
              <span className="text-muted-foreground">
                Quests: <span className="font-semibold text-foreground">{completedQuests}/{totalQuests}</span>
              </span>
            </div>
            <div className="mt-5 max-w-md">
              <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                <span>XP</span>
                <span className="font-semibold text-foreground">{xp} / {xpMax}</span>
              </div>
              <Progress value={xpMax === 0 ? 0 : (xp / xpMax) * 100} className="h-3" />
            </div>
          </div>

          <div className="grid w-full max-w-md grid-cols-2 gap-3">
            {stats.map(({ name, value, Icon }) => (
              <div
                key={name}
                className="rounded-lg border border-border/60 bg-background/40 p-3"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Icon className="h-3.5 w-3.5 gold-accent" />
                    {name}
                  </span>
                  <span className="text-xs font-bold text-foreground">{value}</span>
                </div>
                <Progress value={value} className="mt-2 h-1.5" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-border/50 pt-5">
          <p className="font-grimoire mb-3 text-xs uppercase tracking-[0.22em] gold-accent">
            Inventory
          </p>
          <div className="flex flex-wrap gap-2">
            {inventory.map(({ name, Icon }) => (
              <div
                key={name}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-3 py-1.5 text-xs font-medium text-foreground"
              >
                <Icon className="h-3.5 w-3.5 gold-accent" />
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Roadmap({
  completedLevels,
  onJump,
}: {
  completedLevels: Record<string, boolean>;
  onJump: (id: string) => void;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="reveal-on-view mb-12">
      <div className="mb-6 text-center">
        <p className="font-grimoire text-xs uppercase tracking-[0.22em] gold-accent">
          The Wizard's Path
        </p>
        <h2 className="grimoire-heading mt-1 text-3xl font-bold text-foreground">
          Five Milestones to Mastery
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-8 hidden h-[calc(100%-4rem)] w-0.5 path-step-line md:left-1/2 md:top-1/2 md:hidden" />
        <ol className="grid gap-4 md:grid-cols-5">
          {roadmap.map((step, i) => {
            const done = !!completedLevels[step.id];
            return (
              <li key={step.id} className="relative">
                <button
                  onClick={() => onJump(step.id)}
                  className="parchment-card group flex w-full flex-col items-center rounded-2xl p-4 text-center transition-transform hover:-translate-y-1"
                >
                  <span
                    className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                      done
                        ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                        : "border-primary/40 bg-background/40 gold-accent"
                    }`}
                  >
                    <step.Icon className="h-5 w-5" />
                  </span>
                  <span className="font-grimoire text-[0.7rem] uppercase tracking-widest gold-accent">
                    Level {i + 1}
                  </span>
                  <span className="grimoire-heading mt-0.5 text-base font-bold text-foreground">
                    {step.name}
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground">{step.focus}</span>
                  <span className="mt-2 text-[0.7rem] italic text-muted-foreground">
                    {step.unlock}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function LevelsAccordion({
  progress,
  openLevel,
  setOpenLevel,
  onToggleQuest,
  onToggleLevel,
}: {
  progress: Progress;
  openLevel: string | undefined;
  setOpenLevel: (v: string | undefined) => void;
  onToggleQuest: (key: string) => void;
  onToggleLevel: (id: string) => void;
}) {
  return (
    <section className="mb-12">
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
              className="parchment-card scroll-mt-24 overflow-hidden rounded-2xl border-0 px-5 sm:px-7"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-1 flex-wrap items-center gap-3 text-left">
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full border ${
                      done
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-primary/50 bg-background/40 gold-accent"
                    } font-grimoire font-bold`}
                  >
                    {level.number}
                  </span>
                  <div>
                    <p className="font-grimoire text-[0.7rem] uppercase tracking-[0.2em] gold-accent">
                      Level {level.number}
                    </p>
                    <h3 className="grimoire-heading text-xl font-bold text-foreground sm:text-2xl">
                      {level.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{level.subtitle}</p>
                  </div>
                  {done && (
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-primary/50 bg-primary/15 px-2 py-1 text-xs font-semibold gold-accent">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Complete
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="font-grimoire mb-5 text-base italic text-muted-foreground sm:text-lg">
                  {level.quote}
                </p>

                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Quests */}
                  <div>
                    <h4 className="font-grimoire mb-3 text-xs uppercase tracking-[0.22em] gold-accent">
                      Quests & Skills
                    </h4>
                    <ul className="space-y-2.5">
                      {level.quests.map((q, i) => {
                        const key = `${level.id}-q-${i}`;
                        const checked = !!progress.quests[key];
                        return (
                          <li key={key} className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/40 p-3">
                            <Checkbox
                              id={key}
                              checked={checked}
                              onCheckedChange={() => onToggleQuest(key)}
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
                  </div>

                  {/* Herbs */}
                  <div>
                    <h4 className="font-grimoire mb-3 text-xs uppercase tracking-[0.22em] gold-accent">
                      {level.herbsTitle}
                    </h4>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {level.herbs.map((h) => (
                        <div
                          key={h.name}
                          className="rounded-lg border border-border/60 bg-background/45 p-3"
                        >
                          <p className="grimoire-heading text-base font-bold text-foreground">
                            {h.name}
                          </p>
                          <p className="font-grimoire text-xs italic gold-accent">{h.latin}</p>
                          <p className="mt-2 text-xs text-foreground/85">{h.benefits}</p>
                          <p className="mt-1.5 text-[0.7rem] text-muted-foreground">
                            {h.nutrients}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={() => onToggleLevel(level.id)}
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
  );
}

function BadgesGrid({ completedLevels }: { completedLevels: Record<string, boolean> }) {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="reveal-on-view mb-12">
      <div className="mb-6 text-center">
        <p className="font-grimoire text-xs uppercase tracking-[0.22em] gold-accent">
          Achievements
        </p>
        <h2 className="grimoire-heading mt-1 text-3xl font-bold text-foreground">
          Sigils of Mastery
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {badges.map((b) => {
          const unlocked = !!completedLevels[`level-${b.level}`];
          return (
            <div
              key={b.id}
              className={`parchment-card flex flex-col items-center rounded-2xl p-4 text-center ${
                unlocked ? "" : "badge-locked"
              }`}
            >
              <span className="mb-2 inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/50 bg-background/40 shadow-[var(--shadow-soft)]">
                <b.Icon className="h-6 w-6 gold-accent" />
              </span>
              <p className="grimoire-heading text-sm font-bold text-foreground">{b.name}</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-widest gold-accent">
                {unlocked ? "Unlocked" : `Lv ${b.level}`}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ClosingQuote() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="reveal-on-view">
      <div className="parchment-card rounded-3xl p-10 text-center">
        <Award className="mx-auto mb-4 h-8 w-8 gold-accent" />
        <p className="font-grimoire text-xl italic text-foreground sm:text-2xl">
          “May your teas be strong, your tinctures potent, and your heart ever-green.”
        </p>
        <p className="font-grimoire mt-4 text-xs uppercase tracking-[0.3em] gold-accent">
          — The Wizard's Blessing
        </p>
      </div>
    </section>
  );
}
