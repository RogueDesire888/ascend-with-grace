Plan to transform the Sanctuary page into an interactive floating sanctuary world:

1. Replace the current dashboard-style Sanctuary page
   - Turn `/sanctuary` into a full-screen, immersive experience instead of a card/grid dashboard.
   - Keep the app navigation available, but make the sanctuary itself feel like the main “game world.”
   - Use the uploaded image as the creative reference: floating island, temple, clouds, gardens, waterfalls, soft sky light, and sacred architecture.

2. Add an interactive landing sequence
   - First visit/click starts a cinematic camera approach: the view begins high in the clouds, then glides toward the floating island as if the user is landing.
   - Add a refined “Enter Sanctuary” opening state so the animation begins intentionally after interaction.
   - Include graceful reduced-motion behavior so users who prefer less motion still get a polished static transition.

3. Build the floating sanctuary world UI
   - Create a layered 2.5D interactive scene using React/CSS rather than a heavy 3D engine for this first version, to keep it fast and reliable.
   - Scene elements will include:
     - floating cloud ocean and sky depth
     - central marble temple/sanctuary
     - garden terraces and rose/greenery zones
     - waterfall streams flowing from the island
     - glowing portals/markers for different areas
     - subtle parallax movement based on pointer/mouse movement
   - The island will feel explorable with camera/viewport shifts, atmospheric depth, and clickable zones.

4. Add free movement between sanctuary areas
   - Create interactive destination nodes around the island:
     - Herbal Garden for Herbal Wisdom
     - Energy Temple for Energy Mastery
     - Movement Terrace for Movement Arts
     - Healing Springs for Healing Touch
     - Spirit Observatory for Mind & Spirit
   - Clicking or tapping a location smoothly pans/zooms the “camera” to that area.
   - Add controls to return to the full island view and move between zones.
   - On mobile, use large tap targets and a bottom zone selector so the experience remains easy to use.

5. Connect each sanctuary area to quests and skill-tree growth
   - Each zone opens an elegant information panel with:
     - the related skill tree
     - current level/progress
     - short guidance for what that sanctuary area teaches
     - active quests pulled from existing quest/skill data where possible
     - clear calls to continue a quest or view the full skill tree
   - The information should feel like part of the world, not a plain dashboard.

6. Preserve the premium “10 million dollar” visual system
   - Extend `src/styles.css` with dedicated world-scene utilities for clouds, waterfalls, marble glow, camera motion, and sanctuary markers.
   - Use semantic design tokens already in the project; no raw one-off color styling.
   - Keep the tone peaceful, magical, professional, and futuristic zen garden rather than cartoonish.

7. Keep implementation scoped to frontend presentation
   - No backend, account system, subscriptions, database, or payment logic will be added in this pass.
   - Quest completion will remain presentational/mock, matching the current app state.
   - The goal is to make the Sanctuary page feel like the main interactive world hub.

Technical details:
- Main files to change: `src/routes/sanctuary.tsx`, `src/styles.css`.
- Likely add one focused component file: `src/components/platform/SanctuaryWorld.tsx`.
- Reuse existing data from `src/components/platform/data.ts` for skill trees and quests.
- Use React state for selected sanctuary zone and landing state.
- Use CSS transforms, transitions, keyframes, responsive layout, and pointer-driven parallax for the interactive world.
- Avoid adding a heavy 3D dependency unless a later iteration needs true WebGL/free-flight navigation.

Validation:
- Verify the Sanctuary page renders without console/runtime errors.
- Check desktop at the current preview size and mobile responsiveness.
- Confirm the landing interaction, zone selection, information panels, and navigation links are usable.