// Dependencies
import { toast } from "react-toastify"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../firebaseConfig"

// // Styles
import "./Form.css"

export default function Form({
  inputText,
  setInputText,
  inputQuantity,
  setInputQuantity,
  inputPriority,
  setInputPriority,
  listId,
}) {
  const inputTextHandler = (e) => {
    setInputText(e.target.value)
  }
  const inputQuantityHandler = (e) => {
    setInputQuantity(e.target.value)
  }
  const inputPriorityHandler = (e) => {
    setInputPriority(e.target.value)
  }

  // Add
  const submitItemHandler = async (e) => {
    e.preventDefault()
    if (inputText.length > 0) {
      const todoToAdd = {
        text: inputText,
        quantity: inputQuantity,
        priority: inputPriority,
        isComplete: false,
        timestamp: serverTimestamp(),
      }
      await addDoc(collection(db, "lists", listId, "list"), todoToAdd)
      setInputText("")
      setInputQuantity("")
    } else {
      toast.error("Please enter an item!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      })
    }
  }
  return (
    <>
      <form className="formForm" onSubmit={submitItemHandler}>
        <div className="formInputContainer">
          <input
            required
            onChange={inputTextHandler}
            type="text"
            className="todo-input"
            value={inputText}
            placeholder="Item"
          />
          <input
            onChange={inputQuantityHandler}
            type="text"
            className="todo-input"
            value={inputQuantity}
            placeholder="Quantity"
          />
          <div className="thirdRow">
            <div className="select">
              <select
                onChange={inputPriorityHandler}
                name="todos"
                className="filter-todo">
                <option disabled value="">
                  --Select Priority --
                </option>
                <option value="No Priority">No Priority</option>
                <option value="urgent">High Priority</option>
                <option value="soon">Medium Priority</option>
                <option value="non-urgent">Low Priority</option>
              </select>
            </div>
            <button className="todo-button" type="submit">
              <p>Add Item</p> <i className="fas fa-plus-square buttonIcon"></i>
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
