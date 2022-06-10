import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { auth } from "../firebaseConfig"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { setDoc, doc, getDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"

export function useLoginWithGoogle() {
  const [googleError, setGoogleError] = useState(null)
  const { dispatch } = useAuthContext()

  const loginWithGoogle = async () => {
    setGoogleError(null)
    try {
      const provider = new GoogleAuthProvider()
      const signInObject = await signInWithPopup(auth, provider)
      const userDoc = doc(db, "users", signInObject.user.uid)
      const docSnap = await getDoc(userDoc)
      if (docSnap.exists()) {
      } else {
        // Create user
        await setDoc(doc(db, "users", signInObject.user.uid), {
          defaultList: signInObject.user.uid,
          sharedWith: [signInObject.user.uid],
          owner: signInObject.user.uid,
          username: signInObject.user.displayName,
        })
        // Create list
        const docRef = doc(db, "lists", signInObject.user.uid)
        await setDoc(docRef, {
          owner: signInObject.user.uid,
          sharedWith: [signInObject.user.uid],
        })
        console.log("Document Created")
      }

      dispatch({ type: "LOGIN", payload: signInObject.user })
    } catch (error) {
      setGoogleError(error)
    }
  }

  return { googleError, loginWithGoogle }
}
