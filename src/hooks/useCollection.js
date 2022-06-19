import { useState, useEffect } from "react"
import { db } from "../firebaseConfig"
import {
  collection,
  collectionGroup,
  onSnapshot,
  query,
  doc,
  getDoc,
} from "firebase/firestore"

export const useCollection = (c) => {
  const [documents, setDocuments] = useState(null)

  useEffect(() => {
    try {
      const q = query(collection(db, `lists/${c}/list`))
      const unsub = onSnapshot(q, (snapshot) => {
        let data = []
        snapshot.docs.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id })
        })
        setDocuments(data)
      })

      return () => unsub()
    } catch (error) {
      console.log(error)
    }
  }, [c])
  return { documents }
}
