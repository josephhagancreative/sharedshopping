// Dependencies
import { useState } from "react"
import { db } from "../firebaseConfig"
import { doc, updateDoc, arrayUnion } from "firebase/firestore"
import { toast } from "react-toastify"

export default function AddList({ user, listId, setListId }) {
  const [listIdValue, setListIdValue] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (listIdValue.length === 28) {
      try {
        const docRef = doc(db, "lists", user.uid)
        await updateDoc(docRef, {
          sharedWith: arrayUnion(listIdValue),
        })
        setListIdValue("")
        toast.success("Successfully added to your list")
      } catch (error) {
        toast.error(error)
      }
    } else {
      toast.error("Please enter correct User ID")
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
      </form>
    </>
  )
}
