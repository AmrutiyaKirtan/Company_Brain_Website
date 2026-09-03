import { App, initializeApp, cert, getApps } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import * as fs from 'fs';

function initializeFirebaseAdmin(): App {
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

  throw new Error('Missing Firebase Admin credentials in .env.local');
}

export const firebaseApp = initializeFirebaseAdmin();
export const firebaseDb = getDatabase(firebaseApp);
