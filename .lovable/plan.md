## Goal

Redesign the Skill Trees page so the Tree of Life evokes the uploaded reference (ancient golden-lit tree on a floating cloud island with ruins and waterfalls) — but rendered as a pure stylized SVG. Each of the 5 skills becomes its own **living branch that grows with progress**: the further you advance in a skill, the longer, thicker, leafier, and more fruit-laden that branch becomes.

## Visual Direction (inspired by the reference)

- **Sky/canvas backdrop**: warm golden-hour gradient (soft amber → rose → cream) with layered cloud silhouettes drifting at the bottom.
- **Floating island base**: a rounded rocky platform with moss tufts and pink flower clusters spilling over the edge; two faint waterfalls cascading off the sides into the clouds.
- **Ruins**: a few minimal classical column silhouettes (3–5 columns + 2 statue silhouettes) flanking the trunk base, low-opacity to feel ambient, not busy.
- **Trunk**: thick, gnarled, organic shape (compound SVG path with bark-like inner texture lines and a warm brown gradient with a golden rim-light on one side).
- **Canopy halo**: large radial golden glow behind the upper branches.
- **Palette**: warm browns, mossy greens, golden amber, soft rose — wired through `src/styles.css` tokens (e.g. `--tree-trunk`, `--tree-canopy`, `--tree-glow`, `--tree-bloom`, `--tree-stone`) so it stays themeable.

## Branches as Living Skill Meters

Each of the 5 skills owns one branch. The branch geometry is **driven by that skill's `progress` (0–100)**:

| Visual property | At 0% | At 100% |
|---|---|---|
| Branch length | short stub off trunk | long sweeping arc into canopy |
| Branch thickness | thin twig (~3px) | thick limb (~12px) |
| Leaf cluster count | 1 small cluster | 5–7 lush clusters along the branch |
| Fruit count | 0 fruits | 3–5 glowing fruits (skill's tone color) |
| Bloom/flower accents | none | pink blossoms scattered |
| Branch glow | dim | bright aura matching skill tone |

Branch endpoints stay roughly anchored (so the silhouette is always recognizable as 5 branches) but interpolate from "stub" to "full limb" along a fixed Bézier path. Leaves/fruits are placed at parametric points along the path (using `getPointAtLength`-style precomputed offsets) and faded/scaled in as progress crosses thresholds.

## Interaction

- The full branch (path + leaves + fruits) is one clickable/focusable group. Hover lifts the branch slightly and brightens its glow; selected branch pulses and dims the others to ~40% opacity.
- A small floating label near each branch tip shows skill name + percent + level (same data as today).
- Clicking a branch keeps the existing behavior: the detail card (`LiveSkillCard` / `StaticSkillCard`) renders below the tree.
- The "Roots" section under the island stays — roots visibly extend further into the clouds as ascension level rises, and the existing Roots progress strip remains below the SVG.

## Layout

- Replace the current `TreeOfLife` SVG content while keeping the component's public props (`nodes`, `selectedKey`, `onSelect`, `rootsLabel`, `rootsProgress`) so `skill-trees.tsx` doesn't need logic changes.
- New viewBox ~`0 0 800 900` (taller, to fit canopy + island + cloud base).
- Responsive: SVG scales fluidly; on mobile (≤640px) labels collapse to just the skill icon chip near each branch tip, and the column/statue silhouettes simplify (drop to 2 columns) to avoid clutter.

## Animations

- On mount: trunk fades/grows up, then branches "grow" outward in sequence (`stroke-dasharray` reveal sized to current progress length, ~250ms each, staggered).
- Leaves/fruits pop in with a subtle scale spring after their branch finishes growing.
- Slow ambient drift on cloud layer (CSS `translateX` loop, 30s).
- Selected branch fruit gets a gentle pulsing glow (existing `animate-ping` pattern, slowed).
- All animations respect `prefers-reduced-motion` (skip growth, render final state).

## Technical Notes

- **Files touched**:
  - `src/components/platform/TreeOfLife.tsx` — full rewrite of the SVG body; props/exports unchanged.
  - `src/styles.css` — add the new tree color tokens in `oklch` (light + dark mode variants).
  - `src/routes/skill-trees.tsx` — no functional changes; possibly minor copy tweak in the eyebrow/intro to match the new visual.
- **Branch geometry**: each skill gets a fixed base Bézier (start anchor on trunk, control point, max endpoint). At runtime we compute an interpolated endpoint = `lerp(stubEnd, maxEnd, progress/100)` and interpolated stroke width. Leaf/fruit positions are precomputed as `t` values along the *max* path; we render only those whose `t <= progress/100 + small offset`.
- **Leaves & fruits**: small reusable SVG symbols (`<symbol id="leaf-cluster">`, `<symbol id="fruit">`) referenced via `<use>` so the markup stays light. Fruit fill uses `currentColor` driven by the branch's `toneClass`.
- **Ruins, statues, waterfalls, clouds**: pure SVG paths with low-opacity fills — no raster images, keeps bundle size flat and themeable.
- **Performance**: entire tree is one inline SVG, ~5 branches × ~10 decorative children = well under 200 nodes total.

## Out of Scope

- No raster/AI-generated background image (per chosen approach).
- No changes to progress data model, routing, or the detail cards below the tree.
- No new skills added — still the existing 5 from `skillTrees`.
