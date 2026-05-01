## Goal

Transform `/community` from a thin two-card placeholder into a true "home base" — a gamified, value-dense, sticky community hub that rivals the depth of the Breathwork / Herbal / Smoothie modules, but oriented around *people, momentum, and belonging* instead of encyclopedic content.

The aim: when a user lands here, they see (1) themselves reflected, (2) the pulse of the circle, (3) several inviting ways to interact, and (4) reasons to come back tomorrow.

---

## Page architecture

A single `/community` route, sectioned like a living dashboard. No new sub-routes (the section already lives across the `*.community.tsx` modality pages). One page, deeply built.

```text
┌─ Hero: "The Circle" — live pulse banner
│  ├─ Members online · today's check-ins · current group glow
│  └─ Daily intention prompt (1-tap submit)
├─ Your Standing — personal gamified strip
│  ├─ Rank badge · streak · weekly XP · circle contribution score
│  └─ Next-rank progress bar + 3 quick actions to earn it
├─ Group Challenges (active)
│  ├─ 2–3 challenges with progress rings, members joined, days left
│  └─ Join / Continue CTA
├─ Live Feed (tabbed)
│  ├─ Tabs: For You · Wins · Questions · Practice Logs · Field Notes
│  ├─ Rich post cards: avatar, rank chip, modality tag, body, reactions
│  └─ Reactions: glow / resonate / bow / amplify (no plain "likes")
├─ Circles (interest pods)
│  └─ 8–10 themed circles (Breathwork Daily, Herbal Apothecary, Tai Chi
│      Mornings, Yoga Recovery, Smoothie Lab, Shadow Work, Sleep Reset,
│      Family Practice, Beginners Hearth, Mastery Path)
├─ Mentors & Guides
│  └─ 4–6 senior practitioners offering office-hour windows
├─ Events This Week
│  └─ Live circles, group sits, AMA, full-moon ritual
├─ Leaderboards (gentle)
│  ├─ Most generous (replies given) · Longest streak · Quest finishers
│  └─ Framing: "celebration, not competition"
├─ Rituals of the Circle
│  └─ Weekly cadence: Mon intention · Wed practice swap · Fri gratitude
└─ Code of the Circle (always-visible footer card)
   └─ Consent, privacy, non-performative growth
```

---

## Gamification layer (the engagement engine)

Five mechanics, all surfaced visibly:

1. **Circle Rank** — 7 tiers (Ember → Spark → Flame → Beacon → Lantern → Hearth → Keeper of the Flame). Earned via *contribution*, not consumption.
2. **Streak** — daily check-in flame; soft-recovery (1 grace day/week) so it never feels punishing.
3. **Weekly XP** — earned for: posting (10), thoughtful reply (15), completing a challenge day (20), mentoring response (25).
4. **Glow Bloom** — visual flower that grows on the hero based on the *whole circle's* weekly activity. Collective, not individual.
5. **Badges** — earnable micro-achievements: "First Reply", "Seven-Day Sit", "Pollinator" (replied to 10 different members), "Lineage Bridge" (engaged across 3+ modalities).

All mechanics framed as **encouragement, not performance pressure** — copy reflects that throughout.

---

## Interaction design (the "sticky" bits)

- **One-tap daily intention** at the top (3 chip options + custom) — instant feedback, low friction, returns next day.
- **Reaction buttons that mean something**: Glow (warm acknowledgment), Resonate (this matched my experience), Bow (gratitude), Amplify (boost into For You).
- **Tabbed feed** with smooth content switching using `Tabs` from shadcn.
- **Quick post composer** inline (modality dropdown + intention chip + text), not a modal — friction kills posting.
- **"Reply with practice"** — when someone asks a question, you can attach a technique/recipe/posture from any module's data layer.
- **Hover-to-preview** rank badges show what's next.
- **Subtle motion**: glow blooms animate on load, streak flame pulses, progress rings fill on mount (`animate-fade-in`, `animate-scale-in`).

---

## Data & state

A single new file, no DB required (matches the rest of the app's local-first pattern):

- `src/lib/community-data.ts` — static seed: 25+ rich posts across tabs, 10 circles, 6 mentors, 6 events, 3 active challenges, 7 ranks, 12 badges, leaderboard rows, ritual cadence.
- `src/lib/community-progress.ts` — `useSyncExternalStore` + `localStorage`:
  - `dailyIntention` (today's chip + timestamp)
  - `streak` (count + lastCheckIn + graceUsed)
  - `weeklyXp` (rolls weekly)
  - `joinedCircles` (string[])
  - `joinedChallenges` (string[])
  - `reactions` (postId → reactionType)
  - `rank` (derived)
  - `earnedBadges` (string[])
  - `composedPosts` (local-only drafts/posts shown atop the feed)

Mirrors `breathwork-progress.ts` / `smoothie-progress.ts` exactly — same SSR-safe pattern.

---

## Files to create / edit

**Create**
- `src/lib/community-data.ts`
- `src/lib/community-progress.ts`

**Edit**
- `src/routes/community.tsx` — full rebuild as the dashboard described above. Keep the existing `head()` meta but expand with richer description.

**Possibly edit**
- `src/components/platform/data.ts` — only if we want to deprecate the thin `communityPosts` seed (we'll leave it; PlatformUI elsewhere still imports it).

No changes to navigation, no changes to other modality `*.community.tsx` pages (those remain modality-specific; this is the cross-cutting hub).

---

## Visual / design notes

- Reuse semantic tokens already in `src/styles.css` (no new colors).
- Use existing utility classes seen in modality pages: `sanctuary-panel`, `quest-panel-air`, `marble-sheen`, `var(--shadow-aura)`, `var(--gradient-panel)`, `var(--shadow-glow)`.
- Lean on `lucide-react` icons already in the bundle (Flame, Sparkles, Users, HeartHandshake, Trophy, Crown, Sprout, Wind, Leaf, MessageCircle, Heart).
- Components from shadcn already present: `Tabs`, `Progress`, `Card`, `Button`, `Badge`, `Avatar`, `Tooltip`, `Dialog` (for "view all members" / rank explainer).
- Mobile-first: dashboard collapses to single column under `lg`; sticky bottom composer on mobile.

---

## Out of scope (intentionally)

- No real backend / auth / multi-user sync — same local-first pattern as the rest of the app.
- No new routes, no nav changes.
- No changes to modality-specific community sub-pages (`/breathwork/community`, `/smoothie/community`, etc.).
- No paid-tier mechanics — keeping the existing $5 framing in `MembershipCTA` untouched.

---

## Success check after build

- `tsc` clean.
- Hero, gamification strip, challenges, tabbed feed, circles, mentors, events, leaderboards, rituals, code-of-circle all render at `/community`.
- Daily intention persists across reload via localStorage.
- Reactions persist; XP/rank update live.
- Mobile viewport (719px, current preview) renders cleanly with no overflow.
