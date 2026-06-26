import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase.js';
import {
  FUTURE_USER_FIELDS,
  USERS_COLLECTION,
} from './constants.js';
import {
  onPackWrite,
  PACK_IDS,
  readRootStore,
  writeRootStore,
  getPackProgress,
  setPackProgress,
  sanitizePackProgress,
} from '../progress-store.js';
import { invalidateProgressCache } from '../progress-facade.js';

const PROGRESS_SUBCOLLECTION = 'progress';
const META_DOC_ID = '_meta';
const ALLOWED_PACK_IDS = new Set(Object.values(PACK_IDS));
const DEBOUNCE_MS = 1000;
const SESSION_BOOTSTRAP_PREFIX = 'lp_progress_bootstrapped_';

let syncUserId = null;
let isApplyingRemote = false;
let syncReadyPromise = null;
let syncReadyResolve = null;

const debounceTimers = new Map();
const syncUpdateListeners = new Set();

function sessionBootstrapKey(uid) {
  return `${SESSION_BOOTSTRAP_PREFIX}${uid}`;
}

function isSessionBootstrapped(uid) {
  if (!uid) return false;
  try {
    return sessionStorage.getItem(sessionBootstrapKey(uid)) === '1';
  } catch {
    return false;
  }
}

function markSessionBootstrapped(uid) {
  if (!uid) return;
  try {
    sessionStorage.setItem(sessionBootstrapKey(uid), '1');
  } catch {
    // sessionStorage unavailable
  }
}

function clearSessionBootstrap(uid) {
  if (!uid) return;
  try {
    sessionStorage.removeItem(sessionBootstrapKey(uid));
  } catch {
    // sessionStorage unavailable
  }
}

function resetSyncReady() {
  syncReadyPromise = new Promise((resolve) => {
    syncReadyResolve = resolve;
  });
}

resetSyncReady();

function markSyncReady() {
  syncReadyResolve?.();
}

function notifyProgressSyncUpdated(changed) {
  for (const listener of syncUpdateListeners) {
    try {
      listener({ changed });
    } catch (err) {
      console.error('Progress sync listener failed:', err);
    }
  }
}

export function onProgressSyncUpdated(listener) {
  syncUpdateListeners.add(listener);
  return () => syncUpdateListeners.delete(listener);
}

export function waitForProgressSync() {
  return syncReadyPromise ?? Promise.resolve();
}

function progressDocRef(uid, packId) {
  return doc(db, USERS_COLLECTION, uid, PROGRESS_SUBCOLLECTION, packId);
}

function metaDocRef(uid) {
  return doc(db, USERS_COLLECTION, uid, PROGRESS_SUBCOLLECTION, META_DOC_ID);
}

function pickNewerPack(local, remote) {
  if (!remote || typeof remote !== 'object' || !remote.packId) return null;
  if (!ALLOWED_PACK_IDS.has(remote.packId)) return null;
  if (!local?.updatedAt) return remote;
  if (!remote.updatedAt) return null;
  return new Date(remote.updatedAt) >= new Date(local.updatedAt) ? remote : null;
}

export function mergePack(local, remote) {
  return pickNewerPack(local, remote);
}

async function pullProgress(uid) {
  const colRef = collection(db, USERS_COLLECTION, uid, PROGRESS_SUBCOLLECTION);
  const snap = await getDocs(colRef);
  const root = readRootStore();
  let changed = false;

  snap.forEach((docSnap) => {
    const packId = docSnap.id;
    if (packId === META_DOC_ID) return;
    if (!ALLOWED_PACK_IDS.has(packId)) return;

    const remote = docSnap.data();
    const local = getPackProgress(root, packId);
    const winner = pickNewerPack(local, remote);
    if (winner && winner !== local) {
      setPackProgress(root, packId, winner);
      changed = true;
    }
  });

  if (changed) {
    isApplyingRemote = true;
    writeRootStore(root, { suppressSync: true });
    isApplyingRemote = false;
    invalidateProgressCache();
  }

  return changed;
}

async function migrateLocalToCloud(uid) {
  const root = readRootStore();
  const uploads = [];

  for (const packId of ALLOWED_PACK_IDS) {
    const pack = root.packs?.[packId];
    const hasData = pack && (
      pack.completed?.length > 0
      || pack.lastVisited != null
      || Object.keys(pack.steps || {}).length > 0
    );
    if (!hasData) continue;

    try {
      const remoteSnap = await getDoc(progressDocRef(uid, packId));
      if (remoteSnap.exists()) {
        const remote = remoteSnap.data();
        const newerRemote = pickNewerPack(pack, remote);
        if (newerRemote && newerRemote !== pack) continue;
      }
      uploads.push(pushPackProgress(uid, packId, pack, { immediate: true }));
    } catch (err) {
      console.error('Failed to migrate pack', packId, err);
    }
  }

  await Promise.all(uploads);
}

async function pushPackProgress(uid, packId, packData, { immediate = false } = {}) {
  if (!uid || !packId || !ALLOWED_PACK_IDS.has(packId)) return;

  const payload = sanitizePackProgressForCloud(packData, packId);

  const write = async () => {
    try {
      await setDoc(progressDocRef(uid, packId), payload, { merge: true });
      await setDoc(metaDocRef(uid), {
        schemaVersion: 4,
        lastPackSync: packId,
        lastSyncedAt: new Date().toISOString(),
      }, { merge: true });
    } catch (err) {
      console.error('Failed to push progress for', packId, err);
    }
  };

  if (immediate) {
    await write();
    return;
  }

  if (debounceTimers.has(packId)) {
    clearTimeout(debounceTimers.get(packId));
  }

  debounceTimers.set(packId, setTimeout(() => {
    debounceTimers.delete(packId);
    write();
  }, DEBOUNCE_MS));
}

function sanitizePackProgressForCloud(packData, packId) {
  return sanitizePackProgress({ ...packData, packId }, packId);
}

function schedulePush(packId, packData) {
  if (isApplyingRemote || !syncUserId) return;
  pushPackProgress(syncUserId, packId, packData);
}

async function updateUserProgressSyncMeta(uid) {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) return;
    await updateDoc(userRef, {
      [FUTURE_USER_FIELDS.progressSync]: {
        schemaVersion: 4,
        lastSyncedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.warn('Could not update progressSync meta on user doc:', err);
  }
}

async function runFullProgressSync(uid) {
  await pullProgress(uid);
  await migrateLocalToCloud(uid);
  await updateUserProgressSyncMeta(uid);
  markSessionBootstrapped(uid);
}

async function runBackgroundProgressSync(uid) {
  try {
    const changed = await pullProgress(uid);
    if (changed) {
      notifyProgressSyncUpdated(true);
    }
  } catch (err) {
    console.error('Background progress sync failed:', err);
  }
}

export async function initProgressSync(user) {
  const previousUid = syncUserId;

  if (!user?.uid) {
    if (previousUid) {
      clearSessionBootstrap(previousUid);
    }
    syncUserId = null;
    resetSyncReady();
    markSyncReady();
    return;
  }

  const uid = user.uid;
  const uidChanged = previousUid !== uid;
  syncUserId = uid;

  const sessionReady = !uidChanged && isSessionBootstrapped(uid);

  if (sessionReady) {
    resetSyncReady();
    markSyncReady();
    runBackgroundProgressSync(uid);
    return;
  }

  resetSyncReady();

  try {
    await runFullProgressSync(uid);
  } catch (err) {
    console.error('Progress sync initialization failed:', err);
  } finally {
    markSyncReady();
  }
}

onPackWrite((packId, packData) => {
  schedulePush(packId, packData);
});
