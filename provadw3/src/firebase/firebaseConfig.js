import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdl8xr_yIRu-AdXnmR2CeRPTpQL_Pvbvo",
  authDomain: "dw3provagustavo.firebaseapp.com",
  projectId: "dw3provagustavo",
  storageBucket: "dw3provagustavo.firebasestorage.app",
  messagingSenderId: "236297648562",
  appId: "1:236297648562:web:ff0cf96e319efd2a4dccab",
  measurementId: "G-32VEN3ZZ7Q"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
