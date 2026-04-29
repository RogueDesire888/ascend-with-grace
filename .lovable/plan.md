Plan to retheme the site into a galactic garden oasis with a futuristic zen garden feel:

1. Refresh the design system
   - Update `src/styles.css` tokens from a mostly cosmic-indigo magic palette into a softer living-galaxy palette: deep night garden backgrounds, luminous jade, lotus pink, moon-gold, misty cyan, and orchid accents.
   - Replace the current star-only atmosphere with layered garden-cosmos utilities: subtle constellation dust, aurora mist, petal/light particle effects, and softer glow shadows.
   - Keep contrast high and preserve the existing peaceful, premium feel.

2. Restyle the app shell
   - Make the fixed background feel like a serene galactic greenhouse: cosmic depth plus botanical light blooms, less “space dashboard,” more “oasis sanctuary.”
   - Adjust the header/nav styling to feel more glassy, calm, and organic-futuristic while keeping navigation clear and user-friendly.

3. Update reusable platform components
   - Restyle `AvatarOrb` into a floating ascension bloom/lotus-energy avatar rather than a pure cosmic orb.
   - Restyle `SkillWheel` into a futuristic zen garden mandala with softer circular rings and botanical glow nodes.
   - Update cards, quest panels, progress bars, search, community posts, resource tiles, and CTA surfaces to feel like garden pathways, shrine panels, and glowing oasis modules.

4. Tune copy where it supports the vibe
   - Lightly adjust headings/labels where needed to reinforce the “galactic garden oasis” direction without changing the product structure or adding new features.
   - Keep the existing routes and user flow intact.

Technical details:
- Primary changes will be in `src/styles.css`, `src/components/platform/AppShell.tsx`, and `src/components/platform/PlatformUI.tsx`.
- I will avoid backend changes and keep this frontend-only.
- I will use semantic tokens and existing Tailwind token patterns rather than hardcoded one-off colors.