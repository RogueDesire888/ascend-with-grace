## Goal

Add an immersive, game-like "Path of Herbal Mastery" experience as a **new dedicated page** at `/alchemists-path`, linked from the main navigation so it lives natively alongside the existing yoga and Tai Chi labs. A new page (rather than an embedded section on the homepage) is the right fit because the content is large, route-based pages already exist for similar long-form material, and TanStack Start expects shareable sections to have their own route for SSR/SEO.

## New Navigation Entry

Add an "Herbal Path" item to `src/components/platform/data.ts` under `navItems` (placed before "Library" so it sits among the practice tools). The existing `AppShell` then renders it automatically in both desktop and mobile nav.

## New Route: `src/routes/alchemists-path.tsx`

Single self-contained page with proper `head()` metadata (title, description, og tags). Inherits all global theme tokens (colors, radii, shadows, fonts) and layers a parchment/grimoire aesthetic on top.

### Page Structure (top → bottom)

1. **Hero Header** — Title "🌿 THE ALCHEMIST'S PATH", subtitle "A Game of Herbal Mastery", the "First, do no harm…" quote in serif italics, and a "Begin Your Journey" button that smooth-scrolls to Level 1 (anchor `#level-1`).

2. **Character Sheet Card** — Profile-card layout with: Class, Level, XP bar (using the existing shadcn `Progress` component), Core Stats (Observation, Intuition, Patience, Precision shown as labeled bars), and Inventory list with small icons.

3. **Progression Roadmap** — Horizontal 5-step path (Novice → Apprentice → Journeyman → Adept → Grand Alchemist) connected by a dotted/glowing line. Each milestone is a clickable badge that smooth-scrolls to the matching level accordion. Wraps to vertical stack on mobile.

4. **Expandable Levels 1–5** — Built on shadcn `Accordion` (type="single", collapsible, so only one opens at a time). Each level contains:
   - Flavor quote in serif italics
   - **Quests & Skills** as a checklist (each item is a checkbox; state persists in `localStorage` under `alchemists-path-progress`)
   - **Herbs/Recipes** in a responsive grid of parchment cards (Name, *Latin name* italic, Benefits, Vitamins/Minerals)
   - "Mark Level Complete" toggle button (also persisted)

   Content preserved verbatim from the brief:
   - L1: Nettle, Chamomile, Peppermint, Calendula, Dandelion + safety rules + identification quest
   - L2: Nourishment Infusion, Sleepy Blend, Digestive Decoction, Calendula Steam + electrolyte challenge
   - L3: Tinctures/oils/salves/syrups Folk Method + first-aid kit recipes
   - L4: Energetics, four humors, dual extraction, vitamin-herb synergy + 7-day wellness challenge
   - L5: Spagyric process, fermentation, plant spirit connection + Philosopher's Stone final quest

5. **Achievement Badges Grid** — Responsive grid of 6 unlockable badges (Wild Forager, Apothecary, Vitalist, Plant Whisperer, Grand Alchemist, plus a 6th milestone like "First Harvest"), each a circular icon (lucide: Leaf, FlaskConical, Sparkles, etc.) on a parchment disc with a label. Locked badges render desaturated until the corresponding level is marked complete.

6. **Closing Quote** — Centered serif block: "May your teas be strong, your tinctures potent, and your heart ever-green."

### Interactive Behavior

- Smooth scroll between roadmap → level sections (CSS `scroll-behavior: smooth` is already enabled globally).
- Accordion handles single-open behavior.
- All checkbox + completion state stored in a single `localStorage` JSON object, hydrated in `useEffect` (SSR-safe).
- Sections fade-in on viewport entry via an `IntersectionObserver` hook applying `animate-fade-in` (already defined in the project's animation utilities).

## Grimoire Aesthetic (CSS additions)

Add scoped utility classes to `src/styles.css` (no theme variable changes — preserves global look):

- `.parchment-card` — layered radial-gradient background mixing `--card` with warm amber/brown tones using `color-mix`, subtle SVG noise for texture, gold-tinted border (`color-mix(--primary 60%, var(--coral-glow))`), and inner shadow for an aged-paper feel.
- `.grimoire-heading` — applies `font-family: "Cormorant Garamond", "EB Garamond", Georgia, serif` and a soft text-shadow. Loaded via Google Fonts `<link>` added to the root route's `head().links`.
- `.gold-accent` — utility for `color: color-mix(in oklab, var(--primary) 70%, var(--coral-glow))`.
- `.path-step` and `.path-line` — for the roadmap connector styling.

Body text continues to use the site's Inter font; only headings and quotes use the serif.

## Technical Notes

- Route file uses `createFileRoute("/alchemists-path")` with `head()` meta.
- Reuses existing shadcn primitives: `Accordion`, `Checkbox`, `Progress`, `Card`, `Button`, `Badge`.
- All colors via design tokens (`--primary`, `--card`, `--coral-glow`, `--leaf-glow`, `--sun-glow`) — no hardcoded hex values.
- `localStorage` access guarded with `typeof window !== "undefined"` for SSR safety.
- No backend, no new dependencies.

## Files Touched

- **New:** `src/routes/alchemists-path.tsx`
- **Edit:** `src/components/platform/data.ts` (add nav item)
- **Edit:** `src/styles.css` (append parchment/grimoire utility classes)
- **Edit:** `src/routes/__root.tsx` (add Google Fonts serif `<link>` to `head().links`)
