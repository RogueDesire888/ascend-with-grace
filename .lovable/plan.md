## Goal

Bring the Sanctuary 3D world up to a near-painterly, golden-hour cinematic look that matches the Tree of Life image — without sacrificing the interactive 3D walking experience.

## Strategy: Three layers

```
┌─────────────────────────────────────────────┐
│  Post-FX layer  (bloom, DoF, vignette, LUT) │  ← cinematic grade
├─────────────────────────────────────────────┤
│  3D foreground  (avatar, ground, zones)     │  ← upgraded materials
├─────────────────────────────────────────────┤
│  Painterly skybox + distant scenery (image) │  ← AI-generated dome
└─────────────────────────────────────────────┘
```

## 1. Painterly Skybox + Distant Scenery

Generate two new AI images in the same style as the Tree of Life (golden-hour, painterly, classical-fantasy):

- `src/assets/sanctuary-skybox.jpg` — 4096×2048 equirectangular panoramic sky (sunset clouds, distant floating islands, soft gold light, no foreground). Used as the scene's `background` + `environment` via drei's `<Environment files={...} background />`. Replaces the generic `<Environment preset="sunset" />`.
- `src/assets/sanctuary-horizon.jpg` — 2048×512 horizon strip used as a curved billboard far behind the playable area for distant temples / mountains / cypress silhouettes. Adds depth without geometry cost.

This single change is what makes the scene *feel* painterly — the sky and horizon do most of the visual heavy lifting.

## 2. Cinematic Post-Processing

Add `@react-three/postprocessing` and wire an `<EffectComposer>` pass:

- **Bloom** — soft golden glow on bright spots (sun, particles, glowing fruits/lanterns). intensity ≈ 0.6, luminanceThreshold ≈ 0.85.
- **God Rays** — volumetric sun shafts from a hidden sun mesh placed in the skybox direction.
- **Depth of Field** — gentle focus on the avatar, blur on distant horizon. Cheap blur, big atmosphere boost.
- **Vignette** — subtle warm corners.
- **LUT / ColorGrading** — push warmth + slight desaturation in shadows for the golden-hour palette.
- **SMAA** — replaces default MSAA for cleaner edges with FX enabled.

Tone mapping stays ACES Filmic, exposure bumped slightly (1.22 → 1.32) to match the FX pipeline.

## 3. Foreground Upgrades

Targeted improvements to existing 3D elements (no rewrites — surgical):

- **Lighting**: replace the current ambient + directional with a 3-point setup — warm key (sun direction matching skybox), cool fill, golden rim. Add a `Sky`-aligned hemisphere light. Enable `castShadow` on hero objects, `PCFSoftShadowMap`, and a baked-style contact-shadow plane (drei `ContactShadows`) under the avatar + key props.
- **Materials**: bump key surfaces (columns, statues, tree bark, water) to higher roughness/metalness contrast; add subtle emissive on lanterns/fruits so bloom catches them.
- **Foliage density**: add a few `<Instances>` clusters of low-poly foliage cards (alpha-mapped leaves) along zone borders to mask hard edges and add lushness — instanced so cost stays low.
- **Particles**: increase `<SceneSparkles>` density modestly, recolor to warm gold; add slow-drifting pollen/dust shader plane for atmosphere.
- **Fog**: recolor the existing fog from cool blue (`#e9f4ff`) to warm peach (`#f5d9b8`) and tighten range so the painterly horizon shows through earlier — this single tweak unifies 3D + skybox.
- **Water**: if waterfalls exist as planes, add a tiny scrolling normal map for shimmer.

## 4. Performance & Quality Toggle

Cinematic FX are heavy. Add an automatic quality detector + a manual toggle in the existing top-right control bar:

- Detect: `navigator.hardwareConcurrency`, `devicePixelRatio`, mobile UA → default tier.
- Tiers:
  - **Cinematic** (desktop default): all FX, full skybox res, instanced foliage, shadows on, `dpr={[1, 2]}`.
  - **Balanced** (mobile default): bloom + vignette only, half-res skybox, no DoF/god-rays, shadows off, `dpr={[1, 1.5]}`.
  - **Lite** (low-end fallback): no FX, current visuals + new fog/skybox only.
- Persist choice in `localStorage`.

## 5. Files Touched

- **New assets**: `src/assets/sanctuary-skybox.jpg`, `src/assets/sanctuary-horizon.jpg` (both AI-generated in Tree of Life style).
- **New dependency**: `@react-three/postprocessing`.
- **New component**: `src/components/platform/sanctuary/PostFX.tsx` — encapsulates the EffectComposer + quality-tier logic.
- **Edited**: `src/components/platform/SanctuaryWorld.tsx` — swap Environment, add skybox/horizon, wire PostFX, lighting tweaks, fog color, quality toggle button. Walking, avatar, zone interactions, quest UI remain untouched.

## 6. Out of Scope

- No changes to the gameplay loop, quest data, zone behavior, or routing.
- No replacement of the avatar model.
- No new assets beyond the two background images (we're not regenerating each tree/statue as a 3D model).

## Expected Result

The Sanctuary will read as the same world as the Tree of Life image — same warm sunset light, same dreamy clouds and classical mood, soft bloom on every glowing element, painterly distant background — while you can still walk around and interact like before.
