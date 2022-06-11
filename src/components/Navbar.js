// Dependencies
import { useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"

// Hooks
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

// Comps
import NavLinks from "./NavLinks"
import MobileNavLinks from "./MobileNavLinks"

// Styles
import "./Navbar.css"

export default function Navbar() {
  // const [showNav, setShowNav] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const { logout } = useLogout()
  const { user } = useAuthContext()

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

    // <div className="navbarContainer">
    //   <div className="container">
    //     <div className="logoContainer">
    //       <div className="logo">Shared Shopping</div>
    //       <div className="mobileNavButton" onClick={toggleNav}>
    //         <i className="fas fa-bars fa-lg"></i>
    //       </div>
    //     </div>
    //     <div className="hamburger">{showMenu ? closeIcon : hamburgerIcon}</div>
    //     <ul className={`links ${showNav ? "" : "hide"}`}>
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li>
    //         <Link to="/about">About</Link>
    //       </li>

    //       <li className="gap">
    //         {user ? (
    //           <>
    //             <Link to="/connect">Connect</Link>

    //             <p onClick={signout} className="loginOut">
    //               Logout
    //             </p>
    //           </>
    //         ) : (
    //           <>
    //             <Link to="/login" className="loginOut">
    //               Login
    //             </Link>
    //             <Link to="/signup" className="loginOut signup">
    //               Signup
    //             </Link>
    //           </>
    //         )}
    //       </li>
    //     </ul>
    //     <div className="linksContainer">
    //       <NavLinks setShowMenu={setShowMenu} />
    //     </div>
    //     {showMenu && (
    //       <div className="linksDropdown">
    //         <NavLinks setShowMenu={setShowMenu} />
    //       </div>
    //     )}
    //   </div>
    // </div>
  )
}
