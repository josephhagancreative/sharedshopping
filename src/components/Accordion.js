// Dependencies
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import { setDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { toast } from "react-toastify"

// comps
import JoinList from "../components/JoinList"
import AddList from "../components/AddList"

// style
import "./Accordion.css"
import SharedUsersList from "./SharedUsersList"

const Accordion = ({ user, listId, setListId }) => {
  const [clicked, setClicked] = useState(false)
  const [newUsername, setNewUsername] = useState("")
  const [buttonText, setButtonText] = useState(
    "Click here to copy your User ID!"
  )

  // Functions

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null)
    }

    setClicked(index)
  }

  const resetList = async () => {
    try {
      await updateDoc(doc(db, "users", user.uid), {
        defaultList: user.uid,
      })
      await updateDoc(doc(db, "lists", user.uid), {
        sharedWith: [user.uid],
      })
      toast.success("Reset List")
    } catch (error) {
      toast.error(error)
    }
  }

  const updateUsername = async (e) => {
    e.preventDefault()
    console.log(newUsername)
    try {
      await updateDoc(doc(db, "users", user.uid), {
        username: newUsername,
      })
      setNewUsername("")
      toast.success("Username updated")
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <div className="accordionSection">
      <div className="accordionContainer">
        <div className="wrap" onClick={() => toggle(1)}>
          <p>I want to add someone to my list</p>
          {clicked === 1 ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </div>
        {clicked === 1 ? (
          <div className="dropdown">
            <div>
              <span className="numeral"> 1.</span>Ask your friend to send you
              their user ID
            </div>
            <div>
              <span className="numeral"> 2.</span>Paste their User ID here:
              <AddList listId={listId} setListId={setListId} user={user} />
            </div>
            <div>
              <span className="numeral"> 3.</span>Copy your User ID
              <button
                className="copyBtn"
                onClick={() => {
                  navigator.clipboard.writeText(user.uid)
                  setButtonText("Copied!")
                  setTimeout(() => {
                    setButtonText("Click here to copy your User ID!")
                  }, 3000)
                }}>
                {buttonText}
              </button>
            </div>
            <div>
              <span className="numeral"> 4.</span>Send it to your friend and
              tell them to click "I want to join someone's list"{" "}
            </div>
          </div>
        ) : null}
        <div
          className="wrap"
          onClick={() => {
            toggle(2)
          }}>
          <p>I want to join someone's list</p>
          {clicked === 2 ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </div>
        {clicked === 2 ? (
          <div className="dropdown">
            <div>
              <span className="numeral"> 1.</span>
              Copy your User ID
              <button
                className="copyBtn"
                onClick={() => {
                  navigator.clipboard.writeText(user.uid)
                  setButtonText("Copied!")
                  setTimeout(() => {
                    setButtonText("Click here to copy your User ID!")
                  }, 3000)
                }}>
                {buttonText}
              </button>
            </div>

            <div>
              <span className="numeral">2.</span>Send it to your friend
            </div>
            <div>
              <span className="numeral"> 3.</span>Ask your friend to add you to
              their list{" "}
            </div>
            <div>
              <span className="numeral"> 4.</span>Ask your friend to send you
              their User ID
            </div>
            <div>
              <span className="numeral"> 5.</span>Paste your friend's User ID
              here:
              <JoinList listId={listId} setListId={setListId} user={user} />
            </div>
          </div>
        ) : null}
        <div className="wrap" onClick={() => toggle(3)}>
          <p>I want to reset my list and shared friends</p>
          {clicked === 3 ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </div>
        {clicked === 3 ? (
          <div className="dropdown">
            <div>
              Click this button
              <button className="copyBtn" onClick={() => resetList()}>
                Reset my list
              </button>
            </div>
          </div>
        ) : null}
        <div className="wrap" onClick={() => toggle(4)}>
          <p>I want to remove someone from my list</p>
          {clicked === 4 ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </div>
        {clicked === 4 ? (
          <div className="dropdown">
            <div>
              Click the cross next to the user you want to remove
              <SharedUsersList userId={user.uid} listId={listId} />
            </div>
          </div>
        ) : null}
        <div className="wrap" onClick={() => toggle(5)}>
          <p>I want to change my username</p>
          {clicked === 5 ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </div>
        {clicked === 5 ? (
          <div className="dropdown">
            <div>
              Enter new username and click "Change"
              <form onSubmit={updateUsername}>
                <label className="connectList">
                  <input
                    required
                    type="text"
                    onChange={(e) => setNewUsername(e.target.value)}
                    value={newUsername}
                  />
                  <button className="connectBtn add" type="submit">
                    Change
                  </button>
                </label>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Accordion
