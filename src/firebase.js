import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyALkMT2x4pn6Qc_hJ8LHViPh_tIKXsyC_E",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mentorphysical-a1003.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mentorphysical-a1003",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mentorphysical-a1003.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "243840582200",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:243840582200:web:1b28a6edb915d5d70e1ccd",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-8MQ7NRCYFB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
