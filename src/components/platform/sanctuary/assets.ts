/**
 * Asset URLs for the cinematic Sanctuary upgrade.
 * CC0 assets from Poly Haven (HDRI + PBR textures).
 * Imported through Vite so the build pipeline fingerprints and serves them.
 */

import sky2k from "@/assets/sanctuary/hdri/sky_2k.hdr?url";
import sky1k from "@/assets/sanctuary/hdri/sky_1k.hdr?url";

import groundDiff from "@/assets/sanctuary/textures/ground_diff.jpg";
import groundNor from "@/assets/sanctuary/textures/ground_nor.jpg";
import groundRough from "@/assets/sanctuary/textures/ground_rough.jpg";

import marbleDiff from "@/assets/sanctuary/textures/marble_diff.jpg";
import marbleNor from "@/assets/sanctuary/textures/marble_nor.jpg";
import marbleRough from "@/assets/sanctuary/textures/marble_rough.jpg";

import waterNor from "@/assets/sanctuary/textures/water_nor.jpg";

export const sanctuaryAssets = {
  hdri: {
    high: sky2k,
    low: sky1k,
  },
  ground: {
    diff: groundDiff,
    normal: groundNor,
    rough: groundRough,
  },
  marble: {
    diff: marbleDiff,
    normal: marbleNor,
    rough: marbleRough,
  },
  water: {
    normal: waterNor,
  },
} as const;
