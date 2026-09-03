import { App, initializeApp, cert, getApps } from 'firebase-admin/app';
import { getDatabase, Database } from 'firebase-admin/database';
import * as fs from 'fs';

let cachedDb: Database | null = null;

export function getFirebaseAdminApp(): App {
  const existingApps = getApps();
  if (existingApps.length > 0) {
    return existingApps[0]!;
  }

  const databaseURL =
    process.env.FIREBASE_DATABASE_URL ||
    'https://company-brain-55bbc-default-rtdb.firebaseio.com';
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    return initializeApp({
      credential: cert(serviceAccount),
      databaseURL,
    });
  }

  // Support full JSON or base64 JSON in FIREBASE_SERVICE_ACCOUNT_KEY (ideal for Vercel)
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (serviceAccountJson) {
    try {
      const parsed = JSON.parse(
        serviceAccountJson.trim().startsWith('{')
          ? serviceAccountJson
          : Buffer.from(serviceAccountJson, 'base64').toString('utf8')
      );
      return initializeApp({
        credential: cert(parsed),
        databaseURL,
      });
    } catch (e) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', e);
    }
  }

  if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    return initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
      databaseURL,
    });
  }

  throw new Error(
    'Missing Firebase Admin credentials. Please configure FIREBASE_SERVICE_ACCOUNT_KEY, FIREBASE_SERVICE_ACCOUNT_PATH, or FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY in your environment variables.'
  );
}

export function getFirebaseDb(): Database {
  if (!cachedDb) {
    cachedDb = getDatabase(getFirebaseAdminApp());
  }
  return cachedDb;
}

// Lazy proxy so importing this file during Next.js build / page-data collection
// never throws an unhandled exception before requests are handled.
export const firebaseDb = new Proxy({} as Database, {
  get(_target, prop) {
    const db = getFirebaseDb();
    const value = (db as any)[prop];
    if (typeof value === 'function') {
      return value.bind(db);
    }
    return value;
  },
});
