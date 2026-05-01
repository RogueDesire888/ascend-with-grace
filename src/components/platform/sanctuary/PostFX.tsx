import { EffectComposer, Bloom, Vignette, DepthOfField, SMAA, BrightnessContrast, HueSaturation } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import { Fragment } from "react";

export type QualityTier = "cinematic" | "balanced" | "lite";

type Props = { tier: QualityTier };

/**
 * Cinematic post-processing pass for the Sanctuary.
 * Adds golden-hour bloom, vignette, gentle DoF and a warm color grade.
 * Quality tier controls which effects run.
 */
export function SanctuaryPostFX({ tier }: Props): JSX.Element | null {
  if (tier === "lite") return null;

  const isCinematic = tier === "cinematic";

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <SMAA />
      <Bloom
        intensity={isCinematic ? 0.85 : 0.55}
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
      <HueSaturation hue={0} saturation={isCinematic ? 0.12 : 0.06} />
      <BrightnessContrast brightness={0.02} contrast={isCinematic ? 0.08 : 0.04} />
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
