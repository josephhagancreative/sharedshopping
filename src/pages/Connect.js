// Dependencies
import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"

// Hooks
import { useAuthContext } from "../hooks/useAuthContext"

// Components
import JoinList from "../components/JoinList"
import AddList from "../components/AddList"
import Spinner from "../components/Spinner"

// Styles
import "./Connect.css"

function Connect() {
  const { user } = useAuthContext()
  const [listId, setListId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // get list Id
  const getList = async () => {
    setIsLoading(true)
    const docRef = doc(db, "users", user.uid)
    const docSnap = await getDoc(docRef)
    setListId(docSnap.data().defaultList)
    setIsLoading(false)
  }

  useEffect(() => {
    getList()
  }, [listId])

  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <div className="connectContainer">
        <h3>Your user ID is: {user.uid}</h3>
        <h3>Your current list ID is: {listId}</h3>
        <p>
          Send it to your friend so they can join your list, or enter your
          friends User ID below!
        </p>
        <div className="friend-box">
          <div className="join-friend-box">
            <JoinList listId={listId} setListId={setListId} />
          </div>
          <div className="add-friend-box">
            <AddList />
          </div>
        </div>
      </div>
    )
  }
}

export default Connect
