import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";

export type TreeNode = {
  key: string;
  name: string;
  short: string;
  Icon: LucideIcon;
  /** Tailwind text-color class, e.g. "text-air" */
  toneClass: string;
  /** 0–100 */
  progress: number;
  /** Legacy positional fields — kept for backward compat, no longer used */
  x?: number;
  y?: number;
};

type Props = {
  nodes: TreeNode[];
  selectedKey: string;
  onSelect: (key: string) => void;
  rootsLabel: string;
  rootsProgress: number; // 0–100
};

/* ───────── Geometry helpers ───────── */

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Quadratic Bézier point
function qbez(t: number, p0: P, p1: P, p2: P): P {
  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
  };
}

type P = { x: number; y: number };

/** A branch template — anchor on trunk, control point, max-extent endpoint. */
type BranchDef = {
  anchor: P;
  control: P;
  end: P;
  /** Where leaves sit along the branch (0–1 of full length). */
  leafTs: number[];
  /** Where fruits hang (0–1 of full length). */
  fruitTs: number[];
};

// viewBox 0 0 800 900. Trunk runs roughly x=400, y=160 (top) → y=720 (base).
const BRANCHES: Record<string, BranchDef> = {
  // Crown branch — straight up, smaller side spread
  "Mind & Spirit": {
    anchor: { x: 400, y: 240 },
    control: { x: 405, y: 130 },
    end: { x: 420, y: 60 },
    leafTs: [0.35, 0.55, 0.7, 0.85, 0.95],
    fruitTs: [0.6, 0.8, 0.95],
  },
  // Upper right
  "Energy Mastery": {
    anchor: { x: 415, y: 290 },
    control: { x: 600, y: 220 },
    end: { x: 740, y: 140 },
    leafTs: [0.3, 0.5, 0.7, 0.85, 0.95],
    fruitTs: [0.55, 0.78, 0.95],
  },
  // Upper left
  "Movement Arts": {
    anchor: { x: 385, y: 290 },
    control: { x: 200, y: 220 },
    end: { x: 60, y: 140 },
    leafTs: [0.3, 0.5, 0.7, 0.85, 0.95],
    fruitTs: [0.55, 0.78, 0.95],
  },
  // Mid right
  "Herbal Wisdom": {
    anchor: { x: 425, y: 380 },
    control: { x: 620, y: 360 },
    end: { x: 760, y: 320 },
    leafTs: [0.3, 0.5, 0.7, 0.88],
    fruitTs: [0.6, 0.85],
  },
  // Mid left
  "Healing Touch": {
    anchor: { x: 375, y: 380 },
    control: { x: 180, y: 360 },
    end: { x: 40, y: 320 },
    leafTs: [0.3, 0.5, 0.7, 0.88],
    fruitTs: [0.6, 0.85],
  },
};

/* ───────── Component ───────── */

