import admin from 'firebase-admin';

const EXPECTED_PROJECT_ID = 'leetcodeprofiles-ee772';

let initialized = false;

/** Fix private_key newlines mangled by Render/env var paste (literal \\n vs real newlines). */
function normalizeServiceAccount(credentials) {
  if (!credentials || typeof credentials !== 'object') {
    throw new Error('Invalid service account credentials');
  }

  if (typeof credentials.private_key === 'string') {
    let key = credentials.private_key.trim();

    // Render/dashboard paste often stores literal "\n" instead of newline characters
    if (key.includes('\\n')) {
      key = key.replace(/\\n/g, '\n');
    }

    // If PEM header/body were collapsed onto one line without any newlines
    if (key.includes('-----BEGIN PRIVATE KEY-----') && !key.includes('\n')) {
      key = key
        .replace('-----BEGIN PRIVATE KEY-----', '-----BEGIN PRIVATE KEY-----\n')
        .replace('-----END PRIVATE KEY-----', '\n-----END PRIVATE KEY-----\n');
    }

    credentials.private_key = key;
  }

  return credentials;
}

function parseServiceAccountJson(raw) {
  if (!raw || typeof raw !== 'string') {
    throw new Error('Firebase service account JSON is empty');
  }

  let parsed;
  try {
    parsed = JSON.parse(raw.trim());
  } catch (err) {
    throw new Error(
      `Invalid FIREBASE_SERVICE_ACCOUNT_JSON — use npm run print:firebase-json and paste exactly, or use FIREBASE_SERVICE_ACCOUNT_BASE64. ${err.message}`
    );
  }

  return normalizeServiceAccount(parsed);
}

function loadServiceAccountFromEnv() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    const decoded = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8');
    return parseServiceAccountJson(decoded);
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return parseServiceAccountJson(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
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

  return normalizeServiceAccount(JSON.parse(readFileSync(absPath, 'utf8')));
}

async function loadServiceAccount() {
  const fromEnv = loadServiceAccountFromEnv();
  if (fromEnv) return fromEnv;

  const fromFile = await loadServiceAccountFromFile();
  if (fromFile) return fromFile;

  throw new Error(
    'Set FIREBASE_SERVICE_ACCOUNT_BASE64 or FIREBASE_SERVICE_ACCOUNT_JSON (Render) or FIREBASE_SERVICE_ACCOUNT_PATH (local)'
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
