import { useEffect, useSyncExternalStore } from "react";
import { ranks } from "./herbal-data";

export type HerbalNote = {
  id: string;
  herbSlug: string;
  body: string;
  createdAt: string;
};

export type HerbalProgress = {
  profile: { displayName: string };
  monographsStudied: Record<string, boolean>; // herb slug -> studied
  preparationsCrafted: Record<string, boolean>; // preparation slug -> crafted
  goalsActive: Record<string, boolean>; // goal id
  notes: HerbalNote[];
};

const STORAGE_KEY = "ascend-herbal-v1";
const EVENT = "ascend-herbal-update";

const empty = (): HerbalProgress => ({
  profile: { displayName: "" },
  monographsStudied: {},
  preparationsCrafted: {},
  goalsActive: {},
  notes: [],
});

let memory: HerbalProgress = empty();
let hydrated = false;

function read(): HerbalProgress {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty();
    const p = JSON.parse(raw) as Partial<HerbalProgress>;
    return {
      profile: p.profile ?? { displayName: "" },
      monographsStudied: p.monographsStudied ?? {},
      preparationsCrafted: p.preparationsCrafted ?? {},
      goalsActive: p.goalsActive ?? {},
      notes: p.notes ?? [],
    };
  } catch {
    return empty();
  }
}

function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  memory = read();
  hydrated = true;
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  const onEvt = () => cb();
  if (typeof window !== "undefined") window.addEventListener(EVENT, onEvt);
  return () => {
    listeners.delete(cb);
    if (typeof window !== "undefined") window.removeEventListener(EVENT, onEvt);
  };
}
function getSnapshot() {
  ensureHydrated();
  return memory;
}
function getServerSnapshot() {
  return empty();
}

export function setDisplayName(name: string) {
  ensureHydrated();
  memory = { ...memory, profile: { displayName: name } };
  persist();
}
export function toggleMonograph(slug: string) {
  ensureHydrated();
  memory = {
    ...memory,
    monographsStudied: {
      ...memory.monographsStudied,
      [slug]: !memory.monographsStudied[slug],
    },
  };
  persist();
}
export function togglePreparation(slug: string) {
  ensureHydrated();
  memory = {
    ...memory,
    preparationsCrafted: {
      ...memory.preparationsCrafted,
      [slug]: !memory.preparationsCrafted[slug],
    },
  };
  persist();
}
export function toggleGoal(id: string) {
  ensureHydrated();
  memory = {
    ...memory,
    goalsActive: { ...memory.goalsActive, [id]: !memory.goalsActive[id] },
  };
  persist();
}
export function addNote(n: HerbalNote) {
  ensureHydrated();
  memory = { ...memory, notes: [n, ...memory.notes] };
  persist();
}
export function removeNote(id: string) {
  ensureHydrated();
  memory = { ...memory, notes: memory.notes.filter((n) => n.id !== id) };
  persist();
}

export function currentRank(progress: HerbalProgress) {
  const monoCount = Object.values(progress.monographsStudied).filter(Boolean).length;
  const prepCount = Object.values(progress.preparationsCrafted).filter(Boolean).length;
  let earned = ranks[0];
  for (const r of ranks) {
    if (
      monoCount >= r.required.monographs &&
      prepCount >= r.required.preparations
    ) {
      earned = r;
    }
  }
  const idx = ranks.indexOf(earned);
  const next = ranks[idx + 1];
  return { current: earned, next, monoCount, prepCount };
}

export function useHerbalProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => {
    if (!hydrated) {
      ensureHydrated();
      listeners.forEach((l) => l());
    }
  }, []);
  return {
    progress,
    setDisplayName,
    toggleMonograph,
    togglePreparation,
    toggleGoal,
    addNote,
    removeNote,
  };
}
