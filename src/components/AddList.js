// Dependencies
import { useState } from "react"
import { db } from "../firebaseConfig"
import { doc, updateDoc, arrayUnion } from "firebase/firestore"

// Hooks
import { useAuthContext } from "../hooks/useAuthContext"

export default function AddList({ user, listId, setListId }) {
  const [listIdValue, setListIdValue] = useState("")
  const [message, setMessage] = useState("")

  // const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const docRef = doc(db, "lists", user.uid)
      await updateDoc(docRef, {
        sharedWith: arrayUnion(listIdValue),
      })
      setListIdValue("")
      setMessage("Successfully Added to Your List")
      setTimeout(() => {
        setMessage("")
      }, 3000)
    } catch (error) {
      setMessage(error)
      setTimeout(() => {
        setMessage("")
      }, 3000)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="connectList">
          <input
            required
            type="text"
            onChange={(e) => setListIdValue(e.target.value)}
            value={listIdValue}
          />
          <button className="connectBtn add">Add</button>
        </label>
        {message && <p>{message}</p>}
      </form>
    </>
  )
}
