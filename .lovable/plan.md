## Goal

Make `/community` feel calm, scannable, and obviously useful at first glance. Today the page stacks 10 dense sections in a single column — hero, stats strip, three challenge cards, composer, tabs, feed, circles, mentors, events, rituals, leaderboards, badges, code of conduct. Each section is well-built individually, but together they read as a wall. The user should land and immediately understand: *here's me, here's today, here's the feed — everything else is one click away.*

This is a **visual / information-architecture pass only**. No new features, no data-layer changes, no removed functionality. Same components, reorganized and restyled for hierarchy.

---

## New page architecture

```text
┌────────────────────────────────────────────────────────────┐
│  HERO (smaller, focused)                                   │
│  "The Circle" · one-line subtitle · 4 pulse stats          │
│  Today's intention card (only if not yet set today)        │
└────────────────────────────────────────────────────────────┘

┌──────────────────────────────────┬─────────────────────────┐
│  MAIN COLUMN (2/3)               │  SIDEBAR (1/3, sticky)  │
│                                  │                         │
│  Your Standing — compact         │  Today at a glance      │
│  (one row, 4 inline stats,       │   • Active challenge    │
│   not 4 big cards)               │     (the one user is in)│
│                                  │   • Next event          │
│  Feed                            │   • Streak + intention  │
│  • Composer (collapsed by        │                         │
│    default — "Share with the     │  Circles you're in      │
│    circle…" expands on focus)    │   (3 chips + "browse")  │
│  • Tabs + posts                  │                         │
│                                  │  Mentors on call today  │
│                                  │   (2 with avatars)      │
│                                  │                         │
└──────────────────────────────────┴─────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│  EXPLORE (tabbed, single panel — replaces 5 sections)      │
│  Tabs: Challenges · Circles · Mentors · Events · Rituals   │
│  Only the active tab renders. Reduces page from 10         │
│  sections to 4.                                            │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│  RECOGNITION (collapsed accordion)                         │
│  • Leaderboards                                            │
│  • Badge gallery                                           │
│  Both closed by default. User opens what they care about.  │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│  Code of the Circle (slim footer card, unchanged)          │
└────────────────────────────────────────────────────────────┘
```

Page goes from ~10 stacked sections to 4 visual zones: **hero → work area (feed + sidebar) → explore → recognition.** Same content, much less perceived weight.

---

## Visual refinements

- **Hero**: trim padding (`p-8 lg:p-12` → `p-6 lg:p-8`), drop the second decorative gradient layer to a single subtle one, hide the intention card once today's intention is set (move a tiny "✓ Today: Soft start" chip into the sidebar instead).
- **Your Standing**: convert the 4-card grid into a single horizontal "stat bar" — rank chip on the left with progress bar, three inline metrics on the right. Reads as one object, not four.
- **Feed composer**: collapsed pill ("Share with the circle…") that expands to the full composer on focus. Removes the largest static block above the fold.
- **Post cards**: tighten padding, smaller avatars, single-line meta row, reaction buttons as a quiet row (icon + count, no chip background until hovered/selected).
- **Tabs in Explore section**: same `Tabs` primitive already used for the feed — consistent pattern, only one panel visible at a time.
- **Recognition accordion**: shadcn `Accordion` (already installed), both items closed by default.
- **Spacing rhythm**: `space-y-12` → `space-y-8` between zones, `space-y-6` inside zones. Tighter, calmer.
- **Color discipline**: keep semantic tokens. Reduce competing accent colors — primary for active/CTA, muted for everything else. Today every section uses `border-primary/30`, `text-primary`, `text-cyan-glow`, `text-orchid-glow` — pick primary as the single accent on this page.
- **Mobile**: sidebar collapses to a horizontal scroll strip of three mini-cards above the feed. Explore tabs stay horizontal-scroll.

---

## Files

**Edit**
- `src/routes/community.tsx` — restructure top-level layout, collapse sections into the Explore tabs and Recognition accordion, slim the hero, convert Your Standing into a stat bar, collapse the composer, tighten post cards.

**No changes**
- `src/lib/community-data.ts` (all data reused as-is)
- `src/lib/community-progress.ts` (state API unchanged)
- Any other route or component

---

## Out of scope

- No new content, no removed sections (challenges, circles, mentors, events, rituals, leaderboards, badges all still present — just reorganized).
- No new data fields, no new XP rules, no nav changes.
- No new dependencies (Accordion + Tabs already in the project).

---

## Success check

- `tsc` clean.
- At 719px viewport (current preview) the page shows hero → stat bar → composer pill → feed without horizontal overflow; sidebar content appears as a scroll strip above the feed.
- At ≥1024px the sidebar is sticky beside the feed.
- Explore section renders exactly one panel at a time.
- Recognition accordion items both start closed.
- All existing actions (set intention, join challenge, log day, react, compose, etc.) still work — same handlers wired to the same state.
