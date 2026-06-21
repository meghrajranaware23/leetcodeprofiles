/* ══════════════════════════════════════════════════════════
   PROGRESS STORE — Pack-based localStorage architecture
   Root key: ascension-progress · schema v4
   ══════════════════════════════════════════════════════════ */

export const ROOT_STORAGE_KEY = 'ascension-progress';
/** @deprecated Use ROOT_STORAGE_KEY — kept for backward compatibility */
export const STORAGE_KEY = ROOT_STORAGE_KEY;

export const ROOT_SCHEMA_VERSION = 4;
export const PACK_SCHEMA_VERSION = 1;
export const SCHEMA_ID = 'ascension-progress/v4';

/** Canonical pack identifiers — collision-safe namespace keys */
export const PACK_IDS = Object.freeze({
  ARRAYS_STRINGS: 'arrays-strings',
  GRAPHS: 'graphs',
  TREES: 'trees',
  DP: 'dynamic-programming',
  RECURSION: 'recursion',
  STARTER: 'leetcode-starter',
});

/** Default pack for the live Arrays & Strings reader */
export const DEFAULT_PACK_ID = PACK_IDS.ARRAYS_STRINGS;

/** Registry of all packs (extensible as new readers ship) */
export const PACK_REGISTRY = Object.freeze({
  [PACK_IDS.ARRAYS_STRINGS]: {
    id: PACK_IDS.ARRAYS_STRINGS,
    title: 'Arrays & Strings Ascension',
    shortTitle: 'Arrays & Strings',
    readerUrl: './course-reader.html',
    available: true,
  },
  [PACK_IDS.GRAPHS]: {
    id: PACK_IDS.GRAPHS,
    title: 'Graphs Ascension',
    shortTitle: 'Graphs',
    readerUrl: './graphs-reader.html',
    available: true,
  },
  [PACK_IDS.TREES]: {
    id: PACK_IDS.TREES,
    title: 'Trees Ascension',
    shortTitle: 'Trees',
    readerUrl: './trees-reader.html',
    available: true,
  },
  [PACK_IDS.DP]: {
    id: PACK_IDS.DP,
    title: 'Dynamic Programming Ascension',
    shortTitle: 'Dynamic Programming',
    readerUrl: './dp-reader.html',
    available: true,
  },
  [PACK_IDS.RECURSION]: {
    id: PACK_IDS.RECURSION,
    title: 'Recursion & Backtracking Ascension',
    shortTitle: 'Recursion & Backtracking',
    readerUrl: './recursion-reader.html',
    available: true,
  },
  [PACK_IDS.STARTER]: {
    id: PACK_IDS.STARTER,
    title: 'LeetCode Starter Path',
    shortTitle: 'Starter Path',
    readerUrl: '/starter',
    available: true,
    kind: 'onboarding',
    durationDays: 15,
  },
});

const LEGACY_FLAT_PACK_ID = DEFAULT_PACK_ID;
const PACK_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function createEmptyPackProgress(packId = DEFAULT_PACK_ID) {
  return {
    version: PACK_SCHEMA_VERSION,
    packId,
    updatedAt: new Date().toISOString(),
    completed: [],
    steps: {},
    lastVisited: null,
    achievements: {},
    milestonesShown: [],
  };
}

export function createEmptyRootStore(activePackId = DEFAULT_PACK_ID) {
  return {
    version: ROOT_SCHEMA_VERSION,
    schema: SCHEMA_ID,
    updatedAt: new Date().toISOString(),
    activePackId,
    packs: {},
  };
}

function sanitizePackId(value, fallback = DEFAULT_PACK_ID) {
  if (typeof value === 'string' && PACK_ID_PATTERN.test(value)) return value;
  return fallback;
}

function sanitizeStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value.filter(id => typeof id === 'string' && id.length > 0);
}

function sanitizeSteps(value) {
  if (!value || typeof value !== 'object') return {};
  const out = {};
  Object.entries(value).forEach(([lessonId, steps]) => {
    if (typeof lessonId !== 'string' || !steps || typeof steps !== 'object') return;
    out[lessonId] = {};
    Object.entries(steps).forEach(([stepId, done]) => {
      if (done) out[lessonId][stepId] = true;
    });
  });
  return out;
}

function sanitizeAchievements(value) {
  if (!value || typeof value !== 'object') return {};
  const out = {};
  Object.entries(value).forEach(([id, ts]) => {
    if (typeof id === 'string' && typeof ts === 'string') out[id] = ts;
  });
  return out;
}

function sanitizeLastVisited(value) {
  if (!value || typeof value !== 'object') return null;
  const lessonId = typeof value.lessonId === 'string' ? value.lessonId : null;
  const lessonIndex = Number.isInteger(value.lessonIndex) ? value.lessonIndex : -1;
  if (!lessonId) return null;
  return {
    lessonId,
    lessonIndex: lessonIndex >= 0 ? lessonIndex : -1,
    updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : new Date().toISOString(),
  };
}

