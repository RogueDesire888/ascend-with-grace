## Goal

Transform the single `/tai-chi-lab` page into a full Tai Chi (Taijiquan) encyclopedia with the same depth, structure, and interactive feel as the Breathwork and Yoga sections.

## Navigation

Promote **Tai Chi** to a top-level dropdown in the header (next to Yoga, Breathwork, Alchemy). Remove "Tai Chi Lab" from the Movement dropdown. Redirect `/tai-chi-lab` → `/tai-chi/start-here` so old links and the Skill Trees CTA keep working.

9 sub-pages:

1. **Start Here** — orientation, what Tai Chi is, how to use the encyclopedia, first 7-day path
2. **History & Lineage** — Chen Wangting origin, Yang/Wu/Wu(Hao)/Sun family lineages, modern globalization, key masters
3. **Form Library** — searchable database of forms & postures (Chen 18, Yang 24, Yang 108, Chen Laojia, Sun 73, Wudang, plus individual postures like Grasp Sparrow's Tail, Single Whip, Cloud Hands, etc.) with detail pages
4. **Tai Chi by Goal** — protocols for balance/falls prevention, knee OA, blood pressure, anxiety, cognition, fibromyalgia, Parkinson's, sleep, martial skill
5. **The Path to Mastery** — 5-class belt system (Beginner → Master), 100-day form challenge, push-hands progression
6. **Principles & Classics** — yin/yang, qi, jin types (peng/lu/ji/an/cai/lie/zhou/kao), 13 postures, 10 Essentials of Yang Chengfu, Tai Chi Classics excerpts
7. **Health Science** — curated research library (balance, BP, cognition, immune, mental health) with study summaries
8. **Community & Teachers** — lineages, finding a teacher, etiquette, events (Chen Village, World Tai Chi Day), online vs in-person guidance
9. **Tools & Practice Builder** — interactive form timer with breath pacer integration, posture sequencer, daily practice journal, silk-reeling drill builder

## Technical Implementation

**Data layer (`src/lib/tai-chi-data.ts`)** — centralized database:
- 30+ postures with Chinese name, pinyin, English, family style, alignment cues, applications, common errors, breath pattern
- 8+ canonical forms (style, length, lineage, history)
- 5 family styles with founder, characteristics, signature forms
- 13 postures (8 energies + 5 directions) with martial/energetic notes
- Yang Chengfu's 10 Essentials, Tai Chi Classics excerpts
- 20+ research studies (condition, design, outcome, citation)
- Goal protocols (8–10 goals with sequencing, frequency, dosage, evidence)
- 5-tier mastery curriculum

**State (`src/lib/tai-chi-progress.ts`)** — `localStorage` hook tracking: postures learned, forms in progress, completed goals, 100-day challenge day, push-hands tier, practice journal entries.

**Layout (`src/routes/tai-chi.tsx`)** — wrapper with belt/tier display, global Tai Chi search (Cmd+K) indexing postures, forms, principles, and research.

**Routes** under `src/routes/tai-chi.*`:
- `tai-chi.start-here.tsx`, `tai-chi.history.tsx`, `tai-chi.forms.tsx`, `tai-chi.forms.$slug.tsx`, `tai-chi.postures.$slug.tsx`, `tai-chi.goals.tsx`, `tai-chi.goals.$goalId.tsx`, `tai-chi.mastery.tsx`, `tai-chi.principles.tsx`, `tai-chi.science.tsx`, `tai-chi.community.tsx`, `tai-chi.tools.tsx`

**Interactive components**:
- `FormTimer` — sequenced posture timer with breath pacer hookup
- `PostureCard` — detail card with applications + common errors
- `SilkReelingBuilder` — drill builder for circular qi cultivation
- `PracticeJournal` — daily logging + streak tracking

**Nav integration** (`src/components/platform/data.ts` + `AppShell.tsx`):
- Add `taiChiItems` array (9 entries)
- Add Tai Chi dropdown to header
- Remove `movementItems` Tai Chi entry (movement dropdown becomes empty — also remove the empty dropdown)
- Old `/tai-chi-lab` route → redirect to `/tai-chi/start-here`

**Visual identity**: keep cosmic dark theme; add accent tokens `--taichi-jade`, `--taichi-vermilion`, and a subtle yin/yang motif consistent with the air/water palette already used by Breathwork.

## Out of Scope

- No backend/database changes (all data is static + `localStorage`)
- No video content (text + diagrams only)
- No payments or auth changes
