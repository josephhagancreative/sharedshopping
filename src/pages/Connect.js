// Dependencies
import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"

// Hooks
import { useAuthContext } from "../hooks/useAuthContext"

// Components
import Spinner from "../components/Spinner"

// Styles
import "./Connect.css"
import Accordion from "../components/Accordion"

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
        <h1 className="homeTitle">User Settings</h1>
        <p>
          Select an option below to add a friend to your list, join someone
          else's list, and update your username!
        </p>
        <Accordion user={user} listId={listId} setListId={setListId} />
      </div>
    )
  }
}

export default Connect
