Rebuild the Sanctuary page into a true 3D floating temple garden world modeled after the uploaded reference: a marble temple on a floating island above clouds, lush flower terraces, cypress trees, waterfalls, and third-person avatar exploration.

1. Move from 2.5D CSS to a real 3D world
   - Replace the current simulated 2.5D Sanctuary scene with a WebGL scene using Three.js through React-friendly tooling.
   - Keep the rest of the app shell and navigation intact.
   - Make `/sanctuary` feel like entering a premium interactive game world, not a dashboard.

2. Build the floating island composition from the reference image
   - Create a large suspended rock island with a tapered underside.
   - Add layered garden terraces around the island edge.
   - Add marble staircases rising toward the temple entrance.
   - Add a central classical white-marble temple with columns, pediment, roof depth, and soft gold highlights.
   - Add lush garden details: flower beds, rose clusters, greenery, hanging vines, planters, and tall cypress-like trees.
   - Add multiple waterfalls spilling off the island into the cloud layer below.
   - Add a luminous cloudscape sky with soft daylight, atmospheric fog, and depth haze.

3. Add third-person avatar exploration
   - Add a visible player avatar in third-person view.
   - Use a follow camera behind and above the avatar.
   - Support keyboard movement on desktop.
   - Support click/tap-to-move destinations for users who do not use keyboard controls.
   - Restrict movement to the island’s walkable paths, stairs, and terraces.
   - Add smooth camera easing so movement feels premium and cinematic.

4. Add a cinematic landing sequence
   - Start high in the clouds looking at the floating island from a distance.
   - On “Enter Sanctuary,” animate the camera flying toward the island, descending through clouds, and landing behind the avatar near the base of the stairs.
   - After landing, transition into free third-person movement.
   - Respect reduced-motion settings with a polished shortened transition.

5. Turn sanctuary areas into explorable quest locations
   - Place interactive destination zones throughout the 3D island:
     - Herbal Garden among flowers and planters
     - Energy Temple at the main marble temple
     - Movement Terrace on an open garden platform
     - Healing Springs beside waterfalls
     - Spirit Observatory at a sky-facing outlook
   - When the avatar approaches a zone, show a refined in-world prompt.
   - Selecting a zone opens the existing skill-tree and quest panel using current app data.
   - Keep quest completion presentational only unless backend functionality is requested later.

6. Premium visual polish
   - Use physically-inspired materials: marble, soft stone, greenery, flowers, mist, and water.
   - Add sun beams, bloom-like glow, soft shadows, fog, and atmospheric layering.
   - Use the uploaded image as the art direction reference, not a flat static replacement for the experience.
   - Make the world bright, ethereal, luxurious, and professional.
   - Avoid cartoon proportions; prioritize elegant realism within browser performance limits.

7. Technical implementation
   - Add the needed 3D dependency stack, likely `three`, `@react-three/fiber`, and `@react-three/drei`.
   - Create a focused 3D Sanctuary component, likely under `src/components/platform/SanctuaryWorld3D.tsx`.
   - Keep UI overlays and panels in React/HTML for crisp text and accessible buttons.
   - Update `src/components/platform/SanctuaryWorld.tsx` or route wiring to use the new 3D version.
   - Extend `src/styles.css` only for overlay styling, loading states, and mobile controls.
   - Keep route metadata aligned with the new 3D experience.

8. Performance and responsive behavior
   - Use procedural geometry and lightweight repeated objects rather than huge imported models.
   - Keep the scene interactive on the current preview size and mobile.
   - Add loading/fallback state so the page never appears blank.
   - Tune camera framing for desktop and mobile.

Validation
   - Verify `/sanctuary` loads without runtime errors.
   - Test the entry landing sequence.
   - Test keyboard movement and click/tap destination movement.
   - Test at least one quest zone interaction.
   - Capture desktop and mobile screenshots to confirm the world is visible, framed correctly, and feels close to the uploaded reference.