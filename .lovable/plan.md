## Goal
Transform "Yoga Therapy Lab" (single page, 733 lines) into a comprehensive Yoga encyclopedia matching the depth of the Breathwork section (13 routes, 1,295-line data library, progress tracking, interactive tools).

## Navigation Update
Replace the single "Yoga Therapy Lab" link in the Movement dropdown with a new top-level **Yoga** dropdown (parallel to Breathwork) containing 9 sub-pages. The existing `/yoga-therapy-lab` route becomes a redirect to `/yoga/start-here`.

```text
Yoga ▾
 ├─ Start Here
 ├─ Philosophy & History
 ├─ Asana Library
 ├─ Yoga by Goal
 ├─ The Path to Mastery
 ├─ Anatomy & Therapy
 ├─ Pranayama & Meditation
 ├─ Community & Teachers
 ├─ Resource Hub
 └─ Tools & Practice Builder
```

## New Files

**Data & state**
- `src/lib/yoga-data.ts` — Static encyclopedia: 40+ asanas (Sanskrit name, English, drishti, bandhas, alignment cues, contraindications, modifications, prep poses, counter poses, level, family), 8 traditions (Hatha, Ashtanga, Iyengar, Vinyasa, Kundalini, Yin, Restorative, Bikram), 8 limbs of Patanjali, 7 chakras with bija mantras, 20+ research studies, 30+ glossary terms, mastery curriculum (Beginner → Master with 5 belt tiers), goal hubs (back pain, anxiety, sleep, flexibility, strength, focus, hormonal balance), reading list, teacher directory.
- `src/lib/yoga-progress.ts` — `localStorage` hook (mirror of breathwork-progress): tracked asanas, completed sequences, daily streak, belt progression, journal entries, saved sequences.

**Interactive components**
- `src/components/yoga/AsanaCard.tsx` — Pose card with Sanskrit/English, level badge, tradition tags.
- `src/components/yoga/SequenceBuilder.tsx` — Drag-to-order custom flow builder with auto-calculated duration and intensity.
- `src/components/yoga/AsanaTimer.tsx` — Hold timer with breath-count overlay using the existing BreathPacer.

**Routes** (`src/routes/yoga.*`)
- `yoga.tsx` — Layout wrapper with global Cmd+K search and belt display (mirrors `breathwork.tsx`).
- `yoga.start-here.tsx` — Onboarding gateway, what is yoga, choosing a path quiz.
- `yoga.philosophy.tsx` — 8 limbs, yamas/niyamas, key texts (Sutras, Gita, Hatha Yoga Pradipika), schools comparison.
- `yoga.asanas.tsx` — Filterable library (level, family, tradition, goal). Compare poses side-by-side.
- `yoga.asanas.$slug.tsx` — Detail page per pose: alignment, cues, contraindications, prep/counter poses, video placeholder, related research.
- `yoga.goals.tsx` + `yoga.goals.$goalId.tsx` — Curated hubs for outcomes.
- `yoga.mastery.tsx` — 5-tier belt path with challenges (30-day flexibility, 21-day inversion, etc.).
- `yoga.anatomy.tsx` — Interactive anatomy: muscle groups engaged per pose, common injuries, therapy applications.
- `yoga.pranayama.tsx` — Cross-link to breathwork plus yoga-specific pranayama (ujjayi, nadi shodhana, kapalabhati) with embedded BreathPacer.
- `yoga.community.tsx` — Teacher directory, lineages, retreat finder, simulated forum.
- `yoga.resources.tsx` — Books, podcasts, studios, certifications (200hr/500hr YTT explained), research database.
- `yoga.tools.tsx` — Sequence builder, pose timer, journal, sun salutation counter.

## Visual Identity
Match existing cosmic dark theme. Add yoga-specific accent tokens to `src/styles.css`:
- `--yoga-saffron`, `--yoga-lotus`, `--yoga-earth` (warm earth + saffron palette layered over cosmic dark)
- `.yoga-card`, `.yoga-mandala` (radial backdrop for hero sections), `.asana-glow` (hover state for pose cards)

## Migration of existing content
The current `yoga-therapy-lab.tsx` (733 lines) contains real content — therapy protocols, anatomy notes, etc. Distribute it across the new routes:
- Therapy protocols → `yoga.anatomy.tsx`
- Any pose content → seed `yoga-data.ts`
- Lab/experimental content → `yoga.tools.tsx`
- Replace old route file with a redirect to `/yoga/start-here`.

## Build sequence
1. Create `yoga-data.ts` and `yoga-progress.ts` (foundation).
2. Update `data.ts` and `AppShell.tsx` nav (add Yoga dropdown, remove from Movement).
3. Build `yoga.tsx` layout + `start-here`, `asanas`, `asanas.$slug` (core).
4. Build philosophy, goals, mastery, anatomy (depth).
5. Build pranayama, community, resources, tools (breadth).
6. Migrate yoga-therapy-lab content and convert old route to a redirect.

## Notes
- All content is hand-written, encyclopedic, and Sanskrit-accurate. No lorem ipsum.
- Movement dropdown keeps Tai Chi only (Yoga graduates to top-level like Alchemy/Breathwork did).
- Total estimated additions: ~3,500 lines across 15 files. May require continuation in a follow-up turn if limits hit.