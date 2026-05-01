## Goal

Push the Sanctuary from "stylized 3D" up to **cinematic stylized realism** — the visual register of *Journey*, *Sky: Children of the Light*, and *Ghost of Tsushima*'s photo mode. Real PBR materials lit by a real HDRI, real photoscanned ground/rocks/foliage, and a film-grade post-processing pass — tuned to hit ~60 FPS on a typical laptop and stay playable on phones.

This is the realistic ceiling for a browser. True PS5/Xbox-Series-X fidelity requires ~150 GB of streamed assets, hardware ray tracing, and native shader compilation — none of which exist on the web. What we *can* deliver is a scene that genuinely makes people stop and stare.

## Strategy

```text
┌────────────────────────────────────────────────┐
│ Post-FX  bloom · SSAO · god rays · DoF · grade │  cinema grade
├────────────────────────────────────────────────┤
│ Foreground  PBR rocks/trees · grass · water    │  hero detail
├────────────────────────────────────────────────┤
│ Mid-ground  instanced foliage · fog volumes    │  depth & lushness
├────────────────────────────────────────────────┤
│ Background  HDRI sky + painterly horizon       │  mood & light
└────────────────────────────────────────────────┘
```

Two ideas do most of the heavy lifting:
1. **Real HDRI environment** (one 4K `.hdr` file from Poly Haven) drives all reflections and ambient light. This single change is what makes materials look "real" instead of "computer-y".
2. **Photoscanned PBR assets** (rocks, tree bark, grass, ground) from Poly Haven & Ambient CG. AAA studios use the same library. Each asset is a ~5 MB GLB plus 2K textures.

## 1. Real-world lighting (HDRI)

- Replace the painterly `sanctuary-skybox.jpg` background-only setup with a true `.hdr` equirectangular environment from **Poly Haven** (CC0). Candidates: `kloofendal_43d_clear_puresky`, `qwantani_dawn`, `golden_gate_hills`. Loaded via drei's `<Environment files="..." background />` so it lights every PBR material physically correctly.
- Keep the painterly horizon billboard for art direction, layered in front of the HDRI.
- Sun: replace the current directional light with a single high-intensity sun matching the HDRI's actual sun direction, plus drei's `<Sky>` for atmospheric scattering on the upper hemisphere.

## 2. Photoscanned PBR assets

Source ~12–15 CC0 assets, all from **Poly Haven** and **Ambient CG**:

| Slot | Asset | Use |
|---|---|---|
| Ground | `forest_ground_04` (2K PBR) | Tiled across walkable platform with triplanar blending |
| Rock × 3 | `rock_06`, `rock_boulder_dry`, `cliff_side` GLBs | Scattered as set dressing, instanced |
| Tree × 2 | Stylized pine + cypress GLBs (Sketchfab CC0) | Zone markers, instanced clusters |
| Grass | `grass_medium_01` alpha cards | Instanced grass field with wind shader |
| Bark | `bark_brown_02` | Tree-of-Life trunk material |
| Marble | `marble_01` | Temple columns / statue pedestals |
| Water | `water_normals` + custom shader | Reflective pond with SSR fallback |

Each asset is downloaded once at build time and committed to `public/assets/sanctuary/`. Total asset budget ~40 MB gzipped — heavy but acceptable for a hero page, and cached after first load.

## 3. Geometry & instancing

