import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Award,
  CheckCircle2,
  Dumbbell,
  Leaf,
  Shuffle,
  Sparkles,
  Star,
  Sprout,
  FlaskConical,
  Wand2,
  Trophy,
  HeartPulse,
  Sun,
  type LucideIcon,
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
import { useSmoothieProgress } from "@/lib/smoothie-progress";

export const Route = createFileRoute("/smoothie-codex")({
  head: () => ({
    meta: [
      { title: "The Smoothie Alchemist's Codex — Nutrient-Dense Elixirs | Ascend" },
      {
        name: "description",
        content:
          "An interactive 5-level smoothie mastery journey from Novice Blender to Grand Smoothie Sage — recipes, a smoothie builder, and progress tracking.",
      },
      { property: "og:title", content: "The Smoothie Alchemist's Codex — Nutrient-Dense Elixirs" },
      {
        property: "og:description",
        content:
          "Master the art of nutrient-dense elixirs across 5 immersive levels with curated recipes, an interactive builder, and unlockable badges.",
      },
    ],
  }),
  component: SmoothieCodexPage,
});

// ---------- Pantry ----------

type PantryCategory = {
  name: string;
  emoji: string;
  items: { name: string; emoji?: string }[];
};

const pantry: PantryCategory[] = [
  {
    name: "Fruits",
    emoji: "🍓",
    items: [
      { name: "Banana", emoji: "🍌" },
      { name: "Mixed Berries", emoji: "🫐" },
      { name: "Mango", emoji: "🥭" },
      { name: "Pineapple", emoji: "🍍" },
      { name: "Apple", emoji: "🍏" },
      { name: "Avocado", emoji: "🥑" },
      { name: "Tart Cherry", emoji: "🍒" },
      { name: "Acai", emoji: "🟣" },
      { name: "Coconut Meat", emoji: "🥥" },
    ],
  },
  {
    name: "Vegetables",
    emoji: "🥬",
    items: [
      { name: "Spinach" },
      { name: "Kale" },
      { name: "Cucumber", emoji: "🥒" },
      { name: "Celery" },
      { name: "Carrot", emoji: "🥕" },
      { name: "Beet" },
      { name: "Zucchini" },
      { name: "Romaine" },
    ],
  },
  {
    name: "Liquids",
    emoji: "💧",
    items: [
      { name: "Almond Milk" },
      { name: "Oat Milk" },
      { name: "Coconut Water" },
      { name: "Kefir" },
      { name: "Green Tea (cooled)", emoji: "🍵" },
      { name: "Coconut Milk" },
      { name: "Water" },
    ],
  },
  {
    name: "Proteins & Supplements",
    emoji: "💪",
    items: [
      { name: "Whey/Plant Protein" },
      { name: "Collagen Peptides" },
      { name: "Spirulina" },
      { name: "Chlorella" },
      { name: "Maca" },
      { name: "Ashwagandha" },
      { name: "Creatine" },
      { name: "Greens Powder" },
      { name: "Hemp Protein" },
      { name: "Bee Pollen", emoji: "🐝" },
    ],
  },
  {
    name: "Healthy Fats",
    emoji: "🥜",
    items: [
      { name: "Almond Butter" },
      { name: "Peanut Butter" },
      { name: "Flaxseed" },
      { name: "Chia Seeds" },
      { name: "Hemp Hearts" },
      { name: "MCT Oil" },
      { name: "Avocado Oil" },
    ],
  },
  {
    name: "Boosters & Superfoods",
    emoji: "✨",
    items: [
      { name: "Fresh Ginger" },
      { name: "Turmeric" },
      { name: "Cinnamon" },
      { name: "Raw Cacao" },
      { name: "Matcha", emoji: "🍵" },
      { name: "Camu Camu" },
      { name: "Acerola" },
      { name: "Probiotics" },
      { name: "Vanilla Extract" },
    ],
  },
  {
    name: "Natural Sweetness",
    emoji: "🍯",
    items: [
      { name: "Raw Honey" },
      { name: "Maple Syrup" },
      { name: "Medjool Dates" },
      { name: "Stevia" },
      { name: "Ripe Banana" },
    ],
  },
];

// ---------- Levels & Recipes ----------

type Recipe = {
  slug: string;
  name: string;
  benefit: string;
  ingredients: string[];
  instructions: string;
  tags: RecipeTag[];
};

