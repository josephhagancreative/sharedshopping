import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { auth } from "../firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { db } from "../firebaseConfig"
import { setDoc, doc } from "firebase/firestore"

export function useSignup() {
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = (email, password, username) => {
    setError(null)
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setDoc(doc(db, "users", res.user.uid), {
          defaultList: res.user.uid,
          sharedWith: [res.user.uid],
          owner: res.user.uid,
          username,
        })

        // Create List
        setDoc(doc(db, "lists", res.user.uid), {
          owner: res.user.uid,
          sharedWith: [res.user.uid],
        })
        dispatch({ type: "LOGIN", payload: res.user })
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return { error, signup }
}
