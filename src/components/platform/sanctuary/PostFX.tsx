import {
  EffectComposer,
  Bloom,
  Vignette,
  DepthOfField,
  SMAA,
  BrightnessContrast,
  HueSaturation,
  SSAO,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import { Fragment, type ReactElement } from "react";

export type QualityTier = "cinematic" | "balanced" | "lite";

type Props = { tier: QualityTier };

/**
 * Cinematic post-processing pass for the Sanctuary.
 * - SSAO adds the contact darkening that sells "real"
 * - Bloom + golden grade for the sunset mood
 * - DoF (cinematic only) softens the distant horizon
 */
export function SanctuaryPostFX({ tier }: Props): ReactElement | null {
  if (tier === "lite") return null;

  const isCinematic = tier === "cinematic";

  return (
    <EffectComposer multisampling={0} enableNormalPass>
      <SMAA />
      <SSAO
        blendFunction={BlendFunction.MULTIPLY}
        samples={isCinematic ? 24 : 12}
        radius={isCinematic ? 0.18 : 0.14}
        intensity={isCinematic ? 22 : 14}
        luminanceInfluence={0.6}
        bias={0.04}
        worldDistanceThreshold={20}
        worldDistanceFalloff={2}
        worldProximityThreshold={6}
        worldProximityFalloff={1}
      />
      <Bloom
        intensity={isCinematic ? 1.15 : 0.75}
        luminanceThreshold={0.7}
        luminanceSmoothing={0.4}
        mipmapBlur
        kernelSize={isCinematic ? KernelSize.LARGE : KernelSize.MEDIUM}
      />
      {isCinematic ? (
        <DepthOfField
          focusDistance={0.04}
          focalLength={0.08}
          bokehScale={1.2}
          height={480}
        />
      ) : (
        <Fragment />
      )}
      {/* Warm golden-hour grade — pulls everything toward the backdrop's color story */}
      <HueSaturation hue={0.02} saturation={isCinematic ? 0.18 : 0.12} />
      <BrightnessContrast brightness={0.04} contrast={isCinematic ? 0.14 : 0.08} />
      <Vignette
        offset={0.28}
        darkness={isCinematic ? 0.6 : 0.45}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}

/** Detect a sensible default tier for the current device. */
export function detectDefaultTier(): QualityTier {
  if (typeof window === "undefined") return "balanced";
  const ua = navigator.userAgent || "";
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
  const cores = navigator.hardwareConcurrency ?? 4;
  const dpr = window.devicePixelRatio ?? 1;
  if (isMobile) return cores >= 6 ? "balanced" : "lite";
  if (cores >= 8 && dpr <= 2) return "cinematic";
  if (cores >= 4) return "balanced";
  return "lite";
}