type RecipeTag = "veg" | "protein" | "superfood" | "custom" | "gut";

type Level = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  quote: string;
  unlocks: string[];
  recipes: Recipe[];
  challenge: string;
  Icon: LucideIcon;
};

const levels: Level[] = [
  {
    id: "level-1",
    number: 1,
    title: "Novice Blender",
    subtitle: "Foundation Blends",
    quote: "“Begin with what is sweet, simple, and true.”",
    unlocks: ["Fruit + liquid + fat ratio", "Banana base creaminess", "5 basic ingredients"],
    Icon: Sprout,
    recipes: [
      {
        slug: "classic-green",
        name: "Classic Green",
        benefit: "Energy & Glow",
        ingredients: ["1 cup spinach", "1 banana", "1 cup almond milk", "1 tbsp almond butter"],
        instructions: "Blend on high until silky, about 45 seconds.",
        tags: ["veg"],
      },
      {
        slug: "berry-bliss",
        name: "Berry Bliss",
        benefit: "Antioxidant Boost",
        ingredients: [
          "1 cup mixed berries",
          "1/2 cup Greek yogurt",
          "1 tbsp honey",
          "1/2 cup water",
        ],
        instructions: "Blend until smooth and pour into a chilled glass.",
        tags: ["gut"],
      },
      {
        slug: "tropical-breeze",
        name: "Tropical Breeze",
        benefit: "Digestive Ease",
        ingredients: [
          "1 cup mango",
          "1/2 cup pineapple",
          "1 cup coconut water",
          "Squeeze of lime",
        ],
        instructions: "Blend until smooth; finish with a lime twist.",
        tags: [],
      },
    ],
    challenge: "Blend one Foundation smoothie every morning for 3 days and journal how you feel.",
  },
  {
    id: "level-2",
    number: 2,
    title: "Green Apprentice",
    subtitle: "Adding Vegetables & Supergreens",
    quote: "“The greens give you the chlorophyll the sun gave them.”",
    unlocks: ["Bitter balance", "Root vegetables", "Herb infusion"],
    Icon: Leaf,
    recipes: [
      {
        slug: "the-detoxifier",
        name: "The Detoxifier",
        benefit: "Cleanse & Refresh",
        ingredients: [
          "1 cup kale",
          "1/2 cucumber",
          "1 celery stalk",
          "1 green apple",
          "1 inch ginger",
          "1 cup water",
        ],
        instructions: "Blend on high for a full minute for a smooth, juicy texture.",
        tags: ["veg"],
      },
      {
        slug: "beet-glow",
        name: "Beet Glow",
        benefit: "Radiance & Circulation",
        ingredients: [
          "1 small beet (cooked or raw)",
          "1 carrot",
          "1 orange",
          "1 tbsp hemp seeds",
          "1 cup coconut water",
        ],
        instructions: "Blend until vivid ruby and creamy.",
        tags: ["veg"],
      },
      {
        slug: "minty-green-machine",
        name: "Minty Green Machine",
        benefit: "Creamy & Cooling",
        ingredients: [
          "1 cup spinach",
          "1/2 avocado",
          "Handful fresh mint",
          "1 cup oat milk",
          "1 tsp honey",
        ],
        instructions: "Blend until lush; serve over a single ice cube.",
        tags: ["veg"],
      },
    ],
    challenge: "Create one veggie-forward smoothie per day for 5 days using a different green each time.",
  },
  {
    id: "level-3",
    number: 3,
    title: "Protein Alchemist",
    subtitle: "Post-Workout & Muscle Potions",
    quote: "“Strength is built in the kitchen as much as the gym.”",
    unlocks: ["Protein scoops", "Collagen ratios", "Recovery timing"],
    Icon: Dumbbell,
    recipes: [
      {
        slug: "muscle-mender",
        name: "Muscle Mender",
        benefit: "Post-Workout Repair",
        ingredients: [
          "1 banana",
          "1 scoop vanilla protein",
          "1 tbsp peanut butter",
          "1 cup oat milk",
          "1 tsp raw cacao",
        ],
        instructions: "Blend until smooth; drink within 30 minutes of training.",
        tags: ["protein"],
      },
      {
        slug: "recovery-gold",
        name: "Recovery Gold",
        benefit: "Joint & Tissue Recovery",
        ingredients: [
          "1 cup tart cherry juice (unsweetened)",
          "1/2 cup coconut water",
          "1 scoop collagen",
          "1/2 beet",
          "Handful of ice",
        ],
        instructions: "Blend until ruby-smooth and frothy.",
        tags: ["protein"],
      },
      {
        slug: "green-powerhouse",
        name: "Green Powerhouse",
        benefit: "Satiety & Strength",
        ingredients: [
          "1 cup spinach",
          "1 scoop unflavored protein",
          "1/4 avocado",
          "1 cup almond milk",
          "1 tbsp chia seeds",
        ],
        instructions: "Blend until thick; let stand 2 minutes for chia to bloom.",
        tags: ["protein", "veg"],
      },
    ],
    challenge: "Use protein in your smoothie for 7 consecutive days post-movement.",
  },
  {
    id: "level-4",
    number: 4,
    title: "Supplement Savant",
    subtitle: "Targeted Functional Elixirs",
    quote: "“Each elixir, an answer. Each answer, a question well asked.”",
    unlocks: ["Adaptogens", "Nootropic stacks", "Functional pairings"],
    Icon: FlaskConical,
    recipes: [
      {
        slug: "brain-fuel",
        name: "Brain Fuel",
        benefit: "Focus & Clarity",
        ingredients: [
          "1 cup blueberries",
          "1 tbsp MCT oil",
          "1 tsp matcha",
          "1/2 banana",
          "1 cup oat milk",
          "1 tbsp walnuts",
        ],
        instructions: "Blend until creamy; sip slowly while you work.",
        tags: ["superfood"],
      },
      {
        slug: "calm-and-focus",
        name: "Calm & Focus",
        benefit: "Stress Relief",
        ingredients: [
          "1 cup almond milk",
          "1 tsp ashwagandha",
          "1/2 banana",
          "1 tbsp almond butter",
          "Dash of cinnamon",
        ],
        instructions: "Blend until silky; an excellent late-afternoon ritual.",
        tags: ["superfood"],
      },
      {
        slug: "gut-soother",
        name: "Gut Soother",
        benefit: "Digestive Harmony",
        ingredients: [
          "1 cup kefir",
          "1/2 cup papaya",
          "1 tbsp ground flax",
          "1/2 banana",
          "Pinch of probiotic powder (optional)",
        ],
        instructions: "Blend on low to keep cultures alive; enjoy fresh.",
        tags: ["gut"],
      },
      {
        slug: "immunity-shield",
        name: "Immunity Shield",
        benefit: "Vitamin C Fortress",
        ingredients: [
          "1 orange",
          "1/2 cup frozen mango",
          "1/2 tsp camu camu",
          "1 small carrot",
          "1 cup coconut water",
        ],
        instructions: "Blend until vivid orange and frothy.",
        tags: ["superfood"],
      },
    ],
    challenge: "Try 3 different superfood boosters across 3 elixirs this week.",
  },
  {
    id: "level-5",
    number: 5,
    title: "Grand Smoothie Sage",
    subtitle: "Custom Master Formulas",
    quote: "“The recipe is a doorway. The blender is your wand.”",
    unlocks: ["Personal formula", "Weekly rotation", "Intuitive ratios"],
    Icon: Wand2,
    recipes: [
      {
        slug: "custom-formula-template",
        name: "Custom Formula Template",
        benefit: "Personalized Mastery",
        ingredients: [
          "Base: 1 cup liquid (almond/oat/coconut)",
          "Greens: 1 handful (spinach, kale, romaine)",
          "Fruit: 1 cup for natural sweetness",
          "Protein: 1 scoop or 1 tbsp seeds",
          "Fat: 1 tbsp (nut butter, MCT, avocado)",
          "Booster: 1 tsp superfood of choice",
        ],
        instructions:
          "Ratio guide: 2 parts liquid · 1 part greens · 2 parts fruit · 1 part protein · 1 tbsp fat · 1 tsp booster.",
        tags: ["custom"],
      },
      {
        slug: "seven-day-rotation",
        name: "Final Quest: 7-Day Rotation",
        benefit: "Designed Discipline",
        ingredients: [
          "Mon: Classic Green (Foundation)",
          "Tue: Brain Fuel (Focus)",
          "Wed: Muscle Mender (Strength)",
          "Thu: The Detoxifier (Cleanse)",
          "Fri: Calm & Focus (Reset)",
          "Sat: Tropical Breeze (Joy)",
          "Sun: Gut Soother (Restore)",
        ],
        instructions: "Print, screenshot, or rewrite the rotation in your own hand and follow it for one full week.",
        tags: ["custom"],
      },
    ],
    challenge:
      "Design and complete a 7-day smoothie rotation plan using the Custom Formula Template.",
  },
];

