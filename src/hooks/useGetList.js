import { useState, useEffect } from "react"
import { db } from "../firebaseConfig"
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore"

export const useGetList = (c) => {
  const [documents, setDocuments] = useState(null)

  useEffect(() => {
    const getList = async () => {
      const q = query(
        collection(db, "lists"),
        where("sharedWith", "array-contains", c)
      )

      const querySnapshot = await getDocs(q)
      let list = []
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      })
      setDocuments(list[0])
      console.log(documents)
    }

    getList()
  }, [c])

  return { documents }
}
