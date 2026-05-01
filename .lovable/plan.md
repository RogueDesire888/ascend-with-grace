## The bug

The Sanctuary crashes with `Could not load /assets/sanctuary/hdri/sky_1k.hdr ... 404` because I placed the HDRI and PBR texture files in `/public/assets/sanctuary/`, but this TanStack Start + Cloudflare Workers template does **not** serve a `/public/` folder as static assets the way standard Vite does. Every other asset in the project (skybox, horizon, tree-of-life, etc.) lives in `src/assets/` and is imported through Vite, which fingerprints and bundles it.

The error boundary then catches the failed asset load and shows "Something went wrong" — blocking the whole Sanctuary page.

## Fix

Move all the new sanctuary assets from `public/assets/sanctuary/` into `src/assets/sanctuary/`, and update the loader code to **import** them as Vite URL modules instead of referencing hard-coded `/assets/...` paths.

### Steps

1. **Move files** from `public/assets/sanctuary/` → `src/assets/sanctuary/`:
   - `hdri/sky_1k.hdr`, `hdri/sky_2k.hdr`
   - `textures/ground_diff.jpg`, `ground_nor.jpg`, `ground_rough.jpg`
   - `textures/marble_diff.jpg`, `marble_nor.jpg`, `marble_rough.jpg`
   - `textures/water_nor.jpg`
   - Then delete the now-empty `public/assets/sanctuary/` tree.

2. **Rewrite `src/components/platform/sanctuary/assets.ts`** to use ES imports so Vite emits the files into the build:
   ```ts
   import sky2k from "@/assets/sanctuary/hdri/sky_2k.hdr?url";
   import sky1k from "@/assets/sanctuary/hdri/sky_1k.hdr?url";
   import groundDiff from "@/assets/sanctuary/textures/ground_diff.jpg";
   // ...etc
   export const sanctuaryAssets = { hdri: { high: sky2k, low: sky1k }, ... };
   ```
   The `.hdr` files use the `?url` suffix because Vite doesn't have a default loader for HDR.

3. **No code changes needed** in `SanctuaryWorld.tsx`, `GroundOverlay.tsx`, `ReflectivePond.tsx` — they already consume `sanctuaryAssets.hdri.high`, `sanctuaryAssets.ground.diff`, etc., so swapping the values inside `assets.ts` is all that's required.

4. **Verify** by reloading `/sanctuary` — the page should render again, the HDRI should light the scene, and ground/water textures should load.

### Files touched

- Move: 7 asset files into `src/assets/sanctuary/{hdri,textures}/`
- Edit: `src/components/platform/sanctuary/assets.ts`
- Delete: `public/assets/sanctuary/` directory tree

### Why this works

Every other working asset on this page (`sanctuary-skybox.jpg`, `tree-of-life.jpg`) follows this same pattern. Vite handles `.hdr` files fine when imported with `?url`, and `useTexture`/`<Environment files=...>` accept a string URL — they don't care whether it's a hashed Vite URL or a raw path.

### Out of scope

Not changing any visual settings, lighting, post-FX, grass, or geometry — only relocating files so they actually load.