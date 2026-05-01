import { useEffect, useSyncExternalStore } from "react";
import { tiers } from "./tai-chi-data";

export type TaiChiJournalEntry = {
  id: string;
  before: string;
  after: string;
  postures: string[];
  createdAt: string;
};

export type TaiChiProgress = {
  postures: Record<string, boolean>;
  forms: Record<string, boolean>;
  goals: Record<string, boolean>;
  challengeDays: Record<number, boolean>;
  pushHandsTier: number;
  daysPracticed: number;
  journal: TaiChiJournalEntry[];
};

const STORAGE_KEY = "ascend-taichi-v1";
const EVENT = "ascend-taichi-update";

const empty = (): TaiChiProgress => ({
  postures: {},
  forms: {},
  goals: {},
  challengeDays: {},
  pushHandsTier: 0,
  daysPracticed: 0,
  journal: [],
});

let memory: TaiChiProgress = empty();
let hydrated = false;

function read(): TaiChiProgress {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty();
    const p = JSON.parse(raw) as Partial<TaiChiProgress>;
    return { ...empty(), ...p };
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

function subscribe(cb: () => void) {
  const onEvt = () => cb();
  if (typeof window !== "undefined") window.addEventListener(EVENT, onEvt);
  return () => {
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

export function togglePosture(slug: string) {
  ensureHydrated();
  memory = { ...memory, postures: { ...memory.postures, [slug]: !memory.postures[slug] } };
  persist();
}
export function toggleForm(slug: string) {
  ensureHydrated();
  memory = { ...memory, forms: { ...memory.forms, [slug]: !memory.forms[slug] } };
  persist();
}
export function toggleGoal(id: string) {
  ensureHydrated();
  memory = { ...memory, goals: { ...memory.goals, [id]: !memory.goals[id] } };
  persist();
}
export function toggleChallengeDay(day: number) {
  ensureHydrated();
  memory = {
    ...memory,
    challengeDays: { ...memory.challengeDays, [day]: !memory.challengeDays[day] },
  };
  persist();
}
export function setPushHandsTier(t: number) {
  ensureHydrated();
  memory = { ...memory, pushHandsTier: t };
  persist();
}
export function logPracticeDay() {
  ensureHydrated();
  memory = { ...memory, daysPracticed: memory.daysPracticed + 1 };
  persist();
}
export function addJournal(j: TaiChiJournalEntry) {
  ensureHydrated();
  memory = { ...memory, journal: [j, ...memory.journal] };
  persist();
}

export function currentTier(progress: TaiChiProgress) {
  const postureCount = Object.values(progress.postures).filter(Boolean).length;
  const goalCount = Object.values(progress.goals).filter(Boolean).length;
  let earned = tiers[0];
  for (const t of tiers) {
    if (
      postureCount >= t.required.postures &&
      goalCount >= t.required.goals &&
      progress.daysPracticed >= t.required.daysPracticed
    ) {
      earned = t;
    }
  }
  const idx = tiers.indexOf(earned);
  return { current: earned, next: tiers[idx + 1], postureCount, goalCount };
}

export function useTaiChiProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => {
    if (!hydrated) ensureHydrated();
  }, []);
  return {
    progress,
    togglePosture,
    toggleForm,
    toggleGoal,
    toggleChallengeDay,
    setPushHandsTier,
    logPracticeDay,
    addJournal,
  };
}
