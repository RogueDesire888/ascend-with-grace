## Goal

Apply the same calm-and-clear treatment to `/` that we just did on `/community`. The home page today is six full-width stacked sections (hero → element cards → 4-up value cards → skill wheel split → daily quests → membership CTA). Each section is beautiful in isolation, but together they read as a long scroll where every block competes for the same visual weight. A new visitor doesn't get a clear "here's what this is, here's what to do next."

This is a **visual / IA pass only** on `src/routes/index.tsx`. Same content, same components, same routes — reorganized for hierarchy and rhythm, with one tightened hero, one clear primary CTA, and progressive disclosure for the deeper material.

---

## New page architecture

```text
┌──────────────────────────────────────────────────────────┐
│  HERO  (tighter, single focal CTA)                       │
│  Eyebrow · H1 · subhead · primary + secondary CTA        │
│  3 trust chips inline (no big grid)                      │
│  Sanctuary image keeps the cinematic feel, smaller       │
│  vertical footprint so the next section peeks            │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  WHAT IS ASCEND  (one-line promise)                      │
│  Three-step "how it works" strip:                        │
│  ① Pick your element  ② Practice daily  ③ Watch it grow  │
│  Compact cards, icons + 1 sentence each                  │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  CHOOSE YOUR ELEMENT                                     │
│  Existing <ElementCards /> — unchanged                   │
│  (this is the page's natural focal point)                │
└──────────────────────────────────────────────────────────┘

┌─────────────────────────────────┬────────────────────────┐
│  TODAY'S PATH                   │  YOUR FIVE PATHS       │
│  3 daily quest cards            │  <SkillWheel /> + 3    │
│                                 │  next-quest blurbs     │
│  (was two separate full-width   │  stacked beside it     │
│   sections — now side-by-side)  │                        │
└─────────────────────────────────┴────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  EXPLORE THE PLATFORM  (replaces 4-card "value" section) │
│  Tabbed: Movement · Daily Loop · Mastery · Library       │
│  One panel visible at a time. Each panel = the existing  │
│  copy + icon + CTA, just one at a time instead of four.  │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  MEMBERSHIP CTA  (existing <MembershipCTA />, unchanged) │
└──────────────────────────────────────────────────────────┘
```

Page goes from **6 stacked full-width sections** to a clear **5-zone rhythm**: hero → how it works → element pick → daily + paths (split) → tabbed explore → membership.

---

## Visual refinements

- **Hero**:
  - Reduce `min-h-[calc(100vh-5rem)]` → `min-h-[78vh]` so the next zone peeks above the fold (current page feels like the hero IS the page).
  - Tighten padding (`py-16` → `py-12`), trim `text-7xl` → `text-6xl` at lg.
  - Replace the 3-column trust-chip grid with a single horizontal row of inline chips (matches the new community hero pulse style).
  - Soften the second gradient overlay so the sanctuary image breathes.
- **How it works** (new, lightweight): three numbered steps in a single row, no heavy panels — just numbered circles + one-line copy. Sets expectation immediately.
- **Element cards**: keep as-is.
- **Daily + Paths split**: combine the "Today's path" and "Five luminous paths / SkillWheel" sections into one two-column zone on `lg` (stacks on mobile). Same components, less vertical real estate.
- **Explore tabs**: replace the 4-up value-card grid with a `Tabs` panel using the same tab styling as `/community` (rounded chip tabs). Each panel renders the icon + copy + CTA from `valueCards`. One thing to look at instead of four.
- **Spacing rhythm**: section padding `pb-20` → `pb-14` between zones. Tighter, calmer.
- **Color discipline**: keep semantic tokens. Reduce competing accents — `text-spirit` switches to `text-primary` for consistency with the rest of the site.

---

## Files

**Edit**
- `src/routes/index.tsx` — restructure top-level layout, slim hero, add "how it works" strip, merge daily-path + skill-wheel into one row, replace value-card grid with tabbed Explore panel.

**No changes**
- `src/components/platform/PlatformUI.tsx` (`ElementCards`, `SkillWheel`, `QuestCard`, `MembershipCTA` reused as-is)
- `src/components/platform/data.ts`
- Any other route, asset, or style file
- No new dependencies (`Tabs` already used elsewhere)

---

## Out of scope

- No copy rewrites beyond the new "how it works" 3 one-liners.
- No new images or assets.
- No nav, route, or data changes.
- No removed sections — every existing block is still present, just rearranged.

---

## Success check

- `tsc` clean.
- At 719px (current preview) the page reads top-to-bottom without horizontal overflow; daily + paths stack vertically; explore tabs scroll horizontally if needed.
- At ≥1024px the daily + paths zone is two columns, the hero leaves visible peek of the next section.
- Explore zone shows exactly one panel at a time; default tab is "Movement".
- All existing CTAs (Sanctuary, Skill Trees, Quests, Library, Yoga Therapy Lab) still link to the same routes.
