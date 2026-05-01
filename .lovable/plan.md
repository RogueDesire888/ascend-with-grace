## Goal

Add a comprehensive Breathwork section: replace the "Library" top-level nav with a "Breathwork" dropdown containing 9 sub-pages, plus dynamic technique pages, a research database, a forum, a session builder, and a global breath pacer — all styled with the existing cosmic dark theme + air/water accents.

> Build sequence (per the brief): nav + Start Here first, then each section in order. If the response runs out of room I'll stop and report exactly which pages shipped.

## Navigation changes

### `src/components/platform/data.ts`
- Remove `{ to: "/library", label: "Library" }` from `navItems`.
- Add new export `breathworkItems`:
  ```ts
  export const breathworkItems = [
    { to: "/breathwork/start-here", label: "Start Here" },
    { to: "/breathwork/science", label: "Science of Breath" },
    { to: "/breathwork/techniques", label: "Library of Techniques" },
    { to: "/breathwork/goals", label: "Breathwork by Goal" },
    { to: "/breathwork/mastery", label: "The Path to Mastery" },
    { to: "/breathwork/community", label: "Community & Guidance" },
    { to: "/breathwork/resources", label: "Resource Hub" },
    { to: "/breathwork/tools", label: "Tools & Tech" },
    { to: "/breathwork/about", label: "About & Contribute" },
  ];
  ```

### `src/components/platform/AppShell.tsx`
- Render a third `NavDropdown label="Breathwork"` after Alchemy in both desktop and mobile nav (uses the existing reusable `NavDropdown` so dropdown layering and styling are inherited).
- Re-slice `leadingNavItems` / `trailingNavItems` for the shorter `navItems` (Library is removed; Community moves to trailing).

> The `/library` route file stays untouched — direct URLs still resolve, just no longer in the header (consistent with how the site is wired).

## Shared infrastructure

### `src/lib/breathwork-data.ts` — single source of truth
- `Technique` type + array of 15 techniques (Diaphragmatic, 4-7-8, Box, Kapalabhati, Bhastrika, Bhramari, Alternate Nostril, Holotropic, Conscious Connected, Rebirthing, Wim Hof, Oxygen Advantage, Coherent, Cyclic Sighing, CO₂ Tolerance Breath Holds). Each entry: `slug`, name, level, goals[], tradition, durationMinutes, summary, steps[], mechanism, pacer preset (inhale/holdIn/exhale/holdOut/cycles), research snippet, contraindications[], related slugs[].
- `goals`: id, label, blurb, recommended technique slugs.
- `traditions`: id, label, summary.
- `studies`: 12 research entries (title, authors, journal, year, findings, doi, technique slugs).
- `glossary`: ~30 A–Z terms with definitions and cross-references.
- `books`: 8 entries (title, author, summary, link).
- `practitioners`: 12 placeholder facilitators (name, location, certifications, bio, contact).
- `events`: 8 upcoming workshops.
- `faq`: ~10 Q&A entries.
- `phases` + `belts` for the mastery roadmap.
- `challenges`: `7-day-reset` and `21-day-mastery` with daily cards.

### `src/lib/breathwork-progress.ts`
- localStorage hook (mirrors `smoothie-progress.ts` pattern with `useSyncExternalStore`).
- Tracks: completed phases, completed challenge days, current belt, completed mastery techniques, saved custom sessions, journal entries, simulated forum posts, simulated guest profile (display name + signups).
- Belt is derived from completed-phase count + technique count.

### `src/components/breathwork/BreathPacer.tsx`
- Reusable visual breath pacer: animated SVG/CSS circle that scales to inhale → hold → exhale → hold counts.
- Props: `inhale`, `holdIn`, `exhale`, `holdOut`, `cycles?`, optional `audio` (Web Audio API tone via short oscillator on phase change), Play/Pause/Reset controls, current-phase label, cycle counter.
- Used inline on Start Here, every technique detail page, the goals pages, and on /breathwork/tools.

### `src/components/breathwork/BreathLayout.tsx`
- Hub layout used by all `/breathwork/*` pages: page heading slot, sticky in-page sub-section nav (anchor links generated from `<section id>` props), shared breadcrumb, and the global Breathwork search trigger.

### `src/components/breathwork/BreathSearch.tsx`
- Global front-end fuzzy search, opened from a header button on every breathwork page (`Cmd+K` shortcut).
- Indexes techniques + studies + glossary + books + goals + FAQ from `breathwork-data.ts`. Lightweight scoring (tokenized substring + prefix boost — no extra dependency).
- Results render in a `Dialog` with grouped sections and `<Link>`s.

### Styling — `src/styles.css`
- Add small additions reusing existing tokens (no new colors):
  - `.breath-card` — variant of `.quest-panel-air` with slightly stronger water hue.
  - `.breath-pulse` — keyframe used by the pacer (scale + opacity).
  - `.breath-mist` — soft radial backdrop for hero panels.

