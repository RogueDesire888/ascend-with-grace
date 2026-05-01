## Goal

Add a new standalone "Smoothie Alchemist's Codex" page that mirrors the Alchemist's Path UX (hero → character sheet → roadmap → expandable levels → badges → closing quote), themed with a fresh "apothecary kitchen" overlay (parchment/frosted glass, berry/green/honey accents) while inheriting the site's existing dark cosmic theme, fonts, radii, and button styles.

## Files to create

### 1. `src/routes/smoothie-codex.tsx` (new route → `/smoothie-codex`)

Built in the same shape as `src/routes/alchemists-path.tsx`. Sections, in order:

1. **Hero** — title "🍓 The Smoothie Alchemist's Codex", subtitle "Master the Art of Nutrient-Dense Elixirs", quote "Blend for the body, craft for the soul. Every smoothie is a potion.", "Start Blending" CTA scrolling to Level 1.
2. **Character Sheet** — Level (Novice Blender → Grand Smoothie Sage), XP bar, completed quests / total, completed levels.
3. **Pantry Card** — 7 categories (Fruits, Vegetables, Liquids, Proteins & Supplements, Healthy Fats, Boosters & Superfoods, Natural Sweetness) rendered as badge/tag grids with emoji glyphs.
4. **Progression Roadmap** — 5 milestone tiles (Novice Blender, Green Apprentice, Protein Alchemist, Supplement Savant, Grand Smoothie Sage) clickable to scroll/open the matching accordion.
5. **Expandable Levels (1–5)** — single-open `Accordion`. Each level renders:
   - Flavor quote + unlocked-skills list.
   - Recipe cards (3+ each, with full ingredient lists and instructions from the brief; Level 4 has 4).
   - Per-recipe completion `Checkbox` (persisted via `useTreeProgress`).
   - Level challenge quest checkbox.
   - "Mark Level Complete" button.
   - Level 5 includes a Custom Formula Template card + Final Quest (7-day rotation example).
6. **Smoothie Builder** — small interactive tool: one `<select>` per category (Liquid, Greens, Fruit, Protein/Supplement, Fat, Booster, Sweetness). A "Conjure My Elixir" button generates a recipe card with a fun name (combinatorial logic from a name-parts table) and a "Random Smoothie" button that picks ingredients at random. Pure client state with `useState`; no extra deps.
7. **Achievement Badges Grid** — 6 badges (Green Thumb, Protein Pro, Superfood Collector, Smoothie Artist, Daily Blender, Gut Guardian). Unlock thresholds count completed recipe checkboxes within tagged categories (e.g., recipes tagged `veg`, `protein`, `superfood`, `custom`, `gut`) plus a "Daily Blender" counter that increments once per UTC day when any recipe is checked (stored separately in localStorage).
8. **Closing Quote** card.

Reuses: `Accordion`, `Checkbox`, `Progress`, `Button`, `Card` primitives, `useReveal` IntersectionObserver pattern copied from `alchemists-path.tsx`, `parchment-card`/`grimoire-heading`/`gold-accent`/`reveal-on-view` utilities already in `src/styles.css`.

### 2. `src/lib/smoothie-progress.ts` (new)

A small standalone localStorage hook (key `smoothie-codex-progress-v1`) tracking:
- `recipes: Record<string, boolean>` — per-recipe completion (key = `${levelId}-${recipeSlug}`).
- `quests: Record<string, boolean>` — per-level challenge quest.
- `levels: Record<string, boolean>` — level capstone flag.
- `dailyBlend: { lastDate: string, dayCount: number }` — for Daily Blender badge.

Mirrors the `useSyncExternalStore` pattern from `src/lib/progress-store.ts` but kept independent so it does not pollute the herbal/movement skill-tree numbers (the user did not ask to link the smoothie path to a skill tree, and there isn't a "Nutrition" tree today). XP math: 25 XP per recipe + 50 XP per quest + 100 XP per level.

## Files to modify

### 3. `src/components/platform/data.ts`
Add `{ to: "/smoothie-codex" as const, label: "Smoothie Codex" }` to `navItems` (after "Herbal Path").

### 4. `src/styles.css`
Append a small "apothecary kitchen" utility set scoped to the smoothie page so the existing parchment look gets a fresh berry/green/honey overlay without affecting the Herbal Path:
- `.apothecary-card` — frosted-glass background using `color-mix` of `--card`, `--leaf-glow`, and `--sun-glow`, soft inner border, `backdrop-filter: blur(14px)`.
- `.apothecary-heading` — serif heading variant (reuses `Cormorant Garamond` already loaded by `__root.tsx`).
- `.berry-accent`, `.leaf-accent`, `.honey-accent` — text utilities using existing tokens (`--coral-glow`, `--leaf-glow`, `--sun-glow`).
- `.ingredient-tag` — pill tag style for the pantry badges.

No new font loads, no new dependencies, no `tailwind.config` changes.

## Behavior details

- Single-open accordion (`type="single" collapsible`).
- Smooth scroll: `document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })` (matches existing pattern; SSR-guarded).
- Reveal-on-view via `IntersectionObserver` adding `is-visible` to `.reveal-on-view` (utility already exists).
- All state persisted to `localStorage` via the new hook with `useSyncExternalStore` so multiple components stay in sync.
- Builder: when no selection is made, the result card is hidden; "Random" pre-fills all selects then renders.
- No backend, no network calls, no new packages.

## SEO

`head()` on the route sets:
- `title`: "The Smoothie Alchemist's Codex — Nutrient-Dense Elixirs | Ascend"
- `description` + `og:title` + `og:description` describing the 5-level smoothie journey.

## Out of scope

- Linking smoothie progress into the existing skill-tree wheel (no Nutrition branch exists, and this wasn't requested).
- Image generation — relies on emoji glyphs and existing CSS aesthetics.
- Editing the Herbal Path or Movement labs.

## Verification

After implementation: confirm route appears in nav, accordion opens/closes, checkboxes persist across reload, builder generates a recipe, badges flip to "Unlocked" as recipes are checked, and the page inherits the dark cosmic theme with the new apothecary overlay.
