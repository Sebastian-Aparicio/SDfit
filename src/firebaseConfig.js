import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 👈 Importa Firestore
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDF093Bb4qVQul_Ir8it1Xl1XQjBkOusi8",
  authDomain: "sdfit-c485e.firebaseapp.com",
  projectId: "sdfit-c485e",
  storageBucket: "sdfit-c485e.appspot.com",
  messagingSenderId: "236543059757",
  appId: "1:236543059757:web:8f0a801ca92d401b9f55a4",
  measurementId: "G-JE9GL9GQED",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // 👈 Agrega Firestore

export { app, auth, provider, db };