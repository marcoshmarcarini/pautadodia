
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
//import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "pautadodia-46332.firebaseapp.com",
  projectId: "pautadodia-46332",
  storageBucket: "pautadodia-46332.firebasestorage.app",
  messagingSenderId: "719753994098",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-NMDC1RTQM6"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
//const database = getDatabase(app)


export default db
