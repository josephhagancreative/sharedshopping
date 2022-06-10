import "./About.css"
import { Link } from "react-router-dom"

export default function About() {
  return (
    <div className="aboutContainer">
      <h1 className="homeTitle">About Shared Shopping</h1>
      <p className="aboutText">
        Welcome to Shared Shopping, the shopping list app you can share!
      </p>
      <p className="aboutText">...sharing coming soon...</p>
      <p className="aboutText">
        for now it's just a really nice shopping list app!
      </p>
      <Link to="/signup" className="loginOut signupAbout">
        Sign Up Today
      </Link>
    </div>
  )
}
