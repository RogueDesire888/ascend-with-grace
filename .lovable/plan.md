Plan to refine the Sanctuary page:

1. Make the stairs and railings match exactly
   - Replace the current independently-positioned railing math with a shared stair-layout system used by both the stair meshes and railing meshes.
   - Align rail posts to the actual step centers and widths, so each baluster lands on a tread instead of floating beside or cutting through the steps.
   - Rebuild the handrails as continuous sloped marble rails whose start/end points match the first and last stair elevations.
   - Add larger newel posts at the bottom and top landings, plus side stringers/skirt blocks so the whole staircase reads as one coherent structure.

2. Smooth avatar movement and reduce choppiness
   - Move movement interpolation into the Three.js render loop using refs, so walking no longer triggers React state updates every animation frame.
   - Keep React state updates throttled only for UI needs, such as nearby-zone detection and panel changes.
   - Add acceleration/deceleration smoothing instead of instant step changes, so keyboard movement and click-to-walk feel less jittery.
   - Smooth camera tracking with frame-rate-independent damping to prevent sudden camera catches or lag spikes.

3. Improve performance while raising visual quality
   - Reduce expensive per-frame/render pressure by lowering unnecessary high-count decorative meshes where they do not affect the main view.
   - Replace repeated tiny flower/sparkle objects with grouped or lower-cost decorations where possible.
   - Keep pixel density responsive: sharper on capable screens, but not so high that it causes movement lag.
   - Reuse shared materials/geometries where practical to reduce GPU/CPU overhead.

4. Upgrade graphics toward a higher-fidelity “4K quality” look
   - Improve the temple silhouette with more detailed marble layers, deeper shadows, refined columns/capitals, gold trim, and a cleaner reference-like pediment.
   - Add richer material detail using procedural marble/stone variation, better roughness/metalness values, and stronger shadow definition.
   - Upgrade exterior landscaping with denser but optimized flower beds, garden borders, cypress clusters, waterfalls, and cloud layering.
   - Adjust lighting, fog, and tone so the scene looks less washed out and more premium while preserving the bright peaceful temple atmosphere.

5. Validate the result
   - Load `/sanctuary` and enter the 3D world.
   - Check the stairs from the front and side to confirm railings match the staircase slope and step positions.
   - Walk with WASD/arrow keys and click-to-walk to confirm movement is smoother.
   - Check camera follow near the stairs, side terraces, and temple/backside.
   - Run a browser performance check after entering the world to confirm the quality upgrade does not worsen lag.