// ---------- Badges ----------

type Badge = {
  id: string;
  name: string;
  description: string;
  Icon: LucideIcon;
  threshold: number;
  count: (ctx: BadgeCtx) => number;
};

type BadgeCtx = {
  recipes: Record<string, boolean>;
  dailyDays: number;
};

function countTagged(recipes: Record<string, boolean>, tag: RecipeTag) {
  let n = 0;
  for (const lvl of levels) {
    for (const r of lvl.recipes) {
      if (r.tags.includes(tag) && recipes[`${lvl.id}-${r.slug}`]) n += 1;
    }
  }
  return n;
}

const badges: Badge[] = [
  {
    id: "green-thumb",
    name: "Green Thumb",
    description: "Veggie-forward smoothies completed",
    Icon: Leaf,
    threshold: 3,
    count: (c) => countTagged(c.recipes, "veg"),
  },
  {
    id: "protein-pro",
    name: "Protein Pro",
    description: "Protein-rich potions completed",
    Icon: Dumbbell,
    threshold: 3,
    count: (c) => countTagged(c.recipes, "protein"),
  },
  {
    id: "superfood-collector",
    name: "Superfood Collector",
    description: "Different superfood boosters used",
    Icon: Star,
    threshold: 3,
    count: (c) => countTagged(c.recipes, "superfood"),
  },
  {
    id: "smoothie-artist",
    name: "Smoothie Artist",
    description: "Custom blends crafted",
    Icon: Sparkles,
    threshold: 2,
    count: (c) => countTagged(c.recipes, "custom"),
  },
  {
    id: "daily-blender",
    name: "Daily Blender",
    description: "Days you have blended",
    Icon: Sun,
    threshold: 7,
    count: (c) => c.dailyDays,
  },
  {
    id: "gut-guardian",
    name: "Gut Guardian",
    description: "Probiotic & kefir blends completed",
    Icon: HeartPulse,
    threshold: 2,
    count: (c) => countTagged(c.recipes, "gut"),
  },
];

