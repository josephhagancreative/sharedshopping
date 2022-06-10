// Dependencies
import { useState } from "react"
import { db } from "../firebaseConfig"
import { doc, getDoc, updateDoc } from "firebase/firestore"

// Hooks
import { useAuthContext } from "../hooks/useAuthContext"

export default function JoinList({ listId, setListId }) {
  const [friendListId, setFriendListId] = useState("")
  const [message, setMessage] = useState("")

  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    try {
      const docCheckRef = doc(db, "lists", friendListId)
      const docCheck = await getDoc(docCheckRef)
      if (docCheck.exists()) {
        if (docCheck.data().sharedWith.includes(user.uid)) {
          const docRef = doc(db, "users", user.uid)
          await updateDoc(docRef, {
            defaultList: friendListId,
          })
          setListId(friendListId)
          setFriendListId("")
          setMessage("Joined Successfully")
          setTimeout(() => {
            setMessage("")
          }, 3000)
        } else {
          setFriendListId("")
          setMessage("Unauthorized list ID")
          setTimeout(() => {
            setMessage("")
          }, 3000)
        }
      } else {
        setFriendListId("")
        setMessage("Incorrect list ID")
        setTimeout(() => {
          setMessage("")
        }, 3000)
      }
    } catch (error) {
      setFriendListId("")
      setMessage("Unauthorized list ID")
      setTimeout(() => {
        setMessage("")
      }, 3000)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="connectList">
          <span>Join a friends list</span>
          <input
            required
            type="text"
            onChange={(e) => setFriendListId(e.target.value)}
            value={friendListId}
          />
          <button className="connectBtn">Join</button>
        </label>
      </form>
      {message && <p>{message}</p>}
    </>
  )
}
