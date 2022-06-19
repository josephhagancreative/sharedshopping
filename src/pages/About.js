import "./About.css"
import { Link } from "react-router-dom"

export default function About() {
  return (
    <div className="aboutContainer">
      <h1 className="homeTitle">About Shared Shopping</h1>
      <p className="aboutText lg">
        Welcome to Shared Shopping, the shopping list website you can share!
      </p>
      <div className="textContainer">
        <h3 className="aboutHeader">Signing Up and Logging In</h3>
        <p className="aboutText">
          Visit the{" "}
          <Link to="/signup" className="inlineLink">
            signup
          </Link>{" "}
          page to signup today with a Google account or email and password, or{" "}
          <Link to="/login" className="inlineLink">
            login
          </Link>{" "}
          if you already have an account.
        </p>
        <h3 className="aboutHeader">Sharing with Others</h3>
        <p className="aboutText">
          By sending your code to your friends and family you can share your
          shopping lists in real time! Visit the{" "}
          <Link to="/settings" className="inlineLink">
            settings
          </Link>{" "}
          page to set it up or change your username.
        </p>
        <h3 className="aboutHeader">Adding Items</h3>
        <p className="aboutText">
          Using the website is simple, you can just enter the name of the item
          you want to add to your list, quantity and priority are both optional,
          and hit add!
        </p>
        <h3 className="aboutHeader">Editing Items</h3>
        <p className="aboutText">
          To edit an item name click or tap on the name itself to change into
          edit mode, click off the item or on the save icon to save your edit.
        </p>
        <h3 className="aboutHeader">Removing Items</h3>
        <p className="aboutText">
          You can mark an item as checked - ready to delete later using the
          "Delete all checked items" button, or delete them one at a time with
          the trash can icon.
        </p>
      </div>
    </div>
  )
}
