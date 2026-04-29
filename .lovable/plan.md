Plan to update the Sanctuary page:

1. Fix the obstructed temple interior view
   - Adjust the temple-interior camera behavior so entering the temple uses a clearer over-the-shoulder/interior angle instead of viewing through the exterior front wall.
   - Add an interior-specific look target and camera offset that keeps the avatar visible while looking deeper into the chamber.
   - If needed, make the front doorway/wall treatment less visually blocking from the interior camera path without removing the temple facade.

2. Fix avatar clipping into the stairs
   - Replace the current stair height calculation with one based on the same `getStairStep()` layout used to render the physical stair meshes.
   - Add a small avatar foot clearance above the stair tread so the character stands on top of each step instead of half-rendering through it.
   - Keep the terrain height transition smooth between the lower landing, stair run, and upper temple terrace.

3. Add a large left-side exterior zen garden
   - Expand or reuse the left exterior terrace area as a larger dedicated garden space beside the temple.
   - Build a bigger raked-sand garden with curved rake lines, stone clusters, border stones, cypress/greenery accents, and peaceful seating/meditation details.
   - Add a pond integrated into the garden with a small waterfall feature flowing into it.
   - Make the new garden clickable/walkable where appropriate and keep it visually connected to the existing left-side navigation area.

4. Validate
   - Enter `/sanctuary`, walk up the stairs, and confirm the avatar sits above the steps.
   - Walk through the temple entrance and confirm the exterior wall no longer blocks the view of the avatar/interior.
   - Check the left exterior temple side to confirm the large zen garden, pond, and waterfall render clearly and do not block movement.