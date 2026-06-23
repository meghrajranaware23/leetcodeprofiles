import admin from 'firebase-admin';

const EXPECTED_PROJECT_ID = 'leetcodeprofiles-ee772';

let initialized = false;

function parseServiceAccountJson(raw) {
  if (!raw || typeof raw !== 'string') {
    throw new Error('Firebase service account JSON is empty');
  }

  try {
    return JSON.parse(raw.trim());
  } catch (err) {
    throw new Error(
      `Invalid FIREBASE_SERVICE_ACCOUNT_JSON — paste the full JSON from Firebase Console as one line. ${err.message}`
    );
  }
}

function loadServiceAccountFromEnv() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return parseServiceAccountJson(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    const decoded = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8');
    return parseServiceAccountJson(decoded);
  }

  return null;
}

async function loadServiceAccountFromFile() {
  const pathFromEnv = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (!pathFromEnv) return null;

  const { readFileSync, existsSync } = await import('fs');
  const { resolve } = await import('path');
  const absPath = resolve(process.cwd(), pathFromEnv);

  if (!existsSync(absPath)) {
    throw new Error(`Firebase service account not found at ${absPath}`);
  }

  return JSON.parse(readFileSync(absPath, 'utf8'));
}

async function loadServiceAccount() {
  const fromEnv = loadServiceAccountFromEnv();
  if (fromEnv) return fromEnv;

  const fromFile = await loadServiceAccountFromFile();
  if (fromFile) return fromFile;

  throw new Error(
    'Set FIREBASE_SERVICE_ACCOUNT_JSON (Render) or FIREBASE_SERVICE_ACCOUNT_PATH (local) for Firebase Admin'
  );
}

export async function initFirebaseAdmin() {
  if (initialized) return admin;

  const serviceAccount = await loadServiceAccount();
  if (serviceAccount.project_id !== EXPECTED_PROJECT_ID) {
    throw new Error(
      `Firebase service account project_id must be ${EXPECTED_PROJECT_ID}, got ${serviceAccount.project_id}`
    );
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: EXPECTED_PROJECT_ID,
  });

  initialized = true;
  return admin;
}

export function getDb() {
  if (!initialized) {
    throw new Error('Firebase Admin not initialized — call initFirebaseAdmin() first');
  }
  return admin.firestore();
}

export function getAuth() {
  if (!initialized) {
    throw new Error('Firebase Admin not initialized — call initFirebaseAdmin() first');
  }
  return admin.auth();
}
