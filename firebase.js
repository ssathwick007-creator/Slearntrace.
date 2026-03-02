// Firebase initialization — single instance, npm imports (Vite-compatible)
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, query, orderBy, where, limit } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCXjQTU5POWBJqvi9h7wZK1ncmmSf7wkbI",
  authDomain: "learntrace-26f67.firebaseapp.com",
  projectId: "learntrace-26f67",
  storageBucket: "learntrace-26f67.firebasestorage.app",
  messagingSenderId: "663966102105",
  appId: "1:663966102105:web:758164bb91d90b597c3748"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ─── Data Layer Helpers ───────────────────────────────────────────────────────

/** Tasks — Read tasks with local fallback */
export async function getCloudTasks(localFallback) {
  try {
    const snap = await getDocs(collection(db, 'tasks'));
    if (snap.empty) return localFallback;
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn('LearnTrace: Failed to load cloud tasks, using local fallback.');
    return localFallback;
  }
}

/** Sessions — Write session (idempotent, conforms to rules) */
export async function saveCloudSession(session) {
  if (!session || !session.userId || session.userId === 'anonymous') return;
  try {
    const sessionId = session.timestamp ? String(session.timestamp) : String(Date.now());
    const ref = doc(db, 'sessions', sessionId);
    await setDoc(ref, {
      userId: session.userId,
      taskId: session.taskId || 'unknown',
      metrics: {
        durationSeconds: Number(session.metrics?.durationSeconds) || 0,
        keystrokes: Number(session.metrics?.keystrokes) || 0,
        edits: Number(session.metrics?.edits) || 0,
        idleSeconds: Number(session.metrics?.idleSeconds) || 0,
        submits: Number(session.metrics?.retries) || 0,
      },
      classification: session.pattern || session.classification || 'Unknown',
      createdAt: session.timestamp || Date.now(),
      source: session.source || 'local',
      synced: true
    }, { merge: true });

    // Insights — Save insight as a subcollection, inheriting ownership
    if (session.insight) {
      const insightRef = doc(collection(ref, 'insights'), 'primary');
      await setDoc(insightRef, { text: session.insight, createdAt: Date.now() });
    }
  } catch (err) {
    console.warn('LearnTrace: Session cloud sync failed. Saved locally. Will retry later.', err);
  }
}

/** History — Load logged-in user's sessions */
export async function getCloudSessions(userId) {
  if (!userId || userId === 'anonymous') return [];
  try {
    const q = query(
      collection(db, 'sessions'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data());
  } catch (err) {
    console.warn('LearnTrace: History cloud sync failed.', err);
    return [];
  }
}

/** Exports — Save export history (TXT or JSON payload blob) */
export async function saveCloudExport(userId, format, payloadStr) {
  if (!userId || userId === 'anonymous') return;
  try {
    const exportId = `${Date.now()}_${format}`;
    const ref = doc(db, 'users', userId, 'exports', exportId);
    await setDoc(ref, {
      format,
      payload: payloadStr,
      createdAt: Date.now()
    });
  } catch (err) {
    console.warn('LearnTrace: Failed to mirror export to cloud.', err);
  }
}

/** Profiles — Save synthetic learner profile */
export async function saveLearnerProfile(userId, profileData) {
  if (!userId || userId === 'anonymous' || !profileData) return;
  try {
    const ref = doc(db, 'users', userId, 'profile', 'main');
    await setDoc(ref, {
      ...profileData,
      _syncedAt: Date.now()
    }, { merge: true });
  } catch (err) {
    console.warn('LearnTrace: Failed to save learner profile to cloud.', err);
  }
}

/** Profiles — Load the learner profile */
export async function fetchLearnerProfile(userId) {
  if (!userId || userId === 'anonymous') return null;
  try {
    const q = query(
      collection(db, 'users', userId, 'profile'),
      limit(1)
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs[0].data();
    }
    return null;
  } catch (err) {
    console.warn('LearnTrace: Learner profile fetch failed.', err);
    return null;
  }
}
