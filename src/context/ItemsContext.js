import { createContext, useState } from "react"

const ItemsContext = createContext()

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([{}])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  return (
    <ItemsContext.Provider
      value={{ items, setItems, isLoading, setIsLoading, setUser }}>
      {children}
    </ItemsContext.Provider>
  )
}

export default ItemsContext
