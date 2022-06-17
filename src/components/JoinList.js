// Dependencies
import { useState } from "react"
import { db } from "../firebaseConfig"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useAuthContext } from "../hooks/useAuthContext"
import { toast } from "react-toastify"

export default function JoinList({ listId, setListId }) {
  const [friendListId, setFriendListId] = useState("")

  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (friendListId.length === 28) {
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
            toast.success("Joined Successfully")
            return
          } else {
            setFriendListId("")
            toast.error("Unauthorized list ID")
          }
        } else {
          setFriendListId("")
          toast.error("Incorrect list ID")
        }
      } catch (error) {
        setFriendListId("")
        toast.error("Unauthorized list ID")
      }
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
            onChange={(e) => setFriendListId(e.target.value)}
            value={friendListId}
          />
          <button className="connectBtn">Join</button>
        </label>
      </form>
    </>
  )
}
