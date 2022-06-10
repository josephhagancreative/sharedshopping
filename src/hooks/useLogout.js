import { auth } from "../firebaseConfig"
import { signOut } from "firebase/auth"
import { useAuthContext } from "../hooks/useAuthContext"

export function useLogout() {
  const { dispatch } = useAuthContext()

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" })
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  return { logout }
}
