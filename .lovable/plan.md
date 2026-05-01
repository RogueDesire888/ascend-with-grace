## Goal

Bring Tai Chi up to the elite, encyclopedic depth of the Breathwork and Yoga sections. The data layer is already strong (28 postures, 8 forms, 5 styles, 13 postures, 10 Essentials, 20+ studies, classics). The gap is the **route pages**: they currently render data lists with little long-form narrative, no quest-panel storytelling, weak interactive components, and no signature features matching breathwork's mastery / tools / techniques pages or yoga's anatomy / philosophy depth.

## What's missing today

| Page | Current | Breathwork/Yoga equivalent |
|------|--------|---------------------------|
| start-here | 73 lines, 7-day list | breathwork 160 lines: hero, "what it is/isn't", physiology primer, 3 first practices, code of practice |
| history | 75 lines, plain timeline | yoga philosophy 87 lines + richer prose; needs essay-style sections |
| forms | filter + grid, no narrative | yoga asanas page has anatomical context, family overviews, hero |
| postures/$slug | basic sections | yoga asana detail has variations, contraindications, dosage |
| principles | 71 lines lists | breathwork science 146 lines with quest-panels, stats, prose |
| science | 63 lines flat list | breathwork science: anatomy primer + ANS + biochemistry + DOI library |
| mastery | 110 lines, basic tiers | breathwork mastery 205 lines: belt curriculum, exams, daily ritual |
| tools | 183 lines, posture timer + journal | breathwork tools 275 lines: pacer, CO₂ table, breath-hold log, soundscape |
| community | 88 lines | breathwork community 182 lines: sangha, ethics, teacher vetting checklist |
| resources | 71 lines, 6 books | yoga/breathwork resources have podcasts, films, journals, glossary |

## Plan

### 1. Expand the data layer (`src/lib/tai-chi-data.ts`)

Add the missing source material so pages have real depth to render:

