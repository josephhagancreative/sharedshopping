import { useState, useEffect } from "react"
import { db } from "../firebaseConfig"
import { collection, onSnapshot, query } from "firebase/firestore"

export const useCollection = (c) => {
  const [documents, setDocuments] = useState(null)

  useEffect(() => {
    const q = query(collection(db, `lists/${c}/list`))
    const unsub = onSnapshot(q, (snapshot) => {
      let data = []
      snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id })
      })
      setDocuments(data)
    })

    return () => unsub()
  }, [c])

  return { documents }
}