- Convert the existing procedurally generated zone props (current `THREE.Mesh` instances) into `<Instances>` groups for rocks, grass, and tree clusters. 5,000 grass blades and 200 rocks cost roughly the same as 10 hand-placed meshes.
- Add a **grass shader** (vertex displacement for wind, alpha-tested cards) — cheap, transformative.
- Add a **water plane** with animated normal map + screen-space reflection (drei's `<MeshReflectorMaterial>` — already in the dependency tree).
- Tree-of-Life centerpiece: replace the procedural trunk with a Sketchfab CC0 ancient-tree GLB; keep the glowing fruit particles.

## 4. Post-processing (extend existing PostFX.tsx)

Add to the current Bloom + Vignette + DoF + ColorGrade pass:
- **SSAO** (screen-space ambient occlusion) — adds the contact shadows and crevice darkening that sells "real". Single biggest perceptual jump.
- **God rays** from the sun direction (volumetric light shafts).
- **Tone mapping** switch from `ACESFilmic` to `AgX` (newer, more cinematic; supported in three.js r163+).
- **TAA** (temporal anti-aliasing) replacing SMAA on the cinematic tier — eliminates shimmer on grass and foliage.

## 5. Performance budget — "balanced, looks great everywhere"

Three tiers (already scaffolded in `PostFX.tsx`); refine the budgets:

| Tier | Target | HDRI | Grass | Rocks | SSAO | God rays | DoF | TAA | DPR |
|---|---|---|---|---|---|---|---|---|---|
| Cinematic | desktop GPU | 4K | 8000 blades | 200 | yes | yes | yes | yes | up to 2 |
| Balanced | typical laptop | 2K | 3000 | 80 | yes (half-res) | no | no | SMAA | up to 1.5 |
| Lite | phone | 1K | 0 (texture only) | 30 | no | no | no | SMAA | 1 |

Auto-detection already exists; add a manual override in the existing HUD (cycle button is already there). Persist in `localStorage`.

## 6. Files Touched

**New assets (downloaded at build time, committed)**
- `public/assets/sanctuary/hdri/sky_2k.hdr` + `sky_1k.hdr` (HDRI, two resolutions)
- `public/assets/sanctuary/models/*.glb` (ancient tree, 3 rocks, 2 trees, columns)
- `public/assets/sanctuary/textures/*.{jpg,ktx2}` (ground, bark, grass, marble — KTX2 compressed)

**New components**
- `src/components/platform/sanctuary/Terrain.tsx` — PBR ground with triplanar shader
- `src/components/platform/sanctuary/GrassField.tsx` — instanced wind-shaded grass
- `src/components/platform/sanctuary/RockScatter.tsx` — instanced photoscanned rocks
- `src/components/platform/sanctuary/Water.tsx` — reflective pond
- `src/components/platform/sanctuary/AssetLoader.tsx` — preload + KTX2 + Draco setup

**Edited**
- `src/components/platform/sanctuary/PostFX.tsx` — add SSAO, god rays, AgX tone map, TAA
- `src/components/platform/SanctuaryWorld.tsx` — swap Environment to HDRI, replace procedural ground/rocks/trees with new components, wire AssetLoader, keep all gameplay/quest/zone code untouched

**Dependencies**
- `three-stdlib` (already present via drei) for KTX2Loader + DRACOLoader
- No new npm installs required — everything runs on the existing `@react-three/*` stack

## 7. Out of Scope

- Game logic, quests, zone interactions, avatar movement, routing — all untouched.
- No custom-modeled assets; everything is CC0 from Poly Haven / Ambient CG / Sketchfab CC0.
- No ray tracing, no Nanite, no virtual texturing — none exist on the web platform.
- Other pages (Tree of Life, dashboards) — unchanged.

## Expected Result

Walking into the Sanctuary should feel like stepping into a cinematic stylized world: real golden-hour sunlight bouncing off marble, grass swaying in the wind, water reflecting the sky, photoscanned rocks with believable shading, a soft bloom on every glowing element, and a film grade tying it all together. Roughly the visual register of *Journey* or *Sky: Children of the Light* — the realistic ceiling of what a web browser can render at 60 FPS.

## Honest expectations

- **You will NOT get** PS5-level detail, ray-traced reflections, photoreal humans, or 8K textures (browsers cap practical textures at 2–4K).
- **You WILL get** a scene that looks dramatically better than the current one and reads as "high-end web 3D" rather than "stylized prototype" — the same tier as Bruno Simon's portfolio, Active Theory's award-winning sites, or the Google "I/O" experiences.
- First load will be heavier (~40 MB of assets vs current ~2 MB). Cached after first visit.
- If this still falls short of your vision, the next step would be option 3 — pre-rendered cinematic backgrounds with on-rails movement, which can hit true 8K but loses free-roam.