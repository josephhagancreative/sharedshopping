import "./NavLinks.css"

import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

function MobileNavLinks({ setShowMenu, signout }) {
  const { user } = useAuthContext()
  return (
    <div
      className="mobileLinksContainer {
">
      <Link to="/" onClick={() => setShowMenu(false)}>
        <li>Home</li>
      </Link>
      <Link to="/about" onClick={() => setShowMenu(false)}>
        <li>About</li>
      </Link>
      {user && (
        <Link to="/settings" onClick={() => setShowMenu(false)}>
          <li>Settings</li>
        </Link>
      )}
      {user && (
        <p onClick={signout} className="">
          <li>Logout</li>
        </p>
      )}
      {!user && (
        <Link to="/login" onClick={() => setShowMenu(false)} className="">
          <li>Login</li>
        </Link>
      )}
      {!user && (
        <Link
          to="/signup"
          onClick={() => setShowMenu(false)}
          className=" signup">
          <li>Signup</li>
        </Link>
      )}
    </div>
  )
}

export default MobileNavLinks
