import { useEffect, useSyncExternalStore } from "react";
import { belts } from "./breathwork-data";

export type SavedSession = {
  id: string;
  name: string;
  steps: { phase: "inhale" | "holdIn" | "exhale" | "holdOut"; seconds: number }[];
  createdAt: string;
};

export type JournalEntry = {
  id: string;
  sessionId?: string;
  before: string;
  after: string;
  createdAt: string;
};

export type ForumPost = {
  id: string;
  category: "experiences" | "qa" | "science";
  author: string;
  title: string;
  body: string;
  createdAt: string;
};

export type BreathProgress = {
  profile: { displayName: string };
  phases: Record<string, boolean>;
  techniques: Record<string, boolean>;
  challenges: Record<string, Record<number, boolean>>;
  challengeSignups: Record<string, boolean>;
  sessions: SavedSession[];
  journal: JournalEntry[];
  forum: ForumPost[];
};

const STORAGE_KEY = "ascend-breathwork-v1";
const EVENT = "ascend-breathwork-update";

const empty = (): BreathProgress => ({
  profile: { displayName: "" },
  phases: {},
  techniques: {},
  challenges: {},
  challengeSignups: {},
  sessions: [],
  journal: [],
  forum: [],
});

let memory: BreathProgress = empty();
let hydrated = false;

function read(): BreathProgress {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty();
    const p = JSON.parse(raw) as Partial<BreathProgress>;
    return {
      profile: p.profile ?? { displayName: "" },
      phases: p.phases ?? {},
      techniques: p.techniques ?? {},
      challenges: p.challenges ?? {},
      challengeSignups: p.challengeSignups ?? {},
      sessions: p.sessions ?? [],
      journal: p.journal ?? [],
      forum: p.forum ?? [],
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
export function togglePhase(id: string) {
  ensureHydrated();
  memory = { ...memory, phases: { ...memory.phases, [id]: !memory.phases[id] } };
  persist();
}
export function toggleTechnique(slug: string) {
  ensureHydrated();
  memory = {
    ...memory,
    techniques: { ...memory.techniques, [slug]: !memory.techniques[slug] },
  };
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
export function saveSession(s: SavedSession) {
  ensureHydrated();
  memory = { ...memory, sessions: [s, ...memory.sessions] };
  persist();
}
export function deleteSession(id: string) {
  ensureHydrated();
  memory = { ...memory, sessions: memory.sessions.filter((s) => s.id !== id) };
  persist();
}
export function addJournal(j: JournalEntry) {
  ensureHydrated();
  memory = { ...memory, journal: [j, ...memory.journal] };
  persist();
}
export function addForumPost(p: ForumPost) {
  ensureHydrated();
  memory = { ...memory, forum: [p, ...memory.forum] };
  persist();
}

export function currentBelt(progress: BreathProgress) {
  const phaseCount = Object.values(progress.phases).filter(Boolean).length;
  const techCount = Object.values(progress.techniques).filter(Boolean).length;
  let earned = belts[0];
  for (const b of belts) {
    if (phaseCount >= b.required.phases && techCount >= b.required.techniques) earned = b;
  }
  const idx = belts.indexOf(earned);
  const next = belts[idx + 1];
  return { current: earned, next, phaseCount, techCount };
}

export function useBreathProgress() {
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
    togglePhase,
    toggleTechnique,
    toggleChallengeDay,
    setChallengeSignup,
    saveSession,
    deleteSession,
    addJournal,
    addForumPost,
  };
}
