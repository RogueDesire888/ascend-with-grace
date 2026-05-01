## Goal

Make the skill tree page reflect real player progress, and turn the Yoga + Tai Chi labs into the Movement Arts equivalent of the Alchemist's Path.

- Herbal Path progress drives the **Herbal Wisdom** branch on `/skill-trees`.
- New gamified Yoga and Tai Chi experiences drive the **Movement Arts** branch.

## 1. Shared progress store

New file `src/lib/progress-store.ts`:

- localStorage-backed singleton with React hook `useTreeProgress(treeKey)`.
- Tracks per-tree: `completedQuests` (Set of keys), `completedLevels` (Set of ids), derived `level`, `xp`, `progress %`, `nextQuest`.
- Exposes `toggleQuest`, `toggleLevel`, `getTreeSummary(key)` for the skill tree page.
- Trees keyed by: `herbal-wisdom`, `movement-arts` (extensible to others later).
- Emits a `storage`-style custom event so the skill tree page re-renders live when the user completes a quest in another tab/route.
- SSR-safe (`typeof window` guards, hydrate inside `useEffect`).

XP / level formula (single shared rule):
- 25 XP per quest, 100 XP per level marked complete.
- Display level = number of completed level capstones + 1 (capped at 5).
- Progress bar % = XP toward next level (XP within current bracket / 100).
- `nextQuest` = first unchecked quest in the lowest incomplete level.

## 2. Wire Herbal Path into the store

In `src/routes/alchemists-path.tsx`:

- Replace the local `useState`/`useEffect` localStorage block with `useTreeProgress("herbal-wisdom")`.
- Migrate existing storage key `alchemists-path-progress-v1` once on first load so users don't lose progress.
- Quest keys keep their existing `level-N-q-i` shape so checklist state persists.

## 3. Gamify Yoga Therapy Lab

`src/routes/yoga-therapy-lab.tsx` becomes a quest-driven experience that **keeps all existing reference content** (8 limbs, libraries, conditions, generator, training, CPD) but adds a game layer on top.

New page structure:

1. **Hero / Character Sheet** mirroring Alchemist's Path style but with a dawn / sky aesthetic using the existing `--air` and `--spirit` tokens (no parchment — this is its own visual sibling).
2. **Movement Arts XP bar** — the same `useTreeProgress("movement-arts")` summary the Tai Chi lab also writes to, so progress from either page advances the shared branch.
3. **Roadmap of 5 Yoga Levels**:
   - L1 Grounding — breath awareness, mountain pose, box breathing
   - L2 Flow — sun salutation, dirgha breath
   - L3 Strength & Balance — warrior series, tree pose
   - L4 Therapy — pick a condition from the existing data and design a 1-week protocol with the generator
   - L5 Integration — daily 20-min self-practice for 7 days, write a yama reflection
4. **Expandable level accordions** with quest checklists and "Mark Level Complete" — same UX pattern as Alchemist's Path.
5. **Existing reference sections** (Philosophy, Libraries, Conditions, Generator, Training, CPD) preserved and rendered below the quest section, so the lab still works as a reference. The current top-tab nav stays as in-page anchors.
6. **Achievement badges** (Breath Keeper, Sun Walker, Steady Warrior, Healer's Eye, Daily Devotee).

## 4. Gamify Tai Chi Lab

`src/routes/tai-chi-lab.tsx` gets the same treatment with a water/earth tone.

- **5 Mastery Levels** mapped 1:1 to the existing "Five Levels of Mastery" content (Shape, Breath, Energy, Spirit, Return to Simplicity) — the existing reference text becomes the level descriptions.
- Each level gets 4–5 quests derived from the existing milestones table (e.g. L1: "Complete short form without omissions", "Stand in Wuji 5 minutes daily for a week", "Memorize the 8 gates by name").
- Same character sheet + roadmap + accordion + badges layout, sharing `useTreeProgress("movement-arts")`.
- All existing TOC sections (Origins, Styles, Lineage, Martial Core, Health, Ecosystem, Schedules, Glossary, Unending Path) kept below the quest section.

Because both labs read/write the same `movement-arts` tree, completing a yoga quest and a tai chi quest both grow the same Movement Arts branch on `/skill-trees`.

## 5. Skill tree page reflects live progress

`src/routes/skill-trees.tsx` + `src/components/platform/PlatformUI.tsx`:

- `SkillProgressCard` and `SkillWheel` consume the live `useTreeProgress` summaries.
- For trees not yet wired (Energy, Touch, Mind & Spirit) keep the existing static data as a fallback so nothing visually breaks.
- Card shows live `Lv`, `progress %`, and `nextQuest` pulled from the store. A small "Open path" button links to `/alchemists-path` (Herbal Wisdom), `/yoga-therapy-lab` and `/tai-chi-lab` (Movement Arts).
- `SkillWheel` outer node for Herbs and Motion gets a subtle `--shadow-glow` ring scaled to its progress so the tree visibly "grows".

## 6. Files Touched

**New**
- `src/lib/progress-store.ts`

**Edit**
- `src/routes/alchemists-path.tsx` — swap local state for shared store + one-time migration
- `src/routes/yoga-therapy-lab.tsx` — add hero/character sheet/roadmap/levels/badges above existing content
- `src/routes/tai-chi-lab.tsx` — same treatment, levels mapped to existing mastery content
- `src/components/platform/PlatformUI.tsx` — `SkillProgressCard` + `SkillWheel` read live tree summaries
- `src/routes/skill-trees.tsx` — pass live data and add "Open path" CTAs
- `src/styles.css` — small additions for movement-themed cards (sky/earth variants of `parchment-card`) so yoga and tai chi don't reuse the grimoire skin literally

## 7. Technical Notes

- All design uses existing semantic tokens (`--primary`, `--air`, `--water`, `--earth`, `--spirit`, `--shadow-glow`); no hardcoded hex.
- Store hook subscribes via `window.addEventListener("storage", …)` plus a custom in-tab event so cross-route updates propagate without a full reload.
- All new sections use the existing `reveal-on-view` IntersectionObserver pattern and Shadcn `Accordion`, `Checkbox`, `Progress`, `Button`, `Badge`.
- No new dependencies, no backend.
