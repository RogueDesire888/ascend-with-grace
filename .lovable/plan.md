Plan to refine the Sanctuary world:

1. Make the temple enterable with an interior view
   - Add an interior region behind the front doorway so walking through the temple entrance transitions the camera into a closer interior view.
   - Open up the front doorway visually instead of using a flat dark panel.
   - Add visible interior details: marble floor, glowing altar/energy pool, rear columns, ceiling light, side alcoves, gold accents, and soft interior bloom-style lighting.
   - Keep the avatar visible inside and allow walking around the interior chamber.

2. Improve full-island navigation
   - Expand the walkable model from one oval clamp into a more accurate sanctuary traversal shape covering:
     - arrival terrace
     - main staircase
     - temple landing
     - temple interior
     - side garden terraces
     - healing/spirit/herbal/movement portal zones
   - Add better terrain height transitions so stairs, temple landing, and interior floor feel continuous.
   - Tune movement speed and click/tap target handling so users can reliably walk up stairs, into the temple, and around the whole island.
   - Prevent the avatar from getting pushed outside the island while still allowing access to all intended paths.

3. Move interactive spot menu to top right only
   - Change the zone/quest panel from a large bottom/full-width overlay into a compact top-right panel inside the 3D viewport.
   - Keep it scrollable if content is long, but constrain its width/height so it never covers the whole scene.
   - On mobile, also keep it top-right or top-aligned compact instead of covering the entire screen.
   - Preserve quest completion, Ascension Level updates, and VFX behavior.

4. Match the reference image more closely
   - Further refine the temple silhouette toward the reference: taller luminous columns, broad white stairway, layered plinth, floral terraces, cypress trees framing both sides, waterfalls, and gold ornamental glow.
   - Reduce any remaining visual elements that fight the reference composition.
   - Keep the 3D temple prominent while using the reference image as atmospheric backing.

Technical scope
   - Main changes in `src/components/platform/SanctuaryWorld.tsx`.
   - Minor CSS adjustments in `src/styles.css` if needed for compact panel behavior and visual polish.
   - No backend or persistence changes.

Validation
   - Verify `/sanctuary` loads without runtime errors.
   - Verify walking up the stairs and through the temple entrance reveals the interior.
   - Verify all interactive spots are still reachable.
   - Verify zone menus appear only as compact top-right panels and do not cover the world.
   - Check current desktop viewport and a mobile viewport for layout/framing.