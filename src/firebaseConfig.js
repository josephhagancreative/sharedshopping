import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxEQMfhShuwm5HpJyzMbdVtdiYtRsavAU",
  authDomain: "milestone-164c8.firebaseapp.com",
  projectId: "milestone-164c8",
  storageBucket: "milestone-164c8.appspot.com",
  messagingSenderId: "521945920371",
  appId: "1:521945920371:web:0b730dbd1f162cb6dc4b06",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore(app)
