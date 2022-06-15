// Dependencies
import { useState, useContext } from "react"

// Context
import ItemsContext from "../context/ItemsContext"

// Components
import Item from "./Todo"
import Spinner from "./Spinner"

// Styles
import "./TodoList.css"

export default function TodoList({
  deleteHandler,
  completeHandler,
  documents,
  listId,
}) {
  // Context
  const { items, isLoading } = useContext(ItemsContext)

  // state
  const [isEditable, setIsEditable] = useState(false)
  const [itemToEdit, setItemToEdit] = useState({})

  const handleEdit = (id) => {
    setIsEditable(!isEditable)
    const idToEdit = items.filter((item) => item.id === id)
    setItemToEdit(idToEdit[0])
  }

  if (!isLoading) {
    return (
      <>
        <div className="todo-container">
          <ul className="todo-list">
            {documents.map((item) => (
              <Item
                listId={listId}
                key={item.id}
                id={item.id}
                text={item.text}
                item={item.data}
                quantity={item.quantity}
                priority={item.priority}
                isComplete={item.isComplete}
                handleEdit={handleEdit}
                deleteHandler={deleteHandler}
                completeHandler={completeHandler}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  return <Spinner />
}
