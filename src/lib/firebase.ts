import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "studio-223396118-f8ba4",
  appId: "1:333178161851:web:3c579d4fab09ad042c379e",
  storageBucket: "studio-223396118-f8ba4.firebasestorage.app",
  apiKey: "AIzaSyANU9RxopUGhKxjiTggyVSRcPcly24cHbs",
  authDomain: "studio-223396118-f8ba4.firebaseapp.com",
  messagingSenderId: "333178161851",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
