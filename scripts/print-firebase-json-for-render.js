/**
 * Prints Firebase service account JSON as a single line for Render env var.
 * Usage: node scripts/print-firebase-json-for-render.js
 */
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const path = resolve(__dirname, '../server/secrets/firebase-admin.json');

if (!existsSync(path)) {
  console.error('File not found:', path);
  console.error('Place your Firebase Admin JSON at server/secrets/firebase-admin.json first.');
  process.exit(1);
}

const json = JSON.parse(readFileSync(path, 'utf8'));
console.log('\nCopy this entire line into Render → Environment → FIREBASE_SERVICE_ACCOUNT_JSON:\n');
console.log(JSON.stringify(json));
console.log('\n');
