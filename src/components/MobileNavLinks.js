import "./NavLinks.css"

import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

function MobileNavLinks({ setShowMenu, signout }) {
  const { user } = useAuthContext()
  return (
    <div
      className="mobileLinksContainer {
">
      <li>
        <Link to="/" onClick={() => setShowMenu(false)}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/about" onClick={() => setShowMenu(false)}>
          About
        </Link>
      </li>
      {user && (
        <li>
          <Link to="/connect" onClick={() => setShowMenu(false)}>
            Connect
          </Link>
        </li>
      )}
      {user && (
        <li>
          <p onClick={signout} className="loginOut">
            Logout
          </p>
        </li>
      )}
      {!user && (
        <li>
          <Link to="/login" className="loginOut">
            Login
          </Link>
        </li>
      )}
      {!user && (
        <li>
          <Link to="/signup" className="loginOut signup">
            Signup
          </Link>
        </li>
      )}
    </div>
  )
}

export default MobileNavLinks
