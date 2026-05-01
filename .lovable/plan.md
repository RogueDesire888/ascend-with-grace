## The honest truth first

Image 2 is a **single AI-generated still image** — no polygon budget, no shader cost, no 60fps requirement. It looks the way it does because nothing has to move or respond to input.

Image 1 is a **real-time interactive 3D world** rendering 60 frames per second in your browser, on whatever device the user has. Everything you see is built from spheres, cones, cylinders and boxes that respond to camera movement, the avatar, and clicks.

We can absolutely close most of the gap, but the *only* way to literally match image 2 is to give up real-time 3D and use the still image as a backdrop. So the real question is **how much interactivity to trade for fidelity**. There are three honest paths.

---

## Path A — "Cinematic still backdrop" (matches image 2 best, ~95% match)

Use image 2 itself (or a new generation in the same style) as a giant pre-rendered 3D backdrop. Keep the avatar, the staircase, and the temple interior as real 3D so the user can still walk and click. Everything in the distance — the floating island, waterfalls, gardens, fountain, sky — becomes the painted background.

**Tradeoff**: The world stops responding to camera angle in the distance. You can't walk *around* the temple — only into it. Looks stunning, performs perfectly, but feels more like a stage set than a world.

**Effort**: Small. ~2-3 hours of work.

## Path B — "Hero asset replacement" (target ~70% of image 2's quality, fully 3D)

Replace the cartoon primitives with real photoscanned 3D models from Sketchfab/Quixel free libraries:
- Greek temple GLB model (replaces the box+cylinder Parthenon)
- Marble fountain GLB (new — currently doesn't exist)
- Cypress tree GLB ×8-12 (replaces the green cones)
- Marble statue GLB ×4 (new)
- Rose bush GLB ×30+ instanced (replaces the candy decorations)
- Floating rock formation GLB (replaces the cone island)
- Animated waterfall plane shader (replaces current waterfall geometry)

Plus a much better cloud sky (procedural volumetric clouds or a true cubemap), and re-tune the existing post-FX (bloom, DoF, SSAO, color grading) for golden-hour cinematic look.

**Tradeoff**: ~30-50MB asset budget. Initial load goes from ~2s to ~8-12s. Mobile performance drops (the quality toggle handles this — mobile gets a stripped version). Still won't match image 2's photoreal lighting, but will look like a real game environment instead of a toy diorama.

**Effort**: Large. ~1-2 days of work. Requires sourcing 6-10 free GLB models that match the aesthetic.

## Path C — "Hybrid" (recommended, ~85% match)

Combine the two: pre-rendered cinematic backdrop for everything past the staircase + the floating island silhouette + the sky, but replace the **temple itself, the trees flanking the stairs, and the fountain** with real 3D GLB assets. The avatar walks through real geometry; the distant world is painted.

This is how most modern games handle distant scenery (Genshin Impact, Zelda BOTW skyboxes, Unreal "matte paintings"). It's the trick image 2 is implicitly using anyway — it has zero interactivity.

**Tradeoff**: Distant world doesn't parallax much. Closer foreground gets full PS3-era fidelity, not PS5. But it'll look like image 2 from the default camera angle.

**Effort**: Medium. ~half a day. Combines best of both paths.

---

## What I'd recommend

Path C. The Sanctuary is mostly viewed from one camera angle anyway (the avatar walks toward the temple), so a painted backdrop is "free" visual quality. Then we spend our 3D budget on the foreground hero assets that the camera actually gets close to.

Specifically:
1. Generate a new high-res sky+island+distant-temple backdrop in image 2's style and use it as a curved billboard 80m behind the action
2. Source a free Greek temple GLB, marble fountain GLB, cypress tree GLB, rose bush GLB from Poly Haven / Sketchfab CC0
3. Replace the 6 worst-looking primitive sets in `SanctuaryWorld.tsx` (temple columns, cone trees, candy decorations, fountain, statues if any, hanging gardens) with instanced GLB models
4. Re-tune `PostFX.tsx` for warm golden-hour grading + stronger atmospheric haze to match image 2's color story
5. Mobile/Lite tier keeps current geometry, only desktop gets the new GLBs

---

## Need from you before I start

**1. Which path?** A (fast & gorgeous but on-rails) / B (fully 3D, big effort, ~70% match) / C (recommended hybrid, ~85% match)

**2. For the backdrop**: should I use the exact image you uploaded (image 2), or generate a new one tuned to match the temple's actual on-screen position and lighting?

**3. Performance priority**: keep the current "looks great everywhere" balance, or accept that desktop will be the hero target and mobile gets a noticeably stripped-down version?