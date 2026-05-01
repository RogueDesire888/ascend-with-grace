## Bring the Herbal Path up to Breathwork-level depth

The Breathwork section is a 9-page interactive **encyclopedia** with its own data layer (1,295 lines), Cmd+K search, belt-based progression, and dedicated subroutes (Start Here, Science, Techniques + per-technique pages, Goals + per-goal pages, Mastery, Community, Resources, Tools, About). The Herbal Path is currently a **single 780-line gamified roadmap** — narratively rich but flat, with no monograph library, no science section, no pharmacology depth, no community/teachers, no resource hub, no search, and no per-herb pages.

This plan rebuilds Herbal Path into a parallel encyclopedia: the existing 5-level "game" becomes the *Mastery Path* page inside a much larger structure.

### New architecture

Convert `/alchemists-path` into a layout route with a sub-nav (matching `/breathwork`):

```text
/alchemists-path                  -> layout (header, sub-nav, search, rank chip)
  /start-here                     -> orientation, herbalist's code, safety, how to use the codex
  /materia-medica                 -> the 60+ herb library (filterable by system, energetics, action)
  /materia-medica/$slug           -> deep monograph per herb
  /science                        -> phytochemistry, pharmacology, clinical evidence
  /goals                          -> herbs by goal (sleep, immunity, digestion, hormones, mood, skin, joints, energy)
  /goals/$goalId                  -> protocols + recommended herbs + recipes per goal
  /mastery                        -> the existing 5-level Alchemist's Path (Novice → Grand Alchemist) ← preserved
  /traditions                     -> Western, TCM, Ayurveda, Eclectic, Wise Woman, Spagyric — comparative depth
  /preparations                   -> tea/infusion/decoction/tincture/glycerite/oxymel/oil/salve/syrup/spagyric — full method pages
  /safety                         -> contraindications, herb-drug interactions, pregnancy, sustainability/at-risk plants
  /community                      -> teachers, schools, herbalists to know, guilds
  /resources                      -> books, journals, podcasts, suppliers, wildcrafting ethics
  /tools                          -> dose calculator, tincture ratio (folk + weight-based), formula builder, harvest moon calendar
```

### New data layer: `src/lib/herbal-data.ts`

Single source of truth, mirroring `breathwork-data.ts` shape:

- **`herbs: Herb[]`** — 60+ monographs: latin name, common names, family, parts used, energetics (hot/cold, dry/damp, tense/lax), taste, actions (e.g. nervine, adaptogen, alterative, hepatic, demulcent…), affinities (organ systems), key constituents (with role: e.g. apigenin → GABAA modulator), traditional uses (Western/TCM/Ayurvedic), evidence-based uses with citations, preparations + dose ranges, contraindications, herb-drug interactions, sustainability status (UpS at-risk list), harvest season, related herbs.
- **`actions: HerbalAction[]`** — ~30 entries (adaptogen, alterative, anodyne, anxiolytic, bitter, carminative, cholagogue, demulcent, diaphoretic, emmenagogue, expectorant, hepatic, hypotensive, immunomodulator, nervine, nootropic, vulnerary…) with definitions and exemplar herbs.
- **`constituents: Constituent[]`** — phytochemical classes (alkaloids, flavonoids, iridoids, mucilage, OPCs, saponins, terpenes, salicylates, glycosides…) with mechanism notes.
- **`preparations: Preparation[]`** — 12 prep methods with menstruum, ratio, time, yield, shelf life, when to choose.
- **`traditions: Tradition[]`** — Western Vitalism, Wise Woman, Eclectic/Physiomedicalist, TCM, Ayurveda, Unani, Spagyric/Hermetic — with diagnostic frame, signature herbs, and key teachers.
- **`goals: HerbalGoal[]`** — 10 goal categories (sleep, anxiety, immunity, digestion, women's hormones, men's vitality, skin, joints, cardiovascular, cognition) with herb shortlist + sample protocol + recipe.
- **`studies: Study[]`** — 30+ peer-reviewed citations (chamomile/GAD, ashwagandha/cortisol, valerian/sleep latency, turmeric/CRP, hawthorn/CHF, St John's Wort/depression equivalence, etc.) with year, journal, dosing.
- **`teachers: Teacher[]`** — Susun Weed, Rosemary Gladstar, Matthew Wood, Stephen Buhner, Paul Bergner, jim mcdonald, Aviva Romm, Kerry Bone, Michael Tierra, kg Stiles, etc.
- **`schools: School[]`** — Sage Mountain, Herbal Academy, ChestnutHerbs, CSCH, Bastyr, etc.
- **`books: Book[]`** — 25+ canonical texts (Materia Medica by Wood, Medical Herbalism by Hoffmann, PDR for Herbal Medicines, Healing Wise, Adaptogens by Winston…).
- **`interactions: Interaction[]`** — major herb-drug interactions (SJW/SSRIs, garlic/anticoagulants, kava/CYP450, ginkgo/warfarin, licorice/diuretics…).
- **`atRisk: AtRiskPlant[]`** — UpS at-risk and to-watch list with sustainable alternatives.
- **`searchAll(query)`** — unified search returning hits across herbs, actions, constituents, goals, preparations, traditions.
- **`getHerb(slug)`, `getGoal(id)`** — typed lookups.

### New progress layer: `src/lib/herbal-progress.ts`

Reuse the breathwork progress pattern. Ranks (chip in header, like the breathwork "belt"):

- Seedling → Gardener → Apprentice → Apothecary → Vitalist → Grand Alchemist
- Tracks: monographs studied, preparations crafted, mastery quests completed (links to existing tree-progress store so the gamified roadmap state is preserved).

### Page-by-page treatment (Breathwork-equivalent depth)

Each page follows the established pattern: hero, narrative essay sections, parchment-style cards, stat sidebars, cross-links.

- **Start Here** — Herbalist's code, how to use the codex, three on-ramps (calm, immunity, daily tonic), safety primer, glossary preview.
- **Materia Medica index** — searchable/filterable grid of 60+ herbs with chips for energetics + actions + tradition.
- **Materia Medica per-herb** — full monograph: botany, parts used, energetics wheel, constituents → mechanism, traditional vs modern uses, dose ranges per preparation, contraindications, interactions, sustainability flag, recipes featuring it, related herbs, citations.
- **Science** — phytochemistry essay (alkaloids → flavonoids → terpenes), pharmacology (CYP450, P-glycoprotein, bioavailability), evidence hierarchy, 30+ study cards, "what the data actually shows" critical-appraisal section.
- **Goals index + per-goal** — symptom-driven entry; each goal page lists 5–7 candidate herbs with rationale, a 4-week protocol, daily ritual, and a featured recipe.
- **Mastery** — the existing 5-level Alchemist's Path, lifted intact (XP, character sheet, badges, quests, level accordion). This preserves all current functionality and progress data.
- **Traditions** — comparative essay across Western/Wise Woman/Eclectic/TCM/Ayurveda/Spagyric with side-by-side diagnostic frames and signature herbs.
- **Preparations** — long-form method pages for each prep (folk vs weight-based tinctures, dual extraction, percolation, oxymel, glycerite, spagyric calcination steps), with ratios, ingredient tables, and shelf-life.
- **Safety** — contraindications matrix, herb-drug interaction table, pregnancy/lactation guide, pediatric dosing (Clark/Young rules), at-risk plants & ethical sourcing.
- **Community** — 10+ teacher cards, schools, guilds (AHG, NIMH), online circles.
- **Resources** — 25+ books, journals, podcasts, suppliers (Mountain Rose, Pacific Botanicals, Strictly Medicinal seeds), foraging field guides.
- **Tools** — Dose calculator (Clark/Young + adult mg/kg), Tincture builder (folk + 1:2/1:5 weight-volume), Formula builder (synergists/adjuvants/correctives/vehicles), Harvest moon calendar, Energetics matcher (input symptom pattern → suggested herbs).

### Header treatment (matches Breathwork)

- Sub-nav across the 11 pages, scroll-x on mobile.
- Rank chip ("Apprentice · 12/60 monographs · 4/12 preps").
- Cmd+K search dialog wired to `searchAll()` from herbal-data.

### Navigation update

In `src/components/platform/data.ts`, update `alchemyItems` so the dropdown lists all new sub-pages (Start Here, Materia Medica, Goals, Mastery, Science, Traditions, Preparations, Safety, Community, Resources, Tools), keeping `/smoothie-codex` as a sibling entry.

### Backward compatibility

- The current `/alchemists-path` URL keeps working (becomes the layout shell that redirects/links to Start Here, same as Breathwork does).
- All existing tree-progress data (`useTreeProgress("herbal-wisdom")`) is preserved — the 5-level game just moves to `/alchemists-path/mastery`.
- `/smoothie-codex` is untouched.

### Out of scope

- No backend, no AI lookups — fully static authored content (same as Breathwork).
- No image generation in this pass; iconography reuses lucide.
- Smoothie Codex stays as-is (separate codex; not promoted to encyclopedia).

### Volume estimate

~1,400 lines of new data in `herbal-data.ts`, ~80 lines in `herbal-progress.ts`, ~12 new route files averaging 150–250 lines each. Comparable to the Breathwork buildout.