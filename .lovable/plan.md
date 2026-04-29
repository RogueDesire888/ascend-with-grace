Plan to upgrade the Sanctuary page:

1. Build the temple as real 3D geometry
   - Replace the current simple block temple with a detailed white-marble floating temple matching the reference direction: broad front stairs, layered plinths, columned portico, central dark entrance, pediment/roof tiers, gold halo ornament, side wings, marble trim, and luminous highlights.
   - Keep the uploaded reference image as the cinematic backdrop, but make the 3D temple itself visible and recognizable in-world instead of relying on the background image.
   - Reframe camera/lighting so the temple is not hidden by overlays or background blending.

2. Make the stairs and island walkable
   - Replace the current flat-only movement with terrain-aware movement.
   - Add a height function for the island surface so the avatar rises smoothly on stair steps, temple terrace/platforms, and garden areas instead of staying at one fixed Y height.
   - Update click/tap movement to land on valid walkable areas across the whole island.
   - Expand and shape the walkable boundary to include the front stairs, temple landing, side terraces, gardens, and portal zones.

3. Improve third-person character movement
   - Add avatar facing direction based on movement vector so the character turns toward where they walk.
   - Smooth camera follow with a better over-the-shoulder/behind-the-avatar framing.
   - Keep WASD/arrow movement and click/tap-to-move, but tune speed and path feel so stairs, landings, and side terraces feel accessible.

4. Improve floating island detail and reference match
   - Add layered garden terraces, stair rail edges, marble paths, waterfall lips, floating rock underside details, cloud depth, and cypress/flower placement around the temple.
   - Preserve the bright sky, massive clouds, white temple, lush green/pink terraces, and waterfall composition from the reference.
   - Keep the UI controls and quest/VFX behavior already added; only adjust them if needed to avoid covering the temple.

Technical notes
   - Main implementation stays in `src/components/platform/SanctuaryWorld.tsx`.
   - Styling/VFX refinements stay in `src/styles.css` if needed.
   - No backend or persistence changes.
   - I will avoid editing generated router files.

Validation
   - Verify `/sanctuary` renders without runtime errors.
   - Confirm the 3D temple is visible in the world.
   - Confirm the avatar can walk up the stairs, onto the temple terrace, around gardens, and to all portal zones.
   - Check desktop framing at the current preview size and a mobile viewport for no major overlap.