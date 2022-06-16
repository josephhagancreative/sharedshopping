// Dependencies
import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

// Style
import "./NavLinks.css"

function NavLinks({ setShowMenu, signout }) {
  const { user } = useAuthContext()
  return (
    <div className="linksContainer">
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
          <Link to="/settings" onClick={() => setShowMenu(false)}>
            Settings
          </Link>
        </li>
      )}

      {user && (
        <li>
          <p onClick={signout} className="">
            Logout
          </p>
        </li>
      )}
      {!user && (
        <li>
          <Link to="/login" className="">
            Login
          </Link>
        </li>
      )}
      {!user && (
        <li>
          <Link to="/signup" className=" signup">
            Signup
          </Link>
        </li>
      )}
    </div>
  )
}

export default NavLinks