## Routes (TanStack file-based, flat dot-naming)

All under `src/routes/`:

1. `breathwork.tsx` — layout route: defines `head()`, renders `<Outlet />` inside `BreathLayout` with the dropdown sub-nav. Visiting `/breathwork` redirects (via component) to `/breathwork/start-here`.
2. `breathwork.start-here.tsx` — sections: What is Breathwork?, Why Breathe?, Your First Breath (5-min 5-5-5 pacer embedded), Fundamentals (diaphragmatic, nasal vs mouth, posture, trauma-sensitive note), Is Breathwork Safe? (contraindications). Anchor-linked sub-nav.
3. `breathwork.science.tsx` — sections: Anatomy & Gas Exchange (annotated SVG diaphragm/lungs diagram), Breath & Nervous System (sympathetic/parasympathetic visual), Biochemistry, Research Library (filterable/sortable table with chip filters by technique + year + free-text search; pulls from `studies`).
4. `breathwork.techniques.tsx` — main library: filter bar (Level, Goal, Tradition, Duration sliders), grid of cards each linking to the detail route. Includes the **Interactive Technique Comparator** at the top: select 2–3 techniques and see overlaid pacer ratios + a small bar chart of breath rate / engagement.
5. `breathwork.techniques.$slug.tsx` — dynamic technique detail. Looks up by slug from `breathwork-data.ts`. Renders name + category badges, animated step-by-step list, embedded `BreathPacer` preset, mechanism, research snippet, contraindications, related techniques links. `notFoundComponent` for unknown slugs.
6. `breathwork.techniques.traditions.tsx` — overview cards for Pranayama, Tibetan Buddhism, Qigong, modern therapeutic systems with crosslinks to relevant techniques.
7. `breathwork.goals.tsx` — hub grid of 6 goals.
8. `breathwork.goals.$goalId.tsx` — dynamic page per goal: blurb + curated technique cards (links) + embedded recommended pacer.
9. `breathwork.mastery.tsx` — visual 4-phase roadmap (clickable, marks complete via progress hook), belt display (current belt + next belt requirements), expandable challenges (7-Day Reset, 21-Day Mastery) showing daily cards and a simulated signup form.
10. `breathwork.community.tsx` — three tabs/sections: Practitioner Directory (filterable list), Forum/Circle (categories: Experiences, Technique Q&A, Science; new-post form + list rendered from local store), Workshops & Events (calendar list + "Submit event" form UI).
11. `breathwork.resources.tsx` — Bookshelf grid, Glossary (A–Z with anchor index, cross-links to techniques/glossary terms), FAQ (Accordion), For Practitioners (downloadable script placeholders rendered as buttons that toast "downloaded" — no real PDFs).
12. `breathwork.tools.tsx` — Customizable `BreathPacer` (set inhale/hold/exhale/hold + optional audio cues), App & Wearable guide (cards with placeholder reviews + affiliate-link placeholders), **Session Builder** (add/reorder phase blocks via simple up/down buttons — no extra dnd dep — preview with the pacer, save to local list, journal entries pre/post).
13. `breathwork.about.tsx` — Mission & Team, Editorial Policy, Contribute form (success message on submit — no backend).

## Global features

- **Site search**: `BreathSearch` button rendered in `BreathLayout` header (and `Cmd+K`). Indexes everything in `breathwork-data.ts`; 0 dependencies.
- **Interlinking**: All technique mentions across goals/science/mastery/glossary use `<Link to="/breathwork/techniques/$slug" params={{ slug }}>`.
- **Progress tracking**: Phase completions, challenge day check-offs, saved sessions, and current belt persist via the new progress hook. Belt + level display shown in the BreathLayout header on every breathwork page.
- **Guest profile**: Simple "Set display name" prompt stored locally so forum posts and challenge signups can attribute a name. No real auth.
- **Responsive**: Layouts use the existing tailwind grid patterns already proven on Smoothie Codex / Alchemist's Path; sticky sub-nav collapses to a horizontal scroller on mobile.
- **SEO**: Each route sets unique `head()` with `title`, `description`, `og:title`, `og:description`. Dynamic technique pages derive metadata from the slug.

## Out of scope

- Real authentication, real email signups, real PDF generation, real backend persistence — all simulated client-side per the brief.
- New npm dependencies (no fuse.js, no dnd-kit, no chart libs — implemented small or with SVG/CSS).
- Editing other parts of the site beyond `data.ts` and `AppShell.tsx`.

## Verification

After build I'll confirm:
- Header replaces Library with Breathwork ▾ containing all 9 sub-items.
- Every breathwork route renders, has a unique `<title>`, and links between sections work.
- The shared breath pacer animates and respects custom inputs on `/breathwork/tools`.
- Filters work on the techniques library and research library.
- Local storage persists phase/challenge/session state across reload.
- Global Cmd+K search returns results from techniques, studies, glossary, books, goals, FAQ.
