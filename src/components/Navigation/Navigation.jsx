import HeaderAuth from "../HeaderAuth/HeaderAuth"
import HeaderNotAuth from "../HeaderNotAuth/HeaderNotAuth"

export default function Navigation({loggedIn}) {
  // return loggedIn ? <HeaderAuth /> : <HeaderNotAuth />
  return (
    // <HeaderAuth />
    <HeaderNotAuth />
  )
}