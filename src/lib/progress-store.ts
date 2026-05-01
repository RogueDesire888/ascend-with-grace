import { useEffect, useMemo, useSyncExternalStore } from "react";

export type TreeKey = "herbal-wisdom" | "movement-arts";

export type LevelDef = {
  id: string;
  number: number;
  title: string;
  questCount: number;
};

export type TreeProgress = {
  quests: Record<string, boolean>;
  levels: Record<string, boolean>;
};

export type TreeSummary = {
  level: number;
  className: string;
  xp: number;
  xpInLevel: number;
  xpForNext: number;
  progress: number; // 0-100
  totalQuests: number;
  completedQuests: number;
  completedLevels: number;
  nextQuest: string;
};

const STORAGE_KEY = "ascend-progress-v1";
const EVENT = "ascend-progress-update";

const XP_PER_QUEST = 25;
const XP_PER_LEVEL = 100;

type Store = Record<TreeKey, TreeProgress>;

const empty = (): TreeProgress => ({ quests: {}, levels: {} });
const emptyStore = (): Store => ({
  "herbal-wisdom": empty(),
  "movement-arts": empty(),
});

let memory: Store = emptyStore();
let hydrated = false;

function readFromStorage(): Store {
  if (typeof window === "undefined") return emptyStore();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as Partial<Store>;
    return {
      "herbal-wisdom": {
        quests: parsed["herbal-wisdom"]?.quests ?? {},
        levels: parsed["herbal-wisdom"]?.levels ?? {},
      },
      "movement-arts": {
        quests: parsed["movement-arts"]?.quests ?? {},
        levels: parsed["movement-arts"]?.levels ?? {},
      },
    };
  } catch {
    return emptyStore();
  }
}

function migrateLegacy(store: Store): Store {
  if (typeof window === "undefined") return store;
  try {
    const legacy = window.localStorage.getItem("alchemists-path-progress-v1");
    if (legacy) {
      const parsed = JSON.parse(legacy) as TreeProgress;
      const current = store["herbal-wisdom"];
      const isEmpty =
        Object.keys(current.quests).length === 0 && Object.keys(current.levels).length === 0;
      if (isEmpty) {
        store["herbal-wisdom"] = {
          quests: { ...(parsed.quests ?? {}) },
          levels: { ...(parsed.levels ?? {}) },
        };
      }
      window.localStorage.removeItem("alchemists-path-progress-v1");
    }
  } catch {
    /* ignore */
  }
  return store;
}

function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  memory = migrateLegacy(readFromStorage());
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
    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE_KEY) {
        memory = readFromStorage();
        cb();
      }
    });
  }
  return () => {
    listeners.delete(cb);
    if (typeof window !== "undefined") {
      window.removeEventListener(EVENT, onEvt);
    }
  };
}

function getSnapshot(): Store {
  ensureHydrated();
  return memory;
}

function getServerSnapshot(): Store {
  return emptyStore();
}

export function toggleQuest(tree: TreeKey, key: string) {
  ensureHydrated();
  const t = memory[tree];
  const next: TreeProgress = {
    ...t,
    quests: { ...t.quests, [key]: !t.quests[key] },
  };
  memory = { ...memory, [tree]: next };
  persist();
}

export function toggleLevel(tree: TreeKey, levelId: string) {
  ensureHydrated();
  const t = memory[tree];
  const next: TreeProgress = {
    ...t,
    levels: { ...t.levels, [levelId]: !t.levels[levelId] },
  };
  memory = { ...memory, [tree]: next };
  persist();
}

export function summarize(
  tree: TreeProgress,
  levels: LevelDef[],
  classNames: string[],
): TreeSummary {
  const totalQuests = levels.reduce((acc, l) => acc + l.questCount, 0);
  const completedQuests = Object.values(tree.quests).filter(Boolean).length;
  const completedLevels = levels.filter((l) => tree.levels[l.id]).length;
  const xp = completedQuests * XP_PER_QUEST + completedLevels * XP_PER_LEVEL;
  const level = Math.min(levels.length, completedLevels + 1);
  const xpInLevel = xp - completedLevels * (XP_PER_LEVEL + levels[completedLevels - 1]?.questCount * XP_PER_QUEST || 0);
  // simpler: progress through current level uses completed quests within it
  const currentLevel = levels[Math.min(completedLevels, levels.length - 1)];
  const currentLevelQuests = currentLevel
    ? Array.from({ length: currentLevel.questCount }, (_, i) =>
        Boolean(tree.quests[`${currentLevel.id}-q-${i}`]),
      )
    : [];
  const doneInLevel = currentLevelQuests.filter(Boolean).length;
  const progress = currentLevel
    ? Math.round((doneInLevel / Math.max(1, currentLevel.questCount)) * 100)
    : 100;

  // Find next quest text
  let nextQuest = "All quests complete";
  for (const l of levels) {
    if (tree.levels[l.id]) continue;
    for (let i = 0; i < l.questCount; i++) {
      if (!tree.quests[`${l.id}-q-${i}`]) {
        nextQuest = `${l.title}: quest ${i + 1}`;
        break;
      }
    }
    if (nextQuest !== "All quests complete") break;
    if (!tree.levels[l.id]) {
      nextQuest = `Mark complete: ${l.title}`;
      break;
    }
  }

  const className = classNames[Math.min(level - 1, classNames.length - 1)] ?? "";

  return {
    level,
    className,
    xp,
    xpInLevel: Math.max(0, xpInLevel),
    xpForNext: XP_PER_LEVEL,
    progress,
    totalQuests,
    completedQuests,
    completedLevels,
    nextQuest,
  };
}

export function useTreeProgress(tree: TreeKey) {
  const store = useSyncExternalStore(subscribe, () => getSnapshot()[tree], () => getServerSnapshot()[tree]);
  // Hydrate once on mount client-side
  useEffect(() => {
    if (!hydrated) {
      ensureHydrated();
      listeners.forEach((l) => l());
    }
  }, []);
  return {
    progress: store,
    toggleQuest: (key: string) => toggleQuest(tree, key),
    toggleLevel: (id: string) => toggleLevel(tree, id),
  };
}

export function useTreeSummary(tree: TreeKey, levels: LevelDef[], classNames: string[]) {
  const { progress } = useTreeProgress(tree);
  // memoize on stringified inputs
  const key = useMemo(
    () => JSON.stringify({ q: progress.quests, l: progress.levels }),
    [progress],
  );
  return useMemo(() => summarize(progress, levels, classNames), [key, levels, classNames]);
}
