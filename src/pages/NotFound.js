import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"

import "./NotFound.css"
export default function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate("/")
    }, 3000)
  }, [navigate])
  return (
    <div className="notFoundContainer">
      <h2>Oops, page not found</h2>
      <p>Redirecting to Homepage</p>
      <Spinner />
    </div>
  )
}