export function sanitizePackProgress(raw, packId = DEFAULT_PACK_ID) {
  const id = sanitizePackId(raw?.packId, packId);
  return {
    version: PACK_SCHEMA_VERSION,
    packId: id,
    updatedAt: raw?.updatedAt || new Date().toISOString(),
    completed: sanitizeStringArray(raw?.completed),
    steps: sanitizeSteps(raw?.steps),
    lastVisited: sanitizeLastVisited(raw?.lastVisited),
    achievements: sanitizeAchievements(raw?.achievements),
    milestonesShown: sanitizeStringArray(raw?.milestonesShown),
  };
}

export function sanitizeRootStore(raw) {
  const root = createEmptyRootStore(DEFAULT_PACK_ID);
  if (!raw || typeof raw !== 'object') return root;

  root.updatedAt = typeof raw.updatedAt === 'string' ? raw.updatedAt : new Date().toISOString();
  root.activePackId = sanitizePackId(raw.activePackId, DEFAULT_PACK_ID);

  const packs = raw.packs && typeof raw.packs === 'object' ? raw.packs : {};
  Object.entries(packs).forEach(([key, packRaw]) => {
    const packId = sanitizePackId(key);
    if (!packId) return;
    root.packs[packId] = sanitizePackProgress(packRaw, packId);
  });

  if (!root.packs[root.activePackId]) {
    root.packs[root.activePackId] = createEmptyPackProgress(root.activePackId);
  }

  return root;
}

function isFlatLegacyProgress(raw) {
  if (!raw || typeof raw !== 'object') return false;
  if (raw.packs && typeof raw.packs === 'object') return false;
  return (
    Array.isArray(raw.completed) ||
    (raw.steps && typeof raw.steps === 'object') ||
    raw.lastVisited != null ||
    raw.packId != null
  );
}

function migrateFlatToPack(raw, packId = LEGACY_FLAT_PACK_ID) {
  const completed = sanitizeStringArray(raw.completed);
  const pack = sanitizePackProgress({
    version: raw.version,
    packId: raw.packId || packId,
    updatedAt: raw.updatedAt,
    completed,
    steps: raw.steps,
    lastVisited: raw.lastVisited,
    achievements: raw.achievements,
    milestonesShown: raw.milestonesShown,
  }, packId);

  if ((!raw.version || raw.version < 3) && !pack.lastVisited && completed.length > 0) {
    pack.lastVisited = {
      lessonId: completed[completed.length - 1],
      lessonIndex: -1,
      updatedAt: new Date().toISOString(),
    };
  }

  return pack;
}

export function migrateRootStore(raw) {
  if (!raw || typeof raw !== 'object') {
    return createEmptyRootStore(DEFAULT_PACK_ID);
  }

  if (raw.version >= ROOT_SCHEMA_VERSION && raw.packs && typeof raw.packs === 'object') {
    return sanitizeRootStore(raw);
  }

  if (isFlatLegacyProgress(raw)) {
    const root = createEmptyRootStore(LEGACY_FLAT_PACK_ID);
    root.packs[LEGACY_FLAT_PACK_ID] = migrateFlatToPack(raw, LEGACY_FLAT_PACK_ID);
    root.activePackId = LEGACY_FLAT_PACK_ID;
    return root;
  }

  return sanitizeRootStore(raw);
}

export function readRootStore() {
  try {
    const raw = localStorage.getItem(ROOT_STORAGE_KEY);
    if (!raw) return createEmptyRootStore(DEFAULT_PACK_ID);
    return migrateRootStore(JSON.parse(raw));
  } catch {
    return createEmptyRootStore(DEFAULT_PACK_ID);
  }
}

export function writeRootStore(root, options = {}) {
  const { suppressSync = false } = options;
  try {
    const payload = {
      ...root,
      version: ROOT_SCHEMA_VERSION,
      schema: SCHEMA_ID,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(ROOT_STORAGE_KEY, JSON.stringify(payload));

    if (!suppressSync) {
      const packId = payload.activePackId;
      if (packId && payload.packs?.[packId]) {
        packChangeListeners.forEach((listener) => {
          try {
            listener(packId, payload.packs[packId]);
          } catch (err) {
            console.warn('Progress write listener failed:', err);
          }
        });
      }
    }

    return true;
  } catch (err) {
    console.warn('Could not write progress to localStorage:', err);
    return false;
  }
}

const packChangeListeners = new Set();

/** Subscribe to pack progress writes (used by cloud sync). Returns unsubscribe fn. */
export function onPackWrite(listener) {
  packChangeListeners.add(listener);
  return () => packChangeListeners.delete(listener);
}

export function getPackProgress(root, packId = DEFAULT_PACK_ID) {
  const id = sanitizePackId(packId);
  if (!root.packs[id]) {
    root.packs[id] = createEmptyPackProgress(id);
  }
  return root.packs[id];
}

export function setPackProgress(root, packId, packData) {
  const id = sanitizePackId(packId);
  root.packs[id] = sanitizePackProgress({ ...packData, packId: id }, id);
  root.packs[id].updatedAt = new Date().toISOString();
}

export function resolveLessonIndex(lessons, lastVisited) {
  if (!lastVisited?.lessonId) return -1;
  if (
    Number.isInteger(lastVisited.lessonIndex) &&
    lastVisited.lessonIndex >= 0 &&
    lessons[lastVisited.lessonIndex]?.id === lastVisited.lessonId
  ) {
    return lastVisited.lessonIndex;
  }
  return lessons.findIndex(l => l.id === lastVisited.lessonId && l.content);
}