- **Glossary** (~40 terms): qi, jin, ting jin, dantian, peng, song, zhong ding, fa jin, chan si jin, zhan zhuang, etc., with pinyin, characters, definition, related concepts.
- **Push-hands curriculum** (10 drills): single-hand fixed, double-hand fixed, da lu, moving step, free-style, with goals, errors, partner protocol.
- **Silk-reeling drills** (12 drills): single-arm horizontal, vertical, figure-8, dual-arm, with breath pattern and dantian rotation notes.
- **Zhan Zhuang postures** (8 standing-meditation postures): Wu Ji, Holding the Ball, Three Circles, Universal Post, with dosage, intent, common collapses.
- **Anatomy & biomechanics dataset**: kua (hip-fold), spine spirals, foot tripod, knee-tracks-toe, peng structure — paired with research citations.
- **Daoist & medical theory**: yin/yang, five elements with organ pairings, three treasures (jing/qi/shen), microcosmic orbit, dantian map.
- **20 more research studies** (cardiovascular, immune, telomere, falls-prevention meta-analyses, Parkinson's NEJM, FaME, Tai Chi Quan Moving for Better Balance).
- **Daily practice protocols**: Morning 20 min, Lunch reset 7 min, Evening 30 min, Weekend long-form 60 min — with sequenced postures.
- **Ethics & lineage tradition**: bowing, baishi (discipleship), four respects, indoor disciple vs general student.
- **Films, podcasts, journals, documentaries** for resources page.
- **Forms expansion**: add Wu (Hao) 36, Sun 73 competition, Chen Xinjia, Yang 40 competition forms — each with detailed history, signature movements, why-practice notes, recommended teachers.

### 2. Rewrite route pages with breathwork-grade depth

For each page, follow the breathwork pattern: **hero → essay sections in `quest-panel` cards → stats → interactive widget → curated data → cross-links**.

- **start-here.tsx** (~180 lines): hero + "What Tai Chi is / is not" + physiology primer (vagal tone, balance, eccentric loading) + 3 first practices with embedded breath pacer + 7-day path (already there) + ethics blurb.
- **history.tsx** (~200 lines): essay on Chen Wangting + Daoist roots + Wudang myth vs. evidence + family-tree SVG diagram + each style as a deeper article + masters as expandable cards with quotes + globalization timeline.
- **forms.tsx** (~180 lines): keep filters; add hero, "How a form is built" explainer, "Choosing your first form" decision tree, family overview cards, then the grid.
- **forms.$slug.tsx**: add posture sequence walkthrough, history of the specific form, recommended teachers, related forms.
- **postures.$slug.tsx** (~180 lines): add martial application detail, energetic intent (jin used), partner drill suggestion, variations across styles, contraindications, dosage, in-form context.
- **principles.tsx** (~220 lines): keep 13 postures + 10 Essentials + Classics; add yin/yang primer panel, three treasures, dantian map, "song" deep dive, "zhong ding" explainer, glossary section.
- **science.tsx** (~220 lines): mirror breathwork — anatomy primer (kua, fascia, vestibular system), ANS panel (vagal tone, HRV evidence), biomechanics (eccentric quad load), then the searchable, sortable, DOI-linked research library with category filter chips and tag pills.
- **mastery.tsx** (~220 lines): expand 5 belts with curriculum + assessment criteria + recommended dosage; full 100-day challenge tracker; push-hands ladder with the 10 new drills; "daily ritual" section.
- **tools.tsx** (~280 lines): keep posture timer + journal; **add** silk-reeling drill builder (sequence picker), zhan-zhuang stand-up timer with breath pacer integration (reuse `BreathPacer`), form metronome (60-bpm sequence), partner-drill randomiser.
- **community.tsx** (~200 lines): add etiquette/baishi section, teacher-vetting checklist, online vs in-person comparison, code of practice, expanded events.
- **resources.tsx** (~180 lines): add documentaries (Pushing Hands, Tai Chi Master), podcasts, academic journals, glossary link, "shelf by tier" (one book per belt).
- **goals.$goalId.tsx**: add weekly schedule grid, contraindications, "graduate to" next-goal pointer.
- **anatomy.tsx** (NEW route): kua, spine spirals, fascia/peng structure, foot tripod, knee mechanics — mirrors yoga's anatomy page.

### 3. Visual & interactive parity

- Use `quest-panel-air` / equivalent panel styling that breathwork/yoga use so the visual weight matches.
- Add `Stat` cards (like breathwork science) on Tai Chi science / start-here.
- Introduce a small inline yin-yang SVG and family-tree SVG for principles/history.
- Wire `BreathPacer` from `src/components/breathwork/BreathPacer.tsx` into Tai Chi tools (zhan zhuang, form metronome).

### 4. Navigation update

Add `/tai-chi/anatomy` to `taiChiItems` in `src/components/platform/data.ts`.

## Out of scope

- No backend, no auth, no payments. All data static + `localStorage`.
- No video. No new external dependencies.
- No changes to breathwork/yoga sections.

## Files

**Edit:**
- `src/lib/tai-chi-data.ts` (large expansion: glossary, push-hands, silk-reeling, zhan zhuang, anatomy data, daoist theory, +20 studies, daily protocols, ethics, films/podcasts, more forms)
- `src/components/platform/data.ts` (add anatomy nav item)
- `src/routes/tai-chi.start-here.tsx`
- `src/routes/tai-chi.history.tsx`
- `src/routes/tai-chi.forms.tsx`
- `src/routes/tai-chi.forms.$slug.tsx`
- `src/routes/tai-chi.postures.$slug.tsx`
- `src/routes/tai-chi.principles.tsx`
- `src/routes/tai-chi.science.tsx`
- `src/routes/tai-chi.mastery.tsx`
- `src/routes/tai-chi.tools.tsx`
- `src/routes/tai-chi.community.tsx`
- `src/routes/tai-chi.resources.tsx`
- `src/routes/tai-chi.goals.$goalId.tsx`

**Create:**
- `src/routes/tai-chi.anatomy.tsx`
