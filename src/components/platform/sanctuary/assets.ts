/**
 * Asset URLs for the cinematic Sanctuary upgrade.
 * All assets are CC0 from Poly Haven (HDRI + PBR textures).
 * Files live in /public/assets/sanctuary/ so they're served as static URLs.
 */

export const sanctuaryAssets = {
  hdri: {
    high: "/assets/sanctuary/hdri/sky_2k.hdr",
    low: "/assets/sanctuary/hdri/sky_1k.hdr",
  },
  ground: {
    diff: "/assets/sanctuary/textures/ground_diff.jpg",
    normal: "/assets/sanctuary/textures/ground_nor.jpg",
    rough: "/assets/sanctuary/textures/ground_rough.jpg",
  },
  marble: {
    diff: "/assets/sanctuary/textures/marble_diff.jpg",
    normal: "/assets/sanctuary/textures/marble_nor.jpg",
    rough: "/assets/sanctuary/textures/marble_rough.jpg",
  },
  water: {
    normal: "/assets/sanctuary/textures/water_nor.jpg",
  },
} as const;
