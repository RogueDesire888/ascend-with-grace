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
  /** Absolute SVG coordinates within viewBox 0 0 600 760 */
  x: number;
  y: number;
};

type Props = {
  nodes: TreeNode[];
  selectedKey: string;
  onSelect: (key: string) => void;
  rootsLabel: string;
  rootsProgress: number; // 0–100
};

// Trunk anchor points (top → roots)
const TRUNK_TOP = { x: 300, y: 60 };
const TRUNK_MID = { x: 300, y: 380 };
const TRUNK_ROOTS = { x: 300, y: 700 };

export function TreeOfLife({ nodes, selectedKey, onSelect, rootsLabel, rootsProgress }: Props) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-[var(--gradient-panel)] p-4 shadow-[var(--shadow-aura)] sm:p-6">
      <div className="marble-sheen pointer-events-none absolute inset-0 opacity-25" />
      <svg
        viewBox="0 0 600 760"
        className="relative mx-auto block w-full max-w-[640px]"
        role="img"
        aria-label="Tree of Life — five skill branches"
      >
        <defs>
          <linearGradient id="trunkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.45)" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.15)" />
          </linearGradient>
          <radialGradient id="canopyGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.18)" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
          </radialGradient>
        </defs>

        {/* Soft canopy halo */}
        <ellipse cx="300" cy="320" rx="280" ry="260" fill="url(#canopyGlow)" />

        {/* Trunk — gentle organic curve */}
        <path
          d={`M ${TRUNK_TOP.x} ${TRUNK_TOP.y}
              C 280 200, 320 280, ${TRUNK_MID.x} ${TRUNK_MID.y}
              C 280 480, 320 580, ${TRUNK_ROOTS.x} ${TRUNK_ROOTS.y}`}
          stroke="url(#trunkGrad)"
          strokeWidth={14}
          strokeLinecap="round"
          fill="none"
          className="opacity-90"
        />

        {/* Roots: three small arcs spreading from base */}
        {[-1, 0, 1].map((d) => (
          <path
            key={d}
            d={`M ${TRUNK_ROOTS.x} ${TRUNK_ROOTS.y}
                Q ${TRUNK_ROOTS.x + d * 60} ${TRUNK_ROOTS.y + 25},
                  ${TRUNK_ROOTS.x + d * 110} ${TRUNK_ROOTS.y + 50}`}
            stroke="hsl(var(--primary) / 0.35)"
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
          />
        ))}

        {/* Branches — quadratic curves from trunk anchor → node */}
        {nodes.map((n, i) => {
          // Anchor on trunk depending on node y
          const anchor = n.y < 280 ? { x: 300, y: 200 } : n.y < 460 ? TRUNK_MID : { x: 300, y: 540 };
          // Control point biased outward for organic curve
          const cx = (anchor.x + n.x) / 2 + (n.x > 300 ? 40 : -40);
          const cy = (anchor.y + n.y) / 2 - 20;
          const isSelected = n.key === selectedKey;
          return (
            <path
              key={`branch-${n.key}`}
              d={`M ${anchor.x} ${anchor.y} Q ${cx} ${cy}, ${n.x} ${n.y}`}
              stroke="hsl(var(--primary) / 0.5)"
              strokeWidth={isSelected ? 4 : 2.5}
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-300"
              style={{
                strokeDasharray: 600,
                strokeDashoffset: 600,
                animation: `tol-draw 900ms ease-out ${150 + i * 120}ms forwards`,
                opacity: isSelected ? 1 : 0.55,
              }}
            />
          );
        })}

        {/* Roots node */}
        <g transform={`translate(${TRUNK_ROOTS.x}, ${TRUNK_ROOTS.y + 65})`}>
          <circle r={34} className="fill-primary/15" />
          <circle r={26} className="fill-card stroke-primary/60" strokeWidth={1.5} />
          <text
            textAnchor="middle"
            y={-2}
            className="fill-foreground text-[10px] font-bold uppercase tracking-widest"
          >
            Roots
          </text>
          <text textAnchor="middle" y={12} className="fill-primary text-[11px] font-bold">
            {Math.round(rootsProgress)}%
          </text>
        </g>

        {/* Branch nodes */}
        {nodes.map((n) => {
          const Icon = n.Icon;
          const isSelected = n.key === selectedKey;
          const auraR = 36 + (n.progress / 100) * 18;
          const labelAbove = n.y < 200;
          const labelRight = n.x > 300;
          return (
            <g
              key={n.key}
              transform={`translate(${n.x}, ${n.y})`}
              className={`cursor-pointer ${n.toneClass} transition-transform duration-300`}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
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
              {/* Aura */}
              <circle
                r={auraR}
                fill="currentColor"
                opacity={isSelected ? 0.35 : 0.15}
                className="transition-opacity duration-300"
              />
              {isSelected && (
                <circle
                  r={auraR + 6}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  opacity={0.5}
                  className="animate-ping"
                  style={{ animationDuration: "2.4s" }}
                />
              )}
              {/* Disc */}
              <circle
                r={26}
                className="fill-card stroke-current"
                strokeWidth={isSelected ? 2.5 : 1.5}
                opacity={isSelected ? 1 : 0.85}
              />
              {/* Icon — render via foreignObject so lucide-react keeps its styling */}
              <foreignObject x={-12} y={-12} width={24} height={24}>
                <div className="flex h-6 w-6 items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
              </foreignObject>
              {/* Label */}
              <text
                textAnchor={labelAbove ? "middle" : labelRight ? "start" : "end"}
                x={labelAbove ? 0 : labelRight ? 38 : -38}
                y={labelAbove ? -auraR - 12 : 5}
                className={`fill-foreground text-[13px] font-semibold ${
                  isSelected ? "" : "opacity-80"
                }`}
              >
                {n.name}
              </text>
              <text
                textAnchor={labelAbove ? "middle" : labelRight ? "start" : "end"}
                x={labelAbove ? 0 : labelRight ? 38 : -38}
                y={labelAbove ? -auraR + 4 : 22}
                className="fill-muted-foreground text-[10px] uppercase tracking-widest"
              >
                {Math.round(n.progress)}% · Lv {Math.max(1, Math.round(n.progress / 12))}
              </text>
            </g>
          );
        })}

        {/* Crown sparkle above topmost node */}
        <g transform="translate(300, 24)" className="text-primary opacity-80">
          <foreignObject x={-10} y={-10} width={20} height={20}>
            <div className="flex h-5 w-5 items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
          </foreignObject>
        </g>
      </svg>

      <style>{`
        @keyframes tol-draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
