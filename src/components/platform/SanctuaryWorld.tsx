import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Environment, Html, Sparkles as SceneSparkles } from "@react-three/drei";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Compass,
  Flower2,
  Footprints,
  HandHeart,
  Leaf,
  MoonStar,
  Sparkles,
  Wind,
} from "lucide-react";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { dailyQuests, mainQuests, skillTrees, weeklyQuests } from "./data";

type ZoneKey = "overview" | "herbs" | "energy" | "movement" | "touch" | "spirit";
type Point = { x: number; z: number };

type Zone = {
  key: Exclude<ZoneKey, "overview">;
  label: string;
  tree: string;
  Icon: typeof Leaf;
  position: Point;
  aura: string;
  copy: string;
};

const allQuests = [...dailyQuests, ...weeklyQuests, ...mainQuests];
const START_POSITION: Point = { x: 0, z: 5.8 };
const WALK_RADIUS_X = 8.4;
const WALK_RADIUS_Z = 6.2;

const zones: Zone[] = [
  {
    key: "herbs",
    label: "Herbal Garden",
    tree: "Herbal Wisdom",
    Icon: Leaf,
    position: { x: -6.2, z: 1.2 },
    aura: "bg-earth/20 text-earth border-earth/45",
    copy: "Living terraces for plant allies, tea rituals, and grounded daily nourishment.",
  },
  {
    key: "energy",
    label: "Energy Temple",
    tree: "Energy Mastery",
    Icon: MoonStar,
    position: { x: 0, z: -3.8 },
    aura: "bg-spirit/20 text-spirit border-spirit/45",
    copy: "A marble chamber for breathwork, subtle energy, meditation, and inner radiance.",
  },
  {
    key: "movement",
    label: "Movement Terrace",
    tree: "Movement Arts",
    Icon: Wind,
    position: { x: 6.3, z: 1.1 },
    aura: "bg-air/20 text-air border-air/45",
    copy: "Open-air paths for qigong, yoga, mobility, posture, and graceful strength.",
  },
  {
    key: "touch",
    label: "Healing Springs",
    tree: "Healing Touch",
    Icon: HandHeart,
    position: { x: -3.3, z: 4.1 },
    aura: "bg-fire/20 text-fire border-fire/45",
    copy: "Warm waters and stone basins for acupressure, massage, and hands of light.",
  },
  {
    key: "spirit",
    label: "Spirit Observatory",
    tree: "Mind & Spirit",
    Icon: Flower2,
    position: { x: 3.5, z: 4.1 },
    aura: "bg-water/20 text-water border-water/45",
    copy: "A sky-facing sanctuary for shadow work, emotional clarity, and higher guidance.",
  },
];

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.z - b.z);
}

function clampPosition(point: Point): Point {
  const normalized = point.x ** 2 / WALK_RADIUS_X ** 2 + (point.z - 0.8) ** 2 / WALK_RADIUS_Z ** 2;
  if (normalized <= 1) return point;

  const angle = Math.atan2((point.z - 0.8) / WALK_RADIUS_Z, point.x / WALK_RADIUS_X);
  return {
    x: Math.cos(angle) * WALK_RADIUS_X,
    z: 0.8 + Math.sin(angle) * WALK_RADIUS_Z,
  };
}

