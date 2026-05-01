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
        intensity={isCinematic ? 0.95 : 0.6}
        luminanceThreshold={0.78}
        luminanceSmoothing={0.32}
        mipmapBlur
        kernelSize={isCinematic ? KernelSize.LARGE : KernelSize.MEDIUM}
      />
      {isCinematic ? (
        <DepthOfField
          focusDistance={0.018}
          focalLength={0.045}
          bokehScale={2.4}
          height={480}
        />
      ) : (
        <Fragment />
      )}
      <HueSaturation hue={0} saturation={isCinematic ? 0.14 : 0.07} />
      <BrightnessContrast brightness={0.02} contrast={isCinematic ? 0.1 : 0.05} />
      <Vignette
        offset={0.32}
        darkness={isCinematic ? 0.55 : 0.4}
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
