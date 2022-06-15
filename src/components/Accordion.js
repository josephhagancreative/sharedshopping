// Dependencies
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"

// comps
import JoinList from "../components/JoinList"
import AddList from "../components/AddList"

// style
import "./Accordion.css"

const Accordion = ({ user, listId, setListId }) => {
  const [clicked, setClicked] = useState(false)
  const [buttonText, setButtonText] = useState(
    "Click here to copy your User ID!"
  )

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null)
    }

    setClicked(index)
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
            <div>1. Ask your friend to send you their user ID</div>
            <div>
              2. paste their User ID here:
              <AddList listId={listId} setListId={setListId} user={user} />
            </div>
            <div>
              3. Copy your User ID
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
              4. Send it to your friend and tell them to click "I want to join
              someone's list"{" "}
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
              1. Copy your User ID
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

            <div>2. Send it to your friend </div>
            <div>3. Ask your friend to add you to their list </div>
            <div>4. Ask your friend to send you their User ID</div>
            <div>
              5. Paste your friend's User ID here:
              <JoinList listId={listId} setListId={setListId} user={user} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Accordion
