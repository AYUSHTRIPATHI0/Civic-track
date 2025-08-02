// src/utils/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBVNX5xNoRyyz8GdXp-vjJJKZXc9bajczM",
  authDomain: "civic-track-d0f93.firebaseapp.com",
  projectId: "civic-track-d0f93",
  storageBucket: "civic-track-d0f93.appspot.com",
  messagingSenderId: "648290104310",
  appId: "1:648290104310:web:6a97713c374664caed8dd7",
  measurementId: "G-N7BR8WXTNY"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
