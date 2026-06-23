/**
 * Prints Firebase service account for Render env vars.
 * Usage: npm run print:firebase-json
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
const oneLine = JSON.stringify(json);
const base64 = Buffer.from(oneLine).toString('base64');

console.log('\n=== RECOMMENDED for Render (most reliable) ===\n');
console.log('Variable name: FIREBASE_SERVICE_ACCOUNT_BASE64');
console.log('Value (copy entire line below):\n');
console.log(base64);

console.log('\n=== Alternative: FIREBASE_SERVICE_ACCOUNT_JSON ===\n');
console.log('Variable name: FIREBASE_SERVICE_ACCOUNT_JSON');
console.log('Value (copy entire line below):\n');
console.log(oneLine);

console.log('\nRemove FIREBASE_SERVICE_ACCOUNT_JSON from Render if you use BASE64 instead.\n');
