// Dependencies
import { useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"

// Hooks
import { useLogout } from "../hooks/useLogout"

// Comps
import NavLinks from "./NavLinks"
import MobileNavLinks from "./MobileNavLinks"

// Styles
import "./Navbar.css"

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false)
  const { logout } = useLogout()

  const hamburgerIcon = (
    <FontAwesomeIcon icon={faBars} onClick={() => setShowMenu(!showMenu)} />
  )
  const closeIcon = (
    <FontAwesomeIcon icon={faXmark} onClick={() => setShowMenu(!showMenu)} />
  )

  // Functions
  const signout = () => {
    logout()
    setShowMenu(false)
  }

  const toggleNav = () => {
    setShowMenu(!showMenu)
  }
  return (
    <nav className={"navContainer"}>
      <div className={"navContent"}>
        <div className={"logoContainer"} id="logo">
          <Link to="/">
            <p className={"logo"}>SharedShopping</p>
          </Link>
        </div>
        <div className={"hamburger"}>
          {showMenu ? closeIcon : hamburgerIcon}
        </div>

        <div className={"linksContainer"}>
          <NavLinks setShowMenu={setShowMenu} signout={signout} />
        </div>

        {showMenu && (
          <div className={"linksDropdown"}>
            <MobileNavLinks setShowMenu={setShowMenu} signout={signout} />
          </div>
        )}
      </div>
    </nav>
  )
}
