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
  Volume2,
  VolumeX,
  Wind,
} from "lucide-react";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import * as THREE from "three";
import { dailyQuests, mainQuests, skillTrees, weeklyQuests } from "./data";
import floatingTempleSanctuary from "@/assets/floating-temple-sanctuary.png";

type ZoneKey = "overview" | "herbs" | "energy" | "movement" | "touch" | "spirit";
type Point = { x: number; z: number };
type Quest = (typeof allQuests)[number];
type Celebration = { id: number; xp: number; leveledUp: boolean };

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
const WALK_RADIUS_X = 8.85;
const WALK_RADIUS_Z = 7.05;
const WALK_CENTER_Z = 0.45;
const SURFACE_Y = 0.44;
const WALKABLE_RECTS = [
  { x: 0, z: 4.35, hx: 5.4, hz: 2.65 },
  { x: 0, z: 1.3, hx: 2.9, hz: 4.35 },
  { x: 0, z: -2.5, hx: 5.85, hz: 1.8 },
  { x: 0, z: -4.65, hx: 3.55, hz: 1.85 },
  { x: -5.75, z: 0.15, hx: 2.45, hz: 3.35 },
  { x: 5.75, z: 0.15, hx: 2.45, hz: 3.35 },
] as const;

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
  if (isWalkable(point)) return point;

  const normalized =
    point.x ** 2 / WALK_RADIUS_X ** 2 + (point.z - WALK_CENTER_Z) ** 2 / WALK_RADIUS_Z ** 2;
  const angle = Math.atan2((point.z - WALK_CENTER_Z) / WALK_RADIUS_Z, point.x / WALK_RADIUS_X);
  const ellipsePoint = {
    x: Math.cos(angle) * WALK_RADIUS_X,
    z: WALK_CENTER_Z + Math.sin(angle) * WALK_RADIUS_Z,
  };
  const rectPoints = WALKABLE_RECTS.map((area) => ({
    x: Math.min(area.x + area.hx, Math.max(area.x - area.hx, point.x)),
    z: Math.min(area.z + area.hz, Math.max(area.z - area.hz, point.z)),
  }));
  return [ellipsePoint, ...rectPoints].sort((a, b) => distance(a, point) - distance(b, point))[0];
}

function isWalkable(point: Point) {
  const inEllipse =
    point.x ** 2 / WALK_RADIUS_X ** 2 + (point.z - WALK_CENTER_Z) ** 2 / WALK_RADIUS_Z ** 2 <= 1;
  const inRect = WALKABLE_RECTS.some(
    (area) => Math.abs(point.x - area.x) <= area.hx && Math.abs(point.z - area.z) <= area.hz,
  );
  return inEllipse || inRect;
}

function isInTempleInterior(point: Point) {
  return Math.abs(point.x) < 2.85 && point.z < -3.05 && point.z > -6.15;
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function getTerrainHeight(point: Point) {
  const stairLane = Math.abs(point.x) < 2.55 && point.z <= 5.15 && point.z >= -1.45;
  if (stairLane) {
    const stairProgress = clamp01((5.15 - point.z) / 6.6);
    return SURFACE_Y + stairProgress * 1.04;
  }

  const templeTerrace = Math.abs(point.x) < 5.35 && point.z < -1.45 && point.z > -5.75;
  if (templeTerrace) return SURFACE_Y + 1.08;

  if (isInTempleInterior(point)) return SURFACE_Y + 1.12;

  const sideTerrace =
    Math.abs(point.x) > 4.25 && Math.abs(point.x) < 7.15 && point.z > -2.85 && point.z < 2.6;
  if (sideTerrace) return SURFACE_Y + 0.24;

  const springTerrace = Math.abs(point.x) < 5.25 && point.z > 3.45;
  if (springTerrace) return SURFACE_Y + 0.18;

  return SURFACE_Y;
}

function getAvatarWorldPosition(point: Point) {
  return new THREE.Vector3(point.x, getTerrainHeight(point) + 0.13, point.z);
}

export function SanctuaryWorld() {
  const [hasEntered, setHasEntered] = useState(false);
  const [avatarPosition, setAvatarPosition] = useState<Point>(START_POSITION);
  const [targetPosition, setTargetPosition] = useState<Point | null>(null);
  const [manualZone, setManualZone] = useState<ZoneKey>("overview");
  const [isMounted, setIsMounted] = useState(false);
  const [isArrivalMenuOpen, setIsArrivalMenuOpen] = useState(false);
  const [completedQuests, setCompletedQuests] = useState<Set<string>>(() => new Set());
  const [ascensionLevel, setAscensionLevel] = useState(24);
  const [glowEarned, setGlowEarned] = useState(8700);
  const [celebration, setCelebration] = useState<Celebration | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const keysPressed = useRef(new Set<string>());
  const lastAvatarPosition = useRef<Point>(START_POSITION);
  const avatarDirection = useRef(0);

  useEffect(() => setIsMounted(true), []);

  const nearbyZone = useMemo(
    () => zones.find((zone) => distance(zone.position, avatarPosition) < 1.25),
    [avatarPosition],
  );
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
        setIsArrivalMenuOpen(false);
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
        const velocity = { x: 0, z: 0 };

        if (keys.has("arrowleft") || keys.has("a")) velocity.x -= 1;
        if (keys.has("arrowright") || keys.has("d")) velocity.x += 1;
        if (keys.has("arrowup") || keys.has("w")) velocity.z -= 1;
        if (keys.has("arrowdown") || keys.has("s")) velocity.z += 1;

        if (velocity.x || velocity.z) {
          const magnitude = Math.hypot(velocity.x, velocity.z) || 1;
          const nextPosition = clampPosition({
            x: current.x + (velocity.x / magnitude) * 0.085 * delta,
            z: current.z + (velocity.z / magnitude) * 0.085 * delta,
          });
          lastAvatarPosition.current = current;
          avatarDirection.current = Math.atan2(
            nextPosition.x - current.x,
            nextPosition.z - current.z,
          );
          return nextPosition;
        }

        if (targetPosition) {
          const dx = targetPosition.x - current.x;
          const dz = targetPosition.z - current.z;
          const remaining = Math.hypot(dx, dz);
          if (remaining < 0.08) {
            setTargetPosition(null);
            return current;
          }
          const nextPosition = clampPosition({
            x: current.x + (dx / remaining) * Math.min(remaining, 0.075 * delta),
            z: current.z + (dz / remaining) * Math.min(remaining, 0.075 * delta),
          });
          lastAvatarPosition.current = current;
          avatarDirection.current = Math.atan2(
            nextPosition.x - current.x,
            nextPosition.z - current.z,
          );
          return nextPosition;
        }

        return current;
      });

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [hasEntered, targetPosition]);

  function playAscensionCue(leveledUp: boolean) {
    if (isMuted || typeof window === "undefined") return;

    const AudioCtor =
      window.AudioContext ??
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;

    const context = audioContextRef.current ?? new AudioCtor();
    audioContextRef.current = context;

    const now = context.currentTime;
    const notes = leveledUp ? [523.25, 659.25, 783.99, 1046.5] : [392, 523.25, 659.25];

    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, now + index * 0.08);
      gain.gain.setValueAtTime(0.0001, now + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.12, now + index * 0.08 + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.42);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now + index * 0.08);
      oscillator.stop(now + index * 0.08 + 0.46);
    });
  }

  function completeQuest(quest: Quest) {
    if (completedQuests.has(quest.title)) return;

    const nextGlow = glowEarned + quest.xp;
    const leveledUp = Math.floor(nextGlow / 500) > Math.floor(glowEarned / 500);
    setCompletedQuests((current) => new Set(current).add(quest.title));
    setGlowEarned(nextGlow);
    if (leveledUp) setAscensionLevel((level) => level + 1);
    setCelebration({ id: Date.now(), xp: quest.xp, leveledUp });
    playAscensionCue(leveledUp);
    window.setTimeout(() => setCelebration(null), 2600);
  }

  function walkTo(zone: Zone) {
    setManualZone(zone.key);
    setTargetPosition(zone.position);
    setIsArrivalMenuOpen(false);
  }

  function resetView() {
    setManualZone("overview");
    setTargetPosition(START_POSITION);
    setIsArrivalMenuOpen(false);
  }

  return (
    <section className="sanctuary-world relative min-h-[calc(100vh-5rem)] overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[var(--gradient-sky-sanctuary)]" />
      <div className="sun-rays absolute inset-x-0 top-0 h-[34rem] opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_44%,transparent_0_38%,color-mix(in_oklab,var(--background)_32%,transparent)_94%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl flex-col px-4 pb-5 pt-5 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-[34rem]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
              3D Floating Sanctuary
            </p>
            <h1 className="mt-2 text-3xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Walk the temple above the clouds.
            </h1>
          </div>
          {hasEntered ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsArrivalMenuOpen((open) => !open)}
                className="sanctuary-panel inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-3 text-sm font-semibold text-foreground transition-transform hover:scale-[1.02]"
              >
                <Compass className="h-4 w-4 text-primary" /> Arrival Terrace
              </button>
              {isArrivalMenuOpen ? (
                <ArrivalTerraceMenu
                  onReset={resetView}
                  onSelect={walkTo}
                  onClose={() => setIsArrivalMenuOpen(false)}
                />
              ) : null}
            </div>
          ) : null}
        </div>

        <div
          className={`relative mt-3 min-h-[35rem] flex-1 overflow-hidden rounded-[2rem] border border-primary/25 bg-background/10 shadow-[var(--shadow-aura)] lg:min-h-[40rem] ${celebration ? "ascension-celebrating" : ""}`}
        >
          <img
            src={floatingTempleSanctuary}
            alt="Floating marble temple sanctuary above luminous clouds"
            className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform,filter] duration-[1800ms] ${hasEntered ? "scale-105 opacity-48 blur-[1px]" : "scale-100 opacity-100 blur-0"}`}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--foreground)_8%,transparent),color-mix(in_oklab,var(--background)_10%,transparent)_42%,color-mix(in_oklab,var(--background)_22%,transparent))]" />
          {isMounted ? (
            <Canvas
              className="sanctuary-canvas"
              shadows
              dpr={[1, 1.65]}
              camera={{ position: [0, 9, 18], fov: 42, near: 0.1, far: 120 }}
              style={{ opacity: hasEntered ? 0.94 : 0.2 }}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
              <Suspense fallback={null}>
                <SanctuaryScene
                  hasEntered={hasEntered}
                  avatarPosition={avatarPosition}
                  avatarDirection={avatarDirection.current}
                  activeZone={activeZone}
                  onWalkTo={walkTo}
                  onMoveTo={(point) => {
                    setManualZone("overview");
                    setTargetPosition(point);
                  }}
                />
              </Suspense>
            </Canvas>
          ) : (
            <div className="absolute inset-0 grid place-items-center text-muted-foreground">
              Preparing sanctuary...
            </div>
          )}

          {celebration ? (
            <AscensionVfx celebration={celebration} ascensionLevel={ascensionLevel} />
          ) : null}

          {!hasEntered ? (
            <div className="absolute inset-0 z-30 grid place-items-center px-4">
              <div className="sanctuary-panel max-w-xl rounded-[2rem] border border-primary/35 p-7 text-center shadow-[var(--shadow-aura)] sm:p-9">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-primary/45 bg-primary/15 shadow-[var(--shadow-glow)]">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <h2 className="mt-5 text-3xl font-bold text-foreground">
                  Enter the Floating Temple
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Descend through the cloud sea, land at the marble stairs, then explore the
                  sanctuary in third person.
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
              <MovementHud
                ascensionLevel={ascensionLevel}
                glowEarned={glowEarned}
                isMuted={isMuted}
                onToggleMute={() => setIsMuted((muted) => !muted)}
              />
              <WorldPanel
                activeZone={activeZone}
                selectedZone={selectedZone}
                selectedTree={selectedTree}
                zoneQuests={zoneQuests}
                onBack={resetView}
                completedQuests={completedQuests}
                onCompleteQuest={completeQuest}
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
  avatarDirection,
  activeZone,
  onWalkTo,
  onMoveTo,
}: {
  hasEntered: boolean;
  avatarPosition: Point;
  avatarDirection: number;
  activeZone: ZoneKey;
  onWalkTo: (zone: Zone) => void;
  onMoveTo: (point: Point) => void;
}) {
  const avatarRef = useRef<THREE.Group>(null);
  const clockRef = useRef(0);

  useFrame(({ camera, clock }) => {
    const elapsed = clock.getElapsedTime();
    clockRef.current = elapsed;

    const avatar = getAvatarWorldPosition(avatarPosition);
    const intro = Math.min(1, elapsed / 3.6);
    const eased = 1 - Math.pow(1 - intro, 3);
    const introCamera = new THREE.Vector3(0, 13.5 - eased * 6.1, 24 - eased * 10.2);
    const followCamera = new THREE.Vector3(
      avatarPosition.x,
      avatar.y + 4.25,
      avatarPosition.z + 8.25,
    );
    const desiredCamera = hasEntered ? followCamera : introCamera;
    const lookTarget = hasEntered
      ? avatar.clone().add(new THREE.Vector3(0, 1.25, -3.8))
      : new THREE.Vector3(0, 2.2, -2.4);

    camera.position.lerp(desiredCamera, hasEntered ? 0.055 : 0.035);
    camera.lookAt(lookTarget);

    if (avatarRef.current) {
      avatarRef.current.position.lerp(avatar, 0.34);
      avatarRef.current.rotation.y = THREE.MathUtils.lerp(
        avatarRef.current.rotation.y,
        avatarDirection,
        0.16,
      );
    }
  });

  function handleGroundClick(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    if (!hasEntered) return;
    onMoveTo(clampPosition({ x: event.point.x, z: event.point.z }));
  }

  return (
    <>
      <color attach="background" args={["#d7e8fb"]} />
      <fog attach="fog" args={["#d7e8fb", 18, 62]} />
      <ambientLight intensity={2.15} />
      <directionalLight
        position={[7, 11, 7]}
        intensity={4.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[0, 5, -4]} intensity={18} color="#ffe5a6" distance={16} />
      <Environment preset="sunset" />
      <SceneSparkles
        count={90}
        scale={[18, 7, 18]}
        size={2.2}
        speed={0.18}
        opacity={0.42}
        color="#fff1ba"
      />
      <CloudSea />
      <FloatingTempleIsland
        activeZone={activeZone}
        onWalkTo={onWalkTo}
        onGroundClick={handleGroundClick}
      />
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
      <mesh position={[0, -1.78, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <coneGeometry args={[9.15, 5.55, 28, 7]} />
        <meshStandardMaterial color="#80776d" roughness={0.88} metalness={0.01} />
      </mesh>
      <mesh position={[0, -1.36, 0.1]} castShadow receiveShadow>
        <coneGeometry args={[7.55, 4.9, 22, 4]} />
        <meshStandardMaterial color="#5f594f" roughness={0.92} metalness={0.01} />
      </mesh>
      <mesh position={[0, 0, 0]} receiveShadow onClick={onGroundClick}>
        <cylinderGeometry args={[8.7, 8.1, 0.72, 96]} />
        <meshStandardMaterial color="#8cae77" roughness={0.78} />
      </mesh>
      <mesh
        position={[0, 0.39, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        onClick={onGroundClick}
      >
        <circleGeometry args={[8.25, 96]} />
        <meshStandardMaterial color="#a9bf91" roughness={0.74} />
      </mesh>

      <GardenTerraces onGroundClick={onGroundClick} />
      <MarbleWalkways onGroundClick={onGroundClick} />
      <Temple onGroundClick={onGroundClick} />
      <Staircase onGroundClick={onGroundClick} />
      <TempleBalustrades />
      <Waterfalls />
      <CypressGrove />
      <FlowerBeds />
      <QuestPortals activeZone={activeZone} onWalkTo={onWalkTo} />
    </group>
  );
}

function MarbleWalkways({
  onGroundClick,
}: {
  onGroundClick: (event: ThreeEvent<PointerEvent>) => void;
}) {
  return (
    <group position={[0, 0.73, 0]}>
      <mesh position={[0, 0, 1.95]} receiveShadow castShadow onClick={onGroundClick}>
        <boxGeometry args={[2.95, 0.08, 6.95]} />
        <meshStandardMaterial color="#f8ecd6" roughness={0.42} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.03, -2.25]} receiveShadow castShadow onClick={onGroundClick}>
        <boxGeometry args={[6.8, 0.09, 1.65]} />
        <meshStandardMaterial color="#fff4df" roughness={0.36} metalness={0.07} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 4.85, 0.04, -0.12]}
          receiveShadow
          castShadow
          onClick={onGroundClick}
        >
          <boxGeometry args={[2.75, 0.08, 5.45]} />
          <meshStandardMaterial color="#f3e5cf" roughness={0.48} metalness={0.04} />
        </mesh>
      ))}
    </group>
  );
}

function TempleBalustrades() {
  const rails = [-1, 1];
  return (
    <group position={[0, 1.08, 1.58]}>
      {rails.map((side) => (
        <group key={side} position={[side * 2.12, 0, 0]}>
          <mesh position={[0, 0.36, 0]} castShadow>
            <boxGeometry args={[0.14, 0.24, 5.9]} />
            <meshStandardMaterial color="#fff4df" roughness={0.34} metalness={0.08} />
          </mesh>
          {Array.from({ length: 8 }).map((_, index) => (
            <mesh key={index} position={[0, 0.13, 2.65 - index * 0.74]} castShadow>
              <cylinderGeometry args={[0.055, 0.07, 0.5, 14]} />
              <meshStandardMaterial color="#f3e4cd" roughness={0.42} metalness={0.05} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Temple({ onGroundClick }: { onGroundClick: (event: ThreeEvent<PointerEvent>) => void }) {
  const columns = Array.from({ length: 10 }, (_, index) => -4.05 + index * 0.9);
  const sideColumns = [-4.55, 4.55];

  return (
    <group position={[0, 1.32, -4.05]} scale={[1.12, 1.08, 1.04]}>
      <mesh position={[0, -0.18, 0.1]} receiveShadow castShadow onClick={onGroundClick}>
        <boxGeometry args={[10.7, 0.36, 5.35]} />
        <meshStandardMaterial color="#f9efd9" roughness={0.38} metalness={0.07} />
      </mesh>
      <mesh position={[0, 0.08, 0.06]} receiveShadow castShadow onClick={onGroundClick}>
        <boxGeometry args={[9.7, 0.24, 4.62]} />
        <meshStandardMaterial color="#fff8ea" roughness={0.33} metalness={0.1} />
      </mesh>
      <mesh position={[0, 2.18, -0.62]} castShadow receiveShadow>
        <boxGeometry args={[7.55, 3.55, 3.15]} />
        <meshStandardMaterial color="#eadfcd" roughness={0.5} metalness={0.04} />
      </mesh>
      <mesh position={[0, 2.18, 1.08]} castShadow receiveShadow>
        <boxGeometry args={[8.35, 3.3, 0.38]} />
        <meshStandardMaterial color="#f7ecd8" roughness={0.4} metalness={0.08} />
      </mesh>
      <mesh position={[0, 4.08, 0.05]} castShadow>
        <boxGeometry args={[9.2, 0.42, 4.95]} />
        <meshStandardMaterial color="#fff4df" roughness={0.32} metalness={0.1} />
      </mesh>
      <mesh position={[0, 4.62, 0.08]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <cylinderGeometry args={[3.95, 4.55, 1.04, 4]} />
        <meshStandardMaterial color="#ead9bf" roughness={0.38} metalness={0.08} />
      </mesh>
      <mesh position={[0, 4.96, 1.72]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0, 1.12, 8.85, 3]} />
        <meshStandardMaterial color="#fff0d5" roughness={0.36} metalness={0.08} />
      </mesh>
      {columns.map((x) => (
        <group key={x} position={[x, 1.86, 1.65]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.2, 0.27, 3.32, 36]} />
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
      {sideColumns.map((x) => (
        <group key={x} position={[x, 1.46, -0.2]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.16, 0.22, 2.45, 28]} />
            <meshStandardMaterial color="#f8eedb" roughness={0.38} metalness={0.08} />
          </mesh>
          <mesh position={[0, 1.42, 0]} castShadow>
            <sphereGeometry args={[0.22, 18, 12]} />
            <meshStandardMaterial color="#ffe8a8" emissive="#f1bb45" emissiveIntensity={0.22} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 1.98, 1.9]} castShadow receiveShadow>
        <boxGeometry args={[1.28, 2.45, 0.2]} />
        <meshStandardMaterial color="#211b1a" roughness={0.58} transparent opacity={0.74} />
      </mesh>
      <pointLight position={[0, 2.25, 1.76]} intensity={4.2} color="#ffd982" distance={5.6} />
      <mesh position={[0, 5.38, 1.58]}>
        <torusGeometry args={[0.58, 0.045, 14, 72]} />
        <meshStandardMaterial
          color="#d8b86b"
          emissive="#f2bd4b"
          emissiveIntensity={0.55}
          metalness={0.58}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 5.4, 1.58]}>
        <sphereGeometry args={[0.09, 18, 12]} />
        <meshStandardMaterial color="#fff4bd" emissive="#ffd86b" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

function Staircase({
  onGroundClick,
}: {
  onGroundClick: (event: ThreeEvent<PointerEvent>) => void;
}) {
  return (
    <group position={[0, 0.58, 0.85]}>
      {Array.from({ length: 14 }).map((_, index) => (
        <mesh
          key={index}
          position={[0, index * 0.08, 4.15 - index * 0.46]}
          receiveShadow
          castShadow
          onClick={onGroundClick}
        >
          <boxGeometry args={[2.9 + index * 0.18, 0.13, 0.42]} />
          <meshStandardMaterial
            color={index % 2 ? "#ece2d1" : "#fff4df"}
            roughness={0.46}
            metalness={0.04}
          />
        </mesh>
      ))}
    </group>
  );
}

function GardenTerraces({
  onGroundClick,
}: {
  onGroundClick: (event: ThreeEvent<PointerEvent>) => void;
}) {
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
        <mesh
          key={index}
          position={[x, 0.05, z]}
          scale={[sx, 1, sz]}
          receiveShadow
          castShadow
          onClick={onGroundClick}
        >
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
          <SceneSparkles
            count={24}
            scale={[width * 1.8, height * 0.8, width * 1.8]}
            size={1.1}
            speed={0.28}
            color="#ffffff"
            opacity={0.5}
          />
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
          <meshStandardMaterial
            color={color}
            roughness={0.58}
            emissive={color}
            emissiveIntensity={0.04}
          />
        </mesh>
      ))}
    </group>
  );
}

function QuestPortals({
  activeZone,
  onWalkTo,
}: {
  activeZone: ZoneKey;
  onWalkTo: (zone: Zone) => void;
}) {
  return (
    <group>
      {zones.map((zone) => {
        const isActive = activeZone === zone.key;
        return (
          <group key={zone.key} position={[zone.position.x, 1.05, zone.position.z]}>
            <mesh
              onClick={(event) => {
                event.stopPropagation();
                onWalkTo(zone);
              }}
            >
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
              <meshStandardMaterial
                color="#fff1bc"
                emissive="#ffd36b"
                emissiveIntensity={isActive ? 0.75 : 0.35}
                transparent
                opacity={0.62}
              />
            </mesh>
            <Html
              center
              distanceFactor={10}
              position={[0, 0.86, 0]}
              className="pointer-events-none hidden lg:block"
            >
              <div
                className={`rounded-full border px-3 py-1 text-xs font-bold backdrop-blur-xl ${isActive ? "border-primary bg-primary/90 text-primary-foreground" : "border-border/60 bg-background/55 text-foreground"}`}
              >
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
      positions.push([
        Math.cos(angle) * radius,
        -3.4 - (i % 4) * 0.28,
        Math.sin(angle) * radius + 2,
        2.2 + (i % 5) * 0.42,
      ]);
    }
    return positions;
  }, []);

  return (
    <group>
      {clouds.map(([x, y, z, scale], index) => (
        <mesh key={index} position={[x, y, z]} scale={[scale * 1.8, scale * 0.45, scale]}>
          <sphereGeometry args={[1, 20, 12]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.42}
            roughness={0.95}
            depthWrite={false}
          />
        </mesh>
      ))}
      <mesh position={[0, -4.2, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[28, 96]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.22} depthWrite={false} />
      </mesh>
    </group>
  );
}

function PlayerAvatar({ refObject }: { refObject: RefObject<THREE.Group | null> }) {
  return (
    <group ref={refObject} position={[START_POSITION.x, 0.52, START_POSITION.z]}>
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.54, 24]} />
        <meshStandardMaterial
          color="#f1d37b"
          emissive="#d3a842"
          emissiveIntensity={0.16}
          roughness={0.38}
          metalness={0.08}
        />
      </mesh>
      <mesh position={[0, 0.64, 0]} castShadow>
        <sphereGeometry args={[0.17, 24, 16]} />
        <meshStandardMaterial color="#fff0c6" roughness={0.32} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.42, 0.04]}>
        <torusGeometry args={[0.34, 0.014, 8, 48]} />
        <meshStandardMaterial
          color="#fff1a6"
          emissive="#ffd36b"
          emissiveIntensity={0.65}
          transparent
          opacity={0.64}
        />
      </mesh>
      <pointLight position={[0, 0.8, 0]} intensity={1.4} color="#ffe7a6" distance={3} />
    </group>
  );
}

function ArrivalTerraceMenu({
  onReset,
  onSelect,
  onClose,
}: {
  onReset: () => void;
  onSelect: (zone: Zone) => void;
  onClose: () => void;
}) {
  return (
    <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-72 rounded-[1.5rem] border border-primary/30 bg-background/78 p-3 shadow-[var(--shadow-aura)] backdrop-blur-2xl">
      <button
        aria-label="Close Arrival Terrace menu"
        className="absolute inset-[-200vh] -z-10 cursor-default"
        onClick={onClose}
      />
      <button
        onClick={onReset}
        className="flex w-full items-center justify-between rounded-2xl border border-border/50 bg-secondary/55 px-4 py-3 text-left text-sm font-bold text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <span>Return to arrival stairs</span>
        <Compass className="h-4 w-4" />
      </button>
      <div className="mt-2 grid gap-2">
        {zones.map((zone) => (
          <button
            key={zone.key}
            onClick={() => onSelect(zone)}
            className="flex items-center justify-between rounded-2xl border border-border/45 bg-background/42 px-4 py-3 text-left text-sm font-semibold text-foreground transition-colors hover:bg-secondary/70"
          >
            <span>{zone.label}</span>
            <zone.Icon className="h-4 w-4 text-primary" />
          </button>
        ))}
      </div>
    </div>
  );
}

function AscensionVfx({
  celebration,
  ascensionLevel,
}: {
  celebration: Celebration;
  ascensionLevel: number;
}) {
  return (
    <div key={celebration.id} className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
      <div className="ascension-bloom absolute inset-0" />
      <div className="ascension-sweep absolute inset-y-0 left-[-30%] w-[38%]" />
      {Array.from({ length: 18 }).map((_, index) => (
        <span
          key={index}
          className="spark-trail absolute left-1/2 top-[64%] h-2 w-2 rounded-full bg-primary shadow-[var(--shadow-glow)]"
          style={
            {
              "--spark-x": `${(index % 6) * 34 - 86}px`,
              "--spark-y": `${-130 - (index % 5) * 22}px`,
              animationDelay: `${index * 38}ms`,
            } as CSSProperties
          }
        />
      ))}
      <div className="ascension-toast absolute left-1/2 top-[20%] -translate-x-1/2 rounded-full border border-primary/45 bg-background/70 px-6 py-4 text-center shadow-[var(--shadow-aura)] backdrop-blur-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
          {celebration.leveledUp ? "Ascension Level Up" : "Quest Complete"}
        </p>
        <p className="mt-1 text-2xl font-black text-foreground">
          +{celebration.xp} glow {celebration.leveledUp ? `• Level ${ascensionLevel}` : ""}
        </p>
      </div>
    </div>
  );
}

function MovementHud({
  ascensionLevel,
  glowEarned,
  isMuted,
  onToggleMute,
}: {
  ascensionLevel: number;
  glowEarned: number;
  isMuted: boolean;
  onToggleMute: () => void;
}) {
  return (
    <div className="absolute left-4 top-4 z-30 grid gap-3">
      <div className="sanctuary-panel rounded-2xl border border-primary/30 p-3 shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
            {ascensionLevel}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Ascension</p>
            <p className="text-sm font-semibold text-foreground">
              {glowEarned.toLocaleString()} glow
            </p>
          </div>
          <button
            onClick={onToggleMute}
            className="ml-2 grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-background/35 text-foreground"
            aria-label={isMuted ? "Unmute sound cues" : "Mute sound cues"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div className="sanctuary-panel hidden rounded-2xl border border-border/60 p-3 shadow-[var(--shadow-soft)] md:block">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Footprints className="h-4 w-4 text-primary" /> Move
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1 text-xs font-bold text-muted-foreground">
          <span />
          <kbd className="rounded-md border border-border/50 bg-background/45 px-2 py-1 text-center">
            W
          </kbd>
          <span />
          <kbd className="rounded-md border border-border/50 bg-background/45 px-2 py-1 text-center">
            A
          </kbd>
          <kbd className="rounded-md border border-border/50 bg-background/45 px-2 py-1 text-center">
            S
          </kbd>
          <kbd className="rounded-md border border-border/50 bg-background/45 px-2 py-1 text-center">
            D
          </kbd>
        </div>
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
  completedQuests,
  onCompleteQuest,
}: {
  activeZone: ZoneKey;
  selectedZone?: Zone;
  selectedTree: (typeof skillTrees)[number];
  zoneQuests: typeof allQuests;
  onBack: () => void;
  completedQuests: Set<string>;
  onCompleteQuest: (quest: Quest) => void;
}) {
  if (activeZone === "overview" || !selectedZone) {
    return null;
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
        <div
          className={`grid h-14 w-14 shrink-0 place-items-center rounded-[40%] border ${selectedZone.aura}`}
        >
          <selectedZone.Icon className="h-7 w-7" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {selectedTree.name}
          </p>
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
        {(zoneQuests.length ? zoneQuests : allQuests.slice(0, 2)).map((quest) => {
          const isComplete = completedQuests.has(quest.title);
          return (
            <div
              key={quest.title}
              className={`rounded-2xl border p-4 transition-all ${isComplete ? "border-primary/55 bg-primary/15 shadow-[var(--shadow-glow)]" : "border-border/60 bg-background/42"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold text-foreground">{quest.title}</p>
                <span className="shrink-0 rounded-full bg-primary/15 px-2 py-1 text-xs font-bold text-primary">
                  {quest.xp} XP
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  {isComplete ? "Completed" : quest.status}
                </p>
                <button
                  onClick={() => onCompleteQuest(quest)}
                  disabled={isComplete}
                  className="rounded-full bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.03] disabled:cursor-default disabled:bg-secondary disabled:text-secondary-foreground"
                >
                  {isComplete ? "Claimed" : "Complete"}
                </button>
              </div>
            </div>
          );
        })}
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