export function SanctuaryWorld() {
  const [hasEntered, setHasEntered] = useState(false);
  const [avatarPosition, setAvatarPosition] = useState<Point>(START_POSITION);
  const [targetPosition, setTargetPosition] = useState<Point | null>(null);
  const [manualZone, setManualZone] = useState<ZoneKey>("overview");
  const [isMounted, setIsMounted] = useState(false);
  const keysPressed = useRef(new Set<string>());

  useEffect(() => setIsMounted(true), []);

  const nearbyZone = useMemo(() => zones.find((zone) => distance(zone.position, avatarPosition) < 1.25), [avatarPosition]);
  const activeZone = nearbyZone?.key ?? manualZone;
  const selectedZone = zones.find((zone) => zone.key === activeZone);
  const selectedTree = skillTrees.find((tree) => tree.name === selectedZone?.tree) ?? skillTrees[1];
  const zoneQuests = useMemo(
    () => allQuests.filter((quest) => quest.tree === selectedTree.name).slice(0, 3),
    [selectedTree.name],
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
        event.preventDefault();
        keysPressed.current.add(key);
        setTargetPosition(null);
        setManualZone("overview");
      }
    }

    function handleKeyUp(event: KeyboardEvent) {
      keysPressed.current.delete(event.key.toLowerCase());
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!hasEntered) return;

    let frame = 0;
    let lastTime = performance.now();

    function tick(now: number) {
      const delta = Math.min(32, now - lastTime) / 16.67;
      lastTime = now;

      setAvatarPosition((current) => {
        const keys = keysPressed.current;
        let velocity = { x: 0, z: 0 };

        if (keys.has("arrowleft") || keys.has("a")) velocity.x -= 1;
        if (keys.has("arrowright") || keys.has("d")) velocity.x += 1;
        if (keys.has("arrowup") || keys.has("w")) velocity.z -= 1;
        if (keys.has("arrowdown") || keys.has("s")) velocity.z += 1;

        if (velocity.x || velocity.z) {
          const magnitude = Math.hypot(velocity.x, velocity.z) || 1;
          return clampPosition({
            x: current.x + (velocity.x / magnitude) * 0.085 * delta,
            z: current.z + (velocity.z / magnitude) * 0.085 * delta,
          });
        }

        if (targetPosition) {
          const dx = targetPosition.x - current.x;
          const dz = targetPosition.z - current.z;
          const remaining = Math.hypot(dx, dz);
          if (remaining < 0.08) {
            setTargetPosition(null);
            return current;
          }
          return clampPosition({
            x: current.x + (dx / remaining) * Math.min(remaining, 0.075 * delta),
            z: current.z + (dz / remaining) * Math.min(remaining, 0.075 * delta),
          });
        }

        return current;
      });

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [hasEntered, targetPosition]);

  function walkTo(zone: Zone) {
    setManualZone(zone.key);
    setTargetPosition(zone.position);
  }

  function resetView() {
    setManualZone("overview");
    setTargetPosition(START_POSITION);
  }

  return (
    <section className="sanctuary-world relative min-h-[calc(100vh-5rem)] overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[var(--gradient-sky-sanctuary)]" />
      <div className="sun-rays absolute inset-x-0 top-0 h-[34rem] opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_44%,transparent_0_38%,color-mix(in_oklab,var(--background)_32%,transparent)_94%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl flex-col px-4 pb-5 pt-5 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-[34rem]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">3D Floating Sanctuary</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Walk the temple above the clouds.
            </h1>
          </div>
          {hasEntered ? (
            <button
              onClick={resetView}
              className="sanctuary-panel hidden items-center gap-2 rounded-full border border-border/60 px-4 py-3 text-sm font-semibold text-foreground transition-transform hover:scale-[1.02] sm:inline-flex"
            >
              <Compass className="h-4 w-4 text-primary" /> Arrival Terrace
            </button>
          ) : null}
        </div>

        <div className="relative mt-3 min-h-[35rem] flex-1 overflow-hidden rounded-[2rem] border border-border/35 bg-background/20 shadow-[var(--shadow-aura)] lg:min-h-[40rem]">
          {isMounted ? (
            <Canvas
              className="sanctuary-canvas"
              shadows
              dpr={[1, 1.65]}
              camera={{ position: [0, 9, 16], fov: 45, near: 0.1, far: 120 }}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
              <Suspense fallback={null}>
                <SanctuaryScene
                  hasEntered={hasEntered}
                  avatarPosition={avatarPosition}
                  activeZone={activeZone}
                  onWalkTo={walkTo}
                />
              </Suspense>
            </Canvas>
          ) : (
            <div className="absolute inset-0 grid place-items-center text-muted-foreground">Preparing sanctuary...</div>
          )}

          {!hasEntered ? (
            <div className="absolute inset-0 z-30 grid place-items-center px-4">
              <div className="sanctuary-panel max-w-xl rounded-[2rem] border border-primary/35 p-7 text-center shadow-[var(--shadow-aura)] sm:p-9">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-primary/45 bg-primary/15 shadow-[var(--shadow-glow)]">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <h2 className="mt-5 text-3xl font-bold text-foreground">Enter the Floating Temple</h2>
                <p className="mt-3 text-muted-foreground">
                  Descend through the cloud sea, land at the marble stairs, then explore the sanctuary in third person.
                </p>
                <button
                  onClick={() => setHasEntered(true)}
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]"
                >
                  Begin Landing <Sparkles className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : null}

          {hasEntered ? (
            <>
              <MovementHud />
              <WorldPanel
                activeZone={activeZone}
                selectedZone={selectedZone}
                selectedTree={selectedTree}
                zoneQuests={zoneQuests}
                onBack={resetView}
                onSelect={(key) => {
                  const zone = zones.find((item) => item.key === key);
                  if (zone) walkTo(zone);
                }}
              />
            </>
          ) : null}
        </div>

        {hasEntered ? (
          <div className="sanctuary-panel z-20 mt-4 flex gap-2 overflow-x-auto rounded-full border border-border/60 p-2 scrollbar-none lg:hidden">
            {zones.map((zone) => (
              <button
                key={zone.key}
                onClick={() => walkTo(zone)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${activeZone === zone.key ? "bg-primary text-primary-foreground" : "bg-secondary/70 text-secondary-foreground"}`}
              >
                {zone.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function SanctuaryScene({
  hasEntered,
  avatarPosition,
  activeZone,
  onWalkTo,
}: {
  hasEntered: boolean;
  avatarPosition: Point;
  activeZone: ZoneKey;
  onWalkTo: (zone: Zone) => void;
}) {
  const avatarRef = useRef<THREE.Group>(null);
  const clockRef = useRef(0);

  useFrame(({ camera, clock }) => {
    const elapsed = clock.getElapsedTime();
    clockRef.current = elapsed;

    const avatar = new THREE.Vector3(avatarPosition.x, 0.52, avatarPosition.z);
    const intro = Math.min(1, elapsed / 3.6);
    const eased = 1 - Math.pow(1 - intro, 3);
    const introCamera = new THREE.Vector3(0, 14 - eased * 7.5, 24 - eased * 13);
    const followCamera = new THREE.Vector3(avatarPosition.x, 4.3, avatarPosition.z + 7.2);
    const desiredCamera = hasEntered ? followCamera : introCamera;
    const lookTarget = hasEntered ? avatar.clone().add(new THREE.Vector3(0, 1.05, -1.8)) : new THREE.Vector3(0, 1.6, -1.4);

    camera.position.lerp(desiredCamera, hasEntered ? 0.055 : 0.035);
    camera.lookAt(lookTarget);

    if (avatarRef.current) {
      avatarRef.current.position.lerp(avatar, 0.34);
      avatarRef.current.rotation.y = Math.sin(elapsed * 1.1) * 0.05;
    }
  });

  function handleGroundClick(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    if (!hasEntered) return;
    onWalkTo({ ...zones[0], position: clampPosition({ x: event.point.x, z: event.point.z }) });
  }

  return (
    <>
      <color attach="background" args={["#d7e8fb"]} />
      <fog attach="fog" args={["#d7e8fb", 18, 62]} />
      <ambientLight intensity={1.45} />
      <directionalLight position={[7, 11, 7]} intensity={3.5} castShadow shadow-mapSize={[2048, 2048]} />
      <pointLight position={[0, 5, -4]} intensity={18} color="#ffe5a6" distance={16} />
      <Environment preset="sunset" />
      <SceneSparkles count={90} scale={[18, 7, 18]} size={2.2} speed={0.18} opacity={0.42} color="#fff1ba" />
      <CloudSea />
      <FloatingTempleIsland activeZone={activeZone} onWalkTo={onWalkTo} onGroundClick={handleGroundClick} />
      <PlayerAvatar refObject={avatarRef} />
    </>
  );
}

function FloatingTempleIsland({
  activeZone,
  onWalkTo,
  onGroundClick,
}: {
  activeZone: ZoneKey;
  onWalkTo: (zone: Zone) => void;
  onGroundClick: (event: ThreeEvent<PointerEvent>) => void;
}) {
  return (
    <group>
      <mesh position={[0, -1.65, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <coneGeometry args={[8.8, 5.2, 18, 6]} />
        <meshStandardMaterial color="#8a8173" roughness={0.82} metalness={0.02} />
      </mesh>
      <mesh position={[0, 0, 0]} receiveShadow onClick={onGroundClick}>
        <cylinderGeometry args={[8.7, 8.1, 0.72, 96]} />
        <meshStandardMaterial color="#8cae77" roughness={0.78} />
      </mesh>
      <mesh position={[0, 0.39, 0]} receiveShadow onClick={onGroundClick}>
        <circleGeometry args={[8.25, 96]} />
        <meshStandardMaterial color="#bfc7a4" roughness={0.7} />
      </mesh>

      <GardenTerraces />
      <Temple />
      <Staircase />
      <Waterfalls />
      <CypressGrove />
      <FlowerBeds />
      <QuestPortals activeZone={activeZone} onWalkTo={onWalkTo} />
    </group>
  );
}

function Temple() {
  const columns = Array.from({ length: 8 }, (_, index) => -3.5 + index);

  return (
    <group position={[0, 0.7, -4.2]}>
      <mesh position={[0, 0.13, 0]} receiveShadow castShadow>
        <boxGeometry args={[8.6, 0.28, 4.6]} />
        <meshStandardMaterial color="#f2eadc" roughness={0.42} metalness={0.08} />
      </mesh>
      <mesh position={[0, 2.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[8.2, 3.8, 4.1]} />
        <meshStandardMaterial color="#efe6d8" roughness={0.48} metalness={0.04} transparent opacity={0.96} />
      </mesh>
      <mesh position={[0, 4.3, 0.04]} castShadow>
        <boxGeometry args={[9.1, 0.42, 4.8]} />
        <meshStandardMaterial color="#fff3df" roughness={0.38} metalness={0.08} />
      </mesh>
      <mesh position={[0, 4.78, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <cylinderGeometry args={[3.75, 4.35, 1.15, 4]} />
        <meshStandardMaterial color="#eadcc7" roughness={0.42} metalness={0.08} />
      </mesh>
      <mesh position={[0, 4.95, 2.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0, 1.25, 8.4, 3]} />
        <meshStandardMaterial color="#f8ecd7" roughness={0.4} metalness={0.08} />
      </mesh>
      {columns.map((x) => (
        <group key={x} position={[x, 1.96, 2.32]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.22, 0.26, 3.25, 28]} />
            <meshStandardMaterial color="#fff7ea" roughness={0.34} metalness={0.08} />
          </mesh>
          <mesh position={[0, -1.75, 0]} castShadow>
            <cylinderGeometry args={[0.38, 0.42, 0.22, 28]} />
            <meshStandardMaterial color="#e7d7c3" roughness={0.46} />
          </mesh>
          <mesh position={[0, 1.75, 0]} castShadow>
            <cylinderGeometry args={[0.36, 0.3, 0.18, 28]} />
            <meshStandardMaterial color="#f7ead6" roughness={0.42} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 2.1, 2.06]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 2.3, 0.18]} />
        <meshStandardMaterial color="#352b28" roughness={0.55} transparent opacity={0.52} />
      </mesh>
      <mesh position={[0, 5.52, 2.45]}>
        <torusGeometry args={[0.42, 0.035, 12, 48]} />
        <meshStandardMaterial color="#d8b86b" emissive="#8f6a25" emissiveIntensity={0.25} metalness={0.55} roughness={0.22} />
      </mesh>
    </group>
  );
}

function Staircase() {
  return (
    <group position={[0, 0.58, 0.85]}>
      {Array.from({ length: 14 }).map((_, index) => (
        <mesh key={index} position={[0, index * 0.08, 4.15 - index * 0.46]} receiveShadow castShadow>
          <boxGeometry args={[2.9 + index * 0.18, 0.13, 0.42]} />
          <meshStandardMaterial color={index % 2 ? "#ece2d1" : "#fff4df"} roughness={0.46} metalness={0.04} />
        </mesh>
      ))}
    </group>
  );
}

function GardenTerraces() {
  return (
    <group position={[0, 0.62, 0]}>
      {[
        [-5.8, 1.2, 2.6, 1.1],
        [5.7, 1.1, 2.7, 1.1],
        [-3.6, 4.1, 2.2, 0.9],
        [3.8, 4.1, 2.3, 0.9],
        [-5.1, -2.2, 1.7, 0.8],
        [5.2, -2.25, 1.7, 0.8],
      ].map(([x, z, sx, sz], index) => (
        <mesh key={index} position={[x, 0.05, z]} scale={[sx, 1, sz]} receiveShadow castShadow>
          <cylinderGeometry args={[1, 1.08, 0.34, 48]} />
          <meshStandardMaterial color={index % 2 ? "#87a96f" : "#789a68"} roughness={0.76} />
        </mesh>
      ))}
    </group>
  );
}

function Waterfalls() {
  const falls = [
    [-5.9, 0.6, 5.9, 0.5, 3.8],
    [-2.2, 0.45, 7.1, 0.62, 4.7],
    [2.2, 0.45, 7.1, 0.62, 4.9],
    [5.9, 0.58, 5.9, 0.5, 3.9],
  ];

  return (
    <group>
      {falls.map(([x, y, z, width, height], index) => (
        <group key={index} position={[x, y - height / 2, z]}>
          <mesh rotation={[0, 0, Math.sin(index) * 0.07]}>
            <cylinderGeometry args={[width / 2, width / 3, height, 18, 1, true]} />
            <meshStandardMaterial
              color="#dff8ff"
              emissive="#bfeeff"
              emissiveIntensity={0.42}
              transparent
              opacity={0.54}
              roughness={0.08}
              metalness={0.02}
            />
          </mesh>
          <SceneSparkles count={24} scale={[width * 1.8, height * 0.8, width * 1.8]} size={1.1} speed={0.28} color="#ffffff" opacity={0.5} />
        </group>
      ))}
    </group>
  );
}

function CypressGrove() {
  const trees = [
    [-7.2, -2.5, 1.8],
    [-6.8, 2.8, 1.55],
    [-4.9, -3.4, 1.35],
    [7.1, -2.5, 1.85],
    [6.8, 2.9, 1.5],
    [4.9, -3.4, 1.38],
    [-1.8, -5.4, 1.25],
    [1.8, -5.4, 1.25],
  ];

  return (
    <group>
      {trees.map(([x, z, scale], index) => (
        <group key={index} position={[x, 0.8, z]} scale={[scale, scale, scale]}>
          <mesh position={[0, 0.72, 0]} castShadow>
            <coneGeometry args={[0.42, 2.4, 12]} />
            <meshStandardMaterial color="#40684e" roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.28, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.12, 0.7, 10]} />
            <meshStandardMaterial color="#735c42" roughness={0.72} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function FlowerBeds() {
  const flowers = useMemo(() => {
    const points: Array<[number, number, string, number]> = [];
    const palette = ["#f4a6bd", "#ffd2dc", "#f7c56b", "#f7f0ca", "#c6e6a4"];
    for (let i = 0; i < 92; i += 1) {
      const side = i % 4;
      const baseX = side < 2 ? -5.8 + Math.random() * 2.2 : 3.8 + Math.random() * 2.6;
      const baseZ = side % 2 ? -2.8 + Math.random() * 2.1 : 1.1 + Math.random() * 4;
      points.push([baseX, baseZ, palette[i % palette.length], 0.07 + Math.random() * 0.06]);
    }
    return points;
  }, []);

  return (
    <group>
      {flowers.map(([x, z, color, radius], index) => (
        <mesh key={index} position={[x, 0.95 + radius, z]} castShadow>
          <sphereGeometry args={[radius, 10, 8]} />
          <meshStandardMaterial color={color} roughness={0.58} emissive={color} emissiveIntensity={0.04} />
        </mesh>
      ))}
    </group>
  );
}

function QuestPortals({ activeZone, onWalkTo }: { activeZone: ZoneKey; onWalkTo: (zone: Zone) => void }) {
  return (
    <group>
      {zones.map((zone) => {
        const isActive = activeZone === zone.key;
        return (
          <group key={zone.key} position={[zone.position.x, 1.05, zone.position.z]}>
            <mesh onClick={(event) => { event.stopPropagation(); onWalkTo(zone); }}>
              <torusGeometry args={[0.46, 0.035, 12, 64]} />
              <meshStandardMaterial
                color={isActive ? "#ffe18a" : "#f6d37b"}
                emissive={isActive ? "#ffd36b" : "#8ac7ff"}
                emissiveIntensity={isActive ? 1.4 : 0.58}
                transparent
                opacity={0.92}
              />
            </mesh>
            <mesh position={[0, -0.04, 0]}>
              <cylinderGeometry args={[0.5, 0.5, 0.03, 48]} />
              <meshStandardMaterial color="#fff1bc" emissive="#ffd36b" emissiveIntensity={isActive ? 0.75 : 0.35} transparent opacity={0.62} />
            </mesh>
            <Html center distanceFactor={10} position={[0, 0.86, 0]} className="pointer-events-none hidden lg:block">
              <div className={`rounded-full border px-3 py-1 text-xs font-bold backdrop-blur-xl ${isActive ? "border-primary bg-primary/90 text-primary-foreground" : "border-border/60 bg-background/55 text-foreground"}`}>
                {zone.label}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

function CloudSea() {
  const clouds = useMemo(() => {
    const positions: Array<[number, number, number, number]> = [];
    for (let i = 0; i < 36; i += 1) {
      const angle = (i / 36) * Math.PI * 2;
      const radius = 12 + (i % 7) * 1.8;
      positions.push([Math.cos(angle) * radius, -3.4 - (i % 4) * 0.28, Math.sin(angle) * radius + 2, 2.2 + (i % 5) * 0.42]);
    }
    return positions;
  }, []);

  return (
    <group>
      {clouds.map(([x, y, z, scale], index) => (
        <mesh key={index} position={[x, y, z]} scale={[scale * 1.8, scale * 0.45, scale]}>
          <sphereGeometry args={[1, 20, 12]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.42} roughness={0.95} depthWrite={false} />
        </mesh>
      ))}
      <mesh position={[0, -4.2, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[28, 96]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.22} depthWrite={false} />
      </mesh>
    </group>
  );
}

function PlayerAvatar({ refObject }: { refObject: React.RefObject<THREE.Group | null> }) {
  return (
    <group ref={refObject} position={[START_POSITION.x, 0.52, START_POSITION.z]}>
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.24, 0.3, 0.62, 24]} />
        <meshStandardMaterial color="#f1d37b" emissive="#d3a842" emissiveIntensity={0.16} roughness={0.38} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.72, 0]} castShadow>
        <sphereGeometry args={[0.22, 24, 16]} />
        <meshStandardMaterial color="#fff0c6" roughness={0.32} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.42, 0.04]}>
        <torusGeometry args={[0.45, 0.018, 8, 48]} />
        <meshStandardMaterial color="#fff1a6" emissive="#ffd36b" emissiveIntensity={0.65} transparent opacity={0.64} />
      </mesh>
      <pointLight position={[0, 0.8, 0]} intensity={1.4} color="#ffe7a6" distance={3} />
    </group>
  );
}

function MovementHud() {
  return (
    <div className="sanctuary-panel absolute left-4 top-4 z-30 hidden rounded-2xl border border-border/60 p-3 shadow-[var(--shadow-soft)] md:block">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Footprints className="h-4 w-4 text-primary" /> Move
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1 text-xs font-bold text-muted-foreground">
        <span />
        <kbd className="rounded-md border border-border/50 bg-background/45 px-2 py-1 text-center">W</kbd>
        <span />
        <kbd className="rounded-md border border-border/50 bg-background/45 px-2 py-1 text-center">A</kbd>
        <kbd className="rounded-md border border-border/50 bg-background/45 px-2 py-1 text-center">S</kbd>
        <kbd className="rounded-md border border-border/50 bg-background/45 px-2 py-1 text-center">D</kbd>
      </div>
    </div>
  );
}

function WorldPanel({
  activeZone,
  selectedZone,
  selectedTree,
  zoneQuests,
  onBack,
  onSelect,
}: {
  activeZone: ZoneKey;
  selectedZone?: Zone;
  selectedTree: (typeof skillTrees)[number];
  zoneQuests: typeof allQuests;
  onBack: () => void;
  onSelect: (zone: ZoneKey) => void;
}) {
  if (activeZone === "overview" || !selectedZone) {
    return (
      <aside className="sanctuary-panel absolute bottom-4 left-4 right-4 z-30 rounded-[2rem] border border-border/60 p-5 shadow-[var(--shadow-aura)] lg:bottom-6 lg:left-auto lg:right-6 lg:w-[24rem]">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Arrival Terrace</p>
        <h2 className="mt-2 text-2xl font-bold text-foreground">Move through the marble sanctuary.</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Walk with WASD or tap a glowing destination. Each temple area opens quests that strengthen your skill tree.
        </p>
        <div className="mt-5 grid gap-2">
          {zones.map((zone) => (
            <button
              key={zone.key}
              onClick={() => onSelect(zone.key)}
              className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/35 px-4 py-3 text-left text-sm font-semibold text-foreground transition-colors hover:bg-secondary/60"
            >
              <span>{zone.label}</span>
              <zone.Icon className="h-4 w-4 text-primary" />
            </button>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="sanctuary-panel absolute bottom-4 left-4 right-4 z-30 max-h-[72%] overflow-y-auto rounded-[2rem] border border-border/60 p-5 shadow-[var(--shadow-aura)] lg:bottom-6 lg:left-auto lg:right-6 lg:w-[25rem]">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Arrival Terrace
      </button>
      <div className="flex items-start gap-4">
        <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-[40%] border ${selectedZone.aura}`}>
          <selectedZone.Icon className="h-7 w-7" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{selectedTree.name}</p>
          <h2 className="mt-1 text-2xl font-bold text-foreground">{selectedZone.label}</h2>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{selectedZone.copy}</p>
      <div className="mt-5">
        <div className="flex items-center justify-between text-sm font-semibold text-foreground">
          <span>Level {selectedTree.level}</span>
          <span>{selectedTree.progress}%</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary via-water to-spirit shadow-[var(--shadow-glow)]"
            style={{ width: `${selectedTree.progress}%` }}
          />
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {(zoneQuests.length ? zoneQuests : allQuests.slice(0, 2)).map((quest) => (
          <div key={quest.title} className="rounded-2xl border border-border/60 bg-background/42 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold text-foreground">{quest.title}</p>
              <span className="shrink-0 rounded-full bg-primary/15 px-2 py-1 text-xs font-bold text-primary">
                {quest.xp} XP
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{quest.status}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link
          to="/quests"
          className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)]"
        >
          Quests
        </Link>
        <Link
          to="/skill-trees"
          className="inline-flex items-center justify-center rounded-full border border-border/70 bg-secondary/75 px-4 py-3 text-sm font-bold text-secondary-foreground"
        >
          Skill Tree
        </Link>
      </div>
    </aside>
  );
}
