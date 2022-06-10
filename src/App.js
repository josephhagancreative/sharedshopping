// Import Dependencies
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// components
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NotFound from "./pages/NotFound"
import Connect from "./pages/Connect"
import About from "./pages/About"

// Context
import { useAuthContext } from "./hooks/useAuthContext"
import { ItemsProvider } from "./context/ItemsContext"

// Style
import "./App.css"

function App() {
  const { user, authIsReady } = useAuthContext()
  return (
    <div className="App">
      {authIsReady && (
        <ItemsProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              {user && <Route path="/" element={<Home />} />}
              {!user && <Route path="/" element={<Navigate to="/login" />} />}
              <Route path="/about" element={<About />} />
              {!user && <Route path="/login" element={<Login />} />}
              {user && <Route path="/login" element={<Navigate to="/" />} />}
              {!user && <Route path="/signup" element={<Signup />} />}
              {user && <Route path="/signup" element={<Navigate to="/" />} />}
              <Route path="*" element={<NotFound />} />
              {user && <Route path="/connect" element={<Connect />} />}
              {!user && (
                <Route path="/connect" element={<Navigate to="/login" />} />
              )}
            </Routes>
          </BrowserRouter>
        </ItemsProvider>
      )}
      <ToastContainer
        position="bottom-center"
        pauseOnHover={false}
        autoClose={1500}
      />
    </div>
  )
}
export default App