// ---------- Hook ----------

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

function SmoothieCodexPage() {
  const { progress, toggleRecipe, toggleQuest, toggleLevel } = useSmoothieProgress();
  const [openLevel, setOpenLevel] = useState<string | undefined>(undefined);

  const totalRecipes = useMemo(
    () => levels.reduce((acc, l) => acc + l.recipes.length, 0),
    [],
  );
  const completedRecipes = useMemo(() => {
    let n = 0;
    for (const lvl of levels) {
      for (const r of lvl.recipes) if (progress.recipes[`${lvl.id}-${r.slug}`]) n += 1;
    }
    return n;
  }, [progress.recipes]);
  const completedLevels = levels.filter((l) => progress.levels[l.id]).length;
  const completedQuests = levels.filter((l) => progress.quests[l.id]).length;
  const xp = completedRecipes * 25 + completedQuests * 50 + completedLevels * 100;
  const xpMax = totalRecipes * 25 + levels.length * 50 + levels.length * 100;

  const scrollTo = (id: string) => {
    if (typeof document === "undefined") return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpenLevel(id);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Hero onBegin={() => scrollTo("level-1")} />
      <CharacterSheet
        xp={xp}
        xpMax={xpMax}
        completedRecipes={completedRecipes}
        totalRecipes={totalRecipes}
        completedLevels={completedLevels}
      />
      <Pantry />
      <Roadmap completedLevels={progress.levels} onJump={scrollTo} />
      <LevelsAccordion
        progress={progress}
        openLevel={openLevel}
        setOpenLevel={setOpenLevel}
        onToggleRecipe={toggleRecipe}
        onToggleQuest={toggleQuest}
        onToggleLevel={toggleLevel}
      />
      <SmoothieBuilder />
      <BadgesGrid recipes={progress.recipes} dailyDays={progress.dailyBlend.dayCount} />
      <ClosingQuote />
    </div>
  );
}

// ---------- Sections ----------

function Hero({ onBegin }: { onBegin: () => void }) {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className="reveal-on-view apothecary-card relative mb-12 overflow-hidden rounded-3xl p-8 text-center sm:p-12"
    >
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] honey-accent">
        <Sparkles className="h-3.5 w-3.5" />
        Nutrient Mastery
      </div>
      <h1 className="apothecary-heading text-4xl font-bold leading-tight text-foreground sm:text-6xl">
        🍓 The Smoothie Alchemist's Codex
      </h1>
      <p className="apothecary-heading mt-3 text-xl text-muted-foreground sm:text-2xl">
        Master the Art of Nutrient-Dense Elixirs
      </p>
      <p className="mt-6 text-base italic text-muted-foreground sm:text-lg">
        “Blend for the body, craft for the soul. Every smoothie is a potion.”
      </p>
      <Button
        onClick={onBegin}
        size="lg"
        className="mt-8 rounded-full px-8 shadow-[var(--shadow-glow)]"
      >
        <Sparkles className="mr-2 h-4 w-4" />
        Start Blending
      </Button>
    </section>
  );
}

function CharacterSheet({
  xp,
  xpMax,
  completedRecipes,
  totalRecipes,
  completedLevels,
}: {
  xp: number;
  xpMax: number;
  completedRecipes: number;
  totalRecipes: number;
  completedLevels: number;
}) {
  const ref = useReveal<HTMLElement>();
  const currentLevel = Math.min(5, completedLevels + 1);
  const className =
    currentLevel >= 5
      ? "Grand Smoothie Sage"
      : currentLevel >= 4
        ? "Supplement Savant"
        : currentLevel >= 3
          ? "Protein Alchemist"
          : currentLevel >= 2
            ? "Green Apprentice"
            : "Novice Blender";
  return (
    <section ref={ref} className="reveal-on-view mb-12">
      <div className="apothecary-card rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] honey-accent">
              Character Sheet
            </p>
            <h2 className="apothecary-heading mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              {className}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
              <span className="rounded-full border border-primary/40 bg-background/40 px-3 py-1 font-semibold honey-accent">
                Level {currentLevel}
              </span>
              <span className="text-muted-foreground">
                Recipes:{" "}
                <span className="font-semibold text-foreground">
                  {completedRecipes}/{totalRecipes}
                </span>
              </span>
              <span className="text-muted-foreground">
                Levels:{" "}
                <span className="font-semibold text-foreground">{completedLevels}/5</span>
              </span>
            </div>
          </div>
          <div className="w-full max-w-md">
            <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
              <span>XP</span>
              <span className="font-semibold text-foreground">
                {xp} / {xpMax}
              </span>
            </div>
            <Progress value={xpMax === 0 ? 0 : (xp / xpMax) * 100} className="h-3" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Pantry() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="reveal-on-view mb-12">
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] leaf-accent">
          The Alchemist's Pantry
        </p>
        <h2 className="apothecary-heading mt-1 text-2xl font-bold text-foreground sm:text-3xl">
          Your Ingredient Library
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {pantry.map((cat) => (
          <div key={cat.name} className="apothecary-card rounded-2xl p-5">
            <h3 className="apothecary-heading mb-3 flex items-center gap-2 text-lg font-bold text-foreground">
              <span aria-hidden>{cat.emoji}</span> {cat.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span key={item.name} className="ingredient-tag">
                  {item.emoji && <span aria-hidden>{item.emoji}</span>}
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ))}
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
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] berry-accent">
          The Path
        </p>
        <h2 className="apothecary-heading mt-1 text-2xl font-bold text-foreground sm:text-3xl">
          Five Milestones
        </h2>
      </div>
      <ol className="grid gap-3 md:grid-cols-5">
        {levels.map((step) => {
          const done = !!completedLevels[step.id];
          return (
            <li key={step.id}>
              <button
                onClick={() => onJump(step.id)}
                className="apothecary-card group flex w-full flex-col items-center rounded-2xl p-4 text-center transition-transform hover:-translate-y-1"
              >
                <span
                  className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                    done
                      ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                      : "border-primary/40 bg-background/40 honey-accent"
                  }`}
                >
                  <step.Icon className="h-5 w-5" />
                </span>
                <span className="text-[0.7rem] font-semibold uppercase tracking-widest honey-accent">
                  Level {step.number}
                </span>
                <span className="apothecary-heading mt-0.5 text-base font-bold text-foreground">
                  {step.title}
                </span>
                <span className="mt-1 text-xs text-muted-foreground">{step.subtitle}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function LevelsAccordion({
  progress,
  openLevel,
  setOpenLevel,
  onToggleRecipe,
  onToggleQuest,
  onToggleLevel,
}: {
  progress: ReturnType<typeof useSmoothieProgress>["progress"];
  openLevel: string | undefined;
  setOpenLevel: (v: string | undefined) => void;
  onToggleRecipe: (key: string) => void;
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
              className="apothecary-card scroll-mt-24 overflow-hidden rounded-2xl border-0 px-5 sm:px-7"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-1 flex-wrap items-center gap-3 text-left">
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full border font-bold ${
                      done
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-primary/50 bg-background/40 honey-accent"
                    }`}
                  >
                    <level.Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] honey-accent">
                      Level {level.number}
                    </p>
                    <h3 className="apothecary-heading text-xl font-bold text-foreground sm:text-2xl">
                      {level.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{level.subtitle}</p>
                  </div>
                  {done && (
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-primary/50 bg-primary/15 px-2 py-1 text-xs font-semibold honey-accent">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Complete
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="apothecary-heading mb-5 text-lg italic text-muted-foreground">
                  {level.quote}
                </p>

                <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] leaf-accent">
                  Unlocked Skills
                </h4>
                <div className="mb-6 flex flex-wrap gap-2">
                  {level.unlocks.map((u) => (
                    <span key={u} className="ingredient-tag">
                      <Sparkles className="h-3 w-3" />
                      {u}
                    </span>
                  ))}
                </div>

                <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] berry-accent">
                  Recipes
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  {level.recipes.map((r) => {
                    const key = `${level.id}-${r.slug}`;
                    const checked = !!progress.recipes[key];
                    return (
                      <div
                        key={r.slug}
                        className="rounded-xl border border-border/50 bg-background/40 p-4"
                      >
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <div>
                            <h5 className="apothecary-heading text-lg font-bold text-foreground">
                              {r.name}
                            </h5>
                            <p className="text-xs italic honey-accent">{r.benefit}</p>
                          </div>
                          <Checkbox
                            id={key}
                            checked={checked}
                            onCheckedChange={() => onToggleRecipe(key)}
                            className="mt-1"
                          />
                        </div>
                        <ul className="mb-3 space-y-1 text-sm text-foreground/90">
                          {r.ingredients.map((ing) => (
                            <li key={ing} className="flex gap-2">
                              <span className="leaf-accent">•</span>
                              <span>{ing}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-muted-foreground">{r.instructions}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-xl border border-primary/30 bg-background/40 p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id={`${level.id}-quest`}
                      checked={!!progress.quests[level.id]}
                      onCheckedChange={() => onToggleQuest(level.id)}
                      className="mt-0.5"
                    />
                    <label
                      htmlFor={`${level.id}-quest`}
                      className="cursor-pointer text-sm leading-relaxed text-foreground"
                    >
                      <span className="font-semibold honey-accent">Challenge Quest: </span>
                      {level.challenge}
                    </label>
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

// ---------- Smoothie Builder ----------

const builderCategories: { key: string; label: string; options: string[] }[] = [
  { key: "liquid", label: "Liquid Base", options: ["Almond Milk", "Oat Milk", "Coconut Water", "Kefir", "Coconut Milk"] },
  { key: "greens", label: "Greens", options: ["Spinach", "Kale", "Romaine", "Cucumber"] },
  { key: "fruit", label: "Fruit", options: ["Banana", "Mixed Berries", "Mango", "Pineapple", "Tart Cherry", "Avocado"] },
  { key: "protein", label: "Protein / Supplement", options: ["Whey Protein", "Plant Protein", "Collagen", "Hemp Protein", "Greens Powder"] },
  { key: "fat", label: "Healthy Fat", options: ["Almond Butter", "Peanut Butter", "Chia Seeds", "Flaxseed", "MCT Oil"] },
  { key: "booster", label: "Booster", options: ["Cacao", "Matcha", "Turmeric", "Ginger", "Cinnamon", "Maca", "Ashwagandha"] },
  { key: "sweet", label: "Sweetness", options: ["Raw Honey", "Maple Syrup", "Medjool Dates", "Ripe Banana", "None"] },
];

const namePrefixes = ["Golden", "Wild", "Verdant", "Sunfire", "Velvet", "Crystal", "Twilight", "Forest", "Berry", "Solar"];
const nameSuffixes = ["Elixir", "Tonic", "Potion", "Reverie", "Bloom", "Cascade", "Alchemy", "Brew", "Embrace", "Codex"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function SmoothieBuilder() {
  const ref = useReveal<HTMLElement>();
  const [sel, setSel] = useState<Record<string, string>>({});
  const [name, setName] = useState<string>("");

  const allChosen = builderCategories.every((c) => sel[c.key]);

  const conjure = () => {
    setName(`${pick(namePrefixes)} ${pick(nameSuffixes)}`);
  };

  const random = () => {
    const next: Record<string, string> = {};
    for (const c of builderCategories) next[c.key] = pick(c.options);
    setSel(next);
    setName(`${pick(namePrefixes)} ${pick(nameSuffixes)}`);
  };

  return (
    <section ref={ref} className="reveal-on-view mb-12">
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] berry-accent">
          The Conjurer's Bench
        </p>
        <h2 className="apothecary-heading mt-1 text-2xl font-bold text-foreground sm:text-3xl">
          Interactive Smoothie Builder
        </h2>
      </div>
      <div className="apothecary-card rounded-2xl p-6 sm:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {builderCategories.map((c) => (
            <label key={c.key} className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-widest honey-accent">
                {c.label}
              </span>
              <select
                value={sel[c.key] ?? ""}
                onChange={(e) =>
                  setSel((prev) => ({ ...prev, [c.key]: e.target.value }))
                }
                className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">— choose —</option>
                {c.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            onClick={conjure}
            disabled={!allChosen}
            className="rounded-full"
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Conjure My Elixir
          </Button>
          <Button
            onClick={random}
            variant="secondary"
            className="rounded-full"
          >
            <Shuffle className="mr-2 h-4 w-4" />
            Random Smoothie
          </Button>
        </div>

        {allChosen && name && (
          <div className="mt-6 rounded-xl border border-primary/40 bg-background/50 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest honey-accent">
              Your Elixir
            </p>
            <h3 className="apothecary-heading mt-1 text-2xl font-bold text-foreground">
              {name}
            </h3>
            <ul className="mt-3 grid gap-1 text-sm text-foreground/90 sm:grid-cols-2">
              {builderCategories.map((c) => (
                <li key={c.key} className="flex gap-2">
                  <span className="leaf-accent">•</span>
                  <span>
                    <span className="text-muted-foreground">{c.label}:</span> {sel[c.key]}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs italic text-muted-foreground">
              Combine all ingredients in a high-speed blender. Blend on high for 45–60 seconds until silky.
              Pour into your favorite vessel and drink with intention.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function BadgesGrid({
  recipes,
  dailyDays,
}: {
  recipes: Record<string, boolean>;
  dailyDays: number;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="reveal-on-view mb-12">
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] berry-accent">
          Achievements
        </p>
        <h2 className="apothecary-heading mt-1 text-2xl font-bold text-foreground sm:text-3xl">
          Sigils of the Blender
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
        {badges.map((b) => {
          const c = b.count({ recipes, dailyDays });
          const unlocked = c >= b.threshold;
          return (
            <div
              key={b.id}
              className={`apothecary-card flex flex-col items-center rounded-2xl p-4 text-center ${
                unlocked ? "" : "opacity-55"
              }`}
            >
              <span className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/50 bg-background/40 shadow-[var(--shadow-soft)]">
                {unlocked ? (
                  <Trophy className="h-5 w-5 honey-accent" />
                ) : (
                  <b.Icon className="h-5 w-5 leaf-accent" />
                )}
              </span>
              <p className="apothecary-heading text-sm font-bold text-foreground">{b.name}</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-widest honey-accent">
                {unlocked ? "Unlocked" : `${c}/${b.threshold}`}
              </p>
              <p className="mt-1 text-[0.65rem] text-muted-foreground">{b.description}</p>
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
      <div className="apothecary-card rounded-3xl p-8 text-center sm:p-12">
        <Award className="mx-auto mb-3 h-8 w-8 honey-accent" />
        <p className="apothecary-heading text-xl italic text-foreground sm:text-2xl">
          “In a world of fast food, dare to blend slow nutrients. Your smoothie is your daily potion.
          Drink with intention.”
        </p>
      </div>
    </section>
  );
}
