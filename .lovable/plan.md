Plan to expand the Sanctuary floating temple world:

1. Enlarge the island and traversal area
   - Increase the walkable island footprint so the scene feels less cramped.
   - Expand the walkable rectangles/ellipse to include a wider arrival court, broader side paths, the larger temple platform, and the new exterior zen garden.
   - Update the avatar clamp and terrain-height logic so the player can smoothly walk across the full expanded island without getting stuck at path edges.

2. Build a larger temple composition
   - Scale the temple up materially rather than only applying a simple group scale.
   - Add a wider layered plinth, taller front columns, deeper interior chamber, broader roof mass, larger gold halo ornament, and stronger reference-style marble silhouette.
   - Keep the front doorway enterable and preserve the interior visibility when walking inside.

3. Add more stairs leading to the temple
   - Replace the current 14-step staircase with a longer, wider ceremonial stairway.
   - Make the stair width grow subtly as it descends, matching the grand reference-temple approach.
   - Adjust `getTerrainHeight` to match the longer stair run so the avatar ascends naturally instead of floating or clipping.

4. Add a large peaceful exterior zen garden
   - Add a dedicated side garden outside the temple, likely on one exterior side terrace.
   - Include raked sand/gravel forms, stepping stones, small water basin, low shrubs, cypress/ornamental trees, flower accents, and a quiet circular meditation pad.
   - Make the garden walkable and visually distinct from the quest portals while staying cohesive with the celestial marble style.

5. Spread interactive zones farther apart
   - Move each zone marker to a more spacious location around the larger island:
     - herbal garden farther into the expanded garden side
     - movement terrace farther opposite the garden
     - healing springs near the widened front/side water area
     - spirit observatory farther across the opposite front terrace
     - energy temple deeper inside or near the larger temple interior
   - Keep zone detection radius comfortable enough that menus appear when the avatar reaches the portal, not from too far away.
   - Update arrival menu navigation targets to match the new positions.

6. Camera and visual framing
   - Pull the follow camera back/up slightly so the larger temple, longer stairs, and spread-out zones remain visible while walking.
   - Keep the interior camera closer when the player enters the temple.
   - Increase cloud ring/waterfall/tree placement scale so the expanded island still feels complete rather than sparse.

Technical scope
   - Main changes in `src/components/platform/SanctuaryWorld.tsx`.
   - CSS changes only if needed for viewport framing or overlay spacing.
   - No backend, routing, quest-data, or persistence changes.

Validation
   - Verify `/sanctuary` loads without console/runtime errors.
   - Verify the avatar can walk from arrival, up the longer stairs, into the temple, into the new zen garden, and to each spread-out interactive zone.
   - Verify compact top-right quest panels still open only near/after selecting zones and do not cover the full screen.
   - Check the current desktop viewport for temple scale, garden visibility, and camera framing.