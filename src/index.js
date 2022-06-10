import React from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import { AuthContextProvider } from "./context/AuthContext"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <AuthContextProvider>
    <App tab="home" />
  </AuthContextProvider>
)
