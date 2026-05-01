import { useEffect, useSyncExternalStore } from "react";

export type SmoothieProgress = {
  recipes: Record<string, boolean>;
  quests: Record<string, boolean>;
  levels: Record<string, boolean>;
  dailyBlend: { lastDate: string; dayCount: number };
};

const STORAGE_KEY = "smoothie-codex-progress-v1";
const EVENT = "smoothie-codex-progress-update";

const empty = (): SmoothieProgress => ({
  recipes: {},
  quests: {},
  levels: {},
  dailyBlend: { lastDate: "", dayCount: 0 },
});

let memory: SmoothieProgress = empty();
let hydrated = false;

function readFromStorage(): SmoothieProgress {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as Partial<SmoothieProgress>;
    return {
      recipes: parsed.recipes ?? {},
      quests: parsed.quests ?? {},
      levels: parsed.levels ?? {},
      dailyBlend: parsed.dailyBlend ?? { lastDate: "", dayCount: 0 },
    };
  } catch {
    return empty();
  }
}

function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  memory = readFromStorage();
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
  if (typeof window !== "undefined") {
    window.addEventListener(EVENT, onEvt);
  }
  return () => {
    listeners.delete(cb);
    if (typeof window !== "undefined") {
      window.removeEventListener(EVENT, onEvt);
    }
  };
}

function getSnapshot(): SmoothieProgress {
  ensureHydrated();
  return memory;
}

function getServerSnapshot(): SmoothieProgress {
  return empty();
}

function bumpDailyBlend() {
  const today = new Date().toISOString().slice(0, 10);
  if (memory.dailyBlend.lastDate === today) return;
  memory.dailyBlend = {
    lastDate: today,
    dayCount: memory.dailyBlend.dayCount + 1,
  };
}

export function toggleRecipe(key: string) {
  ensureHydrated();
  const next = !memory.recipes[key];
  memory = { ...memory, recipes: { ...memory.recipes, [key]: next } };
  if (next) bumpDailyBlend();
  persist();
}

export function toggleQuest(key: string) {
  ensureHydrated();
  memory = {
    ...memory,
    quests: { ...memory.quests, [key]: !memory.quests[key] },
  };
  persist();
}

export function toggleLevel(id: string) {
  ensureHydrated();
  memory = {
    ...memory,
    levels: { ...memory.levels, [id]: !memory.levels[id] },
  };
  persist();
}

export function useSmoothieProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => {
    if (!hydrated) {
      ensureHydrated();
      listeners.forEach((l) => l());
    }
  }, []);
  return { progress, toggleRecipe, toggleQuest, toggleLevel };
}
