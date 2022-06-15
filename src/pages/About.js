import "./About.css"
import { Link } from "react-router-dom"

export default function About() {
  return (
    <div className="aboutContainer">
      <h1 className="homeTitle">About Shared Shopping</h1>
      <p className="aboutText">
        Welcome to Shared Shopping, the shopping list app you can share!
      </p>
      <p className="aboutText">
        By sending your code to your friends and family you can share your
        shopping lists in real time!
      </p>
      <Link to="/signup" className="loginButton">
        Sign Up Today
      </Link>
    </div>
  )
}
