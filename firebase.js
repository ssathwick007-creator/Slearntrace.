// Firebase initialization - single instance
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, enableNetwork } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

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

(async () => {
  try {
    await enableNetwork(db);
  } catch (err) {
    console.warn("Firestore network init:", err);
  }
})();
