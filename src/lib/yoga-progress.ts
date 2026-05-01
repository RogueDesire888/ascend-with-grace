import { useEffect, useSyncExternalStore } from "react";
import { belts } from "./yoga-data";

export type SavedSequence = {
  id: string;
  name: string;
  steps: { slug: string; holdSeconds: number }[];
  createdAt: string;
};

export type YogaJournalEntry = {
  id: string;
  before: string;
  after: string;
  asanas: string[];
  createdAt: string;
};

export type YogaProgress = {
  profile: { displayName: string };
  asanas: Record<string, boolean>; // slug -> tracked
  goals: Record<string, boolean>;
  challenges: Record<string, Record<number, boolean>>;
  challengeSignups: Record<string, boolean>;
  sequences: SavedSequence[];
  journal: YogaJournalEntry[];
  sunSalutations: number;
};

const STORAGE_KEY = "ascend-yoga-v1";
const EVENT = "ascend-yoga-update";

const empty = (): YogaProgress => ({
  profile: { displayName: "" },
  asanas: {},
  goals: {},
  challenges: {},
  challengeSignups: {},
  sequences: [],
  journal: [],
  sunSalutations: 0,
});

let memory: YogaProgress = empty();
let hydrated = false;

function read(): YogaProgress {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty();
    const p = JSON.parse(raw) as Partial<YogaProgress>;
    return {
      profile: p.profile ?? { displayName: "" },
      asanas: p.asanas ?? {},
      goals: p.goals ?? {},
      challenges: p.challenges ?? {},
      challengeSignups: p.challengeSignups ?? {},
      sequences: p.sequences ?? [],
      journal: p.journal ?? [],
      sunSalutations: p.sunSalutations ?? 0,
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
export function toggleAsana(slug: string) {
  ensureHydrated();
  memory = { ...memory, asanas: { ...memory.asanas, [slug]: !memory.asanas[slug] } };
  persist();
}
export function toggleGoal(id: string) {
  ensureHydrated();
  memory = { ...memory, goals: { ...memory.goals, [id]: !memory.goals[id] } };
  persist();
}
export function toggleChallengeDay(challengeId: string, day: number) {
  ensureHydrated();
  const cur = memory.challenges[challengeId] ?? {};
  const next = { ...cur, [day]: !cur[day] };
  memory = { ...memory, challenges: { ...memory.challenges, [challengeId]: next } };
  persist();
}
export function setChallengeSignup(challengeId: string, on: boolean) {
  ensureHydrated();
  memory = {
    ...memory,
    challengeSignups: { ...memory.challengeSignups, [challengeId]: on },
  };
  persist();
}
export function saveSequence(s: SavedSequence) {
  ensureHydrated();
  memory = { ...memory, sequences: [s, ...memory.sequences] };
  persist();
}
export function deleteSequence(id: string) {
  ensureHydrated();
  memory = { ...memory, sequences: memory.sequences.filter((s) => s.id !== id) };
  persist();
}
export function addJournal(j: YogaJournalEntry) {
  ensureHydrated();
  memory = { ...memory, journal: [j, ...memory.journal] };
  persist();
}
export function incrementSunSalutations(n = 1) {
  ensureHydrated();
  memory = { ...memory, sunSalutations: memory.sunSalutations + n };
  persist();
}

export function currentBelt(progress: YogaProgress) {
  const asanaCount = Object.values(progress.asanas).filter(Boolean).length;
  const goalCount = Object.values(progress.goals).filter(Boolean).length;
  let earned = belts[0];
  for (const b of belts) {
    if (asanaCount >= b.required.asanas && goalCount >= b.required.goals) earned = b;
  }
  const idx = belts.indexOf(earned);
  const next = belts[idx + 1];
  return { current: earned, next, asanaCount, goalCount };
}

export function useYogaProgress() {
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
    toggleAsana,
    toggleGoal,
    toggleChallengeDay,
    setChallengeSignup,
    saveSequence,
    deleteSequence,
    addJournal,
    incrementSunSalutations,
  };
}
