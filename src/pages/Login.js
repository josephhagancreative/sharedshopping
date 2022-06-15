// Dependencies
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GoogleButton } from "react-google-button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"

// Hooks
import { useLogin } from "../hooks/useLogin"
import { useLoginWithGoogle } from "../hooks/useLoginWithGoogle"

// Styles
import "./Auth.css"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  // use hooks
  const { error, login } = useLogin()
  const { googleError, loginWithGoogle } = useLoginWithGoogle()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

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

  const togglePassword = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  return (
    <div className="pageContainer">
      <h2 className="homeTitle">Welcome to Shared Shopping!</h2>
      <main>
        <form onSubmit={handleSubmit} className="loginForm">
          <h3 className="authTitle">Log In</h3>

          <GoogleButton onClick={handleGoogleSignin} />
          {error && <p>{error}</p>}
          {googleError && <p>{googleError}</p>}
          <p className="py1 grey">- or -</p>
          <div className="authInputContainer">
            <div className="emailContainer">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="emailInput"
                placeholder="Email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
              Login
            </button>
          </div>
        </form>
        <Link to="/signup" className="signUpLink">
          Sign Up Instead?
        </Link>
      </main>
    </div>
  )
}
