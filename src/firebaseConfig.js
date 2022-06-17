import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBysFHCq9AGdK0HlEhoUOrYlJn3IPl3FfY",
  authDomain: "shared-shopping-ade7e.firebaseapp.com",
  projectId: "shared-shopping-ade7e",
  storageBucket: "shared-shopping-ade7e.appspot.com",
  messagingSenderId: "939128525763",
  appId: "1:939128525763:web:ba617a8d48b36c4e01a376",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore(app)