export function TreeOfLife({ nodes, selectedKey, onSelect, rootsLabel, rootsProgress }: Props) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border/60 shadow-[var(--shadow-aura)]">
      {/* Sky / golden hour backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 30%, oklch(0.92 0.08 80 / 0.55), transparent 60%), linear-gradient(180deg, oklch(0.34 0.06 60) 0%, oklch(0.42 0.09 50) 35%, oklch(0.55 0.12 40) 65%, oklch(0.38 0.08 280) 100%)",
        }}
      />
      {/* Drifting cloud band (decorative) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 opacity-70">
        <div className="tol-cloud-drift absolute inset-0">
          <svg viewBox="0 0 1600 400" preserveAspectRatio="none" className="h-full w-[200%]">
            <defs>
              <radialGradient id="cloudFill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.96 0.02 80 / 0.8)" />
                <stop offset="100%" stopColor="oklch(0.96 0.02 80 / 0)" />
              </radialGradient>
            </defs>
            {Array.from({ length: 14 }).map((_, i) => (
              <ellipse
                key={i}
                cx={(i * 130 + 60) % 1600}
                cy={140 + ((i * 47) % 180)}
                rx={120 + ((i * 17) % 80)}
                ry={32 + ((i * 11) % 24)}
                fill="url(#cloudFill)"
              />
            ))}
          </svg>
        </div>
      </div>

      <svg
        viewBox="0 0 800 900"
        className="relative mx-auto block w-full max-w-[760px]"
        role="img"
        aria-label="Tree of Life — five living skill branches"
      >
        <defs>
          <linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.28 0.04 50)" />
            <stop offset="50%" stopColor="oklch(0.42 0.07 55)" />
            <stop offset="100%" stopColor="oklch(0.62 0.09 70)" />
          </linearGradient>
          <radialGradient id="canopyHalo" cx="50%" cy="35%" r="55%">
            <stop offset="0%" stopColor="oklch(0.95 0.14 85 / 0.55)" />
            <stop offset="60%" stopColor="oklch(0.85 0.12 70 / 0.18)" />
            <stop offset="100%" stopColor="oklch(0.85 0.12 70 / 0)" />
          </radialGradient>
          <radialGradient id="islandGrad" cx="50%" cy="20%" r="80%">
            <stop offset="0%" stopColor="oklch(0.45 0.05 70)" />
            <stop offset="60%" stopColor="oklch(0.32 0.04 60)" />
            <stop offset="100%" stopColor="oklch(0.22 0.03 55)" />
          </radialGradient>
          <radialGradient id="leafGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="oklch(0.78 0.16 130)" />
            <stop offset="100%" stopColor="oklch(0.42 0.12 140)" />
          </radialGradient>
          <radialGradient id="waterfallGrad" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="oklch(0.95 0.02 220 / 0.85)" />
            <stop offset="100%" stopColor="oklch(0.92 0.02 220 / 0)" />
          </radialGradient>

          {/* Reusable leaf cluster */}
          <symbol id="leaf-cluster" viewBox="-20 -20 40 40">
            <ellipse cx={-6} cy={-2} rx={12} ry={8} fill="url(#leafGrad)" opacity={0.9} />
            <ellipse cx={6} cy={2} rx={11} ry={7} fill="url(#leafGrad)" opacity={0.85} />
            <ellipse cx={0} cy={-8} rx={9} ry={6} fill="url(#leafGrad)" opacity={0.8} />
            <ellipse cx={2} cy={6} rx={8} ry={5} fill="url(#leafGrad)" opacity={0.75} />
          </symbol>

          {/* Pink blossom */}
          <symbol id="blossom" viewBox="-6 -6 12 12">
            <circle r={2.4} fill="oklch(0.85 0.12 20 / 0.95)" />
            <circle cx={3} cy={0} r={1.6} fill="oklch(0.88 0.1 25 / 0.9)" />
            <circle cx={-3} cy={0} r={1.6} fill="oklch(0.88 0.1 25 / 0.9)" />
            <circle cx={0} cy={3} r={1.6} fill="oklch(0.88 0.1 25 / 0.9)" />
            <circle cx={0} cy={-3} r={1.6} fill="oklch(0.88 0.1 25 / 0.9)" />
          </symbol>
        </defs>

        {/* Canopy halo */}
        <ellipse cx={400} cy={220} rx={440} ry={280} fill="url(#canopyHalo)" />

        {/* Sun rays (subtle) */}
        <g opacity={0.18}>
          {[-30, -15, 0, 15, 30].map((deg) => (
            <rect
              key={deg}
              x={398}
              y={20}
              width={4}
              height={300}
              fill="oklch(0.98 0.08 90)"
              transform={`rotate(${deg} 400 180)`}
            />
          ))}
        </g>

        {/* ───── Floating island ───── */}
        <g>
          {/* waterfalls */}
          <path
            d="M 220 720 Q 215 800 180 880 Q 230 850 250 820 Z"
            fill="url(#waterfallGrad)"
            opacity={0.85}
          />
          <path
            d="M 580 720 Q 585 800 620 880 Q 570 850 550 820 Z"
            fill="url(#waterfallGrad)"
            opacity={0.85}
          />
          {/* island rock */}
          <path
            d="M 130 700
               Q 200 660, 320 660
               L 480 660
               Q 600 660, 670 700
               Q 690 740, 640 770
               Q 580 800, 480 805
               L 320 805
               Q 220 800, 160 770
               Q 110 740, 130 700 Z"
            fill="url(#islandGrad)"
            stroke="oklch(0.18 0.02 55)"
            strokeWidth={1.5}
          />
          {/* moss tuft top */}
          <path
            d="M 160 670 Q 230 645 320 660 L 480 660 Q 570 645 640 670 Q 600 668 480 672 L 320 672 Q 200 668 160 670 Z"
            fill="oklch(0.55 0.12 140 / 0.85)"
          />
          {/* flower vines spilling over */}
          {[180, 240, 360, 460, 560, 620].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${680 + (i % 2) * 8})`}>
              <use href="#blossom" width={10} height={10} x={-5} y={-5} />
              <use href="#blossom" width={8} height={8} x={6} y={4} opacity={0.8} />
              <use href="#blossom" width={7} height={7} x={-8} y={6} opacity={0.75} />
            </g>
          ))}
        </g>

        {/* ───── Ruins (columns + statues) ───── */}
        <g opacity={0.55}>
          {/* Columns */}
          {[210, 260, 540, 590].map((cx, i) => (
            <g key={cx} transform={`translate(${cx}, 580)`}>
              <rect x={-3} y={0} width={6} height={4} fill="oklch(0.92 0.01 80)" />
              <rect x={-9} y={4} width={18} height={6} fill="oklch(0.9 0.01 80)" />
              <rect x={-5} y={10} width={10} height={70} fill="oklch(0.9 0.01 80)" />
              <rect x={-9} y={80} width={18} height={6} fill="oklch(0.88 0.01 80)" />
              {/* fluting */}
              <line x1={-2} y1={12} x2={-2} y2={78} stroke="oklch(0.7 0.01 80)" strokeWidth={0.5} />
              <line x1={2} y1={12} x2={2} y2={78} stroke="oklch(0.7 0.01 80)" strokeWidth={0.5} />
              {/* vine */}
              {i % 2 === 0 && (
                <use href="#blossom" width={6} height={6} x={-3} y={30} opacity={0.7} />
              )}
            </g>
          ))}
          {/* Statue silhouettes */}
          {[320, 480].map((sx) => (
            <g key={sx} transform={`translate(${sx}, 600)`} fill="oklch(0.88 0.01 80)">
              <ellipse cx={0} cy={4} rx={4} ry={5} />
              <path d="M -6 10 Q 0 8 6 10 L 5 50 Q 0 55 -5 50 Z" />
              <rect x={-7} y={50} width={14} height={4} />
            </g>
          ))}
        </g>

        {/* ───── Trunk ───── */}
        <path
          d="M 380 720
             C 360 620, 410 540, 388 440
             C 372 360, 420 290, 400 230
             C 388 200, 412 180, 408 160
             L 392 160
             C 388 180, 412 200, 400 230
             C 380 290, 428 360, 412 440
             C 390 540, 440 620, 420 720 Z"
          fill="url(#trunkGrad)"
          stroke="oklch(0.18 0.03 50)"
          strokeWidth={1.5}
        />
        {/* bark texture */}
        {[200, 280, 360, 440, 520, 600, 680].map((y) => (
          <path
            key={y}
            d={`M ${390 + Math.sin(y) * 4} ${y} q 10 6 20 0`}
            stroke="oklch(0.2 0.03 50 / 0.6)"
            strokeWidth={1}
            fill="none"
          />
        ))}
        {/* Root flares at base */}
        {[-1, 1].map((d) => (
          <path
            key={d}
            d={`M ${400 + d * 18} 720 Q ${400 + d * 80} 740, ${400 + d * 130} 770`}
            stroke="oklch(0.28 0.04 50)"
            strokeWidth={6}
            strokeLinecap="round"
            fill="none"
            opacity={0.7}
          />
        ))}

        {/* ───── Branches (driven by progress) ───── */}
        {nodes.map((n, i) => {
          const def = BRANCHES[n.key];
          if (!def) return null;
          const isSelected = n.key === selectedKey;
          const dimmed = selectedKey && !isSelected ? 0.45 : 1;
          const t = Math.max(0.08, n.progress / 100); // never fully empty (tiny stub)
          // Interpolated tip
          const tip = qbez(t, def.anchor, def.control, def.end);
          const ctrl: P = {
            x: lerp(def.anchor.x, def.control.x, t),
            y: lerp(def.anchor.y, def.control.y, t),
          };
          const strokeW = lerp(3.5, 13, t);

          // Visible leaves/fruits = those whose base position falls within current t
          const visibleLeafTs = def.leafTs.filter((lt) => lt <= t + 0.02);
          const visibleFruitTs = def.fruitTs.filter((ft) => ft <= t + 0.02);

          return (
            <g
              key={n.key}
              className={`cursor-pointer ${n.toneClass} transition-opacity duration-300`}
              style={{ opacity: dimmed }}
              onClick={() => onSelect(n.key)}
              tabIndex={0}
              role="button"
              aria-pressed={isSelected}
              aria-label={`${n.name} — ${Math.round(n.progress)}% progress`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(n.key);
                }
              }}
            >
              {/* Branch limb — dark underlay for depth */}
              <path
                d={`M ${def.anchor.x} ${def.anchor.y} Q ${ctrl.x} ${ctrl.y}, ${tip.x} ${tip.y}`}
                stroke="oklch(0.2 0.03 50)"
                strokeWidth={strokeW + 2}
                strokeLinecap="round"
                fill="none"
                style={{
                  strokeDasharray: 800,
                  strokeDashoffset: 800,
                  animation: `tol-grow 900ms ease-out ${200 + i * 140}ms forwards`,
                }}
              />
              {/* Branch limb — main */}
              <path
                d={`M ${def.anchor.x} ${def.anchor.y} Q ${ctrl.x} ${ctrl.y}, ${tip.x} ${tip.y}`}
                stroke="url(#trunkGrad)"
                strokeWidth={strokeW}
                strokeLinecap="round"
                fill="none"
                style={{
                  strokeDasharray: 800,
                  strokeDashoffset: 800,
                  animation: `tol-grow 900ms ease-out ${250 + i * 140}ms forwards`,
                }}
              />
              {/* Selected aura along branch */}
              {isSelected && (
                <path
                  d={`M ${def.anchor.x} ${def.anchor.y} Q ${ctrl.x} ${ctrl.y}, ${tip.x} ${tip.y}`}
                  stroke="currentColor"
                  strokeWidth={strokeW + 8}
                  strokeLinecap="round"
                  fill="none"
                  opacity={0.18}
                />
              )}

              {/* Leaves */}
              {visibleLeafTs.map((lt, li) => {
                const p = qbez(lt, def.anchor, def.control, def.end);
                const size = lerp(20, 36, t) * (isSelected ? 1.1 : 1);
                return (
                  <use
                    key={`leaf-${li}`}
                    href="#leaf-cluster"
                    x={p.x - size / 2}
                    y={p.y - size / 2}
                    width={size}
                    height={size}
                    style={{
                      transformOrigin: `${p.x}px ${p.y}px`,
                      animation: `tol-pop 500ms ease-out ${600 + i * 140 + li * 80}ms backwards`,
                    }}
                  />
                );
              })}

              {/* Fruits (skill tone) */}
              {visibleFruitTs.map((ft, fi) => {
                const p = qbez(ft, def.anchor, def.control, def.end);
                const r = lerp(4, 8, t);
                return (
                  <g
                    key={`fruit-${fi}`}
                    style={{
                      transformOrigin: `${p.x}px ${p.y}px`,
                      animation: `tol-pop 500ms ease-out ${700 + i * 140 + fi * 100}ms backwards`,
                    }}
                  >
                    <circle cx={p.x} cy={p.y} r={r + 5} fill="currentColor" opacity={0.25} />
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={r}
                      fill="currentColor"
                      stroke="oklch(0.98 0.02 90 / 0.8)"
                      strokeWidth={0.6}
                    />
                    {isSelected && fi === visibleFruitTs.length - 1 && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={r + 4}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1}
                        opacity={0.6}
                        className="animate-ping"
                        style={{ animationDuration: "2.8s" }}
                      />
                    )}
                  </g>
                );
              })}

              {/* Blossoms — only at higher progress */}
              {t > 0.5 &&
                def.leafTs.slice(0, 2).map((bt, bi) => {
                  const p = qbez(bt + 0.05, def.anchor, def.control, def.end);
                  return (
                    <use
                      key={`bloss-${bi}`}
                      href="#blossom"
                      x={p.x - 4}
                      y={p.y - 4}
                      width={8}
                      height={8}
                      opacity={0.85}
                    />
                  );
                })}

              {/* Tip label */}
              <g transform={`translate(${tip.x}, ${tip.y})`}>
                {(() => {
                  const labelRight = tip.x > 400;
                  const labelAbove = tip.y < 200;
                  const dx = labelAbove ? 0 : labelRight ? 18 : -18;
                  const dy = labelAbove ? -38 : 4;
                  const anchor = labelAbove ? "middle" : labelRight ? "start" : "end";
                  return (
                    <>
                      <rect
                        x={anchor === "middle" ? -52 : labelRight ? 12 : -114}
                        y={dy - 16}
                        width={104}
                        height={32}
                        rx={10}
                        fill="oklch(0.16 0.02 60 / 0.72)"
                        stroke="currentColor"
                        strokeOpacity={0.4}
                        strokeWidth={1}
                      />
                      <text
                        textAnchor={anchor}
                        x={dx}
                        y={dy - 2}
                        className="fill-foreground text-[12px] font-semibold"
                      >
                        {n.name}
                      </text>
                      <text
                        textAnchor={anchor}
                        x={dx}
                        y={dy + 11}
                        className="fill-muted-foreground text-[10px] uppercase tracking-widest"
                      >
                        {Math.round(n.progress)}% · Lv {Math.max(1, Math.round(n.progress / 12))}
                      </text>
                    </>
                  );
                })()}
              </g>
            </g>
          );
        })}

        {/* Crown sparkle */}
        <g transform="translate(420, 50)" className="text-primary opacity-90">
          <foreignObject x={-10} y={-10} width={20} height={20}>
            <div className="flex h-5 w-5 items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
          </foreignObject>
        </g>

        {/* Roots node beneath island */}
        <g transform={`translate(400, 855)`}>
          <circle r={32} fill="oklch(0.18 0.02 60 / 0.85)" stroke="oklch(0.86 0.105 86)" strokeOpacity={0.6} strokeWidth={1.5} />
          <text textAnchor="middle" y={-2} className="fill-foreground text-[10px] font-bold uppercase tracking-widest">
            Roots
          </text>
          <text textAnchor="middle" y={12} className="fill-primary text-[11px] font-bold">
            {Math.round(rootsProgress)}%
          </text>
        </g>
      </svg>

      <style>{`
        @keyframes tol-grow {
          to { stroke-dashoffset: 0; }
        }
        @keyframes tol-pop {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes tol-cloud {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .tol-cloud-drift {
          animation: tol-cloud 60s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .tol-cloud-drift { animation: none; }
        }
      `}</style>
    </div>
  );
}
