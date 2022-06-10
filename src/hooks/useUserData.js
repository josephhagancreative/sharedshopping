import { useState, useEffect } from "react"
import { db } from "../firebaseConfig"
import { doc, onSnapshot } from "firebase/firestore"

export const useUserData = (c) => {
  const [document, setDocument] = useState(null)

  useEffect(() => {
    let ref = doc(db, "users", c)

    const unsub = onSnapshot(ref, (doc) => {
      let results = []
      results.push({ ListId: doc.id, ...doc.data() })
      setDocument(results[0])
    })

    return () => unsub()
  }, [c])

  return { document }
}
