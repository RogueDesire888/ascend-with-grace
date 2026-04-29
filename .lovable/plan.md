Build a more faithful, professional version of the Sanctuary page as a third-person explorable floating temple world inspired by the reference image.

1. Replace the current 2.5D island map with an interactive third-person world
   - Convert `/sanctuary` from a flat click-to-pan scene into a game-like floating sanctuary viewport.
   - Add a visible player avatar in third-person view near the center/lower center of the screen.
   - Let the user move the avatar around the sanctuary with keyboard controls on desktop and tap/click destination movement on mobile/desktop.
   - Keep this first pass performant and reliable in React/CSS, while visually simulating depth, camera tracking, and 3D world space.

2. Make the world look much closer to the image reference
   - Rebuild the sanctuary composition around a floating marble island with:
     - central white/gold temple
     - stepped stairs and platform terraces
     - floating gardens and pink/green botanical zones
     - waterfalls falling through clouds
     - soft cloud sea below the island
     - luminous celestial sky and sunlit mist
     - glowing portals placed around the temple grounds
   - Increase visual fidelity with layered perspective, shadows, atmospheric haze, and foreground/background parallax.
   - Keep the style premium, cinematic, and professional rather than cartoonish.

3. Add a third-person camera feel
   - Implement a camera/world transform driven by the avatar position.
   - Keep the avatar fixed near the lower-middle of the viewport while the sanctuary world moves behind it.
   - Add a smooth cinematic landing state: after clicking Enter, the camera flies down from the clouds, approaches the island, then places the avatar at the arrival terrace.
   - After landing, switch into free movement mode.

4. Add movement and interaction zones
   - Define walkable coordinates for key sanctuary destinations:
     - Herbal Garden
     - Energy Temple
     - Movement Terrace
     - Healing Springs
     - Spirit Observatory
   - Add glowing world markers that become active when the avatar is near them.
   - Clicking/tapping a marker can auto-walk the avatar to that destination.
   - Desktop controls will support WASD/arrow-key movement.
   - Add a small on-screen movement hint/control cluster that does not overwhelm the scene.

5. Connect world locations to skill growth content
   - When the avatar reaches a location, open a polished in-world information panel for that zone.
   - Reuse the existing `skillTrees`, `dailyQuests`, `weeklyQuests`, and `mainQuests` data.
   - Each zone panel will show:
     - related skill tree
     - level and progress
     - active quests for that tree
     - buttons to view Quests or Skill Tree
   - Make the panel feel like a sanctuary interface overlay, not a generic dashboard card.

6. Improve responsive behavior
   - Desktop: third-person camera with keyboard movement and click-to-move markers.
   - Mobile/tablet: larger touch targets, tap-to-walk zone controls, and a compact bottom panel.
   - Ensure text and controls do not overlap the world, avatar, or navigation at the current preview size.

7. Technical implementation
   - Update `src/components/platform/SanctuaryWorld.tsx` substantially.
   - Extend `src/styles.css` with dedicated utilities/keyframes for:
     - third-person camera motion
     - cloud sea
     - waterfalls
     - floating island depth
     - avatar aura and idle animation
     - glowing interaction portals
   - Keep route metadata in `src/routes/sanctuary.tsx` aligned with the new experience.
   - No backend, persistence, account logic, or real quest completion logic will be added in this pass.

Validation
   - Verify `/sanctuary` renders without runtime errors.
   - Check the landing sequence, keyboard movement, click/tap movement, proximity panels, and navigation links.
   - Check desktop and mobile layout, especially the current 1000x648 preview size.