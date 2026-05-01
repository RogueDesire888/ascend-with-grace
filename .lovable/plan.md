## Goal

Transform the single-page **Smoothie Codex** (`/smoothie-codex`) into an elite encyclopedic module — same depth and structure as the new Herbal Path and Breathwork sections — and give it its **own dedicated dropdown** in the header (separate from the Alchemy menu).

## New architecture

```text
/smoothie/
  start-here              Welcome, philosophy of the blender, your first elixir
  ingredients             Encyclopedia of 80+ ingredients (fruits, greens, proteins,
                          fats, superfoods, liquids, boosters) with nutrition,
                          benefits, swaps, sourcing, seasonality
  ingredients/$slug       Per-ingredient deep dive (macro/micro profile, ORAC,
                          glycemic load, pairings, contraindications)
  science                 Nutrient density, bioavailability, blending vs juicing,
                          fibre, polyphenols, the cold-chain, glycemic response
  recipes                 60+ curated recipes filterable by goal, season, diet
  recipes/$slug           Full recipe page (ratios, prep, nutrient breakdown,
                          variations, story)
  goals                   Smoothies by goal — energy, gut, recovery, immunity,
                          skin, focus, sleep, weight, hormonal, kids
  goals/$goalId           Goal detail with curated recipes + 7-day rotation
  builder                 Interactive smoothie architect (base/liquid/protein/
                          fat/fibre/superfood/sweetener) with live macro estimate
  mastery                 Existing 5-level game preserved verbatim
  rituals                 Morning, post-workout, evening, fasting-window,
                          seasonal cleanse rituals
  pantry                  Build-your-pantry shopping lists by budget tier and
                          dietary pattern (omnivore / plant-based / keto / AIP)
  community               Featured creators, recipe contributors, regional
                          smoothie traditions (Brazilian açaí, Indian lassi,
                          Filipino halo-halo blends, etc.)
  resources               Books, blenders compared, equipment, podcasts, studies
  tools                   Macro calculator, ratio architect, glycemic estimator,
                          freezer-prep planner
```

## Header navigation

Add a **new "Smoothies" dropdown** in `src/components/platform/AppShell.tsx` (both desktop and mobile), placed next to Alchemy. The current Smoothie Codex link inside the **Alchemy** dropdown will be removed so the section stands on its own.

Final header dropdowns: Tai Chi · Yoga · Alchemy · **Smoothies** · Breathwork.

## Data layer

**`src/lib/smoothie-data.ts`** — single static encyclopedia with these exports:

- `ingredients: Ingredient[]` — 80+ entries with `slug, name, category, emoji, nutrients{calories, protein, fat, carbs, fibre, sugar, key micronutrients}, benefits[], pairings[], swaps[], season[], sourcing, contraindications[]`
- `categories: IngredientCategory[]` — fruits, leafy greens, cruciferous, proteins, healthy fats, superfoods, liquids, sweeteners, spices, boosters
- `recipes: Recipe[]` — 60+ recipes with goals, macros, season, difficulty, story
- `goals: SmoothieGoal[]` — 10 goals with summary, recipe slugs, weekly rotation, "why it works"
- `rituals: Ritual[]` — 6 ritual templates (timing, intention, recipe pairing)
- `nutrients: NutrientFact[]` — vitamins/minerals/phytonutrients with what-it-does and best food sources
- `studies: Study[]` — 15–20 peer-reviewed entries on whole-food smoothies, blending vs juicing, fibre intake, polyphenol bioavailability
- `equipment: Blender[]` — comparison of common blenders (Vitamix, Blendtec, NutriBullet, Ninja, immersion) with strengths and price tier
- `books: Book[]` — foundational reading
- `pantryTiers: PantryTier[]` — budget / standard / premium starter pantries
- `searchAll(query)` — Cmd+K search across ingredients, recipes, goals, nutrients, studies
- `getIngredient(slug)`, `getRecipe(slug)`, `getGoal(id)` lookups
- `ranks: Rank[]` — 6-tier rank ladder (Sprout → Blender Apprentice → Recipe Architect → Macro Sage → Phytonutrient Scholar → Grand Smoothie Sage)

## Progress store

Extend **`src/lib/smoothie-progress.ts`** (or replace its internals) to track:

- `recipesMade: Record<slug, boolean>`
- `ingredientsLogged: Record<slug, boolean>`
- `goalsActive: Record<id, boolean>`
- `streakDays: { date: string }[]` for daily blend streaks
- `customRecipes: SavedRecipe[]` from the builder
- existing `levels` / `quests` map preserved for the mastery game

Add `currentRank(progress)` mirroring `currentRank` in `herbal-progress.ts` based on recipes made + ingredients logged.

## Layout shell

**`src/routes/smoothie.tsx`** — layout route mirroring `breathwork.tsx` / `alchemists-path.tsx`:

- header strip with module label + rank badge + ⌘K search dialog
- horizontal scroll nav of all sub-routes
- `<Outlet />` for child pages
- root redirect message pointing to Start Here

## Sub-routes

Each page follows the same visual grammar as the new Herbal Path pages — semantic tokens only (no hardcoded colors), `bg-card/40` panels, leaf/citrus accent token, lucide icons. Notable interactions:

- **builder**: live macro estimate as you click ingredients, save to `customRecipes`, share-friendly summary card
- **tools**: macro calculator (per-100g math), ratio architect (40% base / 25% liquid / 15% protein / 10% fat / 10% boosters defaults), glycemic estimator (low/med/high based on ingredient GL sums), 7-day freezer-prep planner
- **mastery**: existing 5-level Codex page lifted into `/smoothie/mastery` so nothing is lost

## Migration & redirects

- Move existing `src/routes/smoothie-codex.tsx` content into `src/routes/smoothie.mastery.tsx` (route `/smoothie/mastery`).
- Replace `src/routes/smoothie-codex.tsx` with a small redirect component that navigates to `/smoothie/start-here` so existing links keep working.
- Update `alchemyItems` in `src/components/platform/data.ts` to drop the Smoothie Codex entry.
- Add `smoothieItems` array (all 13 sub-route entries) and import it in `AppShell.tsx`.

## Quality bar

- TypeScript strict — no `any`, all routes typed.
- Every route has its own `head()` with unique title + description + og tags.
- Every detail route has `loader`, `notFoundComponent`, `errorComponent`.
- Recipes and ingredients use the same monograph density as the herbal materia medica (real numbers, real benefits, real contraindications — no filler).
- Cmd+K search works across the whole module.
- Rank tracker badge in the layout updates as the user marks recipes made.

## Non-goals

- No backend/persistence beyond `localStorage` (matches Herbal & Breathwork modules).
- No image generation — emoji + typography carry the visual identity, like the existing codex.
- No e-commerce links for blenders — comparison only.
