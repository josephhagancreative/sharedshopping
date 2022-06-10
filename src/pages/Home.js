// Dependencies
import { useState, useEffect, useContext } from "react"
import { db } from "../firebaseConfig"
import {
  doc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
  deleteDoc,
  updateDoc,
} from "firebase/firestore"

// Hooks
import { useCollection } from "../hooks/useCollection"
import { useAuthContext } from "../hooks/useAuthContext"

// Context
import ItemsContext from "../context/ItemsContext"

// Components
import Form from "../components/Form"
import TodoList from "../components/TodoList"
import Spinner from "../components/Spinner"

// Styles
import "./Home.css"

export default function Home() {
  // Context Items
  const { user } = useAuthContext()
  // const { items, setItems, isLoading, setIsLoading } = useContext(ItemsContext)

  // State
  const [inputText, setInputText] = useState("")
  const [inputQuantity, setInputQuantity] = useState("")
  const [inputPriority, setInputPriority] = useState("")
  const [status, setStatus] = useState("all")
  const [filteredItems] = useState([])

  const [listId, setListId] = useState(null)
  const [listMembers, setListMembers] = useState(null)
  const [currentUser, setCurrentUser] = useState("")
  const [usernames, setUsernames] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { documents } = useCollection(listId)

  // Fetch Items
  // useEffect(() => {
  //   const pushToUserDocArray = async () => {
  //     let ref = collection(db, "lists", listId, "list")
  //     const unsub = onSnapshot(ref, (snapshot) => {
  //       let results = []
  //       snapshot.docs.forEach((doc) => {
  //         results.push({ ...doc.data(), id: doc.id })
  //       })
  //       setItems(results)
  //       setIsLoading(false)
  //     })
  //     return () => unsub()
  //   }
  //   pushToUserDocArray()
  // }, [setIsLoading, setItems, user.uid])

  useEffect(() => {
    setIsLoading(true)
    if (user) {
      getList()
      getUsernameFromId(user.uid)
      if (listId) {
        getListMembers(listId)
        setIsLoading(false)
      }
    }
  }, [user, listId])

  useEffect(() => {
    getUsernames(listMembers)
  }, [listMembers])

  //// Functions ////

  // get list Id
  const getList = async () => {
    const docRef = doc(db, "users", user.uid)
    const docSnap = await getDoc(docRef)
    setListId(docSnap.data().defaultList)
  }

  // get list members
  const getListMembers = async (c) => {
    let members = []
    const docCheckRef = doc(db, "lists", c)
    const docCheck = await getDoc(docCheckRef)
    docCheck.data().sharedWith.forEach((member) => {
      members.push(member)
    })
    setListMembers(members)
  }

  // Get username from ID
  const getUsernameFromId = async (id) => {
    const docRef = doc(db, "users", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setCurrentUser(docSnap.data().username)
    } else {
      console.log("No such document!")
    }
  }

  // Create list title
  const getUsernames = async (members) => {
    let fetchedUsernames = []
    if (members) {
      await Promise.all(
        members.map(async (member) => {
          try {
            const q = query(
              collection(db, "users"),
              where("owner", "==", member)
            )
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
              fetchedUsernames.push(doc.data().username)
            })
          } catch (error) {
            console.log(error)
          }
        })
      )
    }
    setUsernames(fetchedUsernames)
  }

  // Delete Single Item
  const deleteHandler = async (id) => {
    await deleteDoc(doc(db, "lists", listId, "list", id))
  }

  // Delete All Completed Items
  const deleteCompletedHandler = async () => {
    const itemsToDelete = documents.filter((item) => item.isComplete === true)
    itemsToDelete.forEach((item) => {
      deleteDoc(doc(db, "lists", listId, "list", item.id))
    })
  }

  // Set Item as Completed
  const completeHandler = async (id, e) => {
    if (e.target.className !== "listItemName") {
      const itemCopy = documents.find((item) => item.id === id)
      const itemRef = doc(db, "lists", listId, "list", id)

      if (itemCopy.isComplete === true) {
        await updateDoc(itemRef, { isComplete: false })
      } else {
        await updateDoc(itemRef, { isComplete: true })
      }
    }
  }

  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <div className="homeContainer">
        {currentUser && <h3>Hi {currentUser}</h3>}
        {usernames && (
          <h2 className="homeTitle">{usernames.join(", ")}'s list</h2>
        )}
        <Form
          inputText={inputText}
          setInputText={setInputText}
          status={status}
          setStatus={setStatus}
          inputQuantity={inputQuantity}
          setInputQuantity={setInputQuantity}
          inputPriority={inputPriority}
          setInputPriority={setInputPriority}
          listId={listId}
        />
        {isLoading ? (
          <Spinner />
        ) : documents && documents.length > 0 ? (
          <>
            <TodoList
              filteredItems={filteredItems}
              deleteHandler={deleteHandler}
              completeHandler={completeHandler}
              documents={documents}
              listId={listId}
            />

            <button onClick={deleteCompletedHandler} className="deleteBought">
              Delete All Checked Items
            </button>
          </>
        ) : (
          <h3>Let's add an item!</h3>
        )}
      </div>
    )
  }
}
