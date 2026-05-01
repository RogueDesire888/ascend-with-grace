## Goal

Replace the stylized SVG Tree of Life with a **realistic, fully-grown tree image** in the style of your reference, then overlay 5 interactive skill nodes pinned exactly to the 5 most prominent branches. The tree always reads as lush, ancient, and fruitful — the 5 nodes are the focal points without forcing the underlying tree to look bare.

## Image

- Generate one new portrait-orientation hero image (premium quality, ~1024×1536) tuned for a vertical layout panel:
  - Massive ancient tree, gnarled trunk, lush golden-green canopy, glowing ornamental fruits.
  - Floating cloud island base with classical ruins, statues, pink blossoms, twin waterfalls.
  - Warm golden-hour lighting, painterly cinematic quality.
  - **Composition tuned for overlay**: 5 clearly distinguishable major branches fanning out (one crown, two upper laterals, two lower laterals) — symmetric enough that we can pin nodes reliably.
- Save to `src/assets/tree-of-life.jpg`, imported as an ES6 module.

## Overlay Architecture

`TreeOfLife.tsx` is fully rewritten but keeps its public props (`nodes`, `selectedKey`, `onSelect`, `rootsLabel`, `rootsProgress`) so `skill-trees.tsx` is untouched apart from one copy tweak.

Layout:
```
┌─────────────────────────────────┐
│ <img tree-of-life.jpg>          │  ← absolute fill, object-cover
│   ✦ node (Mind & Spirit)        │
│  ✦         ✦                    │  ← 5 absolutely-positioned nodes
│ ✦           ✦                   │     pinned to branch tips (% coords)
│   ▼ Roots strip (ascension)     │
└─────────────────────────────────┘
```

Each node:
- Pinned with `top`/`left` percentages tuned to the generated image's branch tips.
- Visual = small glowing fruit-like disc with the skill's tone color, lucide icon inside, soft radial aura.
- Idle: gentle pulse. Hover: aura grows + scales 1.05. Selected: bright pulsing ring + tone-tinted glow; other nodes dim to ~45%.
- Floating label card on hover/selected (skill name + percent + level), positioned to avoid clipping at edges.
- Progress influences only the **node's glow intensity and aura size** (not the tree itself), so the tree always looks fully grown while still rewarding progression.

Roots strip: stays as-is below the image (existing component already handles ascension % + chip list).

## Responsive

- Aspect ratio container (`aspect-[3/4]` desktop, `aspect-[4/5]` mobile) so node coordinates stay accurate at any width.
- On viewports ≤640px: node labels collapse to icon-only chips; full label appears in a small popover on tap.
- Image uses `object-cover` with `object-position: center top` to keep the canopy + branches in view if cropped.

## Accessibility & Motion

- Each node is a `<button>` with `aria-pressed` and `aria-label` (e.g. "Energy Mastery — 84%").
- Keyboard: tab through nodes; Enter/Space selects.
- All animations honor `prefers-reduced-motion` (no pulse, instant state changes).

## Files Touched

- **New**: `src/assets/tree-of-life.jpg` (generated premium image).
- **Rewritten**: `src/components/platform/TreeOfLife.tsx` — image + overlaid node buttons; props unchanged.
- **Minor copy tweak**: `src/routes/skill-trees.tsx` — eyebrow/intro phrasing to match the new visual; no logic changes.

## Out of Scope

- No multi-stage growth images (rejected option).
- No changes to skill data, routing, or the detail card below the tree.
