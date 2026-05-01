import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type ReactElement } from "react";
import * as THREE from "three";
import type { QualityTier } from "./PostFX";

const VERT = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying float vY;
  void main() {
    vUv = uv;
    vec3 transformed = position;
    float h = max(0.0, position.y);
    // sway uses instance translation as a per-blade phase offset
    float px = instanceMatrix[3][0];
    float pz = instanceMatrix[3][2];
    float sway = sin(uTime * 1.6 + px * 0.7 + pz * 0.5) * 0.18 * h;
    transformed.x += sway;
    transformed.z += cos(uTime * 1.3 + pz * 0.6) * 0.09 * h;
    vY = h;
    vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAG = /* glsl */ `
  varying vec2 vUv;
  varying float vY;
  void main() {
    vec3 root = vec3(0.30, 0.42, 0.18);
    vec3 tip  = vec3(0.78, 0.86, 0.42);
    vec3 col = mix(root, tip, clamp(vY / 0.55, 0.0, 1.0));
    float edge = smoothstep(0.0, 0.18, vUv.x) * smoothstep(1.0, 0.82, vUv.x);
    if (edge < 0.05) discard;
    gl_FragColor = vec4(col, 1.0);
  }
`;

type Props = { tier: QualityTier };

/**
 * Instanced grass field scattered across the central walkable disc.
 * Cheap, transformative — biggest "real" upgrade after the HDRI swap.
 */
export function GrassField({ tier }: Props): ReactElement | null {
  const count = tier === "cinematic" ? 6000 : tier === "balanced" ? 2400 : 0;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(0.08, 0.55, 1, 4);
    geo.translate(0, 0.27, 0);
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      side: THREE.DoubleSide,
      uniforms: { uTime: { value: 0 } },
    });
    return { geometry: geo, material: mat };
  }, []);

  useEffect(() => {
    if (!meshRef.current || count === 0) return;
    const dummy = new THREE.Object3D();
    let placed = 0;
    let safety = 0;
    while (placed < count && safety < count * 20) {
      safety++;
      const r = Math.sqrt(Math.random()) * 13.6;
      const a = Math.random() * Math.PI * 2;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r - 0.1;
      // Skip stairs lane and central temple area
      if (Math.abs(x) < 4 && z < -0.25 && z > -10.5) continue;
      if (Math.abs(x) < 3.8 && z > -0.3 && z < 7.6) continue;
      dummy.position.set(x, 0.43, z);
      dummy.rotation.y = Math.random() * Math.PI * 2;
      const s = 0.8 + Math.random() * 0.7;
      dummy.scale.set(s, 0.7 + Math.random() * 0.8, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(placed, dummy.matrix);
      placed++;
    }
    meshRef.current.count = placed;
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  if (count === 0) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      frustumCulled
      raycast={() => null}
    />
  );
}
