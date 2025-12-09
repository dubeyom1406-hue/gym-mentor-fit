import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyALkMT2x4pn6Qc_hJ8LHViPh_tIKXsyC_E",
    authDomain: "mentorphysical-a1003.firebaseapp.com",
    projectId: "mentorphysical-a1003",
    storageBucket: "mentorphysical-a1003.firebasestorage.app",
    messagingSenderId: "243840582200",
    appId: "1:243840582200:web:1b28a6edb915d5d70e1ccd",
    measurementId: "G-8MQ7NRCYFB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
