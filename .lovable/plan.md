## Goal

Replace the current 1-column list of skill cards on `/skill-trees` with a **Tree of Life** visualization — a single rooted tree where each of the five skill trees lives as its own branch growing out of a shared trunk. The page should *look* like a tree (trunk, branches, glowing fruit/leaf nodes), not just a list with a tree-shaped diagram next to it. Same data, same progress logic, same routes — new metaphor and layout.

This is a **visual / structural pass** on `src/routes/skill-trees.tsx`. No data model changes, no progress-store changes, no route changes.

---

## Visual concept

```text
            ✦  Spirit (top crown)
              \
               \
   Air ──── ●  trunk  ● ──── Energy
              /│\
             / │ \
            /  │  \
        Touch  │  Herbs
               │
              ◉  roots = "Your ascension"
                  (combined level / XP)
```

Tree-of-Life inspired layout (think Sephirot / world-tree, not literal photo-realism):

- **Central vertical trunk** running top-to-bottom in an SVG.
- **Five glowing node "fruits"** — one per skill tree — placed around the trunk in a balanced, organic arrangement (one at top/crown, two upper sides, two lower sides). Mind & Spirit at the crown, Energy + Air as upper limbs, Herbal + Touch as lower limbs. The fifth arrangement keeps left/right symmetry.
- **Curved branch lines** in SVG connecting each node back to the trunk. Branches use a subtle gradient stroke and fade in on mount.
- **Roots at the base** = a small "Ascension" summary node showing combined progress across all trees.
- **Pulsing aura** on each node sized by that tree's progress — more progress = brighter glow.
- **Tap a node** → it expands inline below the tree into the existing skill card (live or static), rather than replacing the tree. So the tree always stays visible as the navigator.

---

## Page architecture

```text
┌─────────────────────────────────────────────────────────┐
│  PageFrame header (eyebrow + title + intro line)        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │           THE TREE OF LIFE (SVG)                │   │
│   │                                                 │   │
│   │              ✦  Mind & Spirit                   │   │
│   │             /                                   │   │
│   │      Air  ●     ● Energy                        │   │
│   │            \   /                                │   │
│   │             \ /                                 │   │
│   │              ▌  trunk                           │   │
│   │             / \                                 │   │
│   │      Touch ●   ● Herbs                          │   │
│   │              ▌                                  │   │
│   │             ◉  roots: Ascension Lv N           │   │
│   │                                                 │   │
│   │  Each node is a clickable group: icon disc +    │   │
│   │  label + tiny progress ring. Selected node      │   │
│   │  pulses; others dim slightly.                   │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │  SELECTED BRANCH DETAIL                         │   │
│   │  Renders the existing LiveSkillCard or          │   │
│   │  StaticSkillCard for the active node.           │   │
│   │  Default selection: Mind & Spirit (crown).      │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │  Legend / roots strip                           │   │
│   │  "Your Ascension Level blends progress from all │   │
│   │   five trees, rewarding balance over intensity."│   │
│   │  Combined XP bar + small dot per branch.        │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
│  (SkillWheel removed from this page — the tree IS the   │
│   wheel now. Wheel still lives elsewhere.)              │
└─────────────────────────────────────────────────────────┘
```

On mobile (`< lg`): the SVG scales to fit; node labels move closer to the nodes; branches stay curved but shorter. Selection still works tap-to-expand below.

---

## Technical implementation

**Single new file**
- `src/components/platform/TreeOfLife.tsx` — self-contained SVG component:
  - Accepts `nodes: Array<{ key: string; name: string; Icon; tone: string; progress: number; x: number; y: number }>` and `selected`, `onSelect`.
  - Draws an SVG `viewBox` (e.g. 0 0 600 700), trunk as a vertical path with slight organic curve, branches as quadratic Bézier curves from trunk midpoints to each node's `(x, y)`.
  - Each node = `<g>` containing aura circle (radius scales with progress), filled disc, lucide icon (rendered as foreignObject or as inline SVG path), and a label below.
  - Selected node gets `animate-pulse-glow` on its aura; others get reduced opacity.
  - Roots node at the bottom is non-interactive, shows combined progress as a thicker stroke.

**Edits**
- `src/routes/skill-trees.tsx` — replace the two-column grid with: tree visual on top, selected-card panel below, legend at bottom. Wire `selected` state. Reuse the existing `LiveSkillCard` and `StaticSkillCard` (extracted to inline use, no API change). Compute combined XP for the roots from `useTreeProgress` data.

**No edits**
- `src/components/platform/data.ts` — no fields added; tone/Icon/className already exist.
- `src/lib/progress-store.ts` — unchanged.
- `src/components/platform/PlatformUI.tsx` — `SkillWheel` stays (still used on home + community sidebar), just no longer rendered on this page.

**No new dependencies.** Pure SVG + Tailwind + existing semantic tokens (`text-air`, `text-spirit`, `text-earth`, `text-fire`, `text-water`, `--shadow-glow`, `--gradient-panel`).

---

## Visual / motion details

- Node aura: `<circle>` with `fill: currentColor; opacity: 0.15-0.4` based on progress.
- Branch stroke: `stroke="url(#branchGradient)"` linear gradient from `--border` at trunk → element color at node tip.
- On mount: branches animate `stroke-dasharray` to draw in (~600ms staggered).
- Hover/selected: node scales 1.05, aura brightens, label gets `text-foreground`.
- Background of the tree panel: subtle `marble-sheen` overlay + `bg-[var(--gradient-panel)]` so it feels like a sanctuary frame, consistent with the rest of the app.

---

## Out of scope

- No 3D, no canvas/WebGL, no animation library beyond Tailwind keyframes already in `styles.css`.
- No copy rewrites of skill descriptions or quest names.
- No changes to how progress is stored or computed — only how it's visualized.
- No new routes or nav.

---

## Success check

- `tsc` clean.
- `/skill-trees` shows the tree visualization with five clearly placed branch nodes plus a roots node.
- Clicking a node updates the selected card below in place; the tree stays mounted.
- At 719px viewport: SVG fits without overflow; selected card stacks below cleanly.
- All five trees still link to their existing destinations via the same Live/Static card buttons.
- Combined-XP roots indicator reflects real progress from `useTreeProgress`.
