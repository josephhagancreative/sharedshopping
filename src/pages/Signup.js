import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { GoogleButton } from "react-google-button"

// Hooks
import { useSignup } from "../hooks/useSignup"
import { useLoginWithGoogle } from "../hooks/useLoginWithGoogle"

// Styles
import "./Auth.css"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { googleError, loginWithGoogle } = useLoginWithGoogle()

  // use hooks
  const { error, signup } = useSignup()
  const navigate = useNavigate()

  // Functions
  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle()
      setTimeout(() => {
        navigate("/")
      }, 500)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      signup(email, password, username)
      setEmail("")
      setPassword("")
      setUsername("")
      setTimeout(() => {
        navigate("/")
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  const togglePassword = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  return (
    <>
      <div className="pageContainer">
        <h2 className="homeTitle">Welcome to Shared Shopping!</h2>
        <main>
          <form onSubmit={handleSubmit} className="loginForm">
            <h3 className="authTitle">Sign Up</h3>
            <GoogleButton onClick={handleGoogleSignin} />
            {error && <p>{error}</p>}
            {googleError && <p>{googleError}</p>}
            <p className="py1 grey">- or -</p>

            <div className="authInputContainer">
              <div className="emailContainer">
                <label htmlFor="name">Username:</label>
                <input
                  required
                  type="text"
                  className="nameInput"
                  placeholder="Username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="emailContainer">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="emailInput"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="passwordContainer">
                <label htmlFor="password">Password:</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="passwordInput"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className={showPassword ? "passwordBtn show" : "passwordBtn"}
                  onClick={togglePassword}>
                  <FontAwesomeIcon icon={faEye} className="eyeCon" />
                </button>
              </div>
              <button type="submit" className="loginButton">
                Sign Up
              </button>
            </div>
          </form>
          <Link to="/login" className="signUpLink">
            Log In Instead?
          </Link>
        </main>
      </div>
    </>
  )
}
