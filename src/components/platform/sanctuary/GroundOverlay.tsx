import { useTexture } from "@react-three/drei";
import { useMemo, type ReactElement } from "react";
import * as THREE from "three";
import { sanctuaryAssets } from "./assets";

/**
 * Photoreal PBR ground overlay. Sits just above the existing green disc
 * to give the walkable surface real material response under HDRI lighting.
 * Uses triplanar-feeling tiled detail via repeating UVs.
 */
export function GroundOverlay(): ReactElement {
  const [diff, normal, rough] = useTexture([
    sanctuaryAssets.ground.diff,
    sanctuaryAssets.ground.normal,
    sanctuaryAssets.ground.rough,
  ]);

  useMemo(() => {
    [diff, normal, rough].forEach((t) => {
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(8, 8);
      t.anisotropy = 8;
    });
    diff.colorSpace = THREE.SRGBColorSpace;
  }, [diff, normal, rough]);

  return (
    <mesh
      position={[0, 0.43, -0.1]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      raycast={() => null}
    >
      <circleGeometry args={[14.4, 160]} />
      <meshStandardMaterial
        map={diff}
        normalMap={normal}
        roughnessMap={rough}
        roughness={1}
        metalness={0}
        color="#cdd9b4"
        normalScale={new THREE.Vector2(0.7, 0.7)}
        transparent
        opacity={0.92}
        polygonOffset
        polygonOffsetFactor={-1}
      />
    </mesh>
  );
}
