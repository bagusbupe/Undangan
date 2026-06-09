import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDWxrC3RuUg4kBGFpnM7a769HFF3Pf7OTY",
  authDomain: "undangan-8fc23.firebaseapp.com",
  projectId: "undangan-8fc23",
  storageBucket: "undangan-8fc23.firebasestorage.app",
  messagingSenderId: "425160690171",
  appId: "1:425160690171:web:6a192dabe25bace880e35e",
  measurementId: "G-2CCZRSSR90"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
