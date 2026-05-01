import { MeshReflectorMaterial, useTexture } from "@react-three/drei";
import { useMemo, type ReactElement } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { sanctuaryAssets } from "./assets";
import type { QualityTier } from "./PostFX";

type Props = {
  position?: [number, number, number];
  size?: [number, number];
  tier: QualityTier;
};

/**
 * Reflective spring pond near the Healing Springs zone. Uses drei's
 * MeshReflectorMaterial for real-time SSR, modulated by a scrolling normal.
 */
export function ReflectivePond({
  position = [-6.85, 0.7, 5.75],
  size = [3.2, 2.4],
  tier,
}: Props): ReactElement {
  const normal = useTexture(sanctuaryAssets.water.normal);
  const matRef = useRef<THREE.Material & { normalScale?: THREE.Vector2 }>(null);

  useMemo(() => {
    normal.wrapS = THREE.RepeatWrapping;
    normal.wrapT = THREE.RepeatWrapping;
    normal.repeat.set(2, 2);
    normal.anisotropy = 4;
  }, [normal]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    normal.offset.set(t * 0.04, t * 0.03);
  });

  const resolution = tier === "cinematic" ? 1024 : tier === "balanced" ? 512 : 256;
  const blur: [number, number] = tier === "lite" ? [400, 100] : [200, 50];

  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      raycast={() => null}
    >
      <planeGeometry args={size} />
      <MeshReflectorMaterial
        ref={matRef as never}
        blur={blur}
        resolution={resolution}
        mixBlur={1}
        mixStrength={tier === "lite" ? 0.6 : 1.4}
        roughness={0.3}
        depthScale={1.1}
        minDepthThreshold={0.2}
        maxDepthThreshold={1.4}
        color="#8fb4c8"
        metalness={0.7}
        normalMap={normal}
        normalScale={new THREE.Vector2(0.35, 0.35)}
      />
    </mesh>
  );
}
