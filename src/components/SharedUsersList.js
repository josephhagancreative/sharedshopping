// Dependencies
import { useState, useEffect } from "react"
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
  arrayRemove,
} from "firebase/firestore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"

// style
import "./Accordion.css"

function SharedUsersList({ userId, listId }) {
  const [listMembers, setListMembers] = useState([])
  const [listNames, setListNames] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getListMembers(userId)
  }, [userId, listId])

  useEffect(() => {
    getUsernameFromId()
  }, [listMembers])

  // get list members
  const getListMembers = async (c) => {
    let members = []
    const docCheckRef = doc(db, "lists", c)
    const docCheck = await getDoc(docCheckRef)
    async function main() {
      await Promise.all(
        docCheck.data().sharedWith.map((member) => {
          if (member !== userId) {
            members.push(member)
          }
        })
      )
      setListMembers(members)
    }
    main()
    setListMembers(members)
  }

  // get usernames from id
  const getUsernameFromId = () => {
    if (listMembers.length > 0) {
      let usernames = []
      async function main() {
        await Promise.all(
          listMembers.map(async (member) => {
            const docRef = doc(db, "users", member)
            const docSnap = await getDoc(docRef)
            const convertedUsername = docSnap.data().username
            const newUser = { username: convertedUsername, uid: member }
            usernames.push(newUser)
          })
        )
        setListNames(usernames)
      }
      main()
    }
  }

  // Delete Single Item
  const deleteHandler = async (id, index) => {
    await updateDoc(doc(db, "lists", userId), {
      sharedWith: arrayRemove(id),
    })
    listNames.splice(index, 1)

    getUsernameFromId()

    toast.success("User removed from list")
    setTimeout(() => {
      navigate("/")
    }, 500)
  }

  return (
    <div>
      {listNames &&
        listNames.map((member, index) => (
          <p className="sharedMember" key={member.uid}>
            {member.username}
            <button
              className="removeBtn"
              onClick={() => deleteHandler(member.uid, index)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </p>
        ))}
    </div>
  )
}

export default SharedUsersList
