Plan to upgrade the Sanctuary page:

1. Make the stair railings coherent
   - Replace the current flat side rail bars with stair-following marble balustrades.
   - Align railing height and angle to the 24-step staircase so posts land on individual steps instead of floating or cutting through them.
   - Add wider lower newel posts, slimmer repeated balusters, and a continuous sloped handrail on both sides for a reference-image temple approach.

2. Expand temple exterior areas on the side and back
   - Enlarge the walkable island footprint and add broad side/back terraces around the temple.
   - Extend marble walkways around the temple perimeter so the avatar can walk along both sides and behind the building.
   - Update walkable bounds, clamping, terrain-height, and click-to-walk areas so full-island navigation supports the expanded side/back spaces.

3. Upgrade the graphics toward the provided reference image
   - Refine the temple silhouette with a more classical Greek facade: stronger front pediment, deeper colonnade, longer side colonnades, decorative gold roof ornaments, and layered marble plinths.
   - Add more reference-like exterior detail: flower urns, clustered pink/white flower beds, cypress trees, lush greenery on terrace edges, larger cloud banks, and additional waterfalls dropping from the island.
   - Improve material feel with warmer marble tones, subtle shadow depth, more gold accents, and denser atmospheric sparkle/cloud layering while keeping the scene performant.

4. Improve backside visibility with avatar-locked camera
   - Rework the camera follow logic so it is always anchored to the avatar position rather than drifting toward the temple/world center.
   - When the avatar walks behind the temple, shift the camera higher and/or slightly around the building so the avatar remains visible instead of hidden behind the structure.
   - Keep the interior/near-temple camera usable, but prioritize always seeing the avatar during side and rear navigation.

Technical scope
   - Main implementation in `src/components/platform/SanctuaryWorld.tsx`.
   - No backend or route changes.
   - CSS changes only if a small overlay/framing adjustment is needed.

Validation
   - Verify `/sanctuary` loads without runtime errors.
   - Check that the avatar can walk up the stairs, along side terraces, behind the temple, and back to the front.
   - Confirm the new railings align with the staircase.
   - Confirm the camera continues to show the avatar from front, side, inside/near temple, and behind-temple positions.
   - Confirm the scene visually reads closer to the uploaded reference: grand temple, lush flowers, cypress trees, clouds, waterfalls, and floating island scale.