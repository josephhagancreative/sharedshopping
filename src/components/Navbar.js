// Dependencies
import { useState } from "react"
import { Link } from "react-router-dom"

// Hooks
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

// Styles
import "./Navbar.css"

export default function Navbar() {
  const [showNav, setShowNav] = useState(false)
  const { logout } = useLogout()
  const { user } = useAuthContext()

  // Functions
  const signout = () => {
    logout()
    setShowNav(false)
  }

  const toggleNav = () => {
    setShowNav(!showNav)
  }
  return (
    <div className="navbarContainer">
      <div className="container">
        <div className="logoContainer">
          <div className="logo">Shared Shopping</div>
          <div className="mobileNavButton" onClick={toggleNav}>
            <i className="fas fa-bars fa-lg"></i>
          </div>
        </div>
        <ul className={`links ${showNav ? "" : "hide"}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>

          <li className="gap">
            {user ? (
              <>
                <Link to="/connect">Connect</Link>

                <p onClick={signout} className="loginOut">
                  Logout
                </p>
              </>
            ) : (
              <>
                <Link to="/login" className="loginOut">
                  Login
                </Link>
                <Link to="/signup" className="loginOut signup">
                  Signup
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}
