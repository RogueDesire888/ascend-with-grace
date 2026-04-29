## Plan

Build a polished, multi-page frontend for a calming, magical, game-like holistic healing platform centered on avatar growth, quests, skill trees, and a $5/month membership offer.

## Pages to create

1. **Home**
   - Replace the placeholder page with a visually rich first screen.
   - Hero headline/tagline: “Begin Your Ascension”.
   - Prominent “Start Your Journey” CTA.
   - Position the platform as a peaceful spiritual game for becoming a balanced healer.
   - Include a $5/month value section, elemental avatar preview, skill tree teaser, quest loop preview, and resource/community highlights.

2. **Sanctuary**
   - Dashboard-style central hub.
   - Show avatar, elemental type, Ascension Level, glow/progress state, streak counter, daily quests, and a skill tree wheel.
   - Include layout/theme customization controls as polished static UI elements.

3. **Quests**
   - Clean quest board with Daily, Weekly, and Main Story quest sections.
   - Use colorful, scannable cards with XP, tree category, completion state, and calm action buttons.

4. **Skill Trees**
   - Visual interface for the five trees:
     - Herbal Wisdom
     - Energy Mastery
     - Movement Arts
     - Healing Touch
     - Mind & Spirit
   - Show level progress, next quest, interconnected paths, and an overall Ascension contribution.

5. **Library**
   - Resource vault with searchable-looking interface.
   - Include guide cards, audio tracks, guided sessions, daily practices, and category filters.

6. **Community**
   - Calm supportive social feed.
   - Include progress-sharing posts, group challenges, encouragement prompts, and gentle moderation/supportive tone.

## Visual direction

Use the uploaded image as the color template, but translate it into a softer, more serene interface:

- Deep cosmic indigo/night-sky background.
- Neon coral, cyan, golden yellow, orchid, and leafy green accents.
- Soft glows around avatars, progress rings, quest states, and skill nodes.
- Peaceful magical atmosphere, not arcade-chaotic.
- Friendly game UI clarity inspired by Duolingo, but more spiritual, elegant, and spacious.
- Use actual visual assets generated or custom-built in code where helpful, especially for the avatar/skill-tree feel.

## Navigation and structure

Create proper TanStack route files rather than a single long page:

```text
/            Home
/sanctuary   Dashboard
/quests      Quest board
/skill-trees Skill tree interface
/library     Resource vault
/community   Community feed
```

Add a consistent top navigation with clear links and a membership CTA.

## Design system work

Update `src/styles.css` with semantic tokens based on the uploaded image:

- Background, surface, card, border, muted, foreground tokens.
- Accent tokens for the five elements and skill trees.
- Glow/shadow tokens for magical progress effects.
- Gradient tokens using semantic CSS variables.

Components will use semantic Tailwind token classes rather than hardcoded color utilities.

## Technical notes

- Keep this as a frontend prototype unless you later ask for real login, payments, saved progress, subscriptions, or community persistence.
- The $5/month pricing and app flows will be represented visually, but payments will not be wired yet.
- If you later want real accounts, subscriptions, saved avatars, progress, community posts, and downloadable protected resources, the next step would be enabling Lovable Cloud and then payments.
- Each route will have page-specific metadata for better SEO.
- The existing TanStack Start route structure will be preserved.

## Acceptance criteria

- Placeholder homepage is fully replaced.
- All six requested pages exist and are reachable through navigation.
- The uploaded image clearly influences the palette and glow language.
- The interface feels peaceful, magical, game-like, and very user-friendly.
- Avatar, Ascension Level, quests, five skill trees, resource vault, and community concepts are visible in the UI.
- No backend/payment persistence is added in this first implementation.