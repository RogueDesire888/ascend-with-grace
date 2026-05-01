import { useEffect, useSyncExternalStore } from "react";
import { rankByXp, xpRules, type ReactionKey } from "./community-data";

export type ComposedPost = {
  id: string;
  tab: "wins" | "questions" | "logs" | "field-notes";
  modality: string;
  body: string;
  createdAt: string;
};

export type CommunityState = {
  displayName: string;
  intentionToday: { chipId: string; text: string; date: string } | null;
  streak: { count: number; lastCheckIn: string | null; graceUsed: boolean };
  xpThisWeek: number;
  xpAllTime: number;
  joinedCircles: string[];
  joinedChallenges: string[];
  challengeDays: Record<string, number>; // challengeId → days completed
  reactions: Record<string, ReactionKey>; // postId → reaction
  earnedBadges: string[];
  composedPosts: ComposedPost[];
};

const STORAGE_KEY = "ascend-community-v1";
const EVENT = "ascend-community-update";

const empty = (): CommunityState => ({
  displayName: "",
  intentionToday: null,
  streak: { count: 0, lastCheckIn: null, graceUsed: false },
  xpThisWeek: 0,
  xpAllTime: 0,
  joinedCircles: [],
  joinedChallenges: [],
  challengeDays: {},
  reactions: {},
  earnedBadges: [],
  composedPosts: [],
});

let memory: CommunityState = empty();
let hydrated = false;

function read(): CommunityState {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty();
    const p = JSON.parse(raw) as Partial<CommunityState>;
    return { ...empty(), ...p } as CommunityState;
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

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function awardXp(amount: number) {
  memory = {
    ...memory,
    xpThisWeek: memory.xpThisWeek + amount,
    xpAllTime: memory.xpAllTime + amount,
  };
}

function maybeBadge(id: string) {
  if (memory.earnedBadges.includes(id)) return;
  memory = { ...memory, earnedBadges: [...memory.earnedBadges, id] };
}

export function setDisplayName(name: string) {
  ensureHydrated();
  memory = { ...memory, displayName: name };
  persist();
}

export function setIntention(chipId: string, text: string) {
  ensureHydrated();
  const t = today();
  const isNew = memory.intentionToday?.date !== t;
  memory = { ...memory, intentionToday: { chipId, text, date: t } };
  if (isNew) {
    // streak logic
    const last = memory.streak.lastCheckIn;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    let count = memory.streak.count;
    let graceUsed = memory.streak.graceUsed;
    if (last === t) {
      // already counted
    } else if (last === yesterday) {
      count += 1;
    } else if (last && !graceUsed) {
      // grace day
      count += 1;
      graceUsed = true;
    } else {
      count = 1;
      graceUsed = false;
    }
    memory = { ...memory, streak: { count, lastCheckIn: t, graceUsed } };
    awardXp(xpRules.dailyIntention);
    if (count >= 7) maybeBadge("seven-day-sit");
    if (count >= 30) maybeBadge("thirty-day");
  }
  persist();
}

export function joinCircle(id: string) {
  ensureHydrated();
  if (memory.joinedCircles.includes(id)) return;
  memory = { ...memory, joinedCircles: [...memory.joinedCircles, id] };
  persist();
}
export function leaveCircle(id: string) {
  ensureHydrated();
  memory = { ...memory, joinedCircles: memory.joinedCircles.filter((c) => c !== id) };
  persist();
}

export function joinChallenge(id: string) {
  ensureHydrated();
  if (memory.joinedChallenges.includes(id)) return;
  memory = { ...memory, joinedChallenges: [...memory.joinedChallenges, id] };
  persist();
}
export function logChallengeDay(id: string) {
  ensureHydrated();
  const cur = memory.challengeDays[id] ?? 0;
  memory = { ...memory, challengeDays: { ...memory.challengeDays, [id]: cur + 1 } };
  awardXp(xpRules.challengeDay);
  persist();
}

export function react(postId: string, key: ReactionKey) {
  ensureHydrated();
  const next = { ...memory.reactions };
  if (next[postId] === key) {
    delete next[postId];
  } else {
    next[postId] = key;
  }
  memory = { ...memory, reactions: next };
  persist();
}

export function compose(post: Omit<ComposedPost, "id" | "createdAt">) {
  ensureHydrated();
  const full: ComposedPost = {
    ...post,
    id: `local-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  memory = { ...memory, composedPosts: [full, ...memory.composedPosts] };
  awardXp(xpRules.post);
  if (memory.composedPosts.length === 1) maybeBadge("first-post");
  persist();
}

export function recordReply() {
  ensureHydrated();
  awardXp(xpRules.reply);
  if (!memory.earnedBadges.includes("first-reply")) maybeBadge("first-reply");
  persist();
}

export function useCommunity() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => {
    if (!hydrated) {
      ensureHydrated();
      listeners.forEach((l) => l());
    }
  }, []);
  const rank = rankByXp(state.xpAllTime);
  return {
    state,
    rank,
    setDisplayName,
    setIntention,
    joinCircle,
    leaveCircle,
    joinChallenge,
    logChallengeDay,
    react,
    compose,
    recordReply,
  };
}
