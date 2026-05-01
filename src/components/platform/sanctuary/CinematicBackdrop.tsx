import { useMemo } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import backdropUrl from "@/assets/sanctuary/sanctuary-backdrop.jpg";

/**
 * Curved cylindrical matte-painting backdrop.
 * Sits at a large radius so it reads as infinite distance.
 * MeshBasicMaterial means the painting is the lighting — no per-frame cost.
 *
 * The image is mapped only across the camera-facing half so the back side
 * (which the avatar can't see from default angles) doesn't show a stretched copy.
 */
export function CinematicBackdrop() {
  const texture = useTexture(backdropUrl);

  // The texture is a wide painting; we want it to cover ~270° so it stays
  // visible even when the camera pans, but center it behind the temple.
  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <group>
      {/* Main curved backdrop — open-ended cylinder covering 270° behind the action */}
      <mesh position={[0, 6, 0]} rotation={[0, Math.PI, 0]} renderOrder={-10}>
        <cylinderGeometry
          args={[
            70, // radiusTop
            70, // radiusBottom
            60, // height
            96, // radial segments — high for smooth curve at this distance
            1, // height segments
            true, // openEnded
            -Math.PI * 0.75, // thetaStart — start of the arc (centered behind temple)
            Math.PI * 1.5, // thetaLength — 270° of coverage
          ]}
        />
        <meshBasicMaterial
          map={texture}
          side={THREE.BackSide}
          toneMapped={true}
          depthWrite={false}
          fog={false}
        />
      </mesh>

      {/* Soft horizon fade — a thin band of warm light at the bottom of the painting
          to blend the backdrop into the cloud sea below the island */}
      <mesh position={[0, -8, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={-9}>
        <ringGeometry args={[18, 70, 96]} />
        <meshBasicMaterial
          color="#fde6c2"
          transparent
          opacity={0.5}
          depthWrite={false}
          fog={false}
        />
      </mesh>
    </group>
  );
}
