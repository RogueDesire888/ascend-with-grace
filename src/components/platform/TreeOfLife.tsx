import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import treeImg from "@/assets/tree-of-life.jpg";

export type TreeNode = {
  key: string;
  name: string;
  short: string;
  Icon: LucideIcon;
  /** Tailwind text-color class, e.g. "text-air" */
  toneClass: string;
  /** 0–100 */
  progress: number;
  /** Legacy, ignored */
  x?: number;
  y?: number;
};

type Props = {
  nodes: TreeNode[];
  selectedKey: string;
  onSelect: (key: string) => void;
  rootsLabel: string;
  rootsProgress: number;
};

/** Pinned to the 5 main branches of src/assets/tree-of-life.jpg.
 *  Coordinates are % of the image (left, top). */
const POSITIONS: Record<string, { left: number; top: number; labelSide: "left" | "right" | "top" }> = {
  "Mind & Spirit":   { left: 50, top: 9,  labelSide: "top"   }, // crown
  "Movement Arts":   { left: 16, top: 31, labelSide: "left"  }, // upper left limb
  "Energy Mastery":  { left: 84, top: 31, labelSide: "right" }, // upper right limb
  "Healing Touch":   { left: 18, top: 56, labelSide: "left"  }, // lower left limb
  "Herbal Wisdom":   { left: 82, top: 56, labelSide: "right" }, // lower right limb
};

export function TreeOfLife({ nodes, selectedKey, onSelect, rootsLabel, rootsProgress }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-black/30 shadow-[var(--shadow-aura)]">
      <div className="relative mx-auto aspect-[2/3] w-full max-w-[760px]">
        {/* The tree itself */}
        <img
          src={treeImg}
          alt="Tree of Life — five healing branches"
          width={1024}
          height={1536}
          className="absolute inset-0 h-full w-full object-cover object-center"
          draggable={false}
        />

        {/* Subtle vignette so nodes pop */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        {/* Skill nodes pinned to branches */}
        {nodes.map((n) => {
          const pos = POSITIONS[n.key];
          if (!pos) return null;
          const isSelected = n.key === selectedKey;
          const isHovered = hovered === n.key;
          const isActive = isSelected || isHovered;
          const isDimmed = !!selectedKey && !isSelected && !isHovered;
          // Progress drives glow strength
          const glowIntensity = 0.35 + (n.progress / 100) * 0.55;
          const auraScale = 1 + (n.progress / 100) * 0.6 + (isActive ? 0.25 : 0);

          return (
            <div
              key={n.key}
              className="absolute"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <button
                type="button"
                onClick={() => onSelect(n.key)}
                onMouseEnter={() => setHovered(n.key)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(n.key)}
                onBlur={() => setHovered(null)}
                aria-pressed={isSelected}
                aria-label={`${n.name} — ${Math.round(n.progress)}% progress`}
                className={`group relative grid place-items-center transition-all duration-300 ${n.toneClass} ${
                  isDimmed ? "opacity-50" : "opacity-100"
                }`}
                style={{
                  width: 64,
                  height: 64,
                }}
              >
                {/* Aura */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full transition-transform duration-500"
                  style={{
                    background:
                      "radial-gradient(circle, currentColor 0%, transparent 65%)",
                    opacity: glowIntensity * (isActive ? 1.25 : 1),
                    transform: `scale(${auraScale})`,
                    filter: "blur(4px)",
                  }}
                />
                {/* Pulsing ring when selected */}
                {isSelected && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full border-2 border-current motion-safe:animate-ping"
                    style={{ animationDuration: "2.6s", opacity: 0.6 }}
                  />
                )}
                {/* Disc (the "fruit") */}
                <span
                  className={`relative grid h-9 w-9 place-items-center rounded-full border bg-background/80 backdrop-blur-sm transition-transform duration-200 ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                  style={{
                    borderColor: "currentColor",
                    boxShadow: `0 0 18px currentColor`,
                  }}
                >
                  <n.Icon className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
                </span>

                {/* Floating label card */}
                <span
                  className={`pointer-events-none absolute z-10 whitespace-nowrap rounded-xl border border-border/60 bg-background/85 px-3 py-1.5 backdrop-blur-md transition-all duration-200 ${
                    isActive ? "opacity-100" : "opacity-0"
                  } ${
                    pos.labelSide === "top"
                      ? "bottom-full left-1/2 mb-2 -translate-x-1/2"
                      : pos.labelSide === "left"
                        ? "right-full top-1/2 mr-2 -translate-y-1/2"
                        : "left-full top-1/2 ml-2 -translate-y-1/2"
                  }`}
                >
                  <span className="block text-[12px] font-semibold text-foreground">
                    {n.name}
                  </span>
                  <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">
                    {Math.round(n.progress)}% · Lv {Math.max(1, Math.round(n.progress / 12))}
                  </span>
                </span>
              </button>
            </div>
          );
        })}

        {/* Roots label badge anchored at base of island */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-primary/50 bg-background/80 px-4 py-1.5 backdrop-blur-md">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            {rootsLabel} · {Math.round(rootsProgress)}%
          </span>
        </div>
      </div>
    </div>
  );
}
