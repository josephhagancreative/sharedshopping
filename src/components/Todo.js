// Dependencies
import { useState } from "react"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCheck,
  faTrash,
  faSave,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons"

// styles
import "./Todo.css"

export default function Item({
  id,
  text,
  priority,
  quantity,
  isComplete,
  deleteHandler,
  completeHandler,
  listId,
}) {
  const [isEditable, setIsEditable] = useState(false)
  const [itemToEdit, setItemToEdit] = useState(text)

  const handleEdit = () => {
    setIsEditable(!isEditable)
  }

  const handleMutate = (e) => {
    setItemToEdit(e.target.value)
  }

  const submitEdit = async (id) => {
    const docRef = doc(db, "lists", listId, "list", id)

    await updateDoc(docRef, {
      text: itemToEdit,
    }).then(setIsEditable(false))
  }

  const priorityColor = () => {
    let classAttribute = ""
    switch (priority) {
      case "No Priority":
        classAttribute = "priority-0"
        return classAttribute
      case "urgent":
        classAttribute = "priority-3"
        return classAttribute
      case "soon":
        classAttribute = "priority-2"
        return classAttribute
      case "non-urgent":
        classAttribute = "priority-1"
        return classAttribute
      default:
        classAttribute = "priority-0"
        return classAttribute
    }
  }

  return (
    <div className="todo">
      <div className="itemDetails">
        {/* Edit Mode */}
        {isEditable ? (
          <form className="editForm">
            <span className="editWrapper">
              <input
                id="editInput"
                className="todo-item todoEdit"
                onChange={(e) => handleMutate(e)}
                onBlur={() => submitEdit(id)}
                value={itemToEdit}
              />
            </span>

            <button
              type="submit"
              className="complete-btn"
              onClick={() => submitEdit(id)}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </form>
        ) : (
          // RegularForm
          <>
            <li
              className={`todo-item ${isComplete ? "completed" : ""}  `}
              onClick={(e) => completeHandler(id, e)}>
              <p className="listItemName" onClick={() => handleEdit()}>
                {text.trim()}
              </p>
              <div className="tagContainer">
                {quantity !== "" && (
                  <span className="quantitySpan">{quantity.trim() + " "}</span>
                )}

                {priority !== "" && (
                  <span
                    className={`small quantitySpan ${
                      isComplete ? "completed" : ""
                    } ${priorityColor()} `}>
                    {priority}
                  </span>
                )}
              </div>
            </li>
            <div className="itemButtons">
              {!isEditable && (
                <>
                  <button
                    className="complete-btn"
                    onClick={(e) => completeHandler(id, e)}>
                    {isComplete ? (
                      <FontAwesomeIcon icon={faRotateLeft} />
                    ) : (
                      <FontAwesomeIcon icon={faCheck} />
                    )}
                  </button>
                  <button
                    className="trash-btn"
                    onClick={() => deleteHandler(id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